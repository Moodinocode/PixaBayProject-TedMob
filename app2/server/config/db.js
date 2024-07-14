import  pg  from 'pg'
import dotenv from 'dotenv';
dotenv.config();

console.log("Database configuration:");
console.log("PGUSER:", process.env.DB_USER);
console.log("PGHOST:", process.env.DB_HOST);
console.log("PGDATABASE:", process.env.DB_NAME);
console.log("PGPASSWORD:", process.env.DB_PASSWORD ? "********" : "Not set" ); // Mask the password for security
console.log("PGPORT:",process.env.DB_PORT);

const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD, 
  port: process.env.DB_PORT
})


export default pool;