<template>
    <el-dialog title='绩效详情'  :visible.sync="dialogVisible"  width="60%" class='dialogemploy'>
        <el-row style=''>
            <el-col :span='10' :offset='1'>
                <el-date-picker
                style='width:100%;'
                v-model="daterange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
                </el-date-picker>
            </el-col>
            <el-col :span='5' :offset='1'>
                <el-button   type="primary" @click.native="getTeamers(1)">查询</el-button>
            </el-col>
        </el-row>
        <el-row>
            <p style='padding-top:20px;'>绩效总数：{{totalrecommends}} 人</p>
        </el-row>
        <el-row style='border-top:2px solid #409eff;'>
            <el-table
            :data="recommendlist"
            v-loading="listLoading"
            :stripe='true'
            class='membertable'
            style="width: 100%;height:75%;"
            height='360'>
                <el-table-column
                    prop="name"
                    label="姓名">
                </el-table-column>
                <el-table-column
                    prop="registernum"
                    label="拉新（人）">
                </el-table-column>
                <el-table-column
                    prop="activitynum"
                    label="活动（人）">
                </el-table-column>
                <el-table-column
                    prop="goodsnum"
                    label="购买（人）">
                </el-table-column>
                <el-table-column
                    prop="totalnum"
                    label="总数（人）">
                </el-table-column>
            </el-table>
        </el-row>
        <el-row>
            <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="pagenum"
            :page-size="pagesize"
            layout="total, prev, pager, next"
            :total="total">
            </el-pagination>
        </el-row>
    </el-dialog>
</template>
<script>
export default {
   data(){
       return {
            idchannel:'',
            dialogVisible:false,
            daterange:'',
            recommendlist:[],
            listLoading:false,
            pagesize:10,
            pagenum:1,
            total:0,
            listLoading:false
       }
   },
   computed:{
       totalrecommends:function(){
           let nums=0;
           this.recommendlist.forEach(item=>{
               nums+=item.totalnum;
           });
           return nums;
       }
   },
   created(){
        this.$root.$on('showrecommenddetail',(idchannel)=>{
            
            this.dialogVisible=true;
            this.idchannel=idchannel;
            // datas.forEach((item,index)=>{
            //     let json={
            //         id:item.id,
            //         name:item.adminName,
            //         registernum:0,//注册拉新人数
            //         activitynum:0,//活动拉新人数
            //         goodsnum:0,//商品拉新人数
            //         totalnum:0//总拉新人数
            //     };
            //     this.recommendlist.push(json)
            // });
        });
   },
   methods:{
        //分页查询团队成员
        getTeamers(pagenum){
            this.recommendlist=[];
            this.getRecommendlist(null,this.idchannel).then(count=>{
                let json={
                    id:this.idchannel,
                    name:'渠道统计',
                    registernum:count,//注册拉新人数
                    activitynum:0,//活动拉新人数
                    goodsnum:0,//商品拉新人数
                    totalnum:0//总拉新人数
                };
                this.recommendlist.push(json);
            });
            let that=this;
            this.listLoading=true;
            this.$http.post('/api/admin/teamAdmin/queryTeamAdmin?pageSize=10&pageNum='+pagenum,
            {
                teamId:this.idchannel
            })
            .then(res=>{
                console.log(res);
                if(res.data.status==200){
                    that.total=res.data.info.total;
                    let data=res.data.info.list;
                    data.forEach(item=>{
                        that.getRecommendlist(item.adminId,null).then(count=>{
                            console.log(count);
                            let json={
                                id:item.id,
                                name:item.adminAccount.adminName,
                                registernum:count,//注册拉新人数
                                activitynum:0,//活动拉新人数
                                goodsnum:0,//商品拉新人数
                                totalnum:0//总拉新人数
                            };
                            that.recommendlist.push(json);
                        })
                    });
                    that.listLoading=false;
                }
                else{
                    that.listLoading=false;
                    that.$message(res.data.msg);
                }
            })
            .catch(err=>{
                that.listLoading=false;
                console.log(err);
            });
            
            
        },
        //查询当前用户的绩效
        getRecommendlist(userid,teamid){
            let that=this;
            return new Promise((resolve, reject)=>{
                this.$http.post('/api/customer/account/queryMap',
                {
                    recommendedAdminId:userid,
                    recommendedTeamId:teamid,
                    minCreateTime:this.daterange==''?null:this.daterange[0],
                    maxCreateTime:this.daterange==''?null:this.daterange[1]
                })
                .then(res=>{
                    if(res.data.status==200){
                        let count=res.data.info.length;
                        resolve(count);
                    }
                    else{
                        resolve(0);
                    }
                })
                .catch(err=>{
                    resolve(0);
                    console.log(err);
                });
            })
        },
        // 获取团队绩效
        getRecommendchannel(){
            this.getRecommendlist(null,this.idchannel);
        },
        handleCurrentChange(pagenum){
            this.getTeamers(pagenum);
            // this.getRecommendlist(pagenum);
        }
   },
   beforeDestroy(){
       this.$root.$off('showrecommenddetail');
   }
}
</script>
