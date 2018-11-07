/**
 * 字段校验
 * @author:chenxin
 */

module.exports = {
  //用户名正则，4到16位（字母，数字，下划线，减号）
  isUsername(username) {
    var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
    return uPattern.test(username);
  },
  //密码强度正则
  //最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
  isPasswordStrong(password) {
    var pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
    return pPattern.test(password);
  },
  // 密码正则
  // 6-18位数字字母组成
  isPasswordWeak(password) {
    var pPattern = /^[0-9A-Za-z]{6,18}$/;
    return pPattern.test(password);
  },
  //手机号正则
  isMobile(mobile) {
    var mPattern = /^[1][0-9]{10}$/;
    return mPattern.test(mobile);
  },
  // 微信号正则，6至20位，以字母开头，字母，数字，减号，下划线
  isWx(wx) {
    var wxPattern = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;
    return wxPattern.test(wx);
  },
  // Email正则
  isEmail(email) {
    var ePattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return ePattern.test(email);
  },
  // 包含中文正则
  isIncludeZH(str) {
    var cnPattern = /[\u4E00-\u9FA5]/;
    return cnPattern.test(str);
  }
};
