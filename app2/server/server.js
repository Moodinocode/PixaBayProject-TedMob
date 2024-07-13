import bodyParser from 'body-parser';
import express from 'express';
import pool from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import cors from 'cors';





const app = express();
app.use(bodyParser.json())
app.use(cors());


app.set('pool',pool)


//Routes
app.use('/', authRoutes)
//app.use('/user', authencateToken,userRoutes)


app.listen(5000, ()=> {
  console.log('Server running on port 5000')
})