import config from '../config/config';
// import request from './request'

const apikey = '0df993c66c0c636e29ecbb5344252a4a';

export function get( url, start ) {
	return new Promise( (resolve, reject) => {
		uni.request({
			url: config.host + url,
			data: {
				 start
			},
			success: res => {
				if ( res.statusCode === 200 ) {
					resolve(res)
				}
			},
			fail: err => {
				reject(err)
			}
		})
	})
}

// export function get( url ) {
// 	return new Promise( (resolve, reject) => {
// 		uni.request({
// 			url: config.host + url,
// 			success: res => {
// 				console.log('utils', res);
// 				if ( res.statusCode === 200 ) {
// 					resolve(res.data)
// 				}
// 			},
// 			fail: err => {
// 				reject(err)
// 			}
// 		})
// 	})
// }