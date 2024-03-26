const nodemailer = require("nodemailer");
const config = require('../config/config.js');
const mailerConf = config.env.mailer;

const sendMail = async (to, subject, text, html) => {
  const transporter = nodemailer.createTransport({
    host: mailerConf.host,
    port: mailerConf.port,
    secure: true,
    auth: mailerConf.auth
  });

  const info = await transporter.sendMail({
    from: "",
    to: mailerConf.overrideSendAddress ?? to,
    subject,
    text,
    html,
  });

  console.log("Message sent: %s", info.messageId);

  return info;
};

module.exports = { sendMail };
