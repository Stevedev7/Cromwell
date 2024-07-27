const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;
		const token = authHeader && authHeader.split(' ')[1];
		if (token == null) {
			return res.status(401).json({
				message: 'Unauthorized'
			});
		}
		const user = jwt.verify(token, process.env.JWT_SECRET);
		req.user = user;
		next();
	} catch (e) {
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