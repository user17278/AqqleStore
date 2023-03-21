<template>
	<view style="height: 100vh;overflow-y: auto;">
		<Setting v-if="index == 4"></Setting>
		<Use v-if="index == 'setting0'"></Use>
		<Privacy v-if="index == 'setting1'"></Privacy>
		<AboutUs v-if="index == 5"></AboutUs>
	</view>
</template>

<script>
import AboutUs from '../../components/my/AboutUs.vue';
import Setting from '../../components/my/Setting.vue';
import Use from '../../components/my/setting/Use.vue';
import Privacy from '../../components/my/setting/Privacy.vue';
export default {
	data() {
		return {
			index: Number
		};
	},

	onLoad(option) {
		this.index = option.index;
	},
	components: {
		AboutUs,
		Setting,
		Use,
		Privacy
	}
};
</script>

<style lang="scss" scoped></style>
