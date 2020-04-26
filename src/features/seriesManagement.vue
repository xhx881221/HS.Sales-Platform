<template>
    <div id="seriesManagement">
        <contentHeader :title="sectorName" :button="gotoSector" @goback="gotoSectorManagement"></contentHeader>
        <div class="content">

            <div class="series-operate">
                <h3 class="series-operate__title">{{sectorName + $t("Message.Series")}}</h3>

                <div class="series-operate__operator">
                    <el-button type="primary" @click="addSerie" size="medium" icon="el-icon-plus">{{$t("Button.AddSerie")}}</el-button><!--
                    --><el-button type="primary" @click="deleteSerie" :disabled="serie.data && serie.data.id === ''" size="medium" icon="el-icon-close">{{$t("Button.DeleteSerie")}}</el-button><!--
                    --><el-button type="primary" @click="editSerie" :disabled="serie.data && serie.data.id === ''" size="medium" icon="el-icon-edit">{{$t("Button.EditSerie")}}</el-button>
                </div>

                <div class="series-operate__content" @click="selectSerie">
                    <el-scrollbar style="height: 100%">
                        <div v-for="_serie in series" :key="_serie.id" :class="{container: 'true', selected: serie.data && serie.data.id === _serie.id}">
                            <el-tooltip :content="_serie.name" placement="top" :disabled="_serie.name.length <= 12">
                                <div class="serie-name">{{_serie.name | omitContent(12)}}</div>
                            </el-tooltip>

                            <div style="display: none">{{_serie.id}}</div>
                        </div>
                    </el-scrollbar>
                </div>
            </div><!--

            --><div class="series-table" v-if="serie.data && serie.data.id !== ''">
                <h3 class="series-table__title">{{serie.data.name}}</h3>

                <div class="series-operate__operator">
                    <el-button type="primary" @click="addSerie" size="medium" icon="el-icon-circle-plus-outline" round>{{$t("Button.Add")}}</el-button><!--
                    --><el-button type="success" @click="editSerie" :disabled="serie.data && serie.data.id === ''" size="medium" icon="el-icon-edit-outline" round>{{$t("Button.Edit")}}</el-button><!--
                    --><el-button type="danger" @click="deleteSerie" :disabled="serie.data && serie.data.id === ''" size="medium" icon="el-icon-circle-close" round>{{$t("Button.Delete")}}</el-button>
                </div>

                <el-table
                    ref="seriesTableData"
                    :data="serie.tableData"
                    border
                    :header-cell-style="tableHeaderCellStyle"
                    @selection-change="handleSelectionChange"
                    @row-click="selectMaterial">
                    <el-table-column type="selection" width="45" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="creatorName" :label="$t('Table.Uploader')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                </el-table>

                <el-pagination
                    class="pagination"
                    @current-change="handleCurrentChange"
                    :current-page.sync="pagination.currentPage"
                    :page-size="pageSize"
                    layout="total, prev, pager, next"
                    :total="pagination.total">
                </el-pagination>
            </div>
        </div>

        <el-dialog :title="serie.dialog.title" :visible.sync="serie.dialog.visible" :close-on-click-modal=false :before-close="closeSerieDialog" top="248px" width="774px">
            <el-form ref="serieForm" :rules="serieFormRules" :model="serieForm">
                <el-form-item :label="$t('Form.SerieName')" label-width="154px" prop="name">
                    <el-input v-model="serieForm.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveSerie('serieForm')">{{$t("Button.Save")}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import contentHeader from '../components/ContentHeader.vue'

    export default {
        name: 'seriesManagement',
        components: {
            contentHeader
        },
        data() {
            return {
                sectorName: "",
                sectorId: "",
                series: [],
                serie: {
                    data: null,
                    tableData: [],
                    dialog: {
                        title: "",
                        visible: false,
                        mode: ""
                    },
                },
                serieForm: {
                    id: "",
                    plateId: "",
                    comment: "",
                    name: ""
                },
                serieFormRules: {
                    name: [{required: true, message: this.$t("Message.PleaseEnterTheName"), trigger: ['blur', 'change']}]
                },
                gotoSector: {
                    name: this.$t("Button.BackToSector")
                }
            }
        },
        methods: {
            addSerie() {
                this.serie.dialog.title = this.$t("Title.AddSerie");
                this.serieForm.plateId = this.sectorId;
                this.serie.dialog.visible = true;
                this.serie.dialog.mode = "Add";
            },
            deleteSerie() {
                let _self = this;
                this.$confirm(this.$t("Message.PleaseConfirmWhetherToDelete"), this.$t("Function.ConfirmationInformation"), {
                    distinguishCancelAndClose: true,
                    confirmButtonText: this.$t("Button.Determine"),
                    cancelButtonText: this.$t("Button.GiveUpDelete"),
                    closeOnClickModal: false,
                    closeOnPressEscape: false
                }).then(() => {
                    this.$axios.post('/api/Series/Delete', [].concat(this.serie.data.id)).then((response) => {
                        _self.$message({
                            message: _self.$t("Message.SuccessfullyDeleted"),
                            type: 'success'
                        });
                        _self.getAllSeries();
                    })
                })
            },
            editSerie() {
                this.serie.dialog.title = this.$t("Title.EditSerie");
                this.serieForm = JSON.parse(JSON.stringify(this.serie.data));
                this.serie.dialog.visible = true;
                this.serie.dialog.mode = "Edit";
            },
            saveSerie(formName) {
                let _self = this;
                let _param, _url;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _param = JSON.parse(JSON.stringify(_self.serieForm));
                        if (_self.serie.dialog.mode === 'Add') {
                            _url = "/api/Series/Add"
                        } else if (_self.serie.dialog.mode === 'Edit') {
                            _url = "/api/Series/Update"
                        }

                        _self.$axios.post(_url, _param).then((response) => {
                            _self.$message({
                                message: _self.$t("Message.SuccessfullySaved"),
                                type: 'success'
                            });
                            _self.$refs[formName].resetFields();
                            _self.getAllSeries();
                            _self.serie.dialog.visible = false;
                        })
                    }
                })
            },
            closeSerieDialog(done) {
                this.$refs.serieForm.resetFields();
                done();
            },
            selectSerie(e) {
                let el;
                if (e.target.classList.contains("container")) {
                    el = e.target;
                } else if (e.target.parentNode.classList.contains("container")) {
                    el = e.target.parentNode;
                }

                if (el) {
                    let id = el.children[el.children.length - 1].innerHTML;
                    this.serie.data = this.series.find((el) => { return el.id === id });
                }
            },
            gotoSectorManagement() {
                this.$router.push("sectorManagement");
            },
            getAllSeries() {
                let _self = this;
                this.$axios.get('/api/Series/GetByPlate', {
                    params: { plateId : this.sectorId }
                }).then((response) => {
                    _self.series = response.slice(0);
                    if (_self.series.length !== 0) {
                        _self.serie.data = JSON.parse(JSON.stringify(_self.series[0]));
                    }
                });
            }
        },
        mounted: function() {
            this.sectorName = this.$route.query.sectorName;
            this.sectorId = this.$route.query.sectorId;
            this.getAllSeries();
		}
    }
