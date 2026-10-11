import { test, expect } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

test('customer scope, product uses and original brochure entry stay readable at 335/390px and desktop in all languages', async ({ browser, baseURL }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1440', 'This test creates its own nine viewport/language contexts.');
  test.setTimeout(90_000);
  const root = join(process.env.QA_EVIDENCE_DIR || 'review', 'customer-readability');
  await mkdir(root, { recursive: true });
  const evidence: unknown[] = [];
  for (const width of [335, 390, 1440]) for (const language of ['ko', 'en', 'ru']) {
    const context = await browser.newContext({ baseURL, viewport: { width, height: width < 700 ? 844 : 1000 }, hasTouch: width < 700, isMobile: width < 700, reducedMotion: 'reduce' });
    await context.addInitScript(lang => localStorage.setItem('oryx-language', lang), language);
    const page = await context.newPage();
    const errors: string[] = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('/?customer-review=' + width + language, { waitUntil: 'networkidle' });
    const heading = page.locator('#home-heading');
    await expect(heading).toContainText(language === 'ko' ? '고객 맞춤' : language === 'en' ? 'Custom software' : 'Индивидуальная');
    await expect(heading).toContainText(language === 'ko' ? '소프트웨어 개발' : language === 'en' ? 'development' : 'разработка программ');
    await expect(page.locator('.hero-lead')).toContainText(language === 'ko' ? '개별 업무 프로그램' : language === 'en' ? 'custom business software' : 'индивидуальные рабочие программы');
    await expect(page.locator('.hero-keywords li')).toHaveCount(3);
    await expect(page.locator('.hero-actions svg')).toHaveCount(0);
    const boxes = await page.locator('.hero-actions a').evaluateAll(elements => elements.map(e => { const r = e.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top }; }));
    expect(boxes[0].right).toBeLessThanOrEqual(boxes[1].left);
    expect(boxes[0].top).toBeCloseTo(boxes[1].top, 0);
    expect(await page.locator('.hero-lead').evaluate(e => Number(getComputedStyle(e).fontWeight))).toBeLessThan(600);
    await expect(page.locator('.site-header a[href="#implementation"]')).toHaveCount(0);
    await expect(page.locator('#implementation')).toHaveCount(1);
    for (const id of ['datastation', 'lockdown', 'calibration']) {
      const purpose = page.locator(`#${id} .product-subtitle`).first();
      await expect(purpose).toBeVisible();
      expect(await purpose.evaluate(e => parseFloat(getComputedStyle(e).fontSize))).toBeGreaterThanOrEqual(22);
    }
    await expect(page.locator('.brochure-purpose')).toHaveCount(3);
    await expect(page.locator('.brochure-cover img')).toHaveCount(3);
    await expect(page.locator('.brochure-actions a[download]')).toHaveCount(3);
    const contrastRatios = await page.locator('.brochure-entry-note, .brochure-purpose').evaluateAll(elements => {
      const luminance = (color: string) => color.match(/[\d.]+/g)!.slice(0, 3).map(Number).map(c => c / 255).map(c => c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4).reduce((sum, c, i) => sum + c * [.2126, .7152, .0722][i], 0);
      return elements.map(element => {
        let background: Element | null = element;
        while (background && getComputedStyle(background).backgroundColor === 'rgba(0, 0, 0, 0)') background = background.parentElement;
        const a = luminance(getComputedStyle(element).color), b = luminance(getComputedStyle(background!).backgroundColor);
        return (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
      });
    });
    expect(Math.min(...contrastRatios)).toBeGreaterThanOrEqual(4.5);
    const snapshot = await page.evaluate(() => ({
      title: document.querySelector('#home-heading')!.textContent,
      lead: document.querySelector('.hero-lead')!.textContent,
      purposes: [...document.querySelectorAll('.product-subtitle')].map(e => e.textContent),
      brochurePurposes: [...document.querySelectorAll('.brochure-purpose')].map(e => e.textContent),
      overflow: document.documentElement.scrollWidth > innerWidth,
    }));
    expect(snapshot.overflow).toBe(false);
    if (language !== 'ko') expect([snapshot.title, snapshot.lead, ...snapshot.purposes, ...snapshot.brochurePurposes].join(' ')).not.toMatch(/[가-힣]/);
    await page.screenshot({ path: `${root}/hero-${width}-${language}.png` });
    for (const id of ['about', 'datastation', 'lockdown', 'calibration', 'brochures']) {
      await page.locator('#' + id).evaluate(e => e.scrollIntoView({ behavior: 'instant', block: 'start' }));
      await page.waitForTimeout(50);
      await page.screenshot({ path: `${root}/${id}-${width}-${language}.png` });
    }
    await page.evaluate(() => document.documentElement.style.fontSize = '200%');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(errors).toEqual([]);
    evidence.push({ width, language, ...snapshot, contrastRatios, enlargedOverflow: false, errors });
    await context.close();
  }
  await writeFile(`${root}/screen-checks.json`, JSON.stringify(evidence, null, 2));
});
