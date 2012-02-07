/**
 * @author allanma
 * @mail maqh1988@gmail.com
 * interface.js
 */
//@require Mallan
(function($, undefined){
    //Class Interface
    //<param>name String</param>
    //<param>methos Array </param>
    var Interface = function(name, methods){
        this.name = name;
        this.methods = methods || [];
        this.mallantype = "interface";
    };
    
    var ensure = function(obj, aInterface){
        //check whether the obj implemenet the interface
        //<param>obj Object</param>
        //<param>aInterface Interface</param>
        var i, l, method, methods = aInterface.methods;
        for (i = 0, l = methods.length; i < l; i++) {
            method = methods[i];
            if (!obj[method] && !obj.prototype[method]) {
                return {
                    "ok": false,
                    "method": method
                };
            }
        }
        return {
            "ok": true
        };
    }
    
    Interface.implement = function(obj, someInterfaces){
        //the implement function 
        //<param>obj Object</param>
        //<param>someInterfaces Array or Interface</param>
        var i, l, aInterface, j, len, result;
        if ($.isArray(someInterfaces)) {
            for (i = 0, l = someInterfaces.length; i < l; i++) {
                aInterface = someInterfaces[i];
                result = ensure(obj, aInterface);
                if (!result.ok) {
                    throw "interface:" + aInterface.name + " needs implement method:" + result.method;
                }
            }
        }
        else if (someInterfaces.mallantype === "interface") {
            result = ensure(obj, someInterfaces);
            if (!result.ok) {
                throw "interface:" + someInterfaces.name + " needs implement method:" + result.method;
            }
        }
        else {
            throw "the second param must be an interface or an interface array";
        }
    };
    $.nameSpace.pack("Mallan.lang.interface", Interface);
})(Mallan);
