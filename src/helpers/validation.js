/* eslint-disable no-console */
import * as Yup from 'yup'
import validator from 'validator'

const fileValidation = (size, allowed) =>
  Yup.mixed()
    .required('No file selected!')
    .test(
      'fileSize',
      `File Size is too large <= ${size}mb allowed!`,
      value => value && value.size <= 1024 * 1024 * size
    )
    .test(
      'fileType',
      'Unsupported File Format',
      value => value && allowed.includes(value.type)
    )

export const ChangePassword = Yup.object().shape({
  oldPassword: Yup.string().required('This field is required*'),
  newPassword: Yup.string().required('This field is required*')
})

export const TextFormSchema = Yup.object().shape({
  text: Yup.string()
    .required('This field is required*')
    .min(5, 'Text should at least be 5 characters long!')
    .max(30, 'Text should at most be 30 characters long!')
})

export const FileFormSchema = Yup.object().shape({
  file: fileValidation(2, ['image/jpg', 'image/jpeg', 'image/png'])
})

export const PersonalInfoSchema = Yup.object().shape({
  firstName: Yup.string().required('This field is required*'),
  lastName: Yup.string().required('This field is required*'),
  dateOfBirth: Yup.date().required('This field is required*'),
  email: Yup.string()
    .email('Invalid email!')
    .required('This field is required*'),
  phoneNumber: Yup.string()
    .test(
      'valid',
      'Invalid phone number, exclude country code!',
      value =>
        value && validator.isMobilePhone(value, 'any', { strictMode: true })
    )
    .required('Phone number is required!'),
  address: Yup.object({
    state: Yup.string().required('This field is required*'),
    street: Yup.string().required('This field is required*'),
    country: Yup.string().required('This field is required*')
  })
})

export const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required('This field is required*'),
  lastName: Yup.string().required('This field is required*'),
  email: Yup.string()
    .email('Invalid email!')
    .required('This field is required*'),
  country: Yup.string().required('This field is required*'),
  phoneNumber: Yup.string()
    .test(
      'valid',
      'Invalid phone number, exclude country code!',
      value =>
        value && validator.isMobilePhone(value, 'any', { strictMode: true })
    )
    .required('This field is required*'),
  role: Yup.string().required('This field is required*'),
  password: Yup.string()
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
      message:
        'Minimum 8 characters, at least an uppercase, lowercase, number and special character*'
    })
    .required('This field is required*'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords do not match*')
    .required('This field is required*')
})

export const ConfirmPassword = Yup.object().shape({
  password: Yup.string().required('This field is required')
})

export const ReviewForm = Yup.object().shape({
  comment: Yup.string(),
  ratings: Yup.number().required()
})

export const BankDetailsSchema = Yup.object()
  .shape({
    bankName: Yup.string().required('This field is required*'),
    bankBranch: Yup.string().required('This field is required*'),
    branchCountry: Yup.string().required('This field is required*'),
    currency: Yup.string().required('This field is required*'),
    swiftCode: Yup.string().required('This field is required*'),
    accountName: Yup.string().required('This field is required*'),
    accountNumber: Yup.number().test(
      'atLeastOneShouldBeProvided',
      'at least one of accountNumber or iban should be provided',
      function (value) {
        const { iban } = this.parent
        if (!value && !iban) {
          return false
        }

        return true
      }
    ),
    branchAddress: Yup.string().required('This field is required*'),
    iban: Yup.string().test(
      'atLeastOneShouldBeProvided',
      'at least one of accountNumber or iban should be provided',
      function (value) {
        const { accountNumber } = this.parent
        if (!value && !accountNumber) {
          return false
        }

        return true
      }
    ),
    sortCode: Yup.string().required('This field is required*'),
    homeAddress: Yup.string().required('This field is required*')
  })
  .test(
    'atLeastOneShouldBeProvided',
    'at least one of accountNumber or iban should be provided',
    function (value) {
      const { iban, accountNumber } = value

      if (!iban && !accountNumber) {
        return false
      }

      return true
    }
  )

Yup.addMethod(Yup.array, 'unique', function (message, path) {
  return this.test('unique', message, function (list) {
    const mapper = x => x.email
    const set = [...new Set(list.map(mapper))]
    const isUnique = list.length === set.length
    if (isUnique) {
      return true
    }
    const idx = list.findIndex((l, i) => mapper(l) !== set[i])
    return this.createError({
      path: `users[${idx}].email`,
      message: message
    })
  })
})
export const CooperativeSchema = Yup.object().shape({
  users: Yup.array()
    .of(
      Yup.object().shape({
        email: Yup.string(),
        acreage: Yup.string().required('Acreage is required')
      })
    )
    .unique('Email must be unique', a => a.email)
    .required('Email and acreage is  required*')
})

BankDetailsSchema.isValidSync({ iban: 9 }) // false
BankDetailsSchema.isValidSync({ accountNumber: 7, iban: 9 })
