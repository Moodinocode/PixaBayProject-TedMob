import { verifyToken } from '../config/jwt.js';
import {setFavorite,removeFavorite,getAllFavorites} from '../models/Favorite.js'
import { getID } from '../models/User.js';

const toggleLike = async (req,res) => {
  const {item,token,isLiked} = req.body;

  console.log(isLiked)
  // const itemType = item.type;
  // const mediaThumbnail = item.userImageURL
  // const mediaActive = media.type ==='image'? item.userImageURL : item.videos.medium.url
  console.log(token)

  const tokenverified = await verifyToken(token)
  console.log('token verified: ',tokenverified)


  const user_id = tokenverified


  try {
    let result;
    if (!isLiked) {
      result = await removeFavorite(user_id, item);
    } else {
      result = await setFavorite(user_id, item);
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


const returnFavorites = async (req,res) => {
  const {email} = req.body;
  const user_id = getID(email)
  try {
    const favorites = await getAllFavorites(user_id);
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export {toggleLike,returnFavorites}