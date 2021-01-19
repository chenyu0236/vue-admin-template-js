import Vue from 'vue'
import Parameter from './parameters'

/**
 * 参数状态翻译滤镜 支持将参数Id或Id字符串逗号分隔格式的，转换成参数文本 
*/
Vue.filter('translateParameter', function (value, code) {
  if (value === '' || value === null) {
    return "";
  }
  const args = code.split('.');
  var dict = Parameter[args[0]][args[1]];
  if (!dict) {
    return "";
  }
  for (let i = 0; i < dict.Items.length; i++) {
    const item = dict.Items[i];
    if (item.Value == value) {
      return item.Label;
    }
  }
  return "";
});


/**
 * 年-月-日 显示时间
 */
Vue.filter('csdate', function (value, code) {
  if (!value) {
    return ''
  }
  return Moment(value).format('YYYY-MM-DD')
});

/**
* 年-月-日 时:分 显示时间
*/
Vue.filter('csdate', function (value, code) {
  if (!value) {
    return ''
  }
  return Moment(value).format('YYYY-MM-DD HH:mm')
});

/**
* 时:分 显示时间
*/
Vue.filter('sorttime', function (value, code) {
  if (!value) {
    return ''
  }
  return Moment(value).format('HH:mm')
});

/**
* 年龄
*/
Vue.filter('csage', function (value, code) {
  if (!value) {
    return ''
  }
  let nowDate = Moment();
  let birthday = Moment(value);
  let dayDiff = nowDate.diff(birthday, 'day');//计算相差的分钟数

  // 小于一年 按照月来算
  if (dayDiff < 360) {
    if (getLanguage().indexOf("en") > -1) {
      return "{0} months".format(parseInt(dayDiff / 30))
    }
    else {
      return "{0} 个月".format(parseInt(dayDiff / 30))
    }
  }
  else {
    if (getLanguage().indexOf("en") > -1) {
      return "{0}".format(parseInt(dayDiff / 360))
    }
    else {
      return "{0} 岁".format(parseInt(dayDiff / 360))
    }
  }
});

/**
* 自定义时间格式
*/
Vue.filter('csmoment', function (value, code) {
  if (value == null || value == "") {
    return ""
  }
  if (format && format == 'fromnow') {
    return Moment(value).fromNow();
  } else {
    return Moment(value).format(format ? format : "LL");
  }
});

/**
* 会话时间
*/
Vue.filter('conversationtime', function (value, code) {
  if (!value) {
    return '';
  }
  var date = Moment(value);

  /*
   * 凌晨:3:00--6:00
   * 早晨:6:00---8:00
   * 上午:8:00--12:00
   * 中午:12:00--13:00
   * 下午:13:00--17:00
   * 晚上:17:00--23:00
   * 深夜:23:00--3:00
   */
  var dateHourText = "";
  var dateHour = date.hour();
  if (dateHour >= 3 && dateHour < 6) {
    dateHourText = "凌晨";
  }
  else if (dateHour >= 6 && dateHour < 8) {
    dateHourText = "早晨";
  }
  else if (dateHour >= 8 && dateHour < 12) {
    dateHourText = "上午";
  }
  else if (dateHour >= 12 && dateHour < 13) {
    dateHourText = "中午";
  }
  else if (dateHour >= 13 && dateHour < 17) {
    dateHourText = "下午";
  }
  else if (dateHour >= 17 && dateHour < 23) {
    dateHourText = "晚上";
  }
  else if (dateHour >= 23 || dateHour < 3) {
    dateHourText = "深夜";
  }

  var nowDate = Moment(Moment().format("YYYY-MM-DD"));
  var lastDate = Moment(Moment().add(-1, 'days').format("YYYY-MM-DD"));
  var nowYear = nowDate.year();
  var dateYear = date.year();
  // 传入时间大于今天零点时间 表示是今天
  if (date >= nowDate) {
    return "{0} {1}".format(dateHourText, date.format("HH:mm"))
  }
  // 传入时间大于昨天零点 小于今天零点 表示是昨天
  else if (date >= lastDate && date < lastDate) {
    return "昨天 {0} {1}".format(dateHourText, date.format("HH:mm"))
  }
  // 传入时间等于今年
  else if (nowYear == dateYear) {
    return "{0} {1}{2}".format(date.format("M月D日"), dateHourText, date.format("HH:mm"));
  }
  else {
    return "{0} {1}{2}".format(date.format("YYYY年M月D日"), dateHourText, date.format("HH:mm"));
  }
});