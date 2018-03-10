<template>
    <div class='createrole'>
        <div class="memberNav" >
            <el-row class="navChild">
                <el-col :span='24' class="grid-content">
                    <div class="productDesignation">
                        <h3 class="listName pull-left">{{name}}</h3>
                    </div>
                </el-col>
            </el-row>
        </div>
        <el-form ref="roleform" class='roleform' :model='formrole' label-width="80px" :rules="rules">
            <el-row :gutter='0'>
                <el-col :span='6'>
                    <el-form-item label="角色名称"  size='small' prop='name'>
                        <el-input placeholder="角色名称" v-model='formrole.name'></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='5'>
                    <el-form-item label="所属部门" size='small' prop='typeId'>
                        <el-select  placeholder="请选择" v-model='formrole.depid'>
                            <el-option
                            v-for="item in deplist"
                            :key="item.id"
                            :value-key="item.id"
                            :label="item.departmentName"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>   
            </el-row>
        </el-form>
        <div class='promiseinfo'>
            <header style='padding:10px;background-color: #edf9ff;'>权限</header>
            <el-table
            ref="multipleTable"
            :data="promiseslist"
            @select='selectpromisechange'
            @select-all='selectpromiseall'
            stripe
            border
            style="width: 100%">
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column
                label="模块"
                prop='info'
                class='selectall'
                width="180">
                    <!-- <template slot-scope="scope">
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll[scope.$index]" @change="handleCheckAllChange($event,scope.row.children,scope.$index)">{{scope.row.info}}</el-checkbox>
                    </template> -->
                </el-table-column>
                <el-table-column
                label="权限">
                    <template slot-scope="scope">
                        <el-checkbox-group v-model="checkedPromise[scope.$index]" @change="handleCheckedPromiseChange($event,scope.row.children,scope.$index)">
                            <el-checkbox class='selectpromise' v-for="(item,index) in scope.row.children" :label="item.id" :key="index">{{item.info}}</el-checkbox>
                        </el-checkbox-group>
                    </template>
                </el-table-column>
             </el-table>
        </div>
         <el-button type="primary" style='width:120px;margin:0 auto;display:block;'>保存</el-button>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data(){
        return{
            name:'新增角色',
            listLoading:false,
            formrole:{
                name:'',
                depid:''
            },  
            checkedPromise:[],
            checkAll:[],
            isIndeterminate:true,
            rules:{
                name:[
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
            }
        }
    },
    updated() {
        this.checkAll=[];
        this.promiseslist.forEach(row=>{
            this.checkAll.push(false);
            this.checkedPromise.push([]);
        });
    },
    watch:{
        checkAll(){
            this.checkAll.forEach((item,index)=>{
                this.$refs.multipleTable.toggleRowSelection(this.promiseslist[index],item);
            });
        }
    },
    created:function(){
        this.$root.$on("exportvisrole",(datas)=>{
            document.querySelector('.createrole').setAttribute('class','createrole on');
        });
    },
    methods:{
        handleCheckedPromiseChange(value,list,index){
            let checkedCount = value.length;
            this.$set(this.checkAll,index,checkedCount == list.length);
            this.isIndeterminate = checkedCount > 0 && checkedCount < list.length;
        },
        handleCheckAllChange(val,list,index) {
            this.checkedPromise[index]=[];
            if(val){
                list.forEach(item=>{
                    this.checkedPromise[index].push(item.id);
                });
            }
            this.isIndeterminate = false;
        },
        selectpromisechange(val,row){
            let check=val.includes(row);
            let index= this.promiseslist.indexOf(row);
            this.$set(this.checkAll,index,check);
            this.handleCheckAllChange(check,row.children,index);
        },
        selectpromiseall(val){
            let selectall=val.length==this.promiseslist.length;
            this.checkAll.forEach((item,index)=>{
                this.$set(this.checkAll,index,selectall);
                this.handleCheckAllChange(selectall,this.promiseslist[index].children,index);
            });
        }
    },
    computed: {
        ...mapState({
            promiseslist: state => state.promiselist.promiselist,
            deplist: state => state.deplist.deplistall
        })
    },
    beforeDestroy(){
        this.$root.$off('exportvisrole');
    }
}
</script>
<style scoped>
.createrole{
    width:100%;
    padding-bottom: 100px;
    min-height:100%;
    position: absolute;
    top: -18px;
    right:-2000px;
    z-index: 99;
    background-color: #fff;
}
.createrole.on{
    left:0;
}
.productDesignation{
    height: 72px;
    position: relative;
    margin-left: 33px;
}
.productDesignation>i {
	color: #3da4c3;
}
.productDesignation h3 {
	padding-top: 25px;
	font-size: 20px;
	color: #0D4156;
	padding-left: 20px;
}
.productDesignation h3:before {
	content: "";
	width: 4px;
	height: 22px;
	display: block;
	position: absolute;
	background: #253a4d;
	left: 0px;
	top:26px;
}
.memberNav{
    background-color: #fff;
}
.memberNav::after{
    content: '';
    display:block;
    margin-right: 16px;
    border-top:6px solid #56d2f4;
}
.roleform{
    padding-top: 25px;
}
.promiseinfo{
    height: 70%;
    padding: 10px;
}
.promiseinfo .cell{
    
    text-align: left;
}
.selectpromise{
    width: 25%;
    float: left;
    padding: 5px 0;
    text-align: left;
    overflow-x:auto;
}

</style>
<style>
.el-checkbox+.el-checkbox{
    margin-left: 0 !important;
}
.promiseinfo .el-table__row td:nth-child(2){
    text-align: left !important;
}
</style>
