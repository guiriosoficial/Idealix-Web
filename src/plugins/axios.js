import axios from 'axios'

const LOGGED_USER = JSON.parse(localStorage.getItem('iDealixLoggedPerson'))

if (LOGGED_USER?.token) {
  axios.defaults.headers.common['Authorization'] = LOGGED_USER.token
}

const config = {
  baseURL: 'http://localhost:4000',
  timeout: 60 * 1000,
}

const _axios = axios.create(config)

_axios.CancelToken = axios.CancelToken
_axios.isCancel = axios.isCancel

_axios.interceptors.request.use(
  config => {
    const loggedUser = JSON.parse(localStorage.getItem('iDealixLoggedPerson'))
    if (loggedUser?.token) {
      config.headers.Authorization = loggedUser.token
    }
    return config
  },
  error => Promise.reject(error)
)

_axios.interceptors.response.use(
  response => {
    if (
      response.status === 204 &&
      response.config &&
      !response.config.__isRetryRequest
    ) {
      response.config.__isRetryRequest = true
      setTimeout(() => axios(response.config), 2000)
    }
    return response
  },
  error => {
    if (error.response?.status === 401) {
      // router será injetado
      if (_axios._router) {
        _axios._router.push('/login')
      }
    }
    return Promise.reject(error)
  }
)

export const api = _axios

export default {
  install(app, { router }) {
    // guarda referência do router
    _axios._router = router

    app.config.globalProperties.$axios = _axios
    app.config.globalProperties.axios = _axios

    window.axios = _axios
  }
}
