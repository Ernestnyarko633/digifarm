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
  oldPassword: Yup.string().required('Old password is required!'),
  newPassword: Yup.string().required('New password is Required!')
})
