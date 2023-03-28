const { chromium } = require('playwright');

describe('Navbar Links Test', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await chromium.launch();
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto('https://bmogul.github.io/mywebclass-fos/');
  });

  afterEach(async () => {
    await page.close();
  });

  it('should navigate to each link in the navbar', async () => {
    const links = await page.$$('.nav-links a');
    for (const link of links) {
      const url = await link.getAttribute('href');
      await link.click();
      await page.waitForNavigation();
      expect(page.url()).toContain(url);
    }
  });
});
