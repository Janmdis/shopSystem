<template>
    <el-container>
        <el-header>
                修改头像
        </el-header>
        <div class="mTop">
        <el-upload
        class="avatar-uploader"
        action="/api/sms/file/fileUpload"
        :show-file-list="false"
        :data="urlImg"
        name='fileUpload'
        :type='admin'
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-col :span="24" ><el-button type="success" @click="saveImg">保存</el-button></el-col>
        </div>
    </el-container>
    
</template>

<script>
export default {
    data() {
      return {
        imageUrl: '',
        admin:'admin',
        urlImg:{
          type:'admin'
        }
      };
    },
    mounted(){
      alert("..")
      let url = '/api/admin/account/queryadminaccount'
      this.$http({
        url: url,
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: {}
      })
        .then(respone => {
          console.log(respone.data)
          this.imageUrl = respone.data.info.adminHeadImg
        })
        .catch(error => {
          console.log(error)
          alert('网络错误，不能访问')
        })
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.imageUrl = res.info
        console.log(file)
      },
      saveImg(){
       let url = '/apiadmin/account/updateadminaccount'
       this.$http({
        url: url,
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: {
          adminHeadImg: this.imageUrl
        }
      })
        .then(respone => {
          if (respone.msg == '修改成功') {
            this.option(respone.data.msg,'success')
         }
        })
        .catch(error => {
          console.log(error)
          this.option('网络错误，不能访问')
        })
      },
      beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isGIF = file.type === 'image/gif';
            const isPNG = file.type === 'image/png';
            const isBMP = file.type === 'image/bmp';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG && !isGIF && !isPNG && !isBMP) {
                this.common.errorTip('上传图片必须是JPG/GIF/PNG/BMP 格式!');
            }
            if (!isLt2M) {
                this.common.errorTip('上传图片大小不能超过 2MB!');
            }
            return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
      }
    }
  }

</script>
<style>
     .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
<style scoped lang='less'>
.el-button{
    margin-top:2%;
    margin-left:50px;
}
    .el-header{
        border-bottom:1px solid #ddd;
        line-height:60px;
    }
    .el-row{
        line-height:40px;
        margin-bottom: 10px;
    }

</style>