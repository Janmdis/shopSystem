/* eslint-disable */
import memberInfo from './memberInfo/MemberInfo.vue'
import Datatable from './MemberTable.vue'
import Lttip from './lttip.vue'
import searchBox from '@/components/common/search/searchBox.vue'
import search from '../../common/search/search.vue'
import showWindows from './showWindow.vue'
import MemberMark from './MemberMark.vue'
import qs from 'qs'
import moment from "moment"


export default {

    name: 'member',
    data() {

        return {
            valuesearch: '',
            loadOk: true,
            namepage: '会员资料',
            currentPage1: 1,
            searchFn: '',
            isActive: false,
            totalCount: 0,
            pageIndex: 1,
            pageSize: 10,
            pageS: 0,
            listLoading: false,
            delArr: [],
            importUrl: '/api/customer/customer/excel/in', //后台接口config.admin_url+'rest/schedule/import/'
            importHeaders: {
                enctype: 'multipart/form-data',
            },
            state: true,
            fileList: [],
            dataForm: [],
            idList: [],
            dataHref: '',
            isShowList: false,
            memberInfo: [],
            type:'member',
            datainfos:''
        }

    },
    updated() {
        this.$root.$on('search',data=>{
            // console.log(delete data.account.birthDatecheck);
            this.dataHref = `/api/customer/customer/excel/out?conditions=${encodeURI(JSON.stringify(data.account))}`
        });
    },
    created() {
        
        
        this.$root.$on('output1', data => {
            console.log(data)
            this.dataForm = data;
            this.idList = [];
            if (data) {
                data.forEach((e, i) => {
                    this.idList.push(e.id);
                })
            }
           
            let id = JSON.stringify(this.idList).replace(/\[|]/g, '');
            let ids = id.replace(/\"|"/g, "");
            if(ids){
                this.dataHref = '/api/customer/customer/excel/out?id=' + ids
            }else{
                console.log(this.datainfos)
                this.dataHref = `/api/customer/customer/excel/out?conditions=${encodeURI("{}")}`
            }
            
        })
    },
    mounted() {
        this.$root.$on('total1', (data) => {
            this.totalCount = data
        })
        this.$root.$on('pages1', (data) => {
            this.pageS = data
        })
        this.$root.$on("delBox", (data) => {
            for (var values of data) {
                this.delArr.push(values.id)
            }
            this.clearBox()
        })
    },
    methods: {
        Refresh() {
            // this.$root.$emit('getDatezdy', 1);
            this.handleCurrentChange(1)
            // this.handleSizeChange(1)
        },
        handlePreview(file) {
            //可以通过 file.response 拿到服务端返回数据
            console.log(file.response);
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
        //下载模板
        // outData() {    
        //     console.log(id);
        //     this.$http.get(
        //         '/api/customer/customer/excel/out?id=' + id
        //     ).then(res => {
        //         console.log(res)
        //     }).catch(err => {
        //         console.log(err);
        //     })
        // },
        // download() {

        //     //调用后台模板方法,和导出类似
        //     // scheduleApi.downloadTemplate()
        //     this.$confirm('此操作将导出excel文件, 是否继续?', '提示', {
        //         confirmButtonText: '确定',
        //         cancelButtonText: '取消',
        //         type: 'warning'
        //     }).then(() => {
        //         this.outData();
        //         // this.excelData = this.dataForm //你要导出的数据list。
        //         // this.export2Excel()
        //     }).catch((err) => {
        //         console.log(err);
        //     });

        // },
        // export2Excel() {
        //     var that = this;
        //     require.ensure([], () => {
        //         const { export_json_to_excel } = require('@/excel/Export2Excel'); //这里必须使用绝对路径
        //         const tHeader = ['id', '姓名', '手机号', '客户类型', '城市', '小区', '订单状态', '来源', '录入时间', '小区地址']; // 导出的表头名
        //         const filterVal = ['id', 'name', 'mobile', 'types', 'city', 'quarters', 'state', 'source', 'Inputtiem', 'address']; // 导出的表头字段名
        //         const list = that.excelData;
        //         const data = that.formatJson(filterVal, list);
        //         console.log(data);
        //         let time1, time2 = '';
        //         if (this.start !== '') {
        //             time1 = moment(that.start).format('YYYY-MM-DD')
        //         }
        //         if (this.end !== '') {
        //             time2 = moment(that.end).format('YYYY-MM-DD')
        //         }
        //         export_json_to_excel(tHeader, data, `[${time1}-${time2}]提现管理excel`); // 导出的表格名称，根据需要自己命名
        //     })
        // },
        // formatJson(filterVal, jsonData) {
        //     return jsonData.map(v => filterVal.map(j => v[j]))
        // },



        clearBox() {
            let that = this;
            this.$confirm('确认删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.post('/api/customer/account/remove', this.delArr)
                    .then(function(response) {
                        console.log(response);
                        if (response.data.msg == '删除成功') {
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
                //   post('/api/manager/v1/user/accountQuery', para).then((response) => {
                //     this.getAllusers = response.data.data;
                //     this.totalCount = response.data.totalCount;
                //     console.log(response.data.totalCount);
                //     this.listLoading = false;
                //   }).catch(function (err) {
                //     console.log(err)
                //   });
        },
        showWindow() {
            this.$root.$emit("showWindow", 'no')
        },
        closeInfo() {
            // let infos = document.getElementsByClassName("infoCover")[0]
            // console.log(infos.style.left)
            // if (!(infos.style.left == '' || infos.style.left == null || infos.style.left == undefined)) {
            //     var left1 = 16;
            //     let timer2 = setInterval(function() {
            //         left1++
            //         infos.style.left = left1 + '%';
            //         if (left1 == 100) {
            //             left1 = 100
            //             clearInterval(timer2)
            //         }
            //     }, 5);
            // }
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
        memberInfo,
        Lttip,
        search,
        Datatable,
        showWindows,
        searchBox,
        MemberMark
    },
    beforeDestroy() {
        this.$root.$off('loading');
        this.$root.$off('total1');
        this.$root.$off('delBox');
        this.$root.$off('pages1');
        this.$root.$off('output1');
    }
}