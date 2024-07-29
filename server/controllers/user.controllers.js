const bcrypt = require('bcrypt');
const { createUser, findUserById } = require("../services/user.services");
const { registerSchema } = require('../schemas/user.schema')

const register = async (req, res, next) => {
	const { body } = req;
	try {
		// Validate input
		await registerSchema.validateAsync(body);

		// Hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(body.password, salt);
		const user = {
			...body,
			password: hashedPassword
		};
		const newUser = await createUser(user); // Create a user and add to DB
		res.status(200).json(newUser);
	} catch (e) {

		// Validation error
		if (e.details) {
			res.status(400).json({
				error: e.details[0].message
			});

			// Mongodb error
		} else if (e.code === 11000) {
			res.status(409).json({
				error: "Email already exists"
			})
		} else {
			res.status(500).json({
				error: e
			})
		}
	}
}

const getUser = async (req, res, next) => {
	try {
		// Get user id from request._id set during the middleware function call
		const user = await findUserById(req.user._id);
		if (user) {
			return res.status(200).json({
				user
			});
		}

		// If user not found throw 404 error
		res.status(404).json({ message: "User not found." });
	} catch (e) {
		res.status(500).json({ message: "Somethign went wrong." });
	}
}


module.exports.register = register;
module.exports.getUser = getUser;

module.exports = {
	register,
	getUser
}
