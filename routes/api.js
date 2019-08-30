const express = require('express');
const router = express.Router();

const { BrowserManager } = require("../sol-lib/browserManager");
const sollib = require("../sol-lib/index");

router.get('/', function (req, res) {
	res.json({
		message: "SOL API Running",
		status: 200
	});
});

router.get('/suplovani', async (req, res) => {

	const date = req.query.date;
	if (!date.match(/[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{4}/)) {
		return res.json({
			status: 403,
			error: "Date malformed",
			date
		});
	}
	try {
		const result = await getSuplovani(date);
		return res.json({
			status: 200,
			data: result
		});
	} catch (e) {
		res.json({
			status: 0,
			error: JSON.stringify(e, Object.getOwnPropertyNames(e))
		});
	}
});


async function getSuplovani(date) {
	try {
		const browserManager = new BrowserManager();
		let browser = await browserManager.launchBrowser();

		const loginAttempt = await sollib.login({
			browser: browser.browser,
			LOL: "gytool_externisti_Vacek",
			password: "Prvni_prihlaseni_45"
		});
		if (loginAttempt.error || !loginAttempt.username) {
			console.warn("Couldn't log in. Retrying..");
			return await getSuplovani(date);
		}

		const suplovaniPage = await sollib.getSuplovaniPage(browser.browser, date);

		if (suplovaniPage.error) {
			if (suplovaniPage.error instanceof sollib.DateNotFound) {
				throw suplovaniPage.error;
			}
			console.warn("Couldn't get suplovani page. Retrying..");
			return await getSuplovani(date);
		}

		const parsedSuplovani = sollib.parseSuplovaniTable(suplovaniPage.suplovaniTable);
		if (!parsedSuplovani) {
			console.warn("Couldn't parse suplovani page. Retrying..");
			return await getSuplovani(date);
		}
		browser.browser.close();
		return { parsedSuplovani, fetchDate: suplovaniPage.fetchDate };
	} catch (e) {
		throw e;
	}
}


module.exports = router;
