const { User } = require("../../models/user");
const sendEmail = require("../../utils/sendEmail");

const relapseVerifyEmail = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw res.status(404).json({ message: `user with ${email} NotFound` });
    }

    if (user.verify) {
      throw res
        .status(400)
        .json({ message: "Verification has already been passed" });
    }

    const mail = {
      to: `${email}`,
      subject: "Verify email",
      html: `<a href = "localhost:3000/api/users/verify/:${user.verificationToken} target="_blank">Please follow the link to confirm your email</a>`,
    };

    await sendEmail(mail);

    res.json({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
};

module.exports = relapseVerifyEmail;
