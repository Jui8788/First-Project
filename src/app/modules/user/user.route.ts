import express from 'express'
import { UserControllers } from './user.controller'
import { AnyZodObject } from 'zod'
import { studentValidations } from '../student/student.validation'
import validateRequest from '../../middleware/validateRequest'

const router = express.Router()

router.post(
  '/create-student',
  validateRequest(
    studentValidations.createStudentValidationSchema as AnyZodObject,
  ),
  UserControllers.createStudent,
)

export const UserRoutes = router
