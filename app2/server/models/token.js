import pool from "../config/db.js";

const createDBToken = async (token, userId, expiresAt = null) => {
  const result = await pool.query(
    'INSERT INTO tokens (token, user_id, expires_at) VALUES ($1, $2, $3) RETURNING *',
    [token, userId, expiresAt]
  );
  return result.rows[0];
};

const getDBTokenById = async (userId) => {
  const result = await pool.query(
    'SELECT token FROM tokens WHERE user_id = $1',
    [userId]
  );
  console.log('getDBTokenById returned token =',result.rows[0].token,)
  return result.rows[0].token;
};

export { createDBToken,getDBTokenById };