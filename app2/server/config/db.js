import  pg  from 'pg'
import dotenv from 'dotenv';
dotenv.config();
import logger from '../middleware/loggerMiddleware.js';


logger.info("Database configuration:");
logger.info("PGUSER:", process.env.DB_USER);
logger.info("PGHOST:", process.env.DB_HOST);
logger.info("PGDATABASE:", process.env.DB_NAME);
logger.info("PGPASSWORD:", process.env.DB_PASSWORD ? "********" : "Not set" ); // Mask the password for security
logger.info("PGPORT:",process.env.DB_PORT);

const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD, 
  port: process.env.DB_PORT
})


export default pool;