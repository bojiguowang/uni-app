<template>
	<view class="my-container">
		<!-- 如果有token，就展示个人信息 -->
		<my-userinfo v-if="token"></my-userinfo>
		<!-- 否则展示登录页面 -->
		<my-login v-else></my-login>
	</view>
</template>

<script>
	import cartNum from '@/mixins/cartNum.js'
	import {
		mapState
	} from 'vuex'
	export default {
		mixins: [cartNum],
		data() {
			return {

			};
		},
		computed: {
			// 获取token，进行页面的动态展示
			...mapState('user', ['token']),
		}
	}
</script>

<style lang="scss">
	page,
	.my-container {
	  height: 100%;
	}
</style>
