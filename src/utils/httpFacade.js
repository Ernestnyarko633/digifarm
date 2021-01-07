import axios from 'axios'
import QueryString from 'query-string'
import isEmpty from 'lodash/isEmpty'

class HttpFacade {
  constructor() {
    this.http = axios.create({
      headers: { 'Content-Type': 'application/json' }
    })

    this.http.interceptors.request.use(
      function (config) {
        const token = window.sessionStorage.getItem('_cft')
        if (token) config.headers.Authorization = 'Bearer ' + token
        return config
      },
      function (error) {
        return Promise.reject(error)
      }
    )

    this.http.interceptors.response.use(
      function (response) {
        return response
      },
      function (error) {
        return Promise.reject(error.response)
      }
    )
  }

  post = async options => {
    const { url, body } = options
    const response = await this.http.post(url, body)
    return response.data
  }

  patch = async options => {
    const { url, body } = options
    const response = await this.http.patch(url, body)
    return response.data
  }

  get = async options => {
    const { url, query } = options
    let _url = null
    if (!isEmpty(query)) {
      const queryString = QueryString.stringify(query)
      _url = `${url}?${queryString}`
    } else {
      _url = `${url}`
    }
    const response = await this.http.get(_url)
    return response.data
  }

  delete = async options => {
    const { url } = options
    const response = await this.http.delete(url)
    return response.data
  }

  put = async options => {
    const { url, body } = options
    const response = await this.http.put(url, body)
    return response.data
  }

  headers = headers => {
    this.http.defaults.headers = headers
    return this
  }
}

export default HttpFacade
