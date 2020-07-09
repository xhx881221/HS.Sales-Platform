<template>
    <div id="areaManagement">
        <contentHeader :title="$t('Function.AreaManagement')"></contentHeader>

        <el-row class="content">
            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" class="content-left">
                <h3>{{$t("Function.AreaDetails")}}</h3>

                <div class="operate-area">
                    <el-button type="primary" @click="addArea" size="medium" icon="el-icon-plus" class="radius-button">{{$t("Button.AddArea")}}</el-button>
                    <el-button type="danger" @click="deleteArea" size="medium" icon="el-icon-close" class="radius-button">{{$t("Button.DeleteArea")}}</el-button>
                    <el-button type="success" @click="editArea" size="medium" icon="el-icon-edit" class="radius-button">{{$t("Button.EditArea")}}</el-button>
                    <el-button type="warning" @click="planSettings" size="medium" icon="el-icon-setting" class="radius-button">{{$t("Button.PlanSettings")}}</el-button>
                </div>

                <el-tree
                    class="content-left-tree"
                    :data="directoryTree"
                    ref="directoryTree"
                    highlight-current
                    node-key="id"
                    default-expand-all
                    :props="defaultProps"
                    @node-click="nodeClick">
                </el-tree>
            </el-col>

            <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20" class="content-right">
                <el-button type="primary" @click="addUser" size="medium" icon="el-icon-circle-plus-outline" round>{{$t("Button.Add")}}</el-button><!--
                --><el-button type="success" @click="editUser" :disabled="multipleSelection.length !== 1" size="medium" icon="el-icon-edit-outline" round>{{$t("Button.Edit")}}</el-button><!--
                --><el-button type="danger" @click="deleteUser" :disabled="multipleSelection.length === 0" size="medium" icon="el-icon-circle-close" round>{{$t("Button.Delete")}}</el-button><!--
                --><el-button type="warning" @click="settingArea" :disabled="multipleSelection.length !== 1" size="medium" icon="el-icon-map-location" round>{{$t("Button.SettingArea")}}</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import contentHeader from '../components/ContentHeader.vue';
    import { userMixin } from "../mixins/userMixins";

    export default {
        name: 'areaManagement',
        mixins: [userMixin],
        components: {
            contentHeader
        },
        data () {
            return {
                defaultProps: {
                    children: "children",
                    label: "name"
                },
                directoryTree: [],
                tableData: []
            }
        },
        methods: {
            nodeClick(data) {
                this.currentDirectory = data;
                this.getTableData();
            },
            getTableData() {

            },
            getTree() {
                let _self = this;
                this.directoryTree = [];
                this.$axios.get('/api/SaleArea/GetAll/').then((response) => {
                    _self.directoryTree = [{
                        id: 0,
                        name: _self.$t("Message.AreaList")
                    }];
                    _self.directoryTree[0].children = [...response];
                    _self.tableData = [];
                })
            }
        },
        mounted: function() {
            this.getTree();
        }
    }
</script>

<style scoped>
    #areaManagement {
        height: 100%; width: 100%;
    }

    .content {
        margin: 10px;
        height: calc(100% - 56px - 20px);
        background-color: white;
    }

    .content-left {
        margin: 26px 0 26px 0;
        padding: 0 14px 0 14px;
        height: calc(100% - 52px);
        border-right: 1px solid rgba(210, 210, 210, 1);
    }

    h3 {
        font-size: 16px;
        font-weight: 400;
    }

    .content-left .operate-area {
        
    }

    .content-right {
        height: 100%;
        background-color: #666;
    }
</style>