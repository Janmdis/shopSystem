<template>
    <el-dialog title="客户资料新增" :visible.sync="dialogVisible" width="60%">
        
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row>
            <el-col :span='8'>
                <el-form-item label="客户名称" prop="customer">
    
                <el-input v-model="ruleForm.customer"></el-input>
    
            </el-form-item>
            </el-col>
            <el-col :span='8'>
                <el-form-item label="客户状态" prop="status">
        
                    <el-select v-model="ruleForm.status" placeholder="请选择活动区域">
        
                        <el-option label="区域一" value="shanghai"></el-option>
        
                        <el-option label="区域二" value="beijing"></el-option>
        
                    </el-select>
        
                </el-form-item>
            </el-col>
            <el-col :span='8'>
                <el-form-item label="联系方式" prop="mode">
    
                <el-input v-model="ruleForm.mode"></el-input>
    
            </el-form-item>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span='8'>
                <el-form-item label="客户类型" prop="type">
        
                    <el-select v-model="ruleForm.type" placeholder="请选择活动区域">
        
                        <el-option label="区域一" value="shanghai"></el-option>
        
                        <el-option label="区域二" value="beijing"></el-option>
        
                    </el-select>
        
                </el-form-item>
            </el-col>
            <el-col :span='8'>
                <el-form-item label="客户等级" prop="grade">
    
                <el-input v-model="ruleForm.name"></el-input>
    
            </el-form-item>
             </el-col>
             <el-col :span='8'>
            <el-form-item label="是否签约" >
    
               <el-radio-group v-model="ruleForm.resource">
                <el-radio label="1">签约</el-radio>
                <el-radio label="2">未签约</el-radio>
                </el-radio-group>
            </el-form-item>
            </el-col>
        </el-row>
        <div class='lineBline'></div>
                    <br>
        <el-row>
            <el-col :span='8'>
                <el-form-item label="省" >
        
                    <el-select v-model="ruleForm.province" placeholder="请选择活动区域">
        
                        <el-option label="区域一" value="shanghai"></el-option>
        
                        <el-option label="区域二" value="beijing"></el-option>
        
                    </el-select>
        
                </el-form-item>
            </el-col>
            <el-col :span='8'>
                <el-form-item label="市">
        
                    <el-select v-model="ruleForm.city" placeholder="请选择活动区域">
        
                        <el-option label="区域一" value="shanghai"></el-option>
        
                        <el-option label="区域二" value="beijing"></el-option>
        
                    </el-select>
        
                </el-form-item>
            </el-form-item>
             </el-col>
             <el-col :span='8'>
            <el-form-item label="县" >

                <el-select v-model="ruleForm.county" placeholder="请选择活动区域">
    
                    <el-option label="区域一" value="shanghai"></el-option>
    
                    <el-option label="区域二" value="beijing"></el-option>
    
                </el-select>
        
                </el-form-item>
            </el-col>
        </el-row>
        
        <div class='lineBline'></div>
        <br>
        <el-row>
            <el-col :span='8'>
                <el-form-item label="客户负责人" >
    
                <el-input ></el-input>
    
            </el-form-item>
            </el-col>
            <el-col :span='8'>
                <el-form-item label="联系方式" >
    
                <el-input ></el-input>
    
            </el-form-item>
            </el-col>
            <el-col :span='8'>
            <el-form-item label="业务员" >

                <el-select  placeholder="请选择活动区域" v-model="ruleForm.county">
    
                    <el-option label="区域一" value="shanghai"></el-option>
    
                    <el-option label="区域二" value="beijing"></el-option>
    
                </el-select>
        
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span='16'>
                <el-form-item label="备注" >
    
                <el-input></el-input>
    
            </el-form-item>
            </el-col>

            <el-col :span='8'>
            <el-form-item label="来源" >

                <el-select  placeholder="请选择活动区域" v-model="ruleForm.county">
    
                    <el-option label="区域一" value="shanghai"></el-option>
    
                    <el-option label="区域二" value="beijing"></el-option>
    
                </el-select>
        
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span='8'>
                <el-form-item label="图片" >
    
                <el-input ></el-input>
    
            </el-form-item>
            </el-col>

            <el-col :span='8'>
                <el-col :span='8' style="text-align: center;"><button>上传图片</button></el-col>
                <el-col :span='8'><div class="imgBox"></div></el-col>
            </el-col>
        </el-row>
        <el-form-item>
        <el-row :gutter="20">
            <el-col :span="12"><el-button class="clearBtn" type="primary" @click="submitForm('ruleForm')">立即创建</el-button></el-col>
            <el-col :span="12"><el-button class="okBtn"  @click="resetForm('ruleForm')">重置</el-button></el-col>
        </el-row>
  </el-form-item>
        </el-form>


    </el-dialog>
</template>
<style>
.imgBox{
    width:100px;
    height:100px;
    border:1px solid #ddd;
}
.lineBline{
    border-bottom:1px solid #ddd;
}
</style>
<script>

    export default {
    data() {
      return {
        dialogVisible: false,
        ruleForm: {
          resource: '1',
          customer: '',
          status: '',
          mode: '',
          name:"",
          city:'',
          county:'',
          grade:'',
          type:'',
          province:'',
          city:'',
          county:''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          grade:[
              { required: true, message: '请输入客户名称', trigger: 'blur' },
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          type:[
               { required: true, message: '请输入客户名称', trigger: 'blur' },
               { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          mode:[
               { required: true, message: '请输入客户名称', trigger: 'blur' },
               { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          customer:[
               { required: true, message: '请输入客户名称', trigger: 'blur' },
               { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          status:[
               { required: true, message: '请输入客户状态', trigger: 'chnage' },
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