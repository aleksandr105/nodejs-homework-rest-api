const currentUser = async (req, res, next) => {
  const { email, name, subscription } = req.user;

  try {
    res.json({ email, name, subscription });
  } catch (error) {
    next(error);
  }
};

module.exports = currentUser;
