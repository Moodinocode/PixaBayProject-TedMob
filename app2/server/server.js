import express from 'express';
import pool from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import favoriteRoutes from './routes/favoriteRoutes.js'
import dotenv from 'dotenv';
import cors from 'cors';
import logger from './middleware/loggerMiddleware.js';
import { addUserIdToMeta } from './middleware/userIdMiddleware.js';
import { errorHandler} from './middleware/errorHandlerMiddleware.js';

dotenv.config();
``
const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  //methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add any other methods you need
  credentials: true, // If you need to support credentials
}))

app.use(express.json()); 

app.use(addUserIdToMeta);
app.set('pool',pool);

// logger middleware
//app.use(logger);
      


//Routes
app.use('/auth', authRoutes)

app.use('/favorites',favoriteRoutes)

//app.use('/user', authencateToken,userRoutes)

//ErrorHandling middleware
app.use(errorHandler);

app.listen(process.env.PORT || 5000, ()=> {
  console.log('Server running on port 5000')
})