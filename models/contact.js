const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
      unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const contactSchemaErrorProcessor = (error, data, next) => {
  const { keyValue, code, name } = error;

  const errorParameter = Object.keys(keyValue)[0];

  if (code === 11000 && name === "MongoServerError") {
    error.message = `the ${errorParameter}: ${keyValue[errorParameter]} parameter already exists in the database`;
  }

  error.status = 400;

  next(error);
};

contactSchema.post("save", contactSchemaErrorProcessor);

const JoiContactSchema = Joi.object({
  name: Joi.string().required().max(30).min(1),
  email: Joi.string().required().max(30).email(),
  phone: Joi.number().required().integer().max(999999999999999).min(100),
  favorite: Joi.bool(),
});

const JoiFavoriteUpdate = Joi.object({
  favorite: Joi.bool().required(),
});

const Contact = model("contact", contactSchema);

module.exports = { Contact, JoiContactSchema, JoiFavoriteUpdate };
