<template>
	<view class="buy-page-choose" v-if="chooseArr.length">
		<view class="buy-page-choose-titie">{{ title }}</view>
		<view class="choose-btn-content">
			<view
				v-if="title == '选择外观'"
				class="choose-btn"
				v-for="(item, index) in chooseArr"
				:key="index"
				@tap="clickBtn(index)"
				:style="{ boxShadow: activeIndex === index ? '0px 0px 2rpx 2rpx #007aff' : 'none' }"
			>
				<view class="color-review" :style="{ backgroundColor: item.rgb }"></view>
				{{ item.type }}
			</view>
			<view
				v-if="title == '选择储存容量' || title == '选择连接'"
				class="choose-btn"
				v-for="(item, index) in chooseArr"
				:key="index"
				@tap="clickBtn(index)"
				:style="{ boxShadow: activeIndex === index ? '0px 0px 2rpx 2rpx #007aff' : 'none' }"
			>
				{{ item.size }}
			</view>
			<view
				v-if="title == '选择芯片/内存/储存设备'"
				class="choose-btn-mac"
				v-for="(item, index) in chooseArr"
				:key="index"
				@tap="clickBtn(index)"
				:style="{ boxShadow: activeIndex === index ? '0px 0px 2rpx 2rpx #007aff' : 'none' }"
			>
				<view style="font-weight: 900;">{{ item.chip }}</view>
				<view>{{ item.des1 }}</view>
				<view>{{ item.des2 }}</view>
				<view style="margin-top: 20rpx;" v-if="item.neicun">{{ item.neicun }}</view>
				<view>{{ item.storage }}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: ['chooseArr', 'activeIndex', 'title'],
	data() {
		return {};
	},
	methods: {
		clickBtn(index, price) {
			this.$emit('getClickHandler', index, price);
		}
	}
};
</script>

<style lang="scss" scoped>
.buy-page-choose {
	margin: 50rpx 30rpx 0rpx 30rpx;
	.buy-page-choose-titie {
		font-size: 28rpx;
		font-weight: 900;
	}
}

.choose-btn-content {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin-top: 20rpx;
	.choose-btn {
		display: flex;
		justify-content: center;
		padding: 22rpx 0;
		margin-bottom: 20rpx;
		width: 216rpx;
		border-radius: 20rpx;
		background-color: #ffffff;
		font-size: 24rpx;
		font-weight: 500;
		.color-review {
			margin-right: 10rpx;
			width: 30rpx;
			height: 30rpx;
			border-radius: 30rpx;
		}
	}
	.choose-btn-mac {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 22rpx 0;
		margin-bottom: 20rpx;
		width: 216rpx;
		border-radius: 20rpx;
		background-color: #ffffff;
		font-size: 22rpx;
		font-weight: 500;
		.color-review {
			margin-right: 10rpx;
			width: 30rpx;
			height: 30rpx;
			border-radius: 30rpx;
		}
	}
}
.choose-btn-content::after {
	content: '';
	width: 216rpx;
	height: 0rpx;
	visibility: hidden;
}
</style>
