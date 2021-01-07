/**
 * Method to return backend services urls based on the environment
 * */
const getConfig = () => {
  // Get REACT ENV
  const ENV = process.env.REACT_APP_ENVIRONMENT

  return {
    AUTH_API: process.env[`REACT_APP_${ENV}_AUTH_API`],
    AUTH_SERVICE: process.env[`REACT_APP_${ENV}_AUTH_SERVICE`],
    DIGITAL_FARMER_API: process.env[`REACT_APP_${ENV}_DIGITAL_FARMER_API`],
    BUYER_API: process.env[`REACT_APP_${ENV}_BUYER_API`],
    NOTIFICATION_API: process.env[`REACT_APP_${ENV}_NOTIFICATION_API`],
    FMS_API: process.env[`REACT_APP_${ENV}_FMS_API`],
    PAYMENT_API: process.env[`REACT_APP_${ENV}_PAYMENT_API`],
    MAPBOX_API: process.env[`REACT_APP_${ENV}_MAPBOX_API`],
    PRISMIC_API: process.env[`REACT_APP_${ENV}_PRISMIC_API`],
    PRISMIC_ACCESS_TOKEN: process.env[`REACT_APP_${ENV}_PRISMIC_ACCESS_TOKEN`]
  }
}

export default getConfig
