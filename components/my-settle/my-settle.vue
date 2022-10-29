<template>
	<!-- 最外层的容器 -->
	<view class="my-settle-container">
		<!-- 全选区域 -->
		<label class="radio" @click="changeAllState">
			<radio color="#C00000" :checked="isFullChecked" /><text>全选</text>
		</label>
		<!-- 合计区域 -->
		<view class="amount-box">
			合计:<text class="amount">￥{{checkedGoodsAmount}}</text>
		</view>
		<!-- 结算按钮 -->
		<view class="btn-settle" @click="pay">结算({{checkedCount}})</view>
	</view>
</template>

<script>
	import {mapGetters , mapMutations , mapState} from 'vuex'
	export default {
		name: "my-settle",
		data() {
			return {
				// 倒计时秒数
				second:3,
				// 定时器ID
				timer:null
			};
		},
		computed:{
			...mapGetters('cart' , ['checkedCount' , 'count' , 'checkedGoodsAmount']),
			// 映射收获地址，判断是否可以结算
			...mapGetters('user',['addstr']),
			// 映射token,判断用户是否登录
			...mapState('user' , ['token']),
			isFullChecked(){
				return this.count === this.checkedCount
			}
		},
		methods:{
			...mapMutations('cart' , ['UPDATEALLGOODSTATE']),
			// 点击全选或全不选时
			changeAllState() {
				this.UPDATEALLGOODSTATE(!this.isFullChecked)
			},
			// 点击了结算按钮
			pay(){
				// 先判断是否勾选了商品
				if(!this.checkedCount) return uni.$showMsg('请选择商品再结算')
				// 判断是否选择了地址
				if(!this.addstr) return uni.$showMsg('请选择地址')
				// 判断是否登录
				if(!this.token) {
					return this.delay()
				}
			},
			delay() {
				this.second = 3
				// 展示提示消息
				this.showTips(this.second)
				this.timer = setInterval(() => {
					this.second--
					if(this.second === 0) {
						// 清除定时器
						clearInterval(this.timer)
						// 跳转到登录页
						uni.switchTab({
							url:'/pages/my/my'
						})
						return
					}
					this.showTips(this.second)
				},1000)
			},
			// 点击结算按钮，未登录，展示倒计时的提示消息，跳转到登录页
			showTips(n) {
			  // 调用 uni.showToast() 方法，展示提示消息
			  uni.showToast({
			    // 不展示任何图标
			    icon: 'none',
			    // 提示的消息
			    title: '请登录后再结算！' + n + ' 秒后自动跳转到登录页',
			    // 为页面添加透明遮罩，防止点击穿透
			    mask: true,
			    // 1.5 秒后自动消失
			    duration: 1500
			  })
			}
		}
	}
</script>

<style lang="scss">
	.my-settle-container {
		/* 底部固定定位 */
		position: fixed;
		bottom: 0;
		left: 0;
		/* 设置宽高和背景色 */
		width: 100%;
		height: 50px;
		background-color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 5px;
		font-size: 14px;

		.radio {
			display: flex;
			align-items: center;
		}

		.amount {
			color: #c00000;
		}

		.btn-settle {
			height: 50px;
			min-width: 100px;
			background-color: #c00000;
			color: white;
			line-height: 50px;
			text-align: center;
			padding: 0 10px;
		}
	}
</style>
