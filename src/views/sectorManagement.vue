<template>
    <div id="sectorManagement">
        <contentHeader :title="$t('Function.SectorManagement')"></contentHeader>
        <div style="height: calc(100% - 56px)">
            <el-scrollbar style="height: 100%">
                <div class="content">
                    <div class="operate-area">
                        <el-button type="primary" @click="addSector" size="medium" icon="el-icon-plus">{{$t("Button.AddSector")}}</el-button><!--
                        --><el-button type="primary" @click="deleteSector" :disabled="selectedIds.length === 0" size="medium" icon="el-icon-close">{{$t("Button.DeleteSector")}}</el-button>
                    </div>

                    <div class="display-area">
                        <div @click="selectSector">
                            <div v-for="sector in sectors" :key="sector.id" class="container">
                                <div class="sector-select"></div>
                                <div :class="{ selected: selectedIds.indexOf(sector.id) !== -1 }"></div>

                                <el-tooltip :content="sector.name" placement="top" :disabled="sector.name.length <= 11">
                                    <div class="sector-name">{{sector.name | omitContent(11)}}</div>
                                </el-tooltip>
                                
                                <img class="sector-image" src="../assets/images/sector-image.png" style="width: 120px; height: 130px">

                                <div class="horizontal-divide-line"></div>

                                <div class="sector-button success-button" @click="editSector(sector)">{{$t("Button.Edit")}}</div>

                                <div class="sector-button info-button" @click="editSeries(sector)">{{$t("Button.SeriesEdit")}}</div>

                                <div style="display: none">{{sector.id}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-scrollbar>
        </div>

        <el-dialog :title="dialog.title" :visible.sync="dialog.visible" :close-on-click-modal=false :before-close="closeDialog" top="248px" width="774px">
            <el-form ref="sectorForm" :rules="sectorFormRules" :model="sectorForm">
                <el-form-item :label="$t('Form.SectorName')" label-width="154px" prop="name">
                    <el-input v-model="sectorForm.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveSector('sectorForm')">{{$t("Button.Save")}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import contentHeader from '../components/ContentHeader.vue'

    export default {
        name: 'sectorManagement',
        components: {
            contentHeader
        },
        data() {
            return {
                sectors: [],
                selectedIds: [],
                dialog: {
                    title: "",
                    visible: false,
                    mode: ""
                },
                sectorForm: {
                    id: "",
                    comment: "",
                    name: ""
                },
                sectorFormRules: {
                    name: [{required: true, message: this.$t("Message.PleaseEnterTheName"), trigger: ['blur', 'change']}]
                },
            }
        },
        methods: {
            addSector() {
                this.dialog.title = this.$t("Title.AddSector");
                this.dialog.visible = true;
                this.dialog.mode = "Add";
            },
            editSector(obj) {
                this.sectorForm = JSON.parse(JSON.stringify(obj));
                this.dialog.title = this.$t("Title.EditSector");
                this.dialog.visible = true;
                this.dialog.mode = "Edit";
            },
            deleteSector() {
                let _self = this;
                this.$confirm(this.$t("Message.PleaseConfirmWhetherToDelete"), this.$t("Function.ConfirmationInformation"), {
                    distinguishCancelAndClose: true,
                    confirmButtonText: this.$t("Button.Determine"),
                    cancelButtonText: this.$t("Button.GiveUpDelete"),
                    closeOnClickModal: false,
                    closeOnPressEscape: false
                }).then(() => {
                    this.$axios.post('/api/Plate/Delete', _self.selectedIds).then((response) => {
                        _self.$message({
                            message: _self.$t("Message.SuccessfullyDeleted"),
                            type: 'success'
                        });
                        _self.getAllSectors();
                    })
                })
            },
            saveSector(formName) {
                let _self = this;
                let _param, _url;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _param = JSON.parse(JSON.stringify(_self.sectorForm));
                        if (_self.dialog.mode === 'Add') {
                            _url = "/api/Plate/Add"
                        } else if (_self.dialog.mode === 'Edit') {
                            _url = "/api/Plate/Update"
                        }

                        _self.$axios.post(_url, _param).then((response) => {
                            _self.$message({
                                message: _self.$t("Message.SuccessfullySaved"),
                                type: 'success'
                            });
                            _self.$refs[formName].resetFields();
                            _self.getAllSectors();
                            _self.dialog.visible = false;
                        })
                    }
                })
            },
            closeDialog(done) {
                this.$refs.sectorForm.resetFields();
                done();
            },
            selectSector(e) {
                if (e.target.classList.contains("sector-button")) {
                    return;
                }

                let el, id, index;
                if (e.target.classList.contains("container")) {
                    el = e.target;
                } else if (e.target.parentNode.classList.contains("container")) {
                    el = e.target.parentNode;
                } else if (e.target.parentNode.parentNode.classList.contains("container")) {
                    el = e.target.parentNode.parentNode;
                } else if (e.target.parentNode.parentNode.parentNode.classList.contains("container")) {
                    el = e.target.parentNode.parentNode.parentNode;
                }

                if (el) {
                    id = el.children[el.children.length - 1].innerHTML;
                    index = this.selectedIds.indexOf(id);

                    if (index !== -1) {
                        this.selectedIds.splice(index, 1);
                    } else {
                        this.selectedIds.push(id);
                    }
                }
            },
            editSeries(obj) {
                this.$router.push({
                    name: "SeriesManagement",
                    query: {
                        sectorName: obj.name,
                        sectorId: obj.id
                    }
                })
            },
            getAllSectors() {
                let _self = this;
                this.$axios.get('/api/Plate/GetAll').then((response) => {
                    _self.sectors = response.slice(0);
                });
            }
        },
        mounted: function() {
			this.getAllSectors();
		}
    }
