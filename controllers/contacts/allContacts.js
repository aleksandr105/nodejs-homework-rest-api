const { listContacts } = require("../../models/contacts");

const allContacts = async (req, res, next) => {
  try {
    const response = await listContacts();

    res.json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = allContacts;
