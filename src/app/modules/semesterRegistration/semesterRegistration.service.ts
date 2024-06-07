import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { TSemesterRegistration } from './semesterRegistration.interface'
import { SemesterRegistration } from './semesterRegistration.model'
import QueryBuilder from '../../builder/QueryBuilder'
import { RegistrationStatus } from './semesterRegistration.constant'

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  // check if there any registered semester already "UPCOMING" or "ONGOING"
  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [
        { status: RegistrationStatus.UPCOMING },
        { status: RegistrationStatus.ONGOING },
      ],
    })

  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already an ${isThereAnyUpcomingOrOngoingSemester.status} registered semester !`,
    )
  }

  // check if the semester is exist
  const academicSemester = payload?.academicSemester

  const isAcademicSemesterExist =
    await AcademicSemester.findById(academicSemester)

  if (!isAcademicSemesterExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This Academic Semester Doesn't exist",
    )
  }

  //   check if the semester is already registered
  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(academicSemester)

  if (isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This Semester is already registered',
    )
  }

  const result = await SemesterRegistration.create(payload)
  return result
}

const getAllSemesterRegistrationsFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await semesterRegistrationQuery.modelQuery
  return result
}

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id)
  return result
}

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  // check if the requested semester is exist
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id)

  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Semester is not found')
  }
  // if the requested semester registration is ended, we will not update anything
  const currentSemesterStatus = isSemesterRegistrationExists?.status
  const requestedStatus = payload?.status

  if (currentSemesterStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester is already ${currentSemesterStatus}`,
    )
  }

  // UPCOMING --> ONGOING --> ENDED
  if (
    currentSemesterStatus === RegistrationStatus.UPCOMING &&
    requestedStatus === RegistrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
    )
  }

  if (
    currentSemesterStatus === RegistrationStatus.ONGOING &&
    requestedStatus === RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
    )
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })

  return result
}

export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
}
