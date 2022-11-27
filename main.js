import axios from 'axios';
import puppeteer from 'puppeteer';
import { RESOURCE_SITE, FOLDER_CATEGORY } from './utils/global-config.js';

(async () => {
  const response = await axios.get('http://host.docker.internal:9222/json/version', {
    headers: { Host: '127.0.0.1:9222' },
  });
  const browserWSEndpoint = response.data.webSocketDebuggerUrl.replace(/127.0.0.1/g, 'host.docker.internal');
  const browser = await puppeteer.connect({
    browserWSEndpoint,
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
    slowMo: 100,
  });
  const page = await browser.newPage();

  await page.goto(RESOURCE_SITE.TARGET_ONE);
  await page.screenshot({ path: `${FOLDER_CATEGORY.IMAGES}example.png` }); // 截圖是用無視窗的方式（ browser 不帶 options ）

  // await browser.close();
})();
