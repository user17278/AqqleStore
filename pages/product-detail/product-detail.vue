<template>
	<view class="product-detail bg-color" style="height: 100vh;overflow-y: auto;">
		<view class="sticky">
			<view class="status_bar"></view>
			<view class="wx-nav">
				<view class="iconfont" style="margin:0rpx 10rpx; color: #ffffff;font-size: 36rpx;" @tap="backTo()">&#xe779;</view>
				<view class="wx-nav-title">产品详情</view>
				<view class="iconfont" style="margin:0rpx 10rpx; color: transparent;font-size: 36rpx;">&#xe779;</view>
			</view>
		</view>
		<swiper class="prouct-review-swiper" :indicator-dots="true">
			<swiper-item class="swiper-item" v-for="(item, index) in productReviewArr" :key="index"><image style="width: 100%;" :src="item" mode="widthFix"></image></swiper-item>
		</swiper>
		<scroll-view scroll-y="true">
			<view class="product-message">
				<view class="buy-tips">新款，每位顾客限购 2 部</view>
				<view class="product-name">{{ name }}</view>
				<view class="product-choose" @tap="toBuyPage()">
					<view class="choose-type">
						选择规格：
						<view class="description">{{ name }} {{ paramsColor }} {{ paramsStorage.size }} {{ paramsConnectWay.size }}{{ paramsMacStorage.size }}</view>
					</view>
					<view class="choose-type">
						选择门店：
						<view class="description">{{ nearlyShop }}</view>
					</view>
					<view class="distance">
						<view class="iconfont">&#xe63e;</view>
						距离你 {{ distance }} km
					</view>
					<view class="iconfont jump-btn">&#xe775;</view>
				</view>
			</view>
			<view class="product-introduce"><image style="width: 100vw;" :src="introduce" mode="widthFix"></image></view>
		</scroll-view>
		<view class="buy-content">
			<view class="product-price">￥{{ add_price }}</view>
			<view class="buy-btn" @tap="toBuyPage()">前往购买</view>
		</view>
		<view class="slide-up" v-show="isShowBuyPage">
			<view class="buy-page-mask" @tap="slideUpHide" :animation="animationData2">
				<view class="buy-page" @tap.native.stop :animation="animationData1">
					<view class="line"></view>
					<scroll-view class="scroll-view-content" scroll-y="true" style="height: 80vh;">
						<view class="buy-page-header">
							<view class="buy-page-product-img"><image :src="buyPageImg" mode="widthFix" style="width: 100%;"></image></view>
							<view class="buy-page-title">{{ name }}</view>
						</view>
						<BuyPageChoose :chooseArr="colorArr" @getClickHandler="chooseColor" :activeIndex="activeIndex_color" :title="'选择外观'"></BuyPageChoose>
						<BuyPageChoose :chooseArr="storageArr" @getClickHandler="chooseStorage" :activeIndex="activeIndex_storage" :title="'选择储存容量'"></BuyPageChoose>
						<BuyPageChoose
							:chooseArr="macStorageArr"
							@getClickHandler="chooseMacStorage"
							:activeIndex="activeIndex_macStorage"
							:title="'选择芯片/内存/储存设备'"
						></BuyPageChoose>
						<BuyPageChoose :chooseArr="connectWayArr" @getClickHandler="chooseConnectWay" :activeIndex="activeIndex_connectWay" :title="'选择连接'"></BuyPageChoose>
						<view style="margin: 50rpx 30rpx 0 30rpx">
							<view style="font-size: 28rpx; font-weight: 900; margin-bottom: 20rpx;">选择门店</view>
							<NearlyShopList :nearlyShopArr="nearlyShopArr" :nearlyShopImgArr="nearlyShopImgArr" @getShopMessage="getShopMessage"></NearlyShopList>
						</view>
					</scroll-view>
				</view>
			</view>
			<view class="buy-content">
				<view class="product-price">￥{{ add_price }}</view>
				<view class="buy-btn" @tap.native.stop="toPay()">前往购买</view>
			</view>
		</view>
	</view>
