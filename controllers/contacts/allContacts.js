const { Contact } = require("../../models/contact");

const allContacts = async (req, res, next) => {
  try {
    const response = await Contact.find({}, "-createdAt -updatedAt");

    res.json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = allContacts;
