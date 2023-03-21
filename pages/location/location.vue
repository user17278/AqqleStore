<template>
	<view style="height: 100vh; overflow-y: hidden;">
		<view class="sticky">
			<view class="status_bar"></view>
			<view class="wx-nav">
				<view class="flex-item"></view>
				<text class="wx-nav-title flex-item">你身边的门店</text>
				<view class="flex-item"></view>
			</view>
		</view>
		<view class="location">
			<view class="location-search bg-color" :style="{ position: isMapShow ? 'absolute' : 'static' }">
				<view class="current-location" @tap="toSearch">
					<view class="iconfont" style="margin-right: 4rpx;font-size: 22rpx; font-weight: 900" v-show="currentCity.length">&#xe624;</view>
					{{ currentCity }}
				</view>
				<view class="search-box">
					<view class="iconfont" style="margin-top:4rpx; color: #8f8e93;font-size: 26rpx;">&#xe62d;</view>
					<input
						class="search-box-input"
						type="text"
						:value="searchKey"
						placeholder="搜索门店"
						placeholder-style="color:#8f8e93"
						@input="getInputlength"
						@confirm="finishInput"
					/>
					<view class="iconfont" style="margin-top:4rpx; margin-right: 10rpx; color: #999999;font-size: 26rpx;" v-show="isShowDelete" @tap="deleteInput">&#xe6a6;</view>
				</view>
				<view class="mode-tab" @tap="changeMode">{{ isMapShow ? '切换列表模式' : '切换地图模式' }}</view>
			</view>
			<!-- 地图模式 -->
			<view class="location-show" v-if="isMapShow">
				<view class="loading-tip" v-show="isShowLoading">{{ loadingTip }}</view>
				<swiper class="swiper-box" previous-margin="50rpx" next-margin="50rpx" @change="changeSwiper" v-if="!isShowLoading">
					<swiper-item v-for="(item, index) in nearlyShopArr" :key="index" @tap="toDetail(item, index)">
						<view class="swiper-item" :style="{ border: swiperIndex === index ? 'solid 1px #007aff' : 'none' }">
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
					</swiper-item>
				</swiper>
			</view>
			<map
				id="map"
				class="map"
				name="map"
				:style="{ height: mapHeight + 'px' }"
				:subkey="subkey"
				layer-style="1"
				:latitude="currentLatitude"
				:longitude="currentLongitude"
				:show-location="true"
				:scale="10"
				:markers="nearlyShopArr"
				@markertap="changeMarker"
				@updated="firstMarker"
				v-show="isMapShow"
			></map>
			<!-- 列表模式 -->
			<scroll-view class="list-mode-scroll-view" scroll-y="true" v-if="!isMapShow" :style="{ height: mapHeight + 'px' }">
				<NearlyShopList :nearlyShopArr="nearlyShopArr" :nearlyShopImgArr="nearlyShopImgArr" @getNearlyShopListClientHeight="getNearlyShopListClientHeight"></NearlyShopList>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import NearlyShopList from '../../components/location/NearlyShopList.vue';
