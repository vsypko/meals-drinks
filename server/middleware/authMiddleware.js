//import { locatedError } from 'graphql'
import jwt from 'jsonwebtoken'
import { secret } from '../config.js'

export default (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next()
  }
  try {
    const token = req.headers.authorization
    if (!token) {
      return res
        .status(403)
        .json({ message: 'Unauthorized user. Please authorize.' })
    }
    const decodedData = jwt.verify(token, secret)
    req.user = decodedData
    next()
  } catch (e) {
    console.log(e)
    return res
      .status(403)
      .json({ message: 'Unauthorized user. Access denied.' })
  }
}
