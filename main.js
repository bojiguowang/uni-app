import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import store from './store/store.js'
// 导入网络请求包
import { $http } from'@escook/request-miniprogram'
uni.$http = $http
$http.baseUrl = "https://www.uinav.com"
// 请求拦截
$http.beforeRequest = function(){
	uni.showLoading({
		title:"数据加载中"
	})
}
//响应拦截
$http.afterRequest = function(){
	uni.hideLoading()
}
//封装弹窗方法
uni.$showMsg = function(title="数据加载失败",duration=1500){
	uni.showToast({
		title,
		duration,
		icon:'none'
	})
}



Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif