<template>
    <div id="report">
        <el-row :span="20">
            <div class="report-top">
                <img :src="bgSrc" alt="">
            </div>
        </el-row>
        <!-- <div class="report-bottom">
            <p>Sorry,the page is missing!</p>
            <p>对不起 ,  页面丢失了!</p>
            <router-link to="/index"><el-button type="primary">GO HOME</el-button></router-link>
        </div> -->
    </div>
</template>
<script>
export default{
    data () {
        return {
            bgSrc:require('../../../../../static/images/Member/empty.jpg')
        }
    },
    created(){
        setTimeout(()=>{
            this.$root.$emit('load',false)
        },1000)
    },
    methods:{
        
    },
}
</script>
<style lang="less" scoped>
#report{
    position: relative;
    .report-top{
        width: 100%;
        height:600px;
        img{
            width: 70%;
            // height:100%;
            margin:80px 0 0 10%;
        }
    }
    // .report-bottom{
    //     width:250px;
    //     position: absolute;
    //     bottom: 20%;
    //     left: 0;
    //     right: 0;
    //     margin:auto;
    //     letter-spacing: 2px;
    //     text-align: center;
    //     p:nth-child(1){
    //         font-size: 16px;
    //         color:#409EFF;
    //     }
    //     p:nth-child(2){
    //         font-size: 20px;
    //         color:#333;
    //         margin: 20px 0 20px;
    //     }
    // }
}
</style>
