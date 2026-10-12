import { createHash } from 'node:crypto';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = path.join(root, 'dist');
const productionOrigin = 'https://oryxdatasafe.co.kr';
const override = process.env.VERIFY_BASE_URL;
const base = new URL(override || productionOrigin);
if (!['http:', 'https:'].includes(base.protocol) || base.username || base.password) {
  throw new Error('VERIFY_BASE_URL must be an HTTP(S) URL without credentials.');
}
base.pathname = '/';
base.search = '';
base.hash = '';
const maxAttempts = override && process.env.VERIFY_MAX_ATTEMPTS
  ? Number(process.env.VERIFY_MAX_ATTEMPTS) : Infinity;
if (maxAttempts !== Infinity && (!Number.isInteger(maxAttempts) || maxAttempts < 1)) {
  throw new Error('VERIFY_MAX_ATTEMPTS must be a positive integer for an override URL.');
}
const outputDirectory = path.resolve(root, process.env.QA_EVIDENCE_DIR || 'review/live-production-qa');
const reportPath = path.join(outputDirectory, 'live-verification.json');
const started = Date.now();
const deadline = started + 10 * 60_000;
const report = {
  sourceCommit: process.env.VERIFY_SOURCE_COMMIT || null,
  target: base.href,
  mode: override ? 'override-check' : 'production-check',
  startedAt: new Date(started).toISOString(),
  status: 'pending',
  attempts: [],
};
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function listFiles(directory, prefix = '') {
  const rows = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const relative = prefix + entry.name;
    if (entry.isDirectory()) rows.push(...await listFiles(path.join(directory, entry.name), relative + '/'));
    else if (entry.isFile()) rows.push(relative);
  }
  return rows.sort();
}

function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map(match => {
    const attributes = {};
    for (const attribute of match[0].matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) {
      attributes[attribute[1].toLowerCase()] = attribute[2] ?? attribute[3];
    }
    return attributes;
  });
}

function metadata(html) {
  const links = tags(html, 'link');
  const metas = tags(html, 'meta');
  const findMeta = name => metas.find(tag => tag.name === name || tag.property === name)?.content ?? null;
  return {
    canonical: links.find(tag => tag.rel === 'canonical')?.href ?? null,
    description: findMeta('description'),
    ogUrl: findMeta('og:url'),
    ogImage: findMeta('og:image'),
    language: /<html\b[^>]*\blang=["']([^"']+)["']/i.exec(html)?.[1] ?? null,
  };
}

async function request(relative, attempt) {
  const url = new URL(relative.split('/').map(encodeURIComponent).join('/'), base);
  url.searchParams.set('_verify', `${report.sourceCommit || 'review'}-${attempt}`);
  const remaining = deadline - Date.now();
  if (remaining <= 0) throw new Error('The 10-minute verification deadline expired.');
  const response = await fetch(url, {
    headers: { 'Cache-Control': 'no-cache' },
    signal: AbortSignal.timeout(Math.min(30_000, remaining)),
  });
  const actualOrigin = new URL(response.url).origin;
  if (actualOrigin !== base.origin) {
    await response.body?.cancel();
    throw new Error(`Request for ${relative || '/'} redirected to ${actualOrigin}; expected ${base.origin}.`);
  }
  const bytes = Buffer.from(await response.arrayBuffer());
  return {
    bytes,
    evidence: {
      path: relative || '/',
      status: response.status,
      url: response.url,
      bytes: bytes.length,
      sha256: hash(bytes),
      contentType: response.headers.get('content-type'),
      cacheControl: response.headers.get('cache-control'),
      age: response.headers.get('age'),
    },
  };
}

