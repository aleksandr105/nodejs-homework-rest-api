const { User } = require("../../models/user");
const { NotFound } = require("http-errors");

const verifyEmail = async (req, res, next) => {
  const { verificationToken } = req.params;

  try {
    const user = await User.findOne({ verificationToken });

    if (!user) {
      throw NotFound("User not found");
    }

    await User.findByIdAndUpdate(user._id, {
      veryfy: true,
      verificationToken: null,
    });

    res.json({
      message: "Verification successful",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyEmail;
