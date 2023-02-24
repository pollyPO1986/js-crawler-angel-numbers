export default async (browser, page, linkItem) => {
  await page.goto(linkItem.url);
  await page.waitForTimeout(1500);

  // 文章分段標題
  const category = await page.$$eval('#toc_container ul.toc_list a', (elements) => {
    return elements.map((item) => item.textContent);
  });

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

  return pageData;
};
