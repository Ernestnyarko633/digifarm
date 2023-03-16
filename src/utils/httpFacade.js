import axios from 'axios'
import QueryString from 'query-string'

// Define the maximum number of retries
const MAX_RETRIES = 3

// Define the delay between retries in milliseconds
const RETRY_DELAY = 5000
class HttpFacade {
  constructor() {
    this.http = axios.create({
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.http.defaults.withCredentials = true

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

    this.http.interceptors.response.use(
      response => response,
      async error => {
        const isUnauthorized = error?.response?.status === 401
        const isForbidden = error?.response.status === 403

        const retries = error.config.retries || 0
        // If the error is a 429 error
        if (isUnauthorized && retries < MAX_RETRIES) {
          // Get the number of retries so far

          // If we haven't reached the maximum number of retries
          // Wait for the specified delay

          // eslint-disable-next-line no-promise-executor-return
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY))

          // Clone the request config to prevent modifying the original request
          const config = {
            ...(error.config || {})
          }

          // Increment the number of retries
          config.retries = retries + 1

          // Retry the request
          return this.http(config)
        }
        if (isUnauthorized || isForbidden) {
          window.location.href = '/logout'
        }
        return Promise.reject(error.response)
      }
    )
  }

  post = async ({ url, body }) => {
    const response = await this.http.post(url, body)
    return response.data
  }

  patch = async ({ url, body }) => {
    const response = await this.http.patch(url, body)
    return response.data
  }

  get = async ({ url, query }) => {
    const queryString = QueryString.stringify(query)
    const response = await this.http.get(`${url}?${queryString}`)
    return response.data
  }

  delete = async ({ url }) => {
    const response = await this.http.delete(url)
    return response.data
  }

  put = async ({ url, body }) => {
    const response = await this.http.put(url, body)
    return response.data
  }

  headers = headers => {
    this.http.defaults.headers = headers
    return this
  }
}

export default new HttpFacade()
