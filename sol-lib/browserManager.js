const puppeteer = require("puppeteer");

class BrowserManager {

	/**
	 *
	 * @returns {Promise<Browser>}
	 */
	async launchBrowser() {
		const browser = await puppeteer
			.launch({
				headless: false
			});

		process.env.PUPPETEER_WS_ENDPOINT = browser.wsEndpoint();
	}

	async getBrowser() {
		try {
			const browser = await puppeteer.connect({
				browserWSEndpoint: process.env.PUPPETEER_WS_ENDPOINT
			});
			return { browser, error: null };
		} catch (e) {
			return { error: new BrowserConnectionError(e) };
		}
	}
}

class BrowserConnectionError extends Error {

}

module.exports = { BrowserManager };
