<template>
  <!-- 轮播开始 -->
        <div class="borderHover">
            <div class="block">
                <el-carousel trigger="click" width='614px'>
                    <el-carousel-item v-for="item in 4" :key="item">
                        <h3 class="Imgsize"><a href="javascript:;"><img class="Imgsize" :src="item" /></a></h3>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
    <!-- 轮播结束 -->
</template>
<script>
    export default{
        data() {
            return{
                 ImgArr:[
                 "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=877572980,414732243&fm=27&gp=0.jpg",
                 "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3912709398,3423769101&fm=27&gp=0.jpg",
                 "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=877572980,414732243&fm=27&gp=0.jpg"
                 ]
            }
        },
        methods:{
        }
    }
</script>
<style>
/* 轮播图组件样式 */
.el-carousel__indicator.is-active button {
    opacity: 1;
    background-color: #109997;
}
.el-carousel__button {
    display: block;
    opacity: 1;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: transparent;
    border: 1px solid #109997;
}
</style>

<style scoped lang="less">
@import "../../../../assets/less/color";
//选中的模块/鼠标停留的时候 边框样式
.current-style {
    border: 1px dashed red!important;
}
.borderHover{
  padding:5px 5px;
  margin-bottom: 3px;
  position: relative;
}

//////
.Imgsize{
    width: 100%;
    height: 100%;
}
</style>

