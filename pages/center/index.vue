<template>
	<view>
		<view class="u-flex user-box u-p-t-30 u-p-l-30 u-p-r-20 u-p-b-30">
			<view class="u-m-r-10 avatar-body" >
				<oss-upload></oss-upload>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">{{vuex_user.name}}</view>
				<view class="u-font-14 u-tips-color">邮箱:{{vuex_user.email}}</view>
			</view>

		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="setting" title="个人信息" @click="toBaceInfo"></u-cell-item>
			</u-cell-group>
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="rmb-circle" title="所有订单"></u-cell-item>
				<u-cell-item icon="star" title="商品收藏"></u-cell-item>
				<u-cell-item icon="map" title="收货地址"></u-cell-item>
			</u-cell-group>
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<button style="background-color: white;" @click="layout">退出登录</button>
				<!-- <u-cell-item icon="reload" title="退出登录"></u-cell-item> -->
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pic: 'https://uviewui.com/common/logo.png',
				show: true
			}
		},
		onLoad() {
			//如果没有登录 则return  后面不执行
			if (!this.$u.utils.isLogin()) return
		},
		methods: {
			//个人信息
			toBaceInfo() {
				this.$u.route({
					url: 'pages/center/baseinfo'
				})
			},
			//退出登录
			async layout() {
				//请求api，退出登录
				await this.$u.api.authLoginOut()

				this.$u.toast('退出成功！')

				setTimeout(() => {
					//请求缓存token和用户信息
					this.$u.vuex('vuex_token', null)
					this.$u.vuex('vuex_user', {})

					//跳转到首页
					this.$u.route({
						type: "reLaunch",
						url: "pages/index/index"
					})
				}, 1500)


			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #ededed;
	}

	.camera {
		width: 54px;
		height: 44px;

		&:active {
			background-color: #ededed;
		}
	}

	.user-box {
		background-color: #fff;
	}
	.avatar-body{
		width: 70px;
		height: 70px;
	}
</style>
