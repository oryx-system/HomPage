import { test, expect } from '@playwright/test';
test.use({ reducedMotion: 'no-preference' });

test('reload preserves top and reading position without a startup scroll while user anchors still work', async ({ page }) => {
  test.setTimeout(60_000);
  await page.addInitScript(() => {
    const recorder = window as unknown as Window & { reloadPositions: number[] };
    recorder.reloadPositions = [];
    const sample = () => {
      if (document.querySelector('#home h1')) recorder.reloadPositions.push(window.scrollY);
      if (performance.now() < 1800) requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
  });
  for (const address of ['/', '/?reload-check=hash#contact']) {
    await page.goto(address, { waitUntil: 'networkidle' });
    for (const position of [0, 2200, 0]) {
      await page.evaluate(top => window.scrollTo({ top, behavior: 'instant' }), position);
      await page.waitForTimeout(150);
      expect(await page.evaluate(() => window.scrollY)).toBeCloseTo(position, 0);
      for (let repeat = 0; repeat < 2; repeat++) {
        await page.reload({ waitUntil: 'networkidle' });
        await page.waitForTimeout(400);
        expect(await page.evaluate(() => window.scrollY), address + ' reload at ' + position).toBeCloseTo(position, 0);
        const samples = await page.evaluate(() => (window as unknown as Window & { reloadPositions: number[] }).reloadPositions);
        expect(samples.length).toBeGreaterThan(0);
        expect(samples.every(top => Math.abs(top - position) <= 2), JSON.stringify({ address, position, repeat, samples })).toBe(true);
      }
    }
  }
  await page.goto('/#calibration', { waitUntil: 'networkidle' });
  await expect.poll(async () => page.locator('#calibration').evaluate(element => Math.round(element.getBoundingClientRect().top))).toBeGreaterThanOrEqual(0);
  const opener = page.locator('.menu-trigger');
  if (await opener.isVisible()) await opener.click();
  const link = page.locator('.site-header a[href="#datastation"]:visible').first();
  await link.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#datastation$/);
  await expect.poll(async () => page.locator('#datastation').evaluate(element => {
    const top = element.getBoundingClientRect().top;
    const header = document.querySelector('.site-header')!.getBoundingClientRect().height;
    return top >= header - 1 && top <= header + 16;
  })).toBe(true);
  await expect(page.locator('#datastation')).toBeFocused();
  await page.goBack();
  await expect(page).toHaveURL(/#calibration$/);
  await expect.poll(async () => page.locator('#calibration').evaluate(element => {
    const top = element.getBoundingClientRect().top;
    const header = document.querySelector('.site-header')!.getBoundingClientRect().height;
    return top >= header - 1 && top <= header + 16;
  })).toBe(true);
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('smooth');
  expect(await page.evaluate(() => history.scrollRestoration)).toBe('auto');
});

