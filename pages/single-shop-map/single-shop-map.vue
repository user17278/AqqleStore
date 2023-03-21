<template>
	<view>
		<view class="map-content">
			<map
				id="map"
				class="map"
				name="map"
				:style="{ height: mapHeight + 'px' }"
				:subkey="subkey"
				layer-style="2"
				:latitude="shopLatitude"
				:longitude="shopLongitude"
				:show-location="true"
				:scale="15"
				:markers="covers"
			></map>
			<view class="my-location" @tap="getLocation"><view class="iconfont">&#xe8e4;</view></view>
		</view>
		<view class="content">
			<view class="detail">
				<view style="font-size: 32rpx; line-height: 46rpx; padding-right: 20rpx;">{{ name }}</view>
				<view style="margin-top:10rpx;font-size: 26rpx; line-height: 32rpx;">{{ address }}</view>
			</view>
			<view class="go-btn"><image style="width: 80rpx;" src="http://localhost:3000/images/location/go.png" mode="widthFix"></image></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			subkey: 'M7ABZ-22FH4-7URUL-XDEVT-MSXO2-3FBLZ',
			shopLatitude: '',
			shopLongitude: '',
			name: '',
			address: '',
			covers: [
				{
					id: 1,
					latitude: '',
					longitude: '',
					width: '60rpx',
					height: '60rpx',
					iconPath: 'http://localhost:3000/images/location/map-pin.png'
				}
			]
		};
	},
	onLoad(option) {
		this.shopLatitude = option.lat;
		this.covers[0].latitude = option.lat;
		this.shopLongitude = option.lng;
		this.covers[0].longitude = option.lng;
		this.name = option.name;
		this.address = option.address;
	},
	onReady() {
		this._mapContext = uni.createMapContext('map', this);
	},
	methods: {
		getLocation() {
			this.qqmapsdk = new this.QQMapWX({ key: this.subkey });
			uni.getLocation({
				type: 'gcj02',
				success: res => {
					this._mapContext.moveToLocation({
						longitude: res.longitude,
						latitude: res.latitude
					});
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.map-content {
	position: relative;
	width: 100vw;
	height: 80vh;
	.map {
		width: 100%;
		height: 100%;
	}
	.my-location {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		right: 50rpx;
		bottom: 80rpx;
		width: 90rpx;
		height: 90rpx;
		box-shadow: rgba(0, 0, 0, 0.2) 0rpx 0rpx 20rpx 0rpx;
		border-radius: 50rpx;
		background-color: #ffffff;
		.iconfont {
			font-size: 50rpx;
		}
	}
}

.content {
	display: flex;
	height: 20vh;
	padding: 30rpx;
	box-sizing: border-box;
	.detail {
		flex: 2.1;
	}
	.go-btn {
		flex: 1;
		display: flex;
		justify-content: flex-end;
	}
}
</style>
