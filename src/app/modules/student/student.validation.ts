import { z } from 'zod'

// UserName Schema
const userNameValidationSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required'),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().min(1, 'Last name is required'),
})

// Guardian Schema
const guardianValidationSchema = z.object({
  fatherName: z.string().trim().min(1, 'Father name is required'),
  fatherOccupation: z.string().trim().min(1, 'Father occupation is required'),
  fatherContactNo: z
    .string()
    .trim()
    .min(1, 'Father contact number is required'),
  motherName: z.string().trim().min(1, 'Mother name is required'),
  motherOccupation: z.string().trim().min(1, 'Mother occupation is required'),
  motherContactNo: z
    .string()
    .trim()
    .min(1, 'Mother contact number is required'),
})

// Local Guardian Schema
const localGuardianValidationSchema = z.object({
  name: z.string().trim().min(1, 'Local guardian name is required'),
  occupation: z.string().trim().min(1, 'Local guardian occupation is required'),
  contactNo: z
    .string()
    .trim()
    .min(1, 'Local guardian contact number is required'),
  address: z.string().trim().min(1, 'Local guardian address is required'),
})

// Student Schema
const studentValidationSchema = z.object({
  id: z.string().trim().min(1, 'ID is required'),
  password: z.string().trim().max(20, 'password is required'),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female'], {
    errorMap: (issue, _ctx) => {
      if (issue.code === 'invalid_enum_value') {
        return { message: `${issue.received} is not a valid gender` }
      }
      return { message: 'Gender is required' }
    },
  }),
  dateOfBirth: z.string().trim().optional(),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email({ message: 'Email is not valid' }),
  contactNo: z.string().trim().min(1, 'Contact number is required'),
  emergencyContactNo: z
    .string()
    .trim()
    .min(1, 'Emergency contact number is required'),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  presentAddress: z.string().trim().min(1, 'Present address is required'),
  permanentAddress: z.string().trim().min(1, 'Permanent address is required'),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().trim().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean().default(false),
})

export default studentValidationSchema
