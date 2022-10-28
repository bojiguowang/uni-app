<template>
	<view class="goods-item">
		<!-- 左侧图片区 -->
		<view class="goods-item-left">
			<image :src="goods.goods_small_logo || defaultPic" mode="" class="goods-pic"></image>
		</view>
		<!-- 右侧文字区 -->
		<view class="goods-item-right">
			<view class="goods-info">
				{{goods.goods_name}}
			</view>
			<view class="goods-box">
				<view class="goods-price">
					¥{{goods.goods_price | fix}}
				</view>
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
			goods:{
				type: Object,
				defaul: {},
			},
		},
		filters:{
			fix(num) {
				return Number(num).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;

		.goods-item-left {
			margin-right: 15px;

			.goods-pic {
				width: 100px;
				height: 100px;
				display: block;
			}
		}

		.goods-item-right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.goods-info {
				font-size: 13px;
			}

			.goods-price {
				font-size: 16px;
				color: #c00000;
			}
		}
	}
</style>
