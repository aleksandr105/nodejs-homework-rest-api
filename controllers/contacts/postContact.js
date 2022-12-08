const { Contact } = require("../../models/contact");

const postContact = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const response = await Contact.create({ ...req.body, owner: _id });

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = postContact;
