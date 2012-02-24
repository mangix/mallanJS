/**
 * @author allanma
 * @mail maqh1988@gmail.com
 * date.js
 */

(function ($, undefined) {
    var fix, date;
    fix = function (number, length) {
        number = "000000000000000000000" + number;
        return number.substr(number.length - length);
    };

    date = $.single(function () {
        return {
            parse:function (param) {
                var args;
                if(typeof param ==="string"){
                    args = param.split(/-|\/|\s|:/).join(',');
                }else{
                    args = [].join.call(arguments,',');
                }
                return eval("(new Date(" + args + "))");
            },
            format:function (formatStr, date) {
                //format the Date object to the formatStr
                var year , month, day, hour, minute, second;
                year = date.getFullYear();
                month = date.getMonth() + 1;
                day = date.getDate();
                hour = date.getHours();
                minute = date.getMinutes();
                second = date.getSeconds();
                return formatStr.replace(/(yyyy)|(M+)|(d+)|(h+)|(m+)|(s+)/g, function (str, y, m, d, h, mnt, s) {
                    if (y) {
                        return fix(year, y.length);
                    }
                    if (m) {
                        return fix(month, m.length);
                    }
                    if (d) {
                        return fix(day, d.length);
                    }
                    if (h) {
                        return fix(hour, h.length);
                    }
                    if (mnt) {
                        return fix(minute, mnt.length);
                    }
                    if (s) {
                        return fix(second, s.length);
                    }
                });
            }
        };
    });


    $.nameSpace.pack("Mallan.urtil.date", date);
    $.extendCustom({
        name:"date",
        cls:date,
        constructType:"single"
    });

})(Mallan);
