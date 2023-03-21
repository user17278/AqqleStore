<template>
	<view class="about-us bg-color">
		<view class="sticky">
			<view class="status_bar"></view>
			<view class="wx-nav">
				<view class="iconfont" style="margin:0rpx 10rpx; color: #ffffff;font-size: 36rpx;" @tap="backTo()">&#xe779;</view>
				<view class="title">设置</view>
				<view class="iconfont" style="margin:0rpx 10rpx; color: transparent;font-size: 36rpx;">&#xe779;</view>
			</view>
		</view>
		<view class="about-us-item" v-for="(item, index) in arr" :key="index" @tap="toDetail(index)">
			<view class="title">{{ item.title }}</view>
			<view class="iconfont">&#xe775;</view>
		</view>
		<view class="about-us-item" style="border: none;" @tap="cancelAccount"><view class="title">注销账号</view></view>
	</view>
</template>

<script>
import Use from './setting/Use.vue';
import Privacy from './setting/Privacy.vue';
export default {
	data() {
		return {
			arr: []
		};
	},
	mounted() {
		this.$http
			.request({
				url: '/my-list/data'
			})
			.then(res => {
				this.arr = res.data.setting.data;
			});
	},
	methods: {
		backTo() {
			uni.navigateBack();
		},
		toDetail(index) {
			uni.navigateTo({
				url: '/pages/detail/detail?index=setting' + index
			});
		},
		cancelAccount() {
			uni.showModal({
				content: '确定注销账号？',
				cancelText: '再想想',
				cancelColor: '#7f7f7f',
				confirmText: '现在注销',
				confirmColor: '#007aff',
				success: res => {
					if (res.confirm) {
						return;
					} else {
						return;
					}
				}
			});
		}
	},
	components: {
		Use,
		Privacy
	}
};
</script>

<style lang="scss" scoped>
.wx-nav {
	.title {
		color: #ffffff;
	}
}
.about-us-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 50rpx 30rpx;
	border-bottom: solid 1rpx #e3e3e5;
	background-color: #ffffff;
	.title {
		font-weight: 900;
	}
	.iconfont {
		color: #bfbfbf;
	}
}
</style>
