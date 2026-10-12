import { test, expect, type Page } from '@playwright/test';
import { createHash } from 'node:crypto';
import { mkdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Independent expected bytes from domain-reviewed documents, rather than
// values imported from the application's brochure data.
const legacyDocuments = [
  { product: 'Oryx DataStation', language: 'ko', filename: 'Oryx_DataStation_Brochure.pdf', bytes: 5796168, sha256: '2c329721820cf5277a115525f0558810f218e8c0650407efec3e0a5f6eaf17b5' },
  { product: 'Oryx LockDown', language: 'ko', filename: 'Oryx_LockDown_Brochure.pdf', bytes: 6242160, sha256: '0f7be262c540deeaf24e31a11f5028b4338c7ac045ba63ac300efaa3a76cb80d' },
  { product: 'Oryx DataStation', language: 'en', filename: 'OryxDataStation_Brochure_EN.pdf', bytes: 5822289, sha256: '2b12bf1faefecfd19ebd43634725ad0084a9f36f4b933b36bd38611e1856aff2' },
  { product: 'Oryx LockDown', language: 'en', filename: 'OryxLockDown_Brochure_EN.pdf', bytes: 810611, sha256: '9c21c52cf63a4b4c869b37872df7862e3ca54bdf7cbfe5d206cd9e0d0eaea854' },
  // Legacy paths now serve the same latest approved domain-reviewed PDFs.
  // No Russian PDF is invented.
  { product: 'Oryx Calibration', language: 'ko', filename: 'OryxCalibration_고객소개브로셔_20261010.pdf', bytes: 3609975, sha256: 'c89bd464ca674cb309322a2758cd2409c0ec9adf91bc7e23525e7a346f12e93e' },
  { product: 'Oryx Calibration', language: 'en', filename: 'OryxCalibration_Introduction_EN_20261010.pdf', bytes: 3565406, sha256: '7cf8cd8437525f2b217aa135fa821129450ef25d7e69dbb2990b292d8129dd77' },
] as const;

const officialDocuments = [
  {
    "product": "Oryx DataStation",
    "language": "ko",
    "filename": "Oryx_DataStation_Brochure_WordingReview_20261010.pdf",
    "downloadName": "OryxDataStation_Brochure_KO.pdf",
    "bytes": 5796168,
    "sha256": "2c329721820cf5277a115525f0558810f218e8c0650407efec3e0a5f6eaf17b5"
  },
  {
    "product": "Oryx DataStation",
    "language": "en",
    "filename": "OryxDataStation_Brochure_EN_WordingReview_20261010.pdf",
    "downloadName": "OryxDataStation_Brochure_EN.pdf",
    "bytes": 5822289,
    "sha256": "2b12bf1faefecfd19ebd43634725ad0084a9f36f4b933b36bd38611e1856aff2"
  },
  {
    "product": "Oryx LockDown",
    "language": "ko",
    "filename": "Oryx_LockDown_Brochure_WordingReview_20261010.pdf",
    "downloadName": "OryxLockDown_Brochure_KO.pdf",
    "bytes": 6242160,
    "sha256": "0f7be262c540deeaf24e31a11f5028b4338c7ac045ba63ac300efaa3a76cb80d"
  },
  {
    "product": "Oryx LockDown",
    "language": "en",
    "filename": "OryxLockDown_Brochure_EN_WordingReview_20261010.pdf",
    "downloadName": "OryxLockDown_Brochure_EN.pdf",
    "bytes": 810611,
    "sha256": "9c21c52cf63a4b4c869b37872df7862e3ca54bdf7cbfe5d206cd9e0d0eaea854"
  },
  {
    "product": "Oryx Calibration",
    "language": "ko",
    "filename": "OryxCalibration_고객소개브로셔_20261010_WordingReview_20261010.pdf",
    "downloadName": "OryxCalibration_Brochure_KO.pdf",
    "bytes": 3609975,
    "sha256": "c89bd464ca674cb309322a2758cd2409c0ec9adf91bc7e23525e7a346f12e93e"
  },
  {
    "product": "Oryx Calibration",
    "language": "en",
    "filename": "OryxCalibration_Introduction_EN_20261010_WordingReview_20261010.pdf",
    "downloadName": "OryxCalibration_Brochure_EN.pdf",
    "bytes": 3565406,
    "sha256": "7cf8cd8437525f2b217aa135fa821129450ef25d7e69dbb2990b292d8129dd77"
  }
] as const;

const sha256 = (contents: Buffer) => createHash('sha256').update(contents).digest('hex');
const screenshotDirectory = process.env.QA_EVIDENCE_DIR
  ? join(process.cwd(), process.env.QA_EVIDENCE_DIR, 'screenshots')
  : join(process.cwd(), 'review', 'production-screenshots');

async function selectBrochureLanguage(page: Page, language: 'ko' | 'en') {
  const group = page.locator('.brochure-language');
  const selected = group.locator(`button[lang="${language}"]`);
  await selected.focus();
  await page.keyboard.press('Space');
  await expect(selected).toHaveAttribute('aria-pressed', 'true');
  await expect(group.locator(`button[lang="${language === 'ko' ? 'en' : 'ko'}"]`)).toHaveAttribute('aria-pressed', 'false');
  const expectedDocuments = officialDocuments.filter(document => document.language === language);
  for (const document of expectedDocuments) {
    await expect(page.locator(`a[download="${document.downloadName}"]`)).toHaveCount(1);
  }
}

test('brochure covers load as images without requesting PDFs before a click', async ({ page }, testInfo) => {
  const pdfRequests: string[] = [];
  page.on('request', request => { if (/\.pdf(?:[?#]|$)/i.test(request.url())) pdfRequests.push(request.url()); });
  await page.goto('/#brochures', { waitUntil: 'networkidle' });
  await expect(page.locator('main iframe, main embed, main object')).toHaveCount(0);
  for (const language of ['ko', 'en'] as const) {
    await selectBrochureLanguage(page, language);
    expect(await page.locator('#brochures').innerText()).not.toMatch(/WordingReview|20261010/);
    const covers = page.locator('.brochure-card .brochure-cover img');
    expect(await covers.count()).toBe(3);
    for (const cover of await covers.all()) {
      await expect(cover).toBeVisible();
      await expect(cover).not.toHaveAttribute('loading', 'lazy');
      await expect.poll(() => cover.evaluate(element => {
        const image = element as HTMLImageElement;
        return image.complete && image.naturalWidth > 0 && image.naturalHeight > 0;
      })).toBe(true);
      expect(await cover.getAttribute('src')).not.toMatch(/\.pdf(?:[?#]|$)/i);
    }
    await mkdir(screenshotDirectory, { recursive: true });
    await page.screenshot({ path: join(screenshotDirectory, `${testInfo.project.name}-brochures-${language}.png`) });
  }
  expect(pdfRequests).toEqual([]);
});

test('six published PDFs use clean download names and retain verified bytes over HTTP and browser downloads', async ({ page }) => {
  test.setTimeout(90_000);
  await page.goto('/#brochures');
  for (const language of ['ko', 'en'] as const) {
    await selectBrochureLanguage(page, language);
    for (const document of officialDocuments.filter(item => item.language === language)) {
      const downloadLink = page.locator(`a[download="${document.downloadName}"]`);
      const card = page.locator('.brochure-card').filter({ has: downloadLink });
      const expectedPath = `/downloads/${document.filename}`;
      const previews = card.locator(`a[href="${expectedPath}"][target="_blank"]`);
      await expect(previews).toHaveCount(2);
      await expect(downloadLink).toHaveAttribute('href', expectedPath);
      for (const preview of await previews.all()) {
        await expect(preview).toHaveAttribute('rel', /noopener/);
        await expect(preview).toHaveAccessibleName(/.+/);
      }
      const localBytes = await readFile(join(process.cwd(), 'public', 'downloads', document.filename));
      expect(localBytes.length, document.filename).toBe(document.bytes);
      expect(sha256(localBytes), document.filename).toBe(document.sha256);
      expect(localBytes.subarray(0, 5).toString()).toBe('%PDF-');
      const response = await page.request.get(expectedPath);
      expect(response.status(), expectedPath).toBe(200);
      expect(response.headers()['content-type'], expectedPath).toMatch(/^application\/pdf/);
      const servedBytes = await response.body();
      expect(servedBytes.subarray(0, 5).toString()).toBe('%PDF-');
      expect(servedBytes.length, document.filename).toBe(document.bytes);
      expect(sha256(servedBytes), document.filename).toBe(document.sha256);
      const [download] = await Promise.all([page.waitForEvent('download'), downloadLink.click()]);
      expect(download.suggestedFilename()).toBe(document.downloadName);
      expect(await download.failure()).toBeNull();
      const path = await download.path();
      expect(path).toBeTruthy();
      const downloadedBytes = await readFile(path!);
      expect(downloadedBytes.length, document.filename).toBe(document.bytes);
      expect(sha256(downloadedBytes), document.filename).toBe(document.sha256);
      await download.delete();
    }
  }
});

test('PDF previews open the same reviewed files in new tabs', async ({ page }) => {
  test.setTimeout(90_000);
  await page.goto('/#brochures');
  for (const language of ['ko', 'en'] as const) {
    await selectBrochureLanguage(page, language);
    for (const document of officialDocuments.filter(item => item.language === language)) {
      const downloadLink = page.locator(`a[download="${document.downloadName}"]`);
      const card = page.locator('.brochure-card').filter({ has: downloadLink });
      const preview = card.locator('.brochure-actions a[target="_blank"]');
      const sourceURL = page.url();
      const [popup] = await Promise.all([page.waitForEvent('popup'), preview.click()]);
      await expect(popup).toHaveURL(new URL(`/downloads/${document.filename}`, sourceURL).toString());
      expect(popup.url()).not.toBe(sourceURL);
      await popup.close();
      await expect(page).toHaveURL(sourceURL);
    }
  }
});

test('brochure anchors and keyboard languages preserve state and scroll across history', async ({ page }) => {
  await page.goto('/#calibration', { waitUntil: 'networkidle' });
  await expect(page.locator('main h1')).toHaveCount(1);
  await page.locator('#calibration a[href="#brochures"]').focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#brochures$/);
  await expect(page.locator('#brochures')).toBeFocused();
  await selectBrochureLanguage(page, 'en');
  const english = page.locator('.brochure-language button[lang="en"]');
  await english.scrollIntoViewIfNeeded();
  const before = await page.evaluate(() => window.scrollY);
  await english.focus();
  await page.keyboard.press('Space');
  expect(Math.abs((await page.evaluate(() => window.scrollY)) - before)).toBeLessThanOrEqual(2);
  await page.locator('a[href="#contact"]:visible').first().focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#contact$/);
  await page.goBack();
  await expect(page).toHaveURL(/#brochures$/);
  await expect(english).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('a[download="OryxDataStation_Brochure_EN.pdf"]')).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/#calibration$/);
  await page.goForward();
  await expect(page).toHaveURL(/#brochures$/);
  await expect(english).toHaveAttribute('aria-pressed', 'true');
  await selectBrochureLanguage(page, 'ko');
  await expect(page.locator('a[download="OryxDataStation_Brochure_KO.pdf"]')).toBeVisible();
  await page.reload({ waitUntil: 'networkidle' });
  await expect(page.locator('main h1')).toHaveCount(1);
  await expect(page.locator('.brochure-language button[lang="ko"]')).toHaveAttribute('aria-pressed', 'true');
  const opener = page.locator('.site-header > .header-inner .menu-trigger');
  if (await opener.isVisible()) {
    await opener.click();
    const dialog = page.locator('#mobile-menu');
    await dialog.locator('a[href="#calibration"]').focus();
    await page.keyboard.press('Enter');
    await expect(dialog).not.toBeVisible();
    await expect(page).toHaveURL(/#calibration$/);
    await opener.click();
    await dialog.locator('a[href="#brochures"]').focus();
    await page.keyboard.press('Enter');
    await expect(dialog).not.toBeVisible();
    await expect(page).toHaveURL(/#brochures$/);
    await expect(page.locator('#brochures')).toBeFocused();
  } else {
    await page.locator('.desktop-nav a[href="#brochures"]').focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#brochures$/);
  }
});


test('legacy brochure paths serve verified latest domain-reviewed files', async ({ request }) => {
  for (const document of legacyDocuments) {
    const original = await readFile(join(process.cwd(), 'public', 'downloads', document.filename));
    expect(original.length).toBe(document.bytes);
    expect(sha256(original)).toBe(document.sha256);
    const response = await request.get(`/downloads/${document.filename}`);
    expect(response.status()).toBe(200);
    expect(sha256(await response.body())).toBe(document.sha256);
  }
});
