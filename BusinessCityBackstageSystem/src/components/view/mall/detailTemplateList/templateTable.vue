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
            <span>{{ scope.row.templateType == 1?'首页模板':scope.row.templateType == 2?'活动模板':scope.row.templateType == 3?'详情模板':'自定义'}}</span>
        </template>
        </el-table-column>
        <el-table-column
        label="模板状态">
        <template slot-scope="scope">
            <span :templateStaus="templateStu(scope.row.templateID)">{{ templateStauss }}</span>
        </template>
        </el-table-column>
        <el-table-column
        prop="createTime"
        label="创建时间">
        </el-table-column>
        <el-table-column
        label="模板地址">
        <template slot-scope="scope">
            <span>{{ 'http://www.greenCity.com'+scope.row.templateID }}</span>
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
            proTemplate:'',
            templateStauss:'...',
            showLeft:0,
            pageIndex:1
        }
    },
    created:function(){
        this.getDate(1)
        this.$root.$on('pageIndex',(data) => {
            this.pageIndex = data.value
            this.getDate(this.pageIndex)
        })
        this.$root.$on('getDatezdy',(data)=>{
             this.getDate(data);
        })
        this.$root.$on('dataListBox',(data)=>{
            this.datalist = data
        })
        
    },
    methods:{
        handleDelete(index, row,event) { //  删除某一个模板
            let that = this;
           // console.log(row);
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
                            message: '请选择停用中的模板',
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
        handleEdit(index, row,event) {
           // this.$root.$emit('showWindowss',{type:'yes',rowData:row});
           // console.log(row)
            let datas = JSON.stringify(row)
            window.sessionStorage.setItem ("Template_AllData",datas);
            //this.$store.dispatch('editTemplate',row)
            this.$router.push({ path: '/mallSet' })
        },
        getProduct(templateIdArr){
            let that = this;
            let url = '/product/commodity/info/queryListByDetailTemplateIds'
            this.$http.post('/api/product/commodity/info/queryListByDetailTemplateIds',
             templateIdArr
            ).then(res => {
               // console.log(res)
                let templateIdArrs = [];
                let productArr = res.data.info
                if(productArr.length == 0){
                    this.templateStauss = '停用中'
                }
                for(let i = 0;i<productArr.length;i++){
                    templateIdArrs.push(productArr[i].detailTemplateId)
                }
                //console.log(templateIdArrs)
                that.proTemplate = templateIdArrs
            }).catch(error => {
                console.log(error)
            })
        },
        templateStu(id){
          //console.log(id)
           let ids = id
           let arr = this.proTemplate
           //console.log(arr)
            for(let i=0;i<arr.length;i++){
                if(ids == arr[i]){
                    return this.templateStauss = '启用中'
                }else{
                     this.templateStauss = '停用中'
                }
            }
        },
        getDate(pageIndex) {
            this.listLoading =  true;
            let url = '/api/product/mall/template/query?page='+pageIndex+'&pageSize=10';
            this.$http({
                url: url,
                method: 'POST',
                // 请求体重发送的数据
                // headers: { 'Content-Type': 'application/json' },
                data:{
                    'templateType':3
                },
            })
            .then(response => {
                this.listLoading =  false;
                this.datalist=(response.data.info.list);
                //console.log(response.data.msg)
                this.$root.$emit('pages',response.data.info.pages)
                this.$root.$emit('total',response.data.info.total)
                let templateIdArr = [];
                let dataArr = response.data.info.list
                //console.log(dataArr)
                for(let i = 0;i<dataArr.length;i++){
                    templateIdArr.push(dataArr[i].templateID)
                }
               // console.log(templateIdArr)
                this.getProduct(templateIdArr)
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
