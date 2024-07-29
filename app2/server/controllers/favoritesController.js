import { verifyToken } from '../config/jwt.js';
import {setFavorite,removeFavorite,getAllFavorites} from '../models/Favorite.js'
import { getDBTokenById } from '../models/token.js';
import { getID } from '../models/User.js';

const toggleLike = async (req,res) => {
  const {item,token,liked} = req.body;


  logger.info('toggleLike liked value = ',liked,{ userId: req.meta.user_id })
  
  // const itemType = item.type;
  // const mediaThumbnail = item.userImageURL
  // const mediaActive = media.type ==='image'? item.userImageURL : item.videos.medium.url
  logger.info('toggleLike:',token,{ userId: req.meta.user_id })


  const tokenverified = await verifyToken(token)
  logger.info('token verified: ',tokenverified,{ userId: req.meta.user_id })


  const user_id = tokenverified.id
  logger.info('user_id:',user_id,{ userId: req.meta.user_id })



  try {
    let result;
    if (liked) {
      logger.info('toggleLike removing media item from favorites',{ userId: req.meta.user_id })
      result = await removeFavorite(user_id, item);
    } else {
      logger.info('toggleLike setting media item as favorite',{ userId: req.meta.user_id })
      result = await setFavorite(user_id, item);
    }
    logger.info('toggle Like result:',result,{ userId: req.meta.user_id })
    res.status(200).json(result);
  } catch (error) {
    logger.error('toggleLike error',{ userId: req.meta.user_id })
    res.status(500).json({ error: error.message });
  }
}


const returnFavorites = async (req,res) => {
  const {token} = req.body;
  logger.info('returnFavorites token:',token,{ userId: req.meta.user_id })
  const user_id = verifyToken(token).id
  logger.info('returnFavorites id:',user_id,{ userId: req.meta.user_id })
  try {
    const favorites = await getAllFavorites(user_id);
    logger.info('id:',user_id,'has the following as favorites: ',favorites,{ userId: req.meta.user_id })
    res.status(200).json(favorites);
  } catch (error) {
    logger.error('returnFavorites error',{ userId: req.meta.user_id })
    res.status(500).json({ error: error.message });
  }
}

export {toggleLike,returnFavorites}