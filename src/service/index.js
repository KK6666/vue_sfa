import axios from 'axios'

// 登录完成后的所有的请求必须在 请求的headers中添加token
// 通过axios的拦截器，在请求前拦截添加token
let axiosInt = axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    let loginToken = sessionStorage.getItem('LoginToken')
    if (loginToken) {
      config.headers.Authorization = 'Bearer ' + loginToken
    }
    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

export default {
  login(data) {
    return axios.post('/api/login', data)
  },
  logout() {
    axios.interceptors.request.eject(axiosInt)
  },
  getUserProgress() {
    return axios.get('/api/getUserProgress')
  },
  getNotice(date, limit, isloadelater) {
    return axios.get('/api/message', {
      params: {
        date,
        limit,
        isloadelater
      }
    })
  }
}
