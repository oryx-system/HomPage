import { test, expect, type Page } from '@playwright/test';

async function language(page: Page, value: 'ko' | 'en' | 'ru') {
  const trigger = page.locator('.language-trigger:visible').first();
  const box = await trigger.boundingBox();
  await page.mouse.click(box!.x + box!.width / 2, box!.y + box!.height / 2);
  await page.locator(`.language-options:visible [lang="${value}"]`).click();
  await expect(page.locator('html')).toHaveAttribute('lang', value);
}

test('brochure defaults follow UI language until the visitor chooses a PDF language', async ({ page }) => {
  await page.goto('/#brochures');
  for (const value of ['ko', 'en', 'ru'] as const) {
    await page.evaluate(value => localStorage.setItem('oryx-language', value), value);
    await page.reload();
    await expect(page.locator(`.brochure-language button[lang="${value === 'ko' ? 'ko' : 'en'}"]`)).toHaveAttribute('aria-pressed', 'true');
  }
  await expect(page.locator('.pdf-language-note')).toBeVisible();
  await page.locator('.brochure-language button[lang="ko"]').click();
  await language(page, 'en');
  await expect(page.locator('.brochure-language button[lang="ko"]')).toHaveAttribute('aria-pressed', 'true');
  await language(page, 'ko');
  await expect(page.locator('.brochure-language button[lang="ko"]')).toHaveAttribute('aria-pressed', 'true');
});

test('shared product titles, final brochure links and keyboard details work in three languages at enlarged text', async ({ page }) => {
  await page.goto('/#datastation');
  for (const value of ['ko', 'en', 'ru'] as const) {
    await language(page, value);
    await page.evaluate(() => document.documentElement.style.fontSize = '200%');
    for (const selector of ['.ds-detail-group', '.validation-detail-group']) {
      const details = page.locator(selector);
      const summary = details.locator(':scope > summary');
      await summary.focus();
      await page.keyboard.press('Enter');
      await expect(details).toHaveAttribute('open', '');
      const untranslated = await details.evaluate(element => [...element.querySelectorAll('p,h3,h4,li,summary')].filter(el => el.getClientRects().length && /[가-힣]/.test(el.textContent ?? '')).map(el => el.textContent));
      if (value !== 'ko') expect(untranslated).toEqual([]);
      const widths = await page.evaluate(() => ({viewport: document.documentElement.clientWidth, document: document.documentElement.scrollWidth}));
      expect(widths.document).toBeLessThanOrEqual(widths.viewport + 1);
      await summary.focus();
      await page.keyboard.press('Space');
      await expect(details).not.toHaveAttribute('open', '');
    }
    const sizes: string[] = [];
    for (const [id, title] of [['datastation', 'Oryx DataStation'], ['lockdown', 'Oryx LockDown'], ['calibration', 'Oryx Calibration']]) {
      const section = page.locator(`#${id}`);
      const heading = section.locator('h2.product-heading');
      await expect(heading).toHaveText(title);
      sizes.push(await heading.evaluate(element => getComputedStyle(element).fontSize));
      await expect(section.locator('.product-subtitle')).toHaveCount(1);
      await expect(section.locator('a[href="#contact"]')).toHaveCount(0);
      await expect(section.locator('a[href="#brochures"]')).toHaveCount(1);
      const link = section.locator('.lockdown-details a[href="#brochures"]');
      await expect(link).toHaveCount(1);
      await link.click();
      await expect(page).toHaveURL(/#brochures$/);
      await expect(page.locator('#brochure-heading')).toBeInViewport();
    }
    expect(new Set(sizes).size).toBe(1);
    await expect(page.locator('.ds-hero a[href="#brochures"]')).toHaveCount(0);
    await expect(page.locator('#home .hero-actions a')).toHaveCount(2);
    await expect(page.locator('#home .hero-actions a').first()).toHaveAttribute('href', '#datastation');
    const restoredButton = page.locator('#home .hero-actions a[href="#datastation"]');
    await expect(restoredButton).toHaveClass(/button-primary/);
    await expect(restoredButton).toHaveText({ ko: 'DataStation 살펴보기', en: 'View DataStation', ru: 'О DataStation' }[value]);
    await restoredButton.click();
    await expect(page).toHaveURL(/#datastation$/);
    await expect(page.locator('#ds-product-title')).toBeInViewport();
    await expect(page.locator('#datastation')).toBeFocused();
    const viewport = await page.evaluate(() => ({ width: innerWidth, document: document.documentElement.scrollWidth }));
    expect(viewport.document).toBeLessThanOrEqual(viewport.width + 1);
    await expect(page.locator('#home .hero-actions a').last()).toHaveAttribute('href', '#contact');
    await page.evaluate(() => document.documentElement.style.fontSize = '');
  }
});
