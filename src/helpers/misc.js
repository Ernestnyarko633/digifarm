// configs
/*eslint-disable */
import configs from '../utils/configs'
import redis from 'redis'

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

export const dateIntervals = () => {
  // today's date
  let today = new Date()

  // 30 days ago date
  let ThirtyDaysAgo = new Date(new Date().setDate(new Date().getDate() - 30))

  let SixtyDaysAgo = new Date(new Date().setDate(new Date().getDate() - 60))

  let dd = today.getDate()
  let _dd = ThirtyDaysAgo.getDate()
  let __dd = SixtyDaysAgo.getDate()

  let mm = today.getMonth() + 1
  let _mm = ThirtyDaysAgo.getMonth() + 1
  let __mm = SixtyDaysAgo.getMonth() + 1

  let yyyy = today.getFullYear()
  let _yyyy = ThirtyDaysAgo.getFullYear()
  let __yyyy = SixtyDaysAgo.getFullYear()  


  if (dd < 10) {
    dd = '0' + dd
    
  }
  if(_dd < 10){
    _dd = '0' + _dd
  }
  if(__dd < 10){
    __dd = '0' + __dd
  }

  if (mm < 10 ) {
    mm = '0' + mm
   
  }
  if(_mm < 10){
    _mm = '0' + _mm
  }
  if(__mm < 10){
    __mm = '0' + __mm
  }

  today = yyyy + '-' + mm + '-' + dd
  ThirtyDaysAgo = _yyyy + '-' + _mm + '-' + _dd
  SixtyDaysAgo = __yyyy + '-' + __mm + '-' + __dd


  return { today: today, ThirtyDaysAgo: ThirtyDaysAgo, SixtyDaysAgo: SixtyDaysAgo  }
}
