import { createHash } from 'node:crypto';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const review = JSON.parse(await readFile(path.join(root, 'review/domain-brochures-20261012.json'), 'utf8'));
const aliases = {
  'Oryx_DataStation_Brochure_WordingReview_20261010.pdf': 'Oryx_DataStation_Brochure.pdf',
  'OryxDataStation_Brochure_EN_WordingReview_20261010.pdf': 'OryxDataStation_Brochure_EN.pdf',
  'Oryx_LockDown_Brochure_WordingReview_20261010.pdf': 'Oryx_LockDown_Brochure.pdf',
  'OryxLockDown_Brochure_EN_WordingReview_20261010.pdf': 'OryxLockDown_Brochure_EN.pdf',
  'OryxCalibration_고객소개브로셔_20261010_WordingReview_20261010.pdf': 'OryxCalibration_고객소개브로셔_20261010.pdf',
  'OryxCalibration_Introduction_EN_20261010_WordingReview_20261010.pdf': 'OryxCalibration_Introduction_EN_20261010.pdf',
};
const output = path.resolve(root, process.env.QA_EVIDENCE_DIR || 'review/live-production-qa');
await mkdir(output, { recursive: true });
const report = { sourceCommit: process.env.VERIFY_SOURCE_COMMIT || null, status: 'pending', attempts: [] };
const deadline = Date.now() + 10 * 60_000;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
async function get(origin, relative, attempt) {
  const url = new URL(relative.split('/').map(encodeURIComponent).join('/'), origin);
  url.searchParams.set('_brochure_review', `${report.sourceCommit || 'review'}-${attempt}`);
  const response = await fetch(url, { headers: { 'Cache-Control': 'no-cache' }, signal: AbortSignal.timeout(30_000) });
  if (!response.ok || new URL(response.url).origin !== origin) throw new Error(`${url}: status ${response.status} or unexpected redirect`);
  return Buffer.from(await response.arrayBuffer());
}
try {
  for (let attempt = 1; Date.now() < deadline; attempt++) {
    const result = { attempt, downloads: [], errors: [] };
    for (const origin of ['https://oryxsystem.co.kr', 'https://oryxdatasafe.co.kr']) {
      try {
        const html = (await get(origin, '/', attempt)).toString('utf8');
        if (html.includes('oryxdatasafe.com')) throw new Error(`${origin}: old DataSafe domain remains in public HTML`);
        if (origin === 'https://oryxsystem.co.kr' && !/class="footer-related"[^>]*href="https:\/\/oryxdatasafe\.co\.kr\//.test(html)) throw new Error('System footer does not link to the new domain');
      } catch (error) { result.errors.push(error.message); }
    }
    for (const row of review.PDF_validation) {
      for (const [site, origin, file] of [
        ['System', 'https://oryxsystem.co.kr', aliases[row.file]],
        ['DataSafe', 'https://oryxdatasafe.co.kr', row.file],
        ['DataSafe legacy path', 'https://oryxdatasafe.co.kr', aliases[row.file]],
      ]) {
        try {
          const bytes = await get(origin, `downloads/${file}`, attempt);
          const sha256 = createHash('sha256').update(bytes).digest('hex');
          result.downloads.push({ site, file, bytes: bytes.length, sha256 });
          if (sha256 !== row.sha256 || bytes.length !== row.bytes || bytes.subarray(0, 5).toString() !== '%PDF-') throw new Error(`${site}/${file}: differs from reviewed PDF`);
        } catch (error) { result.errors.push(error.message); }
      }
    }
    report.attempts.push(result);
    if (!result.errors.length) { report.status = 'passed'; break; }
    console.log(`Shared brochure verification attempt ${attempt}: ${result.errors.join('; ')}`);
    if (Date.now() + 15_000 < deadline) await sleep(15_000);
  }
  if (report.status !== 'passed') throw new Error('The shared brochure verification deadline expired.');
  console.log('Verified public HTML and 18 PDF downloads: six identical reviewed brochures on both sites, including DataSafe legacy paths.');
} catch (error) {
  report.status = 'failed'; report.error = error.message; process.exitCode = 1;
} finally {
  await writeFile(path.join(output, 'shared-brochure-verification.json'), JSON.stringify(report, null, 2) + '\n');
}
