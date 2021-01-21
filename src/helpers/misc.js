// configs
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

export const getFormattedMoney = (val, withCurrecy) => {
  let number = val
  if (Number.isNaN(val)) {
    number = 0
  }
  const newFMondy = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(number)
  return !withCurrecy ? newFMondy.split('$')[1] : newFMondy
}

export const getformattedDate = date => {
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
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
