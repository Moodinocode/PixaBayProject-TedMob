import jwt from 'jsonwebtoken'

// Supplied through the environment so the signing key is never committed.
// Without it there is no point starting: every protected route, the email
// verification link and the password reset all depend on this signature.
const JWT_Secret = process.env.JWT_SECRET

if (!JWT_Secret) {
  throw new Error('JWT_SECRET is not set. Copy .env.example to .env and set a long random value.')
}

// Short-lived by design. A token that lives for years cannot be taken back:
// if one leaks, the account stays reachable until the expiry, so the window
// is kept to a day rather than a decade.
const TOKEN_LIFETIME = process.env.JWT_EXPIRES_IN || '1d'

const createToken = (payload) => {
  return jwt.sign(payload, JWT_Secret, { expiresIn: TOKEN_LIFETIME })
}

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_Secret)
  } catch (err) {
    console.log('Token verification failed:', err.message)
    return undefined
  }
}

export { createToken, verifyToken }
