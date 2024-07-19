import pool from "../config/db.js";

const createUser = async (email,password) => {
  const result = await pool.query('INSERT INTO users (userEmail, userPassowrd) VALUES ($1, $2) RETURNING *', [email, password]);
  return result.rows[0];
}

const checkPassword = async (email,password) => {
  const result = await pool.query('Select 1 FROM users WHERE userEmail = $1 AND userPassowrd = $2', [email, password]);
  return result === 1;
}

const updatePassword = async (email,newPassword) =>{
  const result = await pool.query(`Update users SET password = '${newPassword}' WHERE email = '${email}'`)
  return result.rows[0];
}

const emailRegistered = async (email) => {
  const result = await pool.query("SELECT COUNT(*) FROM users WHERE userEmail = $1", [email])
  const count = parseInt(result.rows[0].count,10);
  console.log(count)
  return count !== 0;
}

const userIsAuthorized = async(email) => {
  const result = await pool.query("SELECT authorized FROM users WHERE userEmail = $1", [email])
  console.log('result =',result.rows[0].authorized)
  return result.rows[0].authorized;
}
const getID = async(email) => {
  return await pool.query("SELECT id FROM users WHERE userEmail = $1", [email])
}
const authorizeUser = async(id) => {
  return await pool.query("Update users SET authorized = TRUE WHERE id = $1", [id])
}

export  {createUser,updatePassword, emailRegistered, userIsAuthorized, checkPassword,authorizeUser,getID}