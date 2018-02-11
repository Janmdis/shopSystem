<template>
    <div class='detail off' ref='detail'>
        <el-row  class='contain'>
            <el-col :span="12" >
                <el-row class='group-goods'>
                    <header class='header'>商品组</header>
                    <el-table
                    :data="listgoods"
                    :stripe='true'
                    :border='true'
                    style="width: 80%;margin:10px auto;" height='250'>
                        <el-table-column
                        type="selection"
                        >
                        </el-table-column>
                        <el-table-column  label="图片"  class-name='imgcolum'>
                            <template slot-scope="scope">
                                <img :src="scope.row.imgurl" alt="">
                            </template>
                        </el-table-column>
                        <el-table-column  prop="nums" label="数量"  >
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button
                                class='btnopera'
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                                |
                                <el-button
                                class='btnopera'
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>
                <el-row>
                    <header class='header'>信息展示</header>
                    <el-form ref="formmsg" class='formmsg' :model="formmsg" label-width="80px">
                        <el-form-item label="标题：" prop='title'>
                            <el-input v-model="formmsg.title"></el-input>
                        </el-form-item>
                        <el-row :gutter='20'>
                            <el-col :span='12'>
                                <el-form-item label="详情页：">
                                    <el-select v-model="formmsg.detail" placeholder="请选择">
                                        <el-option label="区域一" value="shanghai"></el-option>
                                        <el-option label="区域二" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span='12'>
                                <el-form-item label="店铺分类：">
                                    <el-select v-model="formmsg.type" placeholder="请选择">
                                        <el-option label="区域一" value="shanghai"></el-option>
                                        <el-option label="区域二" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter='20'>
                            <el-col :span='12'>
                                <el-form-item label="价格：" prop='price'>
                                    <el-input v-model="formmsg.price"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span='12'>
                                <el-form-item label="库存：" prop='nums'>
                                    <el-input v-model="formmsg.nums"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter='20'>
                            <el-col :span='12'>
                                <el-form-item label="销量：" prop='numssell'>
                                    <el-input v-model="formmsg.numssell"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item label="描述：" prop='desc'>
                            <el-input type="textarea" v-model="formmsg.desc" ></el-input>
                        </el-form-item>
                        <el-form-item label="图片：">
                            <div class="mTop">
                                <el-upload
                                class="avatar-uploader"
                                :action="importFileUrl"
                                :show-file-list="false"
                                :multiple='true'
                                name='fileUpload'
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                                <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
                                <i class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <div class='tips'>
                                    <p>提示：1.本地上传图片大小不超过500k</p>
                                    <p style='text-indent:3em;'>2.最多可上传5张图片</p>
                                </div>
                            </div>
                            <ul class='imglist'>
                                <li v-for="(item,index) in listimg" :key="index">
                                    <i class='close' @click="deleteimg(index)">X</i>
                                    <img :src="item.imgurl" alt="">
                                    <span class='opera'>
                                        <i class='left icon iconfont arrow-left icon-arrowleft' @click='changeimgindex(index,left)'></i>
                                        <i class='right icon iconfont arrow-right icon-arrowright' @click='changeimgindex(index,right)'></i>
                                    </span>
                                </li>
                            </ul>
                        </el-form-item>
                        <el-form-item label="参加活动：">
                            <template>
                                <div class='containlabel'>
                                    <ul>
                                        <li v-for="item in formmsg.listlabel" :key="item">{{item}}</li>
                                    </ul>
                                </div>
                            </template>
                            <!-- <el-input type="textarea" v-model="formmsg.listlabel" ></el-input> -->
                        </el-form-item>
                    </el-form>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row class='timemodel'>
                    <header class='header'>服务时间</header>
                    <el-row class='selectmodal'>
                        <el-col :span='5'>
                            <el-select v-model="tmvalue" placeholder="选择模板">
                                <el-option
                                v-for="item in listmodaltime"
                                :key="item.id"
                                :label="item.value"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span='4'>
                            <el-button type="primary" size='small'>新建模板</el-button>
                        </el-col>
                    </el-row>
                    <el-row style='margin:10px 10%;'>
                        <el-col :span='3' style='font-size:12px;padding-top:14px;'>
                            <span class='title'>模板一</span>
                        </el-col>
                        <el-col :span='10' :offset='11' style='text-align:right;'>
                            <el-button plain type="primary" size='mini' @click='edittimetable'>编辑</el-button>
                            <el-button plain type="danger" size='mini'>删除</el-button>
                        </el-col>
                    </el-row>
                    <el-table
                    :data="listtime"
                    border
                    size='mini'
                    style="width: 80%;margin:0 auto;">
                        <el-table-column
                            prop='date'
                            min-width='100'
                            label="">
                        </el-table-column>
                        <el-table-column
                            width='60'
                            label="一">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.monday" :disabled='disabled'></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column
                            width='60'
                            label="二">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.tuesday" :disabled='disabled' ></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column
                            width='60'
                            label="三">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.wednesday" :disabled='disabled'></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column
                            width='60'
                            label="四">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.thursday" :disabled='disabled'></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column
                            width='60'
                            label="五">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.friday" :disabled='disabled'></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column
                            width='60'
                            label="六">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.saturday" :disabled='disabled'></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column
                            width='60'
                            label="七">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.sunday" :disabled='disabled'></el-checkbox>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button type="primary" style='height:30px;line-height:5px;float:right;margin:10px 10%;' @click='savetimetable'>保存</el-button>
                </el-row>
                <el-row class='areaservice'>
                    <header class='header'>选择模板</header>
                    <el-row class='selectmodal'>
                        <el-col :span='5'>
                            <el-select v-model="cmvalue" placeholder="选择模板">
                                <el-option
                                v-for="item in listmodaltime"
                                :key="item.id"
                                :label="item.value"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span='4'>
                            <el-button type="primary" size='small'>新建模板</el-button>
                        </el-col>
                    </el-row>
                    <el-row style='margin:10px 10%;'>
                        <el-col :span='3' style='font-size:12px;padding-top:14px;'>
                            <span class='title'>模板一</span>
                        </el-col>
                        <el-col :span='16' :offset='5' class='btns'>
                            <el-button plain type="danger" size='mini'>删除</el-button>
                            <el-button plain type="primary" size='mini'>编辑</el-button>
                            <el-col :span='7'>
                                <el-select v-model="cityvalue" placeholder="城市">
                                    <el-option
                                    v-for="item in listmodaltime"
                                    :key="item.id"
                                    :label="item.value"
                                    :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-col>
                    </el-row>
                    <el-row>
                        <div class='areas'>
                            <ul>
                                <li v-for='item in listarea' :key='item.id'>{{item.value}}</li>
                            </ul>
                        </div>
                    </el-row>
                    <el-button type="primary" style='height:30px;line-height:5px;float:right;margin:10px 10%;' @click='savetimetable'>保存</el-button>                
                </el-row>
            </el-col>
        </el-row>
        <el-row class='btnsgroup'>
            <el-button  plain @click="resetForm">重置</el-button>
            <el-button  plain >预览</el-button>
            <el-button type="primary" @click.native="savedata">保存</el-button>
        </el-row>
    </div>
   
