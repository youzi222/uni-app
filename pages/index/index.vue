<template>
	<view>
		<u-swiper :list="imgList"></u-swiper>
		<view class="u-text-center u-m-20 ">
			<u-tabs :list="sortList" bar-width='100' item-width="165" :current="currentSort" @change="change"></u-tabs>
		</view>
		<u-row gutter="16">
			<u-col span="6">
				<view class="">
					<navigator url="" class="goods-item">
						<u-image width="100%" height="300rpx" src="https://www.baidu.com/img/flexible/logo/pc/result.png"></u-image>
					</navigator>
				</view>
			</u-col>
		</u-row>
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
				currentSort: 0
			}
		},
		onLoad() {

		},
		methods: {
			change(index) {
				this.currentSort = index;
				console.log(index);
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
