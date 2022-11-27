import axios from 'axios';
import puppeteer from 'puppeteer';
import { FOLDER_CATEGORY } from './utils/global-config.js';

(async () => {
  /**
   * 示範 Code:
   * 在 Docker 容器內實現簡易的截圖程式
   *
   * 這裡主要要了解的技術點是：Docker 如何連接本地的 Chrome browser ?
   */
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

  /**
   * 底下三行是快速實現上方程式的方式
   * 缺點是，一但重啟 ws --remote-debugger-port=9222
   * 要修改 browser/ ${隨機碼}
   * 隨機碼可以從重啟指令的 terminal log 內找到
   */
  // const browser = await puppeteer.connect({
  //   browserWSEndpoint: 'ws://host.docker.internal:9222/devtools/browser/ea40aa86-145d-418f-a18a-182bf05f33cc',
  // });

  const page = await browser.newPage();

  await page.goto('https://www.google.com/');

  // 截圖是用無視窗的方式（ browser 不帶 options ）
  await page.screenshot({ path: `${FOLDER_CATEGORY.IMAGES}example.png` });
  // await page.screenshot({ path: 'data/images/example.png' });

  await browser.close();
})();
