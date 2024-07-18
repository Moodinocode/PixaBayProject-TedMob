import express from 'express'
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

router.get('/home', authenticateToken, (req, res) => {
  res.send('This is the home page.');
});

export default router;