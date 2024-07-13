import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host:'sandbox.smtp.mailtrap.io',
  port: 587,
  secure: true,
  auth: {
    user: 'REDACTED_SMTP_USER',
    pass: 'REDACTED_SMTP_PASS'
  }
});

const sendMail = (to,subject,text) => {
  const mailOptions = {
    form: 'mehdi21092005@gmail.com',
    to,
    subject,
    text,
  };
  console.log(transporter)

  return transporter.sendMail(mailOptions);
}

export default sendMail