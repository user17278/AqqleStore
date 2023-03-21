<template>
	<view style="height: 100vh;overflow-y: hidden;">
		<view class="sticky">
			<view class="status_bar"></view>
			<view class="wx-nav">
				<view class="iconfont" style="margin:0rpx 10rpx; color: #ffffff;font-size: 36rpx;" @tap="toIndex()">&#xe779;</view>
				<view class="search">
					<view class="iconfont" style="margin-top:4rpx; color: #8f8e93;font-size: 32rpx;">&#xe62d;</view>
					<input class="search-input" type="text" :value="searchKey" :placeholder="currentPlaceholderText" @input="getInputlength" @confirm="finishInput" />
					<view class="iconfont" style="margin-top:4rpx; margin-right: 10rpx; color: #989898;font-size: 26rpx;" v-show="isShowDelete" @tap="deleteInput">&#xe6a6;</view>
				</view>
				<view class="flex-item"></view>
			</view>
			<NearlyShopList v-if="this.currentName.includes('NearlyShopList')"></NearlyShopList>
			<CityList v-if="this.currentName.includes('CityList')" :searchKey="searchKey" :searchHistoryArr="searchHistoryArr"></CityList>
		</view>
	</view>
</template>

<script>
import NearlyShopList from '../../components/location/NearlyShopList.vue';
import CityList from '../../components/location/CityList.vue';
export default {
	data() {
		return {
			currentPlaceholderText: '',
			currentName: '',
			searchKey: '', //输入的关键词
			searchHistoryArr: [], //搜索历史
			isShowDelete: false //是否展示删除按钮
		};
	},
	methods: {
		toIndex() {
			uni.navigateBack();
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
			uni.$emit('getSearchResult', e.detail.value);
		},
		// 删除结果
		deleteInput() {
			this.searchKey = '';
		}
	},
	onLoad(options) {
		this.currentPlaceholderText = options.text;
		this.currentName = options.name;
	},
	components: {
		NearlyShopList,
		CityList
	}
};
</script>

<style lang="scss" scoped>
.wx-nav {
	display: flex;
	align-items: center;
	padding: 36rpx 0 0 0;
	.search {
		flex: 2;
		display: flex;
		align-items: center;
		height: 64rpx;
		padding: 0 20rpx;
		border-radius: 20rpx;
		background-color: #2b2c2e;
		.search-input {
			margin: 2rpx 20rpx 0 10rpx;
			width: 100%;
			font-size: 26rpx;
			color: #8f8e93;
			.iconfont {
				display: none;
			}
			&:valid + .iconfont {
				display: block;
			}
		}
	}
}
</style>
