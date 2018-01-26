<template>
    <div id="memberInfo">
        <el-container>
            <el-header id="infoHeader">
                <div class="infoLine1">
                    <div class="infoLine1Img"><img class="images" src="/static/images/Member/customerLogo.png" alt=""></div>
                    <div class="infoLine1Left">上海镜曲网络科技有限公司</div>
                    <div class="infoLine1Right"><span class="line1CloseBtn el-icon-close" @click="closeInfo"></span></div>
                </div>
                <div class="infoLine2">
                   <label for="">姓名<p>{{personnelInfo.name}}</p></label>
                   <label for="">手机号<p>{{personnelInfo.mobile}}</p></label>
                   <label for="">客户类型<p>{{customerCategory[personnelInfo.categoryId]}}</p></label>
                   <label for="">订单状态<p>暂无接口</p></label>
                   <label for="">来源<p>{{personnelInfo.recommendedSourceId}}</p></label>
                   <label for="">生日<p>{{personnelInfo.birthDate}}</p></label>
                   <label for="">消费累计积分/等级<p>{{personnelInfo.consumptionPoints}}</p></label>
                </div>
            </el-header>
            <el-container id="infoContainer">
                <el-aside id="conLeft">
                    <div class="conLeftTitle"> <span>相关</span></div>
                    <ul class="conLeftList2">
                        <li v-for="(info,index) in infoText"
                            :key="index"
                            :class="{liactive:isActive == info.title,defaultActive:default1}"
                            @click="isShow(info.title)"
                            >
                            <div class="list2Img" :style="info.bgColor"><img :src="info.imgSrc" alt=""></div>
                            <p>{{info.title}}&nbsp;(<span>{{info.number}}</span>)</p>
                        </li>
                    </ul>
                </el-aside>
                <el-main id="conRight">
                    <component :is="which_to_show" :personnelInfo="personnelInfo" :customerCategory="customerCategory" :customerIdentity="customerIdentity"
                     :recommendedSource="recommendedSource" :memberHouse="memberHouse"
                     >
                    </component>
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

