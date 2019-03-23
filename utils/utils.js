import config from '../config/config';
// import request from './request'

export function get( url, param ) {
	uni.showLoading({
		title: '加载中'
	});
	return new Promise( (resolve, reject) => {
		uni.request({
			url: config.host + url,
			data: {
				 param
			},
			success: res => {
				if ( res.statusCode === 200 ) {
					resolve(res)
					uni.hideLoading();
				}
			},
			fail: err => {
				reject(err)
			}
		})
	})
}

export function getType( url ) {
	uni.showLoading({
		title: '加载中'
	});
	return new Promise( (resolve, reject) => {
		uni.request({
			url: config.host + url,
			success: res => {
				if ( res.statusCode === 200 ) {
					resolve(res)
					uni.hideLoading();
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