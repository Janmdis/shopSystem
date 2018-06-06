<template>
    <el-dialog id="editperiodspecial" :title="title"  :before-close="closeDialog" :visible.sync="dialogVisible" width="35%" v-loading='loading'>
        <el-form :model="data"  ref="ruleForm"  label-width="100px" class="demo-ruleForm">
            <el-row>
                <el-col :span='22'>
                    <el-form-item label="时间段" prop="remark">
                        <span>{{data.startTime.substring(0,5)+'-'+data.endTime.substring(0,5)}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span='24'>
                    <el-form-item label="日期">
                        <div v-for='(item,index) in datelist' :key='index'>
                            <el-date-picker
                                v-model="item.date"
                                type="date"
                                value-format='yyyy-MM-dd'
                                size='small'
                                placeholder="选择日期">
                            </el-date-picker>
                            <el-input v-model="item.nums"  style='width:60px;' size='small' placeholder="数量" prop='nums' @change="validatenums(index,item.nums)"></el-input>
                            <el-tooltip class="item" effect="dark" content="删除日期" placement="top-start">
                                <i class='el-icon-close' @click='deletedate(index)' style='cursor:pointer;margin-left:10px;color:red;'></i>
                            </el-tooltip>
                        </div>
                        <el-button size='small' style='padding:5px;height:20px;' @click='setspecialdate'>+</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
            
            <!-- <el-row style='text-align:center;'>
                <el-col>
                    <el-button type="primary" @click="handleData">提交</el-button>
                </el-col>
            </el-row> -->
        </el-form>
        <div slot="footer" class="dialog-footer" :center='true'>
            <el-button type="primary" @click="handledata">确定</el-button>
        </div>
    </el-dialog>
</template>
<script>
import {common} from   '../../../../assets/javascript/mycommon_xs.js'
export default {
    data(){
        return{
            dialogVisible:false,
            title:'编辑时间段特殊日期',
            loading:false,
            data:'',
            datelist:[
                {
                    date:'',
                    nums:0
                }
            ]
        }
    },
    created(){
        this.$root.$on('editperiodspecial',data=>{
            this.data=data;
            this.datelist[0].nums=this.data.nums;
            this.dialogVisible=true;
        });
    },
    methods:{
        closeDialog() {
            this.dialogVisible = false;
            this.datelist=[
                {
                    date:'',
                    nums:0
                }
            ];
        },
        setspecialdate(){
            let length=this.datelist.length;
            if(this.datelist[length-1].date===''||this.datelist[length-1].nums===''){
                this.$message('请先将上一条数据填写完整');
                return;
            }
            let json={
                date:'',
                nums:this.data.nums
            };
            this.datelist.push(json);
        },
        deletedate(index){
            if(this.datelist.length==1){
                this.$message('最少保留一个时间段');
                return;
            }
            this.datelist.splice(index,1);
        },
        validatenums(index,value){
            let isnum=isNaN(value-0);
            if(isnum){
                this.datelist[index].nums=0;
            }
            else{
                if(value>this.data.nums){
                    this.datelist[index].nums=this.data.nums;
                    return;
                }
                else{
                    this.datelist[index].nums=Number(value);
                }
            }
        },
        handledata(){
            let length=this.datelist.length;
            if(this.datelist[length-1].date===''||this.datelist[length-1].nums===''){
                this.$message('请先将数据填写完整');
                return;
            }
            let data=[];
            this.datelist.forEach(item=>{
                let json={
                    monthDay:item.date,
                    periodId:this.data.id,
                    pCount:item.nums
                };
                data.push(json);
            });
            let that=this;
            this.$http.post('/api/product/commodity/periodTemplateContent/insert',data)
            .then(res=>{
                if(res.data.status==200){
                    that.$message.success('设置成功！');
                    that.closeDialog();
                }
                else{
                    that.$message(res.data.msg);
                }
            })
            .catch(err=>{
                that.$message('设置失败！');
                console.log(err);
            })
        }
    },
    beforeDestroy(){
        this.$root.$off('editperiodspecial');
    }
}
</script>
<style lang='less'>
#editperiodspecial{
    .el-date-editor.el-input{
        width:60% !important;
    }
}

</style>
