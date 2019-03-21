import request from './request.js'

export function getMovie ({ board = 'top250', start = 0, count = 20, apikey = '0df993c66c0c636e29ecbb5344252a4a' } = {}) {
  let params = {
	  apikey,
	  start,
	  count
  }
//   if (board !== 'us_box') {
//     params.start = (page - 1) * count
//     params.count = count
//   }
//   if (board === 'in_theaters') {
//     params.city = city
//   }
//   if (board === 'search') {
//     params.q = search
//   }
  return request.get(`/${board}`, params)
}