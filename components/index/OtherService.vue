<template>
	<view class="other-service bg-color">
		<view class="other-service-title bg-color">
			<text style="font-weight: 900">{{ isUnique ? '专属服务' : '你身边的服务' }}</text>
		</view>
		<view :class="isUnique ? 'unique-other-service-card' : 'other-service-card'">
			<view class="other-service-card-item" v-for="(item, index) in content" :key="index" v-if="isUnique" @tap="toStop(item.title)">
				<view class="other-service-card-item-img"><image :src="otherServiceImgArr[index].imgUrl" mode="widthFix" style="width: 50%"></image></view>
				<view class="other-service-card-item-content">
					<view class="title">{{ item.title }}</view>
					<view class="detail" v-if="!isUnique">
						{{ item.detail }}
						<br />
						{{ item.detail_ }}
					</view>
					<view class="more" v-if="!isUnique">{{ item.more }}</view>
				</view>
			</view>
			<view class="other-service-card-item" v-for="(item, index) in content" :key="index" v-if="!isUnique" @tap="toStop(item.title)">
				<view class="other-service-card-item-img"><image :src="otherServiceImgArr[index].imgUrl" mode="aspectFit" style="width: 70%"></image></view>
				<view class="other-service-card-item-content">
					<view class="title">{{ item.title }}</view>
					<view class="detail" v-if="!isUnique">
						{{ item.detail }}
						<br />
						{{ item.detail_ }}
					</view>
					<view class="more" v-if="!isUnique">{{ item.more }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: ['otherServiceImgArr', 'isUnique'],
	data() {
		return {
			content: [
				{
					title: '数据迁移',
					detail: '快速用上新机 - 帮你设置新机，',
					detail_: '并从旧机迁移数据。',
					more: '了解更多'
				},
				{
					title: '1对1私教',
					detail: '进一步玩转设备 - 上手iphone，',
					detail_: '活用iPad，掌握macOS使用技巧',
					more: '了解更多'
				},
				{
					title: '售后服务',
					detail: '各项安心的支持 - 免费设备诊断，',
					detail_: '系统升级，维修与部件更换。',
					more: '了解更多'
				}
			]
		};
	},
	methods: {
		toStop(title) {
			uni.navigateTo({
				url: '/pages/stop/stop?title=' + title
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.other-service {
	padding: 60rpx 30rpx 0 30rpx;
	.other-service-title {
		padding-bottom: 30rpx;
	}
	.unique-other-service-card {
		display: flex;
		justify-content: space-between;
		.other-service-card-item {
			display: flex;
			flex-direction: column;
			width: 220rpx;
			height: 220rpx;
			border-radius: 30rpx;
			background-color: white;
			.other-service-card-item-img {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.other-service-card-item-content {
				position: relative;
				bottom: 20rpx;
				margin: 0 auto;
				.title {
					font-size: 26rpx;
					font-weight: 900;
				}
			}
		}
	}
	.other-service-card {
		display: flex;
		flex-direction: column;
		.other-service-card-item {
			display: flex;
			margin-bottom: 20rpx;
			height: 230rpx;
			border-radius: 30rpx;
			background-color: white;
			.other-service-card-item-img {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.other-service-card-item-content {
				flex: 3;
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				justify-content: center;
				.title {
					font-size: 30rpx;
					font-weight: 900;
				}
				.detail {
					margin: 20rpx 0;
					font-size: 22rpx;
				}
				.more {
					color: #037bff;
					font-size: 22rpx;
				}
			}
		}
	}
}
</style>
