import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import bcrypt from 'bcrypt'
import { User } from '../user/user.model'
import { TLoginUser } from './auth.interface'

const loginUser = async (payload: TLoginUser) => {
  // checking if the user exists
  const isUserExists = await User.findOne({ id: payload?.id })

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found')
  }

  //   checking it the user is already deleted
  const isDeleted = isUserExists?.isDeleted

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted')
  }

  //   checking if the user is blocked
  const userStatus = isUserExists?.status

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked')
  }

  //   checking if the password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    isUserExists?.password,
  )
}

export const AuthServices = {
  loginUser,
}
