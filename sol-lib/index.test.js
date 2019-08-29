const sollib = require("./index");
const { BrowserManager } = require("./browserManager");
/* const { Browser, Page } = require("@types/puppeteer"); */

/**
 * @var {Browser} browser
 */
let browser;

beforeEach(() => {
	const browserManager = new BrowserManager();
	return browserManager
		.launchBrowser()
		.then(browserInstance => browser = browserInstance);
});

test("Logs in", async () => {
	const result = await sollib.login({
		browser,
		LOL: "gytool_externisti_Vacek",
		password: "Prvni_prihlaseni_45"
	});
	expect(result.error)
		.toEqual(null);
	expect(typeof result.username)
		.toBe("string");
	expect(result.username.length)
		.toBeGreaterThan(0);
});

test("Fails to log in with bogus credentials", async () => {
	const result = await sollib.login(browser, "aaaaaaaaa", "bbbbbbbb");
	expect(result.error)
		.not
		.toBe(null);
}, 10 * 1000);

test("Gets Suplovani", async () => {
	const login = await sollib.login(browser, "gytool_externisti_Vacek", "Prvni_prihlaseni_45");
	const suplovani = await sollib.getSuplovani(login.browser, "4.9.2019");
	expect(suplovani.error)
		.toEqual(null);
	expect(typeof suplovani.fetchDate)
		.toBe("string");
	expect(suplovani.fetchDate.length)
		.toBeGreaterThan(0);
}, 20 * 1000);

test("Doesn't get suplovani of nonexistent date", async () => {
	const login = await sollib.login(browser, "gytool_externisti_Vacek", "Prvni_prihlaseni_45");
	const suplovani = await sollib.getSuplovani(login.browser, "1.1.2000");
	expect(suplovani.error)
		.toBeInstanceOf(sollib.DateNotFoundError);
}, 20 * 1000);

test("Parses suplovani table", async () => {
	try {
		const login = await sollib.login(browser, "gytool_externisti_Vacek", "Prvni_prihlaseni_45");
		const suplovani = await sollib.getSuplovani(login.browser, "4.9.2019");
		const parsedSuplovani = sollib.parseSuplovaniTable(suplovani.suplovaniTable);
	} catch (e) {
		throw e;
	}

}, 20 * 1000);

afterEach(() => {
	return browser.close();
});
