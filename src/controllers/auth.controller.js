import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/user.model.js'
import config from '../config.js'
import { createAccessToken } from '../helpers/jwt-generate.js'

export const register = async (req, res) => {
  try {
    const { password, email, ...rest } = req.body
    const userFound = await User.findOne({ email })

    if (userFound) {
      return res.status(400).json({ message: 'El correo electrónico ya está en uso.' })
    }
    // hashing the password
    const passwordHash = await bcrypt.hash(password, 10)
    const newUser = new User({ email, password: passwordHash, ...rest })
    const userSaved = await newUser.save()
    // create access token
    const token = await createAccessToken({ id: userSaved._id })

    res.cookie('token', token, {
      httpOnly: process.env.NODE_ENV !== 'development',
      sameSite: 'none',
      secure: true
    })

    res.status(201).json(userSaved)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const userFound = await User.findOne({ email })
    if (!userFound) {
      return res.status(400).json({ message: 'El correo electrónico no existe' })
    }

    const isMatch = await bcrypt.compare(password, userFound.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'La contraseña es incorecta' })
    }

    const token = await createAccessToken({
      id: userFound._id,
      name: userFound.name
    })

    res.cookie('token', token, {
      httpOnly: process.env.NODE_ENV !== 'development',
      secure: true,
      sameSite: 'none'
    })

    return res.status(200).json({ ...userFound._doc, token })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
export const verifyToken = async (req, res) => {
  const { token } = req.cookies
  if (!token) return res.send(false)
  jwt.verify(token, config.TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401)
    const userFound = await User.findById(user.id)
    if (!userFound) return res.sendStatus(401)
    res.json(userFound)
  })
}
export const logout = async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    secure: true,
    expires: new Date(0)
  })
  return res.sendStatus(200)
}
