const sgMail = require("@sendgrid/mail");

const { SEND_GRID_KEY } = process.env;

const sendEmail = async (data) => {
  try {
    await sgMail.setApiKey(SEND_GRID_KEY);

    const email = { ...data, from: "aleksandr105@mail.ru" };

    await sgMail.send(email);

    return true;
  } catch (error) {
    return new Error(error);
  }
};

module.exports = sendEmail;
