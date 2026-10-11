import { test, expect, type Page } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const sections = ['home', 'about', 'datastation', 'lockdown', 'calibration', 'brochures', 'implementation', 'validation', 'privacy', 'contact'];
const screenshotSections = new Set(['home', 'datastation', 'lockdown', 'calibration', 'brochures', 'contact']);
const screenshotDirectory = process.env.QA_EVIDENCE_DIR
  ? join(process.cwd(), process.env.QA_EVIDENCE_DIR, 'screenshots')
  : join(process.cwd(), 'review', 'production-screenshots');

async function selectSiteLanguage(page: Page, language: 'ko' | 'en' | 'ru') {
  const trigger = page.locator('.language-trigger:visible').first();
  const bounds = await trigger.boundingBox();
  expect(bounds).toBeTruthy();
  // Locator.click scrolls a sticky ancestor into view before clicking it.
  // A user can click the already-visible header without that synthetic scroll.
  await page.mouse.click(bounds!.x + bounds!.width / 2, bounds!.y + bounds!.height / 2);
  const options = page.locator('.language-options:visible');
  const option = options.locator(`[role="menuitemradio"][data-language="${language}"], [role="menuitemradio"][lang="${language}"]`);
  await expect(option).toHaveCount(1);
  for (let step = 0; step < 3; step += 1) {
    if (await option.evaluate(element => element === document.activeElement)) break;
    await page.keyboard.press('ArrowDown');
  }
  await expect(option).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('html')).toHaveAttribute('lang', language);
  await expect(options).not.toBeVisible();
}

async function expectNoOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, document: document.documentElement.scrollWidth, body: document.body.scrollWidth }));
  expect(dimensions.document, JSON.stringify(dimensions)).toBeLessThanOrEqual(dimensions.viewport + 1);
  expect(dimensions.body, JSON.stringify(dimensions)).toBeLessThanOrEqual(dimensions.viewport + 1);
}

async function expectReadableTypography(page: Page) {
  const measurements = await page.evaluate(() => {
    const visible = (element: Element) => element.getClientRects().length > 0 && getComputedStyle(element).visibility !== 'hidden';
    const measure = (selector: string) => [...document.querySelectorAll(selector)].filter(visible).map(element => ({
      selector,
      text: element.textContent?.trim().slice(0, 120),
      fontSize: parseFloat(getComputedStyle(element).fontSize),
      lineHeight: parseFloat(getComputedStyle(element).lineHeight),
    }));
    // Support limitations and actions must stay readable in every translation.
    // Decorative kickers and step numbers are outside this reading contract.
    const essential = [
      '.hero-small', '.proof-strip p', '.ds-source-note', '.ds-flow-list p',
      '.ds-feature-card .check-list span', '.ds-workflow > li > span',
      '.ds-enterprise-card .check-list span', '.ds-edition-table th', '.ds-edition-table td',
      '.ds-table-hint', '.form-note', '.brochure-guidance p', '.button',
      '.contact-facts dd', '.about-meta',
      '.desktop-nav a', '.site-footer nav a', '.site-footer .text-link', '.footer-bottom p',
    ].flatMap(measure);
    const introductions = measure('.hero-lead, .ds-hero-lead, .section-heading > p:not(.section-kicker):not(.about-meta)');
    const contactLabels = measure('.contact-facts dt');
    return { essential, introductions, contactLabels };
  });
  expect(measurements.essential.length).toBeGreaterThan(50);
  for (const item of measurements.essential) {
    expect(item.fontSize, JSON.stringify(item)).toBeGreaterThanOrEqual(14);
  }
  for (const item of measurements.contactLabels) {
    expect(item.fontSize, JSON.stringify(item)).toBeGreaterThanOrEqual(12);
  }
  const minimumIntroduction = 16;
  expect(measurements.introductions.length).toBeGreaterThan(5);
  for (const item of measurements.introductions) {
    expect(item.fontSize, JSON.stringify(item)).toBeGreaterThanOrEqual(minimumIntroduction);
    expect(item.lineHeight / item.fontSize, JSON.stringify(item)).toBeGreaterThanOrEqual(1.65);
  }
}

