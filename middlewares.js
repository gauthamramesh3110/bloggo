const jwt = require('jsonwebtoken');
const errorCode = require('./errorCode').errorCode;
require('dotenv').config();

exports.verifyToken = (req, res, next) => {
	let token = req.headers.token;

	jwt.verify(token, process.env.JWT_PRIVATE_KEY, function (err, decoded) {
		if (!err) {
			req.params.userdetails = decoded;
			next();
		} else {
			res.status(400).json({
				message: 'Invalid Token!',
				errorCode: errorCode.invalidToken,
			});
		}
	});
};
