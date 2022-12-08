const { User } = require("../../models/user");

const userUpdateSubscription = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const response = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    });

    if (!response) {
      const error = new Error("Not found");

      error.status = 404;

      throw error;
    }

    res.json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = userUpdateSubscription;
