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
          <el-col :span="10" style="min-width: 613px;">
              <!-- 右侧开始 -->
          <div id='lefttemp'>
              <p class="template-name-title">模板名称：</p>
              <div class="template-name-input">
                  <el-input  placeholder="请输入内容" v-model="templateName"></el-input>
              </div>
              <div style="clear:both;"></div>
          </div>
              <!-- 模板最外层容器开始 -->
              <div style="margin:20px 10px 922px 36px;border: 1px solid #aaaaaa;border-radius: 3px;">
                  <!-- 模板内容头部开始 -->
                  <div style="    height: 105px;width:100%">
                      <img class="Imgsize" src="./../../../../assets/templateHeader.png">
                  </div>
                  <!-- 模板内容头部结束 -->

                  <!-- 模板内容开始 -->
                  <div id='templateMain'>
                      <keep-alive v-for='(item,index) in comlist' :key='index'>
                        <components :templatedata='index' :is='item.componentsName'  :type='item.componentsName'  class="test"   @click.native='changeEdit(index,item.componentsName)'></components>
                      </keep-alive>
                  </div>
                  <!-- 模板内容结束 -->

                  <!-- 模板底部开始 -->
                  <div class="template-buttom-div">
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
    <!-- 底部保存/返回 -->
         <el-col :span="24" class="template-save-div" style="">
              <el-row type="flex" class="bottom-btn" justify="center">
                <el-col :span="2"><div class="template-save-Btn" @click="savesss">保存</div></el-col>
                <el-col :span="2"><div class=""></div></el-col>
                <el-col :span="2"><div class="template-back-btn">返回</div></el-col>
              </el-row>
          </el-col>
      </el-row>
    <!-- 商品详情模态框 --> 
    <productDetails></productDetails>
    <!-- 自定义模态框 -->
    <customLink></customLink>
  </div>
  </el-main>
</template>
<script>
import axios from 'axios'

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

// 商品详情模态框
import productDetails from './productDetails'
// 自定义模态框
import customLink from './customLink'

import { mapState,mapMutations,mapGetters } from 'vuex'

 export default{
     data() {
         return{
             imgdata:'',
             prodata:'',
         }
     },
     created:function(){
         this.$root.$on('deleteID',(id)=>{
            let list=[];
            for(let i=0;i<this.comlist.length;i++){
                if(id!=i){
                    list.push(this.comlist[i]);
                }
            }
            this.comlist=list;
         });
     },
     mounted: function () {
       //控制显示对应的编辑器
            let templateEdit = document.querySelectorAll('.template-editContent-div')
            for(let value of templateEdit){
                //console.log(value)
                value.style.display="none"
            }
            templateEdit[0].style.display="block";
     },
     computed:mapState({
         templateName:state => state.adImageList.templateName,
         comlist:state => state.adImageList.comlist,
         templateAllData:state => state.adImageList
     }),
     methods:{
         //动态添加组件
         commodityAdd(){
             this.comlist.push('commodity');
             let templateEdit = document.querySelectorAll('.template-editContent-div')
             for(let value of templateEdit){
                //console.log(value)
                value.style.display="none"
            }
         },
         windowAdd(){
            this.comlist.push('window');
             let templateEdit = document.querySelectorAll('.template-editContent-div')
             for(let value of templateEdit){
                //console.log(value)
                value.style.display="none"
            }
         },
         windowsAdd(){
            this.comlist.push('window2');
             let templateEdit = document.querySelectorAll('.template-editContent-div')
             for(let value of templateEdit){
                //console.log(value)
                value.style.display="none"
            }
         },
         titleAdd(){
             this.comlist.push('titles');
              let templateEdit = document.querySelectorAll('.template-editContent-div')
             for(let value of templateEdit){
                //console.log(value)
                value.style.display="none"
            }
        },
         imageAdsAdd(){
            this.$store.commit('imageAdsADD')
              let templateEdit = document.querySelectorAll('.template-editContent-div')
             for(let value of templateEdit){
                //console.log(value)
                value.style.display="none"
            }
        },
         classificationAdd(){
             this.comlist.push('classification');
              let templateEdit = document.querySelectorAll('.template-editContent-div')
             for(let value of templateEdit){
                //console.log(value)
                value.style.display="none"
            }
        },
        changeEdit(index,item){
             //console.log(index) //循环下标
             //console.log(item)  //点时当前的组件name
            // this.$refs // ref 取值
             let jump = document.querySelectorAll('.test');
             //console.log(jump)
            let dom=document.getElementsByClassName('current-style');
            dom.length?dom[0].setAttribute('class','test borderHover'):void(0);
            jump[index].setAttribute('class','current-style test borderHover');
            //控制显示对应的编辑器
            let templateEdit = document.querySelectorAll('.template-editContent-div')
            for(let value of templateEdit){
                //console.log(value)
                value.style.display="none"
            }
            templateEdit[index].style.display="block";
        },
        savesss(){
            console.log(this.templateAllData)
        }
     },
     components:{
         imageAds,
         window,
         window2,
         commodity,
         titles,
         classification,
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
    margin-top:30px;margin-bottom:20px;min-width: 630px;position: absolute;
    left: 660px;
    top: 56px;
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
  background: #27a1f2;
}
.newContentBtn:hover{
  background: #38abf8;
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
   // padding-top: 6px;
    line-height: 225%;
    margin-left:46px
}
.template-name-input{
    width:32%;
    float:left;
}
.template-editContent-div{
    margin-top:40px;
    position:relative;
    min-width:600px;
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
