import pool from "../config/db.js";

const setFavorite = async (user_id,media_item) => {
  const result = await pool.query(
    'INSERT INTO favorites (user_id, media) VALUES ($1, $2)',
    [user_id, media_item]
  );
  return result.rows[0];
};

const removeFavorite = async (user_id, media_item) => {
  const result = await pool.query(
    'DELETE FROM favorites WHERE user_id = $1 AND media = $2 ',
    [user_id, media_item]
  );
  return result.rows[0];
};

const getAllFavorites = async (user_id) => {
  const result = await pool.query(
    `SELECT * FROM favorites WHERE user_id = $1`,
    [user_id]
  );
  return result.rows;
};

export {setFavorite,removeFavorite,getAllFavorites}