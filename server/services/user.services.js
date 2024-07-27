const User = require('../models/user.model');

const createUser = async ({ firstName, lastName, email, password }) => {
	const user = new User({
		firstName,
		lastName,
		password,
		email,
	});
	await user.save();
	return {
		_id: user._id,
		firstName,
		lastName,
		email: user.email,
	};
};

const findUserByEmail = async (email) => await User.findOne({ email }).select('+password');
const findUserById = async (id) => await User.findById(id);

module.exports.createUser = createUser;
module.exports.findUserByEmail = findUserByEmail;
module.exports.findUserById = findUserById;

module.exports = {
	createUser,
	findUserByEmail,
	findUserById
};