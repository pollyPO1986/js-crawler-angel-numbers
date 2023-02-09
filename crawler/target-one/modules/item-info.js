export default async (browser, page, linkItem) => {
  await page.goto(linkItem.url);
  await page.waitForTimeout(1500);

  // const last = await page.$$('.cps-post-main h2');
  // const prev = await page.evaluateHandle((el) => el.nextElementSibling, last);

  // console.log('last', await (await last.getProperty('innerHTML')).jsonValue()); // item 3
  // console.log('prev', await (await prev.getProperty('innerHTML')).jsonValue()); // item 2

  // 文章分段標題
  const category = await page.$$eval('#toc_container ul.toc_list a', (elements) => {
    return elements.map((item) => item.textContent);
  });

  // 描述
  // const contentText = await page.$$eval('.cps-post-main p', (elements) => {
  //   return elements.map((item) => item.textContent);
  // });

  const pageData = await page.evaluate(async () => {
    // 種類
    const title = document.querySelector('.cps-post-title.entry-title')?.innerText || '';
    // 描述
    const contentText = document.querySelector('.cps-post-main')?.innerText || '';

    return {
      title,
      contentText,
    };
  });

  pageData.category = category;
  // pageData.contentText = contentText;

  return pageData;
};
