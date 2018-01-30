<template>
    <div class="personnel">
        <div>
            <ul class="personnelHeader" >
                <li>
                    <div><img src="/static/images/Member/personnel-level.png" alt=""><span>会员等级 : </span><span>{{personnelInfo.level}}</span></div>
                </li>
                <li>
                    <div><img src="/static/images/Member/personnel-integral.png" alt=""><span>个人累积消费积分 : </span><span>{{personnelInfo.consumptionPoints}}</span></div>
                </li>
                <li>
                    <div><img src="/static/images/Member/personnel-character.png" alt=""><span>录入人 : </span><span>{{personnelInfo.createUser==null?'马云':personnelInfo.createUser}}</span></div>
                </li>
                <li>
                    <div><img src="/static/images/Member/personnel-timer.png" alt=""><span>录入时间 : </span><span>{{personnelInfo.createTime}}</span></div>
                </li>
            </ul>
        </div>
        <div class="personnelMain">
            <ul class="infomation">
                <li><label for="name"><span>姓名</span><el-input ref="memberName" name="memberName" id="name" v-model='items.nameInput' placeholder='请选择'></el-input></label></li>
                <li><span>客户类型</span><el-select v-model="items.customer" placeholder='请选择'>
                    <el-option v-for="(item,index) in customerCategory" :key="index" :label="item" :value="item"></el-option>
                </el-select></li>
                <li class="memberPhone"><label for="phone"><span>手机号</span><el-input id="phone" name="memberPhone" v-model="items.phoneInput" placeholder='请选择' disabled></el-input></label></li>
                <li><span>身份</span><el-select v-model="items.identy" placeholder='请选择'>
                    <el-option v-for="(item,index) in customerIdentity" :key="index" :label="item" :value="item"></el-option>
                    </el-select>
                </li>
                <li class="ageLi"><span>出生日期</span>
                    <div class="block" id="dataSelect" ><el-date-picker @change="selectDate(items.birth)" v-model="items.birth" :clearable="false" type="date" placeholder='请选择'></el-date-picker></div>
                    <span class="memberAge">年龄 : {{age?age:computedAge}}</span>
                </li>
                <li><span>来源</span><el-select v-model="items.origin" placeholder='请选择'>
                    <el-option v-for="(item,index) in recommendedSource" :key="index" :label="item" :value="item"></el-option>
                </el-select></li>
            </ul>
            <el-button :class='{activeBtn:!disabledBtn}'  @click='btnActive' :disabled="disabledBtn">保存</el-button>
        </div>
    </div>
