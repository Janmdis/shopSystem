
<template>
  <!-- 分类组件开始 -->
    <div class="borderHover" :index='dataid'>
      <!-- 分类开始 -->
      <div style="overflow-x:scroll;">
          <el-row class="classNameContent" v-bind:style="classNameContent" style="overflow:hidden;">
             <el-col class="className" v-for='(item,index) in ImgArr' :key="index">
              <div class="classNameTitle">{{ item.classTitle }}</div>
              <img :src="item.img" class="img">
            </el-col>
          </el-row>
          <div class="hoverClick">
              <span data-toggle="modal" data-target="#delModal" @click='deletedep'>删除</span>
              <span><a href="#addnewContent" style="color:#fff">添加新内容</a></span>
          </div>
       </div>
       <!-- 分类结束 -->
       <div class="template-editContent-div" >
            <div class="arrow"></div>
            <div>
                <div style="margin:25px 0px 15px 24px;color:black;text-align:left;">选择图片：
                    <span class="add-newClass-Btn" @click="addNewImg">新增分类</span>
                </div>
                <div class="imgLists">
                    <ul class="imgListUL">
                        <li v-for='(item,index) in ImgArr' :key="index">
                            <div class="carouselListInfo">
                              <div class="imgShowDiv">
                                  <div class="chooseImg">
                                      <div class="center">
                                          <img class="microImg" :src="item.img">
                                      </div>
                                  </div>
                                  <div class="reLoadingImg">
                                       <el-upload
                                            class="avatar-uploader"
                                            :action="importFileUrl"
                                            :show-file-list="false"
                                            :data="item.urlImg"
                                            name='fileUpload'
                                            :type='admin'
                                            :on-success="handleAvatarSuccess"
                                            :before-upload="beforeAvatarUpload" style="position:absolute;top:0;left:0;width:100%;height:100%;">
                                        </el-upload>
                                      <p style="line-height: 1485%;font-size:14px;text-align: center;">重新上传 建议比例（4:4）</p>
                                      <div class="delete-img" @click="deleteImgAd(index)">&times;</div>
                                  </div>
                              </div>
                              <div class="editStyleDiv">
                                  <div class="classTitleDiv">
                                      <span class="classTitle">分类名称：</span>
                                      <el-input v-model="item.classTitle" class="classTitleInput"></el-input>
                                      <div style="clear:both;"></div>
                                  </div>
                                  <div class="linkTips" style="">设置分类链接到页面地址</div>
                                  <div class="dropdown">
                                      <el-dropdown trigger="click"  style="min-width: 76px;">
                                          <span class="el-dropdown-link" style="width:100%;height:100%;display:inline-block;">
                                          链接到页面地址<i class="el-icon-arrow-down el-icon--right" style="display: inline;"></i>
                                        </span>
                                        <el-dropdown-menu slot="dropdown" style="min-width: 7%;font-size:12px;">
                                          <el-dropdown-item @click.native="opendialogPro" style="margin-top:10px;">商品详情</el-dropdown-item>
                                          <el-dropdown-item @click.native="opendialogSelf" style="margin-top:10px;">自定义</el-dropdown-item>
                                        </el-dropdown-menu>
                                      </el-dropdown>
                                      <div style="clear:both;"></div>
                                  </div>
                              </div>
                              <div style="clear:both"></div>
                          </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!-- 分类组件结束 -->
