import pool from "../config/db.js";

const createUser = async (email,password) => {
  const result = await pool.query(
    'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, password]);
  return result.rows[0];
}

const checkPassword = async (email,password) => {
  const result = await pool.query('Select 1 FROM users WHERE email = $1 AND password = $2', [email, password]);
  return result === 1;
}

const updatePassword = async (id,newPassword) =>{
  const result = await pool.query(
    'UPDATE users SET password = $1 WHERE id = $2 RETURNING *',
    [newPassword, id]
  );
  return result.rows[0];
}

const emailRegistered = async (email) => {
  const result = await pool.query("SELECT COUNT(*) FROM users WHERE email = $1", [email])
  const count = parseInt(result.rows[0].count,10);
  console.log('email registered count:',count)
  return count !== 0;
}

const userIsAuthorized = async(email) => {
  const result = await pool.query(
    'SELECT verified FROM users WHERE email = $1',
    [email]
  );
  if (result.rows.length === 0) {
    console.log('No user found with this email',)
    return false;
  }
  console.log('User verification status =', result.rows[0].verified,)
  return result.rows[0].verified;
};

const getID = async (email) => {
  const result = await pool.query("SELECT id FROM users WHERE email = $1", [email])
  console.log('get ID id =',result.rows[0].id,)
  return result.rows[0].id;
}
const authorizeUser = async(id) => {
  const result = await pool.query('UPDATE users SET verified = TRUE WHERE id = $1 RETURNING *', [id])
  return result.rows[0];
}

export  {createUser,updatePassword, emailRegistered, userIsAuthorized, checkPassword,authorizeUser,getID}