import { test, expect } from '@playwright/test';
import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const approvedImage = '/oryx-datasafe-monitor-hero.webp';
const approvedBytes = 47474;
const approvedSHA256 = 'ebb0810a322815d0acce1d6a13d34f18d5cc3652972ab0fc32de23ee02fc8566';
const directory = process.env.QA_EVIDENCE_DIR
  ? join(process.cwd(), process.env.QA_EVIDENCE_DIR, 'screenshots')
  : join(process.cwd(), 'review', 'production-screenshots');

test('only the approved monitor padlock disappears fully and returns every three seconds, respecting reduced motion', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/#home', { waitUntil: 'networkidle' });
  const monitor = page.locator('.hero-monitor');
  const light = monitor.locator('.hero-lock-light');
  await expect(monitor).toBeVisible();
  await expect(monitor).toHaveAttribute('viewBox', '660 80 880 850');
  await expect(monitor).toHaveAccessibleName(/.+/);
  await expect(page.locator('.hero-artwork figcaption')).toHaveCount(0);
  const baseLabel = monitor.locator(':scope > text');
  await expect(baseLabel).toHaveCount(1);
  await expect(baseLabel).toHaveText('DATA SECURITY');
  await expect(monitor.locator('text')).toHaveCount(1);
  await expect(light.locator('text')).toHaveCount(0);
  await expect(light.locator('image')).toHaveCount(1);
  await expect(light.locator('.hero-lock-pulse')).toHaveAttribute('mask', 'url(#lock-light-mask)');
  const background = monitor.locator(':scope > .hero-lock-background');
  await expect(background).toHaveCount(1);
  await expect(background.locator('rect')).toHaveCount(1);
  const exclusion = monitor.locator('#monitor-edge-mask .hero-lock-exclusion');
  await expect(exclusion).toHaveCount(1);
  await expect(exclusion).toHaveAttribute('fill', 'black');
  await expect(monitor.locator('image')).toHaveCount(2);
  // Keep the approved bitmap intact. A static dark replacement removes its
  // baked lock, and the original lock pixels supply the fading foreground.
  for (const image of await monitor.locator('image').all()) {
    await expect(image).toHaveAttribute('href', approvedImage);
    await expect(image).toHaveAttribute('width', '1536');
    await expect(image).toHaveAttribute('height', '1024');
  }
  const response = await page.request.get(approvedImage);
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toMatch(/^image\/webp/);
  const imageBytes = await response.body();
  expect(imageBytes.length).toBe(approvedBytes);
  expect(createHash('sha256').update(imageBytes).digest('hex')).toBe(approvedSHA256);
  expect(await page.evaluate(async source => {
    const image = new Image(); image.src = source; await image.decode();
    return { width: image.naturalWidth, height: image.naturalHeight };
  }, approvedImage)).toEqual({ width: 1536, height: 1024 });
  await expect.poll(() => page.locator('.hero-artwork').evaluate(element => getComputedStyle(element).opacity)).toBe('1');
  await monitor.scrollIntoViewIfNeeded();
  const effect = await monitor.evaluate(element => {
    const group = element.querySelector('.hero-lock-light')!;
    const animation = group.getAnimations()[0];
    const target = (animation?.effect as KeyframeEffect | null)?.target;
    const masks = [...element.querySelectorAll('image')].map(image => {
      const id = image.getAttribute('mask')?.match(/^url\(#(.+)\)$/)?.[1];
      const mask = id ? document.getElementById(id) : null;
      return { id, exists: Boolean(mask), type: mask?.tagName.toLowerCase(), paths: mask?.querySelectorAll('path').length };
    });
    const base = element.querySelector(':scope > image')!;
    const baseMask = base.getAttribute('mask')?.match(/^url\(#(.+)\)$/)?.[1];
    const exclusion = baseMask ? document.getElementById(baseMask)?.querySelector('.hero-lock-exclusion') : null;
    const background = element.querySelector(':scope > .hero-lock-background')!;
    const backgroundFill = background.querySelector('rect')?.getAttribute('fill');
    const gradientID = backgroundFill?.match(/^url\(#(.+)\)$/)?.[1];
    const gradient = gradientID ? document.getElementById(gradientID) : null;
    const stops = [...gradient?.querySelectorAll('stop') ?? []].map(stop => getComputedStyle(stop).stopColor);
    return {
      duration: animation?.effect?.getTiming().duration,
      iterations: animation?.effect?.getTiming().iterations === Infinity ? 'infinite' : animation?.effect?.getTiming().iterations,
      groupAnimations: group.getAnimations().length,
      groupIsAnimated: target === group,
      childAnimations: [...group.children].map(child => child.getAnimations().length),
      lockOnlyGroup: Boolean(group.children.length === 1 && group.querySelector('image') && !group.querySelector('text')),
      baseAnimations: base.getAnimations().length,
      monitorAnimations: element.getAnimations().length,
      baseTransform: getComputedStyle(base).transform,
      monitorTransform: getComputedStyle(element).transform,
      edgeMask: getComputedStyle(element).maskImage,
      lightFilter: getComputedStyle(group).filter,
      pulseFilter: getComputedStyle(group.querySelector('image')!).filter,
      bakedLockExcluded: Boolean(exclusion && getComputedStyle(exclusion).fill === 'rgb(0, 0, 0)'),
      backgroundGradientExists: gradient?.tagName.toLowerCase() === 'lineargradient',
      backgroundStops: stops,
      backgroundBehindBase: Boolean(background.compareDocumentPosition(base) & Node.DOCUMENT_POSITION_FOLLOWING),
      masks,
    };
  });
  expect(effect.duration).toBe(3000);
  expect(effect.iterations).toBe('infinite');
  expect(effect.groupAnimations).toBe(1);
  expect(effect.groupIsAnimated).toBe(true);
  expect(effect.lockOnlyGroup).toBe(true);
  expect(effect.childAnimations).toEqual([0]);
  expect(effect.baseAnimations).toBe(0);
  expect(effect.monitorAnimations).toBe(0);
  expect(effect.baseTransform).toBe('none');
  expect(effect.monitorTransform).toBe('none');
  expect(effect.edgeMask).not.toBe('none');
  expect(effect.lightFilter).toBe('none');
  expect(effect.pulseFilter).toBe('none');
  expect(effect.bakedLockExcluded).toBe(true);
  expect(effect.backgroundBehindBase).toBe(true);
  expect(effect.backgroundGradientExists).toBe(true);
  expect(effect.backgroundStops.length).toBeGreaterThanOrEqual(2);
  for (const stop of effect.backgroundStops) {
    const channels = stop.match(/[\d.]+/g)?.map(Number) ?? [];
    expect(channels).toHaveLength(3);
    expect(Math.max(...channels)).toBeLessThanOrEqual(128);
  }
  expect(effect.masks.every(mask => mask.exists && mask.type === 'mask' && mask.paths! > 0)).toBe(true);

  await mkdir(directory, { recursive: true });
  const frames = [];
  for (const [phase, milliseconds] of [['min', 0], ['max', 1500]] as const) {
    await light.evaluate((element, time) => {
      const animation = element.getAnimations()[0]; animation.pause(); animation.currentTime = time;
    }, milliseconds);
    await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => resolve())));
    const box = await monitor.boundingBox();
    const opacity = await light.evaluate(element => Number(getComputedStyle(element).opacity));
    const label = await baseLabel.evaluate(element => {
      const style = getComputedStyle(element);
      const box = element.getBoundingClientRect();
      return { text: element.textContent, fill: style.fill, opacity: style.opacity, filter: style.filter,
        animations: element.getAnimations().length,
        box: { x: box.x, y: box.y, width: box.width, height: box.height } };
    });
    const backdrop = await background.evaluate(element => {
      const style = getComputedStyle(element);
      const box = element.getBoundingClientRect();
      return { opacity: style.opacity, filter: style.filter, transform: style.transform,
        animations: element.getAnimations().length,
        childAnimations: [...element.children].map(child => child.getAnimations().length),
        box: { x: box.x, y: box.y, width: box.width, height: box.height } };
    });
    frames.push({ phase, milliseconds, box, opacity, label, backdrop });
    await monitor.screenshot({ path: join(directory, `${testInfo.project.name}-hero-${phase}.png`) });
  }
  expect(frames[0].opacity).toBe(0);
  expect(frames[1].opacity).toBe(1);
  expect(frames[1].opacity - frames[0].opacity).toBeGreaterThanOrEqual(0.95);
  expect(frames[0].box).toEqual(frames[1].box);
  expect(frames[0].label).toEqual(frames[1].label);
  expect(frames[0].label.opacity).toBe('1');
  expect(frames[0].label.filter).toBe('none');
  expect(frames[0].label.animations).toBe(0);
  expect(frames[0].backdrop).toEqual(frames[1].backdrop);
  expect(frames[0].backdrop.opacity).toBe('1');
  expect(frames[0].backdrop.filter).toBe('none');
  expect(frames[0].backdrop.transform).toBe('none');
  expect(frames[0].backdrop.animations).toBe(0);
  expect(frames[0].backdrop.childAnimations).toEqual([0]);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const reduced = () => light.evaluate(element => ({ opacity: Number(getComputedStyle(element).opacity), animations: element.getAnimations().length }));
  await expect.poll(async () => (await reduced()).animations).toBe(0);
  const reducedEffect = await reduced();
  expect(reducedEffect.opacity).toBe(1);
  await expect(monitor).toBeVisible();
  const reducedBox = await monitor.boundingBox();
  expect(reducedBox).toEqual(frames[0].box);
  await monitor.screenshot({ path: join(directory, `${testInfo.project.name}-hero-reduced.png`) });
  await writeFile(join(directory, `${testInfo.project.name}-hero-evidence.json`), JSON.stringify({ approvedImage, approvedBytes, approvedSHA256, effect, frames, reducedEffect, reducedBox, errors }, null, 2));
  expect(errors).toEqual([]);
});
