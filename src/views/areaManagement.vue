<template>
    <div id="areaManagement">
        <contentHeader :title="$t('Function.AreaManagement')"></contentHeader>

        <el-row class="content">
            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4" class="content-left">
                <h3>{{$t("Function.AreaDetails")}}</h3>

                <div class="operate-area">
                    <el-button type="primary" @click="addArea" size="medium" icon="el-icon-plus" class="radius-button">{{$t("Button.AddArea")}}</el-button><!--
                    --><el-button type="danger" @click="deleteArea" size="medium" icon="el-icon-close" class="radius-button" :disabled="!currentDirectory">{{$t("Button.DeleteArea")}}</el-button><!--
                    --><el-button type="success" @click="editArea" size="medium" icon="el-icon-edit" class="radius-button" style="margin-left: 0; margin-top: 10px" :disabled="!currentDirectory">{{$t("Button.EditArea")}}</el-button><!--
                    --><el-button type="warning" @click="areaPlanSetting" size="medium" icon="el-icon-setting" class="radius-button" style="margin-top: 10px" :disabled="!currentDirectory">{{$t("Button.PlanSettings")}}</el-button>
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
                <h3>{{$t("Function.SalesCompanyPlanSettings")}}</h3>

                <div class="operate-area">
                    <el-button type="primary" @click="addCompany" :disabled="!currentDirectory" size="medium" icon="el-icon-circle-plus-outline" round>{{$t("Button.Add")}}</el-button><!--
                    --><el-button type="success" @click="editCompany" :disabled="!currentData" size="medium" icon="el-icon-edit-outline" round>{{$t("Button.Edit")}}</el-button><!--
                    --><el-button type="danger" @click="deleteCompany" :disabled="!currentData" size="medium" icon="el-icon-circle-close" round>{{$t("Button.Delete")}}</el-button><!--
                    --><el-button type="warning" @click="companyPlanSettings" :disabled="!currentData" size="medium" icon="el-icon-setting" round>{{$t("Button.CompanyPlanSettings")}}</el-button>
                </div>

                <el-table
                    ref="tableData"
                    :data="tableData"
                    border
                    :header-cell-style="tableHeaderCellStyle"
                    :cell-style="tableCellStyle"
                    highlight-current-row
                    @current-change="selectCompany">
                    <el-table-column prop="name" :label="$t('Table.CompanyName')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="comment" :label="$t('Table.Remarks')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                </el-table>

                <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="pagination.currentPage"
                    :page-size="pagination.pageSize"
                    layout="prev, pager, next, total, jumper"
                    :total="pagination.total">
                </el-pagination>
            </el-col>
        </el-row>

        <el-dialog :title="areaDialog.title" :visible.sync="areaDialog.visible" :close-on-click-modal=false :before-close="closeAreaDialog" top="248px" width="774px">
            <el-form ref="areaForm" :rules="submitFormRules" :model="areaForm">
                <el-form-item :label="$t('Form.AreaName')" label-width="154px" prop="name">
                    <el-input v-model="areaForm.name"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveArea('areaForm')">{{$t("Button.Save")}}</el-button>
            </div>
        </el-dialog>

        <el-dialog :title="companyDialog.title" :visible.sync="companyDialog.visible" :close-on-click-modal=false :before-close="closeCompanyDialog" top="248px" width="774px">
            <el-form ref="companyForm" :rules="submitFormRules" :model="companyForm">
                <el-form-item :label="$t('Form.CompanyName')" label-width="154px" prop="name">
                    <el-input v-model="companyForm.name"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveCompany('companyForm')">{{$t("Button.Save")}}</el-button>
            </div>
        </el-dialog>

        <el-dialog :title="planningDialog.title" :visible.sync="planningDialog.visible" :close-on-click-modal="false" :before-close="closePlanningDialog" top="248px" width="774px">
            <el-form ref="planningForm" :rules="submitFormRules" :model="planningForm">
                <el-form-item :label="$t('Form.Years')" label-width="154px" prop="year">
                    <el-date-picker
                        v-model="planningForm.year"
                        type="year"
                        :clearable="false"
                        @change="getPlan">
                    </el-date-picker>
                </el-form-item>

                <el-form-item :label="$t('Form.AmountOfTargetArea')" label-width="154px" prop="amount">
                    <el-input v-model.number="planningForm.amount"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="savePlanning('planningForm')">{{$t("Button.Save")}}</el-button>
            </div>
        </el-dialog>
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
                currentDirectory: "",
                directoryTree: [],
                currentData: "",
                tableData: [],
                areaDialog: {
                    title: "",
                    visible: false,
                    mode: ""
                },
                areaForm: {
                    id: "",
                    comment: "",
                    name: ""
                },
                companyDialog: {
                    title: "",
                    visible: false,
                    mode: ""
                },
                companyForm: {
                    id: "",
                    saleAreaId: "",
                    comment: "",
                    name: ""
                },
                planningDialog: {
                    title: "",
                    visible: false,
                    mode: ""
                },
                planningForm: {
                    objId: "",
                    year: "",
                    amount: 0
                },
            }
        },
        methods: {
            nodeClick(data) {
                this.currentData = "";
                if (data.id !== 0) {
                    this.currentDirectory = data;
                    this.getTableData();
                } else {
                    this.currentDirectory = "";
                }
            },
            addArea() {
                this.areaDialog.title = this.$t("Title.AddArea");
                this.areaForm.id = "";
                this.areaForm.name = "";
                this.areaForm.comment = "";
                this.areaDialog.visible = true;
                this.areaDialog.mode = "Add";
            },
            editArea() {
                this.areaForm = JSON.parse(JSON.stringify(this.currentDirectory));
                this.areaDialog.title = this.$t("Title.EditArea");
                this.areaDialog.visible = true;
                this.areaDialog.mode = "Edit";
            },
            deleteArea() {
                let _self = this;
                this.$confirm(this.$t("Message.PleaseConfirmWhetherToDelete"), this.$t("Function.ConfirmationInformation"), {
                    distinguishCancelAndClose: true,
                    confirmButtonText: this.$t("Button.Determine"),
                    cancelButtonText: this.$t("Button.GiveUpDelete"),
                    closeOnClickModal: false,
                    closeOnPressEscape: false
                }).then(() => {
                    this.$axios.post('/api/SaleArea/Delete', [].concat(this.currentDirectory.id)).then((response) => {
                        _self.$message({
                            message: _self.$t("Message.SuccessfullyDeleted"),
                            type: 'success'
                        });
                        _self.currentDirectory = "";
                        _self.getTree();
                        _self.tableData = [];
                    })
                })
            },
            saveArea(formName) {
                let _self = this;
                let _param, _url;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _param = JSON.parse(JSON.stringify(_self.areaForm));
                        if (_self.areaDialog.mode === 'Add') {
                            _url = "/api/SaleArea/Add"
                        } else if (_self.areaDialog.mode === 'Edit') {
                            _url = "/api/SaleArea/Update"
                        }

                        _self.$axios.post(_url, _param).then(async (response) => {
                            _self.$message({
                                message: _self.$t("Message.SuccessfullySaved"),
                                type: 'success'
                            });
                            _self.$refs[formName].resetFields();
                            await _self.getTree();
                            _self.areaDialog.visible = false;
                            setTimeout(function() {
                                _self.$refs.directoryTree.setCurrentKey(_self.currentDirectory.id);
                            });
                        })
                    }
                })
            },
            closeAreaDialog(done) {
                this.$refs.areaForm.resetFields();
                done();
            },
            async areaPlanSetting() {
                this.planningForm.objId = this.currentDirectory.id;
                this.planningForm.year = new Date();
                this.planningDialog.mode = "Area";
                await this.getPlan();
                this.planningDialog.title = this.$t("Title.AreaPlanSetting");
                this.planningDialog.visible = true;
            },
            closeDiclosePlanningDialogalog(done) {
                this.$refs.areaForm.resetFields();
                done();
            },
            savePlanning(formName) {
                let _self = this;
                let _param;
                let url = this.planningDialog.mode === "Area" ? "/api/SaleArea/SavePlan/" : "/api/Company/SavePlan/";
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _param = JSON.parse(JSON.stringify(_self.planningForm));
                        _param.year = new Date(_param.year).getFullYear();
                        _self.$axios.post(url, _param).then(async (response) => {
                            _self.$message({
                                message: _self.$t("Message.SuccessfullySaved"),
                                type: 'success'
                            });
                            _self.planningDialog.visible = false;
                        })
                    }
                })
            },
            addCompany() {
                this.companyDialog.title = this.$t("Title.AddCompany");
                this.companyForm.id = "";
                this.companyForm.name = "";
                this.companyForm.comment = "";
                this.companyForm.saleAreaId = this.currentDirectory.id;
                this.companyDialog.visible = true;
                this.companyDialog.mode = "Add";
            },
            editCompany() {
                this.companyForm = JSON.parse(JSON.stringify(this.currentData));
                this.companyDialog.title = this.$t("Title.EditCompany");
                this.companyDialog.visible = true;
                this.companyDialog.mode = "Edit";
            },
            deleteCompany() {
                let _self = this;
                this.$confirm(this.$t("Message.PleaseConfirmWhetherToDelete"), this.$t("Function.ConfirmationInformation"), {
                    distinguishCancelAndClose: true,
                    confirmButtonText: this.$t("Button.Determine"),
                    cancelButtonText: this.$t("Button.GiveUpDelete"),
                    closeOnClickModal: false,
                    closeOnPressEscape: false
                }).then(() => {
                    this.$axios.post('/api/Company/Delete', [].concat(this.currentData.id)).then((response) => {
                        _self.$message({
                            message: _self.$t("Message.SuccessfullyDeleted"),
                            type: 'success'
                        });
                        _self.currentData = "";
                        _self.getTableData();
                    })
                })
            },
            saveCompany(formName) {
                let _self = this;
                let _param, _url;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _param = JSON.parse(JSON.stringify(_self.companyForm));
                        if (_self.companyDialog.mode === 'Add') {
                            _url = "/api/Company/Add"
                        } else if (_self.companyDialog.mode === 'Edit') {
                            _url = "/api/Company/Update"
                        }

                        _self.$axios.post(_url, _param).then(async (response) => {
                            _self.$message({
                                message: _self.$t("Message.SuccessfullySaved"),
                                type: 'success'
                            });
                            _self.companyDialog.visible = false;
                            _self.currentData = "";
                            _self.getTableData();
                        })
                    }
                })
            },
            closeCompanyDialog(done) {
                this.$refs.companyForm.resetFields();
                done();
            },
            async companyPlanSettings() {
                this.planningForm.objId = this.currentData.id;
                this.planningForm.year = new Date();
                this.planningDialog.mode = "Company";
                await this.getPlan();
                this.planningDialog.title = this.$t("Title.AreaPlanSetting");
                this.planningDialog.visible = true;
            },
            selectCompany(val) {
                this.currentData = val;
            },
            handleCurrentChange(val) {
                this.pagination.currentPage = val;
                this.getTableData();
            },
            getTableData() {
                let _self = this;
                let _param = {
                    areaId: this.currentDirectory.id,
                    page: this.pagination.currentPage,
                    pageRowCount: this.pagination.pageSize
                };
                this.$axios.post('/api/Company/GetPage', _param).then((response) => {
                    _self.tableData = response.pageData.slice(0);
                    _self.pagination.total = response.totalCount;
                })
            },
            getPlan() {
                let _self = this;
                let _param = {
                    objId: this.planningForm.objId,
                    year: new Date(this.planningForm.year).getFullYear()
                };
                let url = this.planningDialog.mode === "Area" ? "/api/SaleArea/GetPlan/" : "/api/Company/GetPlan/";
                return new Promise((resolve, reject) => {
                    _self.$axios.post(url, _param).then((response) => {
                        _self.planningForm.amount = response.amount;
                        resolve();
                    }).catch((error) => {
                        reject(error);
                    })
                })
            },
            getTree() {
                let _self = this;
                this.directoryTree = [];
                return new Promise((resolve, reject) => {
                    _self.$axios.get('/api/SaleArea/GetAll/').then((response) => {
                        _self.directoryTree = [{
                            id: 0,
                            name: _self.$t("Message.AreaList")
                        }];
                        _self.directoryTree[0].children = [...response];
                        _self.tableData = [];
                        resolve();
                    }).catch((error) => {
                        reject(error);
                    })
                })
            }
        },
        mounted: function() {
            this.getTree();
        }
    }
</script>

<style>
    #areaManagement .el-icon-caret-right:before {
        color: #67B0FF;
    }

    #areaManagement .el-date-editor.el-input, #areaManagement .el-date-editor.el-input__inner {
        width: 100%;
    }
</style>

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
        margin-top: 24px;
        margin-bottom: 28px;
    }

    .dialog-footer {
        text-align: center;
        padding-top: 80px;
        padding-bottom: 58px;
    }

    .content-right {
        padding: 74px 60px 0 60px;
        height: calc(100% - 74px);
    }

    .content-right .operate-area {
        margin-top: 24px;
        margin-bottom: 22px;
    }
</style>