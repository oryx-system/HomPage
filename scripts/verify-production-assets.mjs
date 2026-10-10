import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// A successful Vite build must not publish missing original and review assets.
const root = fileURLToPath(new URL('../', import.meta.url));
const manifest = JSON.parse(await readFile(path.join(root, 'review/production-required-assets.json'), 'utf8'));
const reviewManifest = JSON.parse(await readFile(path.join(root, 'review/wording-review-assets.json'), 'utf8'));
manifest.files.push(...reviewManifest.files);
const failures = [];
for (const asset of manifest.files) {
  let bytes;
  try { bytes = await readFile(path.join(root, 'public', asset.path)); }
  catch { failures.push(`${asset.path}: missing`); continue; }
  if (bytes.length !== asset.bytes) failures.push(`${asset.path}: unexpected byte count`);
  if (asset.sha256 && createHash('sha256').update(bytes).digest('hex') !== asset.sha256) failures.push(`${asset.path}: SHA256 differs from the reviewed original`);
  const magic = bytes.subarray(0, 12);
  if (asset.mime === 'application/pdf' && magic.subarray(0, 5).toString() !== '%PDF-') failures.push(`${asset.path}: invalid PDF`);
  if (asset.mime === 'image/png' && magic.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') failures.push(`${asset.path}: invalid PNG`);
  if (asset.mime === 'image/webp' && (magic.subarray(0, 4).toString() !== 'RIFF' || magic.subarray(8, 12).toString() !== 'WEBP')) failures.push(`${asset.path}: invalid WebP`);
}
if (failures.length) {
  console.error('Approved production assets are not ready:\n' + failures.join('\n'));
  process.exitCode = 1;
} else console.log(`Verified ${manifest.files.length} original and review assets.`);
