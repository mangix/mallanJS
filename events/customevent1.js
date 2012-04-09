(function ($, undefined) {
    var slice = Array.prototype.slice;

    var CustomEvent = function () {
        /*
         * events format like
         * {
         *   event1:{
         *      callbacks:[fn1,fn2]
         *   },
         *   event2:{}..
         * }
         */
        this.events = {};

    };

    CustomEvent.prototype.createWhenNone = function (eventName) {
        return (this.events[eventName] || (this.events[eventName] = {callbacks : []}));
    };


    CustomEvent.prototype.on = function (eventName, callback) {
        //@param eventName:String name of event
        //@param callback:Function the callback function
        if (!callback) {
            return;
        }
        this.events[eventName] || (this.events[eventName] = {callbacks : []});
        this.events[eventName].callbacks.push(callback);
    };
    CustomEvent.prototype.bind = CustomEvent.prototype.on;

    CustomEvent.prototype.when = function () {
        var callback = arguments[arguments.length - 1];
        if (!callback) {
            return;
        }

    };

    CustomEvent.prototype.any = function () {
        var callback = arguments[arguments.length - 1],
            events,
            ev;
        if (typeof callback !== "function") {
            return;
        }
        events = slice.call(arguments, 0, -1);
        while (ev = events.shift()) {
            this.createWhenNone(ev).callbacks.push(callback);
        }
        return this;
    };


    CustomEvent.prototype.emit = function () {
        var event = arguments[0],
            data = slice.call(arguments, 1),
            callback,
            i = 0;
        if (this.events[event] && this.events[event].callbacks) {
            while (callback = callbacks[i++]) {
                callback.apply(data);
            }
        }
        return this;
    };
    CustomEvent.prototype.fire = CustomEvent.prototype.trigger = CustomEvent.prototype.emit;


})(Mallan);