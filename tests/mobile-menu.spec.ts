import { test, expect, type Locator, type Page } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

type Language = 'ko' | 'en' | 'ru';
const languages: Language[] = ['ko', 'en', 'ru'];
const evidence = join(process.cwd(), process.env.QA_EVIDENCE_DIR || 'review/mobile-menu-qa', 'screenshots');
const trigger = (page: Page) => page.locator('.site-header > .header-inner .menu-trigger');
const panel = (page: Page) => page.locator('#mobile-menu');

async function pointerClick(page: Page, element: Locator) {
  const bounds = await element.boundingBox();
  expect(bounds).toBeTruthy();
  // Clicking the visible fixed header must not scroll the reader to its DOM position.
  await page.mouse.click(bounds!.x + bounds!.width / 2, bounds!.y + bounds!.height / 2);
}

async function selectLanguage(page: Page, language: Language) {
  await pointerClick(page, page.locator('.language-trigger'));
  const option = page.locator(`.language-options [data-language="${language}"]`);
  for (let step = 0; step < 3; step += 1) {
    if (await option.evaluate(element => element === document.activeElement)) break;
    await page.keyboard.press('ArrowDown');
  }
  await expect(option).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('html')).toHaveAttribute('lang', language);
  await expect(page.locator('.language-options')).not.toBeVisible();
}

async function noOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    document: document.documentElement.scrollWidth,
    body: document.body.scrollWidth,
  }));
  expect(dimensions.document, JSON.stringify(dimensions)).toBeLessThanOrEqual(dimensions.viewport + 1);
  expect(dimensions.body, JSON.stringify(dimensions)).toBeLessThanOrEqual(dimensions.viewport + 1);
}

async function expectHeaderControlsFit(page: Page) {
  const layout = await page.evaluate(() => {
    const boxes = [...document.querySelectorAll('.site-header .brand, .desktop-nav, .language-trigger, .site-header .menu-trigger')]
      .filter(element => element.getClientRects().length > 0 && getComputedStyle(element).visibility !== 'hidden')
      .map(element => element.getBoundingClientRect());
    return {
      outside: boxes.some(box => box.left < -1 || box.right > document.documentElement.clientWidth + 1),
      overlap: boxes.some((a, index) => boxes.slice(index + 1).some(b =>
        Math.min(a.right, b.right) - Math.max(a.left, b.left) > 1 &&
        Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 1,
      )),
    };
  });
  expect(layout, 'Header controls remain inside the viewport and do not cover each other').toEqual({ outside: false, overlap: false });
}

async function expectPanelGeometry(page: Page) {
  await expect(panel(page)).toBeVisible();
  await expect.poll(async () => page.evaluate(() => {
    const header = document.querySelector('.site-header')!.getBoundingClientRect();
    const menu = document.querySelector('#mobile-menu')!.getBoundingClientRect();
    const viewport = window.visualViewport;
    const bottom = viewport ? viewport.offsetTop + viewport.height : window.innerHeight;
    return Math.abs(menu.top - header.bottom) <= 1 && menu.bottom <= bottom + 1;
  }), { message: 'Disclosure follows the measured header and fits the visual viewport' }).toBe(true);
  const semantics = await panel(page).evaluate(element => ({
    tag: element.tagName,
    role: element.getAttribute('role'),
    modal: element.getAttribute('aria-modal'),
    hidden: element.getAttribute('aria-hidden'),
    inert: element.hasAttribute('inert'),
    overflow: getComputedStyle(element).overflowY,
    bodyLocked: document.body.style.overflow === 'hidden',
    mainInert: document.querySelector('main')!.hasAttribute('inert'),
  }));
  expect(semantics).toMatchObject({ tag: 'DIV', role: 'region', modal: null, hidden: 'false', inert: false, overflow: 'auto', bodyLocked: false, mainInert: false });
  await noOverflow(page);
}

async function openMenu(page: Page) {
  await pointerClick(page, trigger(page));
  await expect(trigger(page)).toHaveAttribute('aria-expanded', 'true');
  await expectPanelGeometry(page);
}

async function closeWithEscape(page: Page) {
  await page.keyboard.press('Escape');
  await expect(panel(page)).not.toBeVisible();
  await expect(trigger(page)).toHaveAttribute('aria-expanded', 'false');
  await expect(trigger(page)).toBeFocused();
  await expect(panel(page)).toHaveAttribute('aria-hidden', 'true');
  expect(await panel(page).evaluate(element => element.hasAttribute('inert'))).toBe(true);
}

async function capture(page: Page, name: string) {
  await mkdir(evidence, { recursive: true });
  await page.screenshot({ path: join(evidence, `${name}.png`) });
}

