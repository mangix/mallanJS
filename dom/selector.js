/**
 * @author allanma
 * @mail maqh1988@gmail.com
 * selector.js
 */
//@require Mallan.js
(function($, undefined) {
	var support = {
		querySelector : !!document.querySelectorAll,
		classSelector : !!document.getElementsByClassName
	}, //support
	trim = /^\s+|\s+$/g, //trim a string
	repeated = /([#.>:])\1+/g, // repeated operator
	tags = /[#.> :\[\]]/g, //chars of all tags
	relationTag = /[>+ ]/g, //chars used as relation tag
	restrictTag = /[\[\]:.#]/, //chars used as restrict tag
	selectTag = /[#.]/, //chars used as select tag
	subSelectStr = /^([#.]?)(\w+)(:[\w\(\)\-]+|\[\w+=\w+\]|.\w+|#\w+)?$/, inputs = {
		"button" : 1,
		"checkbox" : 1,
		"file" : 1,
		"hidden" : 1,
		"image" : 1,
		"password" : 1,
		"radio" : 1,
		"reset" : 1,
		"submit" : 1,
		"text" : 1
	}, //type of input
	nodelistToArray = function(list, fn) {
		var arr = [], node, i, l;
		if(fn) {
			for( i = 0, l = list.length; i < l; i++) {
				node = list[i];
				if(node.nodeType == 1 && fn.call(this, node)) {
					arr.push(node);
				}
			}
		}
		else {
			for( i = 0, l = list.length; i < l; i++) {
				node = list[i];
				if(node.nodeType == 1) {
					arr.push(node);
				}
			}
		}
		return arr;
	}, nthChild = function(dom, n) {
		//n >= 1
		var i = 0, count = 0, children = dom.childNodes, child;
		while( child = children[i++]) {
			if(child.nodeType == 1 && ++count == n) {
				return child;
			}
		}
		return null;

	}, lastChild = function() {
		var children = dom.childNodes, child, i = children.length;
		while( child = children[i--]) {
			if(child.nodeType == 1) {
				return child;
			}
		}
		return null;

	}, pseudo = function(dom, pseudoExp) {
		if( pseudoExp in inputs) {
			return dom.nodeName === "INPUT" && dom.type === pseudoExp;
		}
		else if(pseudoExp.indexOf('nth-child') == 0) {
			var nth = parseInt(pseudoExp.substring(pseudoExp.indexOf('(') + 1, pseudoExp.indexOf(')'))), parent = dom.parentNode;
			if(nth && parent) {
				return dom == nthChild(parent, nth);
			}
			return false;
		}
		else {
			switch (pseudoExp) {
				case "first-child":
					return pseudo(dom, 'nth-child(1)');
				case "last-child":
					return dom == lastChild();
				//                case "odd":
				//                    return isOdd(dom);
				//                case "even":
				//                    return !isOdd(dom);
				case "checked":
					return dom.checked === true;
				case "disabled":
					return dom.disabled === true;
			}
			return true;
		}

	}, restrictCheck = function(dom, restrict, restrictStr) {
		if(!restrict) {
			return true;
		}
		switch (restrict) {
			case ':':
				return pseudo(dom, restrictStr);
				break;
			case '[':
				var arr = restrictStr.split('='), key = arr[0], value = arr[1];
				return (dom[key] == value || dom.getAttribute(key) == value);
				break;
			case '.':
				return (" " + dom.className + " ").indexOf(restrictStr);
				break;
			case '#':
				return dom.id === restrictStr;
				break;
		}
		return true;

	}, subSelect = function(context, relation, selector) {
		var match, restrict, restrictStr, result = [], children = [], item, i;
		match = subSelectStr.exec(selector);
		if(match[3]) {
			//has restrictor
			restrict = match[3].charAt(0);
			switch (restrict) {
				case ':':
					restrictStr = match[3].substring(1);
					break;
				case '[':
					restrictStr = match[3].substring(1, match[3].length - 1);
					break;
				case '.':
					restrictStr = match[3].substring(1);
					break;
				case '#':
					restrictStr = match[3].substring(1);
					break;
			}
		}
		if(match[1]) {
			//id or class selector
			switch (match[1]) {
				case '.':
					if(relation === ' ') {
						if(support.classSelector) {
							i = 0;
							while( item = context[i++]) {
								result = result.concat(nodelistToArray(item.getElementsByClassName(match[2]), function(el) {
									return restrictCheck(el, restrict, restrictStr);
								}));
							}
						}
						else {
							i = 0;
							while( item = context[i++]) {
								result = result.concat(nodelistToArray(item.getElementsByTagName("*"), function(el) {
									return ((" " + el.className + " ").indexOf(match[2]) != -1) && restrictCheck(el, restrict, restrictStr);
								}));
							}
						}
					}
					else if(relation === '>') {
						i = 0;
						while( item = context[i++]) {
							children = children.concat(item.childNodes);
						}
						i = 0;
						while( item = children[i++]) {
							if(item.nodeType == 1 && (" " + item.className + " ").indexOf(match[2]) != -1 && restrictCheck(item, restrict, restrictStr)) {
								result.push(item);
							}
						}
					}
					break;
				case '#':
					var d = document.getElementById(match[2]);
					if(restrictCheck(d, restrict, restrictStr)) {
						result.push(d);
					}
					break;
			}
		}
		else {
			//tag selector
			if(relation === ' ') {
				i = 0;
				while( item = context[i++]) {
					result = result.concat(nodelistToArray(item.getElementsByTagName(match[2]), function(el) {
						return restrictCheck(el, restrict, restrictStr);
					}));
				}
			}
			else if(relation === '>') {
				i = 0;
				while( item = context[i++]) {
					children = children.concat(item.childNodes);
				}
				i = 0;
				while( item = children[i++]) {
					if(item.nodeType == 1 && item.nodeName === match[2].toUpperCase() && restrictCheck(item, restrict, restrictStr)) {
						result.push(item);
					}
				}
			}
		}

		if(restrictStr === "first") {
			return [result[0]];
		}
		if(restrictStr === "last") {
			var l = result.length;
			if(result[l - 1]) {
				return [result[l - 1]];
			}
			return [];
		}
		else if(restrictStr === "odd" || restrictStr === "even") {
			var item, i = 0, oddArr = [], evenArr = [];
			while( item = result[i++]) {
				if(i % 2 == 1) {
					oddArr.push(item);
				}
				else {
					evenArr.push(item);
				}
			}
			if(restrictStr === "odd") {
				return oddArr;
			}
			else {
				return evenArr;
			}
		}
		return result;

	}, calc = function(selectStr, context) {
		var result, resultTag, begin = 1;
		selectStr = ' ' + selectStr.replace(trim, '').replace(repeated, function(a) {
			return a.substr(0, 1);
		}) + ' ';
		while(( result = relationTag.exec(selectStr)) != null) {
			resultTag = result[0];
			result = relationTag.exec(selectStr);
			if(!result) {
				return context;
			}
			var str = selectStr.substring(begin, relationTag.lastIndex - 1);
			begin = relationTag.lastIndex;
			relationTag.lastIndex--;
			if(str) {
				context = subSelect(context, resultTag, str);
			}
		}
		return context;

	}, selector = function(selectStr, context) {
		context = [context || document];
		if(support.querySelector) {
			try {
				return nodelistToArray(context[0].querySelectorAll(selectStr));
			} catch (e) {
				return calc(selectStr, context);
			}
		}
		return calc(selectStr, context);
	};
	$.nameSpace.pack("Mallan.dom.selector", selector);
	$.extend({
		'select' : selector
	});

})(Mallan);
