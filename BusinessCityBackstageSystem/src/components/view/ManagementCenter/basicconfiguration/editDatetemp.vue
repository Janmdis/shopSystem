<template>
    <el-dialog id="editDatatemp" :title="title"  :before-close="closeDialog" :visible.sync="dialogVisible" width="50%" v-loading='loading'>
        <el-form :model="form"  ref="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
            <el-row>
                <el-col :span='22'>
                    <el-form-item label="模板名称" prop="name">
                        <el-input v-model="form.name" size='small'></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span='22'>
                    <el-form-item label="备注" prop="remark">
                        <el-input v-model="form.remark" size='small'></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <!-- <el-col :span='4' style='text-align:right;padding-right:10px;'>时间段</el-col> -->
                <el-col :span='24'>
                    <el-form-item label="时间段">
                        <div v-for='(item,index) in form.datalist' :key='index'>
                            <el-time-picker
                                v-model="item.startTime"
                                size='small'
                                value-format='HH:mm:ss'
                                format="HH:mm"
                                placeholder="起始时间"
                                :picker-options="{
                                    selectableRange:item.minTime+'-'+item.maxTime
                                }"
                                >
                            </el-time-picker>
                            <el-time-picker
                                v-model="item.endTime"
                                size='small'
                                type="date"
                                value-format='HH:mm:ss'
                                format="HH:mm"
                                @change='changedate(index)'
                                placeholder="结束时间"
                                :picker-options="{
                                    selectableRange: (item.startTime==''? item.minTime:item.startTime)  +'-'+item.maxTime
                                }"
                                >
                            </el-time-picker>
                            <el-input v-model="item.nums" style='width:60px;' size='small' placeholder="数量"></el-input>
                            <i class='el-icon-close' @click='deletedateperiod(index)' style='cursor:pointer;margin-left:10px;color:red;'></i>
                        </div>
                        <el-button size='small' style='padding:5px;height:20px;' @click='adddateperiod'>+</el-button>  
                        
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
            <el-button type="primary" @click="handleData">提交</el-button>
        </div>
    </el-dialog>
</template>
<script>
import {common} from   '../../../../assets/javascript/mycommon_xs.js'
export default {
    data(){
        return{
            dialogVisible:false,
            title:'添加时间模板',
            type:'add',
            loading:false,
            form:{
                templateId:'',
                name:'',
                remark:'',
                datalist:[
                    {
                        id:'',
                        startTime:'',
                        endTime:'',
                        minTime:'00:00:00',
                        maxTime:'23:59:00',
                        nums:50
                    }
                ]
            },
            rules:{
                name:[
                    { required: true, message: '请输入模板名称', trigger: 'blur' }
                ]
            }
        }
    },
    created(){
        this.$root.$on('handledatetemp',datas=>{
            this.dialogVisible=true;
            this.title=datas.title;
            this.form.templateId=datas.data.id;
            this.form.name=datas.data.name;
            this.form.remark=datas.data.remark;
            this.type=datas.type;
            if(this.form.templateId!=''){
                this.getPerid();
            }
            
        });
    },
    methods:{
        getPerid(){
            this.loading=true;
            let that=this;
            this.$http.post('/api/product/period/query',{
                templateId:this.form.templateId
            })
            .then(res=>{
                if(res.data.status==200){
                    that.form.datalist=[];
                    res.data.info.list[1].forEach((item,index)=>{
                        let json={
                            id:item.id,
                            startTime:item.startTime,
                            endTime:item.endTime,
                            minTime:index==0?'00:00:00':this.form.datalist[this.form.datalist.length-1].endTime,
                            maxTime:'23:59:00',
                            nums:item.pCount
                        };
                        that.form.datalist.push(json);
                    });
                }
                else{
                    that.$message(res.data.msg);
                }
                that.loading=false;
                console.log(res);
            })
            .catch(err=>{
                that.loading=false;
                console.log(err);
            });
        },
        closeDialog(done) {
            this.dialogVisible = false;
            this.form={
                templateId:'',
                name:'',
                remark:'',
                datalist:[
                    {
                        id:'',
                        startTime:'',
                        endTime:'',
                        minTime:'00:00:00',
                        maxTime:'23:59:00',
                        nums:50
                    }
                ]
            };
        },
        adddateperiod(){
            if(this.form.datalist[this.form.datalist.length-1].endTime==''){
                this.$message('请先将上一条时间段填写完整');
                return;
            }
            let json={
                id:'',
                startTime:'',
                endTime:'',
                minTime:this.form.datalist[this.form.datalist.length-1].endTime,
                maxTime:'23:59:00',
                nums:50
            };
            this.form.datalist.push(json);
            // 编辑时间模板时，记录新添加的时间段信息
            // if(this.type=='edit'){
            //     this.periodlist_add.push(json);
            // }
        },
        deletedateperiod(index){
            if(this.form.datalist.length==1){
                this.$message('最少保留一个时间段');
                return;
            }
            this.form.datalist.splice(index,1);
        },
        changedate(index){
            if(this.form.datalist[index].startTime==''){
                this.form.datalist[index].endTime='';
                this.$message('请先填写开始时间');
                return;
            }
            console.log(index);
        },
        handleData(){
            this.$refs['ruleForm'].validate((valid) => {
                if (!valid) {
                    this.$message('请将表单填写完整！');
                    return false;
                } 
                else {
                    if(this.form.datalist.length==0){
                        this.$message('至少设置一个时间段');
                        return;
                    }
                    
                    let lastdata=this.form.datalist[this.form.datalist.length-1];
                    if(this.form.datalist[0].startTime==''||this.form.datalist[0].endTime==''||lastdata.startTime==''||lastdata.endTime==''){
                        this.$message('请将时间段填写完整');
                    }
                    else{
                        this.loading=true;
                        let that=this;
                        let data={
                            name:this.form.name,
                            remark:this.form.remark,
                            periods:[]
                        };
                        this.form.datalist.forEach(item=>{
                            let json={
                                startTime:item.startTime,
                                endTime:item.endTime,
                                pCount:item.nums
                            };
                            data.periods.push(json);
                        });
                        let url='';
                        if(this.type=='edit'){
                            url='/api/product/commodity/periodTemplate/update';
                            data.id=this.form.templateId;
                        }
                        else if(this.type=='add'){
                            url='/api/product/commodity/periodTemplate/insertOne';
                        }
                        this.$http.post(url,data)
                        .then(res=>{
                            if(res.data.status==200){
                                that.$message.success(res.data.msg);
                                that.$root.$emit('reloadDatetemp',1);
                                that.closeDialog();
                            }
                            else{
                                that.$message(res.data.msg);
                            }
                            that.loading=false;
                            console.log(res);
                        })
                        .catch(err=>{
                            that.loading=false;
                            console.log(err);
                        });
                    }
                }
            });
        }

    },
    beforeDestroy(){
        this.$root.$off('handledatetemp');
    }
}
</script>
<style lang='less'>
#editDatatemp{
    .el-date-editor.el-input{
        width:35% !important;
    }
}

</style>
