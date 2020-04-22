<template>
    <div id="sectorManagement">
        <contentHeader :title="$t('Function.SectorManagement')"></contentHeader>
        <div style="height: calc(100% - 56px)">
            <el-scrollbar style="height: 100%">
                <div class="content">
                    <div class="operate-area">
                        <el-button type="primary" @click="increaseSector" size="medium" icon="el-icon-plus" class="with-icon">{{$t("Button.IncreaseSector")}}</el-button><!--
                        --><el-button type="primary" @click="deleteSector" size="medium" icon="el-icon-close" class="with-icon">{{$t("Button.DeleteSector")}}</el-button>
                    </div>

                    <div class="display-area">
                        <div @click="selectSector">
                            <div v-for="sector in sectors" :key="sector.id" class="container">
                                <div class="sector-select"></div>
                                <div v-if="selectedIds.indexOf(sector.id) !== -1" class="selected"></div>

                                <div class="sector-name" :selfTooptip="sector.name" effect="dark" placement="top-left" :disabled="sector.name.length >= 9">
                                    <span>{{sector.name | omitContent(9)}}</span>
                                </div>
                                
                                <img class="sector-image" src="../assets/images/sector-image.png" style="width: 120px; height: 130px">

                                <div class="divide-line"></div>

                                <div class="sector-button success-button">{{$t("Button.IncreaseSector")}}<div><!--
                                --><div class="sector-button info-button">{{$t("Button.IncreaseSector")}}<div>

                                <div style="display: none">{{sector.id}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-scrollbar>
        </div>
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
            }
        },
        methods: {
            selectSector(e) {
                console.log(e);
                let el, id, index;
                if (e.target.classList.contains("container")) {
                    el = e.target;
                } else if (e.target.parentNode.classList.contains("container")) {
                    el = e.target.parentNode;
                } else if (e.target.parentNode.parentNode.classList.contains("container")) {
                    el = e.target.parentNode.parentNode;
                }

                id = el.children[el.children.length - 1].innerHTML;
                index = this.selectedIds.indexOf(id);

                if (index !== -1) {
                    this.selectedIds.splice(index, 1);
                } else {
                    this.selectedIds.push(id);
                }

                console.log(this.selectedIds)
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

<style scoped>
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

    .container+.container {
        margin-left: 12px;
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
        left: 50%;
        transform: translateX(-50%);
        color: #454545;
        font-size: 28px;
        font-weight: 500px;
    }

    .container .sector-image {
        position: absolute;
        top: 140px;
        left: 50%;
        transform: translateX(-50%);
    }

    .container .divide-line {
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
        display: inline-block;
    }

    .container .success-button {

    }

    .container .info-button {
        
    }
</style>