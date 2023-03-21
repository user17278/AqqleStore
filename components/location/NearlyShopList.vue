<template>
	<view class="nearly-shop-list" id="list" style="margin: 2rpx;">
		<view style="font-size: 22rpx; text-align: center;" v-if="!nearlyShopArr.length">正在查找门店</view>
		<!-- 列表模式 -->
		<view v-for="(item, index) in nearlyShopArr" :key="index">
			<view class="swiper-item" :style="{ boxShadow: swiperIndex === index ? '0px 0px 2rpx 2rpx #007aff' : 'none' }" @tap="shopBtnClickHandler(item, index)">
				<image class="swiper-img" :src="nearlyShopImgArr" mode="aspectFill"></image>
				<view class="detail">
					<view class="name">{{ item.title }}</view>
					<view class="address">{{ item.address }}</view>
					<view class="distance">
						<view class="iconfont" style="font-size: 22rpx; margin-right: 10rpx;">&#xe63e;</view>
						{{ item.distance }} km
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: ['nearlyShopArr', 'nearlyShopImgArr'],
	data() {
		return {
			swiperIndex: 0 //当前滑动栏序号
		};
	},
	methods: {
		shopBtnClickHandler(item, index) {
			this.swiperIndex = index;
			console.log(item);
			this.$emit('getShopMessage', item.title, item.address, item.distance, item.latitude, item.longitude);
		}
	}
};
</script>

<style lang="scss" scoped>
.swiper-item {
	display: flex;
	padding: 20rpx;
	margin-bottom: 20rpx;
	border-radius: 30rpx;
	background-color: #ffffff;
	.swiper-img {
		width: 150rpx;
		height: 150rpx;
		border-radius: 30rpx;
	}
	.detail {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin: 12rpx 30rpx;
		width: 380rpx;
		.name {
			font-size: 26rpx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.address {
			margin-bottom: 30rpx;
			color: #929292;
			font-size: 24rpx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.distance {
			display: flex;
			align-items: center;
			font-size: 22rpx;
		}
	}
}
</style>
