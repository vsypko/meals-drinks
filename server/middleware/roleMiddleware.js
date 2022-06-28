import jwt from 'jsonwebtoken'
import { secret } from '../config.js'

export default (roles) => {
  return (req, res, next) => {
    if (req.method === 'OPTIONS') {
      next()
    }

    try {
      const token = req.headers.authorization
      if (!token) {
        return res
          .status(403)
          .json({ message: 'Unauthorized user. Please sign up.' })
      }

      const { roles: userRoles } = jwt.verify(token, secret)

      let hasRole = false

      userRoles.forEach((role) => {
        if (roles.includes(role)) {
          hasRole = true
        }
      })
      if (!hasRole) {
        return res.status(403).json({ message: 'Access denied.' })
      }
      next()
    } catch (e) {
      console.log(e)
      return res.status(403).json({ message: 'Forbidden' })
    }
  }
}
