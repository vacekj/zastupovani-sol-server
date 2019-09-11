const puppeteer = require("puppeteer");

class BrowserManager {

	/**
	 *
	 * @returns {Promise<{ browser, error }>}
	 */
	async launchBrowser() {
		const browser = await puppeteer
			.launch({
				headless: process.env.NODE_ENV === "development" ? false : true
			});
		return { browser, error: null };
	}
}

module.exports = { BrowserManager };