</template>

<script>
import BuyPageChoose from '../../components/product-detail/BuyPageChoose.vue';
import NearlyShopList from '../../components/location/NearlyShopList.vue';

export default {
	data() {
		return {
			type: String,
			ename: String,
			date: Number,
			name: '', //商品名字
			productReviewArr: [], //商品预览图
			nearlyShop: '查找中...',
			nearlyAddress: '',
			shopLat: Number,
			shopLng: Number,
			distance: Number,
			introduce: '', //商品介绍长图
			paramsColor: '', //颜色参数
			paramsStorage: { size: '', price: 0 }, //储存参数
			paramsConnectWay: { size: '', price: 0 }, //连接方式参数
			paramsMacStorage: { size: '', price: 0 }, //mac储存参数
			price: Number,
			// 购买页
			isShowBuyPage: false,
			buyPageImg: '', //购买页预览图
			colorArr: [], //可选颜色
			activeIndex_color: 0, //颜色选择，默认第一个
			storageArr: [], //可选储存容量
			activeIndex_storage: 0, //储存容量选择，默认第一个
			storage_price: Number, //储存容量加价
			macStorageArr: [], //可选储存容量,mac
			activeIndex_macStorage: 0, //储存容量选择,mac，默认第一个
			macStorage_price: Number, //mac储存容量加价
			connectWayArr: [], //可选连接方式
			activeIndex_connectWay: 0, //连接方式选择，默认第一个
			connectWay_price: Number, //连接方式加价
			nearlyShopArr: [], //最近的授权点
			nearlyShopImgArr: [], //最近的授权点照片
			animationData1: {},
			animationData2: {},
			// 定位
			subkey: 'M7ABZ-22FH4-7URUL-XDEVT-MSXO2-3FBLZ',
			qqmapsdk: {},
			currentLatitude: Number,
			currentLongitude: Number
		};
	},
	onLoad(option) {
		const item = JSON.parse(decodeURIComponent(option.item));
		this.type = item.type;
		this.ename = item.ename;
		this.date = item.date;
		this.name = item.name;
		this.price = parseInt(item.price);
		this.getProductDetail(); //获取商品详细信息
		this.setAnimation(); //初始化动画
		(async () => {
			// 获取当前定位
			await this.getCurrentLocaiton();
			await this.getAppleShopInCurrentCity(this.currentLatitude, this.currentLongitude);
			// 购买页选择门店展示
			this.nearlyShop = this.nearlyShopArr[0].title;
			this.nearlyAddress = this.nearlyShopArr[0].address;
			this.distance = this.nearlyShopArr[0].distance;
			this.shopLat = this.nearlyShopArr[0].latitude;
			this.shopLng = this.nearlyShopArr[0].longitude;
		})();
		// 获取地图相关数据
		this.$http
			.request({
				url: '/location-list/data'
			})
			.then(res => {
				this.nearlyShopImgArr = res.data[2].imgUrl;
				this.currentLocationImg = res.data[0].imgUrl;
				this.locationImg = res.data[1].imgUrl;
			});
	},
	computed: {
		add_price() {
			var result = parseInt(this.price + this.paramsStorage.price + this.paramsMacStorage.price + this.paramsConnectWay.price);
			return result;
		}
	},
	methods: {
		// 获取选择门店
		getShopMessage(name, address, distance, shopLat, shopLng) {
			this.nearlyShop = name;
			this.nearlyAddress = address;
			this.distance = distance;
			this.shopLat = shopLat;
			this.shopLng = shopLng;
		},
		// 获取商品详细描述
		getProductDetail() {
			// 获取商品预览图，默认第一颜色
			this.$http
				.request({
					url: '/product-detail/' + this.type + '/' + this.ename + '/' + this.date,
					data: {
						ename: this.ename,
						date: this.date
					}
				})
				.then(res => {
					//当前规格
					this.paramsColor = res.data.productReview.color[0].type;
					if (res.data.productReview.storage.length) {
						this.paramsStorage.size = res.data.productReview.storage[0].size;
					}
					if (res.data.productReview.connectWay.length) {
						this.paramsConnectWay.size = res.data.productReview.connectWay[0].size;
					}
					if (res.data.productReview.macstorage.length) {
						this.paramsMacStorage.size = res.data.productReview.macstorage[0].chip;
					}
					this.productReviewArr = res.data.productReview.imgUrl; //商品预览
					this.productReviewArr.unshift(...res.data.productReview.color[0].imgUrl); //当前颜色商品预览放前几张
					this.introduce = res.data.productReview.introduce; //商品详细介绍
					// 购买页相关
					this.buyPageImg = res.data.productReview.color[0].imgUrl[0]; //购买页当前商品图片预览
					this.colorArr = res.data.productReview.color; //商品可选颜色
					this.storageArr = res.data.productReview.storage; //商品可选储存
					this.macStorageArr = res.data.productReview.macstorage; //mac可选储存
					this.connectWayArr = res.data.productReview.connectWay; //商品可选连接方式
				});
		},
		// 点击购买页按钮触发预览图更新
		updateProductReview(index) {
			// 修改预览图
			var currentProduct_color = this.colorArr[index].imgUrl;
			for (let i = 0; i < currentProduct_color.length; i++) {
				this.productReviewArr[i] = currentProduct_color[i];
			}
			// 修改购买页预览图
			this.buyPageImg = currentProduct_color[0];
		},
		backTo() {
			uni.navigateBack();
		},
		// 点击购买
		toBuyPage() {
			this.slideUpShow();
		},
		// 关闭购买页
		closeMask() {
			this.slideUpHide();
		},
		// 选择颜色
		chooseColor(index) {
			this.activeIndex_color = index;
			// 触发预览图更新
			this.updateProductReview(index);
			// 修改颜色参数
			this.paramsColor = this.colorArr[index].type;
		},
		// 选择储存容量
		chooseStorage(index) {
			this.activeIndex_storage = index;
			// 修改储存参数
			this.paramsStorage.size = this.storageArr[index].size;
			this.paramsStorage.price = this.storageArr[index].price;
		},
		// 选择储存容量,mac
		chooseMacStorage(index) {
			this.activeIndex_macStorage = index;
			// 修改mac储存参数;
			this.paramsMacStorage.size = this.macStorageArr[index].size;
			this.paramsMacStorage.price = this.macStorageArr[index].price;
		},
		// 选择连接方式
		chooseConnectWay(index) {
			this.activeIndex_connectWay = index;
			// 修改连接方式参数
			this.paramsConnectWay.size = this.connectWayArr[index].size;
			this.paramsConnectWay.price = this.connectWayArr[index].price;
		},
		// 跳转支付
		toPay() {
			uni.showModal({
				content: '即将打开“订单中心 Aqqle 授权专营店”小程序？',
				cancelText: '取消',
				cancelColor: '#7f7f7f',
				confirmText: '允许',
				confirmColor: '#007aff',
				success: res => {
					if (res.confirm) {
						uni.navigateToMiniProgram({
							appId: 'wxa78cf6bb9295673e',
							extraData: {
								goodsImg: this.buyPageImg,
								name: this.name,
								paramsColor: this.paramsColor,
								paramsStorage: this.paramsStorage.size,
								paramsConnectWay: this.paramsConnectWay.size,
								paramsMacStorage: this.paramsMacStorage.size,
								price: this.add_price,
								shop: this.nearlyShop,
								address: this.nearlyAddress,
								distance: this.distance
							}
						});
					}
				}
			});
		},
		setAnimation() {
			var animation1 = uni.createAnimation({
				duration: 200,
				timingFunction: 'ease'
			});
			this.animation1 = animation1;
			var animation2 = uni.createAnimation({
				duration: 200,
				timingFunction: 'ease'
			});
			this.animation2 = animation2;
		},
		slideUpShow() {
			this.isShowBuyPage = true;
			this.animation1.bottom('-800rpx').step();
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
				this.isShowBuyPage = false;
			}, 200);
		},
		// 获取当前定位
		getCurrentLocaiton() {
			return new Promise((resolve, reject) => {
				this.qqmapsdk = new this.QQMapWX({ key: this.subkey });
				uni.getLocation({
					type: 'gcj02',
					success: res => {
						this.currentLatitude = res.latitude;
						this.currentLongitude = res.longitude;
						resolve();
					}
				});
			});
		},
		// 获取城市周边苹果授权店
		getAppleShopInCurrentCity(lat, lng) {
			return new Promise((resolve, reject) => {
				this.nearlyShopArr = [];
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
						resolve();
					}
				});
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
		}
	},
	components: {
		BuyPageChoose,
		NearlyShopList
	}
};
</script>