</template>
<script>
    export default{
        data() {
            return{
                dataid:'',
                importFileUrl:'',
                admin:'',
                imageUrl:'',
                defaultImgObj:{
                            classTitle:'眼镜',
                            img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519644488955&di=f1b060007ffda0586fd4da75a253c416&imgtype=0&src=http%3A%2F%2Fpic5.photophoto.cn%2F20071221%2F0042040377755194_b.jpg",
                            url:'',
                            urlImg:''
                        },
                        classNameContent:{
                            width:''
                        },
                ImgArr:[
                        {
                            classTitle:'眼镜',
                            img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519644488955&di=f1b060007ffda0586fd4da75a253c416&imgtype=0&src=http%3A%2F%2Fpic5.photophoto.cn%2F20071221%2F0042040377755194_b.jpg",
                            url:'',
                            urlImg:''
                        },{
                            classTitle:'数码',
                            img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519644488954&di=058542566eec0d937a415473a930b1b1&imgtype=0&src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F120528%2F188952-12052Q25F491.jpg",
                            url:'',
                            urlImg:''
                        },{
                            classTitle:'家电',
                            img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519644488953&di=c706244511f07c831376fd56fb0e7ae0&imgtype=0&src=http%3A%2F%2Fpic122.nipic.com%2Ffile%2F20170217%2F20860925_143422405000_2.jpg",
                            url:'',
                            urlImg:''
                        },{
                            classTitle:'食品',
                            img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519644488952&di=208a08cf210957a1fa56a66d3b426b5e&imgtype=0&src=http%3A%2F%2Fimg.ivsky.com%2Fimg%2Ftupian%2Fpre%2F201009%2F09%2Fmeishidacan-001.jpg",
                            url:'',
                            urlImg:''
                        },{
                            classTitle:'衣服',
                            img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1519644488952&di=84d4428946d26a09e3f91d2211212bbc&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F5243fbf2b211931357dcbe446f380cd790238da3.jpg",
                            url:'',
                            urlImg:''
                        }
                    ]
            }
        },
        props:['templatedata'],
        created:function(){
          this.dataid=this.templatedata;
        },
        mounted:function(){
          let classNames = document.querySelectorAll('.className');
          let length = this.ImgArr.length;
          let classNameWidth =  classNames[0].offsetWidth;
          let allWidth = classNameWidth * length;
          this.classNameContent.width = allWidth + 'px';
        },
        methods:{
          delete(){
            this.$root.$emit('deleteID',this.dataid);
                return{
                    type:'success',
                    message:'删除成功!'
                };
          },
          deletedep(){
            this.$confirm('确认删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                let msg=this.delete();
                this.$message(msg);
            }).catch(()=>{
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
            
          },
          deleteImgAd(index){
             let list=[];
            for(let i=0;i<this.ImgArr.length;i++){
                if(this.ImgArr.length <= 1){
                    this.$message({
                     type: 'warning',
                     message: '至少有一个分类！'
                    });
                    return false
                }
                if(index!=i){
                    list.push(this.ImgArr[i]);
                     this.$message({
                     type: 'success',
                     message: '删除成功！'
                    });
                }
            }
            this.ImgArr=list;
                let classNames = document.querySelectorAll('.className');
                let length = this.ImgArr.length;
                let classNameWidth =  classNames[0].offsetWidth;
                let allWidth = classNameWidth * length;
                 this.classNameContent.width = allWidth + 'px';
         },
          addNewImg(){
             if(this.ImgArr.length >= 10){
                 this.$message({
                     type: 'warning',
                     message: '最多添加10个分类！'
                 });
                  return false
             }
             this.ImgArr.push(this.defaultImgObj)
                let classNames = document.querySelectorAll('.className');
                let length = this.ImgArr.length;
                let classNameWidth =  classNames[0].offsetWidth;
                let allWidth = classNameWidth * length;
                 this.classNameContent.width = allWidth + 'px';
         },
         handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isGIF = file.type === 'image/gif';
                const isPNG = file.type === 'image/png';
                const isBMP = file.type === 'image/bmp';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG && !isPNG && !isGIF && !isBMP) {
                this.common.errorTip('上传图片必须是JPG/GIF/PNG/BMP 格式!');
                }
                if (!isLt2M) {
                this.common.errorTip('上传图片大小不能超过 2MB!');
                }
                return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
            },
          opendialogPro(){
              this.$root.$emit('opendialogProduct',true)
          },
          opendialogSelf(){
              this.$root.$emit('opendialogSelf',true)
          }
        }
    }
