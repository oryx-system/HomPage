import { test, expect, type Page } from '@playwright/test';
import { createHash } from 'node:crypto';
import { mkdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Independent expected bytes from reviewed source documents, rather than
// values imported from the application's brochure data.
const originalDocuments = [
  { product: 'Oryx DataStation', language: 'ko', filename: 'Oryx_DataStation_Brochure.pdf', bytes: 5714476, sha256: '0dfa3a3911826c580a3c2e21e800af32f6f369b8a45e8c06790d459034ce74cd' },
  { product: 'Oryx LockDown', language: 'ko', filename: 'Oryx_LockDown_Brochure.pdf', bytes: 6200816, sha256: '662f9882d5d79259ab2ccb7f3381263e79d12c7313c016072b2efd4acc527055' },
  { product: 'Oryx DataStation', language: 'en', filename: 'OryxDataStation_Brochure_EN.pdf', bytes: 5802066, sha256: '23310048c56fd6285b51f9cfc962284e6baccfe04b9cdced4ea8dc3976ab2a11' },
  { product: 'Oryx LockDown', language: 'en', filename: 'OryxLockDown_Brochure_EN.pdf', bytes: 791484, sha256: '27e8275256f8af35f73dcfaa64157144eba5156164baf98432c607ce6e64b20a' },
  // Reviewed final 7-page originals; checks stay blocked until the approved
  // bytes and cards are present. No Russian PDF is invented.
  { product: 'Oryx Calibration', language: 'ko', filename: 'OryxCalibration_고객소개브로셔_20261010.pdf', bytes: 3580768, sha256: '8f20191487dc4a75162615dd676011a7b80563893ed5168a71f2c9f99a6f6690' },
  { product: 'Oryx Calibration', language: 'en', filename: 'OryxCalibration_Introduction_EN_20261010.pdf', bytes: 7120817, sha256: '16d5865761ad2a626ae96fd4d923e49861a09351caf42931c8483dd6bcbd23fa' },
] as const;

const officialDocuments = [
  {
    "product": "Oryx DataStation",
    "language": "ko",
    "filename": "Oryx_DataStation_Brochure_WordingReview_20261010.pdf",
    "downloadName": "OryxDataStation_Brochure_KO.pdf",
    "bytes": 5699290,
    "sha256": "566c6dd435858ce935edd6fa744dc975f478abc5de80a8e578dee87698208bd7"
  },
  {
    "product": "Oryx DataStation",
    "language": "en",
    "filename": "OryxDataStation_Brochure_EN_WordingReview_20261010.pdf",
    "downloadName": "OryxDataStation_Brochure_EN.pdf",
    "bytes": 5695812,
    "sha256": "f79b6c59601240eb02a95bb88466e3f5d31b51c8e2b618aed1b546093f91de22"
  },
  {
    "product": "Oryx LockDown",
    "language": "ko",
    "filename": "Oryx_LockDown_Brochure_WordingReview_20261010.pdf",
    "downloadName": "OryxLockDown_Brochure_KO.pdf",
    "bytes": 6216950,
    "sha256": "941bbcd0496b6a857bf42849abda29c8c8742afbced587204cf40a3be19c2f60"
  },
  {
    "product": "Oryx LockDown",
    "language": "en",
    "filename": "OryxLockDown_Brochure_EN_WordingReview_20261010.pdf",
    "downloadName": "OryxLockDown_Brochure_EN.pdf",
    "bytes": 804580,
    "sha256": "2e6223069a8573cc79deb5bf43f690a8fd964437861cd49d2a6a4ba6ae00ef51"
  },
  {
    "product": "Oryx Calibration",
    "language": "ko",
    "filename": "OryxCalibration_고객소개브로셔_20261010_WordingReview_20261010.pdf",
    "downloadName": "OryxCalibration_Brochure_KO.pdf",
    "bytes": 3610806,
    "sha256": "15c2b2e6e5afabdd9d7b7ded8ef4892049161fd4ba6929fa79e8267239b64ccd"
  },
  {
    "product": "Oryx Calibration",
    "language": "en",
    "filename": "OryxCalibration_Introduction_EN_20261010_WordingReview_20261010.pdf",
    "downloadName": "OryxCalibration_Brochure_EN.pdf",
    "bytes": 7136090,
    "sha256": "a106ac751afb2a1af50a81828c4e2b56fbb8fcae455e35bdc9ca9444f8ff8b9f"
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


test('six original brochure files remain byte-identical', async ({ request }) => {
  for (const document of originalDocuments) {
    const original = await readFile(join(process.cwd(), 'public', 'downloads', document.filename));
    expect(original.length).toBe(document.bytes);
    expect(sha256(original)).toBe(document.sha256);
    const response = await request.get(`/downloads/${document.filename}`);
    expect(response.status()).toBe(200);
    expect(sha256(await response.body())).toBe(document.sha256);
  }
});
