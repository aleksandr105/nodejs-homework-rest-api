const { User } = require("../../models/user");
const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      throw new Conflict(`Email ${email} in use`);
    }

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const avatarURL = gravatar.url(email);

    const result = await User.create({
      name,
      email,
      password: hashPassword,
      avatarURL,
    });
    const subscription = result.subscription;

    res.status(201).json({ user: { name, email, subscription, avatarURL } });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
