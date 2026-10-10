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

test('approved monitor stays still while its shield and label brighten together, respecting reduced motion', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/#home', { waitUntil: 'networkidle' });
  const monitor = page.locator('.hero-monitor');
  const light = monitor.locator('.hero-security-light');
  await expect(monitor).toBeVisible();
  await expect(monitor).toHaveAttribute('viewBox', '660 80 880 850');
  await expect(monitor).toHaveAccessibleName(/.+/);
  await expect(monitor.locator('image')).toHaveCount(2);
  // The effect repeats the approved bitmap at the same coordinates; it does
  // not introduce a second shield drawing or move the monitor.
  await expect(monitor.locator(':scope > path, :scope > circle, :scope > polygon, :scope > rect')).toHaveCount(0);
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
    const group = element.querySelector('.hero-security-light')!;
    const animation = group.getAnimations()[0];
    const target = (animation?.effect as KeyframeEffect | null)?.target;
    const masks = [...element.querySelectorAll('image')].map(image => {
      const id = image.getAttribute('mask')?.match(/^url\(#(.+)\)$/)?.[1];
      const mask = id ? document.getElementById(id) : null;
      return { id, exists: Boolean(mask), type: mask?.tagName.toLowerCase(), paths: mask?.querySelectorAll('path').length };
    });
    const base = element.querySelector(':scope > image')!;
    return {
      duration: animation?.effect?.getTiming().duration,
      iterations: animation?.effect?.getTiming().iterations === Infinity ? 'infinite' : animation?.effect?.getTiming().iterations,
      groupAnimations: group.getAnimations().length,
      groupIsAnimated: target === group,
      childAnimations: [...group.children].map(child => child.getAnimations().length),
      sharedGroup: Boolean(group.querySelector('image') && group.querySelector('text')),
      baseAnimations: base.getAnimations().length,
      monitorAnimations: element.getAnimations().length,
      baseTransform: getComputedStyle(base).transform,
      monitorTransform: getComputedStyle(element).transform,
      edgeMask: getComputedStyle(element).maskImage,
      lightFilter: getComputedStyle(group).filter,
      pulseFilter: getComputedStyle(group.querySelector('image')!).filter,
      labelFill: getComputedStyle(group.querySelector('text')!).fill,
      masks,
    };
  });
  expect(effect.duration).toBe(4400);
  expect(effect.iterations).toBe('infinite');
  expect(effect.groupAnimations).toBe(1);
  expect(effect.groupIsAnimated).toBe(true);
  expect(effect.sharedGroup).toBe(true);
  expect(effect.childAnimations).toEqual([0, 0]);
  expect(effect.baseAnimations).toBe(0);
  expect(effect.monitorAnimations).toBe(0);
  expect(effect.baseTransform).toBe('none');
  expect(effect.monitorTransform).toBe('none');
  expect(effect.edgeMask).not.toBe('none');
  expect(effect.lightFilter).not.toBe('none');
  expect(Number(effect.pulseFilter.match(/brightness\(([^)]+)\)/)?.[1])).toBeGreaterThanOrEqual(2);
  expect(Number(effect.pulseFilter.match(/saturate\(([^)]+)\)/)?.[1])).toBeGreaterThanOrEqual(1.2);
  const labelRGB = effect.labelFill.match(/[\d.]+/g)?.map(Number) ?? [];
  expect(labelRGB[0]).toBeGreaterThanOrEqual(200);
  expect(labelRGB[1]).toBeGreaterThanOrEqual(240);
  expect(labelRGB[2]).toBeGreaterThanOrEqual(245);
  expect(effect.masks.every(mask => mask.exists && mask.type === 'mask' && mask.paths! > 0)).toBe(true);

  await mkdir(directory, { recursive: true });
  const frames = [];
  for (const [phase, milliseconds] of [['min', 0], ['max', 2200]] as const) {
    await light.evaluate((element, time) => {
      const animation = element.getAnimations()[0]; animation.pause(); animation.currentTime = time;
    }, milliseconds);
    await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => resolve())));
    const box = await monitor.boundingBox();
    const opacity = await light.evaluate(element => Number(getComputedStyle(element).opacity));
    frames.push({ phase, milliseconds, box, opacity });
    await monitor.screenshot({ path: join(directory, `${testInfo.project.name}-hero-${phase}.png`) });
  }
  expect(frames[0].opacity).toBeGreaterThanOrEqual(0.15);
  expect(frames[0].opacity).toBeLessThanOrEqual(0.2);
  expect(frames[1].opacity).toBeGreaterThanOrEqual(0.9);
  expect(frames[1].opacity - frames[0].opacity).toBeGreaterThanOrEqual(0.6);
  expect(frames[0].box).toEqual(frames[1].box);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const reduced = () => light.evaluate(element => ({ opacity: Number(getComputedStyle(element).opacity), animations: element.getAnimations().length }));
  await expect.poll(async () => (await reduced()).animations).toBe(0);
  const reducedEffect = await reduced();
  expect(reducedEffect.opacity).toBeGreaterThanOrEqual(0.7);
  expect(reducedEffect.opacity).toBeLessThanOrEqual(0.75);
  await expect(monitor).toBeVisible();
  const reducedBox = await monitor.boundingBox();
  expect(reducedBox).toEqual(frames[0].box);
  await monitor.screenshot({ path: join(directory, `${testInfo.project.name}-hero-reduced.png`) });
  await writeFile(join(directory, `${testInfo.project.name}-hero-evidence.json`), JSON.stringify({ approvedImage, approvedBytes, approvedSHA256, effect, frames, reducedEffect, reducedBox, errors }, null, 2));
  expect(errors).toEqual([]);
});
