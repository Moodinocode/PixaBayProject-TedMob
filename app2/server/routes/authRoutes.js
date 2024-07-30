import express from 'express'
//import { signup,login,resetPassword} from '../controllers/authController' 
import { signup,login,accVerification,resetPassword,resetPasswordMail} from '../controllers/authController.js';

const router = express.Router();


router.post('/signup', signup)
router.post('/login', login)
router.get('/verify',accVerification)
router.post('/resetPassword',resetPassword)
router.post('/resetPasswordMail',resetPasswordMail)

//router.post('/reset-password',resetPassword)

export default router
