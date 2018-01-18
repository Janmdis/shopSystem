<template>
    <div class='searchs'>
        <el-tabs :tab-position="tabPosition" style="height: 200px;">
            <el-tab-pane label="用户管理">
                <searchSave></searchSave>
            </el-tab-pane>
            <el-tab-pane label="配置管理">
                <searchinput></searchinput>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<style lange='less'>
    .searchs {
        position: absolute;
        height: 200px;
        width: 360px;
        top: 60px;
        left: 0;
        background: #fff;
        z-index: 6;
    }
    .el-tabs__item {
        color: #fff;
    }
    .el-tabs__header {
        background: #112935;
    }
    .el-tabs__item.is-active {
        color: #fff;
        background: #0a1921;
    }
</style>
<script>
    import searchSave from './searchSave.vue'
    import searchinput from './searchinput.vue'
    export default {
        data() {
            return {
                tabPosition: 'left'
            };
        },
        components: {
            searchSave,
            searchinput
        }
    };
</script>