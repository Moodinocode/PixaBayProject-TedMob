import pool from "../config/db";

const setFavorite = async (email, media) => {
  const result = await pool.query(`INSERT INTO favorites (email, fav) VALUES (${email}, ${media}) RETURNING *`);
  return result.rows[0];
}

const removeFavorite = async (email, media) => {
  const result = await pool.query(`DELETE FROM favorites WHERE email = '${email}'  AND fav = '${media} RETURNING *'`);
  return result.rows[0];
}
const getAllFavorites = async (email) => {
  const result = await pool.query(`SELECT * FROM favorites WHERE email = '${email}'`);
  return result.rows[0];
}