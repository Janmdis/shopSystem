<template>
    <el-dialog title='选择渠道/成员'  :visible.sync="dialogVisible"  width="40%"  class='dialogchannellist-cx'>
        <el-tree

        :props="props"
        :load="loadNode"
        empty-text="暂无数据"
        accordion
        :render-content="renderContent"
        lazy>
        </el-tree>
    </el-dialog>
</template>
<script>
export default {
    data(){
        return{
            dialogVisible:false,
            datalist:[],
            teamer:[],
            props: {
                label: 'name',
                children:'teamer'
            },
            commodityId:''
            // pageIndex:1,
            // pageSize:1,
            // total:0
        }
    },
    created(){
        this.$root.$on('showchannel',data=>{
            this.commodityId=data;
            // console.log(data);
            this.dialogVisible=true;
        })
    },
    methods:{
        getData(){
            return new Promise((resolve,reject)=>{
                let that=this;
                this.$http.post('/api/admin/teamManagement/queryTeamManagement?pageNum=1&pageSize=0',
                {
                    name:null,
                    typeId:null,
                    levelId:null
                })
                .then(res=>{
                    if(res.data.status==200){
                        let data=res.data.info;
                        that.total=data.total;
                        that.datalist=[];
                        data.list.forEach(item=>{
                            let json={
                                channelid:item.id,
                                name:item.name,
                                type:'channel'
                            };
                            that.datalist.push(json);
                        });
                        resolve(true);
                    }
                    else{
                        this.$message(res.data.msg);
                        resolve(false);
                    }
                    // console.log(res);
                })
                .catch(err=>{
                    console.log(err);
                    this.$message('渠道获取失败');
                    resolve(false);
                })
            });
            
        },
        getTeamer(teamid,resolve){
            let that=this;
            this.$http.post('/api/admin/teamAdmin/queryTeamAdmin',{
                teamId:teamid
            })
            .then(res=>{
                let teamer=[];
                if(res.data.status==200){
                    res.data.info.list.forEach(item=>{
                        let json={
                            teamerid:item.adminId,
                            channelid:teamid,
                            name:item.adminAccount.adminName,
                            type:'teamer'
                        }
                        teamer.push(json);
                    });
                    resolve(teamer);
                }
                else{
                    that.$message(res.data.msg);
                    resolve([]);                        
                }
                // console.log(res);
            })
            .catch(err=>{
                console.log(err);
                that.$message('队员查询失败');
                resolve([]);        
            })
        },
        loadNode(node, resolve) {
            if (node.level === 0) {
                this.getData().then(sucess=>{
                    if(sucess){
                        return resolve(this.datalist);
                    }
                })
            }
            if (node.level > 1) {
                return resolve([]);
            }
            if(node.level==1){
                this.getTeamer(node.data.channelid, resolve);
            }
        },
        renderContent(h, { node, data, store }) {
            return (
            <span class="custom-tree-node">
                <span>{node.label}</span>
                <span class='right'>
                <el-button size="mini" type="text" on-click={ () => this.createQrcode(data) }>生成二维码</el-button>
                </span>
            </span>);
        },
        createQrcode(data){
            let url=this.url_mobie+'/detailTemplate?commodityId='+this.commodityId;
            // 生成渠道二维码
            if(data.type=='channel'){
                url=url+'&recommendedAdminId='+data.channelid;
            }
            else if(data.type=='teamer'){
                url=url+'&recommendedAdminId='+data.channelid+'&recommendedTeamId='+data.teamerid;
            }
            let url_code=this.url_img+'?content='+escape(url);
            this.$root.$emit('qrcode',url_code);
        }
    },
    beforeDestroy(){
        this.$root.$off('showchannel');
    }
}
</script>
<style lang='less'>
.dialogchannellist-cx{
    
    .custom-tree-node{
        position: relative;
        width: 100%;
        .right{
            position: absolute;
            width: 20%;
            right: 0;
        }
    } 
    .el-dialog{
        height:70%;
        .el-dialog__body{
            height:75%;
            overflow-y: scroll;
        }
        .el-pagination{
            position: absolute;
            bottom:10px;
            right: 0;
        }
    }
    
}

</style>
