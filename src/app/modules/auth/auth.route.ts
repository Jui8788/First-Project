import express from 'express'
import auth from '../../middleware/auth'
import validateRequest from '../../middleware/validateRequest'
import { USER_ROLE } from '../user/user.constant'
import { AuthControllers } from './auth.controller'
import { AuthValidation } from './auth.validation'

const router = express.Router()

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
)

router.post('/change-password', (req, res, next) => {
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student)(
    req,
    res,
    (err) => {
      if (err) return next(err)
      validateRequest(AuthValidation.changePasswordValidationSchema)(
        req,
        res,
        (err) => {
          if (err) return next(err)
          AuthControllers.changePassword(req, res, next)
        },
      )
    },
  )
})

router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
)

export const AuthRoutes = router
