import bcrypt from 'bcryptjs'
import { createToken,verifyToken } from '../config/jwt.js'
import { createDBToken,getDBTokenById } from '../models/token.js'
import {createUser,updatePassword, emailRegistered, userIsAuthorized,checkPassword,getID,authorizeUser} from '../models/User.js'
import sendMail from '../config/nodemailer.js'

const signup = async (req,res) => {
  console.log('data recieved', { userId: req.meta.user_id });
  const {email, password} = req.body;

  //check if email isnt already registered 
  if (await emailRegistered(email)) {
    return res.status(400).json({ message: 'Email already registered.' });
  }else {
    console.log('email checked', { userId: req.meta.user_id });
  }


  console.log('hashing password', { userId: req.meta.user_id });
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('hashed', { userId: req.meta.user_id });



  
  console.log('creating user', { userId: req.meta.user_id });
  createUser(email,hashedPassword)
  console.log('user craeted', { userId: req.meta.user_id });


  const id = await getID(email)

  console.log('signup current id',id,{ userId: req.meta.user_id } )
  const token = createToken({id: id})
  console.log('signup current token',token,{ userId: req.meta.user_id } )
  createDBToken(token,id)
  
  const verificationUrl = `http://localhost:3000/auth/verify?token=${token}`
  console.log('verification url sent through email',verificationUrl,{ userId: req.meta.user_id } )
  console.log('sending mail',{ userId: req.meta.user_id } )

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
  console.log('login email',email,{ userId: req.meta.user_id } )
  if (!(await emailRegistered(email))) {
    return res.status(400).json({ message: 'Email is not registered.' });
  }else {
    console.log('login email registered',email,{ userId: req.meta.user_id } )

  }

  if (!(await userIsAuthorized(email))){
    const id = await getID(email)
    const token = await getDBTokenById(id)
    // if token expired
    // token = createToken({id})
    // createDBToken(token,id)

  
  const verificationUrl = `http://localhost:3000/auth/verify?token=${token}`
  console.log('login verification url:',verificationUrl,{ userId: req.meta.user_id })
  console.log('login sending email',{ userId: req.meta.user_id })
    try 
    {
      console.log('login try block',{ userId: req.meta.user_id })
      await sendMail(
        email,
        'Verification',
        `Click on the link below to verify your signup to PixaBay Project: \n\n${verificationUrl}`
      )
    } 
    catch (err)
    {
      console.log('login catch block',{ userId: req.meta.user_id })
      return res.status(500).json({ message: 'Error sending verification email' });
    } 
    finally 
    {
      console.log('login finally block',{ userId: req.meta.user_id })
      return res.status(400).json({ message: 'You must verify you email first.' });
    } 
  }else {
    console.log('email verified',{ userId: req.meta.user_id })
  }
  console.log('checking password of email:',email,{ userId: req.meta.user_id })
  if (!checkPassword(email,password)){
    console.log('login password incorrect',{ userId: req.meta.user_id })
    return res.status(400).json({ message: 'Password is incorrect' });
  }else {
    console.log('Password checked',{ userId: req.meta.user_id })

  }


  console.log('log in email',email,{ userId: req.meta.user_id })
  console.log('log in getting id',{ userId: req.meta.user_id })
  const id = await getID(email)
  console.log('log in id got',id,{ userId: req.meta.user_id })
  const token = await getDBTokenById(id);
  console.log('backend token',token,{ userId: req.meta.user_id })


  res.json({token:token});
}

const accVerification = async (req,res) => {
  const {token} = await req.query;
  console.log('accVerification = ',token,{ userId: req.meta.user_id })
  try{

    console.log('verifying token',{ userId: req.meta.user_id })
    const tokenverified = await verifyToken(token)
    console.log('token verified: ',tokenverified,{ userId: req.meta.user_id })


    const id = tokenverified.id

    console.log('authorizing User',{ userId: req.meta.user_id })
    authorizeUser(id)
    console.log('User authorized ',{ userId: req.meta.user_id })

    
  } catch(err){
    console.log('AccVerification error',{ userId: req.meta.user_id })
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
  const id = getId(email);
  const token = verifyToken(id).id
  const resetPasswordUrl =   `/reset-password?token=${token}`;
  //`${process.env.CLIENT_URL}/reset-password?token=${token}`;

  await sendMail(
    email,
    'Reset Password',
    `Click on the link below to reset your password: \n\n${resetPasswordUrl}`
  )
  res.status(200).json({ message: 'Reset password email sent' });
}




export {signup,login,accVerification,resetPassword,resetPasswordMail}