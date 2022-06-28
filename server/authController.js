import User from "./models/User.js"
import Role from "./models/Role.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { OAuth2Client } from "google-auth-library"
import { validationResult } from "express-validator"
import { secret } from "./config.js"

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  }
  return jwt.sign(payload, secret, { expiresIn: "48h" })
}

class authController {
  //REGISTRATION
  async registration(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Registration error", errors })
      }

      const { email, password } = req.body

      const candidateEmail = await User.findOne({ email })
      if (candidateEmail) {
        return res.status(401).json({ message: "Such email already exist" })
      }

      const hashPassword = await bcrypt.hash(password, 8)
      const userRole = await Role.findOne({ value: "USER" })
      const userAvatar = null

      const user = new User({
        email: email,
        password: hashPassword,
        imageUrl: userAvatar,
        roles: [userRole.value],
      })

      await user.save()

      const token = generateAccessToken(user._id, user.roles)

      return res.status(201).json({
        message: "User registered successful",
        token,
        user: {
          id: user._id,
          email: user.email,
          imageUrl: user.imageUrl,
          roles: user.roles,
        },
      })
    } catch (e) {
      console.log(e)
      res.status(403).json({ message: "Registartion error" })
    }
  }
  //LOGIN
  async login(req, res) {
    //WITH GOOGLE ACCOUNT
    if (req.body.tokenId) {
      try {
        const client = new OAuth2Client(process.env.CLIENT_ID)
        const tokenId = req.body.tokenId

        const ticket = await client
          .verifyIdToken({
            idToken: tokenId,
            audience: process.env.CLIENT_ID,
          })
          .catch(console.error)

        const { email, picture } = ticket.getPayload()

        //CHECK USER IN DB
        const candidate = await User.findOne({ email: email })
        //IF NOT -> REGISTRATION
        if (!candidate) {
          const userRole = await Role.findOne({ value: "USER" })
          const user = new User({
            email: email,
            imageUrl: picture,
            roles: [userRole.value],
          })
          await user.save()

          //GENERATE TOKEN AND RETURN IT TO CLIENT
          const token = generateAccessToken(user._id, user.roles)
          return res.status(201).json({
            message: "User from Google registered",
            token,
            user,
          })
        } else {
          //USER ALREADY EXISTS -> GENERATE TOKEN AND RETURN IT TO CLIENT
          const token = generateAccessToken(candidate._id, candidate.roles)
          if (!candidate.imageUrl) {
            candidate.imageUrl = picture
            await candidate.save()
          }
          return res.status(201).json({
            message: "User registered by Google",
            token,
            user: {
              id: candidate._id,
              email: candidate.email,
              imageUrl: candidate.imageUrl,
              roles: candidate.roles,
            },
          })
        }
      } catch (e) {
        console.log(e)
      }
    }
    //LOGIN WITH EMAIL AND PASSWORD
    if (req.body.email) {
      try {
        const { email, password } = req.body
        //CHECK USER BY EMAIL
        const user = await User.findOne({ email: email })

        if (!user) {
          return res.status(404).json({
            message: "Email are not exist or incorrect. Please sign up",
          })
        }
        //USER ALREADY EXISTS -> VERIFY PASSWORD
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
          return res.status(406).json({ message: "Incorrect password" })
        }
        //IF USER OK -> GENERATE TOKEN AND RETURN IT TO CLIENT
        const token = generateAccessToken(user._id, user.roles)
        return res.json({
          token,
          user: {
            id: user._id,
            email: user.email,
            imageUrl: user.imageUrl,
            roles: user.roles,
          },
        })
      } catch (e) {
        res.status(403).json({
          message:
            "Login error. May be your credentials are managed by your Google account. Try to log in with Google account.",
        })
      }
    }
  }

  //GET ALL USERS
  async getUsers(req, res) {
    try {
      const users = await User.find()
      res.json(users)
    } catch (e) {
      console.log(e)
    }
  }
  //GET ONE USER
  async getUser(req, res) {
    try {
      const user = await User.findById(req.user.id)
      res.json({ user })
    } catch (err) {
      console.log(err)
    }
  }
}

export default new authController()
