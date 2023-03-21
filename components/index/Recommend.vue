<template>
	<view class="recommend bg-color">
		<view class="recommend-content bg-color">
			<view class="recommend-content-title bg-color">
				<text style="font-weight: 900">{{ isUnique ? '精彩产品' : '精彩产品在你身边' }}</text>
				<scroll-view class="scroll-content" scroll-x="true" show-scrollbar="false" :scroll-into-view="scrollIntoIndex" scroll-with-animation="true">
					<view class="scroll-item" :id="'top' + index" v-for="(item, index) in topBarArr" :key="index" @tap="changeTab(index)">
						<view class="iconfont" style="font-size:38rpx;font-weight: 500;">{{ item.iconfont }}</view>
						<text :class="topBarIndex === index ? 'scroll-item-text-active' : 'scroll-item-text'">{{ item.name }}</text>
					</view>
				</scroll-view>
				<swiper @change="onChangeTab" :current="topBarIndex" :style="{ height: clientHeight + 'px' }">
					<swiper-item v-for="(item, index) in topBarArr" :key="index">
						<view :id="'home-data' + index"><RecommendCard :productionCardArr="item.productionCardArr"></RecommendCard></view>
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
import RecommendCard from './Recommend/RecommendCard.vue';
export default {
	props: ['topBarArr', 'isUnique'],
	data() {
		return {
			topBarIndex: 0, //选中的索引
			scrollIntoIndex: 'top0', //跟随索引的id值
			clientHeight: 0 //RecommendCard高度
		};
	},
	methods: {
		// 滑动分类栏
		changeTab(index) {
			if (this.topBarIndex === index) {
				return;
			}
			if (index >= 5) {
				this.scrollIntoIndex = 'top' + index;
			}
			this.topBarIndex = index;
		},
		// 跟随滑动
		onChangeTab(e) {
			this.topBarIndex = e.detail.current;
			this.changeSwiperHeight(e.detail.current);
			if (e.detail.current == 5) {
				this.scrollIntoIndex = 'top' + e.detail.current;
			}
			if (e.detail.current == 1) {
				this.scrollIntoIndex = 'top0';
			}
		},
		// swiper高度内容适配
		changeSwiperHeight(index) {
			let currentId = '#home-data' + index;
			const query = uni.createSelectorQuery().in(this);
			query
				.select(currentId)
				.boundingClientRect(data => {
					this.clientHeight = data.height;
				})
				.exec();
		}
	},
	mounted() {
		setTimeout(() => {
			const query = uni.createSelectorQuery().in(this);
			query
				.select('#home-data0')
				.boundingClientRect(data => {
					this.clientHeight = data.height;
				})
				.exec();
		}, 1000);
	},
	components: {
		RecommendCard
	}
};
</script>

<style lang="scss" scoped>
.recommend {
	padding: 50rpx 0 0 0;
	.recommend-content {
		background-color: white;
	}
	.scroll-content {
		margin: 30rpx 0 20rpx 0;
		width: 100%;
		height: 120rpx;
		line-height: 90rpx;
		border-radius: 20rpx;
		background-color: white;
		white-space: nowrap;
		.scroll-item {
			display: inline-block;
			width: 120rpx;
			height: 120rpx;
			text-align: center;
			.scroll-item-text {
				position: relative;
				font-size: 24rpx;
				bottom: 50rpx;
				font-weight: 500;
			}
			.scroll-item-text-active {
				position: relative;
				font-size: 24rpx;
				bottom: 50rpx;
				font-weight: 900;
			}
		}
	}
}
</style>
