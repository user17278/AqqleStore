<template>
	<view class="privacy">
		<view class="sticky">
			<view class="status_bar"></view>
			<view class="wx-nav">
				<view class="iconfont" style="margin:0rpx 10rpx; color: #ffffff;font-size: 36rpx;" @tap="backTo()">&#xe779;</view>
				<view class="title">隐私声明</view>
				<view class="iconfont" style="margin:0rpx 10rpx; color: transparent;font-size: 36rpx;">&#xe779;</view>
			</view>
		</view>
		<scroll-view scroll-y="true"><image class="privacy-img" :src="imgUrl" mode="widthFix"></image></scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			imgUrl: ''
		};
	},
	mounted() {
		this.$http
			.request({
				url: '/my-list/data'
			})
			.then(res => {
				this.imgUrl = res.data.setting.data[1].imgUrl;
			});
	},
	methods: {
		backTo() {
			uni.navigateBack();
		}
	}
};
</script>

<style lang="scss" scoped>
.title {
	color: #ffffff;
}
.privacy {
	.privacy-img {
		width: 100vw;
	}
}
</style>
