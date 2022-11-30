const express = require("express");
const { contactsController: ctrl } = require("../../controllers");
const router = express.Router();
const { JoiContactSchema, JoiFavoriteUpdate } = require("../../models/contact");
const { validation, isValidId } = require("../../middlewares");

router.get("/", ctrl.allContacts);

router.get("/:contactId", isValidId, ctrl.contactById);

router.post("/", validation(JoiContactSchema), ctrl.postContact);

router.delete("/:contactId", isValidId, ctrl.deleteContact);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validation(JoiFavoriteUpdate),
  ctrl.patchUpdateStatusContact
);

router.put(
  "/:contactId",
  isValidId,
  validation(JoiContactSchema),
  ctrl.putContact
);

module.exports = router;
