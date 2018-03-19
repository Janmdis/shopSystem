<template>
    <div class="grid-content">
        <div class="productDesignation">
            <h3 class="listName pull-left">{{listname}}
                <i class="icon-double-angle-right"></i>
            </h3>
            <ul class="emendation">
                 <li>已选中<span class="nums">0</span>项</li>
                <li id="modificationBtn" class='other' @click="edit">
                    <i class='el-icon-edit-outline'></i> 编辑
                </li>
                <li id="swicthTrue" class='other' data-toggle="modal" data-target="#delModal" @click="swicthOFF">
                    <i class='el-icon-delete'></i> 启用
                </li>
                <li class='other' data-toggle="modal" data-target="#delModal" @click="swicthStop">
                    <i class='el-icon-delete'></i> 停用
                </li>
                <li class="other"  data-toggle="modal" data-target="#delModal" @click="delBox">
                    <i class='el-icon-delete'></i> 删除
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    props:['name','showWindow'],
    data(){
        return{
            listname:'',
            canedit:true,
            dataInfo:'',
            dataArr:''
        }
    },
    created:function(){
        this.listname=this.name;
        this.$root.$on('showlttip',(data)=>{
            //console.log(data)
            this.dataInfo = data.datas[0]
            this.dataArr = data.datas
            var dom=document.getElementsByClassName('emendation')[0];
             let dom_edit = document.getElementById('modificationBtn');
             let dom_browse = document.getElementById('browseBtn');
             let dom_swicthTrue = document.getElementById('swicthTrue');
            document.getElementsByClassName('nums')[0].innerHTML=data.num;
            dom.style.left=data.show?'0px':'-900px';
            dom_edit.style.cursor=data.editcan?'':'not-allowed';
            dom_browse.style.cursor=data.editcan?'':'not-allowed';
            dom_swicthTrue.style.cursor=data.editcan?'':'not-allowed';
            this.canedit=data.editcan;
        });
    },
    methods:{
        edit(){
            if(this.canedit){
                // this.$root.$emit('editdialog');
                // this.$root.$emit("showWindow",this.dataInfo)
                //console.log(this.dataInfo)
                this.$store.dispatch('editTemplate',this.dataInfo)
                this.$router.push({ path: '/mallSet' })
            }
        },
        delBox(){
            let that = this;
           // console.log(this.dataArr)
            let arrLength = this.dataArr.length;
            let newArr = [];
            for(let i = 0;i< arrLength;i++){
                newArr.push(this.dataArr[i].templateID)
            }
            this.$confirm('确定删除这 '+arrLength+'项吗?', '提示', 
                {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'})
            .then(() => {
                that.$message({
                    type: 'success',
                    message: '操作成功!',
                    duration:800,
                    onClose:that.$http.post('/api/product/mall/template/remove',
                        newArr
                    ).then(res => {
                       // console.log(res.data.msg);
                        if(res.data.msg == '删除失败'){
                            that.$message({
                            type: 'info',
                            message: '请先停用该模板',
                            duration:800
                        }); 
                        }
                        that.$root.$emit('getDatezdy',1);
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
        swicthOFF(){
            let that = this;
            //console.log(this.dataArr)
            let arrLength = this.dataArr.length;
            let newArr = [];
            for(let i = 0;i< arrLength;i++){
                newArr.push(this.dataArr[i].templateID)
            }
            this.$confirm('确定操作这 '+arrLength+'项吗?', '提示', 
                {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'})
            .then(() => {
                that.$message({
                    type: 'success',
                    message: '操作成功!',
                    duration:800,
                    onClose:that.$http.post('/api/product/mall/template/setEnabledByIds?value=true',
                        newArr
                    ).then(res => {
                       // console.log(res.data.msg);
                        that.$root.$emit('getDatezdy',1);
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
        swicthStop(){
            let that = this;
            //console.log(this.dataArr)
            let arrLength = this.dataArr.length;
            let newArr = [];
            for(let i = 0;i< arrLength;i++){
                newArr.push(this.dataArr[i].templateID)
            }
            this.$confirm('确定操作这 '+arrLength+'项吗?', '提示', 
                {confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'})
            .then(() => {
                that.$message({
                    type: 'success',
                    message: '操作成功!',
                    duration:800,
                    onClose:that.$http.post('/api/product/mall/template/setEnabledByIds?value=false',
                        newArr
                    ).then(res => {
                        //console.log(res.data.msg);
                        that.$root.$emit('getDatezdy',1);
                    }).catch(err => {console.log(err)})
                });
            }).catch(() => {
                that.$message({
                    type: 'info',
                    message: '已取消更改',
                    duration:800
                });          
            }); 
        }
    }
}
</script>
<style scoped>
.productDesignation{
    height: 72px;
    position: relative;
    margin-left: 33px;
}
.productDesignation>i {
	color: #3da4c3;
}
.productDesignation h3 {
	padding-top: 25px;
	font-size: 20px;
	color: #0D4156;
	padding-left: 20px;
}
.productDesignation h3:before {
	content: "";
	width: 4px;
	height: 22px;
	display: block;
	position: absolute;
	background: #253a4d;
	left: 0px;
	top:26px;
}
.productDesignation p {
	margin: 0;
	color: #7e8e9f;
	font-size: 12px;
	letter-spacing: 2px;
	margin-top: 0.5rem;
}
.userincrease {
	padding-top: 10px;
}

.emendation {
	margin-top: 26px;
	position: absolute;
	top: 0;
	left:-900px;
	height: 32px;
    background: #fff;
    color: #555;
    transition: all 1s;
    -moz-transition: all 1s;
    -webkit-transition: all 1s;
    -o-transition:all 1s;
}

.emendation li {
	float: left;
	font-size: 16px;
	width: 110px;
	padding: 0 15px;
	position: relative;
	cursor: pointer;
    text-align: center
}
.other{
    border-left: 1px solid
}
.emendation li:nth-child(1){
	width:auto;
}
.emendation .nums {
	padding: 0 10px;
	color: #70b2c5;
}
</style>

