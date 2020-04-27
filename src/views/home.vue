<template>
	<div id="home">
		<div class="app-title">
			<div>
				<img src="../assets/images/logo-home-title.png" class="align-to-text-image" style="height: 32px; width: 56px" />
				<h1>{{$t('Title.Title')}}</h1>
			</div>
			<el-button @click="signOut" class="app-title__button">{{$t("Button.SignOut")}}</el-button>
		</div>

		<el-col class="side-navigator">
			<el-menu :default-active="activeNumber" ref="navmenu" class="self-el-menu" :router="true">
				<el-menu-item v-for="route in routes" :key="route.key" :index="route.key">
					<span slot="title">
						<img width="24" height="24" class="self-el-menu__image" :src="route.url" />
						<div class="self-el-menu__span">{{route.value}}</div>
					</span>
				</el-menu-item>
			</el-menu>
		</el-col>

		<el-col class="content">
			<router-view></router-view>
		</el-col>
	</div>
</template>

<script>
	import dataEntry from "../assets/images/dataEntry.png";
	import sectorManagement from "../assets/images/sectorManagement.png";
	import areaManagement from "../assets/images/areaManagement.png";
	import userManagement from "../assets/images/userManagement.png";
	import reportQuery from "../assets/images/reportQuery.png";
	import productSettings from "../assets/images/productSettings.png";

	export default {
		name: "home",
		data() {
			return {
				routes: [{
					key: "dataEntry",
					value: this.$t("Function.DataEntry"),
					url: dataEntry
				}, {
					key: "sectorManagement",
					value: this.$t("Function.SectorManagement"),
					url: sectorManagement
				}, {
					key: "areaManagement",
					value: this.$t("Function.AreaManagement"),
					url: areaManagement
				}, {
					key: "userManagement",
					value: this.$t("Function.UserManagement"),
					url: userManagement
				}, {
					key: "reportQuery",
					value: this.$t("Function.ReportQuery"),
					url: reportQuery
				}, {
					key: "productSettings",
					value: this.$t("Function.ProductSettings"),
					url: productSettings
				}],
				activeNumber: ""
			};
		},
		methods: {
			signOut() {
				sessionStorage.clear();
				this.$router.push('login');
			}
		},
		mounted: function() {
			this.activeNumber = this.routes[0].key;
		},
		computed: {
			loading: function() {
				return this.$store.state.authorization.loading;
			}
		}
	};
</script>

<style>
	.el-menu {
		border-right: none;
		background-color: #020931;
		color: white;
	}

	.el-menu-item {
		height: calc(52px + 24px + 20px + 16px);
		padding: 20px 20px 32px 20px;
		line-height: 0;
		color: white;
		border-left: 3px solid #020931;
		border-right: 3px solid #020931;
		background-color: #020931;
	}

	.el-menu-item:hover {
		background-color: #010e1d;
	}

	.el-menu-item.is-active {
		border-left: 3px solid #4da3ff;
		color: white;
		background-color: #1F447F;
		border-right: 3px solid #1F447F;
	}

	.el-button--medium {
		padding: 10px 14px;
	}

	.el-button--primary {
		color: #ffffff;
		background-color: #4EA3FF;
		border-color: #4EA3FF;
	}

	.el-button--primary:focus,
	.el-button--primary:hover {
		background: #ffffff;
		border-color: #4EA3FF;
		color: #4EA3FF;
	}

	.el-button--success {
		color: #ffffff;
		background-color: #49BF89;
		border-color: #49BF89;
	}

	.el-button--success:focus,
	.el-button--success:hover {
		background: #ffffff;
		border-color: #49BF89;
		color: #49BF89;
	}

	.el-button--danger {
		color: #ffffff;
		background-color: #FE4F4F;
		border-color: #FE4F4F;
	}

	.el-button--danger:focus,
	.el-button--danger:hover {
		background: #ffffff;
		border-color: #FE4F4F;
		color: #FE4F4F;
	}

	.v-modal {
		left: 130px; top: 76px;
		height: calc(100% - 76px); width: calc(100% - 130px);
	}

	.el-dialog {
		border-radius: 2px;
		box-shadow: 0px 1px 2px 0px rgba(59,59,59,0.18);
	}

	.el-dialog__wrapper {
		left: 130px; top: 76px;
		height: calc(100% - 76px); width: calc(100% - 130px);
	}

	.el-dialog__header {
		padding: 16px;
		background-color: #2B91FF;
	}

	.el-dialog__title {
		font-size: 14px;
		color: #ffffff;
	}

	.el-dialog__headerbtn .el-dialog__close {
		color: #ffffff;
	}

	.el-dialog__body {
		padding: 64px 0 34px 0;
	}

	.el-dialog__footer {
		padding: 0;
	}
</style>

<style scoped>
	#home {
		width: 100%;
		height: 100%;
	}

	.app-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #2B91FF;
		color: #ffffff;
		height: 76px;
	}

	.app-title h1, p {
		display: inline-block;
	}

	.app-title h1 {
		vertical-align: middle;
		line-height: 76px;
		font-size: 22px;
		font-weight: 500;
	}

	.align-to-text-image {
		vertical-align: middle;
		margin: 0px 8px 0px 30px;
	}

	.app-title__button {
		margin-right: 20px;
	}

	.side-navigator {
		color: white;
		font-size: 14px;
		background-color: #020931;
		width: 130px;
		height: calc(100% - 76px);
	}

	.self-el-menu__image {
		display: block;
		margin: 0 auto;
		padding-bottom: 20px;
	}

	.self-el-menu__span {
		line-height: 16px;
		text-align: center;
	}

	.content {
		width: calc(100% - 130px);
		height: calc(100% - 76px);
		overflow: hidden;
		background-color: #F5F6F9;
	}
</style>