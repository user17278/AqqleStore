<template>
	<view class="discount bg-color" :style="{ padding: isUnique ? '60rpx 0rpx 0 0rpx' : '60rpx 30rpx 0 30rpx' }">
		<view class="discount-title bg-color">
			<text style="font-weight: 900">{{ isUnique ? '专属礼遇' : '礼遇在你身边' }}</text>
		</view>
		<view class="discount-card" :style="{ height: isUnique ? 'auto' : '690rpx' }">
			<scroll-view class="scroll-content" scroll-x="true" style="width: 100%; white-space: nowrap;" v-if="isUnique">
				<view class="unique-discount-card-item" v-for="(item, index) in content" :key="index" @tap="toStop(item.title)">
					<view class="discount-card-item-content">
						<view class="title">{{ item.title }}</view>
						<view class="detail">{{ item.detail }}</view>
						<view class="detail">{{ item.detail_ }}</view>
					</view>
					<view class="discount-card-item-img"><image :src="discountImgArr[index].imgUrl" mode="aspectFit"></image></view>
				</view>
			</scroll-view>
			<view class=" 'discount-card-item" v-for="(item, index) in content" :key="index" v-if="!isUnique">
				<view class="discount-card-item-content" @tap="toStop(item.title)">
					<view class="title">{{ item.title }}</view>
					<view class="detail">{{ item.detail }}</view>
					<view class="detail">{{ item.detail_ }}</view>
				</view>
				<view class="discount-card-item-img"><image :src="discountImgArr[index].imgUrl" mode="aspectFit"></image></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: ['discountImgArr', 'isUnique'],
	data() {
		return {
			content: [
				{
					title: '教育优惠',
					detail: '面向高校学生，',
					detail_: '乐享校园好福利。'
				},
				{
					title: '以旧换新',
					detail: '到点换购新机，',
					detail_: '享 10% 额外换新补贴。'
				},
				{
					title: 'iPhone 值享焕新计划',
					detail: '2 年官方质保，',
					detail_: '半价保值换新。'
				},
				{
					title: '分期付款',
					detail: '多种分期选择，',
					detail_: '更有利率优惠。'
				}
			]
		};
	},
	methods: {
		toStop(title) {
			console.log(title);
			uni.navigateTo({
				url: '/pages/stop/stop?title=' + title
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.discount {
	.discount-title {
		padding: 0 30rpx 30rpx 30rpx;
	}
	.discount-card {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-content: space-between;
		.unique-discount-card-item {
			display: inline-block;
			margin-right: 20rpx;
			width: 400rpx;
			height: 400rpx;
			border-radius: 30rpx;
			background-color: white;
			&:nth-of-type(1) {
				margin-left: 30rpx;
			}
			&:nth-last-of-type(1) {
				margin-right: 320rpx;
			}
			.discount-card-item-content {
				display: flex;
				flex-direction: column;
				align-items: center;
				.title {
					margin: 30rpx 0 6rpx 0;
					font-size: 32rpx;
					font-weight: 900;
					color: transparent;
					background-image: linear-gradient(90deg, #499ce8, #7d5ddc);
					-webkit-background-clip: text;
				}
				.detail {
					padding-left: 16rpx;
					margin-top: 4rpx;
					font-size: 28rpx;
				}
			}
			.discount-card-item-img {
				display: flex;
				justify-content: center;
				margin-top: 20rpx;
				image {
					width: 100% !important;
					height: 200rpx !important;
				}
			}
		}
		.discount-card-item {
			display: flex;
			flex-direction: column;
			width: 336rpx;
			height: 336rpx;
			border-radius: 30rpx;
			background-color: white;
			.discount-card-item-content {
				display: flex;
				flex-direction: column;
				align-items: center;
				.title {
					margin: 30rpx 0 6rpx 0;
					font-size: 28rpx;
					font-weight: 900;
					color: transparent;
					background-image: linear-gradient(90deg, #499ce8, #7d5ddc);
					-webkit-background-clip: text;
				}
				.detail {
					padding-left: 16rpx;
					margin-top: 4rpx;
					font-size: 22rpx;
				}
			}
			.discount-card-item-img {
				display: flex;
				justify-content: center;
				image {
					width: 80%;
					height: 180rpx;
				}
			}
		}
	}
}
</style>
