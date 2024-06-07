import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { SemesterRegistrationValidations } from './semesterRegistration.validation'
import { SemesterRegistrationControllers } from './semesterRegistration.controller'

const router = express.Router()

router.post(
  '/create-semester-registration',
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationControllers.createSemesterRegistration,
)

router.patch(
  '/:id',
  validateRequest(
    SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationControllers.updateSemesterRegistration,
)

router.get('/', SemesterRegistrationControllers.getAllSemesterRegistrations)

router.get(
  '/:id',
  SemesterRegistrationControllers.getSingleSemesterRegistration,
)

export const SemesterRegistrationRoutes = router
