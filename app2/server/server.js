import express from 'express';
import pool from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json()); 
app.use(cors());


app.set('pool',pool)

app.use('/', (req,res) => {
  res.end('Hello world')
})
//Routes
app.use('/', authRoutes)
//app.use('/user', authencateToken,userRoutes)


app.listen(process.env.PORT || 3000, ()=> {
  console.log('Server running on port 3000')
})