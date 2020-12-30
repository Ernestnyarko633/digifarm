import { isEmpty, isEqual, xorWith } from 'lodash'
// configs
import configs from 'utils/configs'

export const replaceURI = (APP, path) =>
  window.location.replace(configs()[`${APP}_SERVICE`] + path)

export const isArrayEqual = (arr1, arr2) => isEmpty(xorWith(arr1, arr2, isEqual))

export const getFormattedMoney = (val, withCurrecy) => {
  let number = val
  if (Number.isNaN(val)) {
    number = 0
  }

  const newFMondy = new Intl.NumberFormat('en-US', {
    style   : 'currency',
    currency: 'USD'
  }).format(number)

  return !withCurrecy ? newFMondy.split('$')[1] : newFMondy
}

export const getformattedDate = date => {
  return new Date(date).toLocaleDateString('en-GB', {
    day  : 'numeric',
    month: 'short',
    year : 'numeric'
  })
}
