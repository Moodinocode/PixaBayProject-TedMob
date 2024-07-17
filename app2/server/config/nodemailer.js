import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host:'sandbox.smtp.mailtrap.io',
  port: 587,
  secure: true,
  auth: {
    user: 'REDACTED_SMTP_USER',
    pass: 'REDACTED_SMTP_PASS'
  },
  secure: false, // Disable SSL
  tls: {
      rejectUnauthorized: false
  }
});

const sendMail = async (to,subject,text) => {
  const mailOptions = {
    form: 'mehdi21092005@gmail.com',
    to,
    subject,
    text,
  };
  const sendMailPromise = transporter.sendMail(mailOptions);

  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout exceeded')), timeout)
  );

  return Promise.race([sendMailPromise, timeoutPromise])//this wont work beacuase it returns true if email is send successfully instead of it being returned
    .then(() => true)
    .catch(error => {
      console.error('Error sending email:', error);
      return false;
    });
}

export default sendMail