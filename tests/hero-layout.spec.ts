import { test, expect } from '@playwright/test';

test('hero CTAs share a row, height and text alignment without clipping enlarged translations', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  for (const language of ['ko', 'en', 'ru'] as const) {
    await page.evaluate(lang => localStorage.setItem('oryx-language', lang), language);
    await page.reload({ waitUntil: 'networkidle' });
    await expect(page.locator('html')).toHaveAttribute('lang', language);
    await expect(page.locator('.hero-actions svg')).toHaveCount(0);
    await expect(page.locator('.hero-actions a').nth(1)).toHaveAttribute('href', '#contact');
    await expect(page.locator('.hero-actions a').nth(1)).toHaveText({ ko: '도입 문의', en: 'Contact us', ru: 'Связаться' }[language]);
    await expect(page.locator('.hero-bottom')).toHaveCount(0);
    expect(await page.locator('.home-hero').innerText()).not.toMatch(/RECORDS\. SIGNATURES\. INTEGRITY\.|ЗАПИСИ\. ПОДПИСИ\. ЦЕЛОСТНОСТЬ\./);
    const stripGap = await page.evaluate(() => document.querySelector('.solution-directory')!.getBoundingClientRect().top - document.querySelector('.hero-layout')!.getBoundingClientRect().bottom);
    expect(Math.abs(stripGap)).toBeLessThanOrEqual(1);
    await expect(page.locator('.site-header a[href="#implementation"]')).toHaveCount(0);
    await expect(page.locator('#implementation')).toHaveCount(1);
    await expect(page.locator('#implementation .flow-steps > li')).toHaveCount(4);
    for (const id of ['about', 'datastation', 'lockdown', 'calibration', 'brochures', 'contact']) {
      await expect(page.locator('.desktop-nav a[href="#' + id + '"]')).toHaveCount(1);
      await expect(page.locator('#mobile-menu a[href="#' + id + '"]')).toHaveCount(1);
    }
    const normal = await page.locator('.hero-actions').evaluate(element => {
      const [first, second] = [...element.querySelectorAll('a')].map(a => a.getBoundingClientRect());
      return { top: second.y - first.y, height: second.height - first.height, gap: second.x - first.right, left: first.x - document.querySelector('.hero-lead')!.getBoundingClientRect().x };
    });
    expect(Math.abs(normal.top)).toBeLessThanOrEqual(1);
    expect(Math.abs(normal.height)).toBeLessThanOrEqual(1);
    expect(normal.gap).toBeCloseTo(12, 0);
    expect(Math.abs(normal.left)).toBeLessThanOrEqual(1);
    await page.evaluate(() => document.documentElement.style.fontSize = '200%');
    const fits = await page.locator('.hero-actions').evaluate(element => ({ page: document.documentElement.scrollWidth <= innerWidth + 1, buttons: [...element.querySelectorAll('a')].every(a => a.scrollWidth <= a.clientWidth + 1) }));
    expect(fits).toEqual({ page: true, buttons: true });
  }
});
