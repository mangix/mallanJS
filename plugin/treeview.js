/**
 * @author allanma
 * @mail maqh1988@gmail.com
 * treeview.js
 */

//@require dom.selector
//@require dom.element
//@require dom.element.style
//@require events.eventbind
//@require events.customevent
//@require util.loader
//@require lang.array

/**
 * json format:
 * {
 * 	name:'',
 *  children:[
 * 		{
 * 			name:'',
 * 			children:[],
 * 			data:data
 * 		}...
 *  ],
 *  data:{}
 * }
 */

(function($, undefined) {
	var node, treeView;
	node = function(content, data, options) {
		var _options = {
			checkbox : false
		};
		this.options = $.tools.merge(_options, options);

		this.content = content;
		this.children = [];
		this.data = data;
		this.dom = this.toDom();
		this.childrenTree = null;
		this.expanded = true;
	}
	node.prototype = {
		addChild : function(child) {
			$(this.dom).addClass("hasChild open");
			if(this.hasChild()) {
				this.childrenTree.appendChild(child.dom);
			}
			else {
				var ul = document.createElement('ul');
				this.dom.appendChild(ul);
				this.childrenTree = ul;
			}
			child.parent = this;
			this.children.push(child);
			this.childrenTree.appendChild(child.dom);
		},
		removeChild : function(child) {
			var self = this;
			$('array').each(self.children, function(i) {
				if(this === child) {
					self.children.splice(i, 1);
					self.childrenTree.removeChild(child.dom);
					return false;
				}
			});
		},
		hasChild : function() {
			return (this.children.length !== 0);
		},
		toDom : function() {
			var li = document.createElement('li'), html, self = this, checkbox, a;
			if(self.options.checkbox) {
				checkbox = document.createElement('input');
				checkbox.type = 'checkbox';
				li.appendChild(checkbox);
				$(checkbox).bind('click', function() {
					if(self.tree && self.tree.onCheck) {
						if(this.checked) {
							self.tree.onCheck.fire(self);
						}
						else {
							self.tree.onUnCheck.fire(self);
						}
					}
				});
			}
			a = document.createElement('a');
			a.innerHTML = this.content;
			a.href = "javascript:void(0)";
			li.appendChild(a);
			$(a).click(function(e) {
				e.stop();
				if(self.tree && self.tree.onNodeClick) {
					self.tree.onNodeClick.fire(self);
				}
			});
			return li;
		},
		remove : function() {
			if(this.parent) {
				this.parent.removeChild(this);
			}
		},
		expand : function() {
			$(this.childrenTree).show();
			this.expanded = true;
			$(this.dom).removeClass('close').addClass('open');
		},
		unexpand : function() {
			$(this.childrenTree).hide();
			this.expanded = false;
			$(this.dom).removeClass('open').addClass('close');
		},
		toggleExpand:function(){
			if(this.expanded){
				this.unexpand();
			}else{
				this.expand();
			}
		},
		registTree : function(treeView) {
			this.tree = treeView;
		}
	};
	treeView = function(boxId, options) {
		this.box = document.getElementById(boxId);
		var _options = {
			url : '', //url
			type : '', //json,xml
			data : '', //json
			checkbox : false
		};
		this.options = $.tools.merge(_options, options);
		this.init();
		this.onReady = new $.events.customEvent('ready');
		this.onCheck = new $.events.customEvent('check');
		this.onUnCheck = new $.events.customEvent('uncheck');
		this.onNodeClick = new $.events.customEvent('nodeclick');
	};
	treeView.prototype = {
		constructor : treeView,
		mallanType : 'treeview',
		init : function() {
			var self = this, option = self.options, root;
			self.root = root = new node('root', {});
			root.dom = root.childrenTree = self.box;
			if(option.url) {
				//有url,发请求
				$.util.Loader({
					url : option.url,
					callback : function(data) {
						self.createSubTree(self.root, option.data);
					}
				});
			}
			else {
				//use option.data
				self.createSubTree(self.root, option.data);
			}
		},
		createSubTree : function(parent, data) {
			var o, i, l;
			if($.tools.isArray(data)) {
				for( i = 0, l = data.length; i < l; i++) {
					var item = data[i], _node;
					_node = new node(item.name, item.data, this.options);
					_node.registTree(this);
					parent.addChild(_node);
					if(item.children) {
						this.createSubTree(_node, item.children);
					}
				}
			}
			else {
				_node = new node(data.name, data.data, this.options);
				_node.registTree(this);
				parent.addChild(_node);
				if(data.children) {
					this.createSubTree(_node, data.children);
				}
			}
		}
	};

	$.nameSpace.pack('Mallan.plugin.treeView', treeView);
})(Mallan);
