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
  // 登录
  login(data) {
    return axios.post('/api/login', data)
  },
  // 退出
  logout() {
    axios.interceptors.request.eject(axiosInt)
  },
  // 获取用户进度信息
  getUserProgress() {
    return axios.get('/api/getUserProgress')
  },
  // 获取公告
  getNotice(date, limit, isloadelater) {
    if (date) {
      // 注意这里的date，传过来的date需要时Date原始类型，不能时字符串类型
      date = date.getTime()
    }
    return axios.get('/api/message', {
      params: {
        date,
        limit,
        isloadelater
      }
    })
  },
  // 设置公告已读
  setNoticeReaded(id) {
    return axios.post(`/api/auth/notice/:${id}`)
  }
}
