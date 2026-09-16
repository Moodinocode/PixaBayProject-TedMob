import nodemailer from 'nodemailer'

const timeout = 5 * 60 * 1000

// Mailtrap's sandbox during development. Credentials come from the
// environment rather than being committed alongside the code.
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'sandbox.smtp.mailtrap.io',
  port: Number(process.env.SMTP_PORT) || 587,
  // Port 587 upgrades to TLS with STARTTLS, so the connection must not start
  // out secure. Setting this true on 587 makes the handshake hang.
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

const FROM_ADDRESS = process.env.MAIL_FROM || 'no-reply@pixabay-app.local'

const sendMail = async (to, subject, text) => {
  const mailOptions = {
    from: FROM_ADDRESS,
    to,
    subject,
    text,
  }

  const sendMailPromise = transporter.sendMail(mailOptions)

  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout exceeded')), timeout)
  )

  return Promise.race([sendMailPromise, timeoutPromise])
    .then(() => true)
    .catch(error => {
      console.log('Error sending email:', error)
      return false
    })
}

export default sendMail
