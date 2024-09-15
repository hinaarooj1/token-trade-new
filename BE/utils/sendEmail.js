const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      //   secure: Boolean(process.env.SECURE),
      auth: {
        user: "admin@tokentrade.pro",
        pass: "iuIUI$%^865",
      },
    });

    let data = await transporter.sendMail({
      from: "admin@tokentrade.pro",
      to: email,
      subject: subject,
      text: text,
    });
    console.log("email sent successfully", transporter, data);
    return null;

  } catch (error) {
    console.log("email not sent!");
    console.log(error);
    return error;
  }
};
