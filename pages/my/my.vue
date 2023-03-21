<template>
	<view class="bg-color" style="height: 100vh; overflow-y: auto;">
		<view class="sticky">
			<view class="status_bar"></view>
			<view class="wx-nav">
				<view class="flex-item"></view>
				<text class="wx-nav-title flex-item">我的</text>
				<view class="flex-item"></view>
			</view>
		</view>
		<view class="my">
			<view class="my-title">
				<image src="../../static/figuredown.png" mode="aspectFit" style="width: 50rpx; height: 50rpx; margin-right: 20rpx;"></image>
				在这里，轻松找记录。
			</view>
			<!-- 中间白色卡片 -->
			<view class="my-content">
				<view class="my-content-list">
					<view class="main-card" @tap="toOrderListCenter">
						<view class="card">
							<view class="iconfont">&#xe606;</view>
							我的订单
						</view>
						<view class="card" @tap="toOrderListCenter">
							<view class="iconfont">&#xe66d;</view>
							我的卡卷
						</view>
					</view>
					<view class="my-content-list-item" v-for="(item, index) in myList" :key="index" @tap="toDetail(index)">
						<view class="iconfont" style="margin-right: 30rpx;font-size: 50rpx;">{{ item.icon }}</view>
						<view class="title">
							{{ item.title }}
							<view class="iconfont" style="font-size: 26rpx; color: #bfbfbf; margin-top: 2rpx;">&#xe775;</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部弹出上滑抽屉卡片 -->
		<view class="slide-up" v-show="isSlideUp">
			<view class="mask" @tap="slideUpHide" :animation="animationData2"></view>
			<view class="content" :animation="animationData1">
				<view class="line"></view>
				<view class="detail">你选这的服务由 Aqqle 授权经销商提供</view>
				<view class="detail">点击“同意”后将跳转至该等非 Aqqle 控制的第三方页面。</view>
				<view class="next">继续</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			myList: [
				{
					title: '门店活动及服务预约',
					icon: '\ue627'
				},
				{
					title: 'MyCoach 我的私教',
					icon: '\ue73e'
				},
				{
					title: 'Mycoach 公开课',
					icon: '\ue650'
				},
				{
					title: '订单咨询',
					icon: '\ue605'
				},
				{
					title: '设置',
					icon: '\ue61f'
				},
				{
					title: '关于 Apple 授权专营店',
					icon: '\ue638'
				}
			],
			isSlideUp: false,
			animationData1: {},
			animationData2: {}
		};
	},
	onLoad() {
		this.setAnimation();
	},
	methods: {
		toDetail(index) {
			if (index == 4 || index == 5) {
				uni.navigateTo({
					url: '/pages/detail/detail?index=' + index
				});
			} else if (index == 0 || index == 3) {
				this.toOrderListCenter();
			} else if (index == 1 || index == 2) {
				this.slideUpShow();
			}
		},
		toOrderListCenter() {
			uni.showModal({
				content: '即将打开“订单中心 Aqqle 授权专营店”小程序？',
				cancelText: '取消',
				cancelColor: '#7f7f7f',
				confirmText: '允许',
				confirmColor: '#007aff',
				success: res => {
					if (res.confirm) {
						return;
					} else {
						return;
					}
				}
			});
		},
		setAnimation() {
			var animation1 = uni.createAnimation({
				duration: 300,
				timingFunction: 'ease'
			});
			this.animation1 = animation1;
			var animation2 = uni.createAnimation({
				duration: 300,
				timingFunction: 'ease'
			});
			this.animation2 = animation2;
		},
		slideUpShow() {
			this.isSlideUp = true;
			this.animation1.bottom('-690rpx').step();
			this.animation2.opacity(0).step();
			this.animationData1 = this.animation1.export();
			this.animationData2 = this.animation2.export();
			this.timer = setTimeout(() => {
				this.animation1.bottom(0).step();
				this.animation2.opacity(1).step();
				this.animationData1 = this.animation1.export();
				this.animationData2 = this.animation2.export();
			}, 10);
		},
		slideUpHide() {
			this.animation1.bottom('-690rpx').step();
			this.animation2.opacity(0).step();
			this.animationData1 = this.animation1.export();
			this.animationData2 = this.animation2.export();
			setTimeout(() => {
				this.isSlideUp = false;
			}, 100);
		}
	}
};
</script>

<style lang="scss" scoped>
.bg-color {
	background-color: #f4f4f6;
}
.my {
	padding: 30rpx;
	text-align: center;
	.my-title {
		display: flex;
		justify-content: center;
		font-size: 36rpx;
		padding: 60rpx 0 120rpx 0;
	}
	.my-content {
		background-color: #ffffff;
		border-radius: 30rpx;
		.my-content-list {
			margin: 0 50rpx;
			.main-card {
				display: flex;
				justify-content: space-around;
				font-size: 26rpx;
				.card {
					margin: 60rpx 0;
					.iconfont {
						font-size: 70rpx;
						padding-bottom: 20rpx;
					}
				}
			}
			.my-content-list-item {
				display: flex;
				align-items: center;
				padding: 30rpx 0;
				border-top: solid 1px #eeeeee;
				.title {
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 26rpx;
				}
			}
		}
	}
}
.slide-up {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	z-index: 999;
	.mask {
		position: absolute;
		width: 100vw;
		height: 100vh;
		opacity: 0;
		background-color: rgba(0, 0, 0, 0.3);
	}
	.content {
		display: flex;
		flex-direction: column;
		padding: 0 30rpx;
		position: absolute;
		bottom: -690rpx;
		width: 100vw;
		height: 25vh;
		box-sizing: border-box;
		border-radius: 30rpx 30rpx 0 0;
		background-color: white;
		.line {
			margin: 0 auto;
			margin-top: 20rpx;
			margin-bottom: 60rpx;
			width: 70rpx;
			height: 8rpx;
			border-radius: 30rpx;
			background-color: #c0c0c0;
		}
		.detail {
			margin-top: 6rpx;
			font-size: 22rpx;
		}
		.next {
			margin-top: 60rpx;
			width: 100%;
			height: 70rpx;
			line-height: 70rpx;
			color: #ffffff;
			font-size: 26rpx;
			font-weight: 900;
			text-align: center;
			border-radius: 50rpx;
			background-color: #007aff;
		}
	}
}
</style>
