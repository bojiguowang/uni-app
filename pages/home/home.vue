<template>
	<view>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular>
			<swiper-item v-for="item of swiperList" :key="item.goods_id">
				<navigator class="swiperItem" :url="`../../subpkg/goods_detail/goods_detail?good_id=${item.goods_id}`">
					<image :src="item.image_src" alt="" srcset="">
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 导航栏分类 -->
		<view class="navList">
			<view class="navListItem" v-for="(item , index) of navList" :key="index" @click="navClick(item)">
				<image :src="item.image_src" mode=""></image>
			</view>
		</view>
		<!-- 楼层区域 -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item,index) of floorList" :key="index">
				<image :src="item.floor_title.image_src" mode="" class="floor-title"></image>
				<view class="floor-box">
					<!-- 左侧大图片 -->
					<navigator class="floor-left-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" mode="widthFix"
							:style="{width:item.product_list[0].image_width + 'rpx'}"></image>
					</navigator>
					<!-- 右侧小图片 -->
					<view class="floor-right-box">
						<navigator class="floor-right-imgItem" v-for="(item2 , index2) of item.product_list"
							:key="index2" v-if="index2!==0" :url="item2.url">
							<image :src="item2.image_src" mode="widthFix" :style="{width:item2.image_width + 'rpx'}">
							</image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import cartNum from '@/mixins/cartNum.js'
	export default {
		mixins:[cartNum],
		data() {
			return {
				swiperList: [],
				navList: [],
				floorList: []
			};
		},
		onLoad() {
			this.getSwiperList(),
				this.getNavList(),
				this.getFloorList()
		},
		methods: {
			async getSwiperList() {
				const {
					data
				} = await uni.$http.get('/api/public/v1/home/swiperdata')
				if (data.meta.status !== 200) {
					return uni.$showMsg('获取轮播图数据失败')
				}
				this.swiperList = data.message
			},
			async getNavList() {
				const {
					data
				} = await uni.$http.get('/api/public/v1/home/catitems')
				if (data.meta.status !== 200) {
					uni.$showMsg('导航栏数据获取失败')
				}
				this.navList = data.message
			},
			//点击分类跳转到分类tabBar界面
			navClick(item) {
				if (item.name === "分类") {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},
			async getFloorList() {
				const {
					data
				} = await uni.$http.get('/api/public/v1/home/floordata')
				if (data.meta.status !== 200) {
					uni.$showMsg('楼梯层数据获取失败')
				}
				data.message.forEach(item => {
					item.product_list.forEach(i => {
						i.url = '/subpkg/goods_list/goods_list?' + i.navigator_url.split('?')[1]
					})
				})
				this.floorList = data.message
			}
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 300rpx;

		.swiperItem,
		image {
			height: 100%;
			width: 100%;
		}
	}

	.navList {
		display: flex;
		justify-content: space-around;
		margin: 15rpx;

		.navListItem {
			image {
				width: 128rpx;
				height: 140rpx;
			}
		}
	}

	.floor-title {
		height: 60rpx;
		width: 100%;
	}

	.floor-box {
		display: flex;
		padding-left: 1 0rpx;

		.floor-right-box {
			display: flex;
			flex-wrap: wrap;
		}
	}
</style>
