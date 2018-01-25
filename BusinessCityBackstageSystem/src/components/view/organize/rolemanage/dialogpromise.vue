<template>
    <el-dialog  width='60%' top='40px'  title="权限管理" :visible="dialogroleVisible" :modal='true' :before-close="ai_dialog_close">
        <el-row style='padding:0 5%;'>
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll"  @change="handleCheckAllChange">全选</el-checkbox>
            <el-checkbox-group v-model="checkedPromises" @change="handleCheckedPromiseChange">
                <el-checkbox v-for="item in promiselist" :key="item.id" :label="item">{{item.permissionsName}}</el-checkbox>
            </el-checkbox-group>
        </el-row>
        <el-row style='text-align:center;'>
            <el-button type="primary" round   @click="adddata">确定</el-button>
        </el-row>
    </el-dialog>
</template>
<script>
export default {
    data(){
        return{
            dialogroleVisible:false,
            isIndeterminate:false,
            checkAll:false,
            checkedPromises:[],
            promiselist:[],
            id:'',
            depid:''
        }
    },
    created:function(){
        // 得到已获得的权限列表
        this.$root.$on('showpromise',(data)=>{
            this.id=data.id;
            this.depid=data.depid;
            let checkedids=data.permissionid?data.permissionid.split(','):'';
            this.getpermissionlist(checkedids);
            this.dialogroleVisible=true;
        });
    },
    methods:{
        getpermissionlist(checkedids){
            let that=this;
            this.$http.post('/api/admin/permissions/find',[{
                type:'1'
            }])
            .then(function (response) {
                let data=response.data;
                that.checkedPromises=[];
                if(data.msg=='查询成功'){
                    that.promiselist=data.info.currentPermissionsList;
                }
                for(let i=0;i<checkedids.length;i++){
                    let id=that.promiselist.find((value, index, arr)=>{
                        return value.id==checkedids[i];
                    })
                    that.checkedPromises.push(id);
                }
                // console.log(that.checkedPromises);
            })
            .catch(function (response) {
                that.$message({
                    type:'info',
                    message:'权限查询失败'
                });
            });
        },
        adddata(){
            let that=this;
            let checklist=[];
            // console.log(this.checkedPromises);
            for(let i=0;i<this.checkedPromises.length;i++){
                checklist.push(this.checkedPromises[i].id);
            }
            this.$http.post('/api/admin/manage/group/update',[{
                id:that.id,
                permissionsId:checklist.join(',')
            }])
            .then(function (response) {
                let data=response.data;
                if(data.msg=='更新成功'){
                    that.$message({
                        type:'success',
                        message:'权限更新成功'
                    });
                    that.$root.$emit('getrole',that.depid);
                }
            })
            .catch(function (response) {
                that.$message({
                    type:'info',
                    message:'权限更新失败'
                });
            });
            this.dialogroleVisible=false;
        },
        ai_dialog_close(){
            this.dialogroleVisible=false;
        },
        handleCheckAllChange(val) {
            this.checkedPromises = val ? this.promiselist : [];
            this.isIndeterminate = false;
        },
        handleCheckedPromiseChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.promiselist.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.promiselist.length;
        },
    },
    beforeDestroy:function(){
        this.$root.$off('showpromise');
    }
}
</script>
<style scoped>
.el-checkbox-group .el-checkbox{
    width: 20%;
}
.el-checkbox+.el-checkbox{
    margin-left: 0 !important;
}
.el-button{
    width: 100px;
    background-color: #00aeaa;
    border-color: #00aeaa;
}
</style>

