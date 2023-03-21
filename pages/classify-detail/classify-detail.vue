<template>
	<view class="classify-detail bg-color" style="height: 100vh;overflow-y: hidden;">
		<view class="sticky">
			<view class="status_bar"></view>
			<view class="wx-nav">
				<view class="iconfont" style="margin:0rpx 10rpx; color: #ffffff;font-size: 36rpx;" @tap="backTo()">&#xe779;</view>
				<view class="title" style="color: #ffffff;">{{ title }}</view>
				<view class="iconfont" style="margin:0rpx 10rpx; color: transparent;font-size: 36rpx;">&#xe779;</view>
			</view>
			<view class="topBar">
				<view class="title">{{ title }}</view>
				<view class="change-classify-btn iconfont">&#xe65e;</view>
			</view>
		</view>
		<scroll-view class="scroll-view-content" scroll-y="true">
			<ProductionCard :productionCardArr="productionCardArr"></ProductionCard>
			<view class="tips">*实际供应情况取决于供应商；本页面显示官网零售价供消费者参考，实际价格以各Aqqle授权经销商门店价格为准。</view>
		</scroll-view>
	</view>
</template>

<script>
import ProductionCard from '../../components/common/ProductionCard.vue';
export default {
	data() {
		return {
			title: '',
			productionCardArr: []
		};
	},
	onLoad(option) {
		this.title = option.title;
		let index = parseInt(option.index);
		this.$http
			.request({
				url: '/index_list/data'
			})
			.then(res => {
				this.productionCardArr = res.data[1].topBar[index + 1].productionCardArr;
			});
	},
	methods: {
		backTo() {
			uni.navigateBack();
		}
	},
	components: {
		ProductionCard
	}
};
</script>

<style lang="scss" scoped>
.topBar {
	display: flex;
	justify-content: space-between;
	position: static;
	padding: 80rpx 30rpx 0 30rpx;
	height: 10vh;
	box-sizing: border-box;
	.title {
		font-size: 40rpx;
		font-weight: 600;
		color: #1d1d1f;
	}
	.iconfont {
		font-size: 40rpx;
		font-weight: 900;
		color: #1d1d1f;
	}
}
.scroll-view-content {
	padding: 10rpx 30rpx;
	height: 80vh;
	background-color: #f5f5f7;
	box-sizing: border-box;
	.tips {
		padding: 20rpx 0 160rpx 0;
		font-size: 18rpx;
		font-weight: 100;
	}
}
</style>
