<template>
    <div id="memberInfo">
        <el-container>
            <el-header id="infoHeader">
                <el-form :model="ruleForm" ref="ruleForm" 
                label-width="100px" class="demo-ruleForms" >
                    <el-col class="item-header" :span="22">
                        <el-form-item class="visit-item header-item1" label="" prop="userName">
                            <img class="images images1" src="/static/images/Member/personnel-character.png" alt="">
                            <el-input :disabled="ruleForm.active" v-model="ruleForm.userName"></el-input>
                        </el-form-item>
                        <el-form-item class="visit-item header-item2" label="积分:" prop="userPoint">
                            <img class="images" src="/static/images/Member/personnel-integral.png" alt="">
                            <el-input :disabled="ruleForm.active" v-model="ruleForm.userPoint"></el-input>
                        </el-form-item>
                        <el-form-item class="visit-item header-item3" label="钻石会员:" prop="userLevel">
                            <img class="images images3" src="/static/images/Member/personnel-level.png" alt="">
                            <el-input :disabled="ruleForm.active" v-model="ruleForm.userLevel"></el-input>
                            <span>300经验值</span>
                        </el-form-item>
                        <el-col class="header-btn" :span="5">
                            <div class="infoLine1Right">
                                <span class="editInfo" @click="editInfo($event)">编辑</span>
                                <span class="line1CloseBtn el-icon-close" @click="closeInfo"></span>
                            </div>
                        </el-col>
                    </el-col>
                    <el-col class="item-body" :span="24">
                        <el-form-item class="visit-item item-padding" label="手机号:" prop="userPhone">
                            <el-input :disabled='ruleForm.active' v-model="ruleForm.userPhone"></el-input>
                        </el-form-item>
                        <el-form-item class="visit-item" label="客户类型:" prop="userType">
                            <el-col :span="22"><el-select v-model="ruleForm.userType" :disabled="ruleForm.active" placeholder="请选择">
                                <el-option
                                :popper-append-to-body="false"
                                v-for="item in customerCategory"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option></el-select>
                            </el-col>
                        </el-form-item>   
                        <el-form-item class="visit-item" label="城市:" prop="userCity">
                            <el-col :span="22"><el-select v-model="ruleForm.userCity" clearable  filterable :disabled="ruleForm.active" placeholder="请选择">
                                <el-option
                                :popper-append-to-body="false"
                                v-for="(item,index) in cities"
                                :key="index"
                                :label="item.regionName"
                                :value="item.id">
                                </el-option></el-select>
                            </el-col>
                        </el-form-item>  
                        <el-form-item class="visit-item" label="小区:" prop="userVillage">
                            <el-col :span="22"><el-select v-model="ruleForm.userVillage" :disabled="ruleForm.active" placeholder="请选择">
                                <el-option
                                :popper-append-to-body="false"
                                v-for="(item,index) in memberHouse"
                                :key="index"
                                :label="item.housingEstate.name"
                                :value="item.housingEstate.id">
                                </el-option></el-select>
                            </el-col>
                        </el-form-item>  
                        <el-form-item class="visit-item" label="订单详情:" prop="userOrder">
                            <el-input :disabled="ruleForm.active" v-model="ruleForm.userOrder"></el-input>
                        </el-form-item>
                        <el-form-item class="visit-item" label="来源:" prop="userOrigin">
                            <el-col :span="22"><el-select v-model="ruleForm.userOrigin" :disabled="ruleForm.active" placeholder="请选择">
                                <el-option
                                :popper-append-to-body="false"
                                v-for="item in recommendedSource"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option></el-select>
                            </el-col>
                        </el-form-item>  
                        <el-form-item class="visit-item" label="生日:" prop="userBirth">
                            <el-input :disabled="ruleForm.active" v-model="ruleForm.userBirth"></el-input>
                        </el-form-item>
                        <el-form-item class="visit-item" label="录入人:" prop="writer">
                            <el-input :disabled="ruleForm.active" v-model="ruleForm.writer"></el-input>
                        </el-form-item>
                        <el-form-item class="visit-item" label="录入时间:" prop="inputTime">
                            <el-input :disabled="ruleForm.active" v-model="ruleForm.inputTime"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form>
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
                     :recommendedSource="recommendedSource" :memberHouse="memberHouse" :houseCategory="houseCategory" :rentalStatus="rentalStatus"
                     :defaultCategory="defaultCategory" :defaultIdentity="defaultIdentity" :defaultSource="defaultSource" :memberId="memberId"
                     :houseCount="houseCount" v-loading="isLoading"
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
#infoHeader{
    .item-header{
        display:flex;
        .el-form-item{
            .el-form-item__label{
                line-height:25px;
            }
            .el-form-item__content{
                line-height:10px;
                .el-input__inner{
                    padding:0 0 0 5px;
                    height:25px;
                    border:none;
                    border-bottom: 1px solid #dcdfe6;
                }
                .images{
                    position: absolute;
                    z-index:80;
                    left:-70px;
                    top:3px;
                }
                .images1{
                    left:-25px;
                }
                .images3{
                    left:-100px;
                }
            }
        }
        .header-item1{
            .el-form-item__content{
                margin-left:50px !important;
            }
        }
        .header-item2{
            .el-input{
                width: 80%;
            }
        }
        .header-item3{
            .el-input{
                width: 50%;
            }
        }
        .header-btn{
            .infoLine1Right{
                position: absolute;
                left:82%;
                width:200px;  
                .line1CloseBtn{
                    display:inline-block;
                    border-radius: 50%;
                    width: 38px;
                    height: 38px;
                    line-height: 38px;
                    color: #CF3B2C;
                    font-size: 20px;
                    background: #fff;
                    border: 1px solid #dcdedc !important;
                    text-align: center;
                    margin-left: 20px;
                    cursor: pointer;
                }
                .editInfo{
                    background:#27a1f2;
                    color:#fff;
                    cursor: pointer;
                    padding:7px 25px;
                    border-radius:20px;
                }
                .editInfo:hover{
                    background:#409EFf;
                }
                .line1CloseBtn:hover{
                    background:#27a1f2;
                    color:#fff;
                }
            }
        } 
    }
    .item-body{
        display:flex;
        .el-form-item{
            .el-form-item__label{
                line-height:25px;
                text-align:center;
                width: 100% !important;
            }
            .el-form-item__content{
                margin-left:0 !important;
                line-height:10px;
                .el-input__inner{
                    // height:25px;
                    text-align:center;
                    border:none;
                    border-bottom: 1px solid #dcdfe6;
                }
            }
        }  
    }
    .item-padding{
        .el-input__inner{
            padding:0 0 0 5px;
        }
    }
}
.el-select-dropdown{
    li{
        text-align:center;
    }
}
</style>

