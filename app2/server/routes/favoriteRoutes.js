import express from 'express'
import { toggleLike,returnFavorites } from '../controllers/favoritesController.js';

const router = express.Router();

router.post('/', toggleLike)
router.post('/page', returnFavorites)

export default router