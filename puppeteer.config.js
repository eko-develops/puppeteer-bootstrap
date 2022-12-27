const { join } = require('path');

// Changes the cache location for Puppeteer.
const cacheDirectory = join(__dirname, '.cache', 'puppeteer');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
	cacheDirectory,
};
