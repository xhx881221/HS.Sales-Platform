<template>
    <header class="header">
        <div>
            <h2 class="title">{{title}}</h2>
        </div>

        <el-button size="medium" icon="el-icon-refresh-left" v-if="button" class="header-button" @click="goback">{{button.name}}</el-button>
    </header>
</template>

<script>
    export default {
        name: "ContentHeader",
        props: {
            title: {
                type: String,
                required: true
            },
            button: {
                type: [Object, Boolean],
                default: function() {
                    return false;
                }
            }
        },
        methods: {
            goback() {
                this.$emit('goback');
            }
        }
    }
</script>

<style>
    .header .el-button {
        color: #534F71;
        background-color: #ffffff;
        border: 1px solid #f1f1f1;
    }

    .header .el-button:focus, .header .el-button:hover {
        color: #534F71;
        background-color: #ffffff;
        border-color: #2B91FF;
    }
</style>

<style scoped>
    header {
        width: inherit; height: 56px;
        background-color: #ffffff;
        box-shadow: 0px 1px 2px 0px rgba(59,59,59,0.18);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .title {
        font-size: 18px;
        font-weight: normal;
        color: #000000;
        line-height: 56px;
        margin-left: 36px;
        position: relative;
    }

    .title:before {
        content: "";
        width: 3px;
        height: 25px;
        background-color: #2B91FF;
        position: absolute;
        left: -8px;
        top: 50%;
        transform: translateY(-50%);
    }

    .header-button {
        margin-right: 54px;
    }
</style>