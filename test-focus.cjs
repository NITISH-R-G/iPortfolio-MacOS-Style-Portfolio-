const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Wait for the app to start
  await page.goto('http://localhost:5173');

  // Verify the page loaded
  await page.waitForSelector('main');

  // Press tab to focus the first interactive element (should be a button we updated)
  await page.keyboard.press('Tab');

  // Take a screenshot
  await page.screenshot({ path: 'frontend-verification.png' });

  // Stop recording (not using video in this simple script for now, just screenshot)
  await browser.close();
})();
