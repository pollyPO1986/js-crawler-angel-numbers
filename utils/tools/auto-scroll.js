export default async (page, ms = 100, htmlTag = 'html') => {
  await page.evaluate(
    async (htmlTag, ms) => {
      await new Promise((resolve) => {
        const element = document.querySelector(`${htmlTag}`);
        let scrollTop = -1;
        const interval = setInterval(() => {
          element.scrollTo({ top: element.scrollTop + 100, behavior: 'smooth' });
          console.dir(scrollTop, element.scrollTop);
          if (element.scrollTop !== scrollTop) {
            scrollTop = element.scrollTop;
            return;
          }
          clearInterval(interval);
          resolve();
        }, ms);
      });
    },
    htmlTag,
    ms
  );
};
