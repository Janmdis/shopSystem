<template>
    <el-dialog title="客户资料新增" :visible.sync="dialogVisible" width="60%">
        
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row>
            <el-col :span='8'>
                <el-form-item label="活动名称" prop="name">
    
                <el-input v-model="ruleForm.name"></el-input>
    
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
                <el-form-item label="活动名称" prop="name">
    
                <el-input v-model="ruleForm.name"></el-input>
    
            </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span='8'>
                <el-form-item label="活动区域" prop="region">
        
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
        
                        <el-option label="区域一" value="shanghai"></el-option>
        
                        <el-option label="区域二" value="beijing"></el-option>
        
                    </el-select>
        
                </el-form-item>
            </el-col>
            <el-col :span='8'>
                <el-form-item label="活动名称" prop="name">
    
                <el-input v-model="ruleForm.name"></el-input>
    
            </el-form-item>
             </el-col>
             <el-col :span='8'>
            <el-form-item label="是否签约" prop="resource">
    
                <el-radio-group v-model="ruleForm.resource">
    
                    <el-radio label="签约"></el-radio>
    
                    <el-radio label="未签约"></el-radio>
    
                </el-radio-group>
    
            </el-form-item>
            </el-col>
        </el-row>
                    <hr>
                    <br>
        <el-row>
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
            <el-form-item label="活动区域" prop="region">

                <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
    
                    <el-option label="区域一" value="shanghai"></el-option>
    
                    <el-option label="区域二" value="beijing"></el-option>
    
                </el-select>
        
                </el-form-item>
            </el-col>
             <el-col :span='8'>
                <el-form-item label="活动名称" prop="name">
    
                <el-input v-model="ruleForm.name"></el-input>
    
            </el-form-item>
            </el-col>
            <el-col :span='8'>
                <el-form-item label="活动名称" prop="name">
    
                <el-input v-model="ruleForm.name"></el-input>
    
            </el-form-item>
            </el-col>
        </el-row>
        <hr>
        <br>
        <el-row>
            <el-col :span='8'>
                <el-form-item label="活动名称" prop="name">
    
                <el-input v-model="ruleForm.name"></el-input>
    
            </el-form-item>
            </el-col>
            <el-col :span='8'>
                <el-form-item label="活动名称" prop="name">
    
                <el-input v-model="ruleForm.name"></el-input>
    
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
            <el-col :span='16'>
                <el-form-item label="活动名称" prop="name">
    
                <el-input v-model="ruleForm.name"></el-input>
    
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
                <el-form-item label="活动名称" prop="name">
    
                <el-input v-model="ruleForm.name"></el-input>
    
            </el-form-item>
            </el-col>

            <el-col :span='8'>
                <el-col :span='8' style="text-align: center;"><button>上传图片</button></el-col>
                <el-col :span='8'><div class="imgBox"></div></el-col>
            </el-col>
        </el-row>
        <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
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
</style>
<script>

    export default {
    data() {
      return {
        dialogVisible: false,
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