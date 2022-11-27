import { RESOURCE_SITE } from '../../utils/global-config.js';

export default async (browser) => {
  const page = await browser.newPage();
  await page.goto(RESOURCE_SITE.TARGET_ONE);
  await page.waitForTimeout(1500);

  /**
   * 這邊不使用 await page.$$('#main-contents .cps-post-main > p > a');
   * 因為取回來會是一包 [elementHolder {}, elementHolder {}, elementHolder {},...]
   * 還需要使用 await page.evaluate((element) => element.href, element) 去處理
   */
  const targetElements = await page.$$eval('#main-contents .cps-post-main > p > a', (elements) => {
    return elements.map((item) => ({ name: item.text, url: item.href }));
  });

  console.log('EE', targetElements);

  // for (const item of itemsList) {
  //   console.log('HH', item);
  // }
};