// Model text enlargement using actual computed sizes. Changing the root font
// alone would leave this site's fixed-pixel controls at their original size.
async function enlargeText(page: Page) {
  return page.evaluate(() => {
    const targets = [...document.querySelectorAll<HTMLElement>('body *')].filter(element =>
      element instanceof HTMLElement && (element.getClientRects().length > 0 || element.closest('#mobile-menu')) &&
      !['SCRIPT', 'STYLE'].includes(element.tagName) && Boolean(element.textContent?.trim()),
    );
    const snapshot = targets.map(element => ({ element, size: parseFloat(getComputedStyle(element).fontSize) }));
    const originalTrigger = parseFloat(getComputedStyle(document.querySelector('.language-trigger')!).fontSize);
    // The instant disclosure is display:none while closed. Its text still
    // needs the same enlargement when the user opens it after changing size.
    const originalMenuLink = parseFloat(getComputedStyle(document.querySelector('#mobile-menu nav a')!).fontSize);
    for (const { element, size } of snapshot) element.style.fontSize = `${size * 2}px`;
    return { languageTrigger: originalTrigger, menuLink: originalMenuLink };
  });
}

test('instant menu keeps header controls usable and adapts to viewport and enlarged text', async ({ page }, testInfo) => {
  test.setTimeout(120_000);
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/#home', { waitUntil: 'networkidle' });
  test.skip(!await trigger(page).isVisible(), 'Desktop uses its visible navigation');

  for (const language of languages) {
    await selectLanguage(page, language);
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    const transition = await panel(page).evaluate(element => getComputedStyle(element).transitionDuration.split(',').map(value => parseFloat(value)));
    expect(Math.max(...transition), 'The menu opens immediately, including with normal motion enabled').toBe(0);
    await openMenu(page);
    const menuLinks = panel(page).locator('nav a');
    await expect(menuLinks.first()).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(menuLinks.nth(1)).toHaveAttribute('href', '#about');
    await expect(menuLinks.nth(1)).toBeFocused();
    await trigger(page).focus();
    // Tablets also retain the visible header contact action in the natural order.
    for (let step = 0; step < 2; step += 1) {
      await page.keyboard.press('Shift+Tab');
      if (await page.locator('.language-trigger').evaluate(element => element === document.activeElement)) break;
    }
    await expect(page.locator('.language-trigger')).toBeFocused();

    // Escape dismisses the language submenu first, then the disclosure.
    await page.keyboard.press('Enter');
    await expect(page.locator('.language-options')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('.language-options')).not.toBeVisible();
    await expect(panel(page)).toBeVisible();
    await selectLanguage(page, language);
    await expect(panel(page)).toBeVisible();
    await expectPanelGeometry(page);
    await capture(page, `${testInfo.project.name}-${language}-menu`);
    await closeWithEscape(page);

    await page.emulateMedia({ reducedMotion: 'reduce' });
    const reduced = await panel(page).evaluate(element => getComputedStyle(element).transitionDuration.split(',').map(value => parseFloat(value)));
    expect(Math.max(...reduced)).toBe(0);
    await openMenu(page);
    await panel(page).locator('a[href="#contact"]').focus();
    await page.keyboard.press('Tab');
    expect(await page.locator('.site-header').evaluate(element => element.contains(document.activeElement))).toBe(false);
    await expect(panel(page)).not.toBeVisible();

    await openMenu(page);
    await pointerClick(page, trigger(page));
    await expect(panel(page)).not.toBeVisible();
    await expect(trigger(page)).toBeFocused();
    await openMenu(page);
    // The branded header is outside the disclosure; a real outside pointer closes it.
    const brand = await page.locator('.site-header .brand').boundingBox();
    await page.mouse.move(brand!.x + brand!.width / 2, brand!.y + brand!.height / 2);
    await page.mouse.down();
    await expect(panel(page)).not.toBeVisible();
    await page.mouse.up();
  }

  if (testInfo.project.name === 'phone-390') {
    for (const language of languages) {
      for (const viewport of [{ width: 320, height: 740 }, { width: 390, height: 320 }, { width: 844, height: 390 }]) {
        await page.setViewportSize(viewport);
        await page.goto('/#home', { waitUntil: 'networkidle' });
        await selectLanguage(page, language);
        await openMenu(page);
        const last = panel(page).locator('a[href="#contact"]');
        await last.focus();
        const within = await last.evaluate(element => {
          const bounds = element.getBoundingClientRect();
          const parent = document.querySelector('#mobile-menu')!.getBoundingClientRect();
          return bounds.top >= parent.top - 1 && bounds.bottom <= parent.bottom + 1;
        });
        expect(within, `${language} ${viewport.width}×${viewport.height}: last action can be scrolled into view`).toBe(true);
        await capture(page, `${language}-${viewport.width}x${viewport.height}-scrolled-menu`);
        await closeWithEscape(page);
      }
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/#home', { waitUntil: 'networkidle' });
    await selectLanguage(page, 'ru');
    await openMenu(page);
    const originalHeight = await page.locator('.site-header').evaluate(element => element.getBoundingClientRect().height);
    await page.locator('.header-inner').evaluate(element => { (element as HTMLElement).style.minHeight = '165px'; });
    await expect.poll(async () => page.locator('.site-header').evaluate(element => element.getBoundingClientRect().height)).toBeGreaterThan(originalHeight);
    await expectPanelGeometry(page);
    await closeWithEscape(page);
    await page.locator('.header-inner').evaluate(element => { (element as HTMLElement).style.removeProperty('min-height'); });

    // The System header switches at 1280/1281px. Russian is the longest
    // navigation translation and must fit on both sides of that boundary.
    for (const width of [1280, 1281]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/#home', { waitUntil: 'networkidle' });
      await selectLanguage(page, 'ru');
      await noOverflow(page);
      await expectHeaderControlsFit(page);
      if (width === 1280) {
        await expect(trigger(page)).toBeVisible();
        await openMenu(page);
        await closeWithEscape(page);
      } else {
        await expect(trigger(page)).not.toBeVisible();
        await expect(page.locator('.desktop-nav')).toBeVisible();
      }
      await capture(page, `ru-header-boundary-${width}`);
    }
  }
  expect(errors).toEqual([]);
});

test('company introduction leads the document and the Korean hero remains readable at enlarged text', async ({ page }, testInfo) => {
  test.setTimeout(90_000);
  await page.goto('/#home', { waitUntil: 'networkidle' });
  const order = await page.evaluate(() => {
    const home = document.querySelector('#home')!;
    const about = document.querySelector('#about')!;
    const proof = document.querySelector('.proof-strip')!;
    return Boolean(home.compareDocumentPosition(about) & Node.DOCUMENT_POSITION_FOLLOWING) &&
      Boolean(about.compareDocumentPosition(proof) & Node.DOCUMENT_POSITION_FOLLOWING) && !home.contains(about);
  });
  expect(order, 'Hero → company introduction → proof strip').toBe(true);
  await expect(page.locator('.desktop-nav a').first()).toHaveAttribute('href', '#about');
  await expect(panel(page).locator('nav a').nth(1)).toHaveAttribute('href', '#about');
  await noOverflow(page);
  const headline = page.locator('#home-heading');
  expect((await headline.textContent())!.replace(/\s/g, '')).toBe('데이터를지키고,기록의신뢰를이어갑니다.');
  if (page.viewportSize()!.width <= 390) {
    const lines = await headline.evaluate(element => {
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
      const tops: number[] = [];
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        if (!node.textContent?.trim() || !node.parentElement?.getClientRects().length) continue;
        const range = document.createRange();
        range.selectNodeContents(node);
        for (const bounds of range.getClientRects()) {
          if (bounds.width && !tops.some(top => Math.abs(top - bounds.top) < 2)) tops.push(bounds.top);
        }
      }
      return tops.length;
    });
    expect(lines, `Rendered Korean headline at ${page.viewportSize()!.width}px`).toBe(2);
  }

  for (const language of languages) {
      await page.goto('/#home', { waitUntil: 'networkidle' });
      // Revisiting an identical hash may be a same-document navigation. Reset
      // the browser-only enlargement before measuring the next language.
      await page.reload({ waitUntil: 'networkidle' });
      await selectLanguage(page, language);
      const original = await enlargeText(page);
      expect(await page.locator('.language-trigger').evaluate(element => parseFloat(getComputedStyle(element).fontSize))).toBe(original.languageTrigger * 2);
      expect(await page.locator('.skip-link').evaluate(element => element.getBoundingClientRect().bottom),
        `Unfocused ${language} skip link stays above the viewport at enlarged text`).toBeLessThanOrEqual(0);
      await expect(page.locator('.language-trigger')).toBeVisible();
      await expectHeaderControlsFit(page);
      const labelFits = await page.locator('.language-trigger').evaluate(element => {
        const range = document.createRange();
        range.selectNodeContents(element);
        const box = element.getBoundingClientRect();
        return [...range.getClientRects()].every(rect => rect.left >= box.left - 1 && rect.right <= box.right + 1 && rect.top >= box.top - 1 && rect.bottom <= box.bottom + 1);
      });
      expect(labelFits, `Enlarged ${language} language name stays inside its control`).toBe(true);
      if (await trigger(page).isVisible()) {
        await openMenu(page);
        await expect(panel(page).locator('nav a').first()).toHaveCSS('font-size', `${original.menuLink * 2}px`);
        await panel(page).locator('a[href="#contact"]').focus();
        await noOverflow(page);
        await capture(page, `${testInfo.project.name}-${language}-text200-menu`);
        await closeWithEscape(page);
      } else {
        await noOverflow(page);
        await capture(page, `${testInfo.project.name}-${language}-text200-header`);
      }
      await page.locator('#home-heading').scrollIntoViewIfNeeded();
      await page.evaluate(() => {
        const title = document.querySelector('#home-heading')!.getBoundingClientRect();
        const header = document.querySelector('.site-header')!.getBoundingClientRect();
        window.scrollBy({ top: title.top - header.bottom - 24, behavior: 'instant' });
      });
      const titleFits = await headline.evaluate(element => {
        const box = element.getBoundingClientRect();
        const clip = element.closest('.hero-copy')!.getBoundingClientRect();
        return box.left >= clip.left - 1 && box.right <= clip.right + 1 && element.scrollWidth <= element.clientWidth + 1;
      });
      expect(titleFits, `Enlarged ${language} hero may wrap but must not be clipped`).toBe(true);
      await capture(page, `${testInfo.project.name}-${language}-text200-hero`);
  }
});
