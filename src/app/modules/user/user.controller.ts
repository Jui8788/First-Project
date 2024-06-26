import { UserServices } from './user.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
// import AppError from '../../errors/AppError'

const createStudent = catchAsync(async (req, res) => {
  // creating a schema validation using Zod
  const { password, student: payload } = req.body

  // will call service function to send this data
  const result = await UserServices.createStudentIntoDB(
    req.file,
    password,
    payload,
  )

  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created successfully',
    data: result,
  })
})

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body

  const result = await UserServices.createFacultyIntoDB(
    req.file,
    password,
    facultyData,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is created successfully',
    data: result,
  })
})

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body

  const result = await UserServices.createAdminIntoDB(password, adminData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created successfully',
    data: result,
  })
})

const getMe = catchAsync(async (req, res) => {
  // const token = req.headers.authorization

  // if (!token) {
  //   throw new AppError(httpStatus.NOT_FOUND, 'Token not found !')
  // }
  // const result = await UserServices.getMeFromDB(token)

  const { userId, role } = req.user

  const result = await UserServices.getMeFromDB(userId, role)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved successfully',
    data: result,
  })
})

const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id

  const result = await UserServices.changeStatus(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Status is updated successfully',
    data: result,
  })
})

export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeStatus,
}
