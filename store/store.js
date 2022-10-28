import Vue from "vue"
import Vuex from 'vuex'
import cart from './cart.js'
import user from './user.js'

Vue.use(Vuex)

// 创建store的实例对象
const store = new Vuex.Store({
	modules:{
		cart,
		user
	}
})

// 向外共享 store
export default store