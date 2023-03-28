const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Navigate to the website
  await page.goto('https://bmogul.github.io/mywebclass-fos/');

  // Collect all links on the page
  const links = await page.$$eval('a', as => as.map(a => a.href));

  // Loop through all links and check if they load without error
  for (const link of links) {
    console.log(`Checking link: ${link}`);
    const response = await page.goto(link, { waitUntil: 'load' });
    const status = response.status();
    if (status >= 400) {
      console.error(`ERROR: ${status} ${response.url()}`);
    }
  }

  await browser.close();
})();
