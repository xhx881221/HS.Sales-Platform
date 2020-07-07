<template>
    <div id="dataEntry" v-loading="excel.loading" :element-loading-text="$t('Message.PleaseWaitWhileUploading')" element-loading-background="rgba(0, 0, 0, 0.05)">
        <contentHeader :title="$t('Function.DataEntry')"></contentHeader>

        <div class="content">
            <el-tabs v-model="activeTable" type="card">
                <el-tab-pane :label="$t('Title.ManualEntry')" name="manual">
                    <div class="manualEntry">
                        <div class="search-area" @keyup.enter="search">
                            <el-form :inline="true" :model="searchForm">
                                <el-form-item :label="$t('Form.Month')">
                                    <el-date-picker v-model="searchForm.month" type="month" :clearable=false></el-date-picker>
                                </el-form-item><!--

                                --><el-form-item :label="$t('Form.Area')">
                                    <el-select v-model="searchForm.saleAreaId" @change="getAllCompanies">
                                        <el-option v-for="area in areas"
                                            :key="area.id"
                                            :label="area.name"
                                            :value="area.id"></el-option>
                                    </el-select>
                                </el-form-item><!--

                                --><el-form-item :label="$t('Form.SalesCompany')">
                                    <el-select v-model="searchForm.companyId">
                                        <el-option v-for="company in companies"
                                            :key="company.id"
                                            :label="company.name"
                                            :value="company.id"></el-option>
                                    </el-select>
                                </el-form-item><!--

                                --><el-form-item :label="$t('Form.Sector')">
                                    <el-select v-model="searchForm.plateId">
                                        <el-option v-for="sector in sectors"
                                            :key="sector.id"
                                            :label="sector.name"
                                            :value="sector.id"></el-option>
                                    </el-select>
                                </el-form-item><!--

                                --><el-form-item>
                                    <el-button type="primary" size="medium" @click="search">{{$t("Button.Inquiry")}}</el-button>
                                </el-form-item><!--

                                --><el-form-item>
                                    <el-button type="primary" size="medium" @click="save">{{$t("Button.Save")}}</el-button>
                                </el-form-item>
                            </el-form>
                        </div>

                        <el-table
                            ref="manualEntryTableData"
                            max-height="620"
                            :data="manual.tableData"
                            border
                            :header-cell-style="tableHeaderCellStyle"
                            :cell-style="tableCellStyle">
                            <el-table-column prop="seriesName" :label="$t('Table.SeriesName')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="code" :label="$t('Table.ProductModelCode')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="name" :label="$t('Table.ProductName')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="unit" :label="$t('Table.Unit')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="price" :label="$t('Table.UnitPrice')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="qty" :label="$t('Table.Quantity')" align="center" :resizable="false" show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <el-input v-model.number="scope.row.qty" v-if="editIndex === scope.$index" @blur="finishEdit(scope.$index)" class="tableData_input"></el-input>
                                    <div v-else @click="startEdit(scope.$index)">{{scope.row.qty}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="amount" :label="$t('Table.Amount')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>

                <el-tab-pane :label="$t('Title.ExcelImport')" name="excel">
                    <div class="excelImport">
                        <div class="upload-area">
                            <span>{{$t("Form.ExcelImport")}}</span>
                            <el-upload
                                ref="upload"
                                class="upload"
                                accept="application/x-xls, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                :headers="excel.headers"
                                :action="excel.uploadURL"
                                :file-list="excel.fileList"
                                :show-file-list="false"
                                :on-success="uploaderSuccess"
                                :on-error="uploaderError"
                                :before-upload="beforeUpload">
                                <el-button type="primary">{{$t("Button.Select")}}</el-button>
                            </el-upload>
                            <span class="upload-tooltips">
                                <span class="upload-icon">*</span>
                                {{$t("Message.OnlyXlsXlsxFormat")}}
                            </span>
                        </div>

                        <div class="display-area">
                            <el-table
                                ref="excelImportTableData"
                                class="display-area__table"
                                max-height="595"
                                :data="excel.tableData"
                                border
                                :header-cell-style="tableHeaderCellStyle"
                                :cell-style="tableCellStyle">
                                <el-table-column prop="date" :label="$t('Table.Date')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                                <el-table-column prop="saleCompanyName" :label="$t('Table.SalesCompany')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                                <el-table-column prop="productCode" :label="$t('Table.ProductCode')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                                <el-table-column prop="unitName" :label="$t('Table.Unit')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                                <el-table-column prop="price" :label="$t('Table.UnitPrice')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                                <el-table-column prop="qty" :label="$t('Table.Quantity')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                                <el-table-column prop="amount" :label="$t('Table.Amount/Yuan')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import contentHeader from '../components/ContentHeader.vue';
    import { userMixin } from "../mixins/userMixins";
    import url from "../config.js";

    export default {
        name: 'dataEntry',
        mixins: [userMixin],
        components: {
            contentHeader
        },
        data () {
            return {
                activeTable: "",
                searchForm: {
                    month: new Date(),
                    saleAreaId: "",
                    companyId: "",
                    plateId: ""
                },
                areas: [],
                companies: [],
                sectors: [],
                manual: {
                    tableData: []
                },
                excel: {
                    headers: {
                        Authorization: sessionStorage.getItem("token")
                    },
                    loading: false,
                    uploadURL: "",
                    tableData: [],
                    fileList: []
                },
                editIndex: -1
            }
        },
        methods: {
            beforeUpload(file) {
                let _self = this;
                if (/(.xls|.xlsx)$/.test(file.name)) {
                    this.excel.loading = true;
                    this.excel.fileList = [].concat(file);
                } else {
                    this.excel.fileList = [];
                    this.$message({
                        message: this.$t("Message.PleaseUploadTheExcelInTheCorrectFormat"),
                        type: 'error'
                    });
                    return false;
                }
            },
            uploaderSuccess(response) {
                this.excel.loading = false;
                if (response.success) {
                    this.$message({
                        message: response.message,
                        type: 'success',
                    });
                    this.excel.tableData = response.data.slice(0);
                } else {
                    this.$message({
                        message: response.message,
                        type: 'error',
                    });
                    this.excel.tableData = [];
                }
            },
            uploaderError() {
                this.$message({
                    message: this.$t("Message.UploadFailed"),
                    type: 'error',
                });
                this.excel.loading = false;
            },
            save() {
                let _self = this;
                let param = {...this.searchForm};
                param.month = param.month.toISOString();
                param.productList = [...this.manual.tableData];
                this.$axios.post('/api/SaleFlow/AddSaleFlowData', param).then((response) => {
                    _self.$message({
                        message: _self.$t("Message.SuccessfullySaved"),
                        type: 'success'
                    });
                })
            },
            startEdit(index) {
                this.editIndex = index;
                this.$nextTick(() => {
                    let el = document.querySelector(".tableData_input");
                    el.children[0].focus();
                });
            },
            finishEdit(index) {
                this.manual.tableData[index].amount = this.manual.tableData[index].price * this.manual.tableData[index].qty;
                this.editIndex = -1;
            },
            search() {
                this.getTableData();
            },
            getAllAreas() {
                let _self = this;
                return new Promise((resolve, reject) => {
                    _self.$axios.get('/api/SaleArea/GetAll').then((response) => {
                        _self.areas = response.slice(0);
                        _self.searchForm.saleAreaId = _self.areas[0].id;
                        resolve();
                    }).catch((error) => {
                        reject(error);
                    })
                })
            },
            getAllCompanies() {
                let _self = this;
                return new Promise((resolve, reject) => {
                    _self.$axios.get('/api/Company/GetByArea', {
                        params: { areaId : _self.searchForm.saleAreaId }
                    }).then((response) => {
                        _self.companies = response.slice(0);
                        _self.searchForm.companyId = _self.companies[0].id;
                        resolve();
                    }).catch((error) => {
                        reject(error);
                    })
                })
            },
            getAllSectors() {
                let _self = this;
                return new Promise((resolve, reject) => {
                    _self.$axios.get('/api/Plate/GetAll').then((response) => {
                        _self.sectors = response.slice(0);
                        _self.searchForm.plateId = _self.sectors[0].id;
                        resolve();
                    }).catch((error) => {
                        reject(error);
                    })
                })
            },
            getTableData() {
                let _self = this;
                this.$axios.get("/api/Plate/GetProducts", {
                    params: { plateId: this.searchForm.plateId }
                }).then((response) => {
                    _self.manual.tableData = response.slice(0);
                })
            },
            async mount() {
                await this.getAllSectors();
                this.getTableData();
                await this.getAllAreas();
                await this.getAllCompanies();
            }
        },
        mounted: function() {
            this.mount();
            let baseURL = process.env.NODE_ENV === 'production' ? url.prod : url.dev;
            this.excel.uploadURL = baseURL + "/api/SaleFlow/ImportFromExcel";
        }
    }
</script>

<style>
    #dataEntry .el-tabs {
        height: 100%; width: 100%;
    }

    #dataEntry .el-tabs__header {
        background-color: #ffffff;
        margin: 0;
        box-shadow: 0px 1px 2px 0px rgba(59,59,59,0.3);
        border-radius:4px;
    }

    #dataEntry .el-tabs__content {
        background-color: #ffffff;
        margin-top: 10px;
        height: calc(100% - 60px - 10px);
        box-shadow: 0px 1px 6px 0px rgba(59,59,59,0.3);
        border-radius:4px;
    }

    #dataEntry .el-tabs--card>.el-tabs__header {
        border: none;
    }

    #dataEntry .el-tabs--card>.el-tabs__header .el-tabs__nav {
        border: none;
    }

    #dataEntry .el-tabs__nav {
        padding: 10px 36px;
    }

    #dataEntry .el-tabs__nav .el-tabs__item {
        border-radius: 4px;
        margin-right: 10px;
    }

    #dataEntry #tab-manual {
        color: #ffffff;
		background-color: #2B91FF;
        border: 1px solid #2B91FF;
    }

    #dataEntry #tab-manual[class~="is-active"] {
		background: #ffffff;
		color: #2B91FF;
    }
    
    #dataEntry #tab-excel {
        color: #ffffff;
		background-color: #24C32F;
		border: 1px solid #24C32F;
	}

	#dataEntry #tab-excel[class~="is-active"] {
		background: #ffffff;
		border-color: #24C32F;
		color: #24C32F;
    }

    #dataEntry .el-tab-pane {
        height: 100%; width: 100%;
    }

    #dataEntry .el-form-item__content {
        margin-right: 30px;
    }

    #dataEntry .el-table__row .el-input__inner {
        height: 23px;
    }
</style>

<style scoped>
    #dataEntry {
        height: 100%; width: 100%;
    }

    .content {
        padding: 10px;
        height: calc(100% - 56px - 20px);
    }

    .manualEntry {
        padding: 28px 34px;
        height: calc(100% - 56px);
        width: calc(100% - 68px);
    }

    .excelImport {
        padding: 30px;
        height: calc(100% - 60px);
        width: calc(100% - 60px);
    }

    .upload-area {
        margin-bottom: 12px;
    }

    .upload {
        display: inline-block;
    }

    .upload-tooltips {
        margin-left: 30px;
        margin-top: 10px;
        position: absolute;
        line-height: 20px;
        color: rgba(69,69,69,0.8);
    }

    .upload-icon {
        color: #FF3939;
        font-family: simsun;
    }

    .display-area {
        height: calc(100% - 40px - 12px);
        border: 1px solid rgba(43, 145, 255, 1);
    }

    .display-area__table {
        width: calc(100% - 40px);
        margin: 20px;
    }
</style>>