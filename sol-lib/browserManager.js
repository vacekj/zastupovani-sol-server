const puppeteer = require("puppeteer");

class BrowserManager {

	/**
	 *
	 * @returns {Promise<{ browser, error }>}
	 */
	async launchBrowser() {
		const browser = await puppeteer
			.launch({
				headless: true
			});

		process.env.PUPPETEER_WS_ENDPOINT = browser.wsEndpoint();
		return { browser, error: null };
	}
}

class BrowserConnectionError extends Error {

}

module.exports = { BrowserManager };
