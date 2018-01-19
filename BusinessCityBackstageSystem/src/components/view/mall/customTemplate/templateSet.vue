<template>
<el-main style="background:#fff;">
  <div class="m-content" style="height:100%;">
      <div>
          <el-col :span="24">
              <div class="m-top">
                  <el-col :span="12">
                      <div class="line" style="width:4px;height:22px;background:#253A4D;float:left;margin:26px 15px 0 18px;"></div>
                      <h2 style="font-size:20px;margin-top:25px;float:left;font-family:'Microsoft YaHei;'">模板设置</h2>
                  </el-col>
              </div>
          </el-col>
      </div>
      <el-row>
          <!-- 右侧开始 -->
          <el-col :span="10">
              <!-- 模板最外层容器开始 -->
              <div style="margin:66px 10px 416px 36px;border: 1px solid #aaaaaa;border-radius: 3px;">
                  <!-- 模板内容头部开始 -->
                  <div style="height:34px;width:100%">
                      <img class="Imgsize" src="./../../../../assets/templateHeader.jpg">
                  </div>
                  <!-- 模板内容头部结束 -->
                  <!-- 模板内容开始 -->
                  <div id='test'>
                      <!-- banner -->
                      <banner></banner>
                      <keep-alive v-for='(item,index) in comlist' :key='index'>
                        <components :templatedata='index' :is='item'  class="test"  @click.native='changetop(index,item)'></components>
                      </keep-alive>
                      <!-- 图片广告组件 -->
                      <!-- <imageAds></imageAds> -->
                       <!-- 橱窗组件 -->
                       <!-- <window></window> -->
                       <!-- 橱窗组件2 -->
                       <!-- <window2></window2> -->
                       <!-- 商品组件 -->
                       <!-- <commodity></commodity> -->
                       <!-- 标题组件 -->
                       <!-- <titles></titles> -->
                       <!-- 分类组件 -->
                       <!-- <classification></classification> -->
                  </div>
                  <!-- 模板内容结束 -->
                  <!-- 模板底部开始 -->
                  <div class="template-buttom-div">
                      <!-- windowValue true 橱窗1 false 橱窗2 -->
                      <!-- 底部添加新内容组件开始 -->
                      <el-col :span="24" >
                          <p class="template-buttom-title" id="addnewContent">添加新内容</p>
                          <el-row :gutter="15" class="template-buttom-content">
                            <el-col style="width:20%;min-width:60px;"><div class="newContentBtn" @click="commodityAdd">商品</div></el-col>
                            <el-col style="width:20%;min-width: 60px;"><div class="newContentBtn" @click="titleAdd">标题</div></el-col>
                            <el-col style="width:20%;min-width: 60px;"><div class="newContentBtn" @click="imageAdsAdd">图片广告</div></el-col>
                            <el-col style="width:20%;min-width: 60px;"><div class="newContentBtn" @click="classificationAdd">分类</div></el-col>
                            <el-col style="width:20%;min-width: 76px;">
                                <el-dropdown class="newContentBtn" trigger="click">
                                    <span class="el-dropdown-link" style="width:100%;height:100%;display:inline-block;">
                                    橱窗<i class="el-icon-arrow-down el-icon--right" style="display: inline;font-size: 10px;margin-left: 2px;"></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown" style="left: 353px;width: 5%;font-size:12px;">
                                        <el-dropdown-item style="margin-top:10px;" @click.native="windowAdd">橱窗1</el-dropdown-item>
                                         <el-dropdown-item style="margin-top:10px;" @click.native="windowsAdd">橱窗2</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </el-col>
                          </el-row>
                      </el-col>
                      <div style="clear:both;"></div>
                      <!-- 底部添加新内容组件开始 -->
                  </div>
                  <!-- 模板底部结束 -->
              </div>
              <!-- 模板最外层容器结束 -->
          </el-col>
          
          <!-- 左侧开始 -->
          <el-col :span="12" style="" id='lefttemp'>
              <p class="template-name-title">模板名称：</p>
              <div class="template-name-input">
                  <el-input  placeholder="请输入内容"></el-input>
              </div>
              <div style="clear:both;"></div>
              <div class="template-editContent-div">
                <div class="arrow"></div>
                <div>
                    <!-- banner/图片广告编辑组件 -->
                    <!-- <imageAdEditing v-bind="imgdata"></imageAdEditing> -->
                    <keep-alive>
                        <components :is='left' ></components>
                    </keep-alive>
                    <!-- 橱窗编辑组件 -->
                    <!-- <windowEditing v-bind="windowdata"></windowEditing> -->
                    <!-- 橱窗2编辑组件 -->
                    <!-- <windowEditing2 v-bind="windowdatas"></windowEditing2> -->
                    <!-- 分类编辑组件 -->
                    <!-- <classificationEditing v-bind="classdata"></classificationEditing> -->
                    <!-- 商品编辑组件 -->
                    <!-- <productEditing v-bind="prodata"></productEditing> -->
                    <!-- 标题编辑组件 -->
                    <!-- <titlesEditing v-bind="titdata"></titlesEditing> -->
                </div>
              </div>
          </el-col>
    <!-- 底部保存/返回 -->
         <el-col :span="24" class="template-save-div" style="">
              <el-row type="flex" class="bottom-btn" justify="center">
                <el-col :span="2"><div class="template-save-Btn">保存</div></el-col>
                <el-col :span="2"><div class=""></div></el-col>
                <el-col :span="2"><div class="template-back-btn">返回</div></el-col>
              </el-row>
          </el-col>
      </el-row>
    <!-- 上传图片模态框 -->
    <uploadImage></uploadImage>
    <!-- 商品详情模态框 --> 
    <productDetails></productDetails>
    <!-- 自定义模态框 -->
    <customLink></customLink>
  </div>
  </el-main>
