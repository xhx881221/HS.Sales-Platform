<template>
    <header>
        <span class="title">{{title}}</span>
    </header>
</template>

<script>
    export default {
        name: "ContentHeader",
        props: ["title"]
    }
</script>

<style scoped>
    header {
        width: inherit; height: 56px;
        background-color: #ffffff;
        box-shadow: 0px 1px 2px 0px rgba(59,59,59,0.18);
    }

    .title {
        font-size: 18px;
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
</style>