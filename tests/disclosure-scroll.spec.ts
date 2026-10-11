import { test, expect } from '@playwright/test';

test.use({ reducedMotion: 'no-preference' });

test('DataStation details retain the toggle context on collapse across languages, anchors and reload', async ({ page }) => {
  test.setTimeout(60_000);
  await page.goto('/', { waitUntil: 'networkidle' });
  for (const language of ['ko', 'en', 'ru']) {
    await page.evaluate(lang => localStorage.setItem('oryx-language', lang), language);
    await page.goto('/?disclosure-check=' + language + '#datastation', { waitUntil: 'networkidle' });
    const details = page.locator('.ds-detail-group');
    const summary = details.locator(':scope > summary');
    await summary.evaluate(element => window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - 180, behavior: 'instant' }));
    const clickVisibleSummary = async () => {
      const bounds = await summary.boundingBox();
      expect(bounds).toBeTruthy();
      await page.mouse.click(bounds!.x + bounds!.width / 2, bounds!.y + bounds!.height / 2);
    };
    for (let repeat = 0; repeat < 2; repeat++) {
      const top = await summary.evaluate(element => element.getBoundingClientRect().top);
      await clickVisibleSummary();
      await expect(details).toHaveAttribute('open', '');
      await expect(details.locator('.ds-workflow')).toContainText('01');
      await clickVisibleSummary();
      await expect(details).not.toHaveAttribute('open');
      expect(await summary.evaluate(element => element.getBoundingClientRect().top)).toBeCloseTo(top, 0);
    }
    await clickVisibleSummary();
    await expect(details).toHaveAttribute('open', '');
    await page.mouse.wheel(0, 800);
    await page.waitForTimeout(300);
    expect(await summary.evaluate(element => element.getBoundingClientRect().top)).toBeLessThan(0);
    await expect(summary).toBeFocused();
    await page.evaluate(() => {
      const recorder = window as unknown as Window & { collapsePositions: number[] };
      recorder.collapsePositions = [];
      const start = performance.now();
      const sample = () => {
        const detail = document.querySelector<HTMLDetailsElement>('.ds-detail-group')!;
        if (!detail.open) recorder.collapsePositions.push(detail.querySelector('summary')!.getBoundingClientRect().top);
        if (performance.now() - start < 250) requestAnimationFrame(sample);
      };
      requestAnimationFrame(sample);
    });
    await page.keyboard.press('Enter');
    await expect(details).not.toHaveAttribute('open');
    await page.waitForTimeout(300);
    const header = await page.locator('.site-header').evaluate(element => element.getBoundingClientRect().height);
    const samples = await page.evaluate(() => (window as unknown as Window & { collapsePositions: number[] }).collapsePositions);
    expect(samples.length).toBeGreaterThan(0);
    expect(samples.every(top => top >= header + 10 && top <= header + 14), JSON.stringify(samples)).toBe(true);
    await expect(page).toHaveURL(/#datastation$/);
    const readingPosition = await page.evaluate(() => window.scrollY);
    const opener = page.locator('.site-header .menu-trigger');
    if (await opener.isVisible()) { await opener.focus(); await page.keyboard.press('Enter'); }
    await page.locator('.site-header a[href="#lockdown"]:visible').first().focus();
    await page.keyboard.press('Enter');
    await expect.poll(async () => page.locator('#lockdown').evaluate(element => {
      const top = element.getBoundingClientRect().top;
      const header = document.querySelector('.site-header')!.getBoundingClientRect().height;
      return top >= header - 1 && top <= header + 16;
    })).toBe(true);
    await page.waitForTimeout(200);
    const beforeReload = await page.evaluate(() => window.scrollY);
    await page.reload({ waitUntil: 'networkidle' });
    expect(await page.evaluate(() => window.scrollY)).toBeCloseTo(beforeReload, 0);
    await page.goBack();
    await expect(page).toHaveURL(/#datastation$/);
    await page.waitForTimeout(200);
    expect(await page.evaluate(() => window.scrollY)).toBeCloseTo(readingPosition, 0);
  }
});
