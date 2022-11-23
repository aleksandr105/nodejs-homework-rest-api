const express = require("express");
const { contactsController: ctrl } = require("../../controllers");
const router = express.Router();
const { contactsSchema } = require("../../schemas");
const { validation } = require("../../middlewares");

router.get("/", ctrl.allContacts);

router.get("/:contactId", ctrl.contactById);

router.post("/", validation(contactsSchema), ctrl.postContact);

router.delete("/:contactId", ctrl.deleteContact);

router.put("/:contactId", validation(contactsSchema), ctrl.putContact);

module.exports = router;
