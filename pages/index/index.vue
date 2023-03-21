<template>
	<view style="height: 100vh; overflow-y: auto;">
		<view class="sticky">
			<view class="status_bar"></view>
			<view class="wx-nav">
				<view class="iconfont icon-apple-fill flex-item"></view>
				<text class="wx-nav-title flex-item">Aqqle 授权专营店</text>
				<view class="flex-item"></view>
			</view>
			<view class="search">
				<view class="current-location">
					<view class="iconfont" style="margin-right: 4rpx;font-size: 22rpx; font-weight: 900" v-show="currentCity.length">&#xe624;</view>
					{{ currentCity }}
				</view>
				<view class="search-box" @tap="toSearch">
					<view class="iconfont" style="margin-top:4rpx; color: #8f8e93;font-size: 32rpx;">&#xe62d;</view>
					<input class="search-input" type="text" placeholder="搜索在你身边的产品和服务" disabled="disabled" />
				</view>
			</view>
			<view class="iconfont slidedown">下拉查看你身边的门店&#xec0b;</view>
		</view>
		<IndexSwiper :indexSwiperDataArr="indexSwiperDataArr"></IndexSwiper>
		<view class="advertising-word">
			<view class="iconfont ">&#xe63e;在你身边</view>
			<view class="iconfont">&#xe654;小时送达</view>
		</view>
		<view style="padding: 50rpx 30rpx 0 30rpx "><Recommend :topBarArr="topBarArr"></Recommend></view>
		<OtherService :otherServiceImgArr="otherServiceImgArr"></OtherService>
		<Discount :discountImgArr="discountImgArr" :isUnique="false"></Discount>
		<Activity :activityImgArr="activityImgArr"></Activity>
		<view class="tips bg-color">
			<view class="title">Aqqle 授权，放心就在你身边</view>
			<view class="detail">
				我们的平台由 Aqqle 官方认证,欢迎
				<view style="display: inline-block; color:#499ce8;" @tap="toStop('关于我们')">前往了解</view>
				。
			</view>
			<view class="more">
				“小时送达”以顾客所选门店实际库存为准，仅限于有现货的新品。小时送达适用于部分订单，
				实际送达事件取决于门店送货距离，顾客下单时间等因素，仅限同城配送门店。不包括因顾客原因未能按时送达的情况。
			</view>
		</view>
	</view>
</template>

<script>
import IndexSwiper from '@/components/index/IndexSwiper.vue';
import Recommend from '@/components/index/Recommend.vue';
import OtherService from '@/components/index/OtherService.vue';
import Discount from '@/components/index/Discount.vue';
import Activity from '@/components/index/Activity.vue';
export default {
	data() {
		return {
			key: '90fb262cfdec4c92e6efd487be75c9b9', //高德地图相关
			amapPlugin: null, //高德地图相关
			currentCity: '',
			indexSwiperDataArr: [],
			topBarArr: [],
			otherServiceImgArr: [],
			discountImgArr: [],
			activityImgArr: [],
			userInfo: {}
		};
	},
	onLoad() {
		this.getUserInfo();
		this.amapPlugin = new this.amap.AMapWX({
			key: this.key
		});
		this.amapPlugin.getRegeo({
			success: res => {
				let cityName = res[0].regeocodeData.addressComponent.city;
				this.currentCity = cityName;
			}
		});
		this.$http
			.request({
				url: '/index_list/data'
			})
			.then(res => {
				this.indexSwiperDataArr = res.data[0].data;
				this.topBarArr = res.data[1].topBar;
				this.otherServiceImgArr = res.data[2].data;
				this.discountImgArr = res.data[3].data;
				this.activityImgArr = res.data[4].data;
			});
	},
	methods: {
		// 获取用户信息
		getUserInfo() {
			uni.getUserInfo({
				desc: '获取用户信息',
				success: res => {
					console.log(1, res);
					this.userInfo = res.userInfo;
				},
				fail: err => {
					console.log(err);
				}
			});
		},
		toSearch() {
			uni.navigateTo({
				url: '/pages/search/search?name=NearlyShopList&text=搜索在你身边的产品和服务'
			});
		},
		toStop(title) {
			uni.navigateTo({
				url: '/pages/stop/stop?title=' + title
			});
		}
	},
	components: {
		IndexSwiper,
		Recommend,
		OtherService,
		Discount,
		Activity
	}
};
</script>

<style lang="scss" scoped>
.icon-apple-fill {
	transform: rotateY(180deg);
}

.wx-nav {
	display: flex;
	justify-content: flex-start;
	.wx-nav-title {
		margin-left: 10rpx;
	}
	.flex-item {
		flex: none;
	}
}
.search {
	display: flex;
	align-items: center;
	height: 70rpx;
	background-color: #000000;
	.current-location {
		display: flex;
		align-items: center;
		color: #ffffff;
		margin-left: 30rpx;
		font-size: 22rpx;
	}
	.search-box {
		flex: 1;
		display: flex;
		align-items: center;
		height: 64rpx;
		margin: 0 30rpx;
		padding: 0 20rpx;
		border-radius: 20rpx;
		background-color: #2b2c2e;
		.search-input {
			margin: 2rpx 20rpx 0 10rpx;
			width: 100%;
			font-size: 26rpx;
			color: #8f8e93;
		}
	}
}
.slidedown {
	display: flex;
	justify-content: center;
	padding: 12rpx 0;
	letter-spacing: 6rpx;
	font-size: 16rpx;
	font-weight: 100;
	color: white;
	background-color: black;
}
.advertising-word {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 750rpx;
	height: 110rpx;
	background: linear-gradient(90deg, #499ce8, #7d5ddc);
	color: white;
	font-size: 40rpx;

	.iconfont {
		padding: 0 30rpx;
		font-size: 38rpx;
	}
	.iconfont:nth-child(1) {
		border-right: solid 2px white;
	}
}
.tips {
	padding: 30rpx 30rpx;
	.title {
		font-weight: 900;
	}
	.detail {
		margin-top: 20rpx;
		font-size: 26rpx;
	}
	.more {
		margin-top: 30rpx;
		font-size: 22rpx;
		font-weight: 100;
		color: #b5b5b5;
	}
}
</style>
