import pool from "../config/db.js";

const createUser = async (email,password) => {
  const result = await pool.query('INSERT INTO users (userEmail, userPassowrd) VALUES ($1, $2) RETURNING *', [email, password]);
  return result.rows[0];
}

const updatePassword = async (email,newPassword) =>{
  const result = await pool.query(`Update users SET password = '${newPassword}' WHERE email = '${email}'`)
  return result.rows[0];
}

const emailRegistered = async (email) => {
  const result = await pool.query("SELECT COUNT(*) FROM users WHERE userEmail = ''$1''", ['hello@gmail.com'])// [email])
  console.log(result.rows[0].count,10)
  const count = parseInt(result.rows[0].count,10);
  return count === 0 ? false : true;
}

export  {createUser,updatePassword, emailRegistered}