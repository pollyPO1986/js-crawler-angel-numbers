import axios from 'axios';
import puppeteer from 'puppeteer';
import targetSourceOne from './crawler/target-one/index.js';

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

  // 訪問 Resource site - target one
  await targetSourceOne(browser);

  await browser.close();
})();
