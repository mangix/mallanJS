/**
 * @author allanma
 * @mail maqh1988@gmail.com
 * calendar.js
 */

//@require util.date
//@require events.customevent
//@require dom.element
//@require dom.element.create
(function ($, undefined) {
    var dater = $.util.date.getInstance(), element = $.dom.element;
    var container, controler, tableDiv, yearPicker, monthPicker, hourPicker, minutePicker, secondPicker, calendarInited, yearBtn, monthBtn, hourBtn, minuteBtn, secondeBtn;

    var Calendar = function (options) {
        this._options = {
            dateField:null,
            monthArr:["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            weekArr:["日", "一", "二", "三", "四", "五", "六"],
            dateFormat:"yyyy-MM-dd hh:mm:ss",
            maxDate:"2050-12-30",
            minDate:"1970-01-01",
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
        $.tools.merge(this._options, options);
        this._options.maxDate = dater.parse(this._options.maxDate);
        this._options.minDate = dater.parse(this._options.minDate);

        //selected date
        var now = new Date(), self = this;
        this._date = {
            year:now.getFullYear(),
            month:now.getMonth(),
            day:now.getDate(),
            hour:now.getHours(),
            minute:now.getMinutes(),
            second:now.getSeconds()
        };
        this.events = {
            onSelect:new $.events.customEvent("onselect"),
            onShow:new $.events.customEvent("onshow"),
            onHide:new $.events.customEvent("onhide"),
            onChange:new $.events.customEvent("onchange")
        }

        if (!calendarInited) {
            this.init();
        }
        //bind events
        $(this._options.dateField).bind("click", function (e) {
            e.stop();
            self.show();
        });
        $(this._options.activeButton).bind('click', function (e) {
            e.stop();
            self.show();
        });

        this.events.onSelect.on(this._options.onSelect);
        this.events.onShow.on(this._options.onShow);
        this.events.onHide.on(this._options.onHide);
        this.events.onChange.on(this._options.onChange);
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
                        a.addClass("calendar_disable");
                    }
                    if (days[i] == (this._date.day)) {
                        a.addClass("calendar_selected");
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
        init:function () {
            //页面中加载日历html代码
            //日历最外层容器
            container = element.create('<div class="calender_container" style="position:absolute;display:none;"></div>');

            //顶部控制条
            controler = element.create('<div class="calendar_controler"><a href="javascript:void(0);" class="calendar_pre"><</a><a href="javascript:void(0));" class="calendar_year"></a><a href="javascript:void(0));" class="calendar_month"></a><a href="javascript:void(0));" class="calendar_hour" title="小时">0时</a><a href="javascript:void(0);" class="calendar_mnt" title="分钟">0分</a><a href="javascript:void(0);" class="calendar_scd" title="秒">0秒</a><a href="javascript:void(0);" class="calendar_next">></a><a href="javascript:void(0);" class="calendar_close">X</a></div>');
            container.append(controler);

            //日历table
            tableDiv = element.create('<div class="calendar_datecontainer"></div>');
            container.append(tableDiv);

            //year选择列表
            yearPicker = element.create('<div class="calendar_ympicker"></div>');
            container.append(yearPicker);

            //月份选择列表
            monthPicker = element.create('<div class="calendar_ympicker"></div>');
            container.append(monthPicker);

            //小时选择列表
            hourPicker = element.create('<div class="calendar_ympicker"></div>');
            container.append(hourPicker);

            //分钟选择列表
            minutePicker = element.create('<div class="calendar_ympicker"></div>');
            container.append(minutePicker);

            //秒钟选择列表
            secondPicker = element.create('<div class="calendar_ympicker"></div>');
            container.append(minutePicker);

            document.body.appendChild(container[0]);

            //bind events
            container.bind('click', function () {
                yearPicker.hide();
                monthPicker.hide();
                hourPicker.hide();
                minutePicker.hide();
                secondPicker.hide();
            });

            $(document).bind('click', function () {
                container.hide();
            });

            controler.query('.calendar_pre').bind("click", function (e) {
                e.stop();
                self.prevMonth();
            }, this, false);
            controler.query('.calendar_next').bind("click", function (e) {
                e.stop();
                Calendar.controler.nextMonth();
            }, this, false);
            yearBtn = controler.query('.calendar_year');
            yearBtn.bind("click", function (e) {
                e.stop();
                Calendar.controler.showYearPicker();
            });
            monthBtn = controler.query('.calendar_month');
            monthBtn.bind("click", function (e) {
                e.stop();
                Calendar.controler.showMonthPicker();
            });
            hourBtn = controler.query('.calendar_hour');
            hourBtn.bind("click", function (e) {
                e.stop();
                Calendar.controler.showHourPicker();
            });
            minuteBtn = controler.query('.calendar_minute');
            minuteBtn.bind("click", function (e) {
                e.stop();
                Calendar.controler.showMinutePicker();
            });
            secondeBtn = controler.query('.calendar_second');
            secondeBtn.bind("click", function (e) {
                e.stop();
                Calendar.controler.showSecondPicker();
            });
            controler.query('.calendar_close').bind("click", function (e) {
                e.stop();
                container.hide();
            });

            calendarInited = true;
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
        show:function () {
            Calendar.controler = this;
            var option = this._options;

            var df = this._options.dateFormat;
            (df.indexOf('ss') == -1) ? secondeBtn.hide() : secondeBtn.show();
            (df.indexOf('mm') == -1) ? minuteBtn.hide() : minuteBtn.show();
            (df.indexOf('hh') == -1) ? hourBtn.hide() : hourBtn.show();

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
