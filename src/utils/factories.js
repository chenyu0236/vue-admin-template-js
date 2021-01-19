/**
 * 获取url参数
 * @param {String} variable 参数名称
 * @return {参数值/false} 
*/
function getQueryVariable(variable) {
    var query = window.location.search.substring(1)
    var vars = query.split('&')
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=')
        if (pair[0] === variable) {
            return pair[1]
        }
    }
    return false
}


const constellations = [
    { "Start": 120, "End": 218, "Name": "水平座" },
    { "Start": 219, "End": 320, "Name": "双鱼座" },
    { "Start": 321, "End": 420, "Name": "白羊座" },
    { "Start": 421, "End": 520, "Name": "金牛座" },
    { "Start": 521, "End": 621, "Name": "双子座" },
    { "Start": 622, "End": 722, "Name": "巨蟹座" },
    { "Start": 723, "End": 822, "Name": "狮子座" },
    { "Start": 823, "End": 922, "Name": "处女座" },
    { "Start": 923, "End": 1022, "Name": "天秤座" },
    { "Start": 1023, "End": 1121, "Name": "天蝎座" },
    { "Start": 1122, "End": 1221, "Name": "射手座" },
    { "Start": 1222, "End": 119, "Name": "摩羯座" }
];

/**
 * 根据日期返回星座
 * @param {Date} date 参数名称
 * @return {星座} 
*/
function getConstellation(date) {
    if (!date) {
        return "";
    }
    let month = new Date(date).getMonth() + 1
    let day = new Date(date).getDate()
    let dateString = "";
    if (Number(day) < 10) {
        dateString = "{0}0{1}".format(month, day);
    }
    else {
        dateString = "{0}{1}".format(month, day);
    }

    for (let i = 0; i < constellations.length; i++) {
        const constellation = constellations[i];

        if (Number(dateString) >= Number(constellation.Start) && Number(dateString) <= Number(constellation.End)) {
            return constellation.Name;
        }
    }
    return "";
}

export default {
    getQueryVariable,
    getConstellation,
}