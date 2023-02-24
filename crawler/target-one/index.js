import { RESOURCE_SITE } from '../../utils/global-config.js';
import { convertToTextHalfWidth } from '../../utils/tools/formatter.js';
import angelNumberList from '../../utils/tools/custom-mapping.js';
import { simpleLogger } from '../../utils/tools/write-access.js';
import getItemInfo from './modules/item-info.js';

export default async (browser) => {
  const page = await browser.newPage();
  await page.goto(RESOURCE_SITE.TARGET_ONE);
  await page.waitForTimeout(1500);

  /**
   * 這邊不使用 await page.$$('#main-contents .cps-post-main > p > a');
   * 因為取回來會是一包 [elementHolder {}, elementHolder {}, elementHolder {},...]
   * 還需要使用 await page.evaluate((element) => element.href, element) 去處理
   */
  const sourceLinkList = await page.$$eval('#main-contents .cps-post-main > p > a', (elements) => {
    return elements.map((item) => ({ name: item.innerText, url: item.href }));
  });

  const customWebsiteLinkList = sourceLinkList.reduce((result, currentItem) => {
    const isTrue = angelNumberList.includes(convertToTextHalfWidth(currentItem.name));

    if (isTrue) {
      result.push(currentItem);
    }

    return result;
  }, []);

  simpleLogger('開始爬取', ['Start']);

  for (const linkItem of customWebsiteLinkList) {
    simpleLogger('Start', ['Number', `${linkItem.name}`]);
    const _finalData = await getItemInfo(browser, page, linkItem);
    simpleLogger('End', ['Number', `${linkItem.name}`]);
    console.log('HH', _finalData);
  }

  simpleLogger('結束爬取', ['Complete']);
};