</script>

<style>
    #sectorManagement .el-scrollbar__wrap {
        overflow-x: auto;
    }

    #sectorManagement .el-form-item__content {
        margin-right: 88px;
    }
</style>

<style scoped>
    #sectorManagement {
        height: 100%; width: 100%;
        overflow: hidden;
    }

    .content {
        padding: 22px 34px;
        height: calc(100% - 44px);
    }

    .operate-area {
        margin-bottom: 18px;
    }

    .container {
        position: relative;
        display: inline-block;
        width: 330px; height: 342px;
        border-radius: 4px;
        background-color: #ffffff;
        cursor: pointer;
        box-shadow: 0px 1px 6px 0px rgba(59,59,59,0.3);
        margin-bottom: 14px;
    }

    .container {
        margin-right: 12px;
    }

    .container .sector-select {
        position: absolute;
        top: 10px; right: 10px;
        width: 26px; height: 26px;
        border-radius: 50%;
        background-color: #ffffff;
        border: 1px solid rgba(213,213,213,1);
        box-shadow: 0px 2px 4px 0px rgba(59,59,59,0.18), 0px 4px 4px 0px rgba(196,196,196,0.24);
    }

    .container .selected {
        position: absolute;
        top: 15px; right: 15px;
        width: 17px; height: 17px;
        border-radius: 50%;
        background-color: #FF0000;
        border: 1px solid rgba(213,213,213,1);
        box-shadow: 0px 4px 4px 0px rgba(196,196,196,0.24);
    }

    .container .sector-name {
        position: absolute;
        top: 64px;
        color: #454545;
        font-size: 28px;
        font-weight: 500;
        width: 100%;
        text-align: center;
    }

    .container .sector-image {
        position: absolute;
        top: 140px;
        left: 50%;
        transform: translateX(-50%);
    }

    .container .horizontal-divide-line {
        position: absolute;
        top: 276px;
        width: 270px; height: 1px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #E5E5E5;
    }

    .container .sector-button {
        position: absolute;
        bottom: 0;
        height: 65px;
        width: calc((100% - 1px) / 2);
        font-size: 19px;
        font-weight: 400;
        line-height: 65px;
        text-align: center;
        font-family: Source Han Sans CN;
    }

    .container .success-button {
        left: 0;
        color: #49BF89;
    }

    .container .success-button:hover {
        color: #ffffff;
        background-color: #49BF89;
    }

    .container .success-button::after {
        content: "";
        position: absolute;
        width: 1px; height: 44px;
        background: #E5E5E5;
        top: 50%;
        left: 100%;
        transform: translateY(-50%);
    }

    .container .info-button {
        right: 0;
        color: #4EA3FF;
    }

    .container .info-button:hover {
        color: #ffffff;
        background-color: #4EA3FF;
    }

    .dialog-footer {
        text-align: center;
        padding-top: 80px;
        padding-bottom: 58px;
    }
</style>