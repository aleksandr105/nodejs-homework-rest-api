const { addContact } = require("../../models/contacts");

const postContact = async (req, res, next) => {
  try {
    const response = await addContact(req.body);

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = postContact;
