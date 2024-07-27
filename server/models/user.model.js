const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	firstName: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 50,
	},
	lastName: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 50,
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		select: false
	}
});

module.exports = mongoose.model('User', UserSchema);