async function expectDataSafeIdentity(page: Page) {
  const organization = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent() ?? '{}');
  expect(organization['@type']).toBe('Organization');
  expect(organization.name).toMatch(/DataSafe|데이터세이프/i);
  expect(`${organization.name} ${organization.alternateName ?? ''}`).not.toMatch(/Oryx\s*System|오릭스\s*시스템/i);
  expect(new URL(organization.url).origin).toBe('https://oryxdatasafe.com');
  await expect(page.locator('meta[name="author"]')).toHaveAttribute('content', /DataSafe|데이터세이프/i);
  for (const selector of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]']) {
    const description = await page.locator(selector).getAttribute('content');
    expect(description).toBeTruthy();
    expect(description).not.toMatch(/Oryx\s*System|오릭스\s*시스템|Орикс\s*Систем/i);
  }
  // A related company-site link may retain its proper name. The site's own
  // introduction and copyright must reflect the corrected DataSafe identity.
  // The retained contact email uses the System domain and is not a brand claim.
  const identityText = await page.locator('#home, .proof-strip, .site-footer').evaluateAll(roots => {
    const text: string[] = [];
    for (const root of roots) {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        const parent = node.parentElement;
        if (!parent || !parent.getClientRects().length || parent.closest('a[href^="https://oryxsystem.co.kr"], a[href="mailto:schong@oryxsystem.co.kr"]')) continue;
        text.push(node.textContent ?? '');
      }
    }
    return text.join(' ');
  });
  expect(identityText).not.toMatch(/Oryx\s*System|오릭스\s*시스템|Орикс\s*Систем/i);
  await expect(page.locator('#about')).toContainText(/DataSafe|데이터세이프/i);
  // The customer-facing introduction identifies DataSafe as a software company.
  // Related-company links remain in the footer, outside the introduction.
  await expect(page.locator('#about .company-summary')).toContainText('Oryx DataSafe');
  await expect(page.locator('#about .company-summary')).toContainText(/소프트웨어 개발|software development|ИТ-компания/i);
  await expect(page.locator('#about .company-summary')).not.toContainText('Oryx System');
  await expect(page.locator('.proof-strip')).not.toContainText(/\b20\b|20\s*년|\b2023\b/);
  await expect(page.locator('.hero-artwork figcaption')).toHaveCount(0);
  await expect(page.locator('.hero-monitor')).toHaveAccessibleName(/.+/);
  await expectCompanyContactDistribution(page);
}

async function expectCompanyContactDistribution(page: Page) {
  const about = page.locator('#about');
  // The introduction stays focused on software; the footer holds company facts.
  await expect(about).not.toContainText(/홍승철|Seungchul|Хон Сынчхоль|Founder|CEO|비호산로|Bihosan|Пихосан|\b20\b|20\s*년/i);
  await expect(about.locator('a[href^="mailto:"], a[href^="tel:"]')).toHaveCount(0);
  await expect(about.locator('.about-capability')).toHaveCount(3);
  const contact = page.locator('#contact');
  const footer = page.locator('.site-footer');
  await expect(contact.locator('.contact-person')).toContainText(/홍승철|Seungchul Hong|Хон Сынчхоль/i);
  await expect(contact).not.toContainText(/비호산로|Bihosan|Пихосан|Founder|CEO|Основатель/i);
  await expect(footer.locator('.footer-company')).toContainText(/DataSafe|데이터세이프/i);
  await expect(footer.locator('.footer-company')).toContainText(/홍승철|Seungchul Hong|Хон Сынчхоль/i);
  await expect(footer.locator('.footer-company')).toContainText(/비호산로|Bihosan|Пихосан/i);
  await expect(footer.locator('nav')).toHaveCount(0);
  await expect(page.locator('body')).not.toContainText(/Founder|CEO|Основатель/i);
  for (const area of [contact, footer]) {
    await expect(area.locator('a[href="tel:+821065450415"]')).toHaveText('010-6545-0415');
    await expect(area.locator('a[href="mailto:schong@oryxsystem.co.kr"]')).toHaveCount(1);
  }
  const order = await page.locator('main [data-main-section]').evaluateAll(elements => elements.map(element => element.id));
  expect(order.slice(-2), 'Privacy information precedes the final contact section').toEqual(['privacy', 'contact']);
  for (const id of ['datastation', 'lockdown', 'calibration']) {
    await expect(page.locator(`#${id}`)).toContainText(new RegExp(id, 'i'));
  }
}

