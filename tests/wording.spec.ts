import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
const privacyText = JSON.parse(readFileSync(new URL('../review/shared-privacy-text.json', import.meta.url), 'utf8')) as Record<string, string>;

test('regulatory scope and custom software introduction remain readable in KO/EN/RU', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  for (const language of ['ko','en','ru'] as const) {
    await page.evaluate(lang => localStorage.setItem('oryx-language', lang), language);
    await page.reload({ waitUntil: 'networkidle' });
    const scope = page.locator('#validation .section-heading p').last();
    await expect(scope).toContainText('21 CFR Part 11');
    await expect(scope).toContainText('ALCOA');
    await expect(scope).not.toContainText('ALCOA+');
    const introduction = page.locator('#about .company-summary');
    await expect(page.locator('#about .section-kicker')).toHaveText('Company');
    await expect(introduction.locator('p')).toHaveCount(3);
    await expect(introduction.locator('.form-note')).toHaveCount(0);
    await expect(introduction).not.toContainText('Compliance');
    await expect(introduction).toContainText({ ko: '맞춤 업무 프로그램', en: 'custom business software', ru: 'индивидуальные рабочие программы' }[language]);
    for (const product of ['DataStation', 'LockDown', 'Calibration']) await expect(introduction).toContainText(product);
    if (language !== 'ko') {
      expect(await scope.innerText()).not.toMatch(/[가-힣]/);
      expect(await introduction.innerText()).not.toMatch(/[가-힣]/);
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
  for (const language of ['ko', 'en', 'ru'] as const) {
    await page.evaluate(lang => localStorage.setItem('oryx-language', lang), language);
    await page.reload({ waitUntil: 'networkidle' });
    await expect(page.locator('html')).toHaveAttribute('lang', language);
    const notice = page.locator('#privacy .privacy-brief');
    await expect(notice.locator('p')).toHaveCount(1);
    await expect(notice.locator('p')).toHaveText(privacyText[language]);
    await expect(page.locator('main form, main input, main textarea')).toHaveCount(0);
    expect(await notice.innerText()).not.toMatch(/확인과 확정|подтверждения оператором|requires.*operator/i);
    if (language !== 'ko') expect(await notice.innerText()).not.toMatch(/[가-힣]/);
    await page.addStyleTag({ content: '#privacy p { font-size:200% !important }' });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    await expect(page.locator('#contact a[href^="mailto:"]').last()).toHaveAttribute('href', 'mailto:schong@oryxsystem.co.kr?subject=Oryx%20DataSafe');
    await expect(page.locator('#contact .button')).toHaveText({ ko: '메일 보내기', en: 'Send email', ru: 'Отправить письмо' }[language]);
    await expect(page.locator('#contact .form-note')).toHaveCount(0);
  }
});
