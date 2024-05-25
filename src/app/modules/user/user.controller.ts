import { NextFunction, Request, Response } from 'express'
import { UserServices } from './user.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // creating a schema validation using Zod
    const { password, student: studentData } = req.body

    // will call service function to send this data
    const result = await UserServices.createStudentIntoDB(password, studentData)

    // send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is created successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const UserControllers = {
  createStudent,
}
