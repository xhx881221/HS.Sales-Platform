<template>
    <div id="reportQuery">
        <contentHeader :title="$t('Function.ReportQuery')"></contentHeader>

        <div class="content">
            <el-tabs v-model="activeTab" type="card">
                <el-tab-pane :label="$t('Title.Summary')" name="summary" :lazy="true">
                    <div class="display-area">
                        <div class="search-area" @keyup.enter="search('summary')">
                            <el-form :inline="true" :model="summary.searchForm">
                                <el-form-item :label="$t('Form.StartAndEndMonths')">
                                    <el-date-picker
                                        v-model="summary.searchForm.range"
                                        type="monthrange"
                                        :range-separator="$t('Message.To')"
                                        :clearable=false>
                                    </el-date-picker>
                                </el-form-item><!--

                                --><el-form-item style="margin-left: 30px">
                                    <el-button type="primary" size="medium" @click="search('summary')">{{$t("Button.Inquiry")}}</el-button>
                                </el-form-item><!--

                                --><el-form-item>
                                    <el-button type="primary" size="medium" @click="clear('summary')">{{$t("Button.Empty")}}</el-button>
                                </el-form-item>
                            </el-form>
                        </div>

                        <el-table
                            ref="summaryTableData"
                            max-height="620"
                            :data="summary.tableData"
                            border
                            :header-cell-style="tableHeaderCellStyle"
                            :cell-style="tableCellStyle">
                            <el-table-column prop="currentAmount" :label="$t('Table.Income')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="preAmount" :label="$t('Table.LastYearIncome')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="riseRate" :label="$t('Table.YoYGrowthRate')" align="center" :resizable="false" show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <span>{{scope.row.riseRate | percentage}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="planCompleteRate" :label="$t('Table.TaskCompletionRate')" align="center" :resizable="false" show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <span>{{scope.row.planCompleteRate | percentage}}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>

                <el-tab-pane :label="$t('Title.OutstandingProducts')" name="outstanding" :lazy="true">
                    <div class="display-area">
                        <div class="search-area" @keyup.enter="search('outstanding')">
                            <el-form :inline="true" :model="outstanding.searchForm">
                                <el-form-item :label="$t('Form.DeadlineMonth')">
                                    <el-date-picker
                                        v-model="outstanding.searchForm.month"
                                        type="month"
                                        :clearable=false>
                                    </el-date-picker>
                                </el-form-item><!--

                                --><el-form-item style="margin-left: 30px">
                                    <el-button type="primary" size="medium" @click="search('outstanding')">{{$t("Button.Inquiry")}}</el-button>
                                </el-form-item><!--

                                --><el-form-item>
                                    <el-button type="primary" size="medium" @click="clear('outstanding')">{{$t("Button.Empty")}}</el-button>
                                </el-form-item>
                            </el-form>
                        </div>

                        <el-table
                            ref="outstandingTableData"
                            max-height="620"
                            :data="outstanding.tableData"
                            border
                            :header-cell-style="tableHeaderCellStyle"
                            :cell-style="tableCellStyle">
                            <el-table-column prop="productCode" :label="$t('Table.ProductCode')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="productName" :label="$t('Table.ProductName')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="qty" :label="$t('Table.Quantity')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="unit" :label="$t('Table.Unit')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="totalAmount" :label="$t('Table.Sales')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="riseRate" :label="$t('Table.CumulativeGrowth')" align="center" :resizable="false" show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <span>{{scope.row.riseRate | percentage}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="sort" :label="$t('Table.Sort')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>

                <el-tab-pane :label="$t('Title.EarlyWarning')" name="poor" :lazy="true">
                    <div class="display-area">
                        <div class="search-area" @keyup.enter="search('poor')">
                            <el-form :inline="true" :model="poor.searchForm">
                                <el-form-item :label="$t('Form.DeadlineMonth')">
                                    <el-date-picker
                                        v-model="poor.searchForm.month"
                                        type="month"
                                        :clearable=false>
                                    </el-date-picker>
                                </el-form-item><!--

                                --><el-form-item style="margin-left: 30px">
                                    <el-button type="primary" size="medium" @click="search('poor')">{{$t("Button.Inquiry")}}</el-button>
                                </el-form-item><!--

                                --><el-form-item>
                                    <el-button type="primary" size="medium" @click="clear('poor')">{{$t("Button.Empty")}}</el-button>
                                </el-form-item>
                            </el-form>
                        </div>

                        <el-table
                            ref="poorTableData"
                            max-height="620"
                            :data="poor.tableData"
                            border
                            :header-cell-style="tableHeaderCellStyle"
                            :cell-style="tableCellStyle">
                            <el-table-column prop="productCode" :label="$t('Table.ProductCode')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="productName" :label="$t('Table.ProductName')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="qty" :label="$t('Table.Quantity')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="unit" :label="$t('Table.Unit')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="totalAmount" :label="$t('Table.Sales')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="riseRate" :label="$t('Table.CumulativeGrowth')" align="center" :resizable="false" show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <span>{{scope.row.riseRate | percentage}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="sort" :label="$t('Table.Sort')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>

                <el-tab-pane :label="$t('Title.RegionalSales')" name="regional" :lazy="true">
                    <div class="display-area">
                        <div class="table" v-show="regional.table">
                            <div class="search-area" @keyup.enter="search('regional')">
                                <el-form :inline="true" :model="regional.searchForm">
                                    <el-form-item :label="$t('Form.StartAndEndMonths')">
                                        <el-date-picker
                                            v-model="regional.searchForm.range"
                                            type="monthrange"
                                            :range-separator="$t('Message.To')"
                                            :clearable=false>
                                        </el-date-picker>
                                    </el-form-item><!--

                                    --><el-form-item style="margin-left: 30px">
                                        <el-button type="primary" size="medium" @click="search('regional')">{{$t("Button.Inquiry")}}</el-button>
                                    </el-form-item><!--

                                    --><el-form-item>
                                        <el-button type="primary" size="medium" @click="clear('regional')">{{$t("Button.Empty")}}</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>

                            <el-table
                                ref="regionalTableData"
                                max-height="620"
                                :data="regional.tableData"
                                border
                                :header-cell-style="tableHeaderCellStyle"
                                :cell-style="tableCellStyle">
                                <el-table-column prop="areaName" :label="$t('Table.Name')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                                <el-table-column prop="currentAmount" :label="$t('Table.Sales')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                                <el-table-column prop="planComplateRate" :label="$t('Table.TaskCompletionRate')" align="center" :resizable="false" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <span>{{scope.row.planComplateRate | percentage}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="preAmount" :label="$t('Table.LastYearIncome')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                                <el-table-column prop="riseRate" :label="$t('Table.YoYGrowthRate')" align="center" :resizable="false" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <span>{{scope.row.riseRate | percentage}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="sort" :label="$t('Table.Sort')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                            </el-table>
                        </div><!--

                        --><el-button
                            icon="el-icon-arrow-right"
                            class="switch-button"
                            circle
                            @click="displayPieChart('regional')"
                            v-show="regional.table"
                            :disabled="regional.tableData.length === 0">
                        </el-button><!--

                        --><div class="table" v-show="regional.pieChart">
                            <div id="regionalCharts" style="width: 900px; height: 600px"></div>    
                        </div><!--

                        --><el-button icon="el-icon-arrow-left" class="switch-button" circle @click="displayTable('regional')" v-show="regional.pieChart"></el-button>
                    </div>
                </el-tab-pane>

                <el-tab-pane :label="$t('Title.SystemSales')" name="system" :lazy="true">
                    <div class="display-area">
                        <div class="table" v-show="system.table">
                            <div class="search-area" @keyup.enter="search('system')">
                                <el-form :inline="true" :model="system.searchForm">
                                    <el-form-item :label="$t('Form.StartAndEndMonths')">
                                        <el-date-picker
                                            v-model="system.searchForm.range"
                                            type="monthrange"
                                            :range-separator="$t('Message.To')"
                                            :clearable=false>
                                        </el-date-picker>
                                    </el-form-item><!--

                                    --><el-form-item style="margin-left: 30px">
                                        <el-button type="primary" size="medium" @click="search('system')">{{$t("Button.Inquiry")}}</el-button>
                                    </el-form-item><!--

                                    --><el-form-item>
                                        <el-button type="primary" size="medium" @click="clear('system')">{{$t("Button.Empty")}}</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>

                            <el-table
                                ref="systemTableData"
                                max-height="620"
                                :data="system.tableData"
                                border
                                :header-cell-style="tableHeaderCellStyle"
                                :cell-style="tableCellStyle">
                                <el-table-column prop="plateName" :label="$t('Table.Name')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                                <el-table-column prop="currentAmount" :label="$t('Table.Sales')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                                <el-table-column prop="planComplateRate" :label="$t('Table.TaskCompletionRate')" align="center" :resizable="false" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <span>{{scope.row.planComplateRate | percentage}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="preAmount" :label="$t('Table.LastYearIncome')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                                <el-table-column prop="riseRate" :label="$t('Table.YoYGrowthRate')" align="center" :resizable="false" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <span>{{scope.row.riseRate | percentage}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="sort" :label="$t('Table.Sort')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                            </el-table>
                        </div><!--

                        --><el-button
                            icon="el-icon-arrow-right"
                            class="switch-button"
                            circle
                            @click="displayPieChart('system')"
                            v-show="system.table"
                            :disabled="system.tableData.length === 0">
                        </el-button><!--

                        --><div class="table" v-show="system.pieChart">
                            <div id="systemCharts" style="width: 900px; height: 600px"></div>    
                        </div><!--

                        --><el-button icon="el-icon-arrow-left" class="switch-button" circle @click="displayTable('system')" v-show="system.pieChart"></el-button>
                    </div>
                </el-tab-pane>

                <el-tab-pane :label="$t('Title.ProductSales')" name="product" :lazy="true">
                    <div class="display-area">
                        <div class="table" v-show="product.table">
                            <div class="search-area" @keyup.enter="search('product')">
                                <el-form :inline="true" :model="product.searchForm">
                                    <el-form-item :label="$t('Form.StartAndEndMonths')">
                                        <el-date-picker
                                            v-model="product.searchForm.range"
                                            type="monthrange"
                                            :range-separator="$t('Message.To')"
                                            :clearable=false>
                                        </el-date-picker>
                                    </el-form-item><!--

                                    --><el-form-item style="margin-left: 30px">
                                        <el-button type="primary" size="medium" @click="search('product')">{{$t("Button.Inquiry")}}</el-button>
                                    </el-form-item><!--

                                    --><el-form-item>
                                        <el-button type="primary" size="medium" @click="clear('product')">{{$t("Button.Empty")}}</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>

                            <el-table
                                ref="productTableData"
                                max-height="620"
                                :data="product.tableData"
                                border
                                :header-cell-style="tableHeaderCellStyle"
                                :cell-style="tableCellStyle">
                                <el-table-column prop="plateName" :label="$t('Table.Name')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                                <el-table-column prop="currentAmount" :label="$t('Table.Sales')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                                <el-table-column prop="planComplateRate" :label="$t('Table.TaskCompletionRate')" align="center" :resizable="false" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <span>{{scope.row.planComplateRate | percentage}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="preAmount" :label="$t('Table.LastYearIncome')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                                <el-table-column prop="riseRate" :label="$t('Table.YoYGrowthRate')" align="center" :resizable="false" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <span>{{scope.row.riseRate | percentage}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="sort" :label="$t('Table.Sort')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                            </el-table>
                        </div><!--

                        --><el-button
                            icon="el-icon-arrow-right"
                            class="switch-button"
                            circle
                            @click="displayPieChart('product')"
                            v-show="product.table"
                            :disabled="product.tableData.length === 0">
                        </el-button><!--

                        --><div class="table" v-show="product.pieChart">
                            <div id="productCharts" style="width: 900px; height: 600px"></div>    
                        </div><!--

                        --><el-button
                            icon="el-icon-arrow-left"
                            class="switch-button"
                            circle
                            @click="displayTable('product')"
                            v-show="product.pieChart">
                        </el-button>
                    </div>
                </el-tab-pane>

                <el-tab-pane :label="$t('Title.SalesCompany')" name="company" :lazy="true">
                    <div class="display-area">
                        <div class="table" v-show="company.table">
                            <div class="search-area" @keyup.enter="search('company')">
                                <el-form :inline="true" :model="company.searchForm">
                                    <el-form-item :label="$t('Form.StartAndEndMonths')">
                                        <el-date-picker
                                            v-model="company.searchForm.range"
                                            type="monthrange"
                                            :range-separator="$t('Message.To')"
                                            :clearable=false>
                                        </el-date-picker>
                                    </el-form-item><!--

                                    --><el-form-item style="margin-left: 30px">
                                        <el-button type="primary" size="medium" @click="search('company')">{{$t("Button.Inquiry")}}</el-button>
                                    </el-form-item><!--

                                    --><el-form-item>
                                        <el-button type="primary" size="medium" @click="clear('company')">{{$t("Button.Empty")}}</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>

                            <el-table
                                ref="companyTableData"
                                max-height="620"
                                :data="company.tableData"
                                border
                                :header-cell-style="tableHeaderCellStyle"
                                :cell-style="tableCellStyle">
                                <el-table-column prop="plateName" :label="$t('Table.Name')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                                <el-table-column prop="currentAmount" :label="$t('Table.Sales')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                                <el-table-column prop="planComplateRate" :label="$t('Table.TaskCompletionRate')" align="center" :resizable="false" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <span>{{scope.row.planComplateRate | percentage}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="preAmount" :label="$t('Table.LastYearIncome')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                                <el-table-column prop="riseRate" :label="$t('Table.YoYGrowthRate')" align="center" :resizable="false" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <span>{{scope.row.riseRate | percentage}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="sort" :label="$t('Table.Sort')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                            </el-table>
                        </div><!--

                        --><el-button
                            icon="el-icon-arrow-right"
                            class="switch-button"
                            circle
                            @click="displayPieChart('company')"
                            v-show="company.table"
                            :disabled="company.tableData.length === 0">
                        </el-button><!--

                        --><div class="table" v-show="company.pieChart">
                            <div id="companyCharts" style="width: 900px; height: 600px"></div>    
                        </div><!--

                        --><el-button
                            icon="el-icon-arrow-left"
                            class="switch-button"
                            circle
                            @click="displayTable('company')"
                            v-show="company.pieChart">
                        </el-button>
                    </div>
                </el-tab-pane>

                <el-tab-pane :label="$t('Title.Top20')" name="top" :lazy="true">
                    <div class="display-area">
                        <div class="search-area" @keyup.enter="search('top')">
                            <el-form :inline="true" :model="top.searchForm">
                                <el-form-item :label="$t('Form.StartAndEndMonths')">
                                    <el-date-picker
                                        v-model="top.searchForm.range"
                                        type="monthrange"
                                        :range-separator="$t('Message.To')"
                                        :clearable=false>
                                    </el-date-picker>
                                </el-form-item><!--

                                --><el-form-item style="margin-left: 30px">
                                    <el-button type="primary" size="medium" @click="search('top')">{{$t("Button.Inquiry")}}</el-button>
                                </el-form-item><!--

                                --><el-form-item>
                                    <el-button type="primary" size="medium" @click="clear('top')">{{$t("Button.Empty")}}</el-button>
                                </el-form-item>
                            </el-form>
                        </div>

                        <el-table
                            ref="topTableData"
                            max-height="620"
                            :data="top.tableData"
                            border
                            :header-cell-style="tableHeaderCellStyle"
                            :cell-style="tableCellStyle">
                            <el-table-column prop="productCode" :label="$t('Table.ProductNumber')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="productName" :label="$t('Table.ProductName')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="currentAmount" :label="$t('Table.Sales')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="planComplateRate" :label="$t('Table.TaskCompletionRate')" align="center" :resizable="false" show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <span>{{scope.row.planComplateRate | percentage}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="preAmount" :label="$t('Table.LastYearIncome')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="sort" :label="$t('Table.Sort')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="riseRate" :label="$t('Table.YoYGrowthRate')" align="center" :resizable="false" show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <span>{{scope.row.riseRate | percentage}}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
                
                <el-tab-pane :label="$t('Title.Last30')" name="last" :lazy="true">
                    <div class="display-area">
                        <div class="search-area" @keyup.enter="search('last')">
                            <el-form :inline="true" :model="last.searchForm">
                                <el-form-item :label="$t('Form.StartAndEndMonths')">
                                    <el-date-picker
                                        v-model="last.searchForm.range"
                                        type="monthrange"
                                        :range-separator="$t('Message.To')"
                                        :clearable=false>
                                    </el-date-picker>
                                </el-form-item><!--

                                --><el-form-item style="margin-left: 30px">
                                    <el-button type="primary" size="medium" @click="search('last')">{{$t("Button.Inquiry")}}</el-button>
                                </el-form-item><!--

                                --><el-form-item>
                                    <el-button type="primary" size="medium" @click="clear('last')">{{$t("Button.Empty")}}</el-button>
                                </el-form-item>
                            </el-form>
                        </div>

                        <el-table
                            ref="lastTableData"
                            max-height="620"
                            :data="last.tableData"
                            border
                            :header-cell-style="tableHeaderCellStyle"
                            :cell-style="tableCellStyle">
                            <el-table-column prop="productCode" :label="$t('Table.ProductNumber')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="productName" :label="$t('Table.ProductName')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="currentAmount" :label="$t('Table.Sales')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="planComplateRate" :label="$t('Table.TaskCompletionRate')" align="center" :resizable="false" show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <span>{{scope.row.planComplateRate | percentage}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="preAmount" :label="$t('Table.LastYearIncome')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="sort" :label="$t('Table.Sort')" align="center" :resizable="false" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="riseRate" :label="$t('Table.YoYGrowthRate')" align="center" :resizable="false" show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <span>{{scope.row.riseRate | percentage}}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import contentHeader from '../components/ContentHeader.vue';
    import { userMixin } from "../mixins/userMixins";
    import * as echarts from 'echarts/lib/echarts';
    import "echarts/lib/chart/pie";

    export default {
        name: 'reportQuery',
        mixins: [userMixin],
        components: {
            contentHeader
        },
        data () {
            return {
                activeTab: "",
                summary: {
                    searchForm: {
                        range: "",
                        startDate: "",
                        endDate: ""
                    },
                    tableData: []
                },
                outstanding: {
                    searchForm: {
                        month: ""
                    },
                    tableData: []
                },
                poor: {
                    searchForm: {
                        month: ""
                    },
                    tableData: []
                },
                regional: {
                    searchForm: {
                        range: "",
                        startDate: "",
                        endDate: ""
                    },
                    tableData: [],
                    table: true,
                    pieChart: false
                },
                system: {
                    searchForm: {
                        range: "",
                        startDate: "",
                        endDate: ""
                    },
                    tableData: [],
                    table: true,
                    pieChart: false
                },
                product: {
                    searchForm: {
                        range: "",
                        startDate: "",
                        endDate: ""
                    },
                    tableData: [],
                    table: true,
                    pieChart: false
                },
                company: {
                    searchForm: {
                        range: "",
                        startDate: "",
                        endDate: ""
                    },
                    tableData: [],
                    table: true,
                    pieChart: false
                },
                top: {
                    searchForm: {
                        range: "",
                        startDate: "",
                        endDate: ""
                    },
                    tableData: []
                },
                last: {
                    searchForm: {
                        range: "",
                        startDate: "",
                        endDate: ""
                    },
                    tableData: []
                }
            }
        },
        methods: {
            search(tabName) {
                let url;
                switch (tabName) {
                    case "summary":
                        url = "/api/SaleReport/GetSummary";
                        break;
                    case "outstanding":
                        url = "/api/SaleReport/GetGradeProduct";
                        break;
                    case "poor":
                        url = "/api/SaleReport/GetDownProduct";
                        break;
                    case "regional":
                        url = "/api/SaleReport/GetArea";
                        break;
                    case "system":
                        url = "/api/SaleReport/GetPlate";
                        break;
                    case "product":
                        url = "/api/SaleReport/GetProduct";
                        break;
                    case "company":
                        url = "/api/SaleReport/GetCompany";
                        break;
                    case "top":
                        url = "/api/SaleReport/GetTop20Product";
                        break;
                    case "last":
                        url = "/api/SaleReport/GetButtom30Product";
                        break;
                }
                if (tabName === "outstanding" || tabName === "poor") {
                    this[tabName].searchForm.month = this._getData(this[tabName].searchForm.month);
                    this.$axios.get(url, { params: { month: this[tabName].searchForm.month } }).then((response) => {
                        this[tabName].tableData = [].concat(response);
                    })
                } else {
                    this[tabName].searchForm.startDate = this._getData(this[tabName].searchForm.range[0]);
                    this[tabName].searchForm.endDate = this._getData(this[tabName].searchForm.range[1]);
                    this.$axios.post(url, this[tabName].searchForm).then((response) => {
                        this[tabName].tableData = [].concat(response);
                        let _tableData = [];
                        if (tabName === "regional") {
                            _tableData = this[tabName].tableData.map((el) => {
                                return { name: el.areaName, value: el.amountRate }
                            })
                        } else if (tabName === "system") {
                            _tableData = this[tabName].tableData.map((el) => {
                                return { name: el.plateName, value: el.amountRate }
                            })
                        } else if (tabName === "product") {
                            _tableData = this[tabName].tableData.map((el) => {
                                return { name: el.productName, value: el.amountRate }
                            })
                        } else if (tabName === "company") {
                            _tableData = this[tabName].tableData.map((el) => {
                                return { name: el.companyName, value: el.amountRate }
                            })
                        }
                        this.drawCharts(_tableData, tabName);
                    })
                }
            },
            clear(tabName) {
                if (tabName === "outstanding" || tabName === "poor") {
                    this[tabName].searchForm.month = "";
                } else {
                    this[tabName].searchForm.startDate = "";
                    this[tabName].searchForm.endDate = "";
                    this[tabName].searchForm.range = "";
                }
                this[tabName].tableData = [];
            },
            drawCharts(data, tabName) {
                let id = tabName + "Charts";
                echarts.init(document.getElementById(id)).setOption({
                    series: {
                        type: "pie",
                        data: data
                    }
                });
            },
            displayPieChart(tabName) {
                this[tabName].table = false;
                this[tabName].pieChart = true;
            },
            displayTable(tabName) {
                this[tabName].pieChart = false;
                this[tabName].table = true;
            },
            _getData(date) {
                var _date = new Date(date);
                var year = _date.getFullYear();
                var month = _date.getMonth() >= 9 ? _date.getMonth() + 1 : "0" + (_date.getMonth() + 1);
                return `${year}-${month}-01T00:00:00.000Z`;
            }
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

    #reportQuery #tab-summary {
        color: #ffffff;
		background-color: #2B91FF;
        border: 1px solid #2B91FF;
	}

	#reportQuery #tab-summary[class~="is-active"] {
		background: #ffffff;
		color: #2B91FF;
    }
    
    #reportQuery #tab-outstanding {
        color: #ffffff;
		background-color: #24C32F;
		border: 1px solid #24C32F;
	}

	#reportQuery #tab-outstanding[class~="is-active"] {
		background: #ffffff;
		border-color: #24C32F;
		color: #24C32F;
    }
    
    #reportQuery #tab-poor {
        color: #ffffff;
		background-color: #AE56E6;
		border: 1px solid #AE56E6;
	}

	#reportQuery #tab-poor[class~="is-active"] {
		background: #ffffff;
		border-color: #AE56E6;
		color: #AE56E6;
    }
    
    #reportQuery #tab-regional {
        color: #ffffff;
		background-color: #FB6F80;
		border: 1px solid #FB6F80;
	}

	#reportQuery #tab-regional[class~="is-active"] {
		background: #ffffff;
		border-color: #FB6F80;
		color: #FB6F80;
    }
    
    #reportQuery #tab-system {
        color: #ffffff;
		background-color: #696FDE;
		border: 1px solid #696FDE;
	}

	#reportQuery #tab-system[class~="is-active"] {
		background: #ffffff;
		border-color: #696FDE;
		color: #696FDE;
    }
    
    #reportQuery #tab-product {
        color: #ffffff;
		background-color: #4AC7D2;
		border: 1px solid #4AC7D2;
	}

	#reportQuery #tab-product[class~="is-active"] {
		background: #ffffff;
		border-color: #4AC7D2;
		color: #4AC7D2;
    }
    
    #reportQuery #tab-company {
        color: #ffffff;
		background-color: #F2B600;
		border: 1px solid #F2B600;
	}

	#reportQuery #tab-company[class~="is-active"] {
		background: #ffffff;
		border-color: #F2B600;
		color: #F2B600;
    }
    
    #reportQuery #tab-top {
        color: #ffffff;
		background-color: #F5721B;
		border: 1px solid #F5721B;
	}

	#reportQuery #tab-top[class~="is-active"] {
		background: #ffffff;
		border-color: #F5721B;
		color: #F5721B;
    }
    
    #reportQuery #tab-last {
        color: #ffffff;
		background-color: #fc7cd6;
		border: 1px solid #fc7cd6;
	}

	#reportQuery #tab-last[class~="is-active"] {
		background: #ffffff;
		border-color: #fc7cd6;
		color: #fc7cd6;
	}

    #reportQuery .el-form-item__content {
        margin-right: 0px;
    }

    #reportQuery .el-tab-pane {
        height: 100%;
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

    .display-area {
        margin: 28px 36px;
        height: calc(100% - 56px);
        width: calc(100% - 72px);
        overflow: hidden;
        white-space: nowrap;
    }

    .table {
        display: inline-block;
        width: calc(100% - 50px);
        margin-right: 50px;
        height: 100%;
    }

    .switch-button {
        position: absolute;
        top: 50%;
        transform: translate(-40px, -50%);
    }
</style>>