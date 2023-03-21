<template>
	<view class="recommend-card" id="recommend-card">
		<view class="banner">
			<view class="banner-content">
				<view
					class="iconfont"
					style="flex: 1; position: absolute; left: -100rpx; font-size: 100rpx; font-weight: bold; color: #8c70eb;"
					:animation="isShow ? animationIcon : animationIconHide"
				>
					&#xe654;
				</view>
				<view class="description" :animation="isShow ? animationDescription : animationDescriptionHide">
					现在下单，
					<text style="color:#8c70eb;">最快2小时</text>
					用上
					<view>你的新产品，我们开始吧！</view>
				</view>
			</view>
			<view class="tips">小时送达适用于部分订单，实际送达时间取决于门店送货距离，顾客下单时间等因素，仅限同城配送门店。</view>
		</view>
		<ProductionCard :productionCardArr="productionCardArr"></ProductionCard>
		<view class="tips">*实际供应情况取决于供应商；本页面显示官网零售价供消费者参考，实际价格以各Aqqle授权经销商门店价格为准。</view>
	</view>
</template>

<script>
import ProductionCard from '../../common/ProductionCard.vue';
export default {
	props: ['productionCardArr'],
	data() {
		return {
			isShow: true,
			animationIcon: {},
			animationIconHide: {},
			animationDescription: {}
		};
	},
	mounted() {
		var animationIcon = uni.createAnimation({
			timingFunction: 'ease'
		});
		var animationIconHide = uni.createAnimation({
			timingFunction: 'ease'
		});
		var animationDescription = uni.createAnimation({
			timingFunction: 'ease'
		});
		animationIcon
			.opacity(1)
			.left('-100rpx')
			.skewX(12)
			.step({ duration: 200 })

			.left('100rpx')
			.skewX(12)
			.step({ duration: 200 })

			.left('500rpx')
			.skewX(0)
			.step({ duration: 300 })

			.left('500rpx')
			.skewX(0)
			.step({ duration: 100 })

			.left('100rpx')
			.skewX(0)
			.step({ duration: 100 })

			.left('100rpx')
			.skewX(0)
			.step({ duration: 100, delay: 1000 });
		animationIconHide
			.opacity(0)
			.left('100rpx')
			.step({ duration: 10 })
			.opacity(0)
			.left('-100rpx')
			.step({ duration: 10 });
		animationDescription
			.opacity(1)
			.step({ duration: 10, delay: 1000 })
			.opacity(0)
			.step({ duration: 10, delay: 980 });
		this.animationIcon = animationIcon.export();
		this.animationIconHide = animationIconHide.export();
		this.animationDescription = animationDescription.export();
		var that = this;
		setInterval(() => {
			this.isShow = !this.isShow;
		}, 2000);
	},
	components: {
		ProductionCard
	}
};
</script>

<style lang="scss" scoped>
.banner {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 380rpx;
	background: linear-gradient(180deg, #ffffff 60%, rgba(125, 93, 220, 0.2));
	.banner-content {
		flex: 1;
		display: flex;
		align-items: center;
		width: 100%;
		position: relative;
		overflow: hidden;
		.description {
			position: absolute;
			left: 230rpx;
			font-weight: 900;
			opacity: 0;
		}
	}
	.tips {
		margin-bottom: 20rpx;
		color: #b3b3b3;
		font-size: 12rpx;
	}
}
.tips {
	font-size: 18rpx;
	font-weight: 100;
}
</style>