</template>
<script>
export default{
    props:[
        'personnelInfo','customerCategory','customerIdentity','recommendedSource',
        'defaultCategory','defaultIdentity','defaultSource'
    ],
    data () {
        return {
            disabledBtn:true,
            age:0,
            defaultCategorys:'',
            items:{
                nameInput:this.personnelInfo.name,
                phoneInput:this.personnelInfo.mobile,
                identy:this.defaultIdentity,
                customer:this.defaultCategory,
                birth:this.personnelInfo.birthDate,
                origin:this.defaultSource,
            }
        }
    },
    beforeUpdate(){
        this.items.identy=this.defaultIdentity;
        this.items.customer=this.defaultCategory;
        this.items.origin=this.defaultSource;
    },
    mounted(){
        this.changeClass();//  改变日期选择的图标位置 
    },
    computed:{
        computedAge(){//  进入页面默认显示的年龄
            let nowTime = new Date();
            let years = nowTime.getFullYear();
            let months = nowTime.getMonth();
            let days = nowTime.getDay();
            if(this.personnelInfo.birthDate == undefined){
                this.personnelInfo.birthDate = years;
                return this.age = Math.ceil(years - (this.personnelInfo.birthDate));
            }else{
                return this.age = Math.ceil(years - (this.personnelInfo.birthDate).split('-')[0]);
            }
        }
    },
    watch:{
        items:{
            handler:function(val,oldval){
                // console.log(this.items.nameInput);
                // console.log(this.items.customer);
                // console.log(this.items.identy);
                // console.log(this.items.birth);
                // console.log(this.items.origin);
                this.disabledBtn = false;
            },
            deep:true
        }
    },
    methods:{
        changeClass(){//  改变类名
            document.getElementsByClassName("el-input__prefix")[0].setAttribute("class","el-input__suffix")
        },
        selectDate(str){
            this.disabledBtn = false;
            if(str == null){
                return
            }else{
                var oDate = new Date(str),  
                oYear = oDate.getFullYear(),  
                oMonth = oDate.getMonth()+1,  
                oDay = oDate.getDate(),    
                oTime = oYear +'-'+ this.getzf(oMonth) +'-'+ this.getzf(oDay);//最后拼接时间
                this.jsGetAge(oTime);
            }  
        },
        //补0操作  
        getzf(num){  
            if(parseInt(num) < 10){  
                num = '0'+num;  
            }  
            return num;  
        },
        jsGetAge(strBirthday) {
            var returnAge = this.age;
            var strBirthdayArr = strBirthday.split('-')
            var birthYear = strBirthdayArr[0]
            var birthMonth = strBirthdayArr[1]
            var birthDay = strBirthdayArr[2]

            var d = new Date()
            var nowYear = d.getFullYear()
            var nowMonth = d.getMonth() + 1
            var nowDay = d.getDate()

            if (nowYear == birthYear) {
                returnAge = 0; // 同年 则为0岁    
            }else {
                var ageDiff = nowYear - birthYear; // 年之差  
                if (ageDiff > 0) {
                    if (nowMonth == birthMonth) {
                        var dayDiff = nowDay - birthDay; // 日之差    
                        if (dayDiff < 0) {
                        returnAge = ageDiff - 1
                        }else {
                        returnAge = ageDiff 
                        }
                    }else {
                        var monthDiff = nowMonth - birthMonth; // 月之差    
                        if (monthDiff < 0) {
                            returnAge = ageDiff - 1
                        }else {
                            returnAge = ageDiff 
                        }
                    }
                }else {
                    returnAge = -1; // 返回-1 表示出生日期输入错误 晚于今天    
                }
            }
            this.age = returnAge; // 返回周岁年龄       
        },
        btnActive(){
            this.disabledBtn = true;
            console.log("点击了");
        }
    },
}
</script>
<style lang="less" scoped>
.personnelHeader{
    // min-width:780px;
    position: relative;
        display:flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
        font-size: 14px;
        color:#666;
        border-bottom:1px solid #dbdbdb;
        padding:20px 20px 0;
        li{
            width:42%;
            margin-bottom:30px;
            text-align: left;
            padding-left:8%;
        }
        li img{
            width:22px;
            height:19px;
            vertical-align: middle;
            margin-right: 15px;
        }
}
.personnelMain{
    padding:60px 40px;
    //min-width:780px;
    .infomation{
        display:flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    .infomation li:nth-child(7){
        .el-select{
            margin-left:17px;
        }
    }
    .infomation li{
        position: relative;
        left: 0;
        right: 0;
        margin: auto;
        //left: 35px;
        margin-bottom: 84px;
        width:50%;
        color:#666;
        .memberAge{
            position: absolute;
            top:40px;
            left:100px;
        }
        span{
            display:inline-block;
            width: 100px;
            text-align: right;
        }
        .el-input{
            position: absolute;
            top:-10px;
            left:125px;
            width:50%;
        }
        .el-select{
            position: absolute;
            top:-10px;
            left:108px;
            width: 50% !important;
        }
    }
    .infomation li:nth-child(even){
        width: 46%;
        padding-left:4%;
        span{
            margin-left: -8%;
        }
        .el-select{
            left:125px;
        }
        .el-input{
            left:125px;
        }
    }
    .infomation li:nth-child(6){
        margin-top:0px
    }
    .infomation .ageLi{
        margin-bottom: 110px;
    }
    .el-button{
        background:#fff;
        padding:12px 40px;
        border-radius:30px;
        color:#00c0be;
        position: absolute;
        left:45%;
        bottom:30px;
    }
    .activeBtn:focus, .activeBtn:hover{
        background:#00c0be;
        color:#fff;
    }
}
</style>
