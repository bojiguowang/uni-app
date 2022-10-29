<template>
	<view class="goods-item">
		<!-- 左侧图片区 -->
		<view class="goods-item-left">
			<!-- 
				添加复选框，在购物车中需要用到，后面可以通过动态控制展示不展示，在商品列表中不展示，在购物车中展示
				通过在goods_detail中整理参数时传入的goods_state来动态决定其状态
			-->
			<radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click="handleChange"></radio>
			<image :src="goods.goods_small_logo || defaultPic" mode="" class="goods-pic"></image>
		</view>
		<!-- 右侧文字区 -->
		<view class="goods-item-right">
			<view class="goods-info">
				{{goods.goods_name}}
			</view>
			<view class="goods-box">
				<!-- 商品价格 -->
				<view class="goods-price">
					¥{{goods.goods_price | fix}}
				</view>
				<!-- 商品数量 -->
				<uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="numChangehandle">
				</uni-number-box>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "goods-item",
		data() {
			return {
				// 默认展示的空图片
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		props: {
			// 传过来的商品信息
			goods: {
				type: Object,
				default: {},
			},
			// 通过传过来的信息判断是否展示复选框,如果没传，默认不展示
			showRadio: {
				type: Boolean,
				default: false
			},
			// 通过传过来的值判断是否展示商品数量框
			showNum: {
				type: Boolean,
				default: false
			},
		},
		filters: {
			fix(num) {
				return Number(num).toFixed(2)
			}
		},
		methods: {
			handleChange(e) {
				console.log(e , 'e')
				// 触发自定义函数,修改复选框的值时的回调
				this.$emit('radioChange', {
					goods_id: this.goods.goods_id,
					goods_state: !this.goods.goods_state

				})
			},
			// 修改数字框时的回调
			numChangehandle(val) {
				this.$emit('numChange', {
					// 商品的 Id
					goods_id: this.goods.goods_id,
					// 商品的最新数量
					goods_count: +val
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods-item {
		// 让 goods-item 项占满整个屏幕的宽度
		width: 750rpx;
		// 设置盒模型为 border-box
		box-sizing: border-box;
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;

		.goods-item-left {
			margin-right: 10px;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.goods-pic {
				width: 100px;
				height: 100px;
				display: block;
			}
		}

		.goods-item-right {
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: space-between;

			.goods-box {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}

			.goods-info {
				font-size: 13px;
			}

			.goods-price {
				font-size: 15px;
				color: #c00000;
			}
		}
	}
</style>
