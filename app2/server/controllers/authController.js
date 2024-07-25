import bcrypt from 'bcryptjs'
import { createToken,verifyToken } from '../config/jwt.js'
import { createDBToken } from '../models/token.js'
import {createUser,updatePassword, emailRegistered, userIsAuthorized,checkPassword,getID,authorizeUser} from '../models/User.js'
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


  console.log('hashing password')
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('hashed')

  console.log('creating user')
  createUser(email,hashedPassword)
  console.log('user craeted')
  const id = getID(email)
  const token = createToken({id})
  createDBToken(token,id)
  
  const verificationUrl = `http://localhost:3000/auth/verify?token=${token}`
  console.log(verificationUrl)
  console.log('sending mail')

  if (!(await sendMail(
    email,
    'Verification',
    `Click on the link below to verify your signup to PixaBay Project: \n\n${verificationUrl}`
  ))){
    return res.status(500).json({ message: 'Error sending verification email' });
  }
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

  if (!(await userIsAuthorized(email))){
    const id = getID(email)
    const token = createToken({id})
    createDBToken(token,id)
  
  const verificationUrl = `http://localhost:3000/auth/verify?token=${token}`
    console.log(verificationUrl)
    console.log('sending mail')
    try 
    {
      await sendMail(
        email,
        'Verification',
        `Click on the link below to verify your signup to PixaBay Project: \n\n${verificationUrl}`
      )
    } 
    catch 
    {
      return res.status(500).json({ message: 'Error sending verification email' });
    } 
    finally 
    {
      return res.status(400).json({ message: 'You must verify you email first.' });
    } 
  }else {
    console.log('email verified')
  }
  console.log(email)
  if (!checkPassword(email,password)){
    return res.status(400).json({ message: 'Password is incorrect' });
  }else {
    console.log('password checked')
  }

  console.log(email)
  console.log('getting ID')
  const id= await getID(email)
  console.log('ID gotid =',id)

  res.json({ id: id,token:token });
}

const accVerification = async (req,res) => {
  const token = req.query
  console.log('accVerification = ',token)
  try{
    verifyToken(token)
    const id = await getID(token)
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