try {
  const cname = (await readFile(path.join(root, 'public/CNAME'), 'utf8')).trim();
  const builtCname = (await readFile(path.join(dist, 'CNAME'), 'utf8')).trim();
  // CNAME preserves the retired GitHub Pages domain claim; Cloudflare uses its own domain settings.
  if (builtCname !== cname) {
    throw new Error('The preserved GitHub Pages CNAME must not change during the Cloudflare build.');
  }
  const indexBytes = await readFile(path.join(dist, 'index.html'));
  const indexHtml = indexBytes.toString('utf8');
  const expectedMetadata = metadata(indexHtml);
  if (expectedMetadata.canonical !== `${productionOrigin}/` || expectedMetadata.ogUrl !== `${productionOrigin}/`) {
    throw new Error('Built canonical and Open Graph URL must match the existing production domain.');
  }
  if (!expectedMetadata.description || !expectedMetadata.ogImage || expectedMetadata.language !== 'ko') {
    throw new Error('Built description, Open Graph image and Korean document language are required.');
  }
  const files = await listFiles(dist);
  const assets = files.filter(name => name !== 'index.html' && name !== 'CNAME');
  assets.sort((a, b) => Number(!/\.(js|css)$/.test(a)) - Number(!/\.(js|css)$/.test(b)) || a.localeCompare(b));
  const indexReferences = [...tags(indexHtml, 'script').map(tag => tag.src), ...tags(indexHtml, 'link').map(tag => tag.href)]
    .filter(reference => reference?.startsWith('/assets/'));
  if (!indexReferences.some(reference => /\.js$/.test(reference)) || !indexReferences.some(reference => /\.css$/.test(reference))) {
    throw new Error('Built index must reference the generated JavaScript and CSS assets.');
  }
  for (const reference of indexReferences) {
    if (!assets.includes(reference.slice(1))) throw new Error(`Built index references a missing asset: ${reference}`);
  }
  const expected = await Promise.all(assets.map(async relative => {
    const bytes = await readFile(path.join(dist, relative));
    return { path: relative, bytes: bytes.length, sha256: hash(bytes) };
  }));
  report.expected = { cname, indexSha256: hash(indexBytes), metadata: expectedMetadata, indexReferences, assets: expected };

  for (let attempt = 1; Date.now() < deadline && attempt <= maxAttempts; attempt++) {
    const errors = [];
    const checks = [];
    try {
      const index = await request('', attempt);
      const actualHtml = index.bytes.toString('utf8');
      const actualMetadata = metadata(actualHtml);
      checks.push({ ...index.evidence, expectedBytes: indexBytes.length, expectedSha256: hash(indexBytes), matched: index.evidence.sha256 === hash(indexBytes) });
      report.actualMetadata = actualMetadata;
      if (index.evidence.status !== 200) errors.push(`Index returned HTTP ${index.evidence.status}.`);
      if (index.evidence.sha256 !== hash(indexBytes)) errors.push('Index bytes do not match the deployed source build.');
      if (JSON.stringify(actualMetadata) !== JSON.stringify(expectedMetadata)) errors.push('Canonical or document metadata differs from the expected build.');
      if (indexReferences.some(reference => !actualHtml.includes(reference))) errors.push('Index does not reference every current generated asset.');
      if (!errors.length) {
        for (const asset of expected) {
          const actual = await request(asset.path, attempt);
          const matched = actual.evidence.status === 200 && actual.evidence.bytes === asset.bytes && actual.evidence.sha256 === asset.sha256;
          checks.push({ ...actual.evidence, expectedBytes: asset.bytes, expectedSha256: asset.sha256, matched });
          if (!matched) {
            errors.push(`Asset ${asset.path} returned HTTP ${actual.evidence.status} or differs in bytes/SHA-256.`);
            break;
          }
        }
      }
    } catch (error) {
      errors.push(`${error.name}: ${error.message}`);
    }
    report.checks = checks;
    report.attempts.push({ attempt, checkedAt: new Date().toISOString(), errors });
    console.log(`Live verification ${attempt}: ${errors.length ? errors.join(' ') : `${checks.length} matching responses.`}`);
    if (!errors.length) {
      report.status = 'passed';
      break;
    }
    if (attempt < maxAttempts && Date.now() < deadline) await sleep(Math.min(15_000, deadline - Date.now()));
  }
  if (report.status !== 'passed') report.status = 'failed';
} catch (error) {
  report.status = 'failed';
  report.error = `${error.name}: ${error.message}`;
}
report.finishedAt = new Date().toISOString();
report.elapsedMs = Date.now() - started;
await mkdir(outputDirectory, { recursive: true });
await writeFile(reportPath, JSON.stringify(report, null, 2) + '\n');
console.log(`Live verification ${report.status}; evidence: ${path.relative(root, reportPath)}`);
if (report.status !== 'passed') process.exitCode = 1;
