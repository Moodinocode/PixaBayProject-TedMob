import pool from "../config/db.js";

const createDBToken = async (token,userid) => {
    const result = await pool.query('INSERT INTO tokens (token, user_id) VALUES ($1, $2) RETURNING *', [token, user_id]);
    return result.rows[0];
}




export {createDBToken}