import { verifyToken } from '../config/jwt.js'

export const addUserIdToMeta = (req, res, next) => {
  const token = req.body.token; // Extract token from request body
  if (token) {
    const userId = verifyToken(token);
    req.meta = {
      user_id: userId
    };
  } else {
    req.meta = {
      user_id: null
    };
  }
  next();
};