</template>
<script>
// import imgUp from './userChildren/ImgUp.vue'
export default {
    // components:{imgUp},
    data(){
        return {
            listgoods:[
                {
                    id:'1',
                    imgurl:'static/images/Login/background.jpg',
                    nums:'20'
                },
                {
                    id:'2',
                    imgurl:'static/images/Login/logo.png',
                    nums:'20'
                },
                {
                    id:'3',
                    imgurl:'static/images/Login/logo.png',
                    nums:'20'
                },
                {
                    id:'4',
                    imgurl:'static/images/Login/logo.png',
                    nums:'20'
                },
                {
                    id:'5',
                    imgurl:'static/images/Login/background.jpg',
                    nums:'20'
                },
                {
                    id:'6',
                    imgurl:'static/images/Login/logo.png',
                    nums:'20'
                },
                {
                    id:'7',
                    imgurl:'static/images/Login/logo.png',
                    nums:'20'
                },
                {
                    id:'8',
                    imgurl:'static/images/Login/logo.png',
                    nums:'20'
                }
            ],
            listimg:[
                {
                    imgurl:'static/images/Login/background.jpg'
                },
                {
                    imgurl:'static/images/Login/background.jpg'
                },
                {
                    imgurl:'static/images/Login/background.jpg'
                },
                {
                    imgurl:'static/images/Login/background.jpg'
                },
                {
                    imgurl:'static/images/Login/background.jpg'
                }
            ],
            listmodaltime:[
                {
                    id:'1',
                    value:'模板一'
                },
                {
                    id:'2',
                    value:'模板二'
                }
            ],
            listtime:[
                {
                    date:'00:00-08:00',
                    monday:true,
                    tuesday:false,
                    wednesday:true,
                    thursday:false,
                    friday:false,
                    saturday:false,
                    sunday:false,
                },
                {
                    date:'08:00-10:00',
                    monday:false,
                    tuesday:false,
                    wednesday:true,
                    thursday:false,
                    friday:false,
                    saturday:false,
                    sunday:false,
                },
                {
                    date:'10:00-12:00',
                    monday:false,
                    tuesday:false,
                    wednesday:true,
                    thursday:false,
                    friday:false,
                    saturday:false,
                    sunday:false,
                },
                {
                    date:'12:00-13:00',
                    monday:false,
                    tuesday:false,
                    wednesday:true,
                    thursday:false,
                    friday:false,
                    saturday:false,
                    sunday:false,
                },
                {
                    date:'13:00-14:00',
                    monday:false,
                    tuesday:false,
                    wednesday:true,
                    thursday:false,
                    friday:false,
                    saturday:false,
                    sunday:false,
                },
                {
                    date:'14:00-16:00',
                    monday:false,
                    tuesday:false,
                    wednesday:true,
                    thursday:false,
                    friday:false,
                    saturday:false,
                    sunday:false,
                },
                {
                    date:'16:00-18:00',
                    monday:false,
                    tuesday:false,
                    wednesday:true,
                    thursday:false,
                    friday:false,
                    saturday:false,
                    sunday:false,
                },
                {
                    date:'18:00-19:00',
                    monday:false,
                    tuesday:false,
                    wednesday:true,
                    thursday:false,
                    friday:false,
                    saturday:false,
                    sunday:false,
                },
                {
                    date:'19:00-22:00',
                    monday:false,
                    tuesday:false,
                    wednesday:true,
                    thursday:false,
                    friday:false,
                    saturday:false,
                    sunday:false,
                },
                {
                    date:'22:00-24:00',
                    monday:false,
                    tuesday:false,
                    wednesday:true,
                    thursday:false,
                    friday:false,
                    saturday:false,
                    sunday:false,
                }
            ],
            listarea:[
                {
                    id:'1',
                    value:'上海市'
                },
                {
                    id:'2',
                    value:'上海市'
                },
                {
                    id:'3',
                    value:'上海市'
                },
                {
                    id:'4',
                    value:'上海市'
                },
                {
                    id:'5',
                    value:'上海市'
                },
                {
                    id:'6',
                    value:'上海市'
                },
                {
                    id:'7',
                    value:'上海市'
                },
                {
                    id:'8',
                    value:'上海市'
                },
                {
                    id:'9',
                    value:'上海市'
                },{
                    id:'10',
                    value:'上海市'
                },
                {
                    id:'11',
                    value:'上海市'
                },
                {
                    id:'12',
                    value:'上海市'
                },
                {
                    id:'13',
                    value:'上海市'
                },
                {
                    id:'14',
                    value:'上海市'
                },
                {
                    id:'15',
                    value:'上海市'
                },
                {
                    id:'16',
                    value:'上海市'
                },
                {
                    id:'17',
                    value:'上海市'
                },
                {
                    id:'18',
                    value:'上海市'
                },
                {
                    id:'19',
                    value:'上海市'
                },{
                    id:'20',
                    value:'上海市'
                },
                {
                    id:'21',
                    value:'上海市'
                },
                {
                    id:'22',
                    value:'上海市'
                },
                {
                    id:'23',
                    value:'上海市'
                },
                {
                    id:'24',
                    value:'上海市'
                },
                {
                    id:'25',
                    value:'上海市'
                },
                {
                    id:'26',
                    value:'上海市'
                },
                {
                    id:'27',
                    value:'上海市'
                },
                {
                    id:'28',
                    value:'上海市'
                },
                {
                    id:'29',
                    value:'上海市'
                },{
                    id:'30',
                    value:'上海市'
                }
            ],
            formmsg:{
                title:'',
                detail:'',
                type:'',
                price:'',
                nums:'',
                numssell:'',
                desc:'',
                listlabel:['标签一','标签二','标签三','标签四']
            },
            disabled:true,
            // 图片删除URL
            importFileUrl:'',
            tmvalue:'',
            cmvalue:'',
            cityvalue:''
        }
    },
    created(){
        this.$root.$on('adddata',()=>{
            this.$refs.detail.setAttribute('class','detail on');
        });
    },
    methods:{
        handleEdit(){},
        handleDelete(){},
        edittimetable(){
            document.getElementsByClassName('timemodel')[0].setAttribute('class','timemodel edit');
            this.disabled=false;
        },
        savetimetable(){
            document.getElementsByClassName('timemodel')[0].setAttribute('class','timemodel');
            this.disabled=true;
        },
        // 保存商品套餐信息
        savedata(){
            this.$refs.detail.setAttribute('class','detail off');
        },
        // 改变图片顺序
        changeimgindex(index,direction){
            let length=this.listimg.length;
            if((index==0&&direction=='left')||(index==length&&direction=='right')){
                return;
            }
            else{
                let index_change=direction=='left'?index-1:index+1;
                let imglist=[];
                for(let i=0;i<length;i++){
                    imglist.push(this.listimg[i==index?index_change:i==index_change?index:i]);
                }
                this.listimg=imglist;
            }
        },
        // 上传图片
        beforeAvatarUpload(file){
            if(this.imglist==5){
                this.$message({
                    message: '最多可上传5张图片',
                    type: 'warning'
                });
                return false;
            }
            else{
                console.log(file);
                const isimg = file.type === 'image/jpeg'||file.type==='image/png';
                const isLt500k = file.size / 1024 / 1024/1024 < 500;

                if (!isimg) {
                this.$message.error('只能上传图片！');
                }
                if (!isLt500k) {
                this.$message.error('图片大小不能超过 500k!');
                }
                this.importFileUrl='';
                return isimg && isLt500k;
                
            }
        },
        handleAvatarSuccess(res, file){
            console.log(res,file);
        },
        // 删除图片
        deleteimg(index){
            this.$confirm('是否删除图片？','提示',{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            }).then(()=>{
                let imglist=[];
                for(let i=0;i<this.listimg.length;i++){
                    if(i==index){
                        continue;
                    }
                    else{
                        imglist.push(this.listimg[i]);
                    }
                }
                this.listimg=imglist;
                this.$message({
                    type:'success',
                    message:'删除成功！'
                });
            }).catch(()=>{
                this.$message({
                    type:'info',
                    message:'已取消删除'
                });
            });

            
            
        },
        // 重置表单
        resetForm(){
            this.$refs.formmsg.resetFields();
        }
    }

}
</script>
<style scoped>
.detail{
    width: 100%;
    left: 0;
    top: 100px;
    position: absolute;
    /* padding: 0 20px; */
    z-index: 1000;
    transition: all 1s;
    -moz-transition: all 1s;
    -webkit-transition: all 1s;
    -o-transition:all 1s;
    background-color: #fff;
    padding-bottom: 20px;
    margin-bottom: 70px;
    overflow: hidden;
}
.contain{
    overflow: hidden;
    border-bottom:1px solid #dcdfe6;
}
.contain::after{
    width:5px;
    height:2000px;
    top: 0;
    position: absolute;
    border-left:5px solid #f7f7f7 !important;
    left:50% !important;
}
.btnsgroup{
    margin-top: 20px;
    text-align:center;
}
.btnsgroup button{
    height: 30px;
    line-height:8px;  
}
.btnsgroup button.is-plain{
    border:1px solid #409EFF;
    color:#409EFF;
}
.btnsgroup .el-button+.el-button{
    margin-left: 10px;
}
.detail.off{
    left:150%;
    display: none;
}
.detail.on{
    left: 0;
    display: block;
}
.header{
    height: 30px;
    line-height: 30px;
    padding: 0 20px;
    text-align: left;
    background-color: #edf9ff;
}
.btnopera{
    width:30px;
    border: none;
    padding:0;
    background-color: transparent;
}
.btnopera:hover{
    background-color:transparent;
}
.el-button+.el-button{
    margin-left: 0;
}
.mTop{
    overflow:hidden;
}
.tips{
    width:250px;
    font-size:12px;
    color:grey;
    float: left;
    margin-left:30px;
    padding-top:10px;
}
.tips p{
    height:30px;
    line-height:30px;
}
.imglist{
    display: flex;
    justify-content:lex-start;
    flex-wrap:wrap;
    margin-top: 10px;
}
.imglist li{
    width: 90px;
    height: 90px;
    border-radius: 5px;
    background-color: #ebeef5;
    margin-right: 10px;
    float: left;
    position: relative;
    margin-bottom: 10px;
}
.imglist li img{
    width:90px;
    height:90px;
    border-radius: 5px;
}
.imglist li i{
    display: block;
    cursor: pointer;
    font-style: normal;
    position: absolute;
    
}
.imglist li .close{
    right: -5px;
    top: -5px;
    width: 15px;
    height:15px;
    line-height: 15px;
    color:#fff;
    font-size: 10px;
    border-radius: 50%;
    
    text-align: center;
    background-color:#27a1f2;
}
.imglist li .opera{
    width: 100%;
    height:20px;
    line-height: 22px;
    bottom: 0;
    position: absolute;
    overflow:hidden;
    background: #ebeef5;
    opacity: 0;  
    transition: all 1s;
    -moz-transition: all 1s;
    -webkit-transition: all 1s;
    -o-transition:all 1s;
}
.imglist li:hover .opera{
    opacity: 0.5;  
}
.imglist li .left{
    width: 30%;
    left:0;
    text-align: left;
    padding-left: 10%;
}
.imglist li .right{
    width: 30%;
    right: 0;
    text-align: right;
    padding-right: 10%;
}
.containlabel{
    width: 90%;
    height: 60px;
    /* line-height: 1.5; */
    padding:5px 15px;
    border:1px solid #dcdfe6;
    border-radius: 4px;
}
.containlabel li{
    display: inline;
    padding: 5px 10px;
    font-size: 12px;
    cursor: pointer;
    margin-right: 5px;
    border-radius: 3px;
    color: #fff;
}
.containlabel li:nth-child(1){
    background-color: #3f86fd;
}
.containlabel li:nth-child(2){
    background-color: #32a1ff;
}
.containlabel li:nth-child(3){
    background-color: #28c0f8;
}
.containlabel li:nth-child(4){
    background-color: #0ecad1;
}
.containlabel li:nth-child(5){
    background-color: #0dd980;
}
.selectmodal{
    margin-top: 20px;
    margin-left: 10%;
    /* font-size: 14px; */
}
.timemodel{
    overflow:hidden;
}
.timemodel i{
    color:#1297db;
}
.areaservice .areas{
    width:80%;
    height:150px;
    margin:0 auto;
    padding:5px 15px;
    border:1px solid #dcdfe6;
    border-radius: 4px;
    overflow-y: auto;
    overflow-x: hidden;
}
.areaservice .areas ul{
    display: flex;
    justify-content:lex-start;
    flex-wrap:wrap;
    margin-top: 10px;
}
.areaservice .areas li{
    display: inline-block;
    border:1px solid #dcdfe6;
    padding: 5px 14px;
    margin-right:10px;
    margin-bottom: 10px;
    border-radius: 5px;
}
</style>
<style>
/* .detail table{
    margin:10px auto;
} */
.detail table tbody .imgcolum{
    padding:0;
}
.detail table tbody .imgcolum .cell{
    width:80px;
    height:35px;
    margin:0 auto;
    padding:0;
    background-color: #ebeef5;
}
.detail table tbody .imgcolum .cell img{
    width:80px;
    height:35px;
}
.formmsg{
    margin-top:10px;
    padding:0 5%;
}
.formmsg .el-form-item{
    margin-bottom:10px;
}
.formmsg .el-form-item__label{
    font-size: 13px;
}
.formmsg .el-input__inner{
    height:30px;
}
.el-upload,
.el-upload i{
    width:80px;
    height:80px;
    line-height:80px;
}
.el-upload{
    background-color:#27a1f2;
    border-radius:10%;
}
.el-upload i{
    color:#fff;
    font-size:30px;
}
.avatar-uploader{
    width:80px;
    float: left;
}
/* .selectmodal .el-input--suffix{
    width:20%;
}
/* .el-select-dropdown el-popper{
    width:20%;
} */
.selectmodal .el-input__inner,
.selectmodal button,
.areaservice .el-input__inner{
    height: 30px;
} 
.selectmodal button{
    width:80%;
    line-height:12px;
    margin-left:10px;
    text-align:center;
    padding-left: 0;
    padding-right:0;
}
.timemodel.edit table tbody tr{
    background-color:grey;
}
.timemodel .el-checkbox__inner::after{
    width:5px;
    height:15px;
    top:-5px;
    border:1px solid #1297db;
    border-top-width:0;
    border-left-width:0;
}
.timemodel .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after{
    border:1px solid #1297db;
    border-top-width:0;
    border-left-width:0;
}
.timemodel .el-checkbox__inner{
    background-color: #fff !important;
    border:none;
}
.timemodel tr:hover td{
    background-color:transparent !important;
}
.timemodel.edit tr:hover td{
    color:#fff;
}
.areaservice .btns button,
.areaservice .btns .el-col{
    margin-left:10px !important;
    float: right;
}
</style>
