<template>
    <div id='app'>
        <router-view/>
    </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style>
    * {
        /* Main styles */
        margin: 0;
        padding: 0;
        box-sizing: border-box;

        /* Type-face */
        font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
    }

    html, body, #app {
        height: 100%;
        width: 100%;
        overflow: hidden;
    }

    /* Float left class */
    .left {
        float: left;
    }

    .right {
        float: right;
    }

    /* Makes collapse active item blue */
    .el-collapse-item__header.is-active {
        color: #409EFF !important;
    }
</style>
