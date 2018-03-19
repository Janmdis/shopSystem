<template>
    <el-dialog title="新增信息" :visible.sync="dialogVisible" width="70%">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row>
            <el-col :span='8'>
                <el-form-item label="登录名称" prop="name" >
    
                <el-input v-model="ruleForm.name"  placeholder="请输入登录名称"></el-input>
    
            </el-form-item>
            </el-col>
            
            <el-col :span='8'>
                <el-form-item label="用户名称" prop="name">
    
                <el-input v-model="ruleForm.name" placeholder="请输入用户名称"></el-input>
    
            </el-form-item>
            </el-col>
            <el-col :span='8'>
                <el-form-item label="用户性别" prop="region">
        
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
        
                        <el-option label="区域一" value="shanghai"></el-option>
        
                        <el-option label="区域二" value="beijing"></el-option>
        
                    </el-select>
        
                </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            
            <el-col :span='8'>
                <el-form-item label="用户年龄" prop="name">
    
                <el-input v-model="ruleForm.name" placeholder="请输入用户年龄"></el-input>
    
            </el-form-item>
             </el-col>
            <el-col :span='8'>
                <el-form-item label="" label='用户年龄' prop="name">
                    <div class="block">
                        <span class="demonstration"></span>
                        <el-date-picker
                        v-model="value1"
                        type="date"
                        placeholder="选择日期">
                        </el-date-picker>
                    </div>
            </el-form-item>
             </el-col>
            <el-col :span='8'>
                <el-form-item label="" label='用户年龄' prop="name">
                    <div class="block">
                        <span class="demonstration"></span>
                        <el-date-picker
                        v-model="value2"
                        type="date"
                        placeholder="选择日期">
                        </el-date-picker>
                    </div>
            </el-form-item>
             </el-col>
             
        </el-row>
        <el-row>
            <el-col :span='8'>
                <el-form-item label="用户手机号" prop="name">
    
                <el-input v-model="ruleForm.name" placeholder="请输入用户手机号"></el-input>
    
            </el-form-item>
             </el-col>
           <el-col :span='8'>
                <el-form-item label="固定电话" prop="name">
    
                <el-input v-model="ruleForm.name" placeholder="请输入电话"></el-input>
    
                </el-form-item>
             </el-col>
            <el-col :span='8'>
                <el-form-item label="用户登录密码"  prop="name">
    
                <el-input v-model="ruleForm.name" placeholder="请输入登录密码"></el-input>
    
                </el-form-item>
             </el-col>
             
        </el-row>
        <el-row>
        <el-col :span='8'>
                <el-form-item label="用户邮箱" prop="name">
    
                <el-input v-model="ruleForm.name" placeholder="请输入用户邮箱"></el-input>
    
            </el-form-item>
            </el-col>
            <el-col :span='8'>
            <el-form-item label="活动区域" prop="region">

                <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
    
                    <el-option label="区域一" value="shanghai"></el-option>
    
                    <el-option label="区域二" value="beijing"></el-option>
    
                </el-select>
        
                </el-form-item>
            </el-col>
             <el-col :span='8'>
            <el-form-item label="活动区域" prop="region">

                <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
    
                    <el-option label="区域一" value="shanghai"></el-option>
    
                    <el-option label="区域二" value="beijing"></el-option>
    
                </el-select>
        
                </el-form-item>
            </el-col>
            
        </el-row>
        <el-row>
            
            <el-col :span='8'>
            <el-form-item label="是否锁定用户" prop="region">

                <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
    
                    <el-option label="区域一" value="shanghai"></el-option>
    
                    <el-option label="区域二" value="beijing"></el-option>
    
                </el-select>
        
                </el-form-item>
            </el-col>

            <el-col :span='8'>
            <el-form-item label="查询范围" prop="region">

                <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
    
                    <el-option label="区域一" value="shanghai"></el-option>
    
                    <el-option label="区域二" value="beijing"></el-option>
    
                </el-select>
        
                </el-form-item>
            </el-col>
            <el-col :span='8'>
            <el-form-item label="关联角色" prop="region">

                <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
    
                    <el-option label="区域一" value="shanghai"></el-option>
    
                    <el-option label="区域二" value="beijing"></el-option>
    
                </el-select>
        
                </el-form-item>
            </el-col>
        </el-row>
        <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;重置&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
  </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer" center>
            <el-row :gutter="20">
              <el-col :span="12"><el-button class="clearBtn" @click="dialogVisible = false">取 消</el-button></el-col>
              <el-col :span="12"><el-button class="okBtn" type="primary" @click="dialogVisible = false">确 定</el-button></el-col>
            </el-row>
            </span>
    </el-dialog>
</template>
<style>
.imgBox{
    width:100px;
    height:100px;
    border:1px solid #ddd;
}
.el-form-item__label{
    padding: 0 4px 0 0;
}
</style>
<script>

    export default {
    data() {
        
      return {
        dialogVisible: false,
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
        value1:"",
        value2:"",
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    created:function(){
        this.$root.$on('showWindow',()=>{
            this.dialogVisible=true;
        })
    }
  }
</script>