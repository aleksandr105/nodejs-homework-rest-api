const { getContactById } = require("../../models/contacts");

const contactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const response = await getContactById(contactId);

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
