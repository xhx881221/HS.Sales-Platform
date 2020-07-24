<template>
    <div id="productSettings">
        <contentHeader :title="$t('Function.ProductSettings')"></contentHeader>

        <div class="content">
            <div class="display-arae">
                <h3>{{$t("Function.OutstandingProductSettings")}}</h3>
                <span>{{$t("Form.ContinuousGrowthMonths")}}</span>
                <el-input v-model="data.gradeMonth" style="margin-right: 72px" @blur="changeInput('gradeMonth')"></el-input>
                <span>{{$t("Form.MonthlyGrowthRate")}}</span>
                <el-input v-model="data.gradeRate" @blur="changeInput('gradeRate')"></el-input>
                %
                <h3>{{$t("Function.UnderperformanceProductSettings")}}</h3>
                <span>{{$t("Form.ContinuousReductionMonths")}}</span>
                <el-input v-model="data.downMonth" style="margin-right: 72px" @blur="changeInput('downMonth')"></el-input>
                <span>{{$t("Form.MonthlyReductionRate")}}</span>
                <el-input v-model="data.downRate" @blur="changeInput('downRate')"></el-input>
                %
                <div class="operate-area">
                    <el-button type="primary" @click="save">{{$t("Button.Save")}}</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import contentHeader from '../components/ContentHeader.vue';
    import { userMixin } from "../mixins/userMixins";

    export default {
        name: 'productSettings',
        mixins: [userMixin],
        components: {
            contentHeader
        },
        data () {
            return {
                data: {
                    gradeMonth: 0,
                    gradeRate: 0,
                    downMonth: 0,
                    downRate: 0
                }
            }
        },
        methods: {
            changeInput(key) {
                if (isNaN(Number(this.data[key])) || this.data[key] === "") {
                    this.data[key] = 0;
                } else {
                    this.data[key] = Number(this.data[key]);
                }
            },
            save() {
                let _self = this;
                this.$axios.post("/api/Grade/SetGrade/", this.data).then((response) => {
                    _self.$message({
                        message: _self.$t("Message.SuccessfullySaved"),
                        type: 'success'
                    });
                })
            }
        },
        mounted: function() {
            let _self = this;
            this.$axios.get('/api/Grade/GetGrade').then((response) => {
                this.data = {...response};
            });
        }
    }
</script>

<style>
    #productSettings .el-input {
        width: 80px;
    }
</style>

<style scoped>
    #productSettings {
        height: 100%; width: 100%;
    }

    .content {
        margin: 10px;
        height: calc(100% - 56px - 20px);
        background-color: white;
    }

    .display-arae {
        padding: 118px 650px;
    }

    h3 {
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 12px;
        margin-top: 50px;
    }

    .operate-area {
        text-align: center;
        margin-top: 56px;
    }
</style>