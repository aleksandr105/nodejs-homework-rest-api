const { updateContact } = require("../../models/contacts");

const putContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const response = await updateContact(contactId, req.body);

    if (!response) {
      const error = new Error("Not found");

      error.status = 404;

      throw error;
    }

    res.json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = putContact;
