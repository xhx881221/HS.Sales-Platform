<template>
    <div id="userManagement">
        <contentHeader :title="$t('Function.UserManagement')"></contentHeader>

        <div class="content">
            <div class="content__operator">
                <el-button type="primary" @click="addUser" size="medium" icon="el-icon-circle-plus-outline" round>{{$t("Button.Add")}}</el-button><!--
                --><el-button type="success" @click="editUser" :disabled="multipleSelection.length !== 1" size="medium" icon="el-icon-edit-outline" round>{{$t("Button.Edit")}}</el-button><!--
                --><el-button type="warning" @click="settingArea" :disabled="multipleSelection.length !== 1" size="medium" icon="el-icon-map-location" round>{{$t("Button.SettingArea")}}</el-button><!--
                --><el-button type="danger" @click="deleteUser" :disabled="multipleSelection.length === 0" size="medium" icon="el-icon-circle-close" round>{{$t("Button.Delete")}}</el-button>
            </div>

            <el-table
                ref="usersTableData"
                :data="tableData"
                border
                :header-cell-style="tableHeaderCellStyle"
                :cell-style="tableCellStyle"
                @selection-change="handleSelectionChange"
                @row-click="selectUser">
                <el-table-column type="selection" width="45" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                <el-table-column prop="name" :label="$t('Table.FullName')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
            </el-table>

            <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="pagination.currentPage"
                :page-size="pagination.pageSize"
                layout="prev, pager, next, total, jumper"
                :total="pagination.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import contentHeader from '../components/ContentHeader.vue';
    import { userMixin } from "../mixins/userMixins";

    export default {
        name: 'userManagement',
        mixins: [userMixin],
        components: {
            contentHeader
        },

    }
</script>

<style scoped>
    .content {
        padding: 24px 32px;
        height: calc(100% - 56px - 48px);
    }

    .el-button+.el-button {
        margin-left: 0px;
    }

    .content__operator {
        margin-bottom: 22px;
    }

    .content__operator .el-button {
        margin-right: 16px;
    }

    .content__operator:last-child {
        margin-right: 0;
    }
</style>>