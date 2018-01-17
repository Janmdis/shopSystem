<template>
    <div id="house" >
        <div class="houseHome" v-show="isSwitchHouseDetail">
            <ul class="houseMain" >
                <li v-for="info in infos" :key="info.id" >
                    <div class="houseDiv"><span>小区/写字楼 : {{info.houseArea}}</span><span>房屋类型 : {{info.houseType}}</span></div>
                    <div class="houseDiv"><span>地址 : {{info.houseAddress}}</span><span>租住状态 : {{info.houseState}}</span></div>
                    <div class="houseBtn">
                        <el-button @click="jumpHouseDetail(info.houseId)">查看详情</el-button>
                    </div>
                </li>
            </ul>
            <public-pagination></public-pagination>
        </div>
        <house-details></house-details>
    </div>
</template>
<script>
import publicPagination from '@/components/common/pagination/pagination.vue'
import houseDetails from './HouseDetail.vue'
export default{
    data () {
        return {
            infos:[
                {houseId:0,houseArea:'龙盛华庭',houseType:'住宅',houseAddress:'上海市杨浦区长阳路1687号',houseState:'租住'},
                {houseId:1,houseArea:'龙盛华庭',houseType:'住宅',houseAddress:'上海市杨浦区长阳路1687号',houseState:'租住'},
                {houseId:2,houseArea:'龙盛华庭',houseType:'住宅',houseAddress:'上海市杨浦区长阳路1687号',houseState:'租住'},
                {houseId:3,houseArea:'龙盛华庭',houseType:'住宅',houseAddress:'上海市杨浦区长阳路1687号',houseState:'租住'},
            ],
            isSwitchHouseDetail:true,
        }
    },
    created:function(){
       this.$root.$on('houseShow',() => {
            this.isSwitchHouseDetail = true
        })
    },
    methods: {
        jumpHouseDetail () {
            this.isSwitchHouseDetail = false
            this.$root.$emit('houseDetailShow')
        },
        handleSizeChange(val) {
            //console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            //console.log(`当前页: ${val}`);
        }
    },
    components: {
        houseDetails,
        publicPagination,
    },
}
</script>
<style lang="less" scoped>
.houseHome{
    padding:0 25px 20px;
}
#house{
    background: #fff;
    .houseMain{
            width: 100%;
        li{
            font-size: 14px;
            color:#666;
            margin:20px 0;
            background:#F2F3F4;
            .houseDiv{      
                padding: 0 80px 0;
                display:flex;
                span{
                    display:block;
                    width: 50%;
                }
                span:nth-child(even){
                    margin-left: 110px;
                }
            }
            .houseDiv:nth-child(1){
                padding-top:20px;
                margin-bottom: 30px;
            }
            .houseDiv:nth-child(2){
                margin-bottom: 20px;
            }
            .houseBtn{
                border-top: 1px solid #dbdbdd;
                padding:10px 0;
                position:relative;
                height: 45px;
                .el-button{
                    background:#fff;
                    color:#00c0be;
                    position: absolute;
                    right:30px;
                    border-radius:30px;
                }
                .el-button:hover{
                    background:#00c0be;
                    color:#fff;
                }
            }
        }
    }
}
</style>
