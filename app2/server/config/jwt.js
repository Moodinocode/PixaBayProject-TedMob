import jwt from 'jsonwebtoken'


const JWT_Secret = process.env.JWT_SECRET

const createToken = (payload) => {
  return jwt.sign(payload, JWT_Secret , { expiresIn:'10y' });
}

const verifyToken = (token) => {
  try{
    console.log('verifying token mehtod', {userId: req.meta.user_id})
    const dec = jwt.verify(token,JWT_Secret);
    return dec;
  } catch(err) {
    console.log('verify token catch block', {userId: req.meta.user_id})
    console.log('Token verification error:', err.message, {userId: req.meta.user_id})

  }
}

export { createToken,verifyToken}