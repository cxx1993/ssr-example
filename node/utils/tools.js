/**
 * 工具类
 * @author：chenxin
 */
const _static = require("../../utils/static.js");
// const moment = require("moment");

module.exports = {
  /**
   * 处理分页要用的skip
   * --limit不能大于100
   * --返回值skip大于等于0
   */
  dealSkip(page = 0, limit) {
    limit = limit || _static.list.limit;
    if (isNaN(limit) || isNaN(page)) {
      return -1;
    }
    limit = limit > 100 ? 100 : limit;
    let skip = limit * page;
    return skip >= 0 ? skip : 0;
  },
  /**
   * 返回时间区间（日期格式）
   * sdate YYYY-MM-DD 00:00:00
   * edate+1 YYYY-MM-DD 23:59:59
   */
  dealDate(sdate, edate) {
    // output = "YYYY-MM-DD hh:mm:ss"
    try {
      if (sdate && edate) {
        sdate = new Date(sdate);
        sdate.setHours(0);
        sdate.setMinutes(0);
        sdate.setSeconds(0);
        edate = new Date(edate);
        edate.setHours(23);
        edate.setMinutes(59);
        edate.setSeconds(59);
      } else {
        throw "";
      }
      return [sdate, edate];
    } catch (e) {
      return -1;
    }
  }
};
