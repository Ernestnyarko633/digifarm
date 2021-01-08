/**
 * Method to return backend services urls based on the environment
 * */
const config = () => {
  // Get REACT ENV
  const ENV = process.env.REACT_APP_ENVIRONMENT

  return {
    BUYER_API    : process.env[`REACT_APP_${ENV}_BUYER_API`],
    OPERATION_API: process.env[`REACT_APP_${ENV}_OPERATION_API`],
    FMS_API      : process.env[`REACT_APP_${ENV}_FMS_API`],
    AUTH_API     : process.env[`REACT_APP_${ENV}_AUTH_API`],
    AUTH_SERVICE : process.env[`REACT_APP_${ENV}_AUTH_SERVICE`],
    PAYMENT_API  : process.env[`REACT_APP_${ENV}_PAYMENT_API`],
    PRISMIC_API  : process.env.REACT_APP_API_ENDPOINT,
    PRISMIC_KEY  : process.env.REACT_APP_ACCESS_TOKEN 
    // NOTIFICATION_API: process.env[`REACT_APP_${ENV}_NOTIFICATION_API`],
    // LOGISTICS_API: process.env[`REACT_APP_${ENV}_LOGISTICS`],
    // JET_AUTH_API: process.env[`REACT_APP_${ENV}_JET_AUTH`],
    // USER_API: process.env[`REACT_APP_${ENV}_USER`],
    // PASSWORD_API: process.env[`REACT_APP_${ENV}_PASSWORD`]
  }
}

export default config
