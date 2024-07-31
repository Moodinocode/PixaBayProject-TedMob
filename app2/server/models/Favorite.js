import pool from "../config/db.js";

const setFavorite = async (user_id,media_item) => {
  console.log('setFavorite id:',user_id,{ userId: req.meta.user_id })
 // console.log('setFavorite media item,',media_item)
  const result = await pool.query(
    'INSERT INTO favorites (user_id, media) VALUES ($1, $2)',
    [user_id, media_item]
  );
  return result.rows[0];
};

const removeFavorite = async (user_id, media_item) => {
  console.log('removefavorite id:',user_id,{ userId: req.meta.user_id })
  //console.log('removefavorite media item,',media_item)
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
  console.log('getAllFavorites result:',result.rows,{ userId: req.meta.user_id })
  return result.rows.map(row => row.media);
};

export {setFavorite,removeFavorite,getAllFavorites}