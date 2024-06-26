/* eslint-disable no-unused-vars */

// export type TUser = {
//   id: string
//   password: string
//   needsPasswordChange: boolean
//   role: 'admin' | 'student' | 'faculty'
//   status: 'in-progress' | 'blocked'
//   isDeleted: boolean
// }

import { Model } from 'mongoose'
import { USER_ROLE } from './user.constant'

export interface TUser {
  id: string
  email: string
  password: string
  needsPasswordChange: boolean
  passwordChangedAt?: Date
  role: 'admin' | 'student' | 'faculty'
  status: 'in-progress' | 'blocked'
  isDeleted: boolean
}

export interface UserModel extends Model<TUser> {
  isUserExistsByCustomId(id: string): Promise<TUser>
  isUserDeletedByCustomId(id: string): Promise<boolean | null>
  getUserStatusByCustomId(id: string): Promise<'in-progress' | 'blocked' | null>

  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>

  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean
}

export type TUserRole = keyof typeof USER_ROLE
