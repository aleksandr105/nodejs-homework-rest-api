const register = require("./register");
const login = require("./login");
const currentUser = require("./currentUser");
const logout = require("./logout");
const userUpdateSubscription = require("./userUpdateSubscription");
const avatarEdit = require("./avatarEdit");
const verifyEmail = require("./verifyEmail");
const relapseVerifyEmail = require("./relapseVerifyEmail");

module.exports = {
  register,
  login,
  currentUser,
  logout,
  userUpdateSubscription,
  avatarEdit,
  verifyEmail,
  relapseVerifyEmail,
};
