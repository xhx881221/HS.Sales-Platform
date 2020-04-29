<template>
    <div id="reportQuery">
        <contentHeader :title="$t('Function.ReportQuery')"></contentHeader>

        <div class="content">
            <el-tabs v-model="activeTable" type="card" @tab-click="changeTable">
                <el-tab-pane :label="$t('Title.Summary')" name="summary">
                    1
                </el-tab-pane>
                <el-tab-pane :label="$t('Title.OutstandingProducts')" name="outstanding"></el-tab-pane>
                <el-tab-pane :label="$t('Title.EarlyWarning')" name="poor"></el-tab-pane>
                <el-tab-pane :label="$t('Title.RegionalSales')" name="regional">
                    饼状图
                </el-tab-pane>
                <el-tab-pane :label="$t('Title.SystemSales')" name="system">
                    饼状图
                </el-tab-pane>
                <el-tab-pane :label="$t('Title.ProductSales')" name="product">
                    饼状图
                </el-tab-pane>
                <el-tab-pane :label="$t('Title.SalesCompany')" name="company">
                    饼状图
                </el-tab-pane>
                <el-tab-pane :label="$t('Title.Top20')" name="top"></el-tab-pane>
                <el-tab-pane :label="$t('Title.Last30')" name="last"></el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import contentHeader from '../components/ContentHeader.vue';
    import { userMixin } from "../mixins/userMixins";

    export default {
        name: 'reportQuery',
        mixins: [userMixin],
        components: {
            contentHeader
        },
        data () {
            return {
                activeTable: "summary"
            }
        },
        methods: {
            changeTable() {}
        }
    }
</script>

<style>
    #reportQuery .el-tabs {
        height: 100%; width: 100%;
    }

    #reportQuery .el-tabs__header {
        background-color: #ffffff;
        margin: 0;
    }

    #reportQuery .el-tabs__content {
        background-color: #ffffff;
        margin-top: 10px;
        height: calc(100% - 60px - 10px);
    }

    #reportQuery .el-tabs--card>.el-tabs__header {
        border: none;
    }

    #reportQuery .el-tabs--card>.el-tabs__header .el-tabs__nav {
        border: none;
    }

    #reportQuery .el-tabs__nav {
        padding: 10px 36px;
    }

    #reportQuery .el-tabs__nav .el-tabs__item {
        border-radius: 4px;
        margin-right: 10px;
    }

    #reportQuery .el-tabs__nav .el-tabs__item:nth-child(1) {
        color: #ffffff;
		background-color: #2B91FF;
        border: 1px solid #2B91FF;
	}

	#reportQuery .el-tabs__nav .el-tabs__item:nth-child(1):focus,
	#reportQuery .el-tabs__nav .el-tabs__item:nth-child(1):hover {
		background: #ffffff;
		color: #2B91FF;
    }
    
    #reportQuery .el-tabs__nav .el-tabs__item:nth-child(2) {
        color: #ffffff;
		background-color: #24C32F;
		border: 1px solid #24C32F;
	}

	#reportQuery .el-tabs__nav .el-tabs__item:nth-child(2):focus,
	#reportQuery .el-tabs__nav .el-tabs__item:nth-child(2):hover {
		background: #ffffff;
		border-color: #24C32F;
		color: #24C32F;
    }
    
    #reportQuery .el-tabs__nav .el-tabs__item:nth-child(3) {
        color: #ffffff;
		background-color: #AE56E6;
		border: 1px solid #AE56E6;
	}

	#reportQuery .el-tabs__nav .el-tabs__item:nth-child(3):focus,
	#reportQuery .el-tabs__nav .el-tabs__item:nth-child(3):hover {
		background: #ffffff;
		border-color: #AE56E6;
		color: #AE56E6;
    }
    
    #reportQuery .el-tabs__nav .el-tabs__item:nth-child(4) {
        color: #ffffff;
		background-color: #FB6F80;
		border: 1px solid #FB6F80;
	}

	#reportQuery .el-tabs__nav .el-tabs__item:nth-child(4):focus,
	#reportQuery .el-tabs__nav .el-tabs__item:nth-child(4):hover {
		background: #ffffff;
		border-color: #FB6F80;
		color: #FB6F80;
    }
    
    #reportQuery .el-tabs__nav .el-tabs__item:nth-child(5) {
        color: #ffffff;
		background-color: #696FDE;
		border: 1px solid #696FDE;
	}

	#reportQuery .el-tabs__nav .el-tabs__item:nth-child(5):focus,
	#reportQuery .el-tabs__nav .el-tabs__item:nth-child(5):hover {
		background: #ffffff;
		border-color: #696FDE;
		color: #696FDE;
    }
    
    #reportQuery .el-tabs__nav .el-tabs__item:nth-child(6) {
        color: #ffffff;
		background-color: #4AC7D2;
		border: 1px solid #4AC7D2;
	}

	#reportQuery .el-tabs__nav .el-tabs__item:nth-child(6):focus,
	#reportQuery .el-tabs__nav .el-tabs__item:nth-child(6):hover {
		background: #ffffff;
		border-color: #4AC7D2;
		color: #4AC7D2;
    }
    
    #reportQuery .el-tabs__nav .el-tabs__item:nth-child(7) {
        color: #ffffff;
		background-color: #F2B600;
		border: 1px solid #F2B600;
	}

	#reportQuery .el-tabs__nav .el-tabs__item:nth-child(7):focus,
	#reportQuery .el-tabs__nav .el-tabs__item:nth-child(7):hover {
		background: #ffffff;
		border-color: #F2B600;
		color: #F2B600;
    }
    
    #reportQuery .el-tabs__nav .el-tabs__item:nth-child(8) {
        color: #ffffff;
		background-color: #F5721B;
		border: 1px solid #F5721B;
	}

	#reportQuery .el-tabs__nav .el-tabs__item:nth-child(8):focus,
	#reportQuery .el-tabs__nav .el-tabs__item:nth-child(8):hover {
		background: #ffffff;
		border-color: #F5721B;
		color: #F5721B;
    }
    
    #reportQuery .el-tabs__nav .el-tabs__item:nth-child(9) {
        color: #ffffff;
		background-color: #fc7cd6;
		border: 1px solid #fc7cd6;
	}

	#reportQuery .el-tabs__nav .el-tabs__item:nth-child(9):focus,
	#reportQuery .el-tabs__nav .el-tabs__item:nth-child(9):hover {
		background: #ffffff;
		border-color: #fc7cd6;
		color: #fc7cd6;
	}
</style>

<style scoped>
    #reportQuery {
        height: 100%; width: 100%;
    }

    .content {
        padding: 10px;
        height: calc(100% - 56px - 20px);
    }
</style>>