import bcrypt from 'bcryptjs'
import { createToken,verifyToken } from '../config/jwt.js'
import { createDBToken,getDBTokenById } from '../models/token.js'
import {createUser,updatePassword, emailRegistered, userIsAuthorized,checkPassword,getID,authorizeUser} from '../models/User.js'
import sendMail from '../config/nodemailer.js'

const signup = async (req,res) => {
  logger.info('data recieved', { userId: req.meta.user_id });
  const {email, password} = req.body;

  //check if email isnt already registered 
  if (await emailRegistered(email)) {
    return res.status(400).json({ message: 'Email already registered.' });
  }else {
    logger.info('email checked', { userId: req.meta.user_id });
  }


  logger.info('hashing password', { userId: req.meta.user_id });
  const hashedPassword = await bcrypt.hash(password, 10);
  logger.info('hashed', { userId: req.meta.user_id });



  
  logger.info('creating user', { userId: req.meta.user_id });
  createUser(email,hashedPassword)
  logger.info('user craeted', { userId: req.meta.user_id });


  const id = await getID(email)

  logger.info('signup current id',id,{ userId: req.meta.user_id } )
  const token = createToken({id: id})
  logger.info('signup current token',token,{ userId: req.meta.user_id } )
  createDBToken(token,id)
  
  const verificationUrl = `http://localhost:3000/auth/verify?token=${token}`
  logger.info('verification url sent through email',verificationUrl,{ userId: req.meta.user_id } )
  logger.info('sending mail',{ userId: req.meta.user_id } )

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
  logger.info('login email',email,{ userId: req.meta.user_id } )
  if (!(await emailRegistered(email))) {
    return res.status(400).json({ message: 'Email is not registered.' });
  }else {
    logger.info('login email registered',email,{ userId: req.meta.user_id } )

  }

  if (!(await userIsAuthorized(email))){
    const id = await getID(email)
    const token = await getDBTokenById(id)
    // if token expired
    // token = createToken({id})
    // createDBToken(token,id)

  
  const verificationUrl = `http://localhost:3000/auth/verify?token=${token}`
  logger.info('login verification url:',verificationUrl,{ userId: req.meta.user_id })
  logger.info('login sending email',{ userId: req.meta.user_id })
    try 
    {
      logger.info('login try block',{ userId: req.meta.user_id })
      await sendMail(
        email,
        'Verification',
        `Click on the link below to verify your signup to PixaBay Project: \n\n${verificationUrl}`
      )
    } 
    catch (err)
    {
      logger.error('login catch block',{ userId: req.meta.user_id })
      return res.status(500).json({ message: 'Error sending verification email' });
    } 
    finally 
    {
      logger.warn('login finally block',{ userId: req.meta.user_id })
      return res.status(400).json({ message: 'You must verify you email first.' });
    } 
  }else {
    logger.info('email verified',{ userId: req.meta.user_id })
  }
  logger.info('checking password of email:',email,{ userId: req.meta.user_id })
  if (!checkPassword(email,password)){
    logger.warn('login password incorrect',{ userId: req.meta.user_id })
    return res.status(400).json({ message: 'Password is incorrect' });
  }else {
    logger.info('Password checked',{ userId: req.meta.user_id })

  }


  logger.info('log in email',email,{ userId: req.meta.user_id })
  logger.info('log in getting id',{ userId: req.meta.user_id })
  const id = await getID(email)
  logger.info('log in id got',id,{ userId: req.meta.user_id })
  const token = await getDBTokenById(id);
  logger.info('backend token',token,{ userId: req.meta.user_id })


  res.json({token:token});
}

const accVerification = async (req,res) => {
  const {token} = await req.query;
  logger.info('accVerification = ',token,{ userId: req.meta.user_id })
  try{

    logger.info('verifying token',{ userId: req.meta.user_id })
    const tokenverified = await verifyToken(token)
    logger.info('token verified: ',tokenverified,{ userId: req.meta.user_id })


    const id = tokenverified.id

    logger.info('authorizing User',{ userId: req.meta.user_id })
    authorizeUser(id)
    logger.info('User authorized ',{ userId: req.meta.user_id })

    
  } catch(err){
    logger.warn('AccVerification error',{ userId: req.meta.user_id })
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

export {signup,login,accVerification}