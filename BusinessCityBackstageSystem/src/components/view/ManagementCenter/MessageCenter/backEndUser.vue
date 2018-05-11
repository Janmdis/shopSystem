<template>
    <div>
        <el-dialog :title='listInfo' :visible.sync="dialogRead" width="50%" :append-to-body="true" id="addEstate">
            <el-row v-model="ListAdminId" v-show='listInfo=="接收会员"'>
                <div style="margin: 15px 0;"></div>
                <el-table ref="multipleTables" :data="ListAdminData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChanges">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" align='center'>
                    </el-table-column>
                    <el-table-column prop="nickname" label="昵称" align='center'>
                    </el-table-column>
                    <el-table-column prop="mobile" label="手机" align='center'>
                    </el-table-column>
                    <el-table-column prop="levelName" label="会员称号" align='center'>
                    </el-table-column>
                    <el-table-column prop="level" label="会员等级" align='center'>
                    </el-table-column>
                    <el-table-column prop="createTime" label="创建时间" align='center'>
                    </el-table-column>
                </el-table>
            </el-row>
            <el-row v-model="ListCustomerId" v-show='listInfo=="接收后台用户"'>
                <el-select v-model="translate" placeholder="请选择">
                    <el-option v-for='(item,index) in translateArr' :key='index' :label="item.info" :value='item.id' @click.native="$store.commit('getBackstageList',item.id)">
                    </el-option>
                </el-select>
                <el-table ref="multipleTable" :data="BackstageList.list" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column prop="adminName" label="姓名" align='center'>
                    </el-table-column>
                    <el-table-column prop="phone" label="手机号" align='center' width='150'>
                    </el-table-column>
                    <el-table-column label="性别" align='center'>
                        <template slot-scope="scope">
                                    {{scope.row.adminSex?'女':'男'}}
</template>
                        </el-table-column>
                        <el-table-column
                        prop="employeeTypeName"
                        label="员工种类"
                        align='center'>
                        </el-table-column>
                        <el-table-column
                        prop="manageGroupAdminList[0].departmentName"
                        label="部门"
                        align='center'>
                        </el-table-column>
                        <el-table-column
                        prop="manageGroupAdminList[0].groupName"
                        label="角色"
                        align='center' >
                        </el-table-column>
                        <el-table-column
                        prop="accStatus"
                        label="状态"
                        align='center'>
<template slot-scope="scope">
     {{scope.row.accStatus==0?'停用':'正常'}}
</template>
                        </el-table-column>
                    </el-table>
                <!--<el-checkbox v-for='(item,index) in ListCustomerData' :key='index' :label="item?tiem.id:''">item?tiem.name:''</el-checkbox>!-->
            </el-row>
            <el-row v-if='(total?total>0:false)'>
                <el-col :span='10'>
                    <p class='lineHeight'>从1到{{pages?pages:1}}共<span>{{total?total:0}}</span>条数据</p>
                </el-col>
                <el-col :span='12' :offset="12">
                    <div class="block">
                        <el-pagination  @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"  
                            :current-page="pageNum?pageNum:1" 
                            :page-size="pageSize?pageSize:2" 
                            layout=" prev, pager, next, jumper,total" 
                            :total='total?total:1'>
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
            <div style="width:100%;text-align:center;margin-top:10px;">
                <el-button @click="checkList">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style lang="less">
    #addEstate {
        .imgBox {
            width: 100px;
            height: 100px;
            border: 1px solid #ddd;
        }
        .lineBline {
            border-bottom: 1px solid #ddd;
        }
        .estate-btn {
            .el-form-item__content {
                text-align: center;
                margin-left: 0 !important;
            }
        }
        .el-dialog {
            padding-bottom: 5px;
        }
    }
</style>
<script>
    import {
        mapState
    } from 'vuex';
    import qs from 'qs'
    export default {
        data() {
            return {
                listInfo: '',
                dialogRead: false,
                ListAdminId: [],
                isIndeterminate: false,
                checkAll: false,
                checkedCities: [],
                ListAdminData: [],
                ListCustomerId: [],
                translateArr: [],
                translate: '',
                multipleSelection: [],
                total: '', //总记录数
                pages: '', //总页数
                pageNum: '', //当前页
                pageSize: 2, //每页数量
            };
        },
        computed: {
            ...mapState({
                goods: state => state.newsInfo.newslist,
                getBackstage: state => state.newsInfo.Backstage,
                BackstageList: state => state.newsInfo.BackstageList,
                BackstageInfo: state => state.newsInfo.BackstageInfo,
            })
        },
        watch: {
            BackstageList: {
                deep: true,
                handler: function(val) {
                    this.total = val.total; //总记录数
                    this.pages = val.pages; //总页数
                    this.pageNum = val.pageNum; //当前页
                    // this.pageSize = val.pageSize; //每页数量
                }
            },
            goods:{
                 deep: true,
                handler: function(val) {
                    console.log(val)
                    this.ListAdminData = val.data
                }
            }

        },
        methods: {
            handleCurrentChange(val) {
                console.log(val)
                if(this.listInfo=="接收会员"){
                    this.$store.commit('pageNum',val)
                    this.$store.dispatch('getJson');
                }
                
            },
            handleSizeChange(val) {
                console.log(this.listInfo)
                if(this.listInfo=="接收会员"){
                    this.$store.commit('pageNum',val)
                    this.$store.dispatch('getJson');
                }
                if(this.listInfo=="接收后台用户"){

                }
            },
            handleSelectionChanges(val) {},
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            checkList() {
                this.dialogRead = false;
                console.log(this.checkedCities)
            },
            showVipInfo() {
                this.total = ''; //总记录数
                this.pages = ''; //总页数
                this.pageNum = ''; //当前页
                this.ListAdminData = this.goods.data
                let list = this.goods.list
                this.total = list.total; //总记录数
                this.pages = list.pages; //总页数
                this.pageNum = list.pageNum; //当前页
            },
            showBackInfo() {
                this.total = ''; //总记录数
                this.pages = ''; //总页数
                this.pageNum = ''; //当前页
                console.log(this.getBackstage)
                let {
                    id,
                    info
                } = this.getBackstage.treeAll
                let newObj = [{
                    "id": id,
                    "info": info
                }]
                let merge = []
                //合并数组
                merge = merge.concat(newObj, this.getBackstage.treeAll.children)
                this.translateArr = merge
                let list = this.BackstageList
                this.total = list.total; //总记录数
                this.pages = list.pages; //总页数
                this.pageNum = list.pageNum; //当前页
            }
        },
        created: function() {
            this.$store.dispatch('getJson');
            this.$store.dispatch("getBackstage");
            this.$root.$on('showInfo', (obj) => {
                console.log(obj)
                this.dialogRead = obj.dialogRead
                this.listInfo = obj.listInfo
                if (obj.listInfo == '接收会员') {
                    this.showVipInfo();
                }
                if (obj.listInfo == '接收后台用户') {
                    this.showBackInfo();
                }
            });
        },
        beforeDestroy() {
            this.$root.$off('showInfo');
        }
    }
</script>