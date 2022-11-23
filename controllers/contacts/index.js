const allContacts = require("./allContacts");
const contactById = require("./contactById.js");
const postContact = require("./postContact");
const deleteContact = require("./deleteContact");
const putContact = require("./putContact");

module.exports = {
  contactById,
  allContacts,
  postContact,
  deleteContact,
  putContact,
};
