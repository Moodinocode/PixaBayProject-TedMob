import express from 'express';
import pool from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  //methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add any other methods you need
  credentials: true, // If you need to support credentials
}))

app.use(express.json()); 
app.use(cors());


app.set('pool',pool)


//Routes
app.use('/', authRoutes)
//app.use('/user', authencateToken,userRoutes)


app.listen(process.env.PORT || 5000, ()=> {
  console.log('Server running on port 5000')
})