import bcrypt from 'bcryptjs'
import pool from '../config/db.js'
import { createToken,verifyToken } from '../config/jwt.js'
import {createUser,updatePassword, emailRegistered, userIsAuthorized,checkPassword,getID} from '../models/User.js'
import sendMail from '../config/nodemailer.js'

const signup = async (req,res) => {
  console.log('data recieved')
  const {email, password} = req.body;
  //check if email isnt already registered 
    if (await emailRegistered(email)) {
      return res.status(400).json({ message: 'Email already registered.' });
    }else {
      console.log('email checked')
    }

  console.log('creating token')
  //verify email exists
  const token = createToken({email})
  const id= getID(email)
  const verificationUrl = `http://localhost:3000/verify?id=${id}&token=${token}`
  console.log(verificationUrl)
  console.log('sending mail')

    
  if (!(await sendMail(
    email,
    'Verification',
    `Click on the link below to verify your signup to PixaBay Project: \n\n${verificationUrl}`
  ))){
    return res.status(500).json({ message: 'Error sending verification email' });
  }


  console.log('mail sent')
  console.log('hashing password')
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('hashed')

  console.log('creating user')
  createUser(email,hashedPassword)
  console.log('user craeted')
  return res.status(201).json({ message: 'User registered. Verification email sent.'});
}



const login = async (req,res) => {
  const {email, password} = req.body;
  console.log(email)
  if (!(await emailRegistered(email))) {
    return res.status(400).json({ message: 'Email is not registered.' });
  }else {
    console.log('email registered')
  }

  if (!userIsAuthorized(email)){
    const token = createToken({email})
    const id= getID(email)
    const verificationUrl = `http://localhost:3000/verify?id=${id}&token=${token}`
    console.log(verificationUrl)
    console.log('sending mail')
    if (!(await sendMail(
      email,
      'Verification',
      `Click on the link below to verify your signup to PixaBay Project: \n\n${verificationUrl}`
    ))){
      return res.status(500).json({ message: 'Error sending verification email' });
    }  
    return res.status(400).json({ message: 'You must verify you email first.' });
  }else {
    console.log('email verified')
  }
  console.log(email)
  if (!checkPassword(email,password)){
    return res.status(400).json({ message: 'Password is incorrect' });
  }else {
    console.log('password checked')
  }


  
  console.log('creating token')
  const token = createToken(email)
  console.log('token created')
  console.log(email)
  const id= getID(email)

  const userURL = `http://localhost:3000/home?id=${id}&token=${token}`
  
  
  res.json({ url: userURL });

}

const accVerification = async (req,res) => {
  const {id ,token} = req.query
  try{
    verifyToken(token)
    authorizeUser(id)
  } catch(err){
    return res.status(400).json({ message: `error: ${err.message}` });
  }
  return res.status(201).json({message: 'User Authorized Successfully'})
}





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
export {signup,login,accVerification}