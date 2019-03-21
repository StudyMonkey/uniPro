const Fly = require('./wx.js');
// import Fly from 'flyio'

const request = new Fly

request.config.timeout = 10 * 1000
request.config.baseURL = '/api' // 本地代理2(100次/小时)

request.interceptors.request.use((request) => {
	request.headers = {
		'Content-Type': 'application/json; charset=utf-8',
		'Access-Control-Allow-Credentials': true,
	};
  uni.showLoading({ title: '拼命加载中...' })
  return request
})

request.interceptors.response.use(
  (response, promise) => {
		response.headers = {
			'Content-Type': 'application/json; charset=utf-8',
		}
    uni.hideLoading()
    return promise.resolve(response.data)
  },
  (err, promise) => {
    wx.hideLoading()
    uni.showToast({
      title: err.message,
      icon: 'none'
    })
    return promise.resolve()
  }
)

export default request
