import express from 'express'
import { UserControllers } from './user.controller'
import { AnyZodObject } from 'zod'
import { studentValidations } from '../student/student.validation'
import validateRequest from '../../middleware/validateRequest'
import { createFacultyValidationSchema } from '../faculty/faculty.validation'
import { createAdminValidationSchema } from '../admin/admin.validation'

const router = express.Router()

router.post(
  '/create-student',
  validateRequest(
    studentValidations.createStudentValidationSchema as AnyZodObject,
  ),
  UserControllers.createStudent,
)

router.post(
  '/create-faculty',
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty,
)

router.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
)

export const UserRoutes = router
