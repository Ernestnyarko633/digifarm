// configs
import configs from '../utils/configs'

export const replaceURI = (APP, path) => window.location.replace(configs()[`${APP}_SERVICE`] + path)

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
    style   : 'currency',
    currency: 'USD'
  }).format(number)
  return !withCurrecy ? newFMondy.split('$')[1] : newFMondy
}