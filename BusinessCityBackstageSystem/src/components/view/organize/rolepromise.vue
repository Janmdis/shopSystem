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
        <el-form ref="roleform" class='roleform' :model='formrole' label-width="80px" :rules="rules" v-if='showinput'>
            <el-row :gutter='10'>
                <el-col :span='6'>
                    <el-form-item label="角色名称"  size='small' prop='name'>
                        <el-input placeholder="角色名称" v-model='formrole.name'></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='6'>
                    <el-form-item label="角色编号"  size='small' prop='number'>
                        <el-input placeholder="角色编号" v-model='formrole.number'></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='5'>
                    <el-form-item label="所属部门" size='small' prop='depid'>
                        <el-select  placeholder="请选择" v-model='formrole.depid' @change='changedep'>
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
         <el-button type="primary" style='width:120px;margin:0 auto;display:block;' @click='savedata'>保存</el-button>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data(){
        return{
            name:'新增角色',
            id:'',
            listLoading:false,
            formrole:{
                name:'',
                number:'',
                depid:'',
                depname:''
            },  
            checkedPromise:[],
            checkAll:[],
            isIndeterminate:true,
            rules:{
                name:[
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
                number:[
                    { required: true, message: '请输入角色编号', trigger: 'blur' }
                ],
                depid:[
                    { required: true, message: '请选择部门', trigger: 'change' }
                ]
            },
            type:'create',
            showinput:true
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
            console.log(datas);
            this.type=datas.type;
            if(this.type=='edit'){
                this.showinput=false;
                this.name='编辑权限';
                this.id=datas.id;
                this.checkedPromise=[];
                this.promiseslist.forEach((item,index)=>{
                    this.checkedPromise[index]=[];
                    datas.permissionid.split(',').forEach(perssionid=>{
                        item.children.forEach(item2=>{
                            if(item2.id==perssionid){
                                this.checkedPromise[index].push(perssionid);
                            }
                        });
                    });
                });
                console.log(this.checkedPromise);
            }
            document.querySelector('.createrole').setAttribute('class','createrole on');
        });
    },
    methods:{
        // 保存角色信息
        savedata(){
            let that=this;    
            let checkedlist=[];
            let checks=[];
            this.checkedPromise.forEach((item,index)=>{
                checks[index]=item.slice(0);
            });
            checks.forEach((item,index)=>{
                let length=item.length;
                if(length>0){
                    checks[index].push(this.promiseslist[index].id);
                }
            });
            checks.forEach((item)=>{
                item.forEach(item1=>{
                    checkedlist.push(item1);
                });
            });
            let checkedids=checkedlist.join(',');
            console.log(checkedids);      
            if(this.type=='create'){
                this.$refs.roleform.validate((valid)=>{
                    if(valid){
                        
                        this.$http.post('/api/admin/manage/group/insert',{
                            departmentId:that.formrole.depid,
                            groupName:that.formrole.name,
                            groupNumber:that.formrole.number,
                            departmentName:that.formrole.depname,
                            permissionsId:checkedids
                        })
                        .then(function(response){
                            console.log(response);
                            let data=response.data;
                            if(data.status==200){
                                that.$message.success(data.msg);
                                that.$store.dispatch('getRolelist',{depid:that.depid});
                                document.querySelector('.createrole').setAttribute('class','createrole');
                            }
                            else{
                                that.$message(data.msg);
                            }
                            
                        })
                        .catch(function(response){
                            console.log(response);
                            that.$message('创建失败');
                        })
                    }
                })
            }
            else{
                // console.log(this.id,checkedids);
                this.$http.post('/api/admin/manage/group/update',[{
                    id:this.id,
                    permissionsId:checkedids
                }])
                .then(function(response){
                    if(response.data.status==200){
                        that.$message.success(response.data.msg);
                        that.$store.dispatch('getRolelist',{depid:that.depid});
                        document.querySelector('.createrole').setAttribute('class','createrole');
                    }
                    else{
                        that.$message(response.data.msg);
                    }
                })
                .catch(function(response){
                    console.log(response);
                    that.$message('修改失败');
                })
            }
        },
        changedep(value){
            this.formrole.depid=value;
            // console.log(this.deplist.length);
            this.deplist.forEach(item=>{
                if(item.id==value){
                    this.formrole.depname=item.departmentName;
                }
            });
            // console.log(value);
        },
        handleCheckedPromiseChange(value,list,index){
            // console.log(value);
            let checkedCount = value.length;
            this.$set(this.checkAll,index,checkedCount == list.length);
            this.checkedPromise[index]=[];
            value.forEach(item=>{
                this.checkedPromise[index].push(item);
            });
            // console.log(this.checkedPromise[index]);
            this.isIndeterminate = checkedCount > 0 && checkedCount < list.length;
        },
        handleCheckAllChange(val,list,index) {
            this.checkedPromise[index]=[];
            if(val){
                list.forEach(item=>{
                    this.checkedPromise[index].push(item.id);
                });
            }
            // this.checkedPromise[index].push(this.promiseslist[index].id);
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
    display: none;
    background-color: #fff;
}
.createrole.on{
    left:0;
    display: block;
}
.roleform{
    margin-left: 10px;
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
