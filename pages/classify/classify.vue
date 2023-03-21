<template>
	<view style="height: 100vh; overflow-y: auto;">
		<view class="sticky">
			<view class="status_bar"></view>
			<view class="wx-nav">
				<view class="iconfont icon-Magnifier flex-item"></view>
				<text class="wx-nav-title flex-item">产品分类</text>
				<view class="flex-item"></view>
			</view>
		</view>
		<view class="classify-card bg-color">
			<view class="classify-card-item" v-for="(item, index) in classifyCardArr" :key="index" @tap="toClassifyDetail(item.title, index)">
				<view class="classify-card-item-title">{{ item.title }}</view>
				<image class="classify-card-item-img" :src="item.imgUrl" mode="aspectFit"></image>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			classifyCardArr: []
		};
	},
	onLoad() {
		this.$http
			.request({
				url: '/classify-list/data'
			})
			.then(res => {
				this.classifyCardArr = res.data;
			});
	},
	methods: {
		toClassifyDetail(title, index) {
			uni.navigateTo({
				url: '/pages/classify-detail/classify-detail?title=' + title + '&index=' + index
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.wx-nav {
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	box-sizing: border-box;
	padding: 20rpx;
	width: 100vw;
	height: 118rpx;
	background-color: black;
	.wx-nav-title {
		text-align: center;
		color: white;
	}
}
.classify-card {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-content: flex-start;
	padding: 30rpx;
	.classify-card-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 20rpx;
		width: 335rpx;
		height: 335rpx;
		border-radius: 30rpx;
		background-color: #ffffff;
		.classify-card-item-title {
			margin-top: 40rpx;
		}
		.classify-card-item-img {
			width: 260rpx;
			height: 230rpx;
		}
	}
}
</style>
