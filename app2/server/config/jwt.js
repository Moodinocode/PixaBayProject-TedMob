import jwt from 'jsonwebtoken'


const JWT_Secret = process.env.JWT_SECRET

const createToken = (payload) => {
  return jwt.sign(payload,JWT_Secret,{expiresIn:'1h'})
}

const verifyToken = (token) => {
  return jwt.verify(token,JWT_Secret);
}

export { createToken,verifyToken}