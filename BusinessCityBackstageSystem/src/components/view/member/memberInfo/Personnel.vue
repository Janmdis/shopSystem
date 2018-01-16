<template>
    <div class="personnel">
        <div>
            <ul class="personnelHeader">
                <li v-for="info in infos" :key="info.id">
                    <div><img :src='info.imgSrc' alt=""><span>{{info.des}}</span><span>{{info.result}}</span></div>
                </li>
            </ul>
        </div>
        <div class="personnelMain">
            <ul class="infomation">
                <li><label for="name"><span>姓名</span><el-input name="memberName" id="name" v-model="input" placeholder="请输入内容"></el-input></label></li>
                <li><span>客户类型</span><el-select v-model="value" placeholder="请选择">
                    <el-option v-for="item in option1" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select></li>
                <li class="memberPhone"><label for="phone"><span>手机号</span><el-input id="phone" name="memberPhone" v-model="input" placeholder="18530365351" disabled></el-input></label></li>
                <li><span>身份</span><el-select v-model="value" placeholder="请选择">
                    <el-option v-for="item in option2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select></li>
                <li class="ageLi"><span>出生日期</span>
                    <div class="block" id="dataSelect"><el-date-picker v-model="value" type="date" placeholder="选择日期"></el-date-picker></div>
                    <span class="memberAge">年龄</span>
                </li>
                <li><span>城市</span><el-select v-model="value" placeholder="请选择">
                    <el-option v-for="item in option2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select></li>
                <li><span>来源</span><el-select v-model="value" placeholder="请选择">
                    <el-option v-for="item in option2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select></li>
                <li><label for="address"><span>地址管理</span><el-input name="memberAddress" id="address" v-model="input" placeholder="请输入内容"></el-input></label></li>
            </ul>
            <el-button @click='btnActive = () => {"background:#00c0be;color:#fff;"}'>保存</el-button>
        </div>
    </div>
</template>
<script>
export default{
    data () {
        return {   
            infos:[
                {des:'会员等级 : ',result:'1级',imgSrc:'/static/images/Member/personnel-level.png'},
                {des:'个人累积消费积分 : ',result:'100分',imgSrc:'/static/images/Member/personnel-integral.png'},
                {des:'录入人 : ',result:'马云',imgSrc:'/static/images/Member/personnel-character.png'},
                {des:'录入时间 : ',result:'2017-12-12',imgSrc:'/static/images/Member/personnel-timer.png'},
            ],
            input:'',
            value:'',
            option1:[
                {value: '选项1',label: '黄金糕'}, 
                {value: '选项2',label: '双皮奶'},
            ],
            option2:[
                {value: '选项1',label: '黄金糕'}, 
                {value: '选项2',label: '双皮奶'},
            ],
        }
    },
    mounted(){
        this.changeClass();
    },
    methods:{
        changeClass(){
            document.getElementsByClassName("el-input__prefix")[0].setAttribute("class","el-input__suffix")
        }
    },
}
</script>
<style lang="less" scoped>
.personnelHeader{
    position: relative;
        display:flex;
        align-items: center;
        flex-wrap: wrap;
        font-size: 14px;
        color:#666;
        border-bottom:1px solid #dbdbdb;
        padding:20px 20px 0;
        li:nth-child(even){
            width:40%;
            margin-bottom:30px;
            div{
                width:240px;
            }
        }
        li:nth-child(odd){
            width:30%;
            padding-left:110px;
            margin-bottom:30px;
            div{
                width:170px;
            }
        }
        li img{
            width:22px;
            height:19px;
            vertical-align: middle;
            margin-right: 30px;
        }
}
.personnelMain{
    padding:60px 40px;
    position:relative;
    .infomation{
        display:flex;
        flex-wrap: wrap;
        padding-bottom:80px;
    }
    .infomation li:nth-child(odd){
        padding-left:20px;
    }
    .infomation li{
        position:relative;
        margin-bottom: 84px;
        display:flex;
        justify-content: space-between;
        width:40%;
        color:#666;
        .memberAge{
            position: absolute;
            top:40px;
            left:80px;
        }
        span{
            display:inline-block;
            width: 100px;
            text-align: right;
        }
        .el-input{
            position: absolute;
            top:-10px;
            left:150px;
            width: 250px;
            .el-input__inner{
                width: 250px;   
            }
        }
        .el-select{
            position: absolute;
            top:-10px;
            left:150px;
            width: 250px !important;
            .el-input{
                width: 250px; 
                .el-input__inner{
                    width: 250px; 
                }
            }
            .el-select-dropdown{
                width: 200px;
            }
        }
    }
    .infomation .ageLi{
        margin-bottom: 110px;
    }
    .el-button{
        position: absolute;
        background:#fff;
        color:#00c0be;
        bottom:0;
        left:60%;
    }
    .el-button:focus, .el-button:hover{
        background:#00c0be;
        color:#fff;
    }
}
</style>