</script>

<style>
    #seriesManagement .el-scrollbar__wrap {
        overflow-x: auto;
    }

    #seriesManagement .el-form-item__content {
        margin-right: 88px;
    }
</style>

<style scoped>
    #seriesManagement {
        height: 100%; width: 100%;
    }

    .content {
        margin: 12px 12px 20px 12px;
        height: calc(100% - 32px - 56px);
        width: calc(100% - 24px);
        background-color: #ffffff;
    }

    .series-operate, .series-table {
        display: inline-block;
        background-color: #ffffff;
    }

    .series-operate {
        margin: 28px 0px 28px 0px;
        padding: 0px 40px 0px 28px;
        height: calc(100% - 56px);
        width: calc(262px - 40px - 28px);
        border-right: 1px solid #E6E6E6;
    }

    .series-operate__title, .series-table__title {
        font-size: 16px;
        font-weight: 400;
        color: #454545;
    }

    .series-operate__operator {
        margin-top: 34px;
        margin-left: 16px;
    }

    .container {
        position: relative;
        display: inline-block;
        width: 176px; height: 84px;
        border-radius: 4px;
        background-color: #ffffff;
        color: #534F71;
        cursor: pointer;
        border: 1px solid #4EA3FF;
        margin-bottom: 14px;
        box-shadow: 0px 1px 6px 0px rgba(59,59,59,0.3);
    }

    .selected {
        background-color: #4EA3FF;
        color: #ffffff;
    }

    .container:hover, .container:focus {
        background-color: #4EA3FF;
        color: #ffffff;
    }

    .container .serie-name {
        position: absolute;
        top: 50%;
        width: 100%;
        text-align: center;
        transform: translateY(-50%);
    }


    .el-button+.el-button {
        margin-left: 0;
        margin-top: 10px;
    }

    .dialog-footer {
        text-align: center;
        padding-top: 80px;
        padding-bottom: 58px;
    }

    .series-operate__content {
        margin-top: 10px;
        margin-left: 16px;
        height: calc(100% - 21px - 34px - 3 * 36px - 20px - 10px);
    }

    .series-table {
        margin: 74px 76px 20px 60px;
        height: calc(100% - 94px);
        width: calc(100% - 262px - 1px - 76px - 60px);
    }
</style>