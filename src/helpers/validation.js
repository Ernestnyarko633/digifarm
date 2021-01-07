import * as Yup from 'yup'

const fileValidation = (size, type) =>
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
      value => value && type.includes(value.type)
    )

export const OnboardingSchema = Yup.object().shape({
  businessInfo: Yup.object().shape({
    name: Yup.string().required('Name is required.'),
    primary: Yup.string().required('Primary Business is required.'),
    products: Yup.array()
      .of(Yup.string())
      .min(1)
      .required('Buyer Product(s) is required.'),
    employeeCount: Yup.string().required('No of Employees is required.'),
    description: Yup.string().required('Description is required.'),
    established: Yup.string().required('Date of establishment is required.'),
    tradeServices: Yup.array()
      .of(Yup.string())
      .min(1)
      .required('Trade Service(s) is required.'),
    thirdPartyRef: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required('Third party reference name is required.'),
        email: Yup.string()
          .email('Invalid email address provided')
          .required('Third party reference email is required.')
      })
    ),
    certificates: Yup.array()
      .of(Yup.string())
      .min(1)
      .required('Certificate(s) is required.'),
    association: Yup.string().required('Association is required.'),
    approxAnnualSales: Yup.string().required(
      'Approx annual sales is required.'
    ),
    blogPost: Yup.string().required('Blog Post is required.'),
    socialMedia: Yup.array()
      .of(Yup.string())
      .min(1)
      .required('Social Media handle(s) is required.'),
    website: Yup.string().required('Website is required.')
  }),
  businessContact: Yup.object().shape({
    firstName: Yup.string().required('First name is required.'),
    lastName: Yup.string().required('Last name is required.'),
    email: Yup.string()
      .email('Invalid email address provided')
      .required('Email is required.'),
    phoneNumber: Yup.string().required('Phone number is required.'),
    address: Yup.object().shape({
      postalCode: Yup.string().required('Postal code is required.'),
      street: Yup.string().required('Street is required.'),
      state: Yup.string().required('State is required.'),
      country: Yup.string().required('Country is required.')
    })
  }),
  logo: fileValidation(2, ['image/jpg', 'image/jpeg', 'image/png']),
  certificate: fileValidation(20, ['application/pdf']),
  audit: fileValidation(20, ['application/pdf']),
  brochure: fileValidation(20, ['application/pdf'])
})

export const BusinessInfoSchema = Yup.object().shape({
  name: Yup.string().required('Name is required.'),
  primary: Yup.string().required('Primary Business is required.'),
  products: Yup.array()
    .of(Yup.string())
    .min(1)
    .required('Buyer Product(s) is required.'),
  employeeCount: Yup.string().required('No of Employees is required.'),
  description: Yup.string().required('Description is required.'),
  established: Yup.string().required('Date of establishment is required.'),
  tradeServices: Yup.array()
    .of(Yup.string())
    .min(1)
    .required('Trade Service(s) is required.'),
  thirdPartyRef: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Third party reference name is required.'),
      email: Yup.string()
        .email('Invalid email address provided')
        .required('Third party reference email is required.')
    })
  ),
  certificates: Yup.array()
    .of(Yup.string())
    .min(1)
    .required('Certificate(s) is required.'),
  association: Yup.string().required('Association is required.'),
  approxAnnualSales: Yup.string().required('Approx annual sales is required.'),
  blogPost: Yup.string().required('Blog Post is required.'),
  socialMedia: Yup.array()
    .of(Yup.string())
    .min(1)
    .required('Social Media handle(s) is required.'),
  website: Yup.string().required('Website is required.')
})

export const BusinessContactSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required.'),
  lastName: Yup.string().required('Last name is required.'),
  email: Yup.string()
    .email('Invalid email address provided')
    .required('Email is required.'),
  phoneNumber: Yup.string().required('Phone number is required.'),
  address: Yup.object().shape({
    postalCode: Yup.string().required('Postal code is required.'),
    street: Yup.string().required('Street is required.'),
    state: Yup.string().required('State is required.'),
    country: Yup.string().required('Country is required.')
  })
})

export const BusinessDocSchema = Yup.object().shape({
  logo: fileValidation(1, ['image/jpg', 'image/jpeg', 'image/png']),
  seal: fileValidation(1, ['image/png']),
  signature: fileValidation(1, ['image/jpg', 'image/jpeg', 'image/png']),
  certificate: fileValidation(10, ['application/pdf']),
  audit: fileValidation(10, ['application/pdf']),
  brochure: fileValidation(10, ['application/pdf'])
})
