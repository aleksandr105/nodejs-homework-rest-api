const { Contact } = require("../../models/contact");

const allContacts = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const {
      page = 1,
      limit = 20,
      favorite = { $in: [true, false] },
    } = req.query;

    const skip = (page - 1) * limit;

    const response = await Contact.find(
      { owner: _id, favorite },
      "-createdAt -updatedAt -owner",
      { skip, limit: Number(limit) }
    );

    res.json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = allContacts;
