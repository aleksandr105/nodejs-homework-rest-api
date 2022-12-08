const { Contact } = require("../../models/contact");

const contactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const response = await Contact.find(
      { _id: contactId, owner: req.user._id },
      "-createdAt -updatedAt -owner"
    );

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
