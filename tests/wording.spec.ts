import { test, expect } from '@playwright/test';

test('regulatory scope and logo explanation remain readable in KO/EN/RU', async ({ page }) => {
  for (const language of ['ko','en','ru']) {
    await page.addInitScript(lang => localStorage.setItem('oryx-language', lang), language);
    await page.goto('/', { waitUntil: 'networkidle' });
    const scope = page.locator('#validation .section-heading p').last();
    await expect(scope).toContainText('21 CFR Part 11');
    await expect(scope).toContainText('ALCOA');
    await expect(scope).not.toContainText('ALCOA+');
    const logo = page.locator('#about .company-summary .form-note');
    await expect(logo).toContainText('Compliance');
    if (language !== 'ko') {
      expect(await scope.innerText()).not.toMatch(/[가-힣]/);
      expect(await logo.innerText()).not.toMatch(/[가-힣]/);
    }
    await page.addStyleTag({ content: '#validation p,#about p{font-size:200% !important}' });
    await page.locator('#validation summary').click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)).toBe(false);
    await expect(page.locator('#validation a[target="_blank"]')).toHaveAttribute('href', 'https://www.ecfr.gov/current/title-21/chapter-I/subchapter-A/part-11');
    await expect(page.locator('#contact a[href="tel:+821065450415"]')).toHaveText('010-6545-0415');
  }
});
