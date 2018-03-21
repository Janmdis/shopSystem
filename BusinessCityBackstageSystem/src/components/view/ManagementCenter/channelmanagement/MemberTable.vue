<template>
    <el-table
    :data="datalist"
    @selection-change='showextra'
    @cell-click='showMemberInfo'
    :default-sort = "{prop: 'date', order: 'descending'}"
    v-loading="listLoading"
    :stripe='true'
    class='channeltable'
    style="width: 100%"
    height='500'>
    <el-table-column
    fixed
    type="index"
    label="N"
    :index="indexMethod">
    </el-table-column>
        <el-table-column
        fixed
        type="selection"
        width="55" >
        </el-table-column>
        <el-table-column
        prop="name"
        label="团队"
        width='120'
        fixed
        >
        </el-table-column>
        <el-table-column
        prop="typeName"
        label="类型">
        </el-table-column>
        <el-table-column
        label="联系人">
            <template slot-scope="scope">
                <!-- <i class='icon-leader' style='width:10px;height:18px;color:#409EFF;position:absolute;left:20%;top:20px;font-size:20px;background:url("static/images/icons/leader.png");'></i> -->
                <span style='position:relative;padding-left:15px;'><i class='icon-leader' style='width:10px;height:18px;position:absolute;left:0;top:1px;background:url("static/images/icons/leader.png");'></i>{{scope.row.leaderAdmin!=null?scope.row.leaderAdmin.adminName:''}}</span>
            </template>
        </el-table-column>
        <el-table-column
        prop="leaderAdmin.phone"
        label="电话">
        </el-table-column>
        <el-table-column
        prop="levelName"
        label="等级">
        </el-table-column>
        <el-table-column
        prop="adminCount"
        label="团队人数">
        </el-table-column>  
        <el-table-column
        prop="createTime"
        label="创建时间"
        width='100'>
            <template slot-scope="scope">
                <span>{{scope.row.createTime.substring(0,10)}}</span>
                <p v-for="(item,index) in scope.row.commoditys" :key='index'>
                    {{item}}
                </p>
            </template>
        </el-table-column>  
        <el-table-column 
        fixed="right"
        width='200'
        label="操作">
        <template slot-scope="scope" >
            <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
            <el-button type="text" size="small" @click="createercode(scope.row)">生成邀请码</el-button>
            
        </template>
    </el-table-column>
    </el-table>
</template>
<script>
/ eslint-disable /
//@row-click="showMemberInfo()"
export default {
    data(){
        return {
            datalist:[],
            showLeft:0,
            pageIndex:1,
            listLoading:false,
            data:{
                name:null,
                typeId:null,
                levelId:null
            }
        }
    },
    created:function(){
        this.$root.$on('pageIndex',(data) => {
            this.pageIndex = data.value
            console.log(data)
            this.getDate(this.pageIndex,{})
        })
        this.getDate(1)
        this.$root.$on('getDatezdy',(data)=>{
             this.getDate( 1,data)
        })
        this.$root.$on('dataListBox',(data)=>{
            this.datalist = data
        })
        this.$root.$on('searchchannellist',(name)=>{
            this.getDate(1,{name:name});
        });
        this.$root.$on('reloadchannel',()=>{
            this.getDate(1,{});
        });
        this.$root.$on('deletedata',(datas)=>{
            let ids=[];
            datas.forEach(item=>{
                ids.push(item.id);
            });
            this.deletedata(ids);
        });
        this.$root.$on('search',(datas)=>{
            // let data={
            //     name:datas.channel.name,
            //     typeId:datas.channel.typeId,
            //     levelId:datas.channel.levelId
            // }
            this.data.name=datas.channel.name;
            this.data.typeId=datas.channel.typeId;
            this.data.levelId=datas.channel.levelId;
            this.getDate(1);
        });
    },
    methods:{
        getDate(pageIndex) {
            this.listLoading =  true;
            let url = '/api/admin/teamManagement/queryTeamManagement?pageNum='+pageIndex+'&pageSize=10';
            this.$http({
                url: url,
                method: 'POST',
                // 请求体重发送的数据
                headers: { 'Content-Type': 'application/json' },
                data:this.data,
            })
            .then(response => {
                console.log(response);
                if(response.data.status==200){
                    this.datalist=(response.data.info.list);
                    this.$root.$emit('pages',response.data.info.pages)
                    this.$root.$emit('total',response.data.info.total)
                }
                else{
                    this.$message(response.data.info);
                }
                this.listLoading =  false;
          })
          .catch(error=>{
              console.log(error);
              alert('网络错误，不能访问');
              this.listLoading =  false;
          })
        },
        showMemberInfo(row,column,cell,event){//  点击显示侧滑
            //console.log(row,column,cell,event)
            //  let classNum = cell.className.split('n_')[1] //  获取单元格的类名
            let labelValue = column.label
            if(labelValue == 'ID'){
                this.showLeft = 16
                this.$root.$emit('infoCoverShow',this.showLeft)
                this.$root.$emit('searchPersonnelInfo',row.id)
            }
        },      
        showextra(val){
             let show=false;
             let editcan=true;
             this.multipleSelection = val
            if(this.multipleSelection.length>0){
                show=true;
            }
            if(this.multipleSelection.length>1){
                editcan=false;
            }
             this.$root.$emit('showlttip',{show,editcan,num:this.multipleSelection.length,datas:this.multipleSelection});
        },
        indexMethod(index) {
            return index + 1
        },
        handleEdit(row){
            this.$root.$emit('editchannel',row);
        },
        handleDelete(row){
            this.deletedata([row.id]);
        },
        deletedata(ids){
            let that=this;
            this.$confirm('是否删除数据？','提示',{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            })
            .then(()=>{
                this.$http.post('/api/admin/teamManagement/removeTeamManagement',ids)
                .then(function(response){
                    if(response.data.status=='200'){
                        that.$message.success('删除成功');
                        that.getDate(1);
                    }
                })
                .catch(function(response){
                    console.log('删除失败');
                });
            })
            .catch(()=>{
                this.$message({
                    type:'info',
                    message:'已取消删除'
                });
            });
            
            
        },
        createercode(row){
            let id=row.id;
            let url='http://101.89.175.155:8777/customer/resource/qrCode.png?content=http://101.89.175.155:81/invitingGift?recommendedAdminId='+id;
            this.$root.$emit('qrcode',url);
        }
    },
    beforeDestroy(){
        this.$root.$off('search');
        
        this.$root.$off('pageIndex');
        this.$root.$off('getDatezdy')
        this.$root.$off('dataListBox')
        this.$root.$off('searchchannellist')
        this.$root.$off('reloadchannel')
        this.$root.$off('deletedata')
    }

}
</script>
<style>
@import '../Member.less';
.channeltable table td:nth-child(3) .cell{
    border:none !important;
}
</style>
