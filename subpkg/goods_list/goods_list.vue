<template>
	<!-- 总商品列表容器 -->
	<view class="goods-list">
		<block v-for="(item , index) of goods" :key="index">
			<!-- 单个item -->
			<goods-item :goods="item" @click.native="gotoDetail(item)"></goods-item>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 请求参数对象
				queryObj: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 10
				},
				//商品列表
				goods: [],
				//数据总数
				total: 0,
				//为了节流定义一个变量
				loading:false

			};
		},
		onLoad(option) {
			this.queryObj.query = option.query || ''
			this.queryObj.cid = option.cid || ''
			this.getGoodsList()
		},
		methods: {
			// 请求数据
			async getGoodsList(callback) {
				// 打开节流阀
				this.loading = true
				const {
					data
				} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				if (data.meta.status !== 200) {
					return uni.$showMsg('数据列表请求失败')
				}
				// 多次请求需要整合数据
				this.goods = [...data.message.goods , ...this.goods]
				this.total = data.message.total
				callback && callback()
				//关闭节流阀
				this.loading = false
			},
			// 跳转到详情页
			gotoDetail(item) {
				uni.navigateTo({
					url:`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`
				})
			}
		},
		// 页面触底事件
		onReachBottom() {
			this.queryObj.pagenum += 1
			// 重新发送请求
			this.getGoodsList()
		},
		// 下拉刷新事件
		onPullDownRefresh() {
			this.queryObj.pagenum = 1
			this.goods = []
			this.total = 0
			this.loading = false
			
			// 重新发送请求
			this.getGoodsList(() => uni.stopPullDownRefresh())
		}
	}
</script>

<style lang="scss">
	
</style>
