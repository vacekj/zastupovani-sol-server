const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
	res.json({
		message: "BZ API Running",
		status: 200
	});
});

module.exports = router;
