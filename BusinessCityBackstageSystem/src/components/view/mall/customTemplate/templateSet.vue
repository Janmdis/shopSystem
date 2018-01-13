<template>
  <div class="m-content" style="height:100%">
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
                  <div style="height=134px;width:100%">
                      <img class="Imgsize" src="./../../../../assets/logo.png">
                  </div>
                  <!-- 模板内容头部结束 -->
                  <!-- 模板内容开始 -->
                  <div>
                      <!-- 图片广告组件 -->
                      <imageAds></imageAds>
                       <!-- 橱窗组件 -->
                       <window></window>
                       <!-- 商品组件 -->
                       <commodity></commodity>
                       <!-- 标题组件 -->
                       <titles></titles>
                       <!-- 分类组件 -->
                       <classification></classification>
                  </div>
                  <!-- 模板内容结束 -->
                  <!-- 模板底部开始 -->
                  <div class="template-buttom-div">
                      <!-- 底部添加新内容组件开始 -->
                      <el-col :span="24" >
                          <p class="template-buttom-title">添加新内容</p>
                          <el-row :gutter="15" class="template-buttom-content">
                            <el-col style="width:20%;"><div class="newContentBtn">商品</div></el-col>
                            <el-col style="width:20%;"><div class="newContentBtn">标题</div></el-col>
                            <el-col style="width:20%;"><div class="newContentBtn">图片广告</div></el-col>
                            <el-col style="width:20%;"><div class="newContentBtn" >分类</div></el-col>
                            <el-col style="width:20%;">
                                <el-dropdown class="newContentBtn" trigger="click">
                                    <span class="el-dropdown-link">
                                    橱窗1<i class="el-icon-arrow-down el-icon--right" style="display: inline;"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item style="margin-top:10px;">橱窗2</el-dropdown-item>
                                    <el-dropdown-item style="margin-top:10px;">橱窗3</el-dropdown-item>
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
          <el-col :span="12" style="margin-top:86px;">
              <p class="template-name-title">模板名称：</p>
              <div class="template-name-input">
                  <el-input v-model="input" placeholder="请输入内容"></el-input>
              </div>
              <div style="clear:both;"></div>
              <div class="template-edit-div">
                <div class="arrow"></div>
                <div>
                    <!-- 图片广告编辑组件 -->
                    <!-- <imageAdEditing></imageAdEditing> -->
                    <!-- 橱窗编辑组件 -->
                    <!-- <windowEditing></windowEditing> -->
                    <!-- 分类编辑组件 -->
                    <!-- <classificationEditing></classificationEditing> -->
                    <!-- 商品编辑组件 -->
                    <!-- <productEditing></productEditing> -->
                    <!-- 标题编辑组件 -->
                    <titlesEditing></titlesEditing>
                </div>
              </div>
          </el-col>
    <!-- 底部保存/返回 -->
   
      </el-row>
          <el-col :span="24" class="template-save-div" style="">
              <el-row type="flex" class="bottom-btn" justify="center">
                <el-col :span="2"><div class="save-Btn">保存</div></el-col>
                <el-col :span="2"><div class=""></div></el-col>
                <el-col :span="2"><div class="back-btn">返回</div></el-col>
              </el-row>
          </el-col>
    <!-- 上传图片模态框 -->
    <uploadImage></uploadImage>
    <!-- 商品详情模态框 --> 
    <productDetails></productDetails>
    <!-- 自定义模态框 -->
    <customLink></customLink>
  </div>
</template>
<script>
// 图片广告展示组件
import imageAds from './imageAds'
// 橱窗展示组件
import window from './window'
// 商品展示组件
import commodity from './commodity'
// 标题展示组件
import titles from './titles'
// 分类展示组件
import classification from './classification'
// 图片广告编辑组件
import imageAdEditing from './imageAdEditing'
// 橱窗编辑组件
import windowEditing from './windowEditing'
// 分类编辑组件
import classificationEditing from './classificationEditing'
// 商品编辑组件
import productEditing from './productEditing'
// 标题编辑组件
import titlesEditing from './titlesEditing'
// 上传图片模态框
import uploadImage from './uploadImage'
// 商品详情模态框
import productDetails from './productDetails'
// 自定义模态框
import customLink from './customLink'
 export default{
     data() {
         return{
             input:''
         }
         
     },
     methods:{
     },
     components:{
         imageAds,
         window,
         commodity,
         titles,
         classification,
         imageAdEditing,
         windowEditing,
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
//选中的模块/鼠标停留的时候 边框样式
.current-style {
    border: 1px dashed red!important;
}
// 头部图片样式
.Imgsize{
    width: 100%;
    height: 100%;
}
//模板底部按钮样式

.template-buttom-div{
    border-top:1px solid #aaaaaa;
}
.template-buttom-title{
    margin-top:22px;
    margin-bottom:20px;
}
.template-buttom-content{
    padding:0px 37px 25px 37px;
    margin-bottom: 25px;
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
.template-edit-div{
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
.save-Btn{
    line-height: 34px;
    border-radius: 25px;
    color: #fff;
    background: #00adab;
}
.back-btn{
    line-height: 34px;
    border-radius: 25px;
    color: #fff;
    background: #ef7747;
}
</style>
