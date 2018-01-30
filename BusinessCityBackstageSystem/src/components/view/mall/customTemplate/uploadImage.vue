<template>
      <el-dialog
        title="上传图片"
        :visible.sync="dialogVisible"
        width="30%"
        >

        <div class="bannerEditContent">
                    <div class="chooseImg" style="width:246px;height:141px;">
                        <div class="center">
                             <img class="microImg avatar" v-if="imageUrl" :src="imageUrl">
                        </div>
                    </div>
                    <div class="reLoadingImg">
                          <el-upload
                          class="avatar-uploader"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess"
                          :before-upload="beforeAvatarUpload" style="position:absolute;top:0;left:0;width:100%;height:100%;">
                           <!-- <img class="microImg avatar" v-if="imageUrl" :src="imageUrl"> -->
                          <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
                        </el-upload>
                        <p style="line-height: 1000%;text-align: center;">重新上传 建议比例（15:7）</p>
                        <div class="delete-img">&times;</div>
                    </div>
                </div>
            <!-- 内容 -->

            <!-- 内容 -->
            
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
</template>
<script>
  export default {
       data() {
      return {
          dialogVisible: false,
          imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516962155831&di=322da642ba62380467a16fac4f07996b&imgtype=0&src=http%3A%2F%2Fpic30.photophoto.cn%2F20140217%2F0042040393387050_b.jpg'
      };
    },
    methods: {

      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG && !isPNG) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M && isPNG;
      }
    },
    created:function(){
            this.$root.$on('opendialogmember',(status) =>{
                this.dialogVisible = status
            });
      },
  }
</script>
<style>
/* 添加图片样式 */

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    /* background: #409EFF; */
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
    width: 248px;
    height: 178px;
    display: block;
  }
  /* input file 样式 */
  .el-upload--text{
  width: 100%;
    height: 100%;
}
</style>

<style scoped lang="less">
@import "../../../../assets/less/color";
 
.bannerEditContent{
  width:100%;
  background:#fff;
  margin-left:10px;
  margin-top:5px;
  float:left;
  position: relative;
  }
.center{
 width: 100%;
height: 100%;
}
.microImg{
    width: 100%;
    height: 100%;
}

</style>