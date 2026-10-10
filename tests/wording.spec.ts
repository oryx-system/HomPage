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

test('privacy notice describes website inquiries without publishing internal policy work', async ({ page }) => {
  await page.goto('/#privacy', { waitUntil: 'networkidle' });
  for (const language of ['ko', 'en', 'ru']) {
    await page.evaluate(lang => localStorage.setItem('oryx-language', lang), language);
    await page.reload({ waitUntil: 'networkidle' });
    await expect(page.locator('html')).toHaveAttribute('lang', language);
    const notice = page.locator('#privacy .privacy-brief');
    await expect(notice.locator('p')).toHaveCount(1);
    await expect(page.locator('main form, main input, main textarea')).toHaveCount(0);
    expect(await notice.innerText()).not.toMatch(/확인과 확정|подтверждения оператором|requires.*operator/i);
    if (language !== 'ko') expect(await notice.innerText()).not.toMatch(/[가-힣]/);
    await page.addStyleTag({ content: '#privacy p { font-size:200% !important }' });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    await expect(page.locator('#contact a[href^="mailto:"]').last()).toHaveAttribute('href', 'mailto:schong@oryxsystem.co.kr?subject=Oryx%20DataSafe');
  }
});
