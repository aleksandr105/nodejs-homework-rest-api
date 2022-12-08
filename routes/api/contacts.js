const express = require("express");
const { contactsController: ctrl } = require("../../controllers");
const router = express.Router();
const { JoiContactSchema, JoiFavoriteUpdate } = require("../../models/contact");
const { validation, isValidId, checksAuth } = require("../../middlewares");

router.get("/", checksAuth, ctrl.allContacts);

router.get("/:contactId", checksAuth, isValidId, ctrl.contactById);

router.post("/", checksAuth, validation(JoiContactSchema), ctrl.postContact);

router.delete("/:contactId", checksAuth, isValidId, ctrl.deleteContact);

router.patch(
  "/:contactId/favorite",
  checksAuth,
  isValidId,
  validation(JoiFavoriteUpdate),
  ctrl.patchUpdateStatusContact
);

router.put(
  "/:contactId",
  checksAuth,
  isValidId,
  validation(JoiContactSchema),
  ctrl.putContact
);

module.exports = router;
