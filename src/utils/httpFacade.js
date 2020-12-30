/* eslint-disable space-before-function-paren */
import axios from 'axios';
import QueryString from 'query-string';
import isEmpty from 'lodash/isEmpty';

const http = axios.create({
  headers: { 'Content-Type': 'application/json' },
});

http.interceptors.request.use(
  function (config) {
    const token = window.sessionStorage.getItem('_cft');
    if (token) config.headers.Authorization = 'Bearer ' + token;
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
    return Promise.reject(error);
  }
);

const HttpFacade = () => {
  return {
    post: async (options) => {
      const { url, body } = options;
      const response = await http.post(url, body);
      return response.data;
    },

    patch: async (options) => {
      const { url, body } = options;
      const response = await http.patch(url, body);
      return response.data;
    },

    get: async (options) => {
      const { url, query } = options;
      let _url = null;
      if (!isEmpty(query)) {
        const queryString = QueryString.stringify(query);
        _url = `${url}?${queryString}`;
      } else {
        _url = `${url}`;
      }
      const response = await http.get(_url);
      return response.data;
    },

    delete: async (options) => {
      const { url } = options;
      const response = await http.delete(url);
      return response.data;
    },

    put: async (options) => {
      const { url, body } = options;
      const response = await http.put(url, body);
      return response.data;
    },

    token: (token) => {
      http.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      });
      return HttpFacade();
    },
  };
};

export default HttpFacade();
