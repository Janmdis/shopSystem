<template>
    <div>
    <el-table
    :data="datalist"
    :border="isBorder"
    @selection-change='showextra'
    @cell-click='showMemberInfo'
    :default-sort = "{prop: 'date', order: 'descending'}"
    v-loading="this.listLoading"
    :stripe='true'
    class='activityTable'
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
        :selectable='checkboxInit'
        width="55">
        </el-table-column>
        <el-table-column class='borderRight'
        fixed
        prop="image"
        label="图片"
        width='120'
        fixed
        >
            <template slot-scope="scope">
                <img :src="apis+'api'+scope.row.image" alt="">
            </template>
        </el-table-column>
        <el-table-column 
        prop="activityTitle" 
        label="活动标题" 
        width='260'>
        </el-table-column>
        <el-table-column
        prop="startTime"
        label="开始时间"
        width='170'>
        </el-table-column>
        <el-table-column
        prop="endTime"
        label="结束时间"
        width='170'>
        </el-table-column>
        <el-table-column
        prop="createTime"
        label="活动创建时间"
        width='170'>
        </el-table-column>
        <el-table-column
        label="活动状态">
        <template slot-scope="scope">
            <span :class="scope.row.isExpired==true?'templateStausColorGray':scope.row.activityStatus == 0?'templateStausColorRed':scope.row.activityStatus == 1?'templateStausColorGreen':''">
                {{ scope.row.isExpired==true?'已过期':scope.row.activityStatus == 0?'停用中':scope.row.activityStatus == 1?'启用中':'' }}
                </span>
        </template>
        </el-table-column>
        <el-table-column
        prop="activityPlace"
        label="活动地点"
        width='170'>
        </el-table-column>
        <el-table-column
        prop="registeredNumber"
        label="已报名人数"
        width='200'
        >
        </el-table-column>
        <el-table-column
        label="活动链接"
        width='260'>
        <template slot-scope="scope">
            <span>{{ apis+'eventTemplate?templateId='+scope.row.templateId+'&companyId='+scope.row.companyId+'&activeId='+scope.row.id }}</span>
        </template>
        </el-table-column>
        
         <!-- <el-table-column
        prop="activitySortId"
        label="分类ID"
        width='200'
        >
        </el-table-column> -->
        <el-table-column
        prop="note"
        label="活动标签"
        width='200'
        >
        </el-table-column>
        <el-table-column
        prop="followers"
        label="关注人数"
        width='200'
        >
        </el-table-column>
        <el-table-column
        prop="types"
        width='220'
        label="操作">
         <template slot-scope="scope">
            <el-button type="text"  size="small" @click="handleEdit(scope.$index, scope.row,$event)">
                <span>{{ scope.row.activityStatus == 0?'编辑':scope.row.activityStatus == 1?'编辑':'编辑'}}</span></el-button>
            <el-button type="text"  size="small" @click="handleSwicth(scope.$index, scope.row,$event)">
                <span :class="scope.row.isExpired==true?'templateStausColorGray':scope.row.activityStatus == 0?'templateStausColorRed':scope.row.activityStatus == 1?'templateStausColorGreen':''">
                    {{ scope.row.activityStatus == 0?'启用':scope.row.activityStatus == 1?'停用':'启用'}}</span>
                </el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row,$event)">删除</el-button>
        </template>
        </el-table-column> 
    </el-table>
    </div>
