/* eslint-disable space-before-function-paren */
import axios from 'axios';
import QueryString from 'query-string';
import isEmpty from 'lodash/isEmpty';

const http = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use(
  function (config) {
    // TODO: Delete Token at all cost.
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWZmNGNjYjAzZTEyOTAwMTI4NzQxMmYiLCJlbWFpbCI6ImdhYnNjbzIwODMwOUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRETEplaDd0SGFrSlpEOWFlQ0pvT3FPYzFTYk1DaFdlTnRiUkQ0dkpUYkFPaGkuR0pHMGlxVyIsImlhdCI6MTYwMzk4MjY0MywiZXhwIjoxNjA2NTc0NjQzfQ.f6haex2BPUDJI5X6RIOCpaXCJrn3EZSXm6UXdpzUV50';
    // const token = JSON.parse(
    //   window.sessionStorage.getItem('_cft') || window.localStorage.getItem('_cft')
    // )
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error.response);
  }
);

const HttpFacade = () => ({
  post: function post(options) {
    const { url, body } = options;
    return http.post(url, body).then((response) => response.data);
  },

  patch: function patch(options) {
    const { url, body } = options;
    return http.patch(url, body).then((response) => response.data);
  },

  get: function get(options) {
    const { url, query } = options;
    let _url = null;
    if (!isEmpty(query)) {
      const queryString = QueryString.stringify(query);
      _url = `${url}?${queryString}`;
    } else {
      _url = `${url}`;
    }
    return http.get(_url).then((response) => response.data);
  },

  delete: function deleteData(options) {
    const { url } = options;
    return http.delete(url).then((response) => response.data);
  },

  put: function put(options) {
    const { url, body } = options;
    return http.put(url, body).then((response) => response.data);
  },
});

export default HttpFacade();
