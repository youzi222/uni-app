<template>
	<u-upload ref="upload" :action="action" :max-size="5 * 1024 * 1024" max-count="1" :before-upload="beforeUpload"
		:custom-btn='true' :show-progres='false' :form-data='formData' :multiple='false' :deletable='false' width='0'
		height='0' :show-upload-list='false' @on-success="onSuccess">
		<u-avatar slot='addBtn' :src="vuex_user.avatar_url" size="140"></u-avatar>
	</u-upload>
</template>

<script>
	let _this = {} //将vue实例定义赋值为全局变量
	export default {
		name: "oss-upload",
		data() {
			return {
				action: 'http://www.example.com',
				formData: {},
				upFileName: ''
			};
		},
		created() {
			_this = this
		},
		methods: {
			/**
			 * 上传前的钩子 
			 * 注意：在小程序中，this可能会丢失  需 _this=this 
			 */
			async beforeUpload(index, list) {

				const {
					file
				} = list[0]

				//#ifdef H5
				const fileName = file.name
				//#endif

				//#ifndef H5
				const fileName = file.path //条件编译   小程序
				//#endif

				//请求api，获得oss token
				const ossToken = await _this.$u.api.authOss()
				
				//设置上传域名
				_this.action = ossToken.host

				//处理唯一文件名
				const suffix = fileName.slice(fileName.lastIndexOf('.'))
				const upFileName = _this.$u.guid(20) + suffix //guid 组件自带生成随机唯一guid

				_this.upFileName = upFileName
				console.log(upFileName);
				//额外上传的参数
				_this.formData = {
					'key': upFileName, //上传后的文件名
					'policy': ossToken.policy, //策略
					'OSSAccessKeyId': ossToken.accessid,
					'success_action_status': '200', //让服务端返回200,不然，默认会返回204
					'signature': ossToken.signature,
				}
				console.log(111);
				return true;
			},
			/**
			 * 上传成功后
			 */
			async onSuccess() {
				//移除预览区的图片
				this.$refs.upload.remove(0)
				//请求api更新头像
				await this.$u.api.authAvatar({
					avatar: this.upFileName
				})

				//更新缓存用户信息
				this.$u.utils.updataUser()

				this.$u.toast('更新成功！')
			}
		},
	}
</script>

<style>

</style>
