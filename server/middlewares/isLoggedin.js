const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	try {
		// Get token from header
		const authHeader = req.headers.authorization;
		const token = authHeader && authHeader.split(' ')[1]; // If auth header exists, extract token

		if (token == null) {
			return res.status(401).json({
				message: 'Unauthorized'
			});
		}

		// Verify token
		const user = jwt.verify(token, process.env.JWT_SECRET);
		req.user = user;
		next();
	} catch (e) {

		// If token not valid
		if (e) {
			return res.status(403).json({
				message: 'Forbidden'
			});
		}
		return res.status(500).json({
			message: 'Internal Server Error'
		});
	}
}