export default async (browser, page, linkItem) => {
  await page.goto(linkItem.url);
  await page.waitForTimeout(1500);
};
