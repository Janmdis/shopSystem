<template>
    <el-dialog title="会员设置标签" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="您选中的会员:" :label-width="formLabelWidth"><span>{{labelName}}</span>&nbsp;位</el-form-item>
            <el-row>
                <el-col :span='12'>
                    <el-form-item label="标签" :label-width="formLabelWidth">
                        <el-select v-model="form.tages" placeholder="请选择级别类型" @change='changes'>
                            <el-option v-for=' (item,index) in dynamicTags' :key="index" :label='item.name' :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :offset="1" style='padding-bottom:10px;'>
                    <el-tag :key="tag.name" v-for="(tag,index) in Tagbox" :style="{background: tag.color}" style='color:#fff;margin-right:10px;margin-bottom:10px; ' closable :disable-transitions="false" @close="handleCloses(index)">
                        {{tag.name}}
                    </el-tag>
                    <!--<el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue"  ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
                                            </el-input>
                                            <el-button v-else class="button-new-tag" size="small" @click="showInput">新增标签</el-button>!-->
                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        data() {
            return {
                dialogFormVisible: false,
                dynamicTags: [],
                Tagbox: [],
                TagboxId: [],
                propleId:[],
                labelName:'',
                form: {
                    tages: '',
                    name: '',
                    region: '',
                    thisId:''
                },
                formLabelWidth: '120px',
            };
        },
        created() {
            this.searchLabel()
            this.$root.$on("MarkLable", (data) =>{
                console.log(data)
                this.dialogFormVisible = data[0].isShow
                this.labelName = data[0].list.length;
                data[0].list.forEach((item,index)=>{
                    console.log(item)
                })
                this.propleId
            })
        },
        methods: {
            option(test, status) {
                this.$message({
                    message: test,
                    type: status ? status : 'warning'
                })
            },
            searchLabel() {
                let url = '/api/customer/label/query/label';
                this.$http({
                        url: url,
                        method: 'post',
                        data: {}
                    })
                    .then(respone => {
                        console.log(respone)
                        for (let i = 0; i < respone.data.info.length; i++) {
                            this.dynamicTags.push({
                                name: respone.data.info[i].name,
                                color: respone.data.info[i].color,
                                id: respone.data.info[i].id
                            })
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        alert('网络错误，不能访问');
                    })
            },
            changes(value) {
                let obj = {};
                let newObj = {};
                obj = this.dynamicTags.find((item) => {
                    if (item.id === value) {
                        if (value !== "" || value !== null) {
                            newObj = {
                                labelId: item.id,
                                accountId: this.form.thisId
                            }
                            this.TagboxId.push(newObj)
                        }
                    }
                    return item.id === value;
                });
                this.Tagbox.push(obj);
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
        },
        beforeDestroy(){
            this.$root.$off('MarkLable');
        }
        
    };
</script>
<style>

</style>