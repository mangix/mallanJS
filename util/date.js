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
            parse : function (param) {
                //return a date object
                //@param param:String or number or array
                //example : parse('2011-02-23') or parse(2011,2,23) or parse([2011,2,23])
                //month 1-12
                var args;
                if (typeof param === "string") {
                    args = param.split(/-|\/|\s|:/);
                } else if ($.tools.isArray(param)) {
                    args = param;
                }
                else {
                    args = [].slice.call(arguments, 0);
                }
                if (args[1]) {
                    args[1]--;
                }
                return eval("(new Date(" + args.join(',') + "))");
            },
            format : function (formatStr, date) {
                //format the Date object to the formatStr
                //@param formatStr:String
                //@date date:Date
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
            },
            tomorrow : function (date) {
                //if date ,return the next day of date ,else return tomorrow;
                //@param [date]:Date or null
                var tmr = date ? new Date(+date) : new Date();
                tmr = tmr.setDate(tmr.getDate() + 1);
                return new Date(tmr);
            },
            yesterday : function (date) {
                //if date ,return the previous day of date ,else return yesterday;
                //@param [date]:Date or null
                var ystd = date ? new Date(+date) : new Date();
                ystd = ystd.setDate(ystd.getDate() - 1);
                return new Date(ystd);
            },
            firstDay : function (year, month) {
                //return the first day of that month
                //@param [year]:Number
                //@param [month]:Number 1-12
                if (year && month) {
                    return new Date(year, month - 1, 0);
                }
                else {
                    return new Date(new Date().getFullYear(), new Date().getMonth(), 1);
                }

            },
            lastDay : function (year, month) {
                //return the last day of that month
                //@param year:Number
                //@param month:Number 1-12
                if (year && month) {
                    return new Date(year, month, 0);
                }
                else {
                    return new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
                }

            }
        };
    });


    $.nameSpace.pack("Mallan.urtil.date", date);
    $.extendCustom({
        name : "date",
        cls : date,
        constructType : "single"
    });

})(Mallan);
