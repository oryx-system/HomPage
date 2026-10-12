import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { randomUUID } from 'node:crypto';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));

test('client build does not replace private API environment variables', async () => {
  const temporary = await mkdtemp(path.join(os.tmpdir(), 'oryx-build-boundary-'));
  const marker = `PRIVATE_BUILD_SENTINEL_${randomUUID()}`;
  const probe = path.join(temporary, 'probe.js');
  const output = path.join(temporary, 'output');
  await writeFile(probe, 'globalThis.__credentialProbe = [process.env.API_KEY, process.env.GEMINI_API_KEY, import.meta.env.GEMINI_API_KEY];');
  const buildScript = `
    import { build } from 'vite';
    await build({ root: ${JSON.stringify(root)}, logLevel: 'silent', build: {
      outDir: ${JSON.stringify(output)}, emptyOutDir: true,
      rollupOptions: { input: ${JSON.stringify(probe)} }
    }});
  `;
  try {
    await new Promise((resolve, reject) => {
      const child = spawn(process.execPath, ['--input-type=module', '-e', buildScript], {
        cwd: root,
        env: { ...process.env, API_KEY: marker, GEMINI_API_KEY: marker },
        stdio: ['ignore', 'pipe', 'pipe'],
      });
      let diagnostic = '';
      child.stdout.on('data', data => { diagnostic += data; });
      child.stderr.on('data', data => { diagnostic += data; });
      child.on('error', reject);
      child.on('close', code => code === 0 ? resolve() : reject(new Error(`Probe build failed (${code}): ${diagnostic}`)));
    });
    const assets = await readdir(path.join(output, 'assets'));
    const bundles = await Promise.all(assets.filter(name => name.endsWith('.js')).map(name => readFile(path.join(output, 'assets', name), 'utf8')));
    assert.ok(bundles.length > 0, 'A client probe must be built');
    for (const bundle of bundles) assert.ok(!bundle.includes(marker), 'A server credential was embedded in a public client bundle');
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
});

test('metadata references real local image assets and truthful organization data', async () => {
  const html = await readFile(path.join(root, 'index.html'), 'utf8');
  const icon = html.match(/<link\s+rel="icon"[^>]+href="([^"]+)"/);
  const og = html.match(/<meta\s+property="og:image"[^>]+content="([^"]+)"/);
  assert.ok(icon && og, 'Both favicon and sharing image must be declared');
  const iconFile = await readFile(path.join(root, 'public', icon[1]));
  const ogFile = await readFile(path.join(root, 'public', new URL(og[1]).pathname));
  assert.ok(iconFile.length > 0);
  assert.equal(ogFile.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
  assert.equal(ogFile.readUInt32BE(16), 1200);
  assert.equal(ogFile.readUInt32BE(20), 630);
  const structured = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(structured);
  const organization = JSON.parse(structured[1]);
  assert.equal(organization['@type'], 'Organization');
  assert.match(organization.name, /DataSafe|데이터세이프/i);
  assert.doesNotMatch(`${organization.name} ${organization.alternateName ?? ''}`, /Oryx\s*System|오릭스\s*시스템/i);
  assert.equal(organization.email, 'schong@oryxsystem.co.kr');
  assert.equal(new URL(organization.url).origin, 'https://oryxdatasafe.co.kr');
  assert.equal(organization.telephone, '+82-10-6545-0415');
  assert.ok(!organization.offers, 'Unconfirmed prices must not be published as an offer');
  assert.ok(!organization.taxID, 'An unconfirmed business number must not be invented');
  assert.doesNotMatch(html, /완벽\s*준수|완전\s*준수|99\.9|cdn\.tailwindcss|esm\.sh|fonts\.googleapis|type="importmap"/);
  const metadata = JSON.parse(await readFile(path.join(root, 'metadata.json'), 'utf8'));
  assert.ok(metadata.name.includes('Oryx DataSafe'));
  assert.doesNotMatch(metadata.description, /Oryx\s*System|오릭스\s*시스템/i);
  assert.doesNotMatch(metadata.description, /fully\s+compliant|완벽\s*준수|완전\s*준수|99\.9|(?:무료|free|price|pricing)|\d[\d,]*(?:원|\s*(?:KRW|USD))/i);
  assert.match(html, /<noscript>[\s\S]*mailto:schong@oryxsystem\.co\.kr[\s\S]*<\/noscript>/);
});
