// configs
/*eslint-disable */
import configs from '../utils/configs'

export const replaceURI = (APP, path) =>
  window.location.replace(configs()[`${APP}_SERVICE`] + path)

export const fileToBase64 = async file => {
  return new Promise((resolve, reject) => {
    const reader = new window.FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = e => reject(e)
  })
}

export const getFormattedMoney = val => {
  let number = val
  if (Number.isNaN(val)) {
    number = 0
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })
    .format(number)
    .split('$')[1]
}

export const getformattedDate = (
  date,
  options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }
) => {
  return new Date(date).toLocaleDateString('en-GB', options)
}
export const getRedisClusterClient = () => {
  const redis = require('redis')
  const ENV = process.env.REACT_APP_ENVIRONMENT
  const { REDIS_HOST, REDIS_PORT, REDIS_PASS } = configs()
  try {
    let client = null
    client = redis.createClient(REDIS_PORT, REDIS_HOST)
    if (ENV !== 'PROD') {
      client.auth(REDIS_PASS, err => {
        if (err) {
          throw err
        }
      })
    }
    client.on('connect', () => {
      console.log(`Connected to redis on ${REDIS_HOST}`)
    })
    return client
  } catch (error) {
    console.log(error, "redis")
  }
}

export const getCurrentDayParting = () => {
  const splitAfternoon = 12 // 24hr time to split the afternoon
  const splitEvening = 17 // 24hr time to split the evening
  const currentHour = parseFloat(new Date().getHours())

  if (currentHour >= splitAfternoon && currentHour <= splitEvening) {
    // Between 12 PM and 5PM
    return { message: 'Good Afternoon', skyColor: '#FEEEC2' }
  } else if (currentHour >= splitEvening) {
    // Between 5PM and Midnight
    return { message: 'Good Evening', skyColor: '#0B1026', textColor: 'white' }
  }
  return { message: 'Good Morning', skyColor: '#D7E8FD' }
}
