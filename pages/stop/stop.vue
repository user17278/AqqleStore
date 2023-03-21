<template>
	<view class="about-us bg-color">
		<view class="sticky">
			<view class="status_bar"></view>
			<view class="wx-nav">
				<view class="iconfont" style="margin:0rpx 10rpx; color: #ffffff;font-size: 36rpx;" @tap="backTo()">&#xe779;</view>
				<view class="wx-nav-title">{{ title }}</view>
				<view class="iconfont" style="margin:0rpx 10rpx; color: transparent;font-size: 36rpx;">&#xe779;</view>
			</view>
			<view class="stop-img"><image src="http://localhost:3000/images/stop-page/stop.png" mode="widthFix" style="width: 100%;"></image></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: ''
		};
	},
	onLoad(option) {
		this.title = option.title;
	},
	methods: {
		backTo() {
			uni.navigateBack();
		}
	}
};
</script>

<style></style>
