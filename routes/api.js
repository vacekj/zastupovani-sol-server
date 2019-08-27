const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
	res.json({
		message: "BZ API Running",
		status: 200
	});
});

router.post('/login', async (req, res) => {
	const browser = await puppeteer.connect({
		browserWSEndpoint: process.env.PUPPETEER_WS_ENDPOINT
	});
	const result = await login(browser, "gytool_externisti_Vacek", "Prvni_prihlaseni_45");
	return res.json({
		status: 200,
		message: "logged in successfully"
	});
});

router.get('/suplovani', async (req, res) => {
	const date = req.params.date;
	const browser = await puppeteer.connect({
		browserWSEndpoint: process.env.PUPPETEER_WS_ENDPOINT
	});
	const result = await getSuplovani(browser, date);
	return res.json({
		status: 200,
		message: result
	});
});



module.exports = router;
