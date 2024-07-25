import pool from "../config/db.js";

const createDBToken = async (token, userId, expiresAt) => {
  const result = await pool.query(
    'INSERT INTO tokens (token, user_id, expires_at) VALUES ($1, $2, $3) RETURNING *',
    [token, userId, expiresAt]
  );
  return result.rows[0];
};

export { createDBToken };