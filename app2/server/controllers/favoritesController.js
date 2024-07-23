import {setFavorite,removeFavorite,getAllFavorites} from '../models/Favorite'
import { getID } from '../models/User';

const toggleLike = async (req,res) => {
  const {item,loggedEmail,isLiked} = req.body;
  const itemType = item.type;
  const mediaThumbnail = item.userImageURL
  const mediaActive = media.type ==='image'? item.userImageURL : item.videos.medium.url
  const user_id = getID(loggedEmail)

  try {
    let result;
    if (isLiked) {
      result = await removeFavorite(user_id, media_link_thumbnail);
    } else {
      result = await setFavorite(user_id, media_link_thumbnail, media_link_active, media_type);
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