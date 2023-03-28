const { chromium } = require('playwright');

describe('Landing page', () => {
  it('should load without errors', async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://example.com');

    const pageTitle = await page.title();
    expect(pageTitle).toEqual('Soccer Rules - Home');

    await browser.close();
  });
});
