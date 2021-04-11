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

export const TextFormSchema = Yup.object().shape({
  text: Yup.string()
    .required('Field is required!')
    .min(5, 'Text should at least be 5 characters long!')
    .max(30, 'Text should at most be 30 characters long!')
})

export const FileFormSchema = Yup.object().shape({
  file: Yup.mixed()
    .required('No image file selected!')
    .test(
      'fileSize',
      'File Size is too large',
      value => value && value.size <= 1024 * 1024 * 1
    )
    .test(
      'fileType',
      'Unsupported File Format',
      value =>
        value && ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type)
    )
})