</template>
<script>
/* eslint-disable */
//@row-click="showMemberInfo()"
export default {
    prop:['listLoading'],
    data(){
        return {
            isBorder:false,
            datalist:[],
            showLeft:0,
            pageIndex:1,
            iframeLink:'',
            apis:'http://daojia.jingrunjia.com.cn/'
        }
    },
    created:function(){
        this.$root.$on('pageIndex',(data) => {
            this.pageIndex = data.value
            this.getDate(this.pageIndex)
        })
        this.getDate(1)
        this.$root.$on('markUpate', (data)=>{
            this.getDate(1)
        })
        this.$root.$on('getDatezdy',(data)=>{
             this.getDate(data);
        })
        this.$root.$on('dataListBox',(data)=>{
            this.datalist = data
        })
    },
    methods:{
        checkboxInit(row,index){
            if (row.activityStatus == 2){
                return 0;//不可勾选
            }else{
                return 1;//可勾选
            }
        },
        handleDelete(index, row,event) { //  删除某一个活动
            let that = this;
            console.log(row);
            this.$confirm('确定删除 "'+row.activityTitle+'"吗?', '提示', 
                {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'})
            .then(() => {
                that.$message({
                    type: 'success',
                    message: '操作成功!',
                    duration:800,
                    onClose:that.$http.post('/api/product/activity/update',
                        [{id:row.id,isActive:false}]
                    ).then(res => {
                        console.log(res.data.msg);
                        if(res.data.msg == '删除失败'){
                            that.$message({
                            type: 'info',
                            message: '请先停用该模板',
                            duration:800
                        }); 
                        }
                        that.getDate(1);
                    }).catch(err => {console.log(err)})
                });
            }).catch(() => {
                that.$message({
                    type: 'info',
                    message: '已取消删除',
                    duration:800
                });          
            });   
        },
        handleSwicth(index,row,event){
            let that = this;
            //console.log(row);
            
            console.log(row.activityStatus) //正在使用 1 停用 0
            let state ;
            let ids = row.id
            if(row.activityStatus == 1){
                state = 0
            }else if(row.activityStatus == 0){
                state = 1
            }
             this.$confirm('确定更改 "'+row.activityTitle+'"的状态吗?', '提示', 
                 {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'})
             .then(() => {
                 that.$message({
                     type: 'success',
                     message: '更改成功!',
                     duration:800,
                     onClose:that.$http.post('/api/product/activity/update',
                         [{
                              id:ids,
                              activityStatus:state
                          }]
                     ).then(res => {
                        // console.log(res.data.msg);
                         that.getDate(1);
                     }).catch(err => {console.log(err)})
                 });
             }).catch(() => {
                 that.$message({
                     type: 'info',
                     message: '已取消更改',
                     duration:800
                 });          
             });
        },
        handleEdit(index, row,event) {
            this.$root.$emit("showWindowss", { type: 'yes', rowData: row })
        },
        getDate(pageIndex) {
            let that = this
            this.listLoading =  true;
            let url = '/api/product/activity/find?page='+pageIndex+'&pageSize=10';
            this.$http({
                url: url,
                method: 'POST',
                // 请求体重发送的数据
                // headers: { 'Content-Type': 'application/json' },
                data:{
                },
            })
            .then(response => {
                that.listLoading =  false;
                that.datalist=(response.data.info.list);
                console.log(that.datalist)
                console.log(response.data.msg)
                console.log(response.data.info.pages)
                console.log(response.data.info.total)
                that.$root.$emit('pagess',response.data.info.pages)
                that.$root.$emit('totals',response.data.info.total)
          })
          .catch(error=>{
              console.log(error);
              alert('网络错误，不能访问');
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
    },
    beforeDestroy(){
        this.$root.$off('pageIndex');
        this.$root.$off('getDatezdy');
        this.$root.$off('dataListBox')
    }
}
</script>
<style>
.activityTable tr td:nth-child(3){
    padding:0;
}
.activityTable tr td:nth-child(3) .cell{
    width:80%;
    height:50px;
    margin:0 auto;
    padding:0;
    background-color:#ebeef5;
}
.activityTable tr td:nth-child(3) .cell img{
    width:100%;
    height:50px;
}
.activityTable .recommendlist{
    /* height:50px; */
    overflow-x:auto;
    position: relative;
    top:10px;
    margin-bottom:5px;
}
.activityTable .recommendlist+button{
    position: relative;
    /* top:10px; */
}
.activityTable .recommendlist p{
    /* width:max-content; */
}
</style>
<style lang="" scoped>
.templateStausColorGreen{
    color:#50c380;
}
.templateStausColorRed{
    color:#ff3b30
}
.templateStausColorGray{
    color:#7b7b7b;
}
a{text-decoration: none; color: #eee; display: block;}
    .button{       
         width: 35px;
        height: 35px;}
    .callout_button{background:#FF5B5B;margin:0 auto; }
    .callout_button:hover{background: red;}
    .close_button{ 
        width: 35px;
        height: 35px;
        border-radius: 50px;
        text-align: center;
        line-height: 32px;
        position: absolute;
        top: 20px;
        left: 264px;   
        background: #272424;
        margin: 0 auto;
    }
    .close_button:hover{background: black;}
    
</style>