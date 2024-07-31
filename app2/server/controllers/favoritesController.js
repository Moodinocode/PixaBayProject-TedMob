import { verifyToken } from '../config/jwt.js';
import {setFavorite,removeFavorite,getAllFavorites} from '../models/Favorite.js'
import { getDBTokenById } from '../models/token.js';
import { getID } from '../models/User.js';

const toggleLike = async (req,res) => {
  const {item,token,liked} = req.body;


  console.log('toggleLike liked value = ',liked,{ userId: req.meta.user_id })
  
  // const itemType = item.type;
  // const mediaThumbnail = item.userImageURL
  // const mediaActive = media.type ==='image'? item.userImageURL : item.videos.medium.url
  console.log('toggleLike:',token,{ userId: req.meta.user_id })


  const tokenverified = await verifyToken(token)
  console.log('token verified: ',tokenverified,{ userId: req.meta.user_id })


  const user_id = tokenverified.id
  console.log('user_id:',user_id,{ userId: req.meta.user_id })



  try {
    let result;
    if (liked) {
      console.log('toggleLike removing media item from favorites',{ userId: req.meta.user_id })
      result = await removeFavorite(user_id, item);
    } else {
      console.log('toggleLike setting media item as favorite',{ userId: req.meta.user_id })
      result = await setFavorite(user_id, item);
    }
    console.log('toggle Like result:',result,{ userId: req.meta.user_id })
    res.status(200).json(result);
  } catch (error) {
    console.log('toggleLike error',{ userId: req.meta.user_id })
    res.status(500).json({ error: error.message });
  }
}


const returnFavorites = async (req,res) => {
  const {token} = req.body;
  console.log('returnFavorites token:',token,{ userId: req.meta.user_id })
  const user_id = verifyToken(token).id
  console.log('returnFavorites id:',user_id,{ userId: req.meta.user_id })
  try {
    const favorites = await getAllFavorites(user_id);
    console.log('id:',user_id,'has the following as favorites: ',favorites,{ userId: req.meta.user_id })
    res.status(200).json(favorites);
  } catch (error) {
    console.log('returnFavorites error',{ userId: req.meta.user_id })
    res.status(500).json({ error: error.message });
  }
}

export {toggleLike,returnFavorites}