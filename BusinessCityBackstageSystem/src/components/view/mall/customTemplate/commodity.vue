<template>
   <!-- 商品组件开始 -->
    <div class="borderHover" :index='dataid' >
        <el-row>
        <el-col :span="bigImg">
          <div class="imgConet">
               <!-- 图片-->
               <img src="./../../../../assets/templateImg.jpg" class="img">
             </div>
        </el-col>
        <el-col :span="smallImg">
          <div class="imgConet">
               <!-- 图片-->
               <img src="./../../../../assets/templateImg.jpg" class="img">
             </div>
        </el-col>
        <el-col :span="bigsImg">
          <div class="imgConet">
               <!-- 图片-->
               <img src="./../../../../assets/templateImg.jpg" class="img">
             </div>
        </el-col>
        </el-row>
        <div class="hoverClick">
            <span data-toggle="modal" data-target="#delModal" @click='deletedep' v-show="deleteshow">删除</span>
            <span>添加新内容</span>
        </div>
    </div>
    <!-- 商品组件结束 -->
</template>
<script>
    export default{
      props:['templatedata'],
        data() {
            return{
                dataid:'',
                deleteshow:true,
                bigImg:24,
                smallImg:24,
                bigsImg:24
            }
        },
        created:function(){
          this.dataid=this.templatedata;
          this.$root.$on('probtnid',(id)=>{
            //alert(id)
            if(id == 1){
              this.bigImg = 24;
              this.smallImg = 24;
              this.bigsImg = 24;
            }
            else if(id == 2){
              this.bigImg = 12;
              this.smallImg = 12;
              this.bigsImg = 12;
            }
            else if(id == 3){
              this.bigImg = 24;
              this.smallImg = 12;
              this.bigsImg = 12;
            }
         });
        },
        methods:{
          delete(){
            this.$root.$emit('test',this.dataid);
                return{
                    type:'success',
                    message:'删除成功!'
                };
          },
          deletedep(){
            this.$confirm('确认删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                let msg=this.delete();
                this.$message(msg);
            }).catch(()=>{
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
            
        },
        //点击设置边框
        borders(){
          var box = document.querySelector("#test");
          console.log(box)
        }
        // maodian(){
        //   let jump = document.querySelectorAll('.template-buttom-div')
        //   // 获取需要滚动的距离(y轴)
        //   let total = jump.offsetTop
        //   console.log(total)
        //   // Chrome
        //   document.body.scrollTop = total
        //   // Firefox
        //   document.documentElement.scrollTop = total
        //   // Safari
        //   window.pageYOffset = total
        //   // 平滑滚动，时长500ms，每10ms一跳，共50跳
        //   // 获取当前滚动条与窗体顶部的距离
        //   let distance = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        //   // 计算每一小段的距离
        //   let step = total / 50
        //    setTimeout(smoothDown(), 10)
        // //  底部 class  .template-buttom-div
        // },
        // smoothDown(){
        //   if (distance < total) {
        //   distance += step
        //   　　// 移动一小段
        //   document.body.scrollTop = distance
        //   document.documentElement.scrollTop = distance
        //   window.pageYOffset = distance
        //   　　// 设定每一次跳动的时间间隔为10ms
        //   setTimeout(smoothDown, 10)
        //   } else {
        //   　　// 限制滚动停止时的距离
        //   document.body.scrollTop = total
        //   document.documentElement.scrollTop = total
        //   window.pageYOffset = total
        //   }
        // }
      //   maodian(y, duration){
      //     alert(y)
      //     alert(duration)
      //     /*y:目标纵坐标,duration:时间(毫秒)*/
      // 　　var scrollTop = document.body.scrollTop;/*页面当前滚动距离*/
      //    // Chrome
      //     scrollTop = document.documentElement.scrollTop
      //    // Firefox
      //     scrollTop =  window.pageYOffset 
      //    // Safari
      //     var distance = y - scrollTop;/*结果大于0,说明目标在下方,小于0,说明目标在上方*/
      //     var scrollCount = duration / 10;/*10毫秒滚动一次,计算滚动次数*/
      //     var everyDistance = distance / scrollCount/*滚动距离除以滚动次数计算每次滚动距离*/
      //     for (var index = 1; index <= scrollCount; index++) /*循环设置scrollBy事件,在duration之内,完成滚动效果*/
      //   　　setTimeout(function () { window.scrollBy(0, everyDistance) }, 10 * index);
      //   }
        }
    }
</script>
<style scoped lang="less">
@import "../../../../assets/less/color";
//选中的模块/鼠标停留的时候 边框样式
.current-style {
    border: 1px dashed red!important;
}
.borderHover{
  padding:5px 5px;
  margin-bottom: 3px;
  position: relative;
}
.borderHover:hover{
    border: 1px dashed red!important;
}
 .hoverClick{
    position: absolute;
    bottom: 2px;
    right: 0;
    font-size: 12px;
    display: none;
}
.hoverClick span {
  color:#fff;
  background: rgb(250, 133, 133);
  display: inline-block;
  padding: 4px 10px;
  cursor: pointer;
}
.hoverClick span:hover {
  background: red;
}
.borderHover:hover .hoverClick{
  display: block;
}
 .el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.imgConet{
  margin:5px 30px;
}
.img{
  width: 100%;
  height: 100%;
}
</style>
