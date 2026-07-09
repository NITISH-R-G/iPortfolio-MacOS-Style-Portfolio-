const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:4173');

  // Wait for dock to load
  await page.waitForSelector('#dock');

  // Click them directly avoiding pointer events by using evaluate or force click
  await page.click('button[aria-label="Terminal"]', { force: true }).catch(() => {});
  await page.waitForTimeout(500);

  await page.click('button[aria-label="Articles"]', { force: true }).catch(() => {});
  await page.waitForTimeout(500);

  await page.click('button[aria-label="Gallery"]', { force: true }).catch(() => {});
  await page.waitForTimeout(500);

  await page.screenshot({ path: 'frontend-verification.png' });
  await browser.close();
})();
