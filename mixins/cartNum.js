	//将tabBar购物车的右上角数字剥离出来，使其在其他tabBar也可以看到购物车上的数字
	import {mapGetters} from 'vuex'
	export default {
		computed:{
			...mapGetters('cart' , ['count'])
		},
		onShow(){
			this.setNum()
		},
		methods:{
			setNum() {
				// setTabBarBadge为tabBar的右上角添加文本
				uni.setTabBarBadge({
					index:2,
					text:this.count + '' //text 的值必须是字符串，不能是数字
				})
			}
		},
		watch:{
			count:function(){
				this.setNum()
			}
		}
	}