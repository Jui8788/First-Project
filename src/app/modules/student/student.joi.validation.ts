import Joi from 'joi'

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .required()
    .custom((value, helpers) => {
      const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1)
      if (firstNameStr !== value) {
        return helpers.message('{{#label}} must be capitalized')
      }
      return value
    }, 'Capitalization validation')
    .messages({
      'any.required': 'First name is required',
      'string.base': 'First name must be a string',
    }),
  middleName: Joi.string().trim().optional(),
  lastName: Joi.string()
    .trim()
    .required()
    .pattern(/^[a-zA-Z]+$/, 'alpha')
    .messages({
      'any.required': 'Last name is required',
      'string.base': 'Last name must be a string',
      'string.pattern.name': 'Last name is not a valid Last Name format',
    }),
})

// Guardian Schema
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().trim().required().messages({
    'any.required': 'Father name is required',
    'string.base': 'Father name must be a string',
  }),
  fatherOccupation: Joi.string().trim().required().messages({
    'any.required': 'Father occupation is required',
    'string.base': 'Father occupation must be a string',
  }),
  fatherContactNo: Joi.string().trim().required().messages({
    'any.required': 'Father contact number is required',
    'string.base': 'Father contact number must be a string',
  }),
  motherName: Joi.string().trim().required().messages({
    'any.required': 'Mother name is required',
    'string.base': 'Mother name must be a string',
  }),
  motherOccupation: Joi.string().trim().required().messages({
    'any.required': 'Mother occupation is required',
    'string.base': 'Mother occupation must be a string',
  }),
  motherContactNo: Joi.string().trim().required().messages({
    'any.required': 'Mother contact number is required',
    'string.base': 'Mother contact number must be a string',
  }),
})

// Local Guardian Schema
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'any.required': 'Local guardian name is required',
    'string.base': 'Local guardian name must be a string',
  }),
  occupation: Joi.string().trim().required().messages({
    'any.required': 'Local guardian occupation is required',
    'string.base': 'Local guardian occupation must be a string',
  }),
  contactNo: Joi.string().trim().required().messages({
    'any.required': 'Local guardian contact number is required',
    'string.base': 'Local guardian contact number must be a string',
  }),
  address: Joi.string().trim().required().messages({
    'any.required': 'Local guardian address is required',
    'string.base': 'Local guardian address must be a string',
  }),
})

// Student Schema
const studentJoiValidationSchema = Joi.object({
  id: Joi.string().trim().required().messages({
    'any.required': 'ID is required',
    'string.base': 'ID must be a string',
  }),
  name: userNameValidationSchema.required().messages({
    'any.required': 'Name is required',
  }),
  gender: Joi.string().valid('male', 'female').required().messages({
    'any.only': '{#value} is not a valid gender',
    'any.required': 'Gender is required',
  }),
  dateOfBirth: Joi.string().trim().optional(),
  email: Joi.string().trim().required().email().messages({
    'any.required': 'Email is required',
    'string.email': '{#value} is not a valid email',
  }),
  contactNo: Joi.string().trim().required().messages({
    'any.required': 'Contact number is required',
    'string.base': 'Contact number must be a string',
  }),
  emergencyContactNo: Joi.string().trim().required().messages({
    'any.required': 'Emergency contact number is required',
    'string.base': 'Emergency contact number must be a string',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .optional()
    .messages({
      'any.only': '{#value} is not a valid blood group',
    }),
  presentAddress: Joi.string().trim().required().messages({
    'any.required': 'Present address is required',
    'string.base': 'Present address must be a string',
  }),
  permanentAddress: Joi.string().trim().required().messages({
    'any.required': 'Permanent address is required',
    'string.base': 'Permanent address must be a string',
  }),
  guardian: guardianValidationSchema.required().messages({
    'any.required': 'Guardian information is required',
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    'any.required': 'Local guardian information is required',
  }),
  profileImg: Joi.string().trim().optional(),
  isActive: Joi.string().valid('active', 'blocked').default('active').messages({
    'any.only': '{#value} is not a valid status',
  }),
})

export default studentJoiValidationSchema
