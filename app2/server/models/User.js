import pool from "../config/db.js";

const createUser = async (email,password) => {
  const result = await pool.query(`INSERT INTO users (email, password) VALUES (${email}, ${password}) RETURNING *`)
  return result.rows[0];
}

const updatePassword = async (email,newPassword) =>{
  const result = await pool.query(`Update users SET password = '${newPassword}' WHERE email = '${email}'`)
  return result.rows[0];
}

const emailRegistered = async (email) => {
  const result = await pool.query(`SELECT COUNT(*) FROM users WHERE email = '${email}'`)
  return result === 0 ? true : false;
}

export  {createUser,updatePassword, emailRegistered}