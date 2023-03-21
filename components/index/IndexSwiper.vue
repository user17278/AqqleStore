<template>
	<view class="swiper-box">
		<swiper
			:indicator-dots="true"
			:autoplay="true"
			:interval="3000"
			:duration="500"
			circular="true"
			:style="{ background: indexSwiperDataArr.length == 0 ? '#f5f5f7' : ' linear-gradient(180deg, #000000,3% , #f5f5f7 3%)' }"
		>
			<swiper-item>
				<view class="swiper-item" @tap="toProductDetail('ipad', 'iPad(第十代)', 'ipad', '202210', '3599')">
					<view class="swiper-content">
						<view class="description" style="font-size: 22rpx; font-weight: 100; color:#58575e; margin-bottom: 10rpx;">新款</view>
						<view class="description" style="font-size: 32rpx; font-weight: 900; color:#00a9ff;">可圈</view>
						<view class="description" style="font-size: 32rpx; font-weight: 900; color:#f23bbb;">可点</view>
						<view class="description" style="font-size: 36rpx; font-weight: 900; color:#fdc000;">可画心</view>
						<view class="description iconfont" style="font-size: 36rpx; font-weight: 900; margin-bottom: 30rpx;">&#xe881;iPad</view>
						<view class="more">前往购买</view>
					</view>
					<image class="swiper-img" :src="indexSwiperDataArr[0].imgUrl" mode=""></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item" @tap="toProductDetail('iphone', 'iPhone 14 Pro', 'iphone14pro', '202209', '7999')">
					<view class="swiper-content">
						<view class="description" style="font-size: 22rpx; font-weight: 100; color:#9b99a0; margin-bottom: 10rpx;">新款</view>
						<view class="description iconfont" style="font-size: 40rpx; font-weight: 900; color: white; margin-bottom: 10rpx; ">&#xe881;iPhone14Pro</view>
						<view
							class="description"
							style="font-size: 40rpx; font-weight: 900; color:transparent; margin-bottom: 30rpx;-webkit-background-clip: text; background-image: linear-gradient(0deg,#b94cff,#ffbeff); "
						>
							强力出圈
						</view>
						<view class="more" style="color: white; border: solid 1px #ffffff; ">前往购买</view>
					</view>
					<image class="swiper-img" :src="indexSwiperDataArr[1].imgUrl" mode=""></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item" @tap="toProductDetail('ipad', 'iPad Pro 11', 'ipadpro11', '202210', '6799')">
					<view class="swiper-content">
						<view class="description" style="font-size: 22rpx; font-weight: 100; color:#9b99a0; margin-bottom: 10rpx;">新款</view>
						<view class="description iconfont" style="font-size: 40rpx; font-weight: 900; margin-bottom: 10rpx;color: white;">&#xe881;iPadPro</view>
						<view
							class="description"
							style="font-size: 40rpx; font-weight: 900; color:transparent;-webkit-background-clip: text; background-image: linear-gradient(90deg,#ca01ff,#ff0188,#ff9304); margin-bottom: 30rpx;"
						>
							由 M2 强势驱动
						</view>
						<view class="more" style="color: white; border: solid 1px #ffffff; ">前往购买</view>
					</view>
					<image class="swiper-img" :src="indexSwiperDataArr[2].imgUrl" mode=""></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item" @tap="toProductDetail('watch', 'Apple Watch Series 8 (GPS) 铝合金表壳', 'watch-ultra', '202209', '6299')">
					<view class="swiper-content" style="top:55%;">
						<view class="description" style="font-size: 22rpx; font-weight: 100; color:#9b99a0; margin-bottom: 10rpx;">新款</view>
						<view class="description iconfont" style="font-size: 40rpx; font-weight: 900; margin-bottom: 2rpx; color: white;">&#xe881;WATCH</view>
						<view class="description" style="font-size: 20rpx; font-weight: 900; color:#ff040f;letter-spacing: 2rpx;margin-bottom: 30rpx;">SERIES 8</view>
						<view class="description" style="font-size: 46rpx; font-weight: 900; color:#white;margin-bottom: 50rpx; color: white;">健康的一大步</view>
						<view class="more" style="color: white; border: solid 1px #ffffff; ">前往购买</view>
					</view>
					<image class="swiper-img" :src="indexSwiperDataArr[3].imgUrl" mode=""></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item" @tap="toProductDetail('iphone', 'iPhone 14', 'iphone14', '202209', '5999')">
					<view class="swiper-content">
						<view class="description" style="font-size: 22rpx; font-weight: 100; color:#58575e; margin-bottom: 10rpx;">新款</view>
						<view class="description iconfont" style="font-size: 40rpx; font-weight: 700; margin-bottom: 10rpx;">&#xe881;iPhone14</view>
						<view
							class="description"
							style="font-size: 46rpx; font-weight: 900; color:transparent;-webkit-background-clip: text; background-image: linear-gradient(90deg,#2ea1ba,#a673db,#f13240);margin-bottom: 30rpx;"
						>
							玩大玩超大
						</view>
						<view class="more">前往购买</view>
					</view>
					<image class="swiper-img" :src="indexSwiperDataArr[4].imgUrl" mode=""></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item" @tap="toProductDetail('watch', 'Apple Watch Ultra 高山回环式表带 (GPS + 蜂窝网络)', 'watch-s8', '202209', '6299')">
					<view class="swiper-content">
						<view class="description" style="font-size: 22rpx; font-weight: 100; color:#9b99a0; margin-bottom: 10rpx;">新款</view>
						<view class="description iconfont" style="font-size: 40rpx; font-weight: 900; color: black;">&#xe881;WATCH</view>
						<view class="description" style="font-size: 20rpx; font-weight: 900; color:#ff7430;letter-spacing: 2rpx;">Ultra</view>
						<view class="description" style="font-size: 46rpx; font-weight: 900; color:#white; color: black; margin-bottom: 30rpx;">越野越心驰</view>
						<view class="more">前往购买</view>
					</view>
					<image class="swiper-img" :src="indexSwiperDataArr[5].imgUrl" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
export default {
	props: ['indexSwiperDataArr'],
	data() {
		return {};
	},
	methods: {
		toProductDetail(type, name, ename, date, price) {
			let item = {
				type: type,
				name: name,
				ename: ename,
				date: date,
				price: price
			};
			uni.navigateTo({
				url: '/pages/product-detail/product-detail?item=' + encodeURIComponent(JSON.stringify(item))
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.swiper-box {
	background-color: black;
}
swiper {
	height: 1050rpx;
	overflow: hidden;
	padding-bottom: 50rpx;
	border-radius: 30rpx 30rpx 0 0;
}
.swiper-item {
	position: relative;
	.swiper-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		top: 5%;
		left: 50%;
		transform: translateX(-50%);
		.more {
			padding: 6rpx 26rpx;
			border-radius: 50rpx;
			color: #4b4b4f;
			border: solid 1px #575758;
			font-size: 26rpx;
		}
	}
	.swiper-img {
		width: 800rpx;
		height: 1000rpx;
	}
}
</style>
