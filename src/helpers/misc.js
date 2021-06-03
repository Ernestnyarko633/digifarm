/* eslint-disable no-console */
/* eslint-disable no-useless-escape */
import _ from 'lodash'
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

export const validateEmailAndAcrege = (email, acreage) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return (
    re.test(String(email).toLowerCase()) &&
    (typeof acreage === 'number' ? true : false)
  )
}

export const checkProperties = obj => {
  for (var key in obj) {
    if (obj[key] === null || obj[key] === undefined) {
      return false
    }
  }
  return true
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
export const latestDateForFarmFeed = feed => {
  const { data } = feed

  let array = []
  data.forEach(realFeed => array.push(realFeed?.feed?.updatedAt))

  if (array.length)
    return new Date(Math.max(...array.map(date => new Date(date))))
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
  if (_dd < 10) {
    _dd = '0' + _dd
  }
  if (__dd < 10) {
    __dd = '0' + __dd
  }

  if (mm < 10) {
    mm = '0' + mm
  }
  if (_mm < 10) {
    _mm = '0' + _mm
  }
  if (__mm < 10) {
    __mm = '0' + __mm
  }

  today = yyyy + '-' + mm + '-' + dd
  ThirtyDaysAgo = _yyyy + '-' + _mm + '-' + _dd
  SixtyDaysAgo = __yyyy + '-' + __mm + '-' + __dd

  return {
    today: today,
    ThirtyDaysAgo: ThirtyDaysAgo,
    SixtyDaysAgo: SixtyDaysAgo
  }
}

export const texTrancator = (length, string) => {
  let tT = string.substring(0, length)
  return tT
}

export const FirstLettersToUpperCase = (value = '') => {
  const string = value.split(' ')

  let newString = []
  string.forEach(item => {
    newString.push(item.charAt(0).toUpperCase() + item.toLowerCase().slice(1))
  })

  return newString.join().replace(/,/g, ' ')
}

export const getDiscount = (discounts, acreage) => {
  // get discounts user may qualify for
  const _discounts = discounts?.filter(({ point }) => point <= acreage)
  // get highest discount user qualified for
  if (_discounts?.length) {
    const discountQualifiedFor = _discounts.reduce((a, b) =>
      a.point > b.point ? a : b
    ).percent

    return `${100 - 100 * (1 - discountQualifiedFor)}% off`
  }
  return null
}

export const isDateG8Today = date => {
  const today = new Date().setHours(0, 0, 0, 0)
  const start = new Date(date).setHours(0, 0, 0, 0)

  return today > start
}

export const objDiff = (object, base) => {
  function changes(object, base) {
    return _.transform(object, (result, value, key) => {
      if (!_.isEqual(value, base[key])) {
        result[key] =
          _.isObject(value) && _.isObject(base[key])
            ? changes(value, base[key])
            : value
      }
    })
  }
  return changes(object, base)
}

export const urlify = text => {
  var exp =
    /(\b(((https?|ftp|file|):\/\/)|www[.])[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi
  var temp = text?.replace(
    exp,
    '<a href="$1" style={{color: "cf.400"}} target="_blank">$1</a>'
  )
  var result = ''

  while (temp?.length > 0) {
    var pos = temp?.indexOf('href="')
    if (pos === -1) {
      result += temp
      break
    }
    result += temp?.substring(0, pos + 6)

    temp = temp?.substring(pos + 6, temp?.length)
    if (temp?.indexOf('://') > 8 || temp?.indexOf('://') === -1) {
      result += 'http://'
    }
  }

  return result
}

export const Status = {
  COMPLETED: 'COMPLETED',
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  IN_PROGRESS: 'IN_PROGRESS',
  INACTIVE: 'INACTIVE',
  PROCESSING: 'PROCESSING'
}
