const install = (Vue, vm) => {
	/**
	 * 是否登录（登录拦截）
	 */
	const isLogin = () => {
		//路由拦截--如果没有token，跳转到登录页面
		const token = vm.vuex_token
		if (!token) {
			//来自哪个页面
			const currentPage=getCurrentPages().pop()
			//获取页面路径，和请求参数
			const {options,route}=currentPage
			//参数的key
			const optionsKeys=Object.keys(options)
			let params=''
			if(optionsKeys.length!==0){
				params=optionsKeys.reduce((pre,current)=>{
					return `${pre}${current}=${options[current]}&`
				},'?').slice(0,-1)
			}
			
			//缓存当前页，用于登录或者注册之后的跳转
			uni.setStorageSync('back_url',route+params)
			console.log(currentPage.route);
			
			vm.$u.toast('请登录!')
			setTimeout(() => {
				vm.$u.route({
					type: 'redirect',
					url: 'pages/auth/login',
				})
			}, 1500)
			return false//返回一个判断值 false
		}
		return true
	}
	/**
	 * 更新用户信息，更新vuex_user
	 */
	const updataUser=async()=>{
		//请求用户信息
		const userInfo = await vm.$u.api.getUserInfo()
		//缓存用户信息
		vm.$u.vuex('vuex_user', userInfo)
	}
	
	vm.$u.utils = {
		isLogin,
		updataUser
	}
}
export default {
	install
}
