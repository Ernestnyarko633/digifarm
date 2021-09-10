/**
 * Method to return backend services urls based on the environment
 * */

const configs = () => {
  // Get REACT ENV
  const ENV = process.env.REACT_APP_ENVIRONMENT

  return {
    AUTH_API: process.env[`REACT_APP_${ENV}_AUTH_API`],
    AUTH_SERVICE: process.env[`REACT_APP_${ENV}_AUTH_SERVICE`],
    DIGITAL_FARMER_API: process.env[`REACT_APP_${ENV}_DIGITAL_FARMER_API`],
    BUYER_API: process.env[`REACT_APP_${ENV}_BUYER_API`],
    NOTIFICATION_API: process.env[`REACT_APP_${ENV}_NOTIFICATION_API`],
    SOCKET_NOTIFICATION_API:
      process.env[`REACT_APP_${ENV}_SOCKET_NOTIFICATION_API`],
    FMS_API: process.env[`REACT_APP_${ENV}_FMS_API`],
    PAYMENT_API: process.env[`REACT_APP_${ENV}_PAYMENT_API`],
    ZENDESK_KEY: process.env.REACT_APP_ZENDESK_KEY,
    ESCROW_SELLER_ID: process.env[`REACT_APP_${ENV}_ESCROW_SELLER_ID`],
    EXCHANGE_RATE_API: process.env[`REACT_APP_${ENV}_EXCHANGE_RATE_API`],
    EXCHANGE_RATE_API_KEY:
      process.env[`REACT_APP_${ENV}_EXCHANGE_RATE_API_KEY`],
    MAPBOX_API: process.env.REACT_APP_MAPBOX_API,
    EOS_API_KEY: process.env.REACT_APP_EOS_API_KEY,
    EOS_API: process.env.REACT_APP_EOS_API,
    PRISMIC_API: process.env.REACT_APP_PRISMIC_API,
    PRISMIC_ACCESS_TOKEN: process.env.REACT_APP_PRISMIC_ACCESS_TOKEN,
    REDIS_HOST: process.env[`REACT_APP_${ENV}_REDIS_HOST`],
    REDIS_PASS: process.env.REACT_APP_REDIS_PASS,
    REDIS_PORT: process.env[`REACT_APP_${ENV}_REDIS_PORT`]
  }
}

export default configs
