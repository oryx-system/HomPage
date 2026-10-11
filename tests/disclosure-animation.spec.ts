import { test, expect, type Page } from '@playwright/test';

test.use({ reducedMotion: 'no-preference' });
const detailsSelector = '.ds-detail-group';
const summarySelector = detailsSelector + ' > summary';
type Sample = { t: number; y: number; top: number; height: number; duration?: number; expanded: string | null; hash: string; focused: boolean };

async function positionToggle(page: Page, position: 'top' | 'middle' | 'bottom') {
  await page.locator(summarySelector).evaluate((el, position) => {
    (el as HTMLElement).focus({ preventScroll: true });
    const rect = el.getBoundingClientRect();
    const top = position === 'top' ? document.querySelector('.site-header')!.getBoundingClientRect().height + 12
      : position === 'middle' ? innerHeight / 2 : innerHeight - rect.height - 16;
    scrollTo({ top: scrollY + rect.top - top, behavior: 'instant' });
  }, position);
  await page.waitForTimeout(100);
}

async function record(page: Page) {
  await page.evaluate(() => {
    const recorder = window as unknown as { disclosureSamples: Sample[]; disclosureStart: number; activationDuration?: number };
    const frames: Sample[] = [];
    recorder.disclosureSamples = frames;
    recorder.activationDuration = undefined;
    const activation = () => {
      const duration = document.querySelector('.ds-detail-group')!.getAnimations()[0]?.effect?.getTiming().duration;
      recorder.activationDuration = typeof duration === 'number' ? duration : undefined;
      document.removeEventListener('click', activation);
      document.removeEventListener('keydown', activation);
    };
    document.addEventListener('click', activation);
    document.addEventListener('keydown', activation);
    let start = 0;
    const sample = () => {
      const details = document.querySelector('.ds-detail-group')!;
      const summary = details.querySelector('summary')!;
      const duration = details.getAnimations()[0]?.effect?.getTiming().duration;
      frames.push({ t: performance.now() - start, y: scrollY, top: summary.getBoundingClientRect().top,
        height: details.getBoundingClientRect().height, duration: typeof duration === 'number' ? duration : undefined,
        expanded: summary.getAttribute('aria-expanded'), hash: location.hash, focused: document.activeElement === summary });
      if (performance.now() - start < 600) requestAnimationFrame(sample);
    };
    const begin = () => {
      document.removeEventListener('click', begin, true);
      document.removeEventListener('keydown', begin, true);
      start = performance.now();
      recorder.disclosureStart = start;
      sample();
    };
    document.addEventListener('click', begin, true);
    document.addEventListener('keydown', begin, true);
  });
}

async function activate(page: Page, touch: boolean, keyboard = false) {
  if (keyboard) { await page.keyboard.press('Space'); return; }
  const bounds = (await page.locator(summarySelector).boundingBox())!;
  const x = bounds.x + bounds.width / 2, y = bounds.y + bounds.height / 2;
  if (touch) await page.touchscreen.tap(x, y);
  else await page.mouse.click(x, y);
}

async function samples(page: Page) {
  await page.waitForTimeout(650);
  return page.evaluate(() => {
    const recorder = window as unknown as { disclosureSamples: Sample[]; disclosureStart: number };
    const details = document.querySelector('.ds-detail-group')!;
    const summary = details.querySelector('summary')!;
    // Include the actual settled endpoint even when a backgrounded renderer
    // delivers fewer RAF callbacks; interpolation is checked independently.
    return [...recorder.disclosureSamples, { t: performance.now() - recorder.disclosureStart, y: scrollY,
      top: summary.getBoundingClientRect().top, height: details.getBoundingClientRect().height,
      expanded: summary.getAttribute('aria-expanded'), hash: location.hash, focused: document.activeElement === summary }];
  });
}

function stable(records: Sample[]) {
  const initial = records[0];
  expect(records.length).toBeGreaterThan(1);
  expect(Math.max(...records.map(s => Math.abs(s.top - initial.top))), JSON.stringify(records)).toBeLessThanOrEqual(1);
  expect(Math.max(...records.map(s => Math.abs(s.y - initial.y)))).toBeLessThanOrEqual(1);
  expect(records.every(s => s.hash === initial.hash)).toBe(true);
  expect(records.at(-1)!.focused).toBe(true);
}

