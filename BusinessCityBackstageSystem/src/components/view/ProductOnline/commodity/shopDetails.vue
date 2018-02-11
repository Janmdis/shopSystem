<template>
    <div v-show='shopDetails' style='height:100%;'>
       <div class='leftBox'>
       <el-form ref="form" :model="form" label-width="80px" class='formBox'>
        <el-form-item label="标题">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-col :span="11">
        <el-form-item label="选择详情" >
            <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="11">
        <el-form-item label="商店分类">
            <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="11">
        <el-form-item label="品牌">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        </el-col>
         <el-col :span="11">
        <el-form-item label="库存">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        </el-col>
         <el-col :span="11">
        <el-form-item label="价格">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        </el-col>
         <el-col :span="11">
        <el-form-item label="销量">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        </el-col>
        <el-form-item label="描述">
            <el-input type="textarea" v-model="form.desc" class='textHeight' ></el-input>
        </el-form-item>
        </el-form>
        
       </div>
       <div class="rightBox">
        <i  class="icon iconfont  arrow-right icon-arrowright"></i>
       1
       </div>
    </div>
</template>
<script>
    import shopDetails from './shopDetails.js';
    export default shopDetails
</script>
<style lang="" scoped>
.formBox{
    padding:20px;
}
.textHeight textarea{
    height:100px;
}
    .leftBox{
        width:49%;
        height:100%;
        float:left;
        border-right:10px solid #ddd;
    }
    .rightBox{
        width:49%;
        height:100%;
         float:left;
    }
</style>