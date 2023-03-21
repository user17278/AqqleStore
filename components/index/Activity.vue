<template>
	<view class="activity bg-color">
		<view class="activity-title bg-color"><text style="font-weight: 900">精彩活动</text></view>
		<view class="activity-card">
			<view class="activity-card-item">
				<view class="activity-card-item-content" style="background-color:#02012b;" @tap="toStop('节日好礼精选这边来')">
					<image class="header-img" :src="activityImgArr[0].imgUrl" mode="aspectFit"></image>
					<view class="header">
						<view class="header-title"><image style="z-index: -1; width:100rpx; height: 100rpx;" :src="activityImgArr[1].imgUrl" mode="scaleToFill"></image></view>
						<view class="header-detail">送个心花怒放</view>
						<view class="iconfont header-more">节日好礼精选这边来&#xe775;</view>
					</view>
				</view>
			</view>
			<view class="activity-card-item">
				<view
					class="activity-card-item-img"
					style="background-image: url('https://www.apple.com.cn/v/education/home/k/images/overview/k12__9yhed4yhihe6_medium.jpg');"
				></view>
				<view class="activity-card-item-content" style="margin-left: 30rpx;" @tap="toStop('iPadOS, macOS 升级必看！')">
					<view class="title" style="background-image: linear-gradient(90deg,#0083e0,#6fb251 50%,#f96600 65%);">iPadOS, macOS 升级必看！</view>
					<view class="detail">MyCoach 私教教你玩转新功能</view>
					<view class="iconfont more">立即预约&#xe775;</view>
				</view>
			</view>
			<view class="activity-card-item">
				<view
					class="activity-card-item-img"
					style="background-image: url('https://www.apple.com.cn/apple-events/images/overview/products/fall-2022/iphone14__3fc9ib6935ua_large.jpg');"
				></view>
				<view class="activity-card-item-content" style="margin-left: 30rpx;" @tap="toStop('用 iPhone 14 拍出精彩大片')">
					<view class="title" style="background-image: linear-gradient(90deg,#0083e0,#915da0);">用 iPhone 14 拍出精彩大片</view>
					<view class="detail">跟着 MyCoach 私教学习 iPhone 14 的各种全新拍照功能。</view>
					<view class="iconfont more">立即预约&#xe775;</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: ['activityImgArr'],
	data() {
		return {};
	},
	methods: {
		toStop(title) {
			uni.navigateTo({
				url: '/pages/stop/stop?title=' + title
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.activity {
	padding: 60rpx 30rpx;
	.activity-title {
		padding-bottom: 30rpx;
	}
	.activity-card {
		display: flex;
		flex-direction: column;
		.activity-card-item {
			display: flex;
			margin-bottom: 20rpx;
			height: 230rpx;
			border-radius: 30rpx;
			background-color: white;
			overflow: hidden;
			.activity-card-item-img {
				flex: 1;
				background-size: auto 100%;
				background-position: center;
				background-repeat: no-repeat;
			}
			.activity-card-item-content {
				flex: 1.5;
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				justify-content: center;
				position: relative;
				.header-img {
					position: absolute;
					z-index: 0;
					height: 160%;
					right: -100rpx;
				}
				.header {
					display: flex;
					flex-direction: column;
					align-items: center;
					position: absolute;
					top: 50%;
					left: 10%;
					transform: translateY(-50%);
					height: 100%;
					color: white;
					.header-title {
						height: 80rpx;
					}
					.header-detail {
						font-size: 40rpx;
						font-weight: 900;
					}
					.header-more {
						margin-top: 6rpx;
						font-size: 20rpx;
						color: #499cea;
					}
				}

				.title {
					font-size: 28rpx;
					font-weight: 900;
					-webkit-background-clip: text;
					color: transparent;
				}
				.detail {
					margin-top: 16rpx 0;
					font-size: 22rpx;
					font-weight: 900;
				}
				.more {
					margin-top: 38rpx;
					color: #037bff;
					font-size: 20rpx;
				}
			}
		}
	}
}
</style>
