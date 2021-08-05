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

export const trimFirstSpaceCharacter = str => {
  if (!str) return str
  return str.replace(/^\s+/g, '')
}

export const isMobile = () => {
  let check = false
  ;(function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true
  })(navigator.userAgent || navigator.vendor || window.opera)
  return check
}

export const validateEmailAndAcrege = (email, acreage) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return (
    re.test(String(email).toLowerCase()) &&
    (typeof acreage === 'number' ? true : false) &&
    acreage > 0
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
  const process = () =>
    data?.forEach(realFeed => array?.push(realFeed?.feed?.updatedAt))

  process()

  if (array?.length)
    return new Date(Math.max(...array?.map(date => new Date(date))))
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
    '<a href="$1" className="farm-board" class="farm-board" style={{color: "cf.400"}} target="_blank">$1</a>'
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

export const embed_url = (text, url) => {
  return `<a href=${url} className="farm-board" class="farm-board" style={{color: "cf.400"}} target="_blank">${text}</a>`
}

export const shuffle = (arr, count, key) => {
  let random = []
  let i = 0

  if (arr?.length < count) return arr

  while (i < count) {
    let index = Math.floor(Math.random() * arr?.length)
    const newItem = arr?.[index]
    let check = null
    if (key) {
      check = random.find(item => newItem?.[key] === item?.[key])
    } else {
      check = random.find(item => newItem === item)
    }
    if (!check) {
      random.push(newItem)
      i++
    }
  }
  return random
}

export const Status = {
  COMPLETED: 'COMPLETED',
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  IN_PROGRESS: 'IN_PROGRESS',
  INACTIVE: 'INACTIVE',
  PROCESSING: 'PROCESSING'
}
