<template>
    <el-main>
        <el-row class='top'>
            <el-col :span='15'>
                <lttip :name='namepage'></lttip>
            </el-col>
            <el-col :span='9'>
                <div class="grid-content search">
                    <el-input
                        placeholder="请输入内容"
                        suffix-icon="el-icon-search"
                        v-model="valuesearch">
                    </el-input>
                    <el-button type="primary" round>新增</el-button>
                    <el-button type="primary" class="research"><i class='el-icon-refresh'></i></el-button>
                </div>
            </el-col>
        </el-row>
        <el-row class="datalist">
            <Datatable :data='datalist'></Datatable>
        </el-row>
        <el-row class="pages">
            <div class="block">
                <el-pagination
                    layout="prev, pager, next"
                    :total="1000">
                </el-pagination>
            </div>
        </el-row>
        <Dialogedit></Dialogedit>
    </el-main>
</template>
<script>
import Lttip from '@/components/common/tipspage/lttip.vue'
import Datatable from './datatable.vue'
import Dialogedit from './dialogedit.vue'
export default {
    components:{Lttip,Datatable,Dialogedit},
    data(){
        return {
            namepage:'角色管理',
            datalist:[
                {
                    id:'20181001',
                    name:'test1',
                    belongdep:'x',
                    authority:'admin'
                },
                {
                    id:'20181002',
                    name:'test2',
                    belongdep:'x',
                    authority:'admin'
                },
                {
                    id:'20181003',
                    name:'test3',
                    belongdep:'x',
                    authority:'admin'
                },
                {
                    id:'20181004',
                    name:'test4',
                    belongdep:'x',
                    authority:'admin'
                },
                {
                    id:'20181001',
                    name:'test1',
                    belongdep:'x',
                    authority:'admin'
                },
                {
                    id:'20181002',
                    name:'test2',
                    belongdep:'x',
                    authority:'admin'
                },
                {
                    id:'20181003',
                    name:'test3',
                    belongdep:'x',
                    authority:'admin'
                },
                {
                    id:'20181004',
                    name:'test4',
                    belongdep:'x',
                    authority:'admin'
                }
            ],
            valuesearch:'',
        }
    },
    methods:{
        opendialogedit(){
            this.$root.$emit('showeditdialog');
        }
    }
}
</script>
<style scoped>
.el-main{
    width: 83.33333%;
    left: 16.66667%;
    height: 100%;
    margin-bottom: -70px;
    background-color:#fff;
    position: absolute;
    top: 70px;
}
@media only screen and (min-width: 992px) {
    .el-main{
        width: 83.33333%;
        left: 16.66667%;
    }  
}
@media only screen and (min-width: 1200px) {
    .el-main{
        width: 87.5%;
        left: 12.5%;
    }   
}
/* .el-row{
    height: 100%;
}
.el-col{
    height: 100%;
} */
.search{
    height:72px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.el-button--primary{
    font-size: 16px;
    width: 90px;
    height:37px;
    line-height: 0;
    margin-left: 15px;
}
.el-button--primary:hover{
    background-color: #00adab;
}
.top .research{
    background: none;
    border: none;
    color:#00adab;
    font-size: 40px;
    padding: 0;
}
.pages{
    text-align: right;
    margin-top: 20px;
    margin-bottom: 60px;
}
</style>
<style>
.top .el-input__inner{
    border-radius: 40px;
}
</style>
