import jwt from 'jsonwebtoken'
import config from '../config.js'

export const auth = (req, res, next) => {
  try {
    const { token } = req.cookies
    if (!token) {
      return res.status(401).json({ message: 'Sin token, autorización denegada' })
    }

    jwt.verify(token, config.TOKEN_SECRET, (error, user) => {
      if (error) {
        return res.status(401).json({ message: 'El token no es válido' })
      }
      console.log(user)
      req.user = user
      next()
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
