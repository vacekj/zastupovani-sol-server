/*const { Page, Browser } = require("@types/puppeteer");*/

const puppeteer = require("puppeteer");

/**
 *
 * @returns {Promise<Browser>}
 */
function launchBrowser() {
	return puppeteer
		.launch({
			headless: false
		});
}

/**
 *
 * @param {Browser} browser
 * @param {string} date
 * @returns {Promise<void>}
 */
async function getSuplovani(browser, date) {
	const page = (await browser.pages())[0];
	await page.goto("https://aplikace.skolaonline.cz/SOL/App/Rozvrh/KSU016_SuplovaniVypis.aspx");
	await page.waitFor("#ctl00_main_DBDatum_wdcDatum_input");
	await page.evaluate((dateText) => {
		document.querySelector("#ctl00_main_DBDatum_wdcDatum_input").value = dateText;
	}, date);
	await page.click("#ctl00_main_rbStudent");
	await page.click("[name='ctl00$main$btnZobraz']");

	const fetchDate = (await page.waitFor("#ctl00_main_lblVypisDatum")).innerText;
	return fetchDate;
}

/**
 *
 * @param {Browser} browser
 * @param username
 * @param password
 * @returns {Promise<Error|{browser: *, page: *}>}
 */
async function login(browser, username, password) {
	const page = (await browser.pages())[0];
	await page.goto("https://www.skolaonline.cz/Aktuality.aspx");
	await page.type("#JmenoUzivatele", username);
	await page.type("#HesloUzivatele", password);
	await page.click("#dnn_ctr994_SOLLogin_btnODeslat");
	try {
		await page.waitForSelector(".user");
		console.debug("Logged in successfully");
	} catch (error) {
		return new Error("Login failed");
	}
	return { browser, };
}

module.exports = { login, getSuplovani, launchBrowser };
