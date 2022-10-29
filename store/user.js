const state = {
	address:JSON.parse(uni.getStorageSync('address') || '{}'),
	// 登录之后的token字段
	token:uni.getStorageSync('token') || '',
	// 获取用户信息
	userinfo:JSON.parse(uni.getStorageSync('userinfo') || '{}'),
}
const action = {}
const mutations = {
	// 更新地址
	UPDATEADDRESS(state , address){
		state.address = address
		// 持久化到本地
		this.commit('user/SAVEADDRESSTOSTORAGE')
	},
	// 地址持久化地址到本地
	SAVEADDRESSTOSTORAGE(state) {
		uni.setStorageSync('address' , JSON.stringify(state.address))
	},
	// 更新用户信息
	UPDATEUSERINFO(state , userinfo){
		state.userinfo = userinfo
		this.commit('user/SAVEUSERINFOTOSTORAGE')
	},
	// 用户信息持久化存储到本地
	SAVEUSERINFOTOSTORAGE(state){
		uni.setStorageSync('userinfo' , JSON.stringify(state.userinfo))
	},
	// 更新token字段
	UPDATETOKEN(state , token){
		state.token = token
		this.commit('user/SAVETOKENTOSTORAGE')
	},
	// 持久化TOKEN
	SAVETOKENTOSTORAGE(state){
		uni.setStorageSync('token' , JSON.stringify(state.token))
	}
}
const getters = {
	addstr(state) {
	  if (!state.address.provinceName) return ''
	  // 拼接 省，市，区，详细地址 的字符串并返回给用户
	  return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
	},
}

export default {
	namespaced:true,
	state,
	action,
	mutations,
	getters
}