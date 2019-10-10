const express = require('express');
const router = express.Router();

const { format } = require("date-fns");

const fs = require("fs");

router.get('/', function (req, res) {
	res.json({
		message: "SOL API Running",
		status: 200
	});
});

router.get('/suplovani', (req, res) => {

	let date = req.query.date;

	if (date.length === 0) {
		date = format(new Date(), "d.M.y");
	} else if (!date.match(/[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{4}/)) {
		return res.json({
			error: "Date malformed",
			date
		})
			.status(400);
	}

	const path = `C:/solapi/${date}.txt`;

	if (!fs.existsSync(path)) {
		return res.json({
			error: "Date not found",
			date
		})
			.status(404);
	}
	const rawData = fs.readFileSync(path, { encoding: "utf-8" });
	const suplovani = JSON.parse(rawData);
	return res.json(suplovani);
});

module.exports = router;
