import { UserServices } from './user.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'

const createStudent = catchAsync(async (req, res) => {
  // creating a schema validation using Zod
  const { password, student: payload } = req.body

  // will call service function to send this data
  const result = await UserServices.createStudentIntoDB(password, payload)

  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created successfully',
    data: result,
  })
})

export const UserControllers = {
  createStudent,
}
