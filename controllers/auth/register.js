const { User } = require("../../models/user");
const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const sendEmail = require("../../utils/sendEmail");
const { v4 } = require("uuid");

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      throw new Conflict(`Email ${email} in use`);
    }

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const avatarURL = gravatar.url(email);

    const verificationToken = v4();

    const result = await User.create({
      name,
      email,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });
    const subscription = result.subscription;

    const mail = {
      to: `${email}`,
      subject: "Verify email",
      html: `<a href = "localhost:3000/api/users/verify/:${verificationToken} target="_blank">Please follow the link to confirm your email</a>`,
    };

    await sendEmail(mail);

    res.status(201).json({
      user: { name, email, subscription, avatarURL, verificationToken },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
