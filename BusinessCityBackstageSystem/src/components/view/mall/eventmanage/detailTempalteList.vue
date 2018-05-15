<template>
      <el-dialog
        title="活动模板"
        :visible.sync="dialogVisibless"
        width="52%"
        >
            <el-row style='padding-bottom:10px;' :gutter='24'>
                <el-col :span="6">
                    <div class='typeselect'>
                        <el-input
                            placeholder="输入相关标题"
                            v-model="name"
                            >
                        </el-input>
                    </div>
                </el-col>
                <el-col :span='3'>
                    <el-button size="mini" class='createservice' @click="nameSelect">搜索</el-button>
                </el-col>
            </el-row>
            <el-table 
                :data="listgoods" 
                ref='goodtable' 
                style="width: 100%;    height: 496px;" 
                class='table-products' 
                @select="selectChange"
                v-loading='loading'>
                    <el-table-column
                    fixed
                    type="selection" 
                    width="55">
                    </el-table-column>
                    <el-table-column  prop="templateName" label="模板标题"  >
                    </el-table-column>
                    <el-table-column
                    label="模板状态">
                    <template slot-scope="scope">
                        <span :class="scope.row.isEnabled == true?'templateStausColorGreen':scope.row.isEnabled == false?'templateStausColorRed':''">{{ scope.row.isEnabled?'启用':'停用' }}</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="createTime"
                    label="创建时间"
                    width='170'>
                    </el-table-column>
                    <el-table-column
                    prop="description"
                    label="模板描述"
                    width='200'
                    >
                    </el-table-column>
                </el-table>
                <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="pages"
                layout="prev, pager, next, jumper"
                :total="total">
                </el-pagination>
                <div class="zbd-selectedTip" v-show="selectedDiv">已选择：<span :style="tipcolor">{{ selectedTitle }}</span></div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibless = false">取 消</el-button>
                <el-button type="primary" :disabled="disabled" @click="saveTemplateID">确 定</el-button>
            </span>
        </el-dialog>
</template>
<script>
  export default {
       data() {
        return {
            dialogVisibless: false,
            name:'',
            disabled:false,
            selectedDiv:false,
            tipcolor:{
                color:""
            },
            selectedTitle:'',
            currentPage:1,
            total:1,
            pages:1,
            type:'',
            typeid:'',
            listgoods:[],
            loading:true,
            input:'',
            proTemplate:'',
        };
    },
    methods: {
       getDatalist(data){
                let that=this;
                let pageindexs = data.pageindex;
                let names = data.namess
                this.loading=true;
                this.$http.post('/api/product/mall/template/query?page='+pageindexs+'&pageSize=10',
                                {"templateName":names,'templateType':2}
                )
                .then(function (response) {
                    console.log(response);
                    if(response.data.msg=='查询成功'){
                        let data=response.data.info;
                        that.listgoods=data.list;
                        that.pages=data.pageSize;
                        that.total=data.total;
                        that.currentPage=data.pageNum;
                    }
                    else{
                        that.$message(response.data.msg);
                    }
                    console.log(response);
                    that.loading=false;
                    
                })
                .catch(function(response){
                    that.$message(response);
                    that.loading=false;
                });
            },
            handleCurrentChange(currentPage){
                let datas = {
                    pageindex:currentPage,
                    namess:this.name
                }
                this.getDatalist(datas);
            },
            selectChange(val){
                console.log(val)
                if(val.length > 1){
                    this.disabled = true;
                    this.selectedDiv = true;
                    this.selectedTitle = '请选择一个模板';
                    this.tipcolor.color = "#ff3b30";
                    this.input = ''
                }else if(val.length == 1){
                    this.disabled = false;
                    this.selectedDiv = true
                    this.selectedTitle = val[0].templateName
                    this.input = val[0].templateID
                    console.log(val[0].templateName)
                    console.log(val[0].templateID)
                    this.tipcolor.color = "#50c380";
                }else{
                    this.input = ''
                    this.selectedDiv = false
                }
            },
            nameSelect(){
                let datas = {
                    pageindex:1,
                    namess:this.name
                }
                this.getDatalist(datas);
            },
            saveTemplateID(){
                if(this.input == ''){
                    this.$message({
                        type: 'info',
                        message: '请选择一个模板'
                    });
                    return false
                }else{
                    this.$root.$emit('saveDetailTemplateInfos', {
                        templateID: this.input,templateName:this.selectedTitle
                    })
                    this.$message({
                            type: 'info',
                            message: '添加成功'
                        });
                    this.selectedDiv = false;
                    this.selectedTitle = '';
                    this.dialogVisibless = false;
                }
          },
    },
    created:function(){
            this.$root.$on('opendialogSelectActivity',(status) =>{
                this.dialogVisibless = status
                this.name = ''
                let datas = {
                    pageindex:1,
                    namess:''
                }
                this.getDatalist(datas);
            });
            
      },
        beforeDestroy(){
            this.$root.$off('opendialogSelectActivity');
        }
  }
</script>
<style scoped lang="less">
.templateStausColorGreen{
    color:#50c380;
}
.templateStausColorRed{
    color:#ff3b30
}
.imgBox {
        width: 100px;
        height: 100px;
        border: 1px solid #ddd;
    }
    .lineBline {
        border-bottom: 1px solid #ddd;
    }
    .el-table{
        border-top: 6px solid #56d2f4;
    }
    .el-pagination{
        /* margin-top: 0px; */
        text-align: right;
        position:absolute;
        bottom:2%;
        right:2%;
    }
</style>
<style>
    .typeselect .el-input__inner{
        height: 30px;
    }

    .el-dialog__wrapper{
        width:100%;
        height:100%;
    }
    .commoditydialog .el-dialog{
        height:80%;
        padding-bottom:0px;
    }
    .commoditydialog .el-dialog__body{
        height:75%;
        padding-top:10px;
    }
    .commoditydialog .createservice{
        width:100%;
        background-color:#27a1f2;
        /* border:none; */
        /* outline:none; */
        color:#fff;
    }
    .table-products tr td:nth-child(2){
        padding:0;
        text-align:center;
    }
    /* .table-product tr td:nth-child(2) .cell{
       width:70px;
        height:40px;
        margin:0 auto;
        padding:0;
        line-height:10px;
        background-color:#ebeef5;
    } */
    .zbd-selectedTip{
        position: absolute;
        top: 13%;
        right: 2%;
        width: 285px;
        height: 26px;
        text-align: right;
        overflow: hidden;
    }
</style>
