<template>
    <div id="memberInfo">
        <el-container>
            <el-header id="infoHeader">
                <el-form :model="ruleForm" ref="ruleForm" 
                label-width="100px" class="demo-ruleForms" >
                    <el-col class="item-header" :span="22">
                        <el-form-item class="visit-item header-item1" label="NO." prop="userName">
                            <el-input :disabled="ruleForm.active" v-model="ruleForm.userName"></el-input>
                        </el-form-item>
                        <el-form-item class="visit-item header-item2" label="订单状态 :" prop="userPoint">
                            <el-input :disabled="ruleForm.active" v-model="ruleForm.userPoint"></el-input>
                        </el-form-item>
                        <el-form-item class="visit-item header-item3" label="手机 :" prop="userLevel">
                            <el-input :disabled="ruleForm.active" v-model="ruleForm.userLevel"></el-input>
                        </el-form-item>
                        <el-col class="header-btn" :span="5">
                            <div class="infoLine1Right">
                                <span class="editInfo" @click="editInfo($event)">编辑</span>
                                <span class="line1CloseBtn el-icon-close" @click="closeInfo"></span>
                            </div>
                        </el-col>
                    </el-col>
                    <el-col class="item-body" :span="24">
                        <el-form-item class="visit-item item-padding" label="下单时间" prop="userPhone">
                            <el-input :disabled='ruleForm.active' v-model="ruleForm.userPhone"></el-input>
                        </el-form-item>
                        <el-form-item class="visit-item" label="订单金额" prop="userType">
                            <el-input :disabled='ruleForm.active' v-model="ruleForm.userPhone"></el-input>
                        </el-form-item>   
                        <el-form-item class="visit-item" label="支付金额" prop="userCity">
                            <el-input :disabled='ruleForm.active' v-model="ruleForm.userPhone"></el-input>
                        </el-form-item>  
                        <el-form-item class="visit-item" label="未付款金额" prop="userVillage">
                            <el-input :disabled='ruleForm.active' v-model="ruleForm.userPhone"></el-input>
                        </el-form-item>  
                        <el-form-item class="visit-item" label="退款金额" prop="userOrder">
                            <el-input :disabled="ruleForm.active" v-model="ruleForm.userOrder"></el-input>
                        </el-form-item>
                        <el-form-item class="visit-item" label="业主姓名" prop="userOrigin">
                            <el-input :disabled='ruleForm.active' v-model="ruleForm.userPhone"></el-input>
                        </el-form-item>  
                        <el-form-item class="visit-item" label="地址" prop="userBirth">
                            <el-input :disabled="ruleForm.active" v-model="ruleForm.userBirth"></el-input>
                        </el-form-item>
                        <el-form-item class="visit-item" label="会员等级" prop="writer">
                            <el-input :disabled='ruleForm.active' v-model="ruleForm.userPhone"></el-input>
                        </el-form-item>
                        <el-form-item class="visit-item" label="来源人" prop="inputTime">
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
                    padding:0 0 0 15px;
                    height:25px;
                    border:none;
                    border-bottom: 1px solid #dcdfe6;
                }
            }
        }
        .header-item1{
            .el-form-item__label{
                width:40px !important;
                border:1px solid #409EFF;
                color:#409EFF;
                text-align:center;
                padding:0 0;
                border-bottom:2px solid #409EFF;
                // box-shadow:40px 20px 2px 2px #f00 outset;
            }
            .el-form-item__content{
                margin-left:50px !important;
            }
        }
        .header-item2{
            margin-left:20px;
            .el-input{
                width: 80%;
            }
        }
        .header-item3{
            .el-form-item__label{
                width: 60px !important;
            }
            .el-form-item__content{
                margin-left:47px !important;
            }
            .el-input{
                width: 80%;
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
                    background:#00aeaa;
                    color:#fff;
                    cursor: pointer;
                    padding:7px 25px;
                    border-radius:20px;
                }
                .editInfo:hover{
                    background:#409EFf;
                }
                .line1CloseBtn:hover{
                    background:#00aeaa;
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
                text-align:left;
                width: 100% !important;
                color:#409EFF;
            }
            .el-form-item__content{
                margin-left:0 !important;
                line-height:10px;
                .el-input__inner{
                    padding:0 0;
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

