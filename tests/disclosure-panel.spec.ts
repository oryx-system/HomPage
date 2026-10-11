import { test, expect } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

test('panel boundaries and bottom collapse retain the closed control in nine viewport/language combinations', async ({ browser, baseURL }, info) => {
  test.skip(info.project.name !== 'desktop-1440', 'Creates its own mobile and desktop contexts.');
  test.setTimeout(120_000);
  const root = join(process.env.QA_EVIDENCE_DIR || 'review', 'disclosure-panel');
  await mkdir(root, { recursive: true });
  const results: unknown[] = [];
  for (const width of [335, 390, 1440]) for (const language of ['ko', 'en', 'ru'] as const) {
    const context = await browser.newContext({ baseURL, viewport: { width, height: width < 700 ? 844 : 1000 }, isMobile: width < 700, hasTouch: width < 700, reducedMotion: 'no-preference' });
    await context.addInitScript(l => localStorage.setItem('oryx-language', l), language);
    const page = await context.newPage();
    await page.goto('/', { waitUntil: 'networkidle' });
    const details = page.locator('.ds-detail-group'), summary = details.locator(':scope > summary'), close = details.locator('.ds-disclosure-close');
    await summary.click();
    await expect.poll(() => details.evaluate(e => (e as HTMLElement).style.height)).toBe('');
    await expect(close).toHaveText({ ko: '상세 내용 접기', en: 'Collapse details', ru: 'Свернуть подробности' }[language]);
    await expect(details.locator('.ds-disclosure-footer p')).toHaveText({ ko: '상세 내용 끝', en: 'End of details', ru: 'Конец подробностей' }[language]);
    const colors = await details.evaluate(e => ({ border: getComputedStyle(e).borderTopWidth, background: getComputedStyle(e.querySelector('.ds-disclosure-content')!).backgroundColor }));
    expect(colors).toEqual({ border: '1px', background: 'rgb(244, 247, 251)' });
    await summary.evaluate(e => window.scrollTo({ top: scrollY + e.getBoundingClientRect().top - document.querySelector('.site-header')!.getBoundingClientRect().bottom - 16, behavior: 'instant' }));
    await page.waitForTimeout(500);
    await page.screenshot({ path: join(root, `start-${width}-${language}.png`) });
    await close.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: join(root, `end-${width}-${language}.png`) });
    const before = await page.evaluate(() => {
      const s = document.querySelector('.ds-detail-group > summary')!.getBoundingClientRect(), b = document.querySelector('.ds-disclosure-close')!.getBoundingClientRect();
      return { y: scrollY, hash: location.hash, height: document.querySelector('.ds-detail-group')!.getBoundingClientRect().height, expectedTop: Math.max(document.querySelector('.site-header')!.getBoundingClientRect().bottom + 16, Math.min(b.top, innerHeight - s.height - 16)) };
    });
    await close.evaluate(button => button.addEventListener('click', () => {
      const frames: { height: number; y: number }[] = [];
      (window as unknown as { collapseFrames: typeof frames }).collapseFrames = frames;
      const deadline = performance.now() + 450;
      const sample = () => {
        frames.push({ height: document.querySelector('.ds-detail-group')!.getBoundingClientRect().height, y: scrollY });
        if (performance.now() < deadline) requestAnimationFrame(sample);
      };
      requestAnimationFrame(sample);
    }, { once: true, capture: true }));
    if (width < 700) await close.tap();
    else if (language === 'ko') await close.click();
    else { await close.focus(); await page.keyboard.press(language === 'en' ? 'Space' : 'Enter'); }
    await expect(details).not.toHaveAttribute('open', '');
    await expect(summary).toBeFocused();
    await expect(summary).toHaveAttribute('aria-expanded', 'false');
    await expect(summary).toBeInViewport();
    await page.waitForTimeout(100);
    const after = await summary.evaluate(e => ({ top: e.getBoundingClientRect().top, y: scrollY, hash: location.hash, height: document.querySelector('.ds-detail-group')!.getBoundingClientRect().height, atEnd: scrollY >= document.documentElement.scrollHeight - innerHeight - 1, overflow: document.documentElement.scrollWidth > innerWidth }));
    // Browser scrolling rounds to a device pixel.
    expect(Math.abs(after.top - before.expectedTop)).toBeLessThanOrEqual(1);
    expect(after.hash).toBe(before.hash);
    expect(after.atEnd).toBe(false);
    expect(after.overflow).toBe(false);
    const frames = await page.evaluate(() => (window as unknown as { collapseFrames: { height: number; y: number }[] }).collapseFrames);
    expect(frames.some(f => f.height < before.height - 2 && f.height > after.height + 2)).toBe(true);
    expect(frames.some(f => f.y < before.y - 2 && f.y > after.y + 2)).toBe(true);
    await page.screenshot({ path: join(root, `closed-${width}-${language}.png`) });
    // Reduced motion closes immediately but still leaves the same control visible.
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await summary.click();
    await close.scrollIntoViewIfNeeded();
    await page.evaluate(() => document.documentElement.style.fontSize = '200%');
    await close.click();
    await expect(summary).toBeInViewport();
    await expect(summary).toBeFocused();
    expect(await details.evaluate(e => e.getAnimations().length)).toBe(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    results.push({ width, language, colors, before, frames, after, reducedMotionAndEnlargedText: true });
    await context.close();
  }
  await writeFile(join(root, 'checks.json'), JSON.stringify(results, null, 2));
});

test('new user navigation cancels bottom-collapse scrolling', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/', { waitUntil: 'networkidle' });
  const summary = page.locator('.ds-detail-group > summary');
  await summary.click();
  await expect.poll(() => page.locator('.ds-detail-group').evaluate(e => (e as HTMLElement).style.height)).toBe('');
  await page.locator('.ds-disclosure-close').click();
  await page.waitForTimeout(70);
  await page.keyboard.press('Control+Home');
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  await page.waitForTimeout(450);
  expect(await page.evaluate(() => scrollY)).toBe(0);
  await expect(page.locator('.ds-detail-group')).not.toHaveAttribute('open', '');
});
