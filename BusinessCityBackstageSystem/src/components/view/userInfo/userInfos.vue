<template>
    <el-main >
        <el-row :gutter="20">
            <el-col :span="6">
                <Statis :typedata="1"></Statis>
            </el-col>
            <el-col :span="6">
                <Statis :typedata="2"></Statis>
            </el-col>
            <el-col :span="6">
                <Statis :typedata="3"></Statis>
            </el-col>
            <el-col :span="6">
                <StatisPayment></StatisPayment>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="16">
                <Graph></Graph>
            </el-col>
            <el-col :span="8">
                <Pie :objdata='objclient' ></Pie>
                <Pie :objdata='objorder'></Pie>
            </el-col>
        </el-row>
    </el-main>
</template>

<script>
    
</script>

<style scoped lang='less'>
.el-main{
width: 83.33333%;
left: 16.66667%;
height: 100%;
margin-bottom: -70px;
background-color: #f0f3f6;
position: absolute;
top: 70px;
}
@media only screen and (min-width: 992px) {
.el-main{
width: 83.33333%;
left: 16.66667%;
}
}
@media only screen and (min-width: 1200px) {
.el-main{
width: 87.5%;
left: 12.5%;
} 
}
</style>

