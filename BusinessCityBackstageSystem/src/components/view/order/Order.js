/* eslint-disable */
import orderInfo from './orderInfo/OrderInfo.vue'
import Datatable from './MemberTable.vue'
import Lttip from './lttip.vue'
import searchBox from '@/components/common/search/searchBox.vue'
import search from '../../common/search/search.vue'
import showWindows from './showWindow.vue'
import qs from 'qs'

export default {

    name: 'member',
    data() {
        return {
            valuesearch: '',
            namepage: '订单列表',
            currentPage1: 1,
            searchFn: '',
            isActive: false,
            totalCount: 0,
            pageIndex: 1,
            pageSize: 10,
            pageS: 0,
            listLoading: false,
            delArr: [],
            importUrl: '/api/product/order/excelIn', //后台接口config.admin_url+'rest/schedule/import/'
            importHeaders: {
                enctype: 'multipart/form-data',
            },
            state: true,
            fileList: [],
            dataForm: [],
            dataHref: '',
            idList: [],
            isShowList: false,
            type:'order'
        }

    },
    updated() {
        this.$root.$on('search',data=>{
            //console.log(delete data.account.birthDatecheck);
            console.log(data)
            this.dataHref = `/api/product/order/excelOut?conditions=${encodeURI(JSON.stringify(data.order))}`
        });
    },
    created() {
       
        this.$root.$on('output', data => {
        
            this.dataForm = data;
            this.idList = [];
            if(data){
                data.forEach((e, i) => {
                    this.idList.push(e.id);
                    // console.log(this.idList)
                })
            }
            
            let id = JSON.stringify(this.idList).replace(/\[|]/g, '');
            let ids = id.replace(/\"|"/g, "");
            
            if(ids){
                this.dataHref = '/api/product/order/excelOut?ids=' + ids ;
            }else{
                this.dataHref = `/api/product/order/excelOut?conditions=${encodeURI("{}")}`;
              
            }
            
            // let url = '/api/product/order/excelOut';
            //     this.$http({
            //             url: url,
            //             method: 'post',
            //             data:['264735d9-2b58-11e8-b96a-509a4c15ca0c']
            //         })
            //         .then(respone => {
            //             console.log(respone.data)
            //             //this.leable = respone.data.info;
            //              this.dataHref =  respone.data
            //         })
            //         .catch(error => {
            //             console.log(error);
            //             ////         alert('网络错误，不能访问');
            //         })
        })
        this.$root.$on('total', (data) => {
            this.totalCount = data
        })
        this.$root.$on('pages', (data) => {
            this.pageS = data
        })
        this.$root.$on("delBox", (data) => {
            for (var values of data) {
                this.delArr.push( values.id)
            }
            this.clearBox()
        })
    },
    methods: {
        Refresh() {
            this.handleCurrentChange(1)
        },
        handlePreview(file) {
            //可以通过 file.response 拿到服务端返回数据
        },
        beforeUpload(file) {
            //上传前配置
            let excelfileExtend = ".xls,.xlsx" //设置文件格式
            let fileExtend = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
            if (excelfileExtend.indexOf(fileExtend) <= -1) {
                this.$message.error('文件格式错误')
                return false
            }
        },
        //上传成功
        uploadSuccess(response, file, fileList) {
            console.log(response)
            if (response.status === 300) {
                this.$message.info(response.msg)
            } else if (response.status === 200) {
                this.$message.info(response.msg)
            }
        },


        clearBox() {
            let that = this;
            this.$confirm('确认删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.post('/api/product/order/delete', this.delArr)
                    .then(function(response) {
                        console.log(response);
                        if (response.data.status == '200') {
                            that.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            that.$root.$emit('getDatezdy', 1)
                        } else {
                            that.$message({
                                type: 'info',
                                message: response.data.msg
                            });
                        }
                    })
                    .catch(function(response) {
                        that.$message({
                            type: 'info',
                            message: '删除失败!'
                        });
                    });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            })
        },
        show: function(val) {
            this.searchUsers()
        },
        searchUsers() {
            let para = {
                pageIndex: this.pageIndex,
                pageSize: this.pageSize,
            };
            if (!this.valuesearch.replace(/\s/g, "") == '') {
                para.username = this.valuesearch.replace(/\s/g, "")
            }
            this.listLoading = true;
            let _this = this;
            let url = '/api/customer/account/search?page=' + this.pageIndex + '&pageSize=10&keyword=' + para.username;
            this.$http({
                    url: url,
                    method: 'POST',
                    // 请求体重发送的数据
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    //  data:qs.stringify( {

                    //  }),
                })
                .then(response => {
                    console.log(response)
                        //  this.listLoading =  false;
                    this.datalist = (response.data.info.list);
                    this.$root.$emit('dataListBox', this.datalist)
                    this.$root.$emit('pages', response.data.info.pages)
                    this.$root.$emit('total', response.data.info.total)

                })
                .catch(error => {
                    console.log(error);
                    //         alert('网络错误，不能访问');
                })

        },
        showWindowx() {
            this.$root.$emit("showWindow", 'no')
        },
        closeInfo() {

        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.$root.$emit('pageSize', {
                value: this.pageSize
            })
        },
        handleCurrentChange(val) {
            this.pageIndex = val;
            this.$root.$emit('pageIndex', {
                value: this.pageIndex
            })

        },

    },
    components: {
        Lttip,
        search,
        Datatable,
        showWindows,
        searchBox,
        orderInfo
    },
    beforeDestroy() {
        this.$root.$on('loading');
        this.$root.$on('total');
        this.$root.$on('delBox');
        this.$root.$on('pages');
        this.$root.$on('output');
    }
}