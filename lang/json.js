/**
 * @author allanma
 * @mail maqh1988@gmail.com
 * json.js
 */

(function ($, undefined) {
    var JSON = (function () {
        if (window.JSON) {
            return  window.JSON;
        }
        //对于不支持JSON的浏览器
        var stringify, parse, json;
        stringify = function (obj) {
            var type = Object.prototype.toString.call(obj).slice(8, -1) , rs, i, l, o;
            //如果是html节点(不完全判断,可伪造)
            if (obj.nodeType != null) {
                return "HTMLDOMELEMENT"
            }
            switch (type) {
                case "Undefined" :
                case "Null" :
                case "Number" :
                case "Boolean" :
                case "Date" :
                case "Function" :
                case "Error" :
                case "RegExp" :
                    rs = obj;
                    break;
                case "String" :
                    rs = '"' + obj + '"';
                    break;
                case "Array" :
                    rs = [];
                    for (i = 0, l = obj.length; i < l; i++) {
                        rs.push(stringify(obj[i]));
                    }
                    rs = "[" + rs.join(',') + "]";
                    break;
                case "Object" :
                    rs = [];
                    for (o in obj) {
                        rs.push('"' + o + '":' + stringify(obj[o]));
                    }
                    rs = "{" + rs.join(",") + "}";
                    break;
            }
            return rs;
        };

        parse = function (str) {
            return (new Function("return" + str))();
        };
        json = {
            "stringify":stringify,
            "parse":parse
        };
        return json;
    });
    $.nameSpace.pack('Mallan.lang.json', JSON);
})(Mallan);