<style lang="scss" scoped>
.prouct-review-swiper {
	height: 43vh;
	.swiper-item {
		display: flex;
		justify-content: center;
	}
}

.product-message {
	padding: 30rpx;
	.buy-tips {
		font-size: 18rpx;
		font-weight: 900;
		color: #ff9722;
	}
	.product-name {
		font-size: 38rpx;
		font-weight: 900;
	}
	.product-choose {
		position: relative;
		margin-top: 20rpx;
		padding: 20rpx;
		border-radius: 20rpx;
		background-color: #ffffff;
		.choose-type {
			display: flex;
			margin-bottom: 20rpx;
			font-size: 24rpx;
			color: #929292;
			.description {
				width: 480rpx;
				font-size: 24rpx;
				color: #000000;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
		.distance {
			display: flex;
			align-items: center;
			margin-left: 120rpx;
			font-size: 22rpx;
			.iconfont {
				font-size: 22rpx;
			}
		}
		.jump-btn {
			position: absolute;
			top: 50%;
			right: 10rpx;
			transform: translate(-50%, -50%);
			font-size: 22rpx;
			color: #929292;
		}
	}
}
.buy-content {
	display: flex;
	align-items: center;
	position: fixed;
	bottom: 0;
	width: 100vw;
	height: 200rpx;
	border-top: solid 1rpx #c9c9cb;
	background-color: #ffffff;
	z-index: 999;
	.product-price {
		flex: 1;
		text-align: center;
		font-size: 40rpx;
		font-weight: 900;
	}
	.buy-btn {
		flex: 2;
		display: inline-block;
		text-align: center;
		margin: 0 50rpx;
		padding: 20rpx 0rpx;
		border-radius: 50rpx;
		background-color: #007aff;
		color: #ffffff;
		font-size: 28rpx;
		font-weight: 900;
	}
}
.slide-up {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	z-index: 999;
}
.buy-page-mask {
	position: absolute;
	bottom: 0;
	width: 100vw;
	height: 100vh;
	z-index: 998;
	background-color: rgba(0, 0, 0, 0.5);
}
.buy-page {
	position: absolute;
	bottom: -800rpx;
	width: 100vw;
	height: 80vh;
	border-radius: 30rpx;
	background-color: #f5f5f7;
	box-sizing: border-box;
	.line {
		width: 80rpx;
		height: 8rpx;
		margin: 16rpx auto 30rpx auto;
		border-radius: 30rpx;
		background-color: #c0c0c0;
	}
}
.scroll-view-content {
	height: 100vh;
	box-sizing: border-box;
}
.buy-page-header {
	display: flex;
	align-items: center;
	margin: 30rpx 30rpx;
	.buy-page-product-img {
		display: flex;
		align-items: center;
		width: 150rpx;
		height: 150rpx;
		background-color: #ffffff;
		border-radius: 20rpx;
	}
	.buy-page-title {
		margin-left: 20rpx;
		font-size: 36rpx;
		font-weight: 900;
	}
}
</style>
