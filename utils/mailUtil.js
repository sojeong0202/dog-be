const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async ({ to, subject, html }) => {
  return transporter.sendMail({
    from: `\"두둥멍 질문 알리미\" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

module.exports = { sendEmail };
