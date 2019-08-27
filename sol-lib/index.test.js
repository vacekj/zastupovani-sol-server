const sollib = require("./index");
const { Browser, Page } = require("@types/puppeteer");

/**
 * @var {Browser} browser
 */
let browser;

beforeEach(() => {
	return sollib
		.launchBrowser()
		.then(browserInstance => browser = browserInstance);
});

test("Logs in", () => {
	return sollib.login(browser, "gytool_externisti_Vacek", "Prvni_prihlaseni_45");
});

afterEach(() => {
	return browser.close();
});
