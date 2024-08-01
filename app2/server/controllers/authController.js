import bcrypt from 'bcryptjs'
import { createToken,verifyToken } from '../config/jwt.js'
import { createDBToken,getDBTokenById } from '../models/token.js'
import {createUser,updatePassword, emailRegistered, userIsAuthorized,checkPassword,getID,authorizeUser} from '../models/User.js'
import sendMail from '../config/nodemailer.js'

const signup = async (req,res) => {
  console.log('data recieved', );
  const {email, password} = req.body;

  //check if email isnt already registered 
  if (await emailRegistered(email)) {
    return res.status(400).json({ message: 'Email already registered.' });
  }else {
    console.log('email checked', );
  }


  console.log('hashing password', );
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('hashed', );



  
  console.log('creating user', );
  createUser(email,hashedPassword)
  console.log('user craeted', );


  const id = await getID(email)

  console.log('signup current id',id, )
  const token = createToken({id: id})
  console.log('signup current token',token, )
  createDBToken(token,id)
  
  const verificationUrl = `http://localhost:3000/auth/verify?token=${token}`
  console.log('verification url sent through email',verificationUrl, )
  console.log('sending mail', )

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
  console.log('login email',email, )
  if (!(await emailRegistered(email))) {
    return res.status(400).json({ message: 'Email is not registered.' });
  }else {
    console.log('login email registered',email, )

  }

  if (!(await userIsAuthorized(email))){
    const id = await getID(email)
    const token = await getDBTokenById(id)
    // if token expired
    // token = createToken({id})
    // createDBToken(token,id)

  
  const verificationUrl = `http://localhost:3000/auth/verify?token=${token}`
  console.log('login verification url:',verificationUrl,)
  console.log('login sending email',)
    try 
    {
      console.log('login try block',)
      await sendMail(
        email,
        'Verification',
        `Click on the link below to verify your signup to PixaBay Project: \n\n${verificationUrl}`
      )
    } 
    catch (err)
    {
      console.log('login catch block',)
      return res.status(500).json({ message: 'Error sending verification email' });
    } 
    finally 
    {
      console.log('login finally block',)
      return res.status(400).json({ message: 'You must verify you email first.' });
    } 
  }else {
    console.log('email verified',)
  }
  console.log('checking password of email:',email,)
  if (!checkPassword(email,password)){
    console.log('login password incorrect',)
    return res.status(400).json({ message: 'Password is incorrect' });
  }else {
    console.log('Password checked',)

  }


  console.log('log in email',email,)
  console.log('log in getting id',)
  const id = await getID(email)
  console.log('log in id got',id,)
  const token = await getDBTokenById(id);
  console.log('backend token',token,)


  res.json({token:token});
}

const accVerification = async (req,res) => {
  const {token} = await req.query;
  console.log('accVerification = ',token,)
  try{

    console.log('verifying token',)
    const tokenverified = await verifyToken(token)
    console.log('token verified: ',tokenverified,)


    const id = tokenverified.id

    console.log('authorizing User',)
    authorizeUser(id)
    console.log('User authorized ',)

    
  } catch(err){
    console.log('AccVerification error',)
    return res.status(400).json({ message: `error: ${err.message}` });
  }
  return res.status(201).json({message: 'User Authorized Successfully'})
}





const resetPassword = async (req,res) => {
  //cehck if email is regestered or they must signup
  const {password,token} = req.body;
  const id = verifyToken(token).id
  try {
    updatePassword(id,password)
    return res.status(200).json({message: 'password updated successfully'})
  } catch (error) {
    return res.status(500).json({message: 'error updating password'})
  }
}

const resetPasswordMail = async (req,res) => {
  const {email} = req.body
  const id = await getID(email);
  console.log(id)
  const token = await  getDBTokenById(id)
  const resetPasswordUrl =   `http://localhost:3000/passwordReset?token=${token}`;
  //`${process.env.CLIENT_URL}/reset-password?token=${token}`;
  console.log(resetPasswordUrl)

  await sendMail(
    email,
    'Reset Password',
    `Click on the link below to reset  your password: \n\n${resetPasswordUrl}`
  )
  console.log()
  return res.status(200).json({ message: 'Reset password email sent', token:token });
}




export {signup,login,accVerification,resetPassword,resetPasswordMail}