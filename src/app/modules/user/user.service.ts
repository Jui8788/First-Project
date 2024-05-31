import mongoose from 'mongoose'
import config from '../../config'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { Student } from '../student.model'
import { TStudent } from '../student/student.interface'
import { TUser } from './user.interface'
import { User } from './user.model'
import { generateStudentId } from './user.utils'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user
  const userData: Partial<TUser> = {}

  //  if password is not given, use default password
  userData.password = password || (config.default_password as string)

  //   set role
  userData.role = 'student'

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  )

  // Check if admissionSemester is null
  if (!admissionSemester) {
    throw new Error('Admission semester not found')
  }

  // startSession
  const session = await mongoose.startSession()

  try {
    // startTransaction
    session.startTransaction()
    //set  generated id
    userData.id = await generateStudentId(admissionSemester)

    //   create a user(transaction-1)
    const newUser = await User.create([userData], { session })

    //   create a student
    // if (Object.keys(newUser).length)

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    // set id, _id as user
    payload.id = newUser[0].id //embedding id
    payload.user = newUser[0]._id //reference id

    //   create a student(transaction-2)
    const newStudent = await Student.create([payload], { session })
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student')
    }

    await session.commitTransaction()
    await session.endSession()

    return newStudent
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    console.error('Error creating student:', error) // Log the error details
    throw new Error('Failed to create student')
  }
}

export const UserServices = {
  createStudentIntoDB,
}
