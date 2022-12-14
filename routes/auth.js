const express = require("express");
const router = express.Router();
const { validation, checksAuth, upload } = require("../middlewares");
const {
  JoiUserSchema,
  JoiLoginSchema,
  JoiSubscriptionUpdate,
} = require("../models/user");
const { authController: ctrl } = require("../controllers");

router.post("/register", validation(JoiUserSchema), ctrl.register);

router.post("/login", validation(JoiLoginSchema), ctrl.login);

router.get("/current", checksAuth, ctrl.currentUser);

router.post("/logout", checksAuth, ctrl.logout);

router.patch(
  "/",
  checksAuth,
  validation(JoiSubscriptionUpdate),
  ctrl.userUpdateSubscription
);

router.patch("/avatars", checksAuth, upload.single("image"), ctrl.avatarEdit);

module.exports = router;
