const state = {
	//购物车数据.从本地读取
	cart: JSON.parse(uni.getStorageSync('cart') || '[]')
}
const action = {}
const mutations = {
	//加购操作数量的回调
	ADDTOCART(state, goods) {
		// 判断cart中是否存在该商品
		const res = state.cart.find(x => x.goods_id === goods.goods_id)
		//如果不存在，直接push进去
		if (!res) {
			state.cart.push(goods)
		}
		// 如果存在，数量加一
		else res.goods_count++

		// 加购操作后，调用存入本地的方法
		this.commit('cart/SAVETOSTORAGE')
	},
	//持久化存储,将购物车的数据放入本地(正常应该是存在数据库的)
	SAVETOSTORAGE(state) {
		uni.setStorageSync('cart', JSON.stringify(state.cart))
	},
	// 进行商品选中状态的更改
	UPDATEGOODSTATE(state, goods) {
		const res = state.cart.find(item => item.goods_id === goods.goods_id)
		if (res) {
			// 更新商品的状态值
			res.goods_state = goods.goods_state
			// 存储至本地
			this.commit('cart/SAVETOSTORAGE')
		}
	},
	UPDATEGOODSNUM(state, goods) {
		const res = state.cart.find(item => item.goods_id === goods.goods_id)
		if (res) {
			// 更新数量值
			res.goods_count = goods.goods_count
			// 存储至本地
			this.commit('cart/SAVETOSTORAGE')
		}
	},
	// 滑动删除
	REMOVEGOODSBYID(state, goods) {
		// 过滤数据
		state.cart = state.cart.filter(item => item.goods_id !== goods.goods_id)
		// 存储本地
		this.commit('cart/SAVETOSTORAGE')
	},
	UPDATEALLGOODSTATE(state, newState) {
		// 循环更新购物车中每件商品的勾选状态
		state.cart.forEach(x => x.goods_state = newState)
		// 持久化存储到本地
		this.commit('cart/SAVETOSTORAGE')
	}
}
const getters = {
	// 统计购物车中商品数量，需要在购物车图标右上角展示
	count(state) {
		let sum = 0
		state.cart.forEach(item => sum += item.goods_count)
		return sum
	},
	// 计算选中的数量
	checkedCount(state) {
		// 先使用 filter 方法，从购物车中过滤器已勾选的商品
		// 再使用 reduce 方法，将已勾选的商品总数量进行累加
		// reduce() 的返回值就是已勾选的商品的总数量
		return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
	},
	//计算总价格
	checkedGoodsAmount() {
		// 先使用 filter 方法，从购物车中过滤器已勾选的商品
		// 再使用 reduce 方法，将已勾选的商品数量 * 单价之后，进行累加
		// reduce() 的返回值就是已勾选的商品的总价
		// 最后调用 toFixed(2) 方法，保留两位小数
		return state.cart.filter(x => x.goods_state)
			.reduce((total, item) => total += item.goods_count * item.goods_price, 0)
			.toFixed(2)
	}
}

export default {
	namespaced: true,
	state,
	action,
	mutations,
	getters
}
