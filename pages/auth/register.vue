<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<input class="u-border-bottom" type="text" v-model="name" placeholder="请输入昵称"  />
			<input class="u-border-bottom" type="text" v-model="email"  placeholder="请输入邮箱" />
			<input class="u-border-bottom" type="password" v-model="password"  placeholder="请输入密码" />
			<input class="u-border-bottom" type="password" v-model="password_confirmation"  placeholder="确认密码" />
			<button @tap="submit" :style="[inputStyle]" class="getCaptcha">注册</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				email: '',
				password: '',
				password_confirmation: '',
			}
		},
		computed: {
			inputStyle() {
				let style = {};
				// 全部验证通过，激活注册
				if(this.$u.test.email(this.email) && this.password && this.password==this.password_confirmation && this.name) {
					style.color = "#fff";
					style.backgroundColor = this.$u.color['primary'];
				}
				return style;
			},
		},
		methods: {
			/**
			 * 执行注册
			 */	
			async submit() {
			//准备提交参数     ps:表单验证:（接口有返回值）
				const params={
					name:this.name,
					email:this.email,
					password:this.password,
					password_confirmation:this.password_confirmation
				}
				//请求api,执行注册
				const res=await this.$u.api.authRegister(params)
				
				// 注册成功后，重定向到登录（redirect）
				this.$u.toast('注册成功！')
				// 延时跳转
				setTimeout(()=>{
					this.$u.route({
						type:"redirect",
						url:"/pages/auth/login",
						params:{email:this.email,password:this.password}
					})
				},1500)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-border-bottom {
		margin-bottom: 40rpx !important;
	}
.wrap .content .getCaptcha[data-v-6e828681] {
    background-color: #a2b8ff;
}
.wrap {
	font-size: 28rpx;
	.content {
		width: 600rpx;
		margin: 80rpx auto 0;

		.title {
			text-align: left;
			font-size: 60rpx;
			font-weight: 500;
			margin-bottom: 100rpx;
		}
		input {
			text-align: left;
			margin-bottom: 10rpx;
			padding-bottom: 6rpx;
		}
		.tips {
			color: $u-type-info;
			margin-bottom: 60rpx;
			margin-top: 8rpx;
		}
		.getCaptcha {
			background-color: rgb(253, 243, 208);
			color: $u-tips-color;
			border: none;
			font-size: 30rpx;
			padding: 12rpx 0;
			
			&::after {
				border: none;
			}
		}
		.alternative {
			color: $u-tips-color;
			display: flex;
			justify-content: space-between;
			margin-top: 30rpx;
		}
	}
	.buttom {
		.loginType {
			display: flex;
			padding: 350rpx 150rpx 150rpx 150rpx;
			justify-content:space-between;
			
			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				color: $u-content-color;
				font-size: 28rpx;
			}
		}
		
		.hint {
			padding: 20rpx 40rpx;
			font-size: 20rpx;
			color: $u-tips-color;
			
			.link {
				color: $u-type-warning;
			}
		}
	}
}
</style>
