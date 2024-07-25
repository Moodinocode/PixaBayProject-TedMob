import jwt from 'jsonwebtoken'


const JWT_Secret = process.env.JWT_SECRET

const createToken = (payload) => {
  return jwt.sign(payload, JWT_Secret , { expiresIn:'10y' });
}

const verifyToken = (token) => {
  try{
    console.log('verify token method')
    const dec = jwt.verify(token,JWT_Secret);
    return dec;
  } catch(err) {
    console.log('verify token catch block')
    console.error('Token verification error:', err.message);
  }
}

export { createToken,verifyToken}