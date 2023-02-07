import puppeteer from 'puppeteer';
import { FLODER_CATEGORY as FOLDER_CATEGORY } from './utils/global-config.js';

(async () => {
  /**
   * 示範 Code:
   * 實現簡易的截圖程式
   *
   * options:
   * 可以傳入一個 options 物件({headless: false})，可以設定為無介面瀏覽器，也可以設定有介面瀏覽器
   * 無介面瀏覽器效能更高更快，有介面一般用於偵錯開發
   * slowMo: 100, // 設定放慢每個步驟的毫秒數
   * headless: false, // 設定為有介面，如果為true，即為無介面
   */
  let options = {
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
    slowMo: 100,
    headless: false,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  };
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();

  await page.goto('https://www.google.com/');

  // 截圖是用無視窗的方式（ browser 不帶 options ）
  await page.screenshot({ path: `${FOLDER_CATEGORY.IMAGES}example.png` });
  // await page.screenshot({ path: 'data/images/example.png' });

  await browser.close();
})();
