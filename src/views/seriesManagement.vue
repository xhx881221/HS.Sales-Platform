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

            --><div class="products-table" v-if="serie.data && serie.data.id !== ''">
                <h3 class="products-table__title">{{serie.data.name}}</h3>

                <div class="products-table__operator">
                    <el-button type="primary" @click="addProduct" size="medium" icon="el-icon-circle-plus-outline" round>{{$t("Button.Add")}}</el-button><!--
                    --><el-button type="success" @click="editProduct" :disabled="multipleSelection.length !== 1" size="medium" icon="el-icon-edit-outline" round>{{$t("Button.Edit")}}</el-button><!--
                    --><el-button type="danger" @click="deleteProduct" :disabled="multipleSelection.length === 0" size="medium" icon="el-icon-circle-close" round>{{$t("Button.Delete")}}</el-button>
                </div>

                <el-table
                    ref="productsTableData"
                    :data="product.tableData"
                    border
                    :header-cell-style="tableHeaderCellStyle"
                    :cell-style="tableCellStyle"
                    @selection-change="handleSelectionChange"
                    @row-click="selectProduct">
                    <el-table-column type="selection" width="45" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="code" :label="$t('Table.ModelCode')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="name" :label="$t('Table.Name')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="price" :label="$t('Table.Price')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="unit" :label="$t('Table.Unit')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="comment" :label="$t('Table.Remarks')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
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

        <el-dialog :title="serie.dialog.title" :visible.sync="serie.dialog.visible" :close-on-click-modal=false :before-close="closeSerieDialog" top="248px" width="774px">
            <el-form ref="serieForm" :rules="submitFormRules" :model="serieForm" class="serie-form">
                <el-form-item :label="$t('Form.SerieName')" label-width="154px" prop="name">
                    <el-input v-model="serieForm.name"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveSerie('serieForm')">{{$t("Button.Save")}}</el-button>
            </div>
        </el-dialog>

        <el-dialog :title="product.dialog.title" :visible.sync="product.dialog.visible" :close-on-click-modal=false :before-close="closeProductDialog" top="248px" width="774px" class="product-form">
            <el-form ref="productForm" :rules="submitFormRules" :model="productForm">
                <el-row>
                    <el-col :span="12">
                        <el-form-item :label="$t('Form.ModelCode')" :label-width="labelWidth" prop="code">
                            <el-input v-model="productForm.code"></el-input>
                        </el-form-item>

                        <el-form-item :label="$t('Form.Price')" :label-width="labelWidth" prop="price">
                            <el-input v-model.number="productForm.price"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item :label="$t('Form.Name')" :label-width="labelWidth" prop="name">
                            <el-input v-model="productForm.name"></el-input>
                        </el-form-item>

                        <el-form-item :label="$t('Form.Unit')" :label-width="labelWidth" prop="unit">
                            <el-input v-model="productForm.unit"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-form-item :label="$t('Form.Remarks')" :label-width="labelWidth" prop="comment">
                            <el-input v-model="productForm.comment"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveProduct('productForm')">{{$t("Button.Save")}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import contentHeader from '../components/ContentHeader.vue';
    import { userMixin } from "../mixins/userMixins";

    export default {
        name: 'seriesManagement',
        mixins: [userMixin],
        components: {
            contentHeader
        },
        data() {
            return {
                labelWidth: "82px",
                sectorName: "",
                sectorId: "",
                series: [],
                serie: {
                    data: null,
                    dialog: {
                        title: "",
                        visible: false,
                        mode: ""
                    },
                },
                product: {
                    tableData: [],
                    dialog: {
                        title: "",
                        visible: false,
                        mode: ""
                    }
                },
                serieForm: {
                    id: "",
                    plateId: "",
                    comment: "",
                    name: ""
                },
                productForm: {
                    id: "",
                    seriesId: "",
                    code: "",
                    comment: "",
                    name: "",
                    price: "",
                    unit: ""
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
                this.serieForm.id = "";
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
                    this.pagination.currentPage = 1;
                    this.multipleSelection = [];
                    this.getProducts();
                }
            },
            addProduct() {
                this.product.dialog.title = this.$t("Title.Add");
                this.productForm.seriesId = this.serie.data.id;
                this.productForm.id = "";
                this.productForm.price = "";
                this.product.dialog.visible = true;
                this.product.dialog.mode = "Add";
                setTimeout(() => {
                    this.$refs.productForm.clearValidate();
                })
            },
            editProduct() {
                this.product.dialog.title = this.$t("Title.Edit");
                this.productForm = JSON.parse(JSON.stringify(this.multipleSelection[0]));
                this.product.dialog.visible = true;
                this.product.dialog.mode = "Edit";
            },
            deleteProduct() {
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
                    this.$axios.post('/api/Product/Delete', _param).then((response) => {
                        _self.$message({
                            message: _self.$t("Message.SuccessfullyDeleted"),
                            type: 'success'
                        });
                        _self.pagination.currentPage = 1;
                        _self.getProducts();
                    })
                })
            },
            saveProduct(formName) {
                let _self = this;
                let _param, _url;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _param = JSON.parse(JSON.stringify(_self.productForm));
                        if (_self.product.dialog.mode === 'Add') {
                            _url = "/api/Product/Add"
                        } else if (_self.product.dialog.mode === 'Edit') {
                            _url = "/api/Product/Update"
                        }

                        _self.$axios.post(_url, _param).then((response) => {
                            _self.$message({
                                message: _self.$t("Message.SuccessfullySaved"),
                                type: 'success'
                            });
                            _self.$refs[formName].resetFields();
                            _self.pagination.currentPage = 1;
                            _self.getProducts();
                            _self.product.dialog.visible = false;
                        })
                    }
                })
            },
            closeProductDialog(done) {
                this.$refs.productForm.resetFields();
                done();
            },
            selectProduct(row, column) {
                this.$refs.productsTableData.toggleRowSelection(row);
            },
            handleCurrentChange(val) {
                this.pagination.currentPage = val;
                this.getProducts();
            },
            gotoSectorManagement() {
                this.$router.push("sectorManagement");
            },
            getProducts() {
                let _self = this;
                let _param = {
                    seriesId: this.serie.data.id,
                    code: "",
                    name: "",
                    page: this.pagination.currentPage,
                    pageRowCount: this.pagination.pageSize
                }
                this.$axios.post('/api/Product/QueryPage', _param).then((response) => {
                    _self.product.tableData = response.pageData.slice(0);
                    _self.pagination.total = response.totalCount;
                })
            },
            getAllSeries() {
                let _self = this;
                this.$axios.get('/api/Series/GetByPlate', {
                    params: { plateId : this.sectorId }
                }).then((response) => {
                    _self.series = response.slice(0);
                    if (_self.series.length !== 0) {
                        _self.serie.data = JSON.parse(JSON.stringify(_self.series[0]));
                        _self.getProducts();
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

    .serie-form .el-form-item__content {
        margin-right: 88px;
    }

    .product-form .el-dialog__body {
		padding: 56px 80px 34px 50px;
	}
</style>

<style scoped>
    #seriesManagement {
        height: 100%; width: 100%;
    }

    .el-button+.el-button {
        margin-left: 0px;
    }

    .content {
        margin: 12px 12px 20px 12px;
        height: calc(100% - 32px - 56px);
        width: calc(100% - 24px);
        background-color: #ffffff;
        box-shadow: 0px 1px 6px 0px rgba(59,59,59,0.3);
    }

    .series-operate, .products-table {
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

    .series-operate__title, .products-table__title {
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

    .series-operate__operator .el-button {
        margin-bottom: 10px;
    }

    .series-operate__operator:last-child {
        margin-bottom: 0;
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
        vertical-align: top;
    }

    .products-table {
        margin: 74px 76px 20px 60px;
        height: calc(100% - 94px);
        width: calc(100% - 262px - 1px - 76px - 60px);
        vertical-align: top;
    }

    .products-table__operator {
        margin-top: 24px;
        margin-bottom: 22px;
    }

    .products-table__operator .el-button {
        margin-right: 16px;
    }

    .products-table__operator:last-child {
        margin-right: 0;
    }

    .product-form .dialog-footer {
        padding-top: 34px;
    }
</style>