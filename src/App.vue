<template>
	<div id="app"
		v-loading="loading"
		:element-loading-text="$t('Message.DesperatelyLoading')"
		element-loading-background="rgba(0, 0, 0, 0.05)">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app',
		computed: {
			loading: function() {
				return this.$store.state.authorization.loading;
			}
        }
	}
</script>

<style>
	@import "./styles/reset.css";
	@import "./styles/public.css";
	@import "./assets/font/font-awesome/font-awesome.css";
</style>

<style scoped>
    #app {
		width: 100%;
        height: 100%;
	}
</style>