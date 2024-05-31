import { StudentServices } from './student.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
// import studentValidationSchema from './student.validation'

// import studentValidationSchema from './student.validation'

// const createStudent = async (req: Request, res: Response) => {
//   try {
//     // // creating a schema validation using JOI
//     // const { student: studentData } = req.body

//     // // data validation using JOI
//     // const { error, value } = studentJoiValidationSchema.validate(studentData)

//     // // will call service function to send this data
//     // const result = await StudentServices.createStudentIntoDB(value)

//     // if (error) {
//     //   res.status(500).json({
//     //     success: false,
//     //     message: 'Something went wrong',
//     //     error: error.details,
//     //   })
//     // }

//     // creating a schema validation using Zod
//     const { student: studentData } = req.body

//     // data validation using zod
//     const zodParsedData = studentValidationSchema.parse(studentData)

//     // will call service function to send this data
//     const result = await StudentServices.createStudentIntoDB(zodParsedData)

//     // send response
//     res.status(200).json({
//       success: true,
//       message: 'Student is created successfully',
//       data: result,
//     })
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Something went wrong',
//       error: error,
//     })
//   }
// }

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students are retrieved successfully',
    data: result,
  })
})

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params
  const result = await StudentServices.getSingleStudentFromDB(studentId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is retrieved successfully',
    data: result,
  })
})

const updateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params
  const { student } = req.body
  const result = await StudentServices.updateStudentIntoDB(studentId, student)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is updated successfully',
    data: result,
  })
})

const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params
  const result = await StudentServices.deleteStudentFromDB(studentId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is deleted successfully',
    data: result,
  })
})

export const StudentControllers = {
  // createStudent,
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
}
