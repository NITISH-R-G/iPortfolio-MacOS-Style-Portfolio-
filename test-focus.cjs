const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({
        recordVideo: {
            dir: 'videos/'
        }
    });
    const page = await context.newPage();

    try {
        await page.goto('http://localhost:4173/');
        // wait for dock to appear
        await page.waitForSelector('#dock');

        // Click the Safari app in the dock
        const dockSafari = await page.$('.dock-icon[aria-label="Safari"]');
        if (dockSafari) {
            await dockSafari.click();
            await page.waitForSelector('#safari');
            await page.waitForTimeout(500);
        }

        // Click the Mail app in the dock to open Contact
        const dockContact = await page.$('.dock-icon[aria-label="Mail"]');
        if (dockContact) {
            await dockContact.click();
            await page.waitForSelector('#contact');
            await page.waitForTimeout(500);
        }

        // Take a screenshot of the whole page showing the opened windows
        await page.screenshot({ path: 'frontend_verification.png' });
        // eslint-disable-next-line no-undef
        console.log("Screenshot saved to frontend_verification.png");

    } catch (e) {
        // eslint-disable-next-line no-undef
        console.error("Test error:", e);
    } finally {
        await context.close();
        await browser.close();
        // eslint-disable-next-line no-undef
        console.log("Video saved to videos/ directory.");
    }
})();