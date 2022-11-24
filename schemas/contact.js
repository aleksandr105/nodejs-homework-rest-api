const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string().required().max(30).min(1),
  email: Joi.string().required().max(30).email(),
  phone: Joi.number().required().integer().max(999999999999999).min(100),
});

module.exports = contactsSchema;
