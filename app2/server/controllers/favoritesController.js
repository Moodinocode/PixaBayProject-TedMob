import { verifyToken } from '../config/jwt.js';
import {setFavorite,removeFavorite,getAllFavorites} from '../models/Favorite.js'
import { getID } from '../models/User.js';

const toggleLike = async (req,res) => {
  const {item,token,liked} = req.body;

  console.log('toggleLike liked value = ',liked)
  // const itemType = item.type;
  // const mediaThumbnail = item.userImageURL
  // const mediaActive = media.type ==='image'? item.userImageURL : item.videos.medium.url
  console.log('toggleLike:',token)

  const tokenverified = await verifyToken(token)
  console.log('token verified: ',tokenverified)


  const user_id = tokenverified.id
  console.log('user_id:',user_id)


  try {
    let result;
    if (liked) {
      console.log('toggleLike removing media item from favorites')
      result = await removeFavorite(user_id, item);
    } else {
      console.log('toggleLike setting media item as favorite')
      result = await setFavorite(user_id, item);
    }
    console.log('toggle Like result:',result)
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