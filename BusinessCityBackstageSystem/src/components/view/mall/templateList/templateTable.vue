<template>
    <el-table
    :data="datalist"
    :border="isBorder"
    @selection-change='showextra'
    @cell-click='showMemberInfo'
    :default-sort = "{prop: 'date', order: 'descending'}"
    v-loading="this.listLoading"
    :stripe='true'
    style="width: 100%">
    <el-table-column
    fixed
    type="index"
    label="N"
    :index="indexMethod">
    </el-table-column>
        <el-table-column
        fixed
        type="selection" >
        </el-table-column>
        <el-table-column class='borderRight' fixed 
        prop="templateName" 
        label="模板名称" 
        width='360' height='100'>
        </el-table-column>
        <el-table-column
        label="模板分类">
        <template slot-scope="scope">
            <span>{{ scope.row.templateType == 1?'首页模板':scope.row.templateType == 2?'活动模板':'自定义'}}</span>
        </template>
        </el-table-column>
        <el-table-column
        prop="createTime"
        label="创建时间">
        </el-table-column>
        <el-table-column
        label="模板地址">
        <template slot-scope="scope">
            <span>{{ 'http://www.greenCity.com?id=' + scope.row.templateID }}</span>
        </template>
        </el-table-column>
        <el-table-column
        prop="description"
        label="模板描述"
        >
        </el-table-column>
        <el-table-column
        prop="types"
        label="操作">
         <template slot-scope="scope">
             <el-button type="text"  size="small" @click="handleSee(scope.$index, scope.row,$event)">浏览</el-button>
            <el-button type="text"  size="small" @click="handleEdit(scope.$index, scope.row,$event)">编辑</el-button>
            <el-button type="text"  size="small" @click="handleSwicth(scope.$index, scope.row,$event)">
                <span>{{ scope.row.isEnabled == true?'停用':scope.row.isEnabled == false?'启用':''}}</span>
                </el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row,$event)">删除</el-button>
        </template>
        </el-table-column> 
    </el-table>
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
            pageIndex:1
        }
    },
    created:function(){
        this.$root.$on('pageIndex',(data) => {
            this.pageIndex = data.value
            this.getDate(this.pageIndex)
        })
        this.getDate(1)
        this.$root.$on('getDatezdy',(data)=>{
             this.getDate(data);
        })
        this.$root.$on('dataListBox',(data)=>{
            this.datalist = data
        })
        
    },
    methods:{
        handleDelete(index, row,event) { //  删除某一种产品
            let that = this;
            console.log(row);
            this.$confirm('确定删除 "'+row.templateName+'"吗?', '提示', 
                {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'})
            .then(() => {
                that.$message({
                    type: 'success',
                    message: '操作成功!',
                    duration:800,
                    onClose:that.$http.post('/api/product/mall/template/remove',
                        [row.templateID]
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
            console.log(row);
            this.$confirm('确定更改 "'+row.templateName+'"的状态吗?', '提示', 
                {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'})
            .then(() => {
                that.$message({
                    type: 'success',
                    message: '更改成功!',
                    duration:800,
                    onClose:that.$http.post('/api/product/mall/template/remove',
                        [row.templateID]
                    ).then(res => {
                        console.log(res.data.msg);
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
           // this.$root.$emit('showWindowss',{type:'yes',rowData:row});
            console.log(row)
            this.$store.dispatch('editTemplate',row)
            this.$router.push({ path: '/mallSet' })
        },
        getDate(pageIndex) {
            this.listLoading =  true;
            let url = '/api/product/mall/template/query?page='+pageIndex+'&pageSize=10';
            this.$http({
                url: url,
                method: 'POST',
                // 请求体重发送的数据
                // headers: { 'Content-Type': 'application/json' },
                data:{},
            })
            .then(response => {
                this.listLoading =  false;
                this.datalist=(response.data.info.list);
                console.log(response.data.msg)
                this.$root.$emit('pages',response.data.info.pages)
                this.$root.$emit('total',response.data.info.total)
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
