<template>
    <el-table
    :data="datalist"
    @selection-change='showextra'
    @cell-click='showMemberInfo'
    v-loading="this.listLoading"
    :stripe='true'
    style="width: 100%">
    <el-table-column
    fixed
    type="index"
    label="N"
    :index="indexMethod">
    </el-table-column>
        <el-table-column
        fixed
        type="selection"
        width="55" >
        </el-table-column>
        <!-- <el-table-column class='borderRight' fixed prop="id" label="ID" width='360' height='100'>
        </el-table-column> -->
        <el-table-column
        prop="name"
        fixed
        width='200'
        label="客户姓名">
        </el-table-column>
        <el-table-column
        prop="mobile"
        width='120'
        label="手机号">
        </el-table-column>
        <el-table-column
        label="客户类型">
            <template slot-scope='scope'>
                <span >
                {{getMember(scope.row.categoryId, memberInfo.info)}}
                </span>
            </template>
        </el-table-column>
        <el-table-column
        label="城市">
            <template slot-scope='scope'>
                <span >
                {{getMember(scope.row.cityId, address)}}
                </span>
            </template>
        </el-table-column>
        <el-table-column
         width='300'
        label="小区">
            <template slot-scope='scope'>
                 {{scope.row.quarters}}
             </template>
             
        </el-table-column>
        <el-table-column
        prop="state"
        label="订单状态">
         <template slot-scope='scope'>
             {{scope.row.orderState}}
             </template>
        </el-table-column>
        <el-table-column
        label="来源">
        <template slot-scope='scope'>
                <span >
                {{getMember(scope.row.recommendedSourceId, findSource.info)}}
                </span>
            </template>
        </el-table-column>
        <el-table-column
        prop="createTime"
        width='500'
        label="录入时间">
        </el-table-column>
        <el-table-column
        width='260'
        label="小区地址">
         <template slot-scope='scope'>
                 {{scope.row.quartersAdd}}
             </template>
    </el-table-column>
                
            </el-table>
</template>
<script>
/ eslint-disable /
//@row-click="showMemberInfo()"
import { mapState } from 'Vuex'
export default {
    prop:['listLoading'],
    data(){
        return {
            datalist:[],
            showLeft:0,
            pageIndex:1,
            memberInfo:[],
            findSource:[],
            address:[],
            idBox:[],
            orderState:'',
            quarters:'',
            quartersAdd:'',
            data:{
                mobile:null,
                categoryId:null,
                level:null,
                cityId:null,
                estateId:null,
                recommendedSourceId:null,
                birthDate:null
            }
        }
    },
    created:function(){
        this.$root.$on('pageIndex',(data) => {
            this.pageIndex = data.value
            this.getDate(this.pageIndex)
        })
        this.getDate(1)
        this.$root.$on('getDatezdy',(data)=>{
             this.getDate( data)
        })
        this.$root.$on('dataListBox',(data)=>{
            this.datalist = data
        })
        this.$root.$on('search',datas=>{
            this.data.mobile=datas.account.mobile===''?null:datas.account.mobile;
            this.data.categoryId=datas.account.categoryId===''?null:datas.account.categoryId;
            this.data.level=datas.account.level===''?null:datas.account.level;
            this.data.cityId=datas.account.cityId===''?null:datas.account.cityId;
            this.data.estateId=datas.account.estateId===''?null:datas.account.estateId;
            this.data.recommendedSourceId=datas.account.recommendedSourceId===''?null:datas.account.recommendedSourceId;
            this.data.birthDate=datas.account.birthDatecheck?new Date():null;
            this.getDate(1);
        })
        this.memberInfo = JSON.parse(sessionStorage.getItem("member"));
        this.findSource = JSON.parse(sessionStorage.getItem("findSource"));
        this.address = JSON.parse(sessionStorage.getItem("address"));
        this.$store.dispatch('getCatogery');
        this.$store.dispatch('getOrigin');
    },
    methods:{
        getMember(id,obj){
            let i = 0
            for (name in obj){
                if(name ==id){
                    return obj[name]
                }
            }
        },
        getResidential (idBox){
            let url = '/api/customer/estate/queryByIdList';
            this.$http({
                url: url,
                method: 'POST',
                // 请求体重发送的数据
                headers: { 'Content-Type': 'application/json' },
                data:idBox,
            })
            .then(response => {
                console.log(response.data.info);
                response.data.info.forEach(item1=>{
                    console.log(item1)
                    this.datalist.forEach((item,i)=>{
                        if(item1.id == item.estateId){
                            console.log(item)
                            this.$set(item, 'quarters', item1.alias);
                            this.$set(item, 'quartersAdd', item1.address);
                        }
                            
                    });
                })
                
                
                    console.log( this.datalist)
          })
          .catch(error=>{
              console.log(error);
              alert('网络错误，不能访问');
          })
        },
        getDeil (dielArr){
            let url = '/api/product/order/queryOrderStateByMemberIds';
            this.$http({
                url: url,
                method: 'POST',
                // 请求体重发送的数据
                headers: { 'Content-Type': 'application/json' },
                data:dielArr,
            })
            .then(response => {
                console.log(response.data.info)
                this.datalist.forEach(item=>{
                        this.orderState = response.data.info[item.id]
                        this.$set(item,'orderState',this.orderState)
                    });
                
          })
          .catch(error=>{
              console.log(error);
              alert('网络错误，不能访问');
          })
        },
      getDate(pageIndex) {
            let that = this;
            this.listLoading =  true;
            let url = '/api/customer/account/query?page='+pageIndex+'&pageSize=10';
            this.$http({
                url: url,
                method: 'POST',
                // 请求体重发送的数据
                headers: { 'Content-Type': 'application/json' },
                data:this.data,
            })
            .then(response => {
                that.listLoading =  false
                that.datalist=(response.data.info.list);
                console.log(that.datalist)
                for(let name in this.datalist){
                    this.idBox.push(this.datalist[name].estateId)
                }
                let dielArr = []
                for(let name in this.datalist){
                    dielArr.push(this.datalist[name].id)
                }
                this.getDeil (dielArr)
                //console.log(this.idBox)
                this.getResidential(this.idBox)
                that.$root.$emit('output1',that.datalist)
                that.$root.$emit('pages1',response.data.info.pages)
                that.$root.$emit('total1',response.data.info.total)
          })
          .catch(error=>{
              console.log(error);
              alert('网络错误，不能访问');
          })
        },
        showMemberInfo(row,column,cell,event){//  点击显示侧滑
            //console.log(row,column,cell,event)
            //  let classNum = cell.className.split('n_')[1] //  获取单元格的类名
            let labelValue = column.label
            if(labelValue == '客户姓名'){
                this.showLeft = 16
                this.$root.$emit('infoCoverShow',this.showLeft)
                this.$root.$emit('searchPersonnelInfo',row.id)
            }
        },      
        showextra(val){
             let show=false;
             let editcan=true;
             this.multipleSelection = val
            if(this.multipleSelection.length>0){
                show=true;
            }
            if(this.multipleSelection.length>1){
                editcan=false;
            }
             this.$root.$emit('showlttip',{show,editcan,num:this.multipleSelection.length,datas:this.multipleSelection});
        },
        indexMethod(index) {
            return index + 1
        },
    }

}
</script>
