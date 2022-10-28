const state = {
	address:JSON.parse(uni.getStorageSync('address') || '{}'),
}
const action = {}
const mutations = {
	UPDATEADDRESS(state , address){
		state.address = address
		// 持久化到本地
		this.commit('user/SAVEADDRESSTOSTORAGE')
	},
	// 持久化地址到本地
	SAVEADDRESSTOSTORAGE(state) {
		uni.setStorageSync('address' , JSON.stringify(state.address))
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