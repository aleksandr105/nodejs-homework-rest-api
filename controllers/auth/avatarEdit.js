const fs = require("fs/promises");
const path = require("path");
const { User } = require("../../models/user");
const Jimp = require("jimp");

const avatarEdit = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id } = req.user;
  try {
    const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

    const resultUpload = path.join(avatarsDir, `${_id}_${originalname}`);

    const imageUrl = path.join("avatars", `${_id}_${originalname}`);

    const image = await Jimp.read(tempUpload);
    await image.resize(250, 250).write(resultUpload);

    const result = await User.findByIdAndUpdate(
      _id,
      {
        avatarURL: imageUrl,
      },
      { new: true }
    );

    res.json({ avatarURL: result.avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    next(error);
  }
};

module.exports = avatarEdit;