export default {
	data() {
		return {
			subkey: 'M7ABZ-22FH4-7URUL-XDEVT-MSXO2-3FBLZ',
			currentLatitude: Number,
			currentLongitude: Number,
			newLatitude: Number,
			newLongitude: Number,
			currentCity: '', //当前城市
			amapPlugin: null, //高德地图相关
			qqmapsdk: {},
			nearlyShopArr: [], //最近的授权点
			stickyHeight: Number, //顶栏高度
			mapHeight: Number, //地图高度
			swiperIndex: 0, //当前滑动栏序号
			isShowLoading: true, //是否显示加载提示
			nearlyShopImgArr: [], //最近的授权点照片
			isMapShow: true, //地图列表模式切换
			loadingTip: '门店查找中...',
			isShowDelete: false, //输入框删除按钮
			searchKey: '', //输入的关键词
			clientHeight: 0, //附近授权店列表高度
			isChangeLatLng: false //检测城市是否更新
		};
	},
	onLoad() {
		// 计算导航栏状态栏高度，地图高度动态适配
		let viewSticky = uni.createSelectorQuery().select('.sticky');
		viewSticky
			.boundingClientRect(data => {
				let stickyHeight = data.height;
				uni.getSystemInfo({
					success: res => {
						this.mapHeight = res.windowHeight - stickyHeight + 20;
					}
				});
			})
			.exec();
		// 高德地图相关
		this.amapPlugin = new this.amap.AMapWX({
			key: '90fb262cfdec4c92e6efd487be75c9b9'
		});
		this.amapPlugin.getRegeo({
			success: res => {
				let cityName = res[0].regeocodeData.addressComponent.city;
				this.currentCity = cityName;
			}
		});
		// 获取当前定位
		this.getCurrentLocaiton();
		// 获取标记点图标，门店图片
		this.$http
			.request({
				url: '/location-list/data'
			})
			.then(res => {
				this.nearlyShopImgArr = res.data[2].imgUrl;
				this.currentLocationImg = res.data[0].imgUrl;
				this.locationImg = res.data[1].imgUrl;
			});
		// 监听城市更新
		this.cityLocationUpdate();
	},
	onShow() {
		if (this.nearlyShopArr.length == 0) {
			// 获取当前定位点周边授权店
			this.getAppleShopInCurrentCity(this.currentLatitude, this.currentLongitude);
		} else {
			// 获取更新后城市授权点
			this.getAppleShopInCurrentCity(this.newLatitude, this.newLongitude);
			// 标记点聚焦跟随
			this._mapContext.moveToLocation({
				longitude: this.newLongitude,
				latitude: this.newLatitude
			});
		}
	},
	onReady() {
		this._mapContext = uni.createMapContext('map', this);
	},
	onUnload() {
		uni.$off('cityLocationUpdate');
	},
	computed: {
		newLatLng() {
			const { newLatitude, newLongitude } = this;
			return { newLatitude, newLongitude };
		}
	},
	watch: {
		newLatLng: {
			handler(newVal, oldVal) {
				if (newVal != oldVal) {
					this.isChangeLatLng = true;
				} else {
					this.isChnageLatLng = false;
				}
			}
		}
	},
	methods: {
		getNearlyShopListClientHeight(height) {
			this.clientHeight = height;
		},
		// 如果城市被自定义选择，重新获取城市定位,重新聚焦
		cityLocationUpdate() {
			uni.$on('cityLocationUpdate', data => {
				// 每次更新城市重置底部滑动栏序号
				this.swiperIndex = 0;
				// 先获取新城市经纬度
				this.newLatitude = data.lat;
				this.newLongitude = data.lng;
			});
		},
		// 获取城市周边苹果授权店
		getAppleShopInCurrentCity(lat, lng) {
			if (this.isChangeLatLng) {
				this.nearlyShopArr = [];
			}
			this.qqmapsdk.search({
				keyword: 'Apple授权专营店-店',
				location: { latitude: lat, longitude: lng },
				page_size: 20,
				success: async res => {
					if (res.count == 0) {
						this.loadingTip = '暂无门店';
						this.nearlyShopArr = [{ id: 0 }];
						this.isShowLoading = true;
					} else {
						for (let i = 0; i < res.data.length; i++) {
							if (res.data[i].title.indexOf('-') == -1) {
								continue;
							}
							const distance = await this.getDistance(res.data[i].location.lat, res.data[i].location.lng);
							await this.addNearlyShopArr(res, i, distance);
						}
						this.isShowLoading = false;
					}
				}
			});
		},
		// 获取当前定位点到门店距离
		getDistance(lat, lng, title) {
			return new Promise((resolve, reject) => {
				this.qqmapsdk.calculateDistance({
					mode: 'straight',
					from: {
						latitude: this.currentLatitude,
						longitude: this.currentLongitude
					},
					to: [
						{
							latitude: lat,
							longitude: lng
						}
					],
					success: data => {
						resolve((data.result.elements[0].distance / 1000).toFixed(2));
					}
				});
			});
		},
		// 添加授权店标记点
		addNearlyShopArr(res, i, distance) {
			var marker = {
				id: i,
				title: res.data[i].title,
				latitude: res.data[i].location.lat,
				longitude: res.data[i].location.lng,
				address: res.data[i].address,
				distance: distance,
				iconPath: this.locationImg,
				width: '40rpx',
				height: '40rpx',
				callout: {
					content: res.data[i].title,
					color: 'white',
					fontSize: '26rpx',
					borderRadius: '12rpx',
					bgColor: 'black',
					padding: '10rpx 10rpx'
				}
			};
			this.nearlyShopArr.push(marker);
		},
		// 对第一个标记点显示黑色加大
		firstMarker() {
			if (this.nearlyShopArr.length) {
				this.nearlyShopArr[this.swiperIndex].iconPath = this.currentLocationImg;
				this.nearlyShopArr[this.swiperIndex].width = '60rpx';
				this.nearlyShopArr[this.swiperIndex].height = '60rpx';
			}
		},
		// 滑动底部门店信息卡片，标记点聚焦跟随
		changeSwiper(e) {
			this.swiperIndex = e.detail.current;
			// 标记点聚焦跟随
			this._mapContext.moveToLocation({
				longitude: this.nearlyShopArr[this.swiperIndex].longitude,
				latitude: this.nearlyShopArr[this.swiperIndex].latitude
			});
			// 聚焦标记点黑色
			for (let i = 0; i < this.nearlyShopArr.length; i++) {
				if (i == this.swiperIndex) {
					this.nearlyShopArr[i].iconPath = this.currentLocationImg;
					this.nearlyShopArr[i].width = '60rpx';
					this.nearlyShopArr[i].height = '60rpx';
				} else {
					this.nearlyShopArr[i].iconPath = this.locationImg;
					this.nearlyShopArr[i].width = '40rpx';
					this.nearlyShopArr[i].height = '40rpx';
				}
			}
		},

		// 点击进入Search页面搜索城市
		toSearch() {
			uni.navigateTo({
				url: '/pages/search/search?name=CityList&text=搜索城市'
			});
		},
		// 改变显示模式 地图模式→列表模式
		changeMode() {
			this.isMapShow = !this.isMapShow;
		},
		// 获取当前定位
		getCurrentLocaiton() {
			this.qqmapsdk = new this.QQMapWX({ key: this.subkey });
			uni.getLocation({
				type: 'gcj02',
				success: res => {
					this.currentLatitude = res.latitude;
					this.currentLongitude = res.longitude;
				}
			});
		},
		// 搜索结果处理
		searchResultHandler(searchKey) {
			console.log(this.nearlyShopArr);
			for (let i = 0; i < this.nearlyShopArr.length; i++) {
				if (this.nearlyShopArr[i].title.indexOf(searchKey) >= 0) {
					continue;
				} else {
					this.nearlyShopArr.splice(i, 1);
					i--;
				}
			}
			// 输入为空时重新获取
			if (searchKey == '') {
				this.nearlyShopArr = [];
				this.getAppleShopInCurrentCity(this.currentLatitude, this.currentLongitude);
			}
		},
		getInputlength(e) {
			this.isShowDelete = true;
			this.searchKey = e.detail.value;
			if (e.detail.value.length == 0) {
				this.isShowDelete = false;
			}
		},
		// 完成输入
		finishInput(e) {
			this.searchKey = e.detail.value;
			this.searchResultHandler(this.searchKey);
		},
		// 删除结果
		deleteInput() {
			this.searchKey = '';
			this.nearlyShopArr = [];
			this.getAppleShopInCurrentCity(this.currentLatitude, this.currentLongitude);
		},
		// 点击swiper-item去往详细页
		toDetail(item, index) {
			uni.navigateTo({
				url: '/pages/nearlyShop/nearlyShop?item=' + encodeURIComponent(JSON.stringify(item)) + '&img=' + this.nearlyShopImgArr
			});
		}
	},
	components: {
		NearlyShopList
	}
};
</script>

