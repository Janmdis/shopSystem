<template>
    <div>
        <el-dialog id="addEstate" :title="ruleForm.textInfo" :before-close="closeDialog" :visible.sync="dialogVisible" width="30%">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-row>
                    <el-col :span='12'>
                        <el-form-item label="阶段" prop='articles'>
                            <el-select v-model="ruleForm.articles" placeholder="请选择活动区域">
                                <el-option v-for='item in articlesArr' :key="item.id" @click.native='getentryitem(item.id)' :label="item.stagename" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span='12'>
                        <el-form-item label="检查项" prop='entryitem'>
                            <el-select v-model="ruleForm.entryitem" placeholder="请选择活动区域">
                                <el-option v-for='item in entryitemArr' :key="item.id" :label="item.itemname" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span='24'>
                        <el-form-item label="检查点">
                            <el-input v-model.trim="ruleForm.point"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='24'>
                        <el-form-item label="标准">
                            <el-input v-model="ruleForm.standardname"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='24'>
                        <el-form-item label="检查方式">
                            <el-input v-model="ruleForm.acceptance"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='24'>
                        <el-form-item label="标签">
                            <el-select v-model="ruleForm.tages" placeholder="请选择级别类型" @change='changes'>
                                <el-option v-for=' (item,index) in dynamicTags' :key="index" :label='item.name' :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :offset="1" style='padding-bottom:10px;'>
                        <el-tag :key="tag.name" v-for="(tag,index) in Tagbox" :style="{background: tag.color}" style='color:#fff;margin-right:10px;margin-bottom:10px; ' closable :disable-transitions="false" @close="handleCloses(index)">
                            {{tag.name}}
                        </el-tag>
                        <!--<el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue"  ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
                                </el-input>
                                <el-button v-else class="button-new-tag" size="small" @click="showInput">新增标签</el-button>!-->
                    </el-col>
                </el-row>
                <el-form-item class="estate-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                </el-form-item>
            </el-form>
            <back-end-user></back-end-user>
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
    import backEndUser from './backEndUser.vue'
    import {
        mapState
    } from 'vuex';
    import qs from 'qs'
    export default {
        data() {
            return {
                selectAll: false,
                showStyle: false,
                addObjArr: [],
                articlesArr: [],
                entryitemArr: [],
                dynamicTags: [],
                Tagbox: [],
                TagboxId: [],
                dialogVisible: false,
                dialogRead: false,
                ruleForm: {
                    tages: '',
                    textInfo: '新增会员',
                    point: '', //点
                    standardname: '',
                    acceptance: '',
                    thisId: '',
                    articles: '',
                    entryitem: '',
                    labelId: '',
                    standardId: '',
                    pointId: '',
                    itemId: '',
                },
                rules: {
                    articles: [{
                        required: true,
                        message: '请选阶段',
                        trigger: 'change'
                    }, ],
                    entryitem: [{
                        required: true,
                        message: '请选检查项',
                        trigger: 'change'
                    }, ],
                },
            };
        },
        methods: {
            getMark() {
                let url = '/api/public/label/query';
                this.$http({
                        url: url,
                        method: 'POST',
                        // 请求体重发送的数据
                        // headers: {
                        //     'Content-Type': 'application/json'
                        // },
                        data: {}
                    })
                    .then(res => {
                        this.dynamicTags = res.data.info.list;
                    })
                    .catch(error => {
                        console.log(error);
                        //         alert('网络错误，不能访问');
                    })
            },
            handleCloses(index) {
                let list = [];
                for (let i = 0; i < this.Tagbox.length; i++) {
                    if (index != i) {
                        list.push(this.Tagbox[i]);
                        this.$message({
                            type: 'success',
                            message: '删除成功！'
                        });
                    }
                }
                this.Tagbox = list;
            },
            changes(value) {
                let obj = {};
                let newObj = {};
                console.log(value)
                obj = this.dynamicTags.find((item) => {
                    if (item.id === value) {
                        if (value !== "" || value !== null) {
                            newObj = {
                                labelId: item.id,
                                accountId: this.ruleForm.thisId
                            }
                            this.TagboxId.push(newObj)
                        }
                    }
                    return item.id === value;
                });
                this.Tagbox.push(obj);
                console.log(this.Tagbox)
                //过滤重复项
                var hash = {};
                this.Tagbox = this.Tagbox.reduce(function(item, next) {
                    hash[next.name] ? '' : hash[next.name] = true && item.push(next);
                    return item
                }, [])
                //过滤id
                var hashId = {};
                this.TagboxId = this.TagboxId.reduce(function(item, next) {
                    hashId[next.labelId] ? '' : hashId[next.labelId] = true && item.push(next);
                    return item
                }, []);
            },
            getentryitem(val) {
                this.ruleForm.entryitem = '';
                let url = '/api/public/entryitem/query';
                this.$http({
                        url: url,
                        method: 'POST',
                        // 请求体重发送的数据
                        // headers: {
                        //     'Content-Type': 'application/json'
                        // },
                        data: {
                            parentId: val
                        }
                    })
                    .then(res => {
                        this.entryitemArr = (res.data.info.list)
                    })
                    .catch(error => {
                        console.log(error);
                        // //         alert('网络错误，不能访问');
                    })
            },
            getarticles() {
                let url = '/api/public/articles/queryMap';
                this.$http({
                        url: url,
                        method: 'POST',
                        // 请求体重发送的数据
                        // headers: {
                        //     'Content-Type': 'application/json'
                        // },
                        data: {}
                    })
                    .then(res => {
                        this.articlesArr = res.data.info
                        console.log(this.articlesArr)
                    })
                    .catch(error => {
                        console.log(error);
                        // //         alert('网络错误，不能访问');
                    })
            },
            closeDialog(done) {
                this.dialogVisible = false;
                this.$refs['ruleForm'].resetFields();
                this.ruleForm.name = ''
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.ruleForm.textInfo == "新添词条") {
                            let NewTagbox = [];
                            if (this.Tagbox) {
                                this.Tagbox.forEach(item => {
                                    NewTagbox.push({
                                        "labelId": item.id
                                    })
                                })
                            }
                            let url = '/api/public/entrypoint/insertOne';
                            this.$http({
                                    url: url,
                                    method: 'POST',
                                    // 请求体重发送的数据
                                    // headers: {
                                    //     'Content-Type': 'application/json'
                                    // },
                                    data: {
                                        point: this.ruleForm.point,
                                        parentId: this.ruleForm.entryitem,
                                        entryStandards: [{
                                            standardname: this.ruleForm.standardname,
                                            acceptance: this.ruleForm.acceptance,
                                            entryArticlesLabels: NewTagbox
                                        }]
                                    }
                                })
                                .then(res => {
                                    console.log(res)
                                    if(res.data.status==200){
                                        this.dialogVisible = false;
                                        this.$root.$emit('getDatezdy', 1);
                                        this.addObjArr = []
                                        this.Tagbox = [];
                                        this.ruleForm={
                                            tages: '',
                                            point: '', //点
                                            standardname: '',
                                            acceptance: '',
                                            thisId: '',
                                            articles: '',
                                            entryitem: '',
                                            labelId: '',
                                            standardId: '',
                                            pointId: '',
                                            itemId: '',
                                        }
                                    }else{
                                        this.$message("数据添加重复")
                                    }
                                    
                                })
                                .catch(error => {
                                    console.log(error);
                                    // //         alert('网络错误，不能访问');
                                })
                        }
                        if (this.ruleForm.textInfo == "编辑词条") {
                            let url = '/api/public/Standard/update';
                            let NewTagbox = [];
                            if (this.Tagbox) {
                                this.Tagbox.forEach(item => {
                                    NewTagbox.push({
                                        "labelId": item.id
                                    })
                                })
                            }
                            this.$http({
                                    url: url,
                                    method: 'POST',
                                    // 请求体重发送的数据
                                    // headers: {
                                    //     'Content-Type': 'application/json'
                                    // },
                                    data: {
                                        id:this.ruleForm.standardId,
                                        standardname:this.ruleForm.standardname,
                                        acceptance:this.ruleForm.acceptance,
                                        parentId: this.ruleForm.entryitem,
                                        entryArticlesLabels:NewTagbox,
                                        entryItems:[{
                                            id: this.ruleForm.itemId,
                                            parentId: this.ruleForm.thisId,
                                        }],
                                        entryPoints:[{
                                            id: this.ruleForm.pointId,
                                            point: this.ruleForm.point,
                                            parentId: this.ruleForm.itemId,
                                        }]
                                    }
                                })
                                .then(response => {
                                    this.dialogVisible = false;
                                    this.$root.$emit('getDatezdy', 1)
                                })
                                .catch(error => {
                                    console.log(error);
                                    //         alert('网络错误，不能访问');
                                })
                        }
                        this.dialogVisible = false;
                        this.$refs[formName].resetFields();
                    }
                });
            },
        },
        created: function() {
            this.getarticles();
            this.getMark();
            this.$root.$on('showWindowss', (data) => {
                this.$nextTick(() => {
                    if (data.type != 'no') {
                        this.dialogVisible = true;
                        this.ruleForm.textInfo = '编辑词条';
                        this.showStyle = true;
                        console.log(data.rowData)
                        this.ruleForm.thisId = data.rowData.id
                        this.getentryitem(data.rowData.id)
                        this.ruleForm.articles = data.rowData.id
                        this.ruleForm.entryitem = data.rowData.itemId
                        this.ruleForm.point = data.rowData.point;
                        this.ruleForm.standardname = data.rowData.standardname;
                        this.ruleForm.standardId = data.rowData.standardId;
                        this.ruleForm.pointId = data.rowData.pointId;
                        this.ruleForm.itemId = data.rowData.itemId;
                        this.ruleForm.acceptance = data.rowData.acceptance;
                        this.Tagbox = data.rowData.labelList;
                    } else {
                        this.showStyle = false;
                        this.dialogVisible = true;
                        this.ruleForm.textInfo = '新添词条';
                        this.ruleForm.name = ''
                        this.ruleForm.mode = ''
                        this.ListAdminId = []
                        this.ListCustomerId = []
                    }
                })
            });
        },
        components: {
            backEndUser
        },
        beforeDestroy() {
            this.$root.$off('showWindowss');
            this.$root.$off('multipleSelection');
            this.$root.$off('multipleSelections');
        }
    }
</script>