const { Contact } = require("../../models/contact");

const patchUpdateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const response = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });

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

module.exports = patchUpdateStatusContact;
