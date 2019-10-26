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
    return axios.post(`/api/auth/notice/${id}`)
  },
  // 获取所有店铺,根据设备定位地理坐标获取(q-搜索关键字)
  getShops(Lng, Lat, q, _page) {
    return axios.get(`/api/auth/shop?_limit=10&_order=asc&_sort=distance`, {
      params: {
        Lng,
        Lat,
        q,
        _page
      }
    })
  },
  // 获取店铺销售进度
  getShopSales(id) {
    // return axios.get(`/api/auth/shopSales/${id}`)
    return axios.get('/api/auth/shopSales/' + id)
  },
  // 文件上传
  // 请求表单中，文件对应的name必须为： imgF;文件上传限制文件大小： 2M，目前只支持上传一张图片。
  uploadImg(formData) {
    return axios({
      url: '/api/upload',
      method: 'POST',
      headers: {
        // 指定传输数据为二进制数据，例如图片、mp3、文件
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
  },
  // 提交签到
  submitSigin(data) {
    return axios.post('/api/auth/SignIn', data)
  },
  // 获取货物信息
  getGoods(q, _page) {
    return axios.get('/api/auth/goods?_limit=15', {
      params: {
        q,
        _page
      }
    })
  }
}
