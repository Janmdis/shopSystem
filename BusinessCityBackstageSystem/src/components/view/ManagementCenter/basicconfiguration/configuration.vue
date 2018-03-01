<template>
    <el-container>
        <el-main v-loading="isLoading" id="basicMain">
            <el-row>
                <el-col :span="5" class="basic-left">
                    <h5>模块</h5>
                    <el-menu default-active="1" class="el-menu-vertical-demo basic-content">
                        <el-menu-item index="1">
                            <span slot="title">产品模块</span>
                            <i class="el-icon-menu"></i>
                        </el-menu-item>
                        <el-menu-item index="2" disabled>
                            <span slot="title">商品模块</span>
                            <i class="el-icon-document"></i>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <span slot="title">公关模块</span>
                            <i class="el-icon-setting"></i>
                        </el-menu-item>
                    </el-menu>
                </el-col>
                <el-col :span="11" class="basic-middle">
                    <div >
                        <h5>配置类型</h5>
                        <ul class="basic-content">
                            <li v-for="(info,index) in typeData" :key="index">
                                <el-button type="primary" :class="{active:info.isActive}" :data-id="index" @click="handleBtn($event)" plain><i :class="info.icon"></i>{{info.name}}</el-button>
                            </li>  
                        </ul>
                    </div>
                </el-col>
                <el-col :span="7" class="basic-right">
                    <div >
                        <h5>配置内容</h5>
                        <el-button type="primary" class="add-btn">新增</el-button>
                        <div class="basic-content">
                            <el-table
                                :data="tableData"
                                :border="isBorder"
                                style="width: 90%">
                                <el-table-column
                                    prop="name"
                                    label="品牌名称"
                                    >
                                </el-table-column>
                                <el-table-column prop="opration" label="操作" width="120">
                                    <template slot-scope="scope">
                                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>
<script>
export default {
    data () {
        return{
            isLoading:true,
            isBorder:true,
            typeData:[
                {'index':1,'icon':'el-icon-edit','isActive':false,'name':'品牌'},
                {'index':2,'icon':'el-icon-menu','isActive':false,'name':'分类'},
                {'index':3,'icon':'el-icon-sold-out','isActive':false,'name':'来源'},
                {'index':4,'icon':'el-icon-document','isActive':false,'name':'单位'},
                {'index':5,'icon':'el-icon-news','isActive':false,'name':'类型'},
            ],
            tableData:[
                {index: 1,name: '大众会员'},
                {index: 2,name: '黄金会员'},
                {index: 3,name: '铂金会员'},
                {index: 4,name: '钻石会员'},
                {index: 5,name: '至尊会员'},
            ]
        }
    },
    created(){
        setTimeout(() =>{
            this.isLoading = false;
        },500);
    },
    methods:{
        handleBtn(event){
            this.typeData.forEach((e,i) => {
                e.isActive = false;
            })
            let index = event.currentTarget.getAttribute("data-id");
            this.typeData[index].isActive = true;
        },
        handleDelete(index, row) {
            console.log(index, row);
        }
    }
}
</script>
<style lang="less">
#basicMain{
    min-width: 1040px;
    .el-row{
        height:100%;
        .el-col.basic-left{
            min-width: 120px;
            .el-menu{
                .el-menu-item{
                    width: 99%;
                    padding-right:1%;
                    background:#fff;
                    i{
                        color:#848484;
                    }
                    span{
                        color:#848484;
                    }
                }
                .el-menu-item:hover{
                    background: #F3FBFE;
                    border-right:1px solid #5BB6F4;
                    i,span{
                        color:#5BB6F4;
                    }
                }
                .el-menu-item.is-active{
                    background: #F3FBFE;
                    border-right:1px solid #5BB6F4;
                    i,span{
                        color:#5BB6F4;
                    }
                }
            }
        }
        .el-col.basic-right{
            .el-table__body-wrapper{
                overflow: hidden;
            }
        }
    }
}
</style>
<style scoped lang="less">
#basicMain{
    background:#F4F4F4;
    .el-col{
        background:#fff;
        border-radius:10px;
        height:90%;
        h5{
            color:#8E8E8E;
            font-size:16px;
            padding:15px 0;
            margin-left:30px;
        }
        .add-btn{
            padding:5px 15px;
            float: right;
            margin-right:20px;
            margin-top:-30px;
            border-radius:5px;
        }
        .basic-content{
            padding-top:30px;
            border-top:1px solid #f4f4f4;
        }
    }
    .el-col.basic-middle{
        min-width: 375px;
        margin: 0 1.5%;
        .basic-content{
            display:flex;
            justify-content:flex-start;
            flex-wrap:wrap;
            li{
                width: 30%;
                margin:0 0 20px 2.5%;
                .el-button--primary.is-plain{
                    width: 100%;
                    height:120px;
                    padding:0 0;
                    background:#fff;
                    i{
                        width: 50px;
                        height:50px;
                        background:#409EFF;
                        border-radius:5%;
                        text-align:center;
                        line-height:50px;
                        font-size:30px;
                        margin-right:20px;
                        color:#fff;
                    }
                }
                .el-button--primary.is-plain:hover{
                    background:#409EFF;
                    i{
                        background:#fff;
                        color:#409EFF;
                    }
                }
                .el-button--primary.is-plain.active{
                    background:#409EFF;
                    i{
                        background:#fff;
                        color:#409EFF;
                    }
                }
            }
        }
    }
    .el-col.basic-right{
        .el-table{
            margin:auto;
            .el-button.el-button--danger{
                background:#409EFF;
                border:1px solid #409EFF;
            }
        } 
    }
}
</style>

