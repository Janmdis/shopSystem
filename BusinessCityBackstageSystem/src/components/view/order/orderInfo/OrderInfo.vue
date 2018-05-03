<template>
    <div id="order-info">
        <el-container>
            <el-header id="infoHeader">
                <el-form :model="ruleForm" ref="ruleForm" 
                label-width="100px" class="demo-ruleForms" >
                    <el-col class="item-header" :span="22">
                        <el-form-item class="visit-item header-item1" label="NO." prop="orderNumber">
                            <el-input :disabled="ruleForm.active" v-model="ruleForm.orderNumber"></el-input>
                        </el-form-item>
                        <el-form-item class="visit-item header-item2" label="订单状态 :" prop="orderState">
                            <el-input :disabled="ruleForm.active" v-model="ruleForm.orderState"></el-input>
                        </el-form-item>
                        <el-form-item class="visit-item header-item3" label="手机 :" prop="orderPhone">
                            <el-input :disabled="ruleForm.active" v-model="ruleForm.orderPhone"></el-input>
                        </el-form-item>
                        <el-col class="header-btn" :span="5">
                            <div class="infoLine1Right">
                                <span class="editInfo" @click="editInfo($event)">编辑</span>
                                <span class="line1CloseBtn el-icon-close" @click="closeInfo"></span>
                            </div>
                        </el-col>
                    </el-col>
                    <el-col class="item-body" :span="24">
                        <el-form-item class="visit-item item-padding" label="下单时间" prop="orderTime">
                            <el-input :disabled='ruleForm.active' v-model="ruleForm.orderTime"></el-input>
                        </el-form-item>
                        <el-form-item class="visit-item" label="订单金额" prop="orderMoney">
                            <el-input :disabled='ruleForm.active' v-model="ruleForm.orderMoney"></el-input>
                        </el-form-item>   
                        <el-form-item class="visit-item" label="支付金额" prop="paidMoney">
                            <el-input :disabled='ruleForm.active' v-model="ruleForm.paidMoney"></el-input>
                        </el-form-item>  
                        <el-form-item class="visit-item" label="未付款金额" prop="unpaidMoney">
                            <el-input :disabled='ruleForm.active' v-model="ruleForm.unpaidMoney"></el-input>
                        </el-form-item>  
                        <el-form-item class="visit-item" label="退款金额" prop="returnMoney">
                            <el-input :disabled="ruleForm.active" v-model="ruleForm.returnMoney"></el-input>
                        </el-form-item>
                        <el-form-item class="visit-item" label="业主姓名" prop="orderpeople">
                            <el-input :disabled='ruleForm.active' v-model="ruleForm.orderpeople"></el-input>
                        </el-form-item>  
                        <el-form-item class="visit-item" label="地址" prop="orderAddress">
                            <el-input :disabled="ruleForm.active" v-model="ruleForm.orderAddress"></el-input>
                        </el-form-item>
                        <el-form-item class="visit-item" label="会员等级" prop="level">
                            <el-input :disabled='ruleForm.active' v-model="ruleForm.level"></el-input>
                        </el-form-item>
                        <el-form-item class="visit-item" label="来源人" prop="origin">
                            <el-input :disabled="ruleForm.active" v-model="ruleForm.origin"></el-input>
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
                    <component :is="which_to_show" :orderId="orderId" v-loading="isLoading" :dataInfo="dataInfo">
                    </component>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import OrderInfos from './OrderInfo.js';
export default OrderInfos;
</script>
<style lang="less" scoped>
@import "./OrderInfo.less";
</style>
<style lang="less">
#order-info{
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
        .el-input{
            width: 80% !important;
        }
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
}

</style>

