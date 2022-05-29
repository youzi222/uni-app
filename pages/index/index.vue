<template>
	<view>
		<u-swiper :list="slides" name="img_url" height='330'></u-swiper>
		<view class="u-text-center u-m-20 ">
			<u-tabs :list="sortList" :is-scroll='false' :bar-width='80' :bar-height='5' :current="currentSort"
				@change="change"></u-tabs>
		</view>
		<u-row gutter="16" class="u-skeleton">
			<u-col span="6" v-for="goods in goodsList.length!== 0 ? goodsList : [{},{},{},{}]">
				<goods-card :goods='goods'></goods-card>
			</u-col>
		</u-row>
		<!-- 返回顶部 -->
		<u-back-top :scroll-top="scrollTop"></u-back-top>
		<!--骨架屏-->
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgList: [
					'https://www.baidu.com/img/flexible/logo/pc/result.png',
					'https://www.baidu.com/img/flexible/logo/pc/result.png'
				],
				sortList: [{
						name: '默认'
					},
					{
						name: '销量'
					},
					{
						name: '推荐'
					},
					{
						name: '最新'
					},
				],
				currentSort: 0,
				slides: [],
				goodsList: [],
				page: 1,
				loading: false,
				scrollTop: 0,
			}
		},
		onLoad() {
			// this.$u.utils.isLogin()
			this.getData()
		},
		methods: {
			//筛选
			change(index) {
				this.currentSort = index;
				//重置商品数据和分页
				this.goodsList = []
				this.page = 1
				this.getData()
				//判断筛选条件
			},
			//获取数据
			async getData() {
				this.loading = true //显示骨架屏
				const params = {
					page: this.page
				}
				//增加排序条件
				if (this.currentSort == 1) params.sales = 1
				if (this.currentSort == 2) params.recommend = 1
				if (this.currentSort == 3) params.new = 1
				const res = await this.$u.api.getIndex(params)
				this.loading = false //隐藏骨架屏
				this.slides = res.slides
				this.goodsList = [...this.goodsList, ...res.goods.data]

			},
			onPageScroll(e) {
				// 返回顶部
				this.scrollTop = e.scrollTop;
			}
		},
		onReachBottom() {
			//触底重新请求数据带上分页参数
			this.page = this.page + 1
			this.getData()
		}
	}
</script>

<style lang="scss" scoped>

</style>
