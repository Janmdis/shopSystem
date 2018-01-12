<template>
    <div id="memberInfo">
        <el-container>
            <el-header id="infoHeader">
                <div class="infoLine1">
                    <div class="infoLine1Img"><img class="images" src="/static/images/Member/customerLogo.png" alt=""></div>
                    <div class="infoLine1Left">上海镜曲网络科技有限公司</div>
                    <div class="infoLine1Right"><span class="line1PrintBtn">打印</span><span class="line1CloseBtn el-icon-close"></span></div>
                </div>
                <div class="infoLine2">
                   <label for="">姓名<p>小明</p></label>
                   <label for="">手机号<p>13052528379</p></label>
                   <label for="">客户类型<p>线下客户</p></label>
                   <label for="">街道/小区/门牌号<p>东北/北京/北京/东城区</p></label>
                   <label for="">订单状态<p>已付款</p></label>
                   <label for="">来源<p>广告</p></label>
                   <label for="">生日<p>4月12日</p></label>
                   <label for="">消费累计积分/等级<p>二级</p></label>
                </div>
            </el-header>
            <el-container id="infoContainer">
                <el-aside id="conLeft">
                    <div class="conLeftTitle"> <span>相关</span></div>
                    <div class="conLeftList1">
                        <p>个人信息</p>
                        <p>房屋</p>
                        <p>订单</p>
                        <p>报告</p>
                        <p>相关联会员</p>
                    </div>
                    <ul class="conLeftList2">
                        <li v-for="(info,index) in infoText"
                            :key="index"
                            :class="{liactive:isActive == info.title,defaultActive:default1}"
                            @click="isShow(info.title)">
                            <div class="list2Img" style="background:#df4b31;"><img :src="info.imgSrc" alt=""></div>
                            <p>{{info.title}}</p>
                        </li>
                    </ul>
                </el-aside>
                <el-main id="conRight">
                    <component :is="which_to_show"></component>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import memberInfos from './MemberInfo.js';
export default memberInfos;
</script>
<style lang="less" scoped>
@import "./MemberInfo.less";
</style>
<style lang="less">

</style>

