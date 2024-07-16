import express from 'express'
//import { signup,login,resetPassword} from '../controllers/authController' 
import { signup } from '../controllers/authController.js';
const router = express.Router();

router.get('/verify', async (req, res) => {
  setTimeout(async ()=> {
    
  },5*60*1000)
});
router.post('/signup', signup)
//router.post('/login', login)
//router.post('/reset-password',resetPassword)

export default router
