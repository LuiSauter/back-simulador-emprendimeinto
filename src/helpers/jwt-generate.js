import jwt from 'jsonwebtoken'
import config from '../config.js'

export async function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, config.TOKEN_SECRET, { expiresIn: '1d' },
      (error, token) => error ? reject(error) : resolve(token))
  })
}