async function expectAnchorVisible(page: Page, id: string) {
  const section = page.locator(`#${id}`);
  await expect(section).toHaveCount(1);
  const heading = section.locator('h1, h2').first();
  await expect(heading).toBeVisible();
  await expect.poll(async () => {
    const target = await heading.boundingBox();
    const header = await page.locator('.site-header').boundingBox();
    return Boolean(target && header && target.y >= header.y + header.height - 1 && target.y + target.height <= page.viewportSize()!.height + 1);
  }, { message: `${id} heading should appear below the fixed header` }).toBe(true);
}

async function visitAnchor(page: Page, id: string) {
  await page.goto(`/#${id}`, { waitUntil: 'networkidle' });
  await expectAnchorVisible(page, id);
}

test('one document renders all ten sections without overflow or browser errors', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('requestfailed', request => { if (request.failure()?.errorText !== 'net::ERR_ABORTED') errors.push(`${request.url()}: ${request.failure()?.errorText}`); });
  page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  await visitAnchor(page, 'home');
  await expect(page.locator('main')).toHaveAttribute('id', 'main-content');
  await expect(page.locator('main h1')).toHaveCount(1);
  await expect(page.locator('main form')).toHaveCount(0);
  await expect(page.locator('img:not([alt])')).toHaveCount(0);
  const title = await page.title();
  const description = await page.locator('meta[name="description"]').getAttribute('content');
  const socialDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
  expect(title).toContain('Oryx DataSafe');
  expect(description).toBeTruthy();
  expect(socialDescription).toBeTruthy();
  await mkdir(screenshotDirectory, { recursive: true });
  // Visit all content before the full capture so reveal effects cannot leave it hidden.
  for (const id of sections) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await expectNoOverflow(page);
  }
  await page.locator('a[href="#home"]:visible').first().click();
  await expectAnchorVisible(page, 'home');
  await page.screenshot({ path: join(screenshotDirectory, `${testInfo.project.name}-full.png`), fullPage: true });
  for (const id of sections) {
    await page.goto(`/#${id}`, { waitUntil: 'networkidle' });
    await expectAnchorVisible(page, id);
    await expect(page.locator('main h1')).toHaveCount(1);
    await expect(page).toHaveTitle(title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', description!);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', socialDescription!);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', title);
    await expectNoOverflow(page);
    if (screenshotSections.has(id)) await page.screenshot({ path: join(screenshotDirectory, `${testInfo.project.name}-${id}.png`) });
  }
  expect(errors).toEqual([]);
});

