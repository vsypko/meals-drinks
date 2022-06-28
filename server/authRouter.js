import Router from 'express'
import controller from './authController.js'
import { check } from 'express-validator'
import authMiddleWare from './middleware/authMiddleware.js'
import roleMiddleWare from './middleware/roleMiddleware.js'

const router = new Router()

router.post(
  '/registration',
  [
    check('email', 'Use valid email')
      .normalizeEmail({ gmail_remove_dots: false })
      .isEmail(),
    check(
      'password',
      'Password should be min 8 symbs and max 15 symbs'
    ).isLength({ max: 15, min: 8 }),
  ],
  controller.registration
)
router.post('/login', controller.login)
router.get('/users', roleMiddleWare(['ADMIN']), controller.getUsers)
router.get('/user', authMiddleWare, controller.getUser)
export default router
