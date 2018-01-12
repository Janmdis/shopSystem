<template>
    <div id="member">
        <div class="memberNav"></div>
        <div class="memberMain">
            <member-info class="infoCover"></member-info>
        </div>
    </div>
</template>
<script>
import memberInfo from './memberInfo/MemberInfo.vue'
export default {
    name:'member',
    data () {
        return {

        }
    },
    components:{
        memberInfo,
    },
}
</script>
<style>

</style>
<style scoped lang="less">
#member{
    height:100%;
    margin:70px 0 0 12.5%;
    position: relative;
    .memberNav{
        width: 100%;
        height:100px;
        background:#31b1b0;
        position: absolute;
        top:0;
    }
    .memberMain{
        height:100%;
        background:#8ab130;
        position:relative;
        top:100px;
        .infoCover{
            width:100%;
            height: 100%;
            padding: 0;
            background-color: #F2F3F4;
            position:absolute;
            left:16%;
            z-index: 999;
            box-shadow: rgb(198, 198, 198) 0px 0px 10px 0px;
        }
    }
}

</style>