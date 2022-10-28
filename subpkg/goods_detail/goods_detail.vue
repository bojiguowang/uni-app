<template>
	<view v-if="goodsInfo.goods_price">
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) of goodsInfo.pics" :key="inde">
				<image :src="item.pics_big" mode="" @click="perview(index)"></image>
			</swiper-item>
		</swiper>
		<!-- 商品信息区域 -->
		<view class="goods-info-box">
			<!-- 商品价格 -->
			<view class="price">￥{{goodsInfo.goods_price}}</view>
			<!-- 信息主体区域 -->
			<view class="goods-info-body">
				<!-- 商品名称 -->
				<view class="goods-name">{{goodsInfo.goods_name}}</view>
				<!-- 收藏 -->
				<view class="favi">
					<uni-icons type="star" size="18"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<!-- 运费 -->
			<view class="yf">快递：免运费</view>
		</view>
		<!-- 商品详情信息 -->
		<rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
		<!-- 商品导航组件 通过uni提供的GoodsNav组件实现-->
		<view class="goods_nav">
			<!-- fill 控制右侧按钮的样式 -->
			<!-- options 左侧按钮的配置项 -->
			<!-- buttonGroup 右侧按钮的配置项 -->
			<!-- click 左侧按钮的点击事件处理函数 -->
			<!-- buttonClick 右侧按钮的点击事件处理函数 -->
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="click"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	import cart from '../../store/cart'
	export default {
		data() {
			return {
				goodsInfo: [],
				// 左侧按钮组的配置对象
				options: [{
					icon: 'shop',
					text: '店铺'
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				// 右侧按钮组的配置对象
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		onLoad(options) {
			const goods_id = options.goods_id
			this.getGoodsInfo(goods_id)
		},
		methods: {
			async getGoodsInfo(goods_id) {
				const {
					data
				} = await uni.$http.get('/api/public/v1/goods/detail', {
					goods_id
				})
				if (data.meta.status !== 200) return uni.$showMsg('商品详情获取失败')
				//解决图片下方空白问题和webp图片在ios上无法显示问题
				data.message.goods_introduce = data.message.goods_introduce.replace(/<img /g,
					'<img style="display:block;" ').replace(/webp/g, 'jpg')
				this.goodsInfo = data.message
			},
			// 预览大图
			perview(index) {
				uni.previewImage({
					current: index,
					urls: this.goodsInfo.pics.map(x => x.pics_big)
				})
			},
			// 底部导航栏左侧按钮点击
			click(e) {
				if (e.content.text === "购物车") {
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			},
			//底部导航栏右侧按钮点击
			buttonClick(e) {
				if (e.content.text === "加入购物车") {
					// 整理参数
					const goods = {
						goods_id: this.goodsInfo.goods_id, // 商品的Id
						goods_name: this.goodsInfo.goods_name, // 商品的名称
						goods_price: this.goodsInfo.goods_price, // 商品的价格
						goods_count: 1, // 商品的数量
						goods_small_logo: this.goodsInfo.goods_small_logo, // 商品的图片
						goods_state: true //商品的勾选状态
					}
					// 调用映射过来的方法
					this.ADDTOCART(goods)
				}
			},
			...mapMutations('cart', ['ADDTOCART'])
		},
		computed: {
			...mapState('cart', ['cart']),
			...mapGetters('cart', ['count'])
		},
		watch: {
			/** 监听count属性的变化,如果变化，更改购物车小图标右上角的数字
			 ** 由于在详情页首次加载时，需要展示购物车中商品数量，但是如果采用 watch的普通监听count(){},第一次渲染不会监听，所以使用对象的形式进行配置
			 *
			 *
			 **/
			count: {
				handler(newValue) {
					const res = this.options.find(item => item.text === '购物车')
					if (res) {
						res.info = newValue
					}
				},
				immediate:true
			}
		}

	}
</script>

<style lang="scss">
	swiper {
		height: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	// 商品信息区域的样式
	.goods-info-box {
		padding: 10px;
		padding-right: 0;

		.price {
			color: #c00000;
			font-size: 18px;
			margin: 10px 0;
		}

		.goods-info-body {
			display: flex;
			justify-content: space-between;

			.goods-name {
				font-size: 13px;
				padding-right: 10px;
			}

			// 收藏区域
			.favi {
				width: 120px;
				font-size: 12px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border-left: 1px solid #efefef;
				color: gray;
			}
		}

		// 运费
		.yf {
			margin: 10px 0;
			font-size: 12px;
			color: gray;
		}
	}

	// .goods-detail-container {
	//   // 给页面外层的容器，添加 50px 的内padding，
	//   // 防止页面内容被底部的商品导航组件遮盖
	//   padding-bottom: 50px;
	// }

	.goods_nav {
		// 为商品导航组件添加固定定位
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
</style>
