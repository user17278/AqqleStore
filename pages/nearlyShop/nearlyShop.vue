<template>
	<view class="nearly-shop bg-color" style="height: 100vh; overflow: auto;">
		<view class="sticky">
			<view class="status_bar"></view>
			<view class="wx-nav">
				<view class="iconfont" style="margin:0rpx 10rpx; color: #ffffff;font-size: 36rpx;" @tap="backTo()">&#xe779;</view>
				<view class="title">你身边的门店</view>
				<view class="iconfont" style="margin:0rpx 10rpx; color: transparent;font-size: 36rpx;">&#xe779;</view>
			</view>
		</view>
		<scroll-view class="nearly-shop-scroll-view" scroll-y="true" show-scrollbar="false">
			<view class="modal-mask" v-if="isShowMask" @tap.native.stop="closeModal()">
				<view class="modal-content" @tap.native.stop>
					<view class="modal-content-title">
						<image style="width: 20%;" src="http://localhost:3000/images/modal/kb-get-support-icon-person-2-fill.png" mode="widthFix"></image>
						<view style="margin-top: 6rpx;">“添加我的企业微信，</view>
						<view>让我为你提供专属服务吧。”</view>
					</view>
					<view class="code">
						<view style="font-size: 20rpx;">长按添加二维码</view>
						<image style="width:300rpx ;height:300rpx;margin-top: 30rpx;" src="http://localhost:3000/images/stop-page/stop2.png" mode=""></image>
						<view style="font-size: 30rpx; margin-top: 30rpx;">Aqqle授权专营店</view>
						<view style="font-size: 26rpx;margin-top: 10rpx; color: #f98a43; text-align: center;">{{ shopName }} 门店顾问</view>
					</view>
					<view class="close-btn" @tap="closeModal()"><view class="iconfont" style="color: #929292; font-size: 50rpx;">&#xe611;</view></view>
				</view>
			</view>
			<view class="nearly-shop-img"><image src="http://localhost:3000/images/location/R577.png" mode="widthFix" style="width: 100%;"></image></view>
			<view class="nearly-shop-card">
				<view style="padding: 50rpx 30rpx 20rpx 30rpx;">
					<view class="nearly-shop-detail">
						<view class="shop-name">{{ shopName }}</view>
						<view class="shop-distance">
							<view class="iconfont">&#xe63e;</view>
							离你 {{ shopDistance }} km
						</view>
						<view class="address-and-time-and-phone-and-message">
							<view class="address-and-time">
								<view class="shop-address">{{ shopAddress }}</view>
								<view class="shop-time">营业时间：周一至周日 10:00~22:00</view>
							</view>
							<view class="phone-and-message">
								<view class="iconfont" @tap="toMap">&#xe7f7;</view>
								<view class="iconfont" @tap="toPhone">&#xe787;</view>
							</view>
						</view>

						<view class="help-tips">
							<view class="description">需要帮助？门店顾问就在你身边。</view>
							<view class="get-help-btn" @tap="showModal()">
								<view class="iconfont">&#xe883;</view>
								获取帮助
							</view>
						</view>
						<view class="advertise">
							<view class="advertise-title">
								<view class="advertise-detail">
									<view class="iconfont">&#xe881;</view>
									iPad Pro
								</view>
								<view class="advertise-detail-2">现已发售</view>
							</view>
							<image class="advertise-img" src="http://localhost:3000/images/advertise/promo_ipadpro_order__upw04aj7i2qe_large.jpg" mode="heightFix"></image>
						</view>
					</view>
				</view>
				<view style="padding: 0rpx 30rpx 0 30rpx;"><Recommend :topBarArr="topBarArr" :isUnique="true"></Recommend></view>
				<Discount :discountImgArr="discountImgArr" :isUnique="true"></Discount>
				<OtherService :otherServiceImgArr="otherServiceImgArr" :isUnique="true"></OtherService>
				<view class="check-shop-qualification" @tap="toStop()">查看商家资质</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import Recommend from '@/components/index/Recommend.vue';
