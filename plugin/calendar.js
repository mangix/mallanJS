/**
 * @author allanma
 * @mail maqh1988@gmail.com
 * calendar.js
 */


(function ($, undefined) {
    var Calendar = function (options) {
        var self = this;
        this._options = {
            dateField:null,
            monthArr:["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            weekArr:["日", "一", "二", "三", "四", "五", "六"],
            dateFormat:"yyyy-mm-dd hh:MM:ss",
            maxDate:"2050-12-30",
            minDate:"1970-01-01",
            showMiniBtn:false,
            miniBtnUrl:"",
            onSelect:function (name, date) {
            },
            onShow:function (name, date) {
            },
            onHide:function (name, date) {
            },
            onChange:function (name, date) {
            },
            activeDate:null,
            pos:{},
            activeButton:null
        };

        for (var p in options) {
            this._options[p] = options[p];
        }
        var max = this.strToDate(this._options.maxDate), min = this.strToDate(this._options.minDate);
        if (min.getFullYear == NaN) {
            min = new Date(1940, 1, 1);
        }
        if (max.getFullYear == NaN) {
            max = new Date(2050, 12, 30);
        }
        this._options.maxDate = max;
        this._options.minDate = min;

        //selected date
        var now = new Date();
        this._date = {
            year:now.getFullYear(),
            month:now.getMonth(),
            day:now.getDate(),
            hour:now.getHours(),
            minute:now.getMinutes(),
            second:now.getSeconds()
        };
        this.doms = {};
        this.events = {
            onSelect:new $.CustomEvent("onselect"),
            onShow:new $.CustomEvent("onshow"),
            onHide:new $.CustomEvent("onhide"),
            onChange:new $.CustomEvent("onchange")
        }

        if (!$.Calendar.datePickHasInit) {
            this.init();
        }
        else {
            this.setDoms();
        }
        if (this._options.dateField) {
            this._options.dateField.addEvent("click", function (e) {
                e.stop();
                self.show();
            });
        }
        this.doms.container.addEvent("click", function (e) {
            e.stop();
            self.hidePickers();
        });
        $(document).addEvent("click", function () {
            self.hide();
            self.hidePickers();
        });
        if (this._options.showMiniBtn) {
            var pos = this._options.dateField.position();
            var img = new Image();
            img.src = this._options.miniBtnUrl;
            img.title = "选择日期";
            document.body.appendChild(img);
            img = $(img);
            img.css({
                position:"absolute",
                left:pos.x + this._options.dateField.offsetWidth,
                top:pos.y,
                cursor:"pointer"
            });
            img.addEvent("click", function (e) {
                e.stop();
                self.show();
            });
        }
        if (this._options.activeButton) {
            $(this._options.activeButton).addEvent('click', function (e) {
                e.stop();
                self.show();
            });
        }

        this.events.onSelect.subscribe(this._options.onSelect);
        this.events.onShow.subscribe(this._options.onShow);
        this.events.onHide.subscribe(this._options.onHide);
        this.events.onChange.subscribe(this._options.onChange);
    };

    Calendar.prototype = {
        isInRange:function (y, m, d) {
            var date = +new Date(y, m, d);
            var min = +(this._options.minDate);
            var max = +(this._options.maxDate);
            return (date >= min && date <= max);
        },
        isInActiveDate:function (y, m, d) {
            var m = "0" + (m + 1);
            var d = "0" + d;
            var date = "" + y + "-" + m.substr(m.length - 2) + "-" + d.substr(d.length - 2);
            for (var i = 0, l = this._options.activeDate.length; i < l; i++) {
                if (this._options.activeDate[i] == date) {
                    return true;
                }
            }
            return false;
        },
        createDays:function (year, month) {
            var firstDay = new Date(year, month, 1), lastDay = new Date(year, month + 1, 0), weekOfFirstDay = firstDay.getDay();
            var arr = [];
            for (var i = 0; i < weekOfFirstDay; i++) {
                arr.push("");
            }
            for (var i = 1; i <= lastDay.getDate(); i++) {
                arr.push(i);
            }
            return arr;
        },
        appendCalendar:function (year, month) {
            var ths, days, table, rows, i, l, option, dom, fragment;
            dom = this.doms;
            option = this._options;
            dom.year.html(year + "年");
            dom.month.html(option.monthArr[month]);
            days = this.createDays(year, month);
            fragment = document.createDocumentFragment();
            table = document.createElement('table');
            fragment.appendChild(table);

            var cuurentRow, self = this;
            currentRow = table.insertRow(table.rows.length);
            for (i = 0; i < 7; i++) {
                var th = document.createElement('th');
                th.innerHTML = option.weekArr[i];
                currentRow.appendChild(th);
            }
            for (i = 0, l = days.length; i < l; i++) {
                if (i % 7 == 0) {
                    currentRow = table.insertRow(table.rows.length);
                }
                var td = currentRow.insertCell(currentRow.cells.length);
                if (days[i] === "") {
                    td.innerHTML = "";
                }
                else {
                    var a = $(document.createElement('a'));
                    a.href = "javascript:void(0);";
                    a.innerHTML = days[i];
                    td.appendChild(a);
                    if (this.isInRange(this._date.year, this._date.month, days[i]) && (option.activeDate ? this.isInActiveDate(this._date.year, this._date.month, days[i]) : true )) {
                        a.addEvent("click", function (e) {
                            e.stop();
                            self.selectDate(self._date.year, self._date.month + 1, parseInt(this.html()), self._date.hour, self._date.minute, self._date.second);
                        });
                    }
                    else {
                        a.addClass("jui_datepicker_disable");
                    }
                    if (days[i] == (this._date.day)) {
                        a.addClass("jui_datepicker_selected");
                    }
                }
            }
            //补齐最后一行
            for (i = currentRow.cells.length; i < 7; i++) {
                currentRow.insertCell(i);
            }

            dom.dateContainer.innerHTML = "";
            dom.dateContainer.appendChild(table);
        },
        setDoms:function () {
            this.doms.container = $(".jui_datepicker_container")[0];
            this.doms.controler = $(".jui_datepicker_controler")[0];
            this.doms.dateContainer = $(".jui_datepicker_datecontainer")[0];
            this.doms.preBtn = $(".jui_datepicker_pre")[0];
            this.doms.nextBtn = $(".jui_datepicker_next")[0];
            this.doms.year = $(".jui_datepicker_year")[0];
            this.doms.month = $(".jui_datepicker_month")[0];
            this.doms.hour = $(".jui_datepicker_hour")[0];
            this.doms.minute = $(".jui_datepicker_mnt")[0];
            this.doms.second = $(".jui_datepicker_scd")[0];
            this.doms.close = $(".jui_datepicker_close")[0];
            this.doms.yearPicker = $(".jui_datepicker_ympicker")[0];
            this.doms.monthPicker = $(".jui_datepicker_ympicker")[1];
            this.doms.hourPicker = $(".jui_datepicker_ympicker")[2];
            this.doms.minutePicker = $(".jui_datepicker_ympicker")[3];
            this.doms.secondPicker = $(".jui_datepicker_ympicker")[4];
        },
        init:function () {
            //页面中加载日历html代码
            var fragment = document.createDocumentFragment();

            //日历最外层容器
            var container = document.createElement("div");
            container.className = "jui_datepicker_container jui_datepicker_radius";
            fragment.appendChild(container);
            container = $(container);
            container.css({
                position:"absolute",
                display:"none"
            });

            //顶部控制条
            var controler = document.createElement("div");
            controler.className = "jui_datepicker_controler jui_datepicker_radius c_b";
            container.appendChild(controler);
            controler.innerHTML = "<a href='javascript:;' class='jui_datepicker_pre'><</a><a href='javascript:;' class='jui_datepicker_year'></a><a href='javascript:;' class='jui_datepicker_month'></a><a href='javascript:;' class='jui_datepicker_hour' title='小时'>0时</a><a href='javascript:;' class='jui_datepicker_mnt' title='分钟'>0分</a><a href='javascript:;' class='jui_datepicker_scd' title='秒'>0秒</a><a href='javascript:;' class='jui_datepicker_next'>></a><a href='javascript:;' class='jui_datepicker_close'>X</a>";
            controler = $(controler);

            //日历table
            var tableDiv = document.createElement('div');
            tableDiv.className = "jui_datepicker_datecontainer";
            container.appendChild(tableDiv);

            //year选择列表
            var yearPicker = document.createElement("div");
            yearPicker.className = "jui_datepicker_ympicker";
            fragment.appendChild(yearPicker);

            //月份选择列表
            var monthPicker = document.createElement("div");
            monthPicker.className = "jui_datepicker_ympicker";
            fragment.appendChild(monthPicker);

            //小时选择列表
            var hourPicker = document.createElement("div");
            hourPicker.className = "jui_datepicker_ympicker";
            fragment.appendChild(hourPicker);

            //分钟选择列表
            var minutePicker = document.createElement("div");
            minutePicker.className = "jui_datepicker_ympicker";
            fragment.appendChild(minutePicker);

            //秒钟选择列表
            var secondPicker = document.createElement("div");
            secondPicker.className = "jui_datepicker_ympicker";
            fragment.appendChild(secondPicker);

            document.body.appendChild(fragment);
            this.setDoms();
            $.Calendar.datePickHasInit = true;
        },
        set_date:function (year, month, day, hour, minute, second) {
            //month 0-11
            var date = this._date;
            date.year = parseInt(year);
            date.month = parseInt(month);
            date.day = parseInt(day);
            hour && (date.hour = parseInt(hour));
            minute && (date.minute = parseInt(minute));
            second && (date.second = parseInt(second));
        },
        hide:function () {
            this.doms.container.css("display", "none");
            this.hidePickers();
            this.events.onHide.fire();
        },
        show:function () {
            var dom = this.doms, option = this._options;
            dom.preBtn.removeEvent("click");
            dom.nextBtn.removeEvent("click");
            dom.year.removeEvent("click");
            dom.month.removeEvent("click");
            dom.hour.removeEvent("click");
            dom.minute.removeEvent("click");
            dom.second.removeEvent("click");
            dom.close.removeEvent("click");

            var df = this._options.dateFormat;
            if (df.indexOf('ss') == -1) {
                dom.second.style.display = "none";
            }
            else {
                dom.second.style.display = "";
            }
            if (df.indexOf('MM') == -1) {
                dom.minute.style.display = "none";
            }
            else {
                dom.minute.style.display = "";
            }
            if (df.indexOf('hh') == -1) {
                dom.hour.style.display = "none";
            }
            else {
                dom.hour.style.display = "";
            }

            var field = option.dateField, self = this;
            if (field) {
                pos = field.position();
                dom.container.css({
                    left:pos.x,
                    top:pos.y + field.offsetHeight,
                    display:"block",
                    "z-index":1000
                });
            }
            else {
                dom.container.css({
                    left:option.pos.x,
                    top:option.pos.y,
                    display:"block",
                    "z-index":1000
                });
            }

            this.appendCalendar(this._date.year, this._date.month);
            dom.hour.html(self._date.hour + "时");
            dom.minute.html(self._date.minute + "分");
            dom.second.html(self._date.second + "秒");
            dom.preBtn.addEvent("click", function (e) {
                e.stop();
                self.prevMonth();
            }, this, false);
            dom.nextBtn.addEvent("click", function (e) {
                e.stop();
                self.nextMonth();
            }, this, false);
            dom.year.addEvent("click", function (e) {
                e.stop();
                self.showYearPicker();
            });
            dom.month.addEvent("click", function (e) {
                e.stop();
                self.showMonthPicker();
            });
            dom.hour.addEvent("click", function (e) {
                e.stop();
                self.showHourPicker();
            });
            dom.minute.addEvent("click", function (e) {
                e.stop();
                self.showMinutePicker();
            });
            dom.second.addEvent("click", function (e) {
                e.stop();
                self.showSecondPicker();
            });
            dom.close.addEvent("click", function (e) {
                e.stop();
                self.hide();
            });
            this.events.onShow.fire();
        },
        selectDate:function (y, m, d, h, mnt, s) {
            var target = this._options.dateField;
            var date = this.formatDate(y, m, d, h, mnt, s);
            if (target) {
                target.value = date;
            }
            this.events.onSelect.fire(date);
            this.set_date(y, m - 1, d, h, mnt, s);
            this.hide();
        },
        nextMonth:function () {
            var month = this._date.month, year = this._date.year;
            month = month == 11 ? 0 : (month + 1);
            year = month == 0 ? (year + 1) : year;
            if (this.isInRange(year, month, 1)) {
                this.doms.year.html(year);
                this.doms.month.html(this._options.monthArr[month]);
                this.set_date(year, month, this._date.day, this._date.hour, this._date.minute, this._second);
                this.appendCalendar(year, month);
            }
        },
        prevMonth:function () {
            var month = this._date.month, year = this._date.year;
            month = month == 0 ? 11 : (month - 1);
            year = month == 11 ? (year - 1) : year;
            if (this.isInRange(year, month, (new Date(year, month + 1, 0)).getDate())) {
                this.doms.year.html(year);
                this.doms.month.html(this._options.monthArr[month]);
                this.set_date(year, month, this._date.day, this._date.hour, this._date.minute, this._second);
                this.appendCalendar(year, month);
            }
        },
        strToDate:function (dateStr) {
            var d = dateStr.split(/-|\//);
            var a = parseInt(d[0]), b = parseInt(d[1], 10) - 1, c = parseInt(d[2], 10);
            return new Date(a, b, c);
        },
        //接口函数，在constructor之后设置option的值，赞不支持showMiniBtn，minBtnUrl
        set:function (name, value) {
            this._options[name] = value;
            if (name == "minDate" || name == "maxDate") {
                this._options[name] = this.strToDate(value);
            }
            else if (name.indexOf("on") == 0) {
                this.events[name].subscribe(value);
            }
        },
        formatDate:function (y, m, d, h, mnt, s) {
            var res, formatStr = this._options.dateFormat;
            m = ("0" + m);
            d = ("0" + d);
            h = ("0" + h);
            mnt = ("0" + mnt);
            s = ("0" + s);
            res = formatStr.replace("yyyy", y);
            res = res.replace("mm", m.substr(m.length - 2));
            res = res.replace("dd", d.substr(d.length - 2));
            res = res.replace("hh", h.substr(h.length - 2));
            res = res.replace("MM", mnt.substr(mnt.length - 2));
            res = res.replace("ss", s.substr(s.length - 2));
            return res;
        },
        showYearPicker:function () {
            this.hidePickers();
            var self = this, maxYear = this._options.maxDate.getFullYear(), minYear = this._options.minDate.getFullYear(), yearPicker = this.doms.yearPicker;
            yearPicker.html("");
            for (var i = minYear; i <= maxYear; i++) {
                var a = document.createElement("a");
                a = $(a);
                a.html(i);
                yearPicker.appendChild(a);
                a.addEvent("click", function (e) {
                    e.stop();
                    var y = parseInt(this.html());
                    self.doms.year.html(y);
                    self.set_date(y, self._date.month, self._date.day, self._date.hour, self._date.minute, self._date.second);
                    yearPicker.css("display", "none");
                    self.appendCalendar(y, self._date.month);
                });
            }
            var pos = this.doms.year.position();
            yearPicker.css({
                "position":"absolute",
                "display":"block",
                "left":pos.x,
                "top":pos.y + 18,
                "z-index":(parseInt(this.doms.container.css("z-index")) + 1)
            });
        },
        showMonthPicker:function () {
            this.hidePickers();
            var self = this, year = parseInt(self.doms.year.html()), monthPicker = this.doms.monthPicker;
            self.doms.monthPicker.html("");
            for (var i = 0; i <= 11; i++) {
                if (self.isInRange(year, i, 1)) {
                    var a = document.createElement("a");
                    a = $(a);
                    a.html(self._options.monthArr[i]);
                    monthPicker.appendChild(a);
                    a.addEvent("click", (function (i) {
                        return function (e) {
                            e.stop();
                            var m = parseInt(this.html());
                            self.doms.month.html(this.html());
                            self.set_date(self._date.year, i, self._date.day, self._date.hour, self._date.minute, self._date.second);
                            monthPicker.css("display", "none");
                            self.appendCalendar(self._date.year, i);
                        }
                    })(i));
                }
            }
            var pos = this.doms.month.position();
            monthPicker.css({
                position:"absolute",
                display:"block",
                left:pos.x,
                top:pos.y + 18,
                "z-index":parseInt(this.doms.container.css("z-index")) + 1
            });
        },
        showHourPicker:function () {
            this.hidePickers();
            var self = this, year = parseInt(self.doms.year.html()), hourPicker = this.doms.hourPicker;
            self.doms.hourPicker.html("");
            for (var i = 0; i <= 23; i++) {
                var a = document.createElement("a");
                a = $(a);
                a.html(i);
                hourPicker.appendChild(a);
                a.addEvent("click", (function (i) {
                    return function (e) {
                        e.stop();
                        var m = parseInt(this.html());
                        self.doms.hour.html(this.html() + "时");
                        self.set_date(self._date.year, self._date.month, self._date.day, m, self._date.minute, self._date.second);
                        hourPicker.css("display", "none");
                    }
                })(i));
            }
            var pos = this.doms.hour.position();
            hourPicker.css({
                position:"absolute",
                display:"block",
                left:pos.x,
                top:pos.y + 18,
                "z-index":parseInt(this.doms.container.css("z-index")) + 1
            });
        },
        showMinutePicker:function () {
            this.hidePickers();
            var self = this, year = parseInt(self.doms.year.html()), minutePicker = this.doms.minutePicker;
            self.doms.minutePicker.html("");
            for (var i = 0; i <= 59; i++) {
                var a = document.createElement("a");
                a = $(a);
                a.html(i);
                minutePicker.appendChild(a);
                a.addEvent("click", (function (i) {
                    return function (e) {
                        e.stop();
                        var m = parseInt(this.html());
                        self.set_date(self._date.year, self._date.month, self._date.day, self._date.hour, m, self._date.second);
                        self.doms.minute.html(this.html() + "分");
                        minutePicker.css("display", "none");
                    }
                })(i));
            }
            var pos = this.doms.minute.position();
            minutePicker.css({
                position:"absolute",
                display:"block",
                left:pos.x,
                top:pos.y + 18,
                "z-index":parseInt(this.doms.container.css("z-index")) + 1
            });
        },
        showSecondPicker:function () {
            this.hidePickers();
            var self = this, year = parseInt(self.doms.year.html()), secondPicker = this.doms.secondPicker;
            self.doms.secondPicker.html("");
            for (var i = 0; i <= 59; i++) {
                var a = document.createElement("a");
                a = $(a);
                a.html(i);
                secondPicker.appendChild(a);
                a.addEvent("click", (function (i) {
                    return function (e) {
                        e.stop();
                        var m = parseInt(this.html());
                        self.set_date(self._date.year, self._date.month, self._date.day, self._date.hour, self._date.minute, m);
                        self.doms.second.html(this.html() + "秒");
                        secondPicker.css("display", "none");
                    }
                })(i));
            }
            var pos = this.doms.second.position();
            secondPicker.css({
                position:"absolute",
                display:"block",
                left:pos.x,
                top:pos.y + 18,
                "z-index":parseInt(this.doms.container.css("z-index")) + 1
            });
        },
        getDate:function () {
            return this._options.dateField.value;
        },
        hidePickers:function () {
            var dom = this.doms;
            dom.yearPicker.css("display", "none");
            dom.monthPicker.css("display", "none");
            dom.hourPicker.css("display", "none");
            dom.minutePicker.css("display", "none");
            dom.secondPicker.css("display", "none");
        }
    };

    $.nameSpace.pack("Mallan.plugin.calandar", Calendar);

})(Mallan);
