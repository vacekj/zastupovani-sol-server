const puppeteer = require("puppeteer");

class BrowserManager {

	/**
	 *
	 * @returns {Promise<{ browser, error }>}
	 */
	async launchBrowser() {
		const browser = await puppeteer
			.launch({
				headless: process.env.NODE_ENV !== "development",
				args: ['--disable-setuid-sandbox',
					'--no-zygote'],
				userDataDir: "C:\etc\pup"
			});
		return { browser, error: null };
	}
}

module.exports = { BrowserManager };