test('opening and closing preserve top, middle and bottom toggle positions with pointer, touch and keyboard in three languages', async ({ page }, info) => {
  test.setTimeout(90_000);
  for (const lang of ['ko', 'en', 'ru']) {
    await page.addInitScript(lang => localStorage.setItem('oryx-language', lang), lang);
    await page.goto('/?animation=' + lang, { waitUntil: 'networkidle' });
    for (const position of ['top', 'middle', 'bottom'] as const) for (const keyboard of [false, true]) {
      await positionToggle(page, position);
      for (const expanded of [true, false]) {
        await record(page);
        await activate(page, Boolean(info.project.use.hasTouch), keyboard);
        await expect(page.locator(summarySelector)).toHaveAttribute('aria-expanded', String(expanded));
        const frames = await samples(page);
        stable(frames);
        const first = frames[0].height, last = frames.at(-1)!.height;
        expect(Math.abs(last - first)).toBeGreaterThan(500);
        expect(await page.evaluate(() => (window as unknown as { activationDuration: number }).activationDuration)).toBe(300);
        const differences = frames.slice(1).map((s, i) => s.height - frames[i].height);
        expect(differences.every(delta => expanded ? delta >= -1 : delta <= 1)).toBe(true);
        await expect(page.locator(detailsSelector)).toHaveJSProperty('open', expanded);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      }
    }
  }
});

test('measured height interpolates between both endpoints at 150ms of the 300ms transition', async ({ page }) => {
  await page.goto('/?animation=interpolation', { waitUntil: 'networkidle' });
  await positionToggle(page, 'middle');
  for (const expanded of [true, false]) {
    const measurements = await page.locator(detailsSelector).evaluate(el => {
      el.querySelector('summary')!.click();
      const animation = el.getAnimations()[0];
      animation.pause();
      const heights = [0, 75, 150, 225, 300].map(time => {
        animation.currentTime = time;
        return el.getBoundingClientRect().height;
      });
      const duration = animation.effect!.getTiming().duration;
      animation.finish();
      return { heights, duration };
    });
    expect(measurements.duration).toBe(300);
    const h = measurements.heights;
    expect(Math.abs(h[4] - h[0])).toBeGreaterThan(500);
    expect(h[2]).toBeGreaterThan(Math.min(h[0], h[4]) + 5);
    expect(h[2]).toBeLessThan(Math.max(h[0], h[4]) - 5);
    expect(h.slice(1).every((height, index) => expanded ? height > h[index] : height < h[index])).toBe(true);
    await expect(page.locator(detailsSelector)).toHaveJSProperty('open', expanded);
    await expect.poll(() => page.locator(detailsSelector).evaluate(el => (el as HTMLElement).style.height)).toBe('');
  }
});

test('mid-transition reversals and fast repeated toggles finish at the requested state without scrolling', async ({ page }, info) => {
  await page.goto('/?animation=rapid', { waitUntil: 'networkidle' });
  await positionToggle(page, 'middle');
  await record(page);
  for (let i = 0; i < 5; i++) {
    await activate(page, Boolean(info.project.use.hasTouch));
    await page.waitForTimeout(45);
  }
  const frames = await samples(page);
  stable(frames);
  await expect(page.locator(summarySelector)).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator(detailsSelector)).toHaveJSProperty('open', true);
  await expect(page.locator(detailsSelector)).toHaveCSS('height', /px$/);
  expect(await page.locator(detailsSelector).evaluate(el => (el as HTMLElement).style.height)).toBe('');
  await activate(page, Boolean(info.project.use.hasTouch));
  await page.waitForTimeout(75);
  await activate(page, Boolean(info.project.use.hasTouch));
  await page.waitForTimeout(400);
  await expect(page.locator(detailsSelector)).toHaveJSProperty('open', true);
  await activate(page, Boolean(info.project.use.hasTouch));
  await page.waitForTimeout(400);
  await expect(page.locator(detailsSelector)).toHaveJSProperty('open', false);
  await expect(page.locator('#ds-disclosure-content')).toHaveAttribute('inert', '');
});

test('reduced motion has no height animation and closing at the document end only clamps to its new height', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/?animation=reduced', { waitUntil: 'networkidle' });
  await positionToggle(page, 'middle');
  await record(page);
  await page.keyboard.press('Enter');
  stable(await samples(page));
  expect(await page.locator(detailsSelector).evaluate(el => el.getAnimations().length)).toBe(0);
  await page.keyboard.press('Enter');
  await expect(page.locator(detailsSelector)).toHaveJSProperty('open', false);
  await page.keyboard.press('Enter');
  // The following scroll is a test setup operation, after pending navigation
  // cancellation; actual wheel/touch input releases that guard immediately.
  await expect.poll(() => page.locator('html').evaluate(el => (el as HTMLElement).style.getPropertyValue('scroll-behavior'))).toBe('');
  await page.evaluate(() => scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
  await page.keyboard.press('Enter');
  await expect(page.locator(detailsSelector)).toHaveJSProperty('open', false);
  const position = await page.evaluate(() => ({ y: scrollY, max: document.documentElement.scrollHeight - innerHeight }));
  expect(position.y).toBeCloseTo(position.max, 0);
  await expect(page.locator(summarySelector)).toBeFocused();
});
