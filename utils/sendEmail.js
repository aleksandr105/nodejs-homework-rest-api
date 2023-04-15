const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SEND_GRID_KEY } = process.env;

sgMail.setApiKey(SEND_GRID_KEY);

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: "aleksandr105@mail.ru" };

    await sgMail.send(email);

    return true;
  } catch (error) {
    return new Error(error);
  }
};

module.exports = sendEmail;
