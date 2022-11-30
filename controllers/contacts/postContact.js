const { Contact } = require("../../models/contact");

const postContact = async (req, res, next) => {
  try {
    const response = await Contact.create(req.body);

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = postContact;
