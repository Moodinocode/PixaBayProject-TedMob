import express from 'express'
import { toggleLike,returnFavorites } from '../controllers/favoritesController';

const router = express.Router();

router.post('/', toggleLike)
router.post('/page', returnFavorites)