<template>
    <el-table :data="datalist" @selection-change='showextra' @cell-click='showMemberInfo' v-loading="this.listLoading" :stripe='true' style="width: 100%;" height='500'>
        <el-table-column fixed type="index" label="N" :index="indexMethod">
        </el-table-column>
        <el-table-column fixed type="selection" width="55">
        </el-table-column>
        <!-- <el-table-column class='borderRight' fixed prop="id" label="ID" width='360' height='100'>
                        </el-table-column> -->
        <el-table-column prop="name" fixed width='200' label="客户姓名">
        </el-table-column>
        <el-table-column prop="mobile" width='120' label="手机号">
        </el-table-column>
        <el-table-column label="客户类型">
            <template slot-scope='scope'>
                                <span >
                               {{getMember(scope.row.categoryId, memberInfo.info)}}
                                </span>
</template>
        </el-table-column>
        <el-table-column
        prop='cityName'
        label="城市">
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
                <span>
                    {{getMember(scope.row.recommendedSourceId, findSource.info)}}
                </span>
            </template>
        </el-table-column>
        <el-table-column
        label="推荐人" 
        prop='textIfon'>
        </el-table-column>
        <el-table-column
        width='500'
        label="会员标签">
<template slot-scope='scope'>
    <el-button v-for='(item,index) in getLable(scope.row.customerAccountLabels)' :style="{background: item.color  }" style='color:#fff;' :key='index'>
        {{item.name}}</el-button>
