const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        devtools: true
    });
    const page = await browser.newPage();
    await page.goto('https://www.tokopedia.com/p/elektronik');
    await autoScroll(page);
    const items = await page.$$eval('.css-y5gcsw', itemElements => itemElements.map(i => {
       return Array.from(
            i.querySelectorAll('a[href]'),
            a => a.getAttribute('href')
        )
    }))
    console.log(items)

})();

async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 200);
        });
    });
}
