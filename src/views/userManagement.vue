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

            <div class="search-area" @keyup.enter="search">
                <el-form :inline="true" :model="searchForm">
                    <el-form-item :label="$t('Form.FullName')">
                        <el-input v-model="searchForm.name"></el-input>
                    </el-form-item><!--

                    --><el-form-item :label="$t('Form.LoginName')">
                        <el-input v-model="searchForm.loginCode"></el-input>
                    </el-form-item><!--

                    --><el-form-item :label="$t('Form.CellPhone')">
                        <el-input v-model="searchForm.mobile"></el-input>
                    </el-form-item><!--

                    --><el-form-item>
                        <el-button type="primary" size="medium" @click="search">{{$t("Button.Inquiry")}}</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <el-table
                ref="tableData"
                :data="tableData"
                border
                :header-cell-style="tableHeaderCellStyle"
                :cell-style="tableCellStyle"
                @selection-change="handleSelectionChange"
                @row-click="selectUser">
                <el-table-column type="selection" width="45" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                <el-table-column prop="name" :label="$t('Table.FullName')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                <el-table-column prop="code" :label="$t('Table.LoginName')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                <el-table-column prop="age" :label="$t('Table.Age')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                <el-table-column prop="mail" :label="$t('Table.Mailbox')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                <el-table-column prop="qq" label="QQ" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                <el-table-column prop="mobile" :label="$t('Table.CellPhone')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
            </el-table>

            <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="pagination.currentPage"
                :page-size="pagination.pageSize"
                layout="prev, pager, next, total, jumper"
                :total="pagination.total">
            </el-pagination>
        </div>

        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :close-on-click-modal=false :before-close="closeDialog" top="248px" width="774px" class="dialog-area">
            <el-form ref="ruleForm" :rules="submitFormRules" :model="ruleForm">
                <input type="password" style="z-index: -11; position: absolute;"/>
                <el-row>
                    <el-col :span="12">
                        <el-form-item :label="$t('Form.FullName')" :label-width="labelWidth" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>

                        <el-form-item :label="$t('Form.LoginPassword')" :label-width="labelWidth" prop="pwd" v-if="dialogMode === 'Add'">
                            <el-input v-model="ruleForm.pwd" show-password></el-input>
                        </el-form-item>

                        <el-form-item :label="$t('Form.CellPhone')" :label-width="labelWidth" prop="mobile">
                            <el-input v-model="ruleForm.mobile"></el-input>
                        </el-form-item>

                        <el-form-item :label="$t('Form.Age')" :label-width="labelWidth" prop="age">
                            <el-input v-model.number="ruleForm.age"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item :label="$t('Form.LoginName')" :label-width="labelWidth" prop="code" v-if="dialogMode === 'Add'">
                            <el-input v-model="ruleForm.code"></el-input>
                        </el-form-item>

                        <el-form-item :label="$t('Form.Mailbox')" :label-width="labelWidth" prop="mail">
                            <el-input v-model="ruleForm.mail"></el-input>
                        </el-form-item>

                        <el-form-item label="QQ：" :label-width="labelWidth" prop="qq">
                            <el-input v-model="ruleForm.qq"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="save('ruleForm')">{{$t("Button.Save")}}</el-button>
            </div>
        </el-dialog>
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
        data() {
            const validate_mobile = (rule, value, callback) => {
                if (/^\d{3,4}-\d{8,}$/.test(value) || /^\d{11}$/.test(value)) {
                    callback()
                } else {
                    callback(new Error(this.$t("Message.PleaseEnterTheCorrectPhoneNumber")));
                }
            }

            const validate_age = (rule, value, callback) => {
                if (/^[1-9]\d*$/.test(value) || value === "") {
                    callback()
                } else {
                    callback(new Error(this.$t("Message.PleaseEnterTheCorrectAge")));
                }
            }

            let validate_mail = (rule, value, callback) => {
                if (value.indexOf("@") !== -1 || value === "") {
                    callback()
                } else {
                    callback(new Error(this.$t("Message.PleaseEnterTheCorrectMailBox")));
                }
            }

            const validate_qq = (rule, value, callback) => {
                if (/^[1-9][0-9]{4,}$/.test(value) || value === "") {
                    callback()
                } else {
                    callback(new Error(this.$t("Message.PleaseEnterTheCorrectQQ")));
                }
            }

            return {
                searchForm: {
                    name: "",
                    loginCode: "",
                    mobile: ""
                },
                tableData: [],
                dialogTitle: "",
                dialogVisible: false,
                dialogMode: "",
                labelWidth: "108px",
                ruleForm: {
                    id: "",
                    code: "",
                    name: "",
                    age: 0,
                    isAdmin: false,
                    mail: "",
                    qq: "",
                    mobile: "",
                    pwd: ""
                },
                submitFormRules: {
                    name: [{required: true, message: this.$t("Message.PleaseEnterTheFullName"), trigger: ['blur', 'change']}],
                    code: [{required: true, message: this.$t("Message.PleaseEnterTheLoginName"), trigger: ['blur', 'change']}],
                    pwd: [{required: true, message: this.$t("Message.PleaseEnterTheLoginPassword"), trigger: ['blur', 'change']}],
                    mobile: [{required: true, validator: validate_mobile, trigger: ['blur', 'change']}],
                    age: [{validator: validate_age, trigger: ['blur', 'change']}],
                    mail: [{validator: validate_mail, trigger: ['blur', 'change']}],
                    qq: [{validator: validate_qq, trigger: ['blur', 'change']}],
                },
            }
        },
        methods: {
            addUser() {
                this.dialogTitle = this.$t("Title.AddUser");
                this.ruleForm.id = "";
                this.ruleForm.age = "";
                this.dialogVisible = true;
                this.dialogMode = "Add";
                setTimeout(() => {
                    this.$refs.ruleForm.resetFields();
                })
            },
            editUser() {
                this.dialogTitle = this.$t("Title.EditUser");
                this.ruleForm = JSON.parse(JSON.stringify(this.multipleSelection[0]));
                this.ruleForm.age = 0 || this.ruleForm.age;
                this.dialogVisible = true;
                this.dialogMode = "Edit";
                setTimeout(() => {
                    this.$refs.ruleForm.clearValidate();
                })
            },
            save(formName) {
                let _self = this;
                let _param, _url;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _param = JSON.parse(JSON.stringify(_self.ruleForm));
                        if (_self.dialogMode === 'Add') {
                            _url = "/api/User/Add"
                        } else if (_self.dialogMode === 'Edit') {
                            _url = "/api/User/Update"
                        }

                        _self.$axios.post(_url, _param).then((response) => {
                            _self.$message({
                                message: _self.$t("Message.SuccessfullySaved"),
                                type: 'success'
                            });
                            _self.$refs[formName].resetFields();
                            _self.pagination.currentPage = 1;
                            _self.getAllUsers();
                            _self.dialogVisible = false;
                        })
                    }
                })
            },
            closeDialog(done) {
                this.$refs.ruleForm.resetFields();
                done();
            },
            selectUser(row, column) {
                this.$refs.tableData.toggleRowSelection(row);
            },
            settingArea() {},
            deleteUser() {
                let _self = this;
                this.$confirm(this.$t("Message.PleaseConfirmWhetherToDelete"), this.$t("Function.ConfirmationInformation"), {
                    distinguishCancelAndClose: true,
                    confirmButtonText: this.$t("Button.Determine"),
                    cancelButtonText: this.$t("Button.GiveUpDelete"),
                    closeOnClickModal: false,
                    closeOnPressEscape: false
                }).then(() => {
                    let _param = [];
                    this.multipleSelection.forEach((el) => { _param.push(el.id) })
                    this.$axios.post('/api/User/Delete', _param).then((response) => {
                        _self.$message({
                            message: _self.$t("Message.SuccessfullyDeleted"),
                            type: 'success'
                        });
                        _self.pagination.currentPage = 1;
                        _self.getAllUsers();
                    })
                })
            },
            search() {
                this.searchParam = {
                    name: this.searchForm.name,
                    loginCode: this.searchForm.loginCode,
                    mobile: this.searchForm.mobile,
                    page: 1,
                    pageRowCount: this.pagination.pageSize,
                };
                this.pagination.currentPage = 1;
                this.getAllUsers();
            },
            handleCurrentChange(val) {
                this.pagination.currentPage = val;
                if (this.searchParam !== "") {
                    this.searchParam.page = val;
                }
                this.getAllUsers();
            },
            getAllUsers() {
                let _self = this;
                let _param = this.searchParam === "" ? {
                    name: "",
                    loginCode: "",
                    mobile: "",
                    page: this.pagination.currentPage,
                    pageRowCount: this.pagination.pageSize
                } : this.searchParam;
                this.$axios.post('/api/User/QueryPage', _param).then((response) => {
                    _self.tableData = response.pageData.slice(0);
                    _self.pagination.total = response.totalCount;
                })
            }
        },
        mounted: function() {
            this.getAllUsers();
        }
    }
</script>

<style>
    #userManagement .search-area .el-form-item {
        margin-bottom: 14px;
    }

    #userManagement .search-area .el-form-item__content {
        margin-right: 20px;
    }

    #userManagement .dialog-area .el-form-item__content {
        margin-right: 0px;
    }

    #userManagement .dialog-area .el-dialog__body {
        padding: 34px 62px 12px 10px;
    }
</style>

<style scoped>
    #userManagement {
        height: 100%; width: 100%;
    }

    .content {
        margin: 12px 12px 20px 12px;
        padding: 24px 32px;
        height: calc(100% - 56px - 48px - 32px);
        width: calc(100% - 24px - 64px);
        background-color: #ffffff;
        box-shadow: 0px 1px 6px 0px rgba(59,59,59,0.3);
    }

    .el-button+.el-button {
        margin-left: 0px;
    }

    .content__operator {
        margin-bottom: 34px;
    }

    .content__operator .el-button {
        margin-right: 16px;
    }

    .content__operator:last-child {
        margin-right: 0;
    }

    .dialog-footer {
        text-align: center;
        padding-bottom: 28px;
    }
</style>>