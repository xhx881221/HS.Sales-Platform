<template>
    <div id="seriesManagement">
        <contentHeader :title="sectorName" :button="gotoSector" @goback="gotoSectorManagement"></contentHeader>
        <div class="content">
            <div class="series-operate"></div><!--
            --><div class="series-table"></div>
        </div>
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
                gotoSector: {
                    name: this.$t("Button.BackToSector")
                }
            }
        },
        methods: {
            gotoSectorManagement() {
                this.$router.push("sectorManagement");
            }
        },
        mounted: function() {
            this.sectorName = this.$route.params.sectorName;
		}
    }
</script>

<style scoped>
    #seriesManagement {
        height: 100%; width: 100%;
    }

    .content {
        padding: 12px 12px 20px 12px;
        height: calc(100% - 32px);
        width: calc(100% - 24px);
    }

    .series-operate .series-table {
        display: inline-block;
        background-color: #ffffff;
        height: 100%;
    }

    .series-operate {
        width: 262px;
    }

    .series-table {
        
    }
</style>