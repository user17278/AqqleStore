<template>
	<view class="production-card">
		<view class="production-card-item" v-for="(item, index) in productionCardArr" :key="index" @tap="toProductDetail(item)">
			<view class="production-img"><image :src="item.imgUrl" mode="heightFix" style="height: 220rpx;"></image></view>
			<view class="production-title">
				<view>小时送达</view>
				<view>{{ item.name }}</view>
			</view>
			<view class="production-price">￥ {{ item.price }} 起*</view>
		</view>
	</view>
</template>

<script>
export default {
	props: ['productionCardArr'],
	methods: {
		toProductDetail(item) {
			uni.navigateTo({
				url: '/pages/product-detail/product-detail?item=' + encodeURIComponent(JSON.stringify(item))
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.production-card {
	display: flex;
	flex-wrap: wrap;
	.production-card-item:nth-of-type(2n + 1) {
		border-right: solid 2px #f5f5f7;
	}
	.production-card-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 50%;
		background-color: #ffffff;
		border-bottom: solid 2px #f5f5f7;
		box-sizing: border-box;
		.production-img {
			flex: 1.5;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 50rpx 0 40rpx 0;
		}
		.production-title {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 0rpx 20rpx;
			view:nth-of-type(1) {
				color: orange;
				font-size: 20rpx;
			}
			view:nth-of-type(2) {
				text-align: center;
				font-size: 22rpx;
				font-weight: 900;
			}
		}
		.production-price {
			margin-top: 50rpx;
			margin-bottom: 36rpx;
			padding: 6rpx 20rpx;
			border-radius: 30rpx;
			font-size: 22rpx;
			font-weight: 900;
			color: #006af6;
			background-color: #f5f5f7;
		}
	}
}
</style>
