import pool from "../config/db.js";

const setFavorite = async (user_id, media_link_thumbnail, media_link_active, media_type) => {
  const result = await pool.query(
    `INSERT INTO favorites (user_id, media_link_thumbnail, media_link_active, media_type) VALUES ($1, $2, $3, $4) RETURNING *`,
    [user_id, media_link_thumbnail, media_link_active, media_type]
  );
  return result.rows[0];
};

const removeFavorite = async (user_id, media_link_thumbnail) => {
  const result = await pool.query(
    `DELETE FROM favorites WHERE user_id = $1 AND media_link_thumbnail = $2 RETURNING *`,
    [user_id, media_link_thumbnail]
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