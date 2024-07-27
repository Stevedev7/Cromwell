const Joi = require('joi');

const registerSchema = Joi.object({
	firstName: Joi.string()
		.min(3)
		.max(50)
		.required(),
	lastName: Joi.string()
		.min(3)
		.max(50)
		.required(),
	email: Joi.string()
		.email({
			tlds: {
				allow: ['com', 'net', 'in', 'uk', 'gov', 'co', 'org', 'un']
			}
		})
		.required(),
	password: Joi.string()
		.required()
		.min(8)
		.max(25),
	confirmPassword: Joi.ref('password')
});

const loginSchema = Joi.object({
	email: Joi.string()
		.email({
			tlds: {
				allow: ['com', 'net', 'in', 'uk', 'gov', 'co', 'org', 'un']
			}
		})
		.required(),
	password: Joi.string()
		.required()
		.min(8)
		.max(25)
});

module.exports = {
	registerSchema,
	loginSchema
};