import OtherService from '@/components/index/OtherService.vue';
import Discount from '@/components/index/Discount.vue';
export default {
	data() {
		return {
			shopImgUrl: 'http://localhost:3000/images/location/R577.png',
			shopData: {},
			topBarArr: [],
			otherServiceImgArr: [],
			discountImgArr: [],
			isShowMask: false, //弹窗
			shopName: '',
			shopDistance: '',
			shopAddress: '',
			lat: '',
			lng: ''
		};
	},
	onLoad(option) {
		const item = JSON.parse(decodeURIComponent(option.item));
		this.shopName = item.title;
		this.shopDistance = item.distance;
		this.shopAddress = item.address;
		this.lat = item.latitude;
		this.lng = item.longitude;
		this.$http
			.request({
				url: '/index_list/data'
			})
			.then(res => {
				this.topBarArr = res.data[1].topBar;
				this.otherServiceImgArr = res.data[2].data;
				this.discountImgArr = res.data[3].data;
			});
	},
	methods: {
		backTo() {
			uni.navigateBack();
		},
		toStop() {
			uni.navigateTo({
				url: '/pages/stop/stop?title=商家资质'
			});
		},
		// 打开Modal
		showModal() {
			this.isShowMask = true;
		},
		// 点击遮罩层关闭Modal
		closeModal() {
			this.isShowMask = false;
		},
		toMap(lat, lng) {
			uni.navigateTo({
				url: '/pages/single-shop-map/single-shop-map?name=' + this.shopName + '&address=' + this.shopAddress + '&lat=' + this.lat + '&lng=' + this.lng
			});
		},
		toPhone() {
			uni.makePhoneCall({
				phoneNumber: '*********'
			});
		}
	},
	components: { Recommend, OtherService, Discount }
};
</script>

<style lang="scss" scoped>
.wx-nav {
	.title {
		color: #ffffff;
	}
}
.nearly-shop-scroll-view {
	position: relative;
	height: 100vh;
	.nearly-shop-card {
		position: absolute;
		top: 350rpx;
		width: 100%;
		height: 1000rpx;
		box-sizing: border-box;
		background-color: #f5f5f7;
		border-radius: 30rpx;
		.nearly-shop-detail {
			.shop-name {
				font-size: 30rpx;
				font-weight: 900;
			}
			.shop-distance {
				display: flex;
				align-items: center;
				margin-top: 50rpx;
				font-size: 22rpx;
				.iconfont {
					margin-right: 6rpx;
					font-size: 24rpx;
				}
			}
			.address-and-time-and-phone-and-message {
				display: flex;
				margin-top: 30rpx;
				.address-and-time {
					flex: 1;
					.shop-address {
						font-size: 26rpx;
					}
					.shop-time {
						margin-top: 10rpx;
						font-size: 22rpx;
					}
				}
				.phone-and-message {
					.iconfont {
						display: inline-block;
						margin-left: 20rpx;
						padding: 10rpx;
						border-radius: 30rpx;
						font-size: 36rpx;
						background-color: #ffffff;
						color: #007aff;
					}
				}
			}

			.help-tips {
				display: flex;
				align-items: center;
				margin-top: 30rpx;
				padding: 26rpx 20rpx;
				border-radius: 30rpx;
				background-color: #ffffff;
				.description {
					font-size: 26rpx;
					flex: 1;
				}
				.get-help-btn {
					display: inline-flex;
					padding: 10rpx 16rpx;
					border-radius: 30rpx;
					background-color: #07c160;
					font-size: 20rpx;
					color: #ffffff;
					.iconfont {
						font-size: 30rpx;
						margin-right: 6rpx;
						color: #ffffff;
					}
				}
			}
			.advertise {
				display: flex;
				align-items: center;
				position: relative;
				width: 100%;
				height: 300rpx;
				margin-top: 30rpx;
				border-radius: 30rpx;
				overflow: hidden;
				background-color: #000000;
				color: #ffffff;
				.advertise-title {
					display: flex;
					flex-direction: column;
					align-items: center;
					position: absolute;
					left: 50rpx;
					z-index: 1;
					.advertise-detail {
						display: flex;
						align-items: center;
						font-size: 40rpx;
						.iconfont {
							font-size: 40rpx;
						}
					}
					.advertise-detail-2 {
						margin-top: 20rpx;
						color: #7a797e;
						font-size: 26rpx;
					}
				}
				.advertise-img {
					position: absolute;
					width: 100%;
					height: 450rpx;
					top: -130rpx;
					left: -20rpx;
					z-index: 0;
				}
			}
		}
		.check-shop-qualification {
			padding: 70rpx 30rpx 150rpx 30rpx;
			font-size: 22rpx;
			color: #666666;
		}
	}
}
.modal-mask {
	position: fixed;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 999;
	.modal-content {
		position: absolute;
		top: 40%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 20rpx 30rpx;
		width: 600rpx;
		height: 850rpx;
		box-sizing: border-box;
		border-radius: 30rpx;
		background-color: #ffffff;
		.modal-content-title {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: 30rpx;
			font-size: 26rpx;
		}
		.code {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 500rpx;
			height: 500rpx;
			padding: 30rpx 0;
			margin: 0 auto;
			border-radius: 30rpx;
			background-color: #f7f7f7;
		}
		.close-btn {
			position: absolute;
			top: 20rpx;
			right: 30rpx;
		}
	}
}
</style>