</template>
<script>
//banner组件
import banner from './banner'
// 图片广告展示组件
import imageAds from './imageAds'
// 橱窗展示组件
import window from './window'
// 橱窗2展示组件
import window2 from './window2'
// 商品展示组件
import commodity from './commodity'
// 标题展示组件
import titles from './titles'
// 分类展示组件
import classification from './classification'

///////////////////////////////

// 图片广告编辑组件
import imageAdEditing from './imageAdEditing'
// 橱窗编辑组件
import windowEditing from './windowEditing'
// 橱窗2编辑组件
import windowEditing2 from './windowEditing2'
// 分类编辑组件
import classificationEditing from './classificationEditing'
// 商品编辑组件
import productEditing from './productEditing'
// 标题编辑组件
import titlesEditing from './titlesEditing'

///////////////////////////////

// 上传图片模态框
import uploadImage from './uploadImage'
// 商品详情模态框
import productDetails from './productDetails'
// 自定义模态框
import customLink from './customLink'
 export default{
     data() {
         return{
             imgdata:'',
             prodata:'',
             comlist:[],
             left:'imageAdEditing',
             leftlist:['productEditing','titlesEditing','imageAdEditing','classificationEditing','windowEditing','windowEditing2'],
             list2:['commodity','titles','imageAds','classification','window','window2']
         }
     },
     created:function(){
         this.$root.$on('test',(id)=>{
            let list=[];
            for(let i=0;i<this.comlist.length;i++){
                if(id!=i){
                    list.push(this.comlist[i]);
                }
            }
            this.comlist=list;
            //  alert(id);
         });
     },
     methods:{
         //动态添加组件
         commodityAdd(){
             this.comlist.push('commodity');
         },
         windowAdd(){
            this.comlist.push('window');
         },
         windowsAdd(){
            this.comlist.push('window2');
         },
         titleAdd(){
             this.comlist.push('titles');
        },
         imageAdsAdd(){
             this.comlist.push('imageAds');
        },
         classificationAdd(){
             this.comlist.push('classification');
        },
        changetop(index,item){
            let jump = document.querySelectorAll('.test');
            let top=jump[index].offsetTop-100;
            document.getElementsByClassName('template-editContent-div')[0].style.marginTop=top+'px';
            let eq=this.list2.indexOf(item);
            this.left=this.leftlist[eq];
        }
     },
     components:{
         banner,
         imageAds,
         window,
         window2,
         commodity,
         titles,
         classification,
         imageAdEditing,
         windowEditing,
         windowEditing2,
         classificationEditing,
         productEditing,
         titlesEditing,
         uploadImage,
         productDetails,
         customLink
     }
 }
</script>
<style scoped lang="less">
@import "../../../../assets/less/color";
.el-dropdown-menu__item{
    font-size: 12px;
}
//选中的模块/鼠标停留的时候 边框样式
.current-style {
    border: 1px dashed red!important;
}
// 头部图片样式
.Imgsize{
    width: 100%;
    height: 100%;
}
#lefttemp{
    margin-top:86px;margin-bottom: 168px;
}
//模板底部按钮样式

.template-buttom-div{
    border-top:1px solid #aaaaaa;
}
.template-buttom-title{
    margin-top:22px;
    margin-bottom:20px;
    text-align: center;
}
.template-buttom-content{
    padding:0px 37px 25px 37px;
    margin-bottom: 25px;
    text-align: center;
}
.transition-box-click{
    position: absolute;
    background: rgb(242, 242, 242);
    width: 100%;
    border-radius: 0px 0px 5px 5px;
}
.transition-box{
    color:#a5a5a5;
}


  //
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.newContentBtn{
    width: 100%;
    font-size: 16px;
   line-height: 34px;
   border-radius: 5px;
  color: #fff;
  background: #00adab;
}
.newContentBtn:hover{
  background: rgb(1, 138, 136);
  cursor: pointer;
}
.bottom-btn {
  padding: 10px 0;
}

// 左侧编辑最外层容器样式
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
.template-name-title{
    float:left;
    padding-top: 6px;
    margin-left:46px
}
.template-name-input{
    width:32%;
    float:left;
}
.template-editContent-div{
    margin-top:40px;
    position:relative;
    min-width:608px;
    margin-left:10px;
    margin-right:280px;
    border: 1px solid #aaaaaa;
    border-bottom:none;
}
// 底部保存返回样式
 .template-save-div{
     bottom: 0px;
     z-index: 910;
     position: fixed;
     }
.template-save-Btn{
    line-height: 34px;
    border-radius: 25px;
    color: #fff;
    background: #00adab;
    text-align: center;
}
.template-back-btn{
    line-height: 34px;
    border-radius: 25px;
    color: #fff;
    background: #ef7747;
    text-align: center;
}
</style>
