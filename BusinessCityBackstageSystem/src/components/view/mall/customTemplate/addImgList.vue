<template>
        
        
        <!-- <el-col :span="24" ><el-button type="success" @click="saveImg">保存</el-button></el-col>
         -->


  <div class="carouselListInfo">
                <div class="bannerEditContent">
                    <div class="chooseImg" style="width:246px;height:141px;">
                        <div class="center">
                          <img v-if="imageUrl" :src="imageUrl" class="microImg avatar">
                        </div>
                    </div>
                     <div class="reLoadingImg">
                         <el-upload
                            class="avatar-uploader"
                            :action="importFileUrl"
                            :show-file-list="false"
                            :data="urlImg"
                            name='fileUpload'
                            :type='admin'
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload" style="position:absolute;top:0;left:0;width:100%;height:100%;">
                          </el-upload>
                        <p style="line-height: 887%;text-align: center;">重新上传 建议比例（15:7）</p>
                        <div class="delete-img" @click="deleteImgAd">&times;</div>
                    </div>
                </div>
                <div class="bannerLinkSrc" >
                    <div class="linkTips" style="">设置链接到页面地址</div>
                    <div class="dropdown">
                        <el-dropdown trigger="click" style="min-width: 76px;">
                            <span class="el-dropdown-link" style="width:100%;height:100%;display:inline-block;">
                            链接到页面地址<i class="el-icon-arrow-down el-icon--right" style="display: inline;"></i>
                           </span>
                           <el-dropdown-menu slot="dropdown" style="min-width: 7%;font-size:12px;">
                            <el-dropdown-item @click.native="opendialogPro" style="margin-top:10px;">商品详情</el-dropdown-item>
                            <el-dropdown-item @click.native="opendialogSelf" style="margin-top:10px;">自定义</el-dropdown-item>
                           </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
                <div style="clear:both"></div>
            </div>
</template>
<script>
   import axios from 'axios'
    export default{
     data() {
         return{
             deleteId:'',
             importFileUrl:'/api/admin/account/queryadminaccount',
             imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516962155831&di=322da642ba62380467a16fac4f07996b&imgtype=0&src=http%3A%2F%2Fpic30.photophoto.cn%2F20140217%2F0042040393387050_b.jpg',
             admin:'admin',
             urlImg:{
                 type:'admin'
             }
         }
         
     },
     //图片上传
    //  mounted(){
    //      let url = '/api/admin/account/queryadminaccount';
    //      this.$http({
    //          url:url,
    //          method:'post',
    //          headers:{'Content-Type':'application/json'},
    //          data:{}
    //          })
    //         .then(respone => {
    //             console.log(respone.data)
    //             this.imageUrl = JSON.stringify(respone.data.info.adminHeadImg)
    //             // this.saveImg()
    //             console.log(respone.data.info.adminHeadImg)
    //             let urls = '/api/admin/account/updateadminaccount'
    //             this.$http({
    //                 url: urls,
    //                 method: 'post',
    //                 headers: { 'Content-Type': 'application/json' },
    //                 data: {
    //                 adminHeadImg: this.imageUrl
    //                 }
    //             })
    //                 .then(respone => {
    //                     if (respone.msg == '修改成功') {
    //                     alert(respone.data.msg,'success')
    //                     }
    //                 })
    //                 .catch(error => {
    //                     console.log(error)
    //                     alert('网络错误，不能访问')
    //                 })
    //         })
    //         .catch(error => {
    //             console.log(error)
    //             alert("网络错误，不能访问")
    //         })
    //  },
     props:['deleteImgAdData'],
        created:function(){
          this.deleteId=this.deleteImgAdData;
        },
     methods:{
         handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
       // this.imageUrl = res.info
       // console.log(file)
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
         },
          deleteImgAd(){
            this.$root.$emit('imgADdeleteId',this.deleteId);
         }
     }
 }
</script>
<style>
/* 添加图片样式 */
.avatar-uploader .el-upload {
   border: 1px dashed #ffffff !important;
}
.carouselListInfo .avatar-uploader .el-upload {
    /* border: 1px dashed #d9d9d9; */
    /* background: #409EFF; */
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
.avatar-uploader .el-upload:hover {
     border-color: #ffffff !important; }
 .carouselListInfo .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
 .carouselListInfo .avatar {
    width: 248px;
    height: 178px;
    display: block;
  }
  /* input file 样式 */
 .carouselListInfo .el-upload--text{
  width: 100%;
    height: 100%;
}
</style>
<style scoped lang="less">
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
  left:94%;
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
.carouselListInfo{padding:30px 30px 30px;border-bottom:1px solid #d2d2d2}
.bannerEditContent{width:45%;background:#fff;margin-left:10px;margin-top:5px;float:left;position: relative;}
.bannerLinkSrc{width:50%;background:#fff;margin-left:10px;margin-top:5px;float:left;}
.linkTips{font-size:16px;margin-top:20px;margin-bottom:20px;}
 .el-dropdown{border: 1px solid #aaaaaa;padding: 7px;}
 .el-dropdown:hover{background-color: #f5f3f3;}
 .el-dropdown-link{border-radius: 3px;cursor: pointer;}
</style>
