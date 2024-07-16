import bcrypt from 'bcryptjs'
import pool from '../config/db.js'
import { createToken,verifyToken } from '../config/jwt.js'
import {createUser,updatePassword, emailRegistered} from '../models/User.js'
import sendMail from '../config/nodemailer.js'

const signup = async (req,res) => {
  console.log('data recieved')
  const {email, password} = req.body;
  //check if email isnt already registered 
    if (await emailRegistered(email)) {
      console.log('test')
      return res.status(400).json({ message: 'Email already registered.' });
    }else {
      console.log('email checked')
    }

    console.log('crating token')
  //verify email exists
  const token = createToken({email})
  console.log('token created')
  const verificationUrl = `/verify-email?token=${token}`
  // await sendMail(
  //   email,
  //   'Verification',
  //   `Click on the link below to verify your signup to PixaBay Project: \n\n${verificationUrl}`
  // )
  // console.log('mail sent')
  console.log('hashing password')
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('hashed')

  console.log('creating user')
  createUser(email,hashedPassword)
  console.log('user craeted')
  return res.status(201).json({ message: 'User registered. Verification email sent.'});
}



// const login = async (req,res) => {
//   const {email, password} = req.body;
//   if (emailRegistered(email) == 0) {
//     return res.status(400).json({ message: 'Email registered' });
//   }
// }





// const resetPassword = async (req,res) => {
//   //cehck if email is regestered or they must signup
//   const {email} = req.body;
//   const token = createToken({email});

//   const resetPasswordUrl =   `/reset-password?token=${token}`;
//   //`${process.env.CLIENT_URL}/reset-password?token=${token}`;

//   await sendMail(
//     email,
//     'Reset Password',
//     `Click on the link below to reset your password: \n\n${resetPasswordUrl}`
//   )

//   res.status(200).json({ message: 'Reset password email sent' });
// }

//export {signup,login,resetPassword}
export {signup}