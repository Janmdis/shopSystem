<template>
    <el-table
    :data="datalist"
    @select='showextra(false)'
    @select-all='showextra(true)'
    @cell-click='showMemberInfo'
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
        width="55">
        </el-table-column>
        <el-table-column class='borderRight' fixed prop="ids" label="ID" width='100'>
        </el-table-column>
        <el-table-column
        prop="name"
        label="客户姓名"
        >
        </el-table-column>
        <el-table-column
        prop="iphone"
        width='120'
        label="手机号">
        </el-table-column>
        <el-table-column
        prop="types"
        label="客户类型">
        </el-table-column>
        <el-table-column
        prop="city"
        label="城市">
        </el-table-column>
        <el-table-column
        prop="quarters"
        label="小区">
        </el-table-column>
        <el-table-column
        prop="state"
        label="订单状态">
        </el-table-column>
        <el-table-column
        prop="source"
        label="来源">
        </el-table-column>
        <el-table-column
        prop="Inputtiem"
        width='100'
        label="录入时间">
        </el-table-column>
        <el-table-column
        width='260'
        prop="address"
        label="小区地址">
    </el-table-column>
                
            </el-table>
</template>
<script>
//@row-click="showMemberInfo()"
export default {
    props:['data'],
    data(){
        return {
            datalist:[],
            showLeft:0,
        }
    },
    created:function(){
        this.datalist=this.data;
    },
    methods:{
        showMemberInfo(row,column,cell,event){//  点击显示侧滑
            console.log(row,column,cell,event)
            //  let classNum = cell.className.split('n_')[1]
            let labelValue = column.label
            console.log(labelValue,column.property)
            if(labelValue == 'ID'){
                this.showLeft = 16
                this.$root.$emit('infoCoverShow',this.showLeft)
            }
        },      
        showextra(isall){
            let inputdom=document.getElementsByClassName('el-table__fixed-body-wrapper')[0].getElementsByTagName('input');
            let num=0;
            let allnum=inputdom.length;
            for(let i=0;i<inputdom.length;i++){
                if(inputdom[i].checked){
                    num++;
                }
            }
            let show=false;
            let editcan=true;
            if(isall){
                if(num==0||num!=allnum){
                    show=true;
                    editcan=false;
                    num=allnum;
                }
                else{
                    show=false;
                    num=0;
                }
            }
            else{
                if(num!=0){
                    show=true;
                    editcan=num>1?false:true;
                }
                else{
                    show=false;
                }
            }
            console.log(show)
            console.log(editcan)
            console.log(num)
            this.$root.$emit('showlttip',{show,editcan,num});
        },
        indexMethod(index) {
            return index + 1
        },
        // formatterData(row,column,cellValue){//  初始化某一列的内容,三个参数
        //     //console.log(row,column,cellValue)
        //     switch(row.ids){
        //         case '25284':
        //         return '大虎';
        //         break;
        //         case '25285':
        //         return '王二虎';
        //         break;
        //         default:
        //         return '未知';
        //     }
        // },
    }

}
</script>
