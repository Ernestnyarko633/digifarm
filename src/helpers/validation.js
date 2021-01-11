import * as Yup from 'yup'

// const fileValidation = (size, type) =>
//   Yup.mixed()
//     .required('No file selected!')
//     .test(
//       'fileSize',
//       `File Size is too large <= ${size}mb allowed!`,
//       value => value && value.size <= 1024 * 1024 * size
//     )
//     .test(
//       'fileType',
//       'Unsupported File Format',
//       value => value && type.includes(value.type)
//     )

export const ChangePassword = Yup.object().shape({
  newPassword: Yup.string()
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
      message:
        ' Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character'
    })
    .required('Password is Required!')
})
