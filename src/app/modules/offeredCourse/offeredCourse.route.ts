import express from 'express'
import { OfferedCourseValidations } from './offeredCourse.validation'
import { OfferedCourseControllers } from './offeredCourse.controller'
import validateRequest from '../../middleware/validateRequest'

const router = express.Router()

router.get('/', OfferedCourseControllers.getAllOfferedCourses)

router.get('/:id', OfferedCourseControllers.getSingleOfferedCourses)

router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
)

router.patch(
  '/:id',
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse,
)

router.delete('/:id', OfferedCourseControllers.deleteOfferedCourse)

export const offeredCourseRoutes = router
