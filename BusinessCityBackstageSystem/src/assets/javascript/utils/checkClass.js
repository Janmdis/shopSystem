/**
* 校验类
* 校验数据格式
*/
var checkClass = {
  /**
  * 中文验证
  */
  checkChinese: function(value){
    // Unicode编码中的汉字范围
    let reg = /^[\u2E80-\u9FFF]+$/
    if(reg.test(value)){
        return {flag: true}
    }
    return {flag: false, error: "只能输入汉字"}
  },
  /**
  * 数字和字母验证
  */
  checkNumAndLetters: function(value) {
    let reg = /^[0-9a-zA-Z]*$/g
    if(reg.test(value)){
        return {flag: true}
    }
    return {flag: false, error: "只能输入数字和字母"}
  },
  /**
  * 数字验证
  */
  checkNum: function(value) {
    let reg = /^[0-9]*$/g
    if(reg.test(value)){
        return {flag: true}
    }
    return {flag: false, error: "只能输入0-9数字"}
  },
  /**
  * 12位纯数字验证
  */
  checkNums: function(value) {
    let reg = /^\d{12}$/g
    if(reg.test(value)){
        return {flag: true}
    }
    return {flag: false, error: "请输入12位纯数字"}
  },
  /**
  * 手机号码验证
  */
  checkTel: function(value) {
    let reg = /^1[3|4|5|7|8][0-9]{9}$/g
    if (reg.test(value) ) {
        return {flag:true}
    }
    return {flag:false,error:"请输入正确的手机号"}
  },
  /**
  * 固定电话验证
  */
   checkTelNum: function(value){
    let reg = /^\d{3,4}-\d{7,8}(-\d{1,6})?$/g;     
    if (reg.test(value) ) {
        return {flag:true}
    }
    return {flag:false,error:"请输入正确的座机号"}
  },
  /**
  * 非空验证
  * @value
  * @isNum 是否要进行数字验证【true:不进行0验证, false:默认进行所有类型验证】 
  */
  checkEmpty: function(value, isNum){
    if(value == undefined || value == "undefined" || (!isNum && !value)){
        return false
    }
    value+=""
    if(value && value.trim().length > 0){
        return true
    }
    return false
  }

}
export {checkClass};