</script>
<style>
.carouselListInfo .el-input__inner{
    height: 30px;
}
</style>
<style scoped lang="less">
@import "../../../../assets/less/color";
.template-editContent-div{
    margin-top:40px;
    position: relative;
    position:absolute;
    top: 5%;
    left: 102%;
    min-width:600px;
    margin-left:10px;
    margin-right:280px;
    border: 1px solid #aaaaaa;
    border-bottom:none;
}
// 三角样式
.arrow{
    width: 0px;
    height: 0px;
    border-style: solid;
    border-width: 8px 10px 8px 0;
    border-color: transparent #aaaaaa transparent transparent;
    position: absolute;
    left: -10px;
    top: 19px;
}
.arrow:after{
     content: "";
    border-right-color: #F4F6FC;
    left: 1px;
    top: -8px;
}
//选中的模块/鼠标停留的时候 边框样式
.current-style {
    border: 1px dashed red!important;
}
.borderHover{
  padding:20px 20px;
  margin-bottom: 3px;
  position: relative;
}
.borderHover:hover{
    border: 1px dashed red!important;
}
 .hoverClick{
    position: absolute;
    bottom: 2px;
    right: 0;
    font-size: 12px;
    display: none;
}
.hoverClick span {
  color:#fff;
  background: rgb(250, 133, 133);
  display: inline-block;
  padding: 4px 10px;
  cursor: pointer;
}
.hoverClick span:hover {
  background: red;
}
.borderHover:hover .hoverClick{
  display: block;
}
.current-style:hover .hoverClick{
  display: block;
}
//////
 .el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.className{
    width:120px;padding:0 8px 0 8px
}
@media screen and (min-width:1200px){
.className{width:105px}
}
@media screen and (min-width:1700px){
.className{width:120px}
}
@media screen and (min-width:1800px){
.className{width:120px}
}
.img{
 width:100%;
 height:100%;
}
.classNameTitle{
  text-align: center;
  padding-bottom: 6px;
}
//add new

.add-newClass-Btn{
    line-height: 34px;
   border-radius: 5px;
  color: #fff;
  display:inline-block;
  padding: 0 15px 0 15px;
  margin-left: 12px;
  background: #27a1f2;
  position: relative;
  cursor: pointer;
}
.add-newClass-Btn:hover{
  background: #38abf8;
}

  @keyframes fadeIn {
    0% {
    opacity: 0; /*初始状态 透明度为0*/
    }
    50% {
    opacity: 0; /*中间状态 透明度为0*/
    }
    100% {
    opacity: 1; /*结尾状态 透明度为0.7*/
    }
    }

.reLoadingImg{
  width:100%;
  height:100%;
  color:#fff;
  background-color:rgba(0,0,0,.5);
  filter:alpha(opacity=0);
  -moz-opacity:0;
  -khtml-opacity: 0;
  opacity: 0;
   position:absolute;
   top:0;
   left:0;
}
.reLoadingImg:hover{
  filter:alpha(opacity=1);
  -moz-opacity:1;
  -khtml-opacity: 1;
  opacity: 1;
  cursor: pointer;
  animation-name: fadeIn; /*动画名称*/
  animation-duration: 0.4s; /*动画持续时间*/
  animation-iteration-count: 1; /*动画次数*/
  animation-delay: 0s; /*延迟时间*/
}
.reLoadingImg:hover > .delete-img {
    background-color:red;
}
.delete-img{
  font-size:23px;
  position:absolute;
  top:-6%;
  left:92%;
  padding:2px 6px;
  border-radius:50%;
  color:#fff;
  background-color:#fff;
}
.center{
 width: 100%;
    height: 100%;
}
.microImg{
    width: 100%;
    height: 100%;
}
//样式 主标题 副标题 
 .linkTips{font-size:16px;margin-top:38px;margin-bottom:20px;text-align: left;}
 .carouselListInfo{padding:30px 30px 30px;border-bottom:1px solid #d2d2d2}
 .imgShowDiv{width:30%;background:#fff;margin-left:10px;margin-right:65px;margin-top:5px;float:left;position: relative;}
 .chooseImg{width: 165px;height:224px;}
 .editStyleDiv{width:50%;background:#fff;margin-left:10px;margin-top:40px;float:left;}
 .calssTitleDiv{margin-top:20px;margin-bottom:20px;}
 .el-dropdown{border: 1px solid #aaaaaa;padding: 7px;}
 .el-dropdown:hover{background-color: #f5f3f3;}
 .el-dropdown-link{border-radius: 3px;cursor: pointer;}
 .classTitle{float: left;line-height: 27px;display: inline-block;}
 .classTitleInput{float: left;width: 50%;}
</style>