test('anchors support keyboard, history, direct addresses, and reload below the header', async ({ page }) => {
  // Hero/product CTAs are optional. Exercise persistent header navigation
  // without focusing an off-screen overview link and changing history scroll.
  const activateHeaderAnchor = async (id: string) => {
    const opener = page.locator('.site-header .menu-trigger');
    if (await opener.isVisible()) {
      await opener.focus();
      await page.keyboard.press('Enter');
    }
    await page.locator(`.site-header a[href="#${id}"]:visible`).first().focus();
    await page.keyboard.press('Enter');
  };
  await visitAnchor(page, 'home');
  await activateHeaderAnchor('datastation');
  await expect(page).toHaveURL(/#datastation$/);
  await expectAnchorVisible(page, 'datastation');
  await expect(page.locator('#datastation')).toBeFocused();
  // Repeating the same hash does not emit hashchange; native navigation must
  // still return to the target after keyboard focus has moved to a link.
  await activateHeaderAnchor('datastation');
  await expect(page).toHaveURL(/#datastation$/);
  await expectAnchorVisible(page, 'datastation');
  await expect(page.locator('#datastation')).toBeFocused();
  await activateHeaderAnchor('contact');
  await expect(page).toHaveURL(/#contact$/);
  await expectAnchorVisible(page, 'contact');
  await expect(page.locator('#contact')).toBeFocused();
  await page.goBack();
  await expect(page).toHaveURL(/#datastation$/);
  await expectAnchorVisible(page, 'datastation');
  await page.goBack();
  await expect(page).toHaveURL(/#home$/);
  await expectAnchorVisible(page, 'home');
  await page.goForward();
  await expect(page).toHaveURL(/#datastation$/);
  await expectAnchorVisible(page, 'datastation');
  await page.reload({ waitUntil: 'networkidle' });
  await expectAnchorVisible(page, 'datastation');
  await visitAnchor(page, 'privacy');
  await expectNoOverflow(page);
});

test('legacy addresses retain destinations and unknown anchors remain usable', async ({ page }) => {
  const legacyDestinations = [['/', 'home'], ['products', 'datastation'], ['datastation', 'datastation'], ['calibration', 'calibration'], ['brochures', 'brochures'], ['resources', 'brochures'], ['implementation', 'implementation'], ['guide', 'validation'], ['about', 'about'], ['contact', 'contact'], ['privacy', 'privacy'], ['portal', 'contact'], ['demo', 'contact'], ['pricing', 'contact'], ['podcast', 'validation']];
  for (const [route, destination] of legacyDestinations) {
    await page.goto(route === '/' ? '/#/' : `/#/${route}`, { waitUntil: 'networkidle' });
    await expectAnchorVisible(page, destination);
    await expect(page.locator('main h1')).toHaveCount(1);
    await expect(page.locator('input[type="password"], iframe')).toHaveCount(0);
    await expectNoOverflow(page);
  }
  await page.goto('/#not-real', { waitUntil: 'networkidle' });
  await expect(page.locator('main h1')).toBeVisible();
  await page.locator('a[href="#contact"]:visible').first().click();
  await expect(page).toHaveURL(/#contact$/);
  await expectAnchorVisible(page, 'contact');
  await expect(page.locator('#contact')).toContainText('schong@oryxsystem.co.kr');
});

test('keyboard skip link reaches the single main content landmark', async ({ page }) => {
  // A new visitor starts without anchor focus; the first Tab should reach the skip link.
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skipLink = page.locator('.skip-link');
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeVisible();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
});

test('mobile menu allows natural keyboard exit, restores Escape focus, and closes for anchor navigation', async ({ page }, testInfo) => {
  await visitAnchor(page, 'home');
  const opener = page.locator('.site-header > .header-inner .menu-trigger');
  test.skip(!await opener.isVisible(), 'Desktop navigation is visible at this viewport');
  const bounds = await opener.boundingBox();
  expect(bounds?.width).toBeGreaterThanOrEqual(44);
  expect(bounds?.height).toBeGreaterThanOrEqual(44);
  await opener.focus();
  await page.keyboard.press('Enter');
  const panel = page.locator('#mobile-menu');
  await expect(panel).toBeVisible();
  await expect(opener).toHaveAttribute('aria-expanded', 'true');
  await mkdir(screenshotDirectory, { recursive: true });
  await page.screenshot({ path: join(screenshotDirectory, `${testInfo.project.name}-menu.png`) });
  await expect(panel.locator('nav a').first()).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(panel.locator('nav a').nth(1)).toHaveAttribute('href', '#about');
  await expect(panel.locator('nav a').nth(1)).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('Shift+Tab');
  await expect(opener).toBeFocused();
  await panel.locator('a[href="#contact"]').focus();
  await page.keyboard.press('Tab');
  expect(await page.locator('.site-header').evaluate(element => element.contains(document.activeElement))).toBe(false);
  await expect(panel).not.toBeVisible();
  await opener.focus();
  await page.keyboard.press('Enter');
  await expect(panel).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(panel).not.toBeVisible();
  await expect(opener).toBeFocused();
  await expect(opener).toHaveAttribute('aria-expanded', 'false');
  for (const id of ['calibration', 'lockdown', 'brochures', 'contact', 'contact']) {
    await opener.click();
    await panel.locator(`a[href="#${id}"]`).focus();
    await page.keyboard.press('Enter');
    await expect(panel).not.toBeVisible();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expectAnchorVisible(page, id);
    await expect(page.locator(`#${id}`)).toBeFocused();
    await expectNoOverflow(page);
  }
  const initialViewport = page.viewportSize()!;
  await opener.click();
  await page.setViewportSize({ width: 1440, height: initialViewport.height });
  await expect(panel).not.toBeVisible();
  expect(await page.locator('body').evaluate(element => element.style.overflow)).not.toBe('hidden');
  await page.setViewportSize(initialViewport);
  await expect(opener).toBeVisible();
});

test('stable one-page metadata and referenced icon or social images are available', async ({ page }) => {
  await visitAnchor(page, 'home');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ko');
  await expect(page).toHaveTitle(/Oryx DataSafe/);
  const title = await page.title();
  const description = await page.locator('meta[name="description"]').getAttribute('content');
  expect(description).toBeTruthy();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://oryxdatasafe.com/');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow');
  await expectDataSafeIdentity(page);
  const assets = await page.locator('link[rel~="icon"], link[rel="apple-touch-icon"], meta[property="og:image"], meta[name="twitter:image"]').evaluateAll(elements => elements.map(element => element.getAttribute('href') || element.getAttribute('content')));
  expect(assets.length).toBeGreaterThanOrEqual(3);
  for (const asset of new Set(assets)) {
    expect(asset).toBeTruthy();
    const path = new URL(asset!, page.url()).pathname;
    const response = await page.request.get(path);
    expect(response.status(), path).toBe(200);
    expect(response.headers()['content-type'], path).toMatch(/^image\//);
  }
  for (const id of ['lockdown', 'brochures', 'validation', 'contact']) {
    await page.goto(`/#${id}`, { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', description!);
  }
});

test('contact has direct mail and telephone links without a form or false success', async ({ page }) => {
  const submissions: string[] = [];
  page.on('request', request => { if (request.method() !== 'GET') submissions.push(request.url()); });
  const session = await page.context().newCDPSession(page);
  await session.send('Page.enable');
  let requestedMail = '';
  session.on('Page.frameRequestedNavigation', event => { if (event.url.startsWith('mailto:')) requestedMail = event.url; });
  await visitAnchor(page, 'contact');
  const contact = page.locator('#contact');
  await expectCompanyContactDistribution(page);
  await expect(page.locator('main form, main textarea, main input')).toHaveCount(0);
  await expect(contact.locator('[role="status"], [role="alert"]')).toHaveCount(0);
  const sendEmail = contact.locator('a[href="mailto:schong@oryxsystem.co.kr"]');
  await expect(sendEmail).toHaveCount(1);
  await expect(sendEmail).toBeVisible();
  const telephone = contact.locator('a[href="tel:+821065450415"]');
  await expect(telephone).toHaveCount(1);
  await expect(telephone).toBeVisible();
  await expect(page.locator('#privacy a[href^="mailto:"], #privacy a[href^="tel:"]')).toHaveCount(0);
  await expect(page.locator('main a[href="mailto:schong@oryxsystem.co.kr"]')).toHaveCount(1);
  await expect(page.locator('main a[href="tel:+821065450415"]')).toHaveCount(1);
  await expect(contact.locator('.button')).toHaveAttribute('href', 'mailto:schong@oryxsystem.co.kr?subject=Oryx%20DataSafe');
  await sendEmail.focus();
  await page.keyboard.press('Enter');
  await expect.poll(() => requestedMail).toBe('mailto:schong@oryxsystem.co.kr');
  expect(submissions).toEqual([]);
  // A headless browser observes the mailto URI; it cannot verify email delivery.
  const freshPage = await page.context().newPage();
  await freshPage.goto('/#contact');
  await expect(freshPage.locator('main form')).toHaveCount(0);
  await expect(freshPage.locator('#contact [role="status"], #contact [role="alert"]')).toHaveCount(0);
  await freshPage.close();
  expect(submissions).toEqual([]);
  await session.detach();
});

test('three site languages translate every section and preserve the reading position', async ({ page }, testInfo) => {
  await visitAnchor(page, 'calibration');
  const readingHeading = page.locator('#calibration-heading');
  await expect(readingHeading).toBeVisible();
  let currentLanguage = 'ko';
  for (const language of ['en', 'ru', 'ko'] as const) {
    // Put the heading at the current reading line. At an anchor's initial
    // position the preceding kicker can be the first readable element, and
    // its translated line wrapping can legitimately move the heading below it.
    await readingHeading.evaluate(element => {
      const readingLine = (document.querySelector('.site-header')?.getBoundingClientRect().bottom ?? 94) + 36;
      window.scrollBy({ top: element.getBoundingClientRect().top - readingLine, behavior: 'instant' });
    });
    const before = await readingHeading.boundingBox();
    const hashBefore = new URL(page.url()).hash;
    await selectSiteLanguage(page, language);
    const after = await readingHeading.boundingBox();
    expect(before).toBeTruthy();
    expect(after).toBeTruthy();
    expect(Math.abs(after!.y - before!.y), `${currentLanguage}→${language}: same reading heading`).toBeLessThanOrEqual(2);
    expect(new URL(page.url()).hash).toBe(hashBefore);
    // Prices and quotations were removed by the user across all visible UI.
    // Legacy URL redirects and unchanged approved PDF bytes are outside this check.
    expect(await page.locator('body').innerText()).not.toMatch(/가격|견적|요금|\b(?:quotation|pricing|cost|price|quote)s?\b|коммерческ[а-яё]*|стоимост[а-яё]*/i);
    await expectNoOverflow(page);
    await expectDataSafeIdentity(page);
    for (const id of sections) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await expect(page.locator(`#${id}`).locator('h1, h2').first()).toBeVisible();
      await expectNoOverflow(page);
    }
    if (language !== 'ko') {
      const untranslatedText = await page.locator('.site-header, main, .site-footer').evaluateAll(roots => {
        const remaining: string[] = [];
        for (const root of roots) {
          const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
          for (let node = walker.nextNode(); node; node = walker.nextNode()) {
            const parent = node.parentElement;
            const value = node.textContent?.trim() ?? '';
            if (!parent || !value || !parent.getClientRects().length || parent.closest('.language-options, .brochure-language, [lang="ko"]')) continue;
            if (/[가-힣]/.test(value)) remaining.push(value);
          }
        }
        return remaining;
      });
      expect(untranslatedText, `Visible ${language} content should be translated`).toEqual([]);
    }
    await expectReadableTypography(page);
    await page.goto('/#calibration', { waitUntil: 'networkidle' });
    await expect(page.locator('html')).toHaveAttribute('lang', language);
    await mkdir(screenshotDirectory, { recursive: true });
    await page.screenshot({ path: join(screenshotDirectory, `${testInfo.project.name}-calibration-${language}.png`) });
    await expectAnchorVisible(page, 'calibration');
    currentLanguage = language;
  }
  // Preserve a paragraph in the middle of the detailed product explanation,
  // where translated sections above it can have substantially different heights.
  await visitAnchor(page, 'datastation');
  await page.locator('#datastation .ds-detail-group > summary').click();
  const readingParagraph = page.locator('#datastation .ds-report-details > p').first();
  await readingParagraph.evaluate(element => {
    const readingLine = (document.querySelector('.site-header')?.getBoundingClientRect().bottom ?? 94) + 36;
    window.scrollBy({ top: element.getBoundingClientRect().top - readingLine, behavior: 'instant' });
  });
  for (const language of ['en', 'ru', 'ko'] as const) {
    const before = await readingParagraph.boundingBox();
    await selectSiteLanguage(page, language);
    const after = await readingParagraph.boundingBox();
    expect(before).toBeTruthy();
    expect(after).toBeTruthy();
    expect(Math.abs(after!.y - before!.y), `DataStation paragraph after switching to ${language}`).toBeLessThanOrEqual(2);
    await expectNoOverflow(page);
  }
});

test('language dropdown supports keyboard selection and Escape focus restoration', async ({ page }) => {
  await visitAnchor(page, 'home');
  const trigger = page.locator('.language-trigger:visible').first();
  await expect(trigger).toBeVisible();
  const bounds = await trigger.boundingBox();
  expect(bounds?.width).toBeCloseTo(133, 0);
  expect(bounds?.height).toBeGreaterThanOrEqual(44);
  // Independent company reference: OryxSystem_Web main
  // 1daee2080482666bb60466dc6ee56514aa05e467 public/index.html.
  const globe = trigger.locator('..').locator('.language-globe');
  await expect(globe).toHaveCount(1);
  await expect(globe).toHaveAttribute('viewBox', '0 0 24 24');
  await expect(globe).toHaveAttribute('aria-hidden', 'true');
  await expect(globe.locator('circle[cx="12"][cy="12"][r="9"]')).toHaveCount(1);
  await expect(globe.locator('ellipse[cx="12"][cy="12"][rx="4"][ry="9"]')).toHaveCount(1);
  await expect(globe.locator('path[d="M3 12h18"]')).toHaveCount(1);
  expect(await globe.evaluate(element => parseFloat(getComputedStyle(element).strokeWidth))).toBe(1.6);
  const globeBounds = await globe.boundingBox();
  expect(globeBounds).toBeTruthy();
  expect(globeBounds!.x).toBeGreaterThanOrEqual(bounds!.x);
  expect(globeBounds!.x + globeBounds!.width).toBeLessThanOrEqual(bounds!.x + bounds!.width);
  expect(globeBounds!.y).toBeGreaterThanOrEqual(bounds!.y);
  expect(globeBounds!.y + globeBounds!.height).toBeLessThanOrEqual(bounds!.y + bounds!.height);
  await trigger.focus();
  await page.keyboard.press('Enter');
  const options = page.locator('.language-options:visible');
  await expect(options).toBeVisible();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await expect(options.locator('[role="menuitemradio"]')).toHaveCount(3);
  await page.keyboard.press('Escape');
  await expect(options).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  for (const language of ['en', 'ru', 'ko'] as const) {
    await selectSiteLanguage(page, language);
    await expect(page.locator('html')).toHaveAttribute('lang', language);
    await expect(trigger).toBeFocused();
    expect((await trigger.boundingBox())?.width).toBeCloseTo(133, 0);
    await expectNoOverflow(page);
  }
});

test('normal visual effects respect reduced-motion and keep all sections readable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await visitAnchor(page, 'home');
  const motion = await page.evaluate(async () => {
    const evidence: { duration: number; opacity: string; transform: string }[] = [];
    document.querySelector('#implementation')?.scrollIntoView({ behavior: 'instant', block: 'start' });
    for (let frame = 0; frame < 24; frame += 1) {
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
      for (const animation of document.getAnimations()) {
        const effect = animation.effect as KeyframeEffect | null;
        if (effect?.target instanceof Element && effect.target.matches('.reveal')) {
          const style = getComputedStyle(effect.target);
          evidence.push({ duration: Number(effect.getTiming().duration), opacity: style.opacity, transform: style.transform });
        }
      }
    }
    return evidence;
  });
  expect(motion.some(frame => frame.opacity !== '1' && frame.transform !== 'none'), 'An entering section should visibly animate').toBe(true);
  expect(motion.some(frame => Number(frame.duration) > 0)).toBe(true);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload({ waitUntil: 'networkidle' });
  for (const id of sections) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await expect(page.locator(`#${id}`).locator('h1, h2').first()).toBeVisible();
    const headings = await page.locator(`#${id}`).locator('h1, h2').first().evaluate(element => {
      const reveal = element.closest('.reveal') ?? element;
      return { opacity: getComputedStyle(reveal).opacity, animations: reveal.getAnimations().length };
    });
    expect(headings).toEqual({ opacity: '1', animations: 0 });
    await expectNoOverflow(page);
  }
  const prolonged = await page.evaluate(() => [...document.querySelectorAll('main *')].filter(element => {
    const style = getComputedStyle(element);
    return style.animationName !== 'none' && style.animationDuration.split(',').some(value => parseFloat(value) > 0.02);
  }).map(element => `${element.tagName}.${element.className}`));
  expect(prolonged).toEqual([]);
});