</template>
                </el-table-column>
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
    import {
        mapState
    } from 'Vuex'
    export default {
        prop: ['listLoading'],
        data() {
            return {
                leable: [],
                datalist: [],
                showLeft: 0,
                pageIndex: 1,
                memberInfo: [],
                findSource: [],
                address: [],
                idBox: [],
                cArr: '',
                textIfon: '',
                orderState: '',
                Referee: '',
                quarters: '',
                quartersAdd: '',
                data: {
                    mobile: null,
                    categoryId: null,
                    level: null,
                    cityId: null,
                    estateId: null,
                    recommendedSourceId: null,
                    birthDate: null
                }
            }
        },
        created: function() {
            this.$root.$on('pageIndex', (data) => {
                this.pageIndex = data.value
                this.getDate(this.pageIndex)
            })
            this.getDate(1)
            this.$root.$on('getDatezdy', (data) => {
                this.getDate(data)
            })
            this.$root.$on('dataListBox', (data) => {
                this.datalist = data
            })
            this.$root.$on('search', datas => {
                this.data.mobile = datas.account.mobile === '' ? null : datas.account.mobile;
                this.data.categoryId = datas.account.categoryId === '' ? null : datas.account.categoryId;
                this.data.level = datas.account.level === '' ? null : datas.account.level;
                this.data.cityId = datas.account.cityId === '' ? null : datas.account.cityId;
                this.data.estateId = datas.account.estateId === '' ? null : datas.account.estateId;
                this.data.recommendedSourceId = datas.account.recommendedSourceId === '' ? null : datas.account.recommendedSourceId;
                this.data.birthDate = datas.account.birthDatecheck ? new Date() : null;
                this.getDate(1);
            })
            this.memberInfo = JSON.parse(sessionStorage.getItem("member"));
            this.findSource = JSON.parse(sessionStorage.getItem("findSource"));
            //this.address = JSON.parse(sessionStorage.getItem("address"));
            this.$store.dispatch('getCatogery');
            this.$store.dispatch('getOrigin');
        },
        methods: {
            getMember(id, obj) {
                console.log(id)
                console.log(obj)
                let i = 0
                for (name in obj) {
                    if (name == id) {
                        return obj[name]
                    }
                }
            },
            getResidential(idBox) {
                let url = '/api/customer/estate/queryByIdList';
                this.$http({
                        url: url,
                        method: 'POST',
                        // 请求体重发送的数据
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: idBox,
                    })
                    .then(response => {
                        response.data.info.forEach(item1 => {
                            this.datalist.forEach((item, i) => {
                                if (item1.id == item.estateId) {
                                    this.$set(item, 'quarters', item1.alias);
                                    this.$set(item, 'quartersAdd', item1.address);
                                }
                            });
                        })
                    })
                    .catch(error => {
                        console.log(error);
                        //alert('网络错误，不能访问');
                    })
            },
            //订单状态
            getDeil(dielArr) {
                let url = '/api/product/order/queryOrderStateByMemberIds';
                this.$http({
                        url: url,
                        method: 'POST',
                        // 请求体重发送的数据
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: dielArr,
                    })
                    .then(response => {
                        this.datalist.forEach(item => {
                            this.orderState = response.data.info[item.id]
                            this.$set(item, 'orderState', this.orderState)
                        });
                    })
                    .catch(error => {
                        console.log(error);
                        //alert('网络错误，不能访问');
                    })
            },
            getDate(pageIndex) {
                let that = this;
                this.listLoading = true;
                let url = '/api/customer/account/query?page=' + pageIndex + '&pageSize=10';
                this.$http({
                        url: url,
                        method: 'POST',
                        // 请求体重发送的数据
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: this.data,
                    })
                    .then(response => {
                        that.listLoading = false
                        that.datalist = (response.data.info.list);
                        console.log(that.datalist)
                        this.searchLabel(that.datalist);
                        for (let name in this.datalist) {
                            this.idBox.push(this.datalist[name].estateId)
                        }
                        let dielArr = []
                        for (let name in this.datalist) {
                            dielArr.push(this.datalist[name].id)
                        }
                        this.getDeil(dielArr);
                        let dielArr1 = []
                        for (let name in this.datalist) {
                            dielArr1.push(this.datalist[name].recommendedAdminId)
                        }
                        let dielArr2 = []
                        for (let name in this.datalist) {
                            dielArr2.push(this.datalist[name].recommendedCustomerId)
                        }
                        let newArrS = [];
                        let url = '/api/customer/account/queryMapByIds?key=id&value=name';
                        this.$http({
                                url: url,
                                method: 'POST',
                                // 请求体重发送的数据
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                data: dielArr2,
                            })
                            .then(response => {
                                newArrS.push(response.data.info)
                                for (let k in response.data.info) {
                                    if (response.data.info[k]) {
                                        response.data.info[k] = '后台--' + response.data.info[k]
                                    }
                                }
                                let url2 = '/api/admin/account/queryListByIds?key=id&value=adminName';
                                this.$http({
                                        url: url2,
                                        method: 'POST',
                                        // 请求体重发送的数据
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        data: dielArr1,
                                    })
                                    .then(response => {
                                        newArrS.push(response.data.info);
                                        for (let k in response.data.info) {
                                            if (response.data.info[k]) {
                                                response.data.info[k] = '前台--' + response.data.info[k]
                                            }
                                        }
                                        that.cArr = this.extend({}, [newArrS[0], newArrS[1]]);
                                        let arr = []
                                        this.datalist.forEach((item, i) => {
                                            if (item.recommendedAdminId != '' || item.recommendedCustomerId !== '') {
                                                this.arrbox = item.recommendedAdminId || item.recommendedCustomerId;
                                                arr.push(this.arrbox)
                                            }
                                            for (let i = 0; i < arr.length; i++) {
                                                // if(arr[i] ==that.cArr[i] ){
                                                that.textIfon = that.cArr[arr[i]];
                                                this.$set(item, 'textIfon', that.textIfon)
                                                // }
                                            }
                                        });
                                    })
                                    .catch(error => {
                                        console.log(error);
                                        //alert('网络错误，不能访问');
                                    })
                            })
                            .catch(error => {
                                console.log(error);
                                //alert('网络错误，不能访问');
                            })
                        this.getResidential(this.idBox)
                        that.$root.$emit('output1', that.datalist)
                        that.$root.$emit('pages1', response.data.info.pages)
                        that.$root.$emit('total1', response.data.info.total)
                    })
                    .catch(error => {
                        console.log(error);
                        //alert('网络错误，不能访问');
                    })
            },
            extend(des, src, override) {
                if (src instanceof Array) {
                    for (var i = 0, len = src.length; i < len; i++)
                        this.extend(des, src[i], override);
                }
                for (var i in src) {
                    if (override || !(i in des)) {
                        des[i] = src[i];
                    }
                }
                return des;
            },
            showMemberInfo(row, column, cell, event) { //  点击显示侧滑
                //console.log(row,column,cell,event)
                //  let classNum = cell.className.split('n_')[1] //  获取单元格的类名
                let labelValue = column.label
                if (labelValue == '客户姓名') {
                    this.showLeft = 16
                    this.$root.$emit('infoCoverShow', this.showLeft)
                    this.$root.$emit('searchPersonnelInfo', row.id)
                }
            },
            showextra(val) {
                let show = false;
                let editcan = true;
                this.multipleSelection = val
                if (this.multipleSelection.length > 0) {
                    show = true;
                }
                if (this.multipleSelection.length > 1) {
                    editcan = false;
                }
                this.$root.$emit('showlttip', {
                    show,
                    editcan,
                    num: this.multipleSelection.length,
                    datas: this.multipleSelection
                });
            },
            searchLabel(data) {
                let url = '/api/customer/label/query/label';
                this.$http({
                        url: url,
                        method: 'post',
                        data: {}
                    })
                    .then(respone => {
                        this.leable = respone.data.info;
                    })
                    .catch(error => {
                        console.log(error);
                        alert('网络错误，不能访问');
                    })
            },
            getLable(data) {
                let les = []
                if (data != null) {
                    data.forEach((item, index) => {
                        this.leable.forEach((items, indexs) => {
                            if (item.labelId == items.id) {
                                les.push(items)
                            }
                        })
                    });
                }
                return les
            },
            indexMethod(index) {
                return index + 1
            },
        },
        beforeDestroy() {
            this.$root.$off('pageIndex')
            this.$root.$off('getDatezdy')
            this.$root.$off('dataListBox')
            this.$root.$off('search')
        }
    }
</script>
