<template>
	<view class="scroll-view-container">
		<!-- 左侧滑动区 -->
		<scroll-view scroll-y="true" :style="{height: wh+'px'}" class="left-scroll">
			<view :class="['left-scroll-item',active===index?'active':'']" v-for="(item , index) of cateList"
				:key="index" @click='changeActive(index)'>
				{{item.cat_name}}
			</view>
		</scroll-view>
		<!-- 右侧滑动区 -->
		<scroll-view scroll-y="true" :style="{height: wh+'px'}" class="right-scroll" :scroll-top="scrollTop">
			<!-- 二级分类渲染 -->
			<view class="right-scroll-item" v-for="(item, index) of cateLevel2" :key="index">
				<view class="right-scroll-title">
					/ {{item.cat_name}} /
				</view>
				<!-- 三级分类渲染 -->
				<view class="right-scroll-content">
					<view class="right-scroll-content-item" v-for="(item2 , index2) of item.children" :key="index2" @click="goToDetail(item2)">
						<image :src="item2.cat_icon.replace('api-ugo-dev' , 'api-ugo-web')" mode=""></image>
						<text class="">
							{{item2.cat_name}}
						</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//当前屏幕可用高度，用来设置滚动条高度
				wh: 0,
				cateList: [],
				cateLevel2: [],
				//默认被选中的索引
				active: 0,
				// 定义滚动条开始位置，以防有时切换菜单滚动条不从顶部开始
				scrollTop: 0
			};
		},
		onLoad() {
			//获取屏幕可用高度
			const systemInfo = uni.getSystemInfoSync()
			this.wh = systemInfo.windowHeight
			this.getCateList()
		},
		methods: {
			async getCateList() {
				const {
					data
				} = await uni.$http.get('/api/public/v1/categories')
				if (data.meta.status !== 200) {
					uni.$showMsg('获取分类列表失败')
				}
				//默认展示索引0，所以二级菜单先只包括索引0
				this.cateLevel2 = data.message[0].children
				this.cateList = data.message

			},
			//点击更改active的索引
			changeActive(index) {
				this.active = index
				//二级菜单跟着更改
				this.cateLevel2 = this.cateList[index].children
				// 滚动条其实位置置为0
				this.scrollTop = this.scrollTop === 0 ? 1 : 0
			},
			//去商品详情页面
			goToDetail(item) {
				uni.navigateTo({
					url:`/subpkg/goods_list/goods_list?cid=${item.cat_id  }`
				})
			}
		}
	}
</script>

<style lang="scss">
	.scroll-view-container {
		display: flex;

		.left-scroll {
			width: 120px;
		}

		.left-scroll-item {
			background-color: #f7f7f7;
			line-height: 60px;
			text-align: center;
			font-size: 12px;

			&.active {
				background-color: #ffffff;
				position: relative;

				&::before {
					display: block;
					width: 3px;
					height: 30px;
					background-color: #ff0000;
					content: "";
					position: absolute;
					top: 50%;
					left: 0;
					transform: translateY(-50%);
				}
			}
		}

		.right-scroll {
			.right-scroll-title {
				font-size: 12px;
				font-weight: bold;
				text-align: center;
				padding: 15px 0;
			}

			.right-scroll-content {
				display: flex;
				flex-wrap: wrap;

				.right-scroll-content-item {
					width: 33.33%;
					margin-bottom: 10px;
					display: flex;
					flex-direction: column;
					align-items: center;

					image {
						width: 60px;
						height: 60px;
					}

					text {
						font-size: 12px;
					}
				}
			}
		}
	}
</style>
