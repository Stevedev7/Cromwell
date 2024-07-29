const { loginSchema } = require("../schemas/user.schema");
const { findUserByEmail } = require("../services/user.services");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
	const { email, password: passwordInput } = req.body;
	const JWT_SECRET = process.env.JWT_SECRET || "JWT Secret!!";
	try {
		await loginSchema.validateAsync({ email, password: passwordInput });

		// Check if user exists
		const user = await findUserByEmail(email);
		if (!user) {
			return res.status(401).json({
				error: {
					message: "User does not exist."
				}
			});
		}

		// Check if password matches
		const isMatch = await bcrypt.compare(passwordInput, user.password);

		if (!isMatch) {
			return res.status(401).json({
				error: {
					message: "Invalid Credentials"
				}
			});
		}

		const { password, ...userDetails } = user.toObject();

		const token = jwt.sign(
			{ _id: user._id },
			JWT_SECRET,
			{ expiresIn: '1h' }
		);

		res.status(200).json({ message: "Logged in.", token });
	} catch (e) {
		// Validation error
		if (e.isJoi) {
			return res.status(400).json({
				error: {
					message: e.details[0].message
				}
			});
		}
		res.status(500).json({ error: { message: "Internal server error" } });
		console.error(e);
	}
}

module.exports = {
	login,
}