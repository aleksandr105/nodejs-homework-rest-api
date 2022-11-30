const { Contact } = require("../../models/contact");

const contactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const response = await Contact.findById(contactId, "-createdAt -updatedAt");

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

module.exports = contactById;
