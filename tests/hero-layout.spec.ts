import { test, expect } from '@playwright/test';

test('hero CTAs share a row, height and text alignment without clipping enlarged translations', async ({ page }) => {
  for (const language of ['ko', 'en', 'ru']) {
    await page.addInitScript(lang => localStorage.setItem('oryx-language', lang), language);
    await page.goto('/', { waitUntil: 'networkidle' });
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
