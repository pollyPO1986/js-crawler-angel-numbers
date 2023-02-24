import axios from 'axios';
import puppeteer from 'puppeteer';
import targetSourceOne from './crawler/target-one/index.js';

/**
 * 預設時區是 UTC+0
 * 在不使用 times library plugin 情況下
 * 自行在 node.js 設置本地時區
 * TODO: 之後優化改用 day.js 這類 library 處理時間
 */
process.env.TZ = 'Asia/Taipei';

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
