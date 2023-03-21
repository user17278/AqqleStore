<template>
	<view class="city-list" style="height: 100vh;overflow-y: auto;">
		<scroll-view class="scroll-view-content" scroll-y="true" :scroll-into-view="scrollTopId" scroll-with-animation="true">
			<view class="tips" id="tips">
				<view class="iconfont" style="font-size: 20rpx; padding-right: 16rpx;">&#xe600;</view>
				配送服务仅限同城，请确保收货地点在所选城市内。
			</view>
			<view class="nearly-search">
				<view class="title">
					<view class="title-left">定位/最近访问</view>
					<view class="title-right" @tap="chooseCity(currentLatitude, currentLongitude, currentCity)">重新定位</view>
				</view>
				<!-- 最近访问 -->
				<view class="nearly-search-city-content">
					<view class="nearly-search-city-item iconfont" @tap="chooseCity(currentLatitude, currentLongitude, currentCity)">
						<view class="detail">
							<view class="iconfont" v-show="currentCity">&#xe60e;</view>
							{{ currentCity }}
						</view>
					</view>
					<view
						class="nearly-search-city-item iconfont"
						v-for="(item, index) in nearlySearchCityArr"
						:key="index"
						@tap="chooseCity(item.location.lat, item.location.lng, item.cityName)"
					>
						{{ item.cityName }}
					</view>
				</view>
			</view>
			<!-- 城市列表 -->
			<view class="nearly-city-list-item" :id="item.index" v-for="(item, index) in cityList" :key="index">
				<view class="nearly-city-list-item-index">{{ item.index }}</view>
				<view
					class="nearly-city-list-item-list"
					v-for="(item, _index) in cityList[index].list"
					:key="_index"
					@tap="chooseCity(item.location.lat, item.location.lng, item.cityName)"
				>
					{{ item.cityName }}
				</view>
			</view>
		</scroll-view>
		<view class="city-right-label">
			<view class="letter" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd" data-currentletter="tips" data-index="0">热门</view>
			<view
				class="letter"
				v-for="(item, index) in cityList"
				:key="index"
				@touchstart="handleTouchStart"
				@touchmove="handleTouchMove"
				@touchend="handleTouchEnd"
				:data-currentletter="item.index"
				:data-index="index + 1"
			>
				{{ item.index }}
			</view>
		</view>

		<!-- 当前触摸的字母 -->
		<view class="current-letter-show" v-if="isShowCenterTips">
			<view>{{ scrollTopId == 'tips' ? '热门' : scrollTopId }}</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			subkey: 'M7ABZ-22FH4-7URUL-XDEVT-MSXO2-3FBLZ',
			qqmapsdk: {},
			amapPlugin: null,
			nearlySearchCityArr: [],
			currentCity: '',
			currentLatitude: Number,
			currentLongitude: Number,
			cityList: [], //获取到的所有城市
			isShowCenterTips: false, //是否隐藏当前显示中间大字母提示
			scrollTopId: 'A', //滚动到当前的字母对应城市
			touches: {
				y1: Number,
				y2: Number,
				currentIndex: Number
			}, //触摸参数
			listHeight: []
		};
	},
	async mounted() {
		// 定位
		// 高德地图相关
		this.amapPlugin = new this.amap.AMapWX({
			key: '90fb262cfdec4c92e6efd487be75c9b9'
		});
		this.amapPlugin.getRegeo({
			success: res => {
				let cityName = res[0].regeocodeData.addressComponent.city;
				this.currentCity = cityName;
				this.currentLatitude = res[0].latitude;
				this.currentLongitude = res[0].longitude;
			}
		});
		await this.initCities(); //初始化城市列表
		this._calculateHeight(); //计算每栏(字母/栏)高度
		// 最近访问
		uni.getStorage({
			key: 'searchHistoryArr',
			success: res => {
				let arr = JSON.parse(res.data);
				arr.forEach((item, index) => {
					this.nearlySearchCityArr.push({
						cityName: item.cityName,
						location: {
							lat: item.location.lat,
							lng: item.location.lng
						}
					});
				}, this);
			}
		});
		// 加载搜索结果
		uni.$on('getSearchResult', searchKey => {
			this.searchResultHandler(searchKey);
		});
	},
	methods: {
		// 搜索结果处理
		searchResultHandler(searchKey) {
			for (let i = 0; i < this.cityList.length; i++) {
				let item = this.cityList[i];
				for (let j = 0; j < item.list.length; j++) {
					if (item.list[j].cityName.indexOf(searchKey) >= 0) {
						continue;
					} else {
						this.cityList[i].list.splice(j, 1);
						j--;
					}
				}
				// 检测空余首字母
				if (item.list.length == 0) {
					this.cityList.splice(i, 1);
					i--;
				}
			}
			// 当输入为空时，重新获取完整城市
			if (searchKey == '') {
				this.cityList = [];
				this.initCities();
			}
		},
		// 初始化城市列表
		initCities() {
			var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
			this.qqmapsdk = new QQMapWX({ key: this.subkey });
			var that = this;
			return new Promise((resolve, reject) => {
				//调用获取城市列表接口
				this.qqmapsdk.getCityList({
					success: res => {
						// 城市列表
						res.result[1].forEach(item => {
							var firstLetter = item.pinyin[0].substr(0, 1).toUpperCase();
							if (this.isCityList(firstLetter)) {
								for (let i = 0; i < this.cityList.length; i++) {
									if (firstLetter == this.cityList[i].index) {
										this.cityList[i].list.push({
											cityName: item.fullname,
											location: {
												lat: item.location.lat,
												lng: item.location.lng
											}
										});
										break;
									}
								}
							} else {
								this.cityList.push({
									index: firstLetter,
									list: [
										{
											cityName: item.fullname,
											location: {
												lat: item.location.lat,
												lng: item.location.lng
											}
										}
									]
								});
							}
						});
						this.cityList.sort((item1, item2) => {
							if (item1.index > item2.index) {
								return 1;
							} else {
								return -1;
							}
						});
						resolve();
					}
				});
			});
		},
		// 判断当前首字母是否已存在cityList
		isCityList(firstLetter) {
			var bStop = false;
			for (let i = 0; i < this.cityList.length; i++) {
				if (this.cityList[i].index == firstLetter) {
					bStop = true;
					break;
				}
			}
			return bStop;
		},
		// 触摸开始
		handleTouchStart(e) {
			this.isShowCenterTips = true; //中间字母提示
			this.scrollTopId = e.currentTarget.dataset.currentletter;
			// 获取距离顶部y1
			this.touches.y1 = e.touches[0].clientY;
			// 获取到当前的index,并记录在touches里 tips:0 A:1
			this.touches.currentIndex = e.currentTarget.dataset.index;
		},
		// 滑动触摸
		handleTouchMove(e) {
			this.isShowCenterTips = true; //中间字母提示
			// 获取距离顶部y2
			this.touches.y2 = e.touches[0].clientY;
			// (y2-y1)/字母高度=字母个数,
			const params = ((this.touches.y2 - this.touches.y1) / 18) | 0;
			// 加上触摸开始获取的currentIndex得到当前的序号index
			let currentIndex = parseInt(this.touches.currentIndex + params);
			if (currentIndex == 0) {
				this.scrollTopId = 'tips';
			} else if (currentIndex <= 21) {
				this.scrollTopId = this.cityList[currentIndex].index;
			}
		},
		// 触摸结束
		handleTouchEnd() {
			setTimeout(() => {
				this.isShowCenterTips = false;
			}, 800);
		},
		_calculateHeight() {
			let height = 0;
			this.listHeight.push(height);
			uni.createSelectorQuery()
				.in(this)
				.selectAll('.nearly-city-list-item')
				.boundingClientRect(data => {
					data.forEach(item => {
						height += item.height;
						this.listHeight.push(height);
					});
				})
				.exec();
		},
		// 选择城市
		chooseCity(latitude, longitude, cityName) {
			uni.navigateBack();
			uni.$emit('cityLocationUpdate', { lat: latitude, lng: longitude });
			// 保存历史
			this.addChooseCityHistory(latitude, longitude, cityName);
		},
		addChooseCityHistory(latitude, longitude, cityName) {
			let strMatch = this.nearlySearchCityArr.findIndex(item => {
				return item.cityName == cityName;
			});
			if (strMatch < 0) {
				this.nearlySearchCityArr.unshift({
					cityName: cityName,
					location: {
						lat: latitude,
						lng: longitude
					}
				});
			} else {
				this.nearlySearchCityArr.unshift(this.nearlySearchCityArr.splice(strMatch, 1)[0]);
			}
			uni.setStorage({
				key: 'searchHistoryArr',
				data: JSON.stringify(this.nearlySearchCityArr)
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.city-list {
	padding: 20rpx 30rpx;
	.city-right-label {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 30rpx;
		position: fixed;
		top: 50%;
		right: 0rpx;
		margin-top: 50rpx;
		transform: translateY(-50%);
		.letter {
			width: 90rpx;
			height: 36rpx;
			line-height: 36rpx;
			text-align: center;
			color: #888888;
			font-size: 16rpx;
		}
	}
	.current-letter-show {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 30rpx;
		position: fixed;
		top: 50%;
		right: 50%;
		transform: translate(50%, -50%);
		width: 90rpx;
		height: 50rpx;
		padding-bottom: 6rpx;
		border-radius: 10rpx;
		font-size: 26rpx;
		color: #ffffff;
		background-color: #313131;
	}
}
.scroll-view-content {
	height: 100%;
	.tips {
		display: flex;
		align-items: center;
		color: #ff8a20;
		font-size: 26rpx;
	}
	.nearly-search {
		.title {
			display: flex;
			justify-content: space-between;
			margin: 30rpx 0 28rpx 0;
			font-size: 26rpx;
			.title-right {
				color: #007aff;
			}
		}
		.nearly-search-city-content {
			.nearly-search-city-item {
				display: inline-block;
				padding: 18rpx 26rpx;
				margin: 0 20rpx 20rpx 0;
				border-radius: 50rpx;
				background-color: #ffffff;
				font-size: 26rpx;
				.detail {
					display: flex;
					align-items: center;
					.iconfont {
						margin-top: 2rpx;
						margin-right: 6rpx;
						font-size: 26rpx;
					}
				}
			}
		}
	}
	.nearly-city-list-item {
		margin-top: 60rpx;
		font-size: 30rpx;
		.nearly-city-list-item-index {
			color: #888888;
			margin-top: 20rpx;
		}
		.nearly-city-list-item-list {
			margin: 40rpx 0;
		}
	}
}
</style>
