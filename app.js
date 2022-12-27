const puppeteer = require('puppeteer');
const browserConfig = require('./browser.config.js');

(async () => {
	try {
		const browser = await puppeteer.launch(browserConfig);

		const page = await browser.newPage();

		await page.goto('https://google.ca', { waitUntil: 'domcontentloaded' });

		// look for element
		const gooSearchInput = 'body input';
		const gooSearchValue = 'Hello World';

		const el1 = await page.$eval(
			gooSearchInput,
			(el, gooSearchValue) => (el.value = gooSearchValue),
			gooSearchValue
		);

		await page.keyboard.press('Enter');

		await delay(5000);

		//if we use the eval function we do not need to dispose the element
		// await el1.dispose();

		await page.goto('https://youtube.com', { waitUntil: 'domcontentloaded' });

		const ytSearchInput = 'input#search';
		const ytSearchValue = 'javascript puppeteer';

		// wait for full navigation load as yt redirects depending on system theme
		await page.waitForNavigation();
		const ytSearch = await page.waitForSelector(ytSearchInput);
		await ytSearch.type(ytSearchValue);

		await page.keyboard.press('Enter');

		//if we assign an element to a variable using waitForSelector, we need to dipose it when we're done
		await ytSearch.dispose();

		await delay(5000).then((data) => console.log('end'));

		await browser.close();
	} catch (e) {
		console.log(e.message);
	}
})();

const delay = async (ms) => {
	return new Promise((r) => setTimeout(r, ms));
};
