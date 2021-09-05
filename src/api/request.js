import axios from 'axios'

export function request(config) {
	// 创建axios的实例
	const instance = axios.create({
		baseURL: import.meta.env.VITE_APP_BASE_URL,
		timeout: 20000
	})
	// 请求拦截器配置
	instance.interceptors.request.use(config => {
			// config.headers.Authorization = window.sessionStorage.getItem('token')
			return config
		}, error => {
			console.log(error)
			return Promise.error(error)
		}
	)
	// 响应拦截器配置
	instance.interceptors.response.use(response => {
		return response.data
	}, error => {
		console.log(error)
		switch (error.response.status) {
			case 400:
				return Promise.reject(error.response.data)
			case 401:
				console.log("无权访问")
				break
			case 403:
				console.log("token过期啦")
				break
			case 404:
				console.log("404啦")
				break
			default:
				return Promise.reject(error)
		}
		return Promise.reject(error)
	})
	// 发送真正的网络请求
	return instance(config);
}

export default request