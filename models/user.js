const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
      minlength: 6,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
    avatarURL: {
      type: String,
      required: [true, "Avatar is required"],
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

const JoiUserSchema = Joi.object({
  name: Joi.string().required().max(30).min(1),
  email: Joi.string().required().max(30).email(),
  password: Joi.string().required().min(6),
});

const JoiLoginSchema = Joi.object({
  email: Joi.string().required().max(30).email(),
  password: Joi.string().required().min(6),
});

const JoiSubscriptionUpdate = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const JoiRelapseVerifyEmail = Joi.object({
  email: Joi.string().required().max(30).email(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  JoiUserSchema,
  JoiLoginSchema,
  JoiSubscriptionUpdate,
  JoiRelapseVerifyEmail,
};
