<template>
    <div class='searcharea'>
        <el-form ref="form" :model="form" label-width="80px" id='searcher'>
            <!-- 日志 -->
            <el-row v-if='showlog'>
                <el-col :span="5">
                    <el-form-item label="操作名称" prop='opearte' >
                        <el-input v-model="form.log.operate"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5" >
                    <el-form-item label="操作人" prop='deplist'>
                        <el-cascader
                        :options="deplist"
                        @active-item-change="handleItemChange"
                        :props="propslog"
                        ></el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :span='8'>
                    <el-form-item label="时间段" :span='10' class='datepick'>
                        <el-date-picker
                        v-model="form.log.daterange"
                        value-format='yyyy-MM-dd'
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <!-- 渠道 -->
            <el-row v-if='showchannel'>
                <el-col :span="5">
                    <el-form-item label="名称">
                        <el-input v-model="form.channel.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5" >
                    <el-form-item label="类型">
                        <el-select v-model="form.channel.typeId" placeholder="请选择类型">
                            <el-option v-for='(item,index) in teamtypelist' :key='index' :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="5" >
                    <el-form-item label="等级">
                        <el-select v-model="form.channel.levelId" placeholder="请选择等级">
                            <el-option v-for='(item,index) in teamlevellist' :key='index' :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <!-- 知识库 -->
            <el-row v-if='showknowledge'>
                <el-col :span="5">
                    <el-form-item label="问题">
                        <el-input v-model="form.knowledge.problemTitle"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5" >
                    <el-form-item label="类型">
                        <el-select v-model="form.knowledge.knowledgeSortId" placeholder="请选择类型">
                            <el-option v-for='(item,index) in knowledgetypelist' :key='index' :label="item.sortName" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="5" >
                    <el-form-item label="知识点">
                        <el-select v-model="form.knowledge.knowledgePointId" placeholder="请选择类型">
                            <el-option v-for='(item,index) in knowledgepointlist' :key='index' :label="item.content" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <!-- 优惠券 -->
            <el-row v-if='showcoupon'>
                <el-col :span="5">
                    <el-form-item label="名称" prop='opearte' >
                        <el-input v-model="form.coupon.couponName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5" >
                    <el-form-item label="类型">
                        <el-select v-model="form.coupon.couponType" placeholder="请选择类型">
                            <el-option v-for='(item,index) in coupontype' :key='index' :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="5" >
                    <el-form-item label="状态">
                        <el-select v-model="form.coupon.couponStatus" placeholder="请选择类型">
                            <el-option v-for='(item,index) in couponstate' :key='index' :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span='8'>
                    <el-form-item label="时间段" :span='10' class='datepick'>
                        <el-date-picker
                        v-model="form.coupon.daterange"
                        value-format='yyyy-MM-dd'
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row style='border-top:1px solid #ddd; padding-top:20px; '>
                <el-col :span="2" style="margin-left:44%;">
                    <el-button type="primary" class='btnW' round @click="searchdata">查询</el-button>
                </el-col>
                <el-col :span="2" style='margin-left:10px;'>
                    <el-button type="primary" class='btnW' @click='resetForm' round>重置</el-button>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        props:['type'],
        data() {
            return {
                form: {
                    log:{
                        userid:'',
                        operate:'',
                        daterange:''
                    },
                    channel:{
                        name:'',
                        typeId:'',
                        levelId:''
                    },
                    knowledge:{
                        problemTitle:'',
                        knowledgeSortId:'',
                        knowledgePointId:''
                    },
                    coupon:{
                        couponName:'',
                        couponStatus:'',
                        couponType:'',
                        daterange:''
                    }
                },
                userlist:[],
                teamtypelist:[],
                teamlevellist:[],
                knowledgetypelist:[],
                knowledgepointlist:[],
                couponstate:[
                    {
                        id:0,
                        name:'过期'
                    },
                    {
                        id:1,
                        name:'可使用'
                    }
                ],
                coupontype:[
                    {
                        id:0,
                        name:'满减'
                    },
                    {
                        id:1,
                        name:'专享'
                    },
                    {
                        id:3,
                        name:'无门槛'
                    }
                ],
                showlog:this.type=='operalog'?true:false,
                showchannel:this.type=='channel'?true:false,
                showknowledge:this.type=='knowledge'?true:false,
                showcoupon:this.type=='coupon'?true:false,
                propslog: {
                    label:'label',
                    value: 'depid',
                    children: 'users'
                },
            }
        },
        created(){
            switch(this.type){
                case 'channel':{
                    this.getTeamtype();
                    this.getTeamlevel();
                    break;
                }
                case 'knowledge':{
                    this.getKnowledgetype();
                    this.getKnowledgepoint();
                }
            }
        },
        methods: {
            resetForm() {
                this.$refs['form'].resetFields();
            },
            handleItemChange(val){
                let index1='';
                this.deplist.forEach((item,index)=>{
                    if(item.depid==val[0]){
                        index1=index;
                    }
                });
                setTimeout(_ => {
                    if(this.deplist[index1].users.length==0){
                        this.getUsers(val[0]).then(success=>{
                            if(success){
                                this.deplist[index1].users=this.userlist;
                            }
                        });
                    }
                }, 300)
                // console.log(val[0]);
            },
            // 获取部门下的员工
            getUsers(depid){
                return new Promise((resolve,reject)=>{
                    let that=this;
                    this.$http.post('/api/admin/account/multiConditionalQuery',
                    {
                        departmentId:depid
                    })
                    .then(res=>{
                        if(res.data.status==200){
                            that.userlist=res.data.info;
                            resolve(true);
                        }
                        else{
                            that.$message(res.data.msg);
                            resolve(false);
                        }
                    })
                    .catch(res=>{
                        that.$message('用户获取失败');
                        console.log(res);
                        resolve(false);
                    })
                });
                
            },
            // 获取团队类型
            getTeamtype(){
                let that=this;
                this.$http.post('/api/admin/teamType/queryTeamType',{})
                .then(res=>{
                    if(res.data.status==200){
                        that.teamtypelist=res.data.info;
                    }
                    else{
                        that.$message(res.data,msg);
                    }
                })
                .catch(err=>{
                    console.log(err);
                    that.$message('团队类型列表获取失败');
                });
            },
            // 获取团队等级
            getTeamlevel(){
                let that=this;
                this.$http.post('/api/admin/teamLevel/queryTeamLevel',{})
                .then(res=>{
                    if(res.data.status==200){
                        that.teamlevellist=res.data.info;
                    }
                    else{
                        that.$message(res.data,msg);
                    }
                })
                .catch(err=>{
                    console.log(err);
                    that.$message('团队等级列表获取失败');
                });
            },
            // 获取知识库类别
            getKnowledgetype(){
                let that=this;
                this.$http.post('/api/public/knowledge/sort/find?pageSize=100',{})
                .then(res=>{
                    if(res.data.status==200){
                        that.knowledgetypelist=res.data.info.list
                    }
                    else{
                        that.$message(res.data.msg);
                    }
                })
                .catch(err=>{
                    console.log(err);
                    that.$message('知识库类别查询失败');
                })
            },
            // 获取知识库知识点
            getKnowledgepoint(){
                let that=this;
                this.$http.post('/api/public/knowledge/point/find',{})
                .then(res=>{
                    if(res.data.status==200){
                        that.knowledgepointlist=res.data.info.list
                    }
                    else{
                        that.$message(res.data.msg);
                    }
                })
                .catch(err=>{
                    console.log(err);
                    that.$message('知识点查询失败');
                })
            },
            searchdata(){
                this.$root.$emit('search',this.form);
                // console.log(this.form);
            }
        },
        computed:{
            ...mapState({
                deplist: function(state){
                    if(this.type=='operalog'){
                        let list=[];
                        state.deplist.deplistall.forEach(item=>{
                            list.push({
                                label:item.departmentName,
                                depid:item.id,
                                users:[]
                            });
                        });
                        return list
                    }
                } 
            })
        },
        // beforeDestroy(){
        //     this.$root.$off('');
        // }
    }
</script>
<style>
    .searcharea .btnW {
        width: 100%;
        background: #00aeaa;
        border: 1px solid #00aeaa;
    }
    .searcharea #searcher {
        position: relative;
        z-index: 10;
        background: #fff;
        border: 1px solid #ddd;
        padding: 20px 0;
    }
    .datepick .el-form-item__content .el-date-editor{
        width:100% !important;
    }
</style>