import mongoose from 'mongoose'
import { Student } from '../student.model'
import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { User } from '../user/user.model'
import { TStudent } from './student.interface'
import QueryBuilder from '../../builder/QueryBuilder'
import { studentSearchableFields } from './student.constant'
// import { TStudent } from './student.interface'

// const createStudentIntoDB = async (studentData: TStudent) => {
//   // built-in static method
//   if (await Student.isUserExists(studentData.id)) {
//     throw new Error('User already exists')
//   }

//   const result = await Student.create(studentData)

//   // built-in instance method
//   // const student = new Student(studentData) //create an instance
//   // if (await student.isUserExists(studentData.id)) {
//   //   throw new Error('User already exits')
//   // }
//   // const result = await student.save()
//   return result
// }

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // {email:{$regex: query.searchTerm, $options:1}}
  // {presentAddress:{$regex: query.searchTerm, $options:1}}
  // {"name.firstName":{$regex: query.searchTerm, $options:1}}
  // const queryObj = { ...query } // copying req.query object so that we can mutate the copy object

  // const studentSearchableFields = ['email', 'name.firstName', 'presentAddress']

  // let searchTerm = ''

  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string
  // }

  // const searchQuery = Student.find({
  //   $or: studentSearchableFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // })

  // // filtering
  // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields']

  // excludeFields.forEach((elem) => delete queryObj[elem])

  // // console.log({ query }, { queryObj })

  // const filterQuery = searchQuery
  //   .find(queryObj)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   })

  // let sort = '-createdAt'
  // if (query.sort) {
  //   sort = query.sort as string
  // }
  // const sortQuery = filterQuery.sort(sort)

  // let page = 1
  // let skip = 1
  // let limit = 1

  // if (query.limit) {
  //   limit = query.limit as number
  // }

  // if (query.page) {
  //   page = Number(query.page)
  //   skip = (page - 1) * limit
  // }

  // const paginateQuery = sortQuery.skip(skip)
  // const limitQuery = paginateQuery.limit(limit)

  // let fields = '-__v'

  // if (query.fields) {
  //   fields = (query.fields as string).split(',').join(' ')
  //   console.log(fields)
  // }

  // const fieldQuery = await limitQuery.select(fields)

  // return fieldQuery

  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await studentQuery.modelQuery
  return result
}

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
  // const result = await Student.aggregate([{ $match: { id: id } }])
  return result
}

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingData } = payload

  const modifiedUpdatedData: Record<string, unknown> = { ...remainingData }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value
    }
  }

  const result = await Student.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const deletedStudent = await Student.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student')
    }

    const userId = deletedStudent.user

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user')
    }

    await session.commitTransaction()
    await session.endSession()

    return deletedStudent
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error('Failed to delete student')
  }
}

export const StudentServices = {
  // createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDB,
  deleteStudentFromDB,
}
