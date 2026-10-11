import { test, expect } from '@playwright/test';

test.use({ reducedMotion: 'no-preference' });

test('toggle activation stops previous smooth navigation at its current position', async ({ page }) => {
  await page.goto('/?disclosure=inflight', { waitUntil: 'networkidle' });
  const summary = page.locator('.ds-detail-group > summary');
  await summary.evaluate(el => {
    (el as HTMLElement).focus({ preventScroll: true });
    scrollTo({ top: scrollY + el.getBoundingClientRect().top - innerHeight / 2, behavior: 'instant' });
  });
  for (const expanded of [true, false]) {
    await page.evaluate(() => {
      const recorder = window as unknown as { activationY: number; activationHash: string };
      document.querySelector('.ds-detail-group > summary')!.addEventListener('keydown', () => {
        recorder.activationY = scrollY;
        recorder.activationHash = location.hash;
      }, { once: true, capture: true });
      scrollTo({ top: scrollY + 250, behavior: 'smooth' });
    });
    await page.waitForTimeout(35);
    await page.keyboard.press(expanded ? 'Enter' : 'Space');
    await page.waitForTimeout(550);
    const position = await page.evaluate(() => {
      const recorder = window as unknown as { activationY: number; activationHash: string };
      return { y: scrollY, activation: recorder.activationY, hash: location.hash, initialHash: recorder.activationHash };
    });
    expect(position.y).toBeCloseTo(position.activation, 0);
    expect(position.hash).toBe(position.initialHash);
    await expect(summary).toHaveAttribute('aria-expanded', String(expanded));
    await expect(summary).toBeFocused();
  }
});

test('animated collapse at the document end only follows the document height limit', async ({ page }) => {
  await page.goto('/?disclosure=end', { waitUntil: 'networkidle' });
  const summary = page.locator('.ds-detail-group > summary');
  await summary.evaluate(el => {
    (el as HTMLElement).focus({ preventScroll: true });
    scrollTo({ top: scrollY + el.getBoundingClientRect().top - innerHeight / 2, behavior: 'instant' });
  });
  await page.keyboard.press('Enter');
  await page.waitForTimeout(400);
  await page.evaluate(() => {
    scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' });
    const recorder = window as unknown as { heightLimitSamples: { y: number; max: number }[] };
    recorder.heightLimitSamples = [];
    const start = performance.now();
    const record = () => {
      recorder.heightLimitSamples.push({ y: scrollY, max: document.documentElement.scrollHeight - innerHeight });
      if (performance.now() - start < 550) requestAnimationFrame(record);
    };
    record();
  });
  await page.keyboard.press('Enter');
  await page.waitForTimeout(600);
  const frames = await page.evaluate(() => [...(window as unknown as { heightLimitSamples: { y: number; max: number }[] }).heightLimitSamples,
    { y: scrollY, max: document.documentElement.scrollHeight - innerHeight }]);
  expect(frames.length).toBeGreaterThan(1);
  expect(frames.every(frame => Math.abs(frame.y - frame.max) <= 1), JSON.stringify(frames)).toBe(true);
  await expect(page.locator('.ds-detail-group')).toHaveJSProperty('open', false);
  await expect(summary).toBeFocused();
});
