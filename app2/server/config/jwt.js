import jwt from 'jsonwebtoken'


const JWT_Secret = process.env.JWT_SECRET

const createToken = (payload) => {
  return jwt.sign(payload, JWT_Secret , { expiresIn:'10y' });
}

const verifyToken = (token) => {
  try{
    logger.info('verifying token mehtod', {userId: req.meta.user_id})
    const dec = jwt.verify(token,JWT_Secret);
    return dec;
  } catch(err) {
    logger.info('verify token catch block', {userId: req.meta.user_id})
    logger.error('Token verification error:', err.message, {userId: req.meta.user_id})

  }
}

export { createToken,verifyToken}