<style lang="scss" scoped>
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
.location {
	display: flex;
	flex-direction: column;
	position: relative;
	.location-search {
		display: flex;
		align-items: center;
		position: absolute;
		width: 750rpx;
		height: 140rpx;
		z-index: 1;
		.current-location {
			display: flex;
			justify-content: center;
			align-items: center;
			flex: 1;
			color: #007aff;
			font-size: 26rpx;
		}
		.search-box {
			flex: 2.5;
			display: flex;
			align-items: center;
			padding: 6rpx 16rpx;
			border-radius: 20rpx;
			background-color: #ffffff;
			.search-box-input {
				flex: 1;
				margin: 0 26rpx 0 10rpx;
				font-size: 22rpx;
				color: #333333;
			}
		}
		.mode-tab {
			flex: 1.5;
			color: #007aff;
			font-size: 26rpx;
			text-align: center;
		}
	}
	.map {
		width: 750rpx;
	}

	.location-show {
		position: absolute;
		bottom: 0rpx;
		width: 100vw;
		z-index: 1;
		.loading-tip {
			position: fixed;
			bottom: 200rpx;
			left: 50%;
			padding: 6rpx 60rpx;
			transform: translateX(-50%);
			background-color: #000000;
			border-radius: 10rpx;
			font-size: 24rpx;
			color: #ffffff;
		}

		.swiper-box {
			height: 300rpx;
		}
	}
}
.list-mode-scroll-view {
	padding: 0 20rpx;
	box-sizing: border-box;
}
.swiper-item {
	display: flex;
	padding: 20rpx;
	margin: 0 10rpx 20rpx 10rpx;
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
