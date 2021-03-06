/*!
 * xview-ui v1.6.1
 * (c) 2019-2020 LiLiang
 * Released under the MIT License.
 */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Vue = _interopDefault(require('vue'));

var iconTypes = {
  info: 'information-circled',
  success: 'checkmark-circled',
  warning: 'android-alert',
  error: 'close-circled',
  loading: 'load-c',
  confirm: 'help-circled'
};

var isFunc = function (f) { return typeof f === 'function'; };

var isStr = function (s) { return typeof s === 'string'; };

var isNum = function (n) { return typeof n === 'number'; };

var isBool = function (b) { return typeof b === 'boolean'; };

var isArr = function (arr) { return arr instanceof Array; };

var isUrl = function (s) { return isStr(s) && /^(https?:\/\/(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+\.)+[a-zA-Z]+)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/.test(s); };

var getType = function (obj) { return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase(); };

var _maxZIndex = 0;
var getMaxZIndex = function () {
  if (_maxZIndex) { return _maxZIndex += 2 }
  _maxZIndex = 1000;
  Array.from(document.querySelectorAll('body>*')).forEach(function (el) {
    var ref = window.getComputedStyle(el, null);
    var zIndex = ref.zIndex;
    if (!isNaN(zIndex)) { _maxZIndex = Math.max(_maxZIndex, zIndex); }
  });
  return _maxZIndex
};

var isFoundByOptions = function (vm, query) {
  return isStr(query) ? vm.$options.name === query : Object.keys(query).every(function (_) { return vm.$options[_] === query[_]; })
};

var findChildrens = function (vm, query) {
  var rtnArr = [], nochecked = vm.$children.slice();
  while (nochecked.length) {
    var item = nochecked.shift();
    isFoundByOptions(item, query) ? rtnArr.push(item) : item.$children.forEach(function (_) { return nochecked.push(_); });
  }
  return rtnArr
};

var findParent = function (vm, query) {
  var par = vm.$parent;
  while (par) {
    if (isFoundByOptions(par, query)) { return par }
    par = par.$parent;
  }
};

var winScrollbarLock = {
  getScrollbarWidth: function getScrollbarWidth() {
    var p = document.createElement('p');
    var styles = { width: '100px', height: '100px', overflowY: 'scroll' };
    for (var key in styles) { p.style[key] = styles[key]; }
    document.body.appendChild(p);
    var scrollbarWidth = p.offsetWidth - p.clientWidth;
    p.remove();
    return scrollbarWidth
  },
  lock: function lock() {
    this.locked = true;
    var winHeight = window.innerHeight;
    var ref = document.body;
    var scrollHeight = ref.scrollHeight;
    if (winHeight > scrollHeight) { return }
    document.body.style.paddingRight = (this.getScrollbarWidth()) + "px";
    document.body.style.overflow = 'hidden';
  },
  unlock: function unlock() {
    this.locked = false;
    document.body.style.paddingRight = document.body.style.overflow = '';
  }
};

var throttle = function (fn, gapTime) {
  if ( gapTime === void 0 ) gapTime = 16;

  var tid, lastTime;
  return function () {
    clearTimeout(tid);
    var nowTime = Date.now();
    if (!lastTime || nowTime - lastTime > gapTime) {
      fn();
      lastTime = nowTime;
    } else {
      tid = setTimeout(fn, nowTime - lastTime);
    }
  }
};

var addStylesheet = function (id, styleStr) {
  var styleEl = document.getElementById(id);
  if (styleEl) { return }
  styleEl = document.createElement('style');
  styleEl.id = id;
  styleEl.innerHTML = styleStr;
  document.head.appendChild(styleEl);
};

var parseSize = function (size) { return isNaN(size) ? size : ((+size) + "px"); };

var XRender = {
  functional: true,
  render: function (h, ctx) { return ctx.props.render(h, ctx.props); }
};

/**
 * 设置文本域自动高度
 * @param {HTMLTextAreaElement} textarea
 * @param {Number} minRows
 * @param {Number} maxRows
 */
var setAutoHeight = function (textarea, minRows, maxRows) {
  var style = window.getComputedStyle(textarea, null);
  var borderWidth = parseInt(style.borderTopWidth) + parseInt(style.borderBottomWidth);
  var padding = parseInt(style.paddingTop) + parseInt(style.paddingBottom);
  var lineHeight = parseInt(style.lineHeight);
  var matches = textarea.value.match(/\n/gm);
  var lbCount = matches ? matches.length : 0;
  var compare = borderWidth + padding + lineHeight * lbCount < textarea.scrollHeight;
  if (isNum(minRows) && (!compare && lbCount <= minRows)) { return }
  if (isNum(maxRows) && lbCount >= maxRows) { return }
  textarea.style.height = 'auto';
  textarea.style.height = (textarea.scrollHeight + borderWidth) + "px";
};

/**
 * 格式化日期
 * @param {Date|String} date 
 * @param {String} format 
 */
var dateFormat = function (date, format) {
  if ( format === void 0 ) format = 'yyyy-MM-dd hh:mm:ss';

  if (typeof date === 'string') {
    var mts = date.match(/(\/Date\((\d+)\)\/)/);
    if (mts && mts.length >= 3) { date = parseInt(mts[2]); }
  }
  date = new Date(date);
  if (!date || date.toUTCString() === 'Invalid Date') { return '' }
  var map = {
    M: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
    q: Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  };
  format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
    var v = map[t];
    if (v !== undefined) {
      if (all.length > 1) {
        v = '0' + v;
        v = v.substr(v.length - 2);
      }
      return v
    } else if (t === 'y') {
      return (date.getFullYear() + '').substr(4 - all.length)
    }
    return all
  });
  return format
};

/**
 * 获取元素在页面中的偏移位置
 * @param {HTMLElement} el
 */
function getOffset(el) {
  var offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: el.offsetWidth,
    height: el.offsetHeight
  };
  while (el) {
    offset.top += el.offsetTop;
    offset.left += el.offsetLeft;
    el = el.offsetParent;
  }
  offset.right = offset.left + offset.width;
  offset.bottom = offset.top + offset.height;
  return offset
}

/**
 * 事件目标是否在元素外部
 * @param {Event} e
 * @param {HTMLElement} el
 */
var isOutside = function (e, el) {
  return e.target !== el && Array.from(el.querySelectorAll('*')).indexOf(e.target) < 0
};

var tools = /*#__PURE__*/Object.freeze({
  __proto__: null,
  iconTypes: iconTypes,
  isFunc: isFunc,
  isStr: isStr,
  isNum: isNum,
  isBool: isBool,
  isArr: isArr,
  isUrl: isUrl,
  getType: getType,
  getMaxZIndex: getMaxZIndex,
  findChildrens: findChildrens,
  findParent: findParent,
  winScrollbarLock: winScrollbarLock,
  throttle: throttle,
  addStylesheet: addStylesheet,
  parseSize: parseSize,
  XRender: XRender,
  setAutoHeight: setAutoHeight,
  dateFormat: dateFormat,
  getOffset: getOffset,
  isOutside: isOutside
});

//
//
//

var script = {
  name: 'XIcon',
  props: {
    type: String,
    color: String,
    custom: String,
    size: [Number, String]
  },
  computed: {
    styles: function styles() {
      return { color: this.color, fontSize: this.size && ((parseInt(this.size)) + "px") }
    },
    classes: function classes() {
      return ['x-icon', this.custom || ("ion-" + (this.type))]
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
var __vue_script__ = script;
/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "i",
    _vm._g({ class: _vm.classes, style: _vm.styles }, _vm.$listeners)
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

var link = {
  props: {
    to: [String, Object],
    replace: Boolean,
    target: String,
    append: Boolean
  },
  methods: {
    getLinkProps: function getLinkProps() {
      var ref = this;
      var to = ref.to;
      var target = ref.target;
      var replace = ref.replace;
      var append = ref.append;
      return to ? isUrl(to) || target ? { is: 'a', target: target, href: to } : { is: 'RouterLink', to: to, replace: replace, append: append } : null
    }
  }
};

//
var script$1 = {
  mixins: [link],
  name: 'XButton',
  components: { XIcon: __vue_component__ },
  props: {
    type: {
      default: 'default',
      validator: function validator(v) {
        return ['default', 'primary', 'dashed', 'text', 'info', 'success', 'warning', 'error'].indexOf(v) !== -1
      }
    },
    ghost: Boolean,
    size: {
      validator: function validator(v) {
        return ['large', 'default', 'small'].indexOf(v) !== -1
      }
    },
    shape: {
      validator: function validator(v) {
        return v === 'circle'
      }
    },
    long: Boolean,
    htmlType: {
      default: 'button',
      validator: function validator(v) {
        return ['button', 'submit', 'reset'].indexOf(v) !== -1
      }
    },
    disabled: Boolean,
    loading: Boolean,
    icon: String,
    customIcon: String
  },
  data: function data() {
    return { prefix: 'x-btn', iconOnly: false, parent: null }
  },
  computed: {
    classes: function classes() {
      var ref = this;
      var prefix = ref.prefix;
      var type = ref.type;
      var size = ref.size;
      var shape = ref.shape;
      var long = ref.long;
      var ghost = ref.ghost;
      var loading = ref.loading;
      var disabled = ref.disabled;
      var iconOnly = ref.iconOnly;
      if (this.parent) {
        size = size || this.parent.size;
        shape = shape || this.parent.shape;
      }
      return [
        prefix,
        (prefix + "_" + type),
        size && (prefix + "_size_" + size),
        shape && (prefix + "_" + shape),
        { long: long, ghost: ghost, loading: loading, disabled: disabled, iconOnly: iconOnly }
      ]
    },
    btnProps: function btnProps() {
      return this.getLinkProps() || { is: 'button', disabled: this.disabled, type: this.htmlType }
    },
    listeners: function listeners() {
      var that = this;
      return Object.assign({}, this.$listeners,
        {click: function click(e) {
          !that.disabled && that.$emit('click', e);
        }})
    }
  },
  mounted: function mounted() {
    this.iconOnly = !this.$slots.default;
    this.parent = findParent(this, 'XButtonGroup');
  }
};

/* script */
var __vue_script__$1 = script$1;
/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    _vm._g(
      _vm._b({ class: _vm.classes }, "div", _vm.btnProps, false),
      _vm.listeners
    ),
    [
      _vm.loading
        ? _c("x-icon", {
            class: _vm.prefix + "_iconLoop",
            attrs: { type: "load-c" }
          })
        : _vm.icon
        ? _c("x-icon", { attrs: { type: _vm.icon, custom: _vm.customIcon } })
        : _vm._e(),
      _vm._v(" "),
      !_vm.iconOnly ? _c("span", [_vm._t("default")], 2) : _vm._e()
    ],
    1
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  var __vue_inject_styles__$1 = undefined;
  /* scoped */
  var __vue_scope_id__$1 = undefined;
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1 = normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//

var script$2 = {
  name: 'XButtonGroup',
  props: {
    size: {
      default: 'default',
      validator: function validator(v) {
        return ['large', 'default', 'small'].indexOf(v) !== -1
      }
    },
    shape: {
      validator: function validator(v) {
        return v === 'circle'
      }
    },
    vertical: Boolean
  },
  data: function data() {
    return { prefix: 'x-btn-group' }
  }
};

/* script */
var __vue_script__$2 = script$2;
/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      class: [
        _vm.prefix,
        _vm.prefix + "_" + _vm.size,
        { vertical: _vm.vertical }
      ]
    },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  var __vue_inject_styles__$2 = undefined;
  /* scoped */
  var __vue_scope_id__$2 = undefined;
  /* module identifier */
  var __vue_module_identifier__$2 = undefined;
  /* functional template */
  var __vue_is_functional_template__$2 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$2 = normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//

var script$3 = {
  name: 'XBadge',
  props: {
    count: [Number, String],
    overflowCount: {
      type: [Number, String],
      default: 99
    },
    dot: Boolean,
    type: {
      default: 'error',
      validator: function validator(v) {
        return ['success', 'primary', 'normal', 'error', 'warning', 'info'].indexOf(v) !== -1
      }
    },
    showZero: Boolean,
    status: {
      validator: function validator(v) {
        return ['success', 'processing', 'default', 'error', 'warning'].indexOf(v) !== -1
      }
    },
    text: String,
    offset: Array
  },
  data: function data() {
    return { prefix: 'x-badge', hasContent: false }
  },
  computed: {
    classes: function classes() {
      var ref = this;
      var dot = ref.dot;
      var type = ref.type;
      var prefix = ref.prefix;
      var hasContent = ref.hasContent;
      return [(prefix + "_sup"), (prefix + "_sup_" + type), { dot: dot, hasContent: hasContent }]
    },
    showedText: function showedText() {
      return this.text || (+this.count > +this.overflowCount ? ((this.overflowCount) + "+") : +this.count)
    },
    showSup: function showSup() {
      return !this.status && (this.dot ? +this.count !== 0 : this.showZero || this.showedText)
    },
    styles: function styles() {
      var ref = this.offset || [];
      var x = ref[0];
      var y = ref[1];
      return { right: x && ((-x) + "px"), top: y && (y + "px") }
    }
  },
  mounted: function mounted() {
    this.hasContent = this.$slots.default !== undefined;
  }
};

/* script */
var __vue_script__$3 = script$3;
/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "span",
    { class: _vm.prefix },
    [
      _vm._t("default"),
      _vm._v(" "),
      _vm.status
        ? _c("span", { class: _vm.prefix + "_status" }, [
            _c("span", { class: _vm.prefix + "_status_" + _vm.status }),
            _vm._v("\n    " + _vm._s(_vm.text) + "\n  ")
          ])
        : _vm.showSup
        ? _c("sup", { class: _vm.classes, style: _vm.styles }, [
            _vm._v(_vm._s(_vm.showedText))
          ])
        : _vm._e()
    ],
    2
  )
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  var __vue_inject_styles__$3 = undefined;
  /* scoped */
  var __vue_scope_id__$3 = undefined;
  /* module identifier */
  var __vue_module_identifier__$3 = undefined;
  /* functional template */
  var __vue_is_functional_template__$3 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$3 = normalizeComponent(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    undefined,
    undefined,
    undefined
  );

/**
 * 事件监听管理器
 * 主要用于窗口事件智能化管理
 */
var ListenManager = function ListenManager(object, eventName) {
  this.handlers = [];
  this.object = object;
  this.eventName = eventName;
  this.eventHandler = this.eventHandler.bind(this);
  this.addListener();
};

/**
 * 添加监听器
 */
ListenManager.prototype.addListener = function addListener () {
  this.object.addEventListener(this.eventName, this.eventHandler);
};

/**
 * 移除监听器
 */
ListenManager.prototype.removeListener = function removeListener () {
  this.object.removeEventListener(this.eventName, this.eventHandler);
};

/**
 * 添加处理函数
 * @param {HTMLElement} el 
 * @param {Function} fn 
 */
ListenManager.prototype.addHandler = function addHandler (el, fn) {
  this.handlers.push({ el: el, fn: fn });
};

/**
 * 移除处理函数
 * @param {HTMLElement} el 
 */
ListenManager.prototype.removeHandler = function removeHandler (el) {
  this.handlers.splice(this.handlers.findIndex(function (_) { return _.el === el; }), 1);
};

/**
 * 事件处理器
 * @param {Event} e 
 */
ListenManager.prototype.eventHandler = function eventHandler (e) {
  this.handlers.forEach(function (_) { return _.fn(e); });
};

/**
 * 获取处理函数数量
 */
ListenManager.prototype.getHandlerCount = function getHandlerCount () {
  return this.handlers.length
};

/**
 * 创建事件指令
 * @param {Window | HTMLElement} object
 * @param {String} eventName
 * @param {Function} cb 必须是高阶函数
 */
var createEventDirective = function (object, eventName, cb) {
  var listenManager;
  return {
    inserted: function inserted(el, ref) {
      var value = ref.value;

      listenManager = listenManager || new ListenManager(object, eventName);
      listenManager.addHandler(el, isFunc(cb) ? cb(el, value) : value);
    },
    unbind: function unbind(el) {
      listenManager.removeHandler(el);
      if (listenManager.getHandlerCount() < 1) {
        listenManager.removeListener();
        listenManager = null;
      }
    }
  }
};
// 窗口改变大小指令
var winresize = createEventDirective(window, 'resize');
// 窗口滚动指令
var winscroll = createEventDirective(window, 'scroll');
// 目标元素之外单击指令
var clickoutside = createEventDirective(window, 'click', function (el, cb) { return function (e) { return isOutside(e, el) && cb(e); }; });

//
var script$4 = {
  name: 'XAffix',
  props: {
    offsetTop: {
      type: Number,
      default: 0
    },
    offsetBottom: Number
  },
  data: function data() {
    return {
      fixed: false,
      affixStyle: {},
      placeholderStyle: {}
    }
  },
  computed: {
    fixedBottom: function fixedBottom() {
      return this.offsetBottom !== undefined && this.offsetTop === 0
    }
  },
  directives: { winresize: winresize, winscroll: winscroll },
  watch: {
    fixed: function fixed(val) {
      this.$emit('on-change', val);
    }
  },
  mounted: function mounted() {
    this.onResize()();
  },
  methods: {
    onScroll: function onScroll() {
      var this$1 = this;

      return throttle(function () {
        var rect = this$1.$el.getBoundingClientRect();
        this$1.fixed = this$1.fixedBottom ? window.innerHeight - rect.bottom <= this$1.offsetBottom : rect.top <= this$1.offsetTop;
      }, 50)
    },
    onResize: function onResize() {
      var this$1 = this;

      return throttle(function () {
        var rect = this$1.$el.getBoundingClientRect();
        this$1.placeholderStyle = { width: ((rect.width) + "px"), height: ((rect.height) + "px") };
        var obj = this$1.fixedBottom ? { bottom: ((this$1.offsetBottom) + "px") } : { top: ((this$1.offsetTop) + "px") };
        this$1.affixStyle = Object.assign({}, obj, {left: ((rect.left) + "px")});
      }, 50)
    }
  }
};

/* script */
var __vue_script__$4 = script$4;
/* template */
var __vue_render__$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      directives: [
        {
          name: "winresize",
          rawName: "v-winresize",
          value: _vm.onResize(),
          expression: "onResize()"
        },
        {
          name: "winscroll",
          rawName: "v-winscroll",
          value: _vm.onScroll(),
          expression: "onScroll()"
        }
      ]
    },
    [
      _c(
        "div",
        { class: { "x-affix": _vm.fixed }, style: _vm.affixStyle },
        [_vm._t("default")],
        2
      ),
      _vm._v(" "),
      _c("div", {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.fixed,
            expression: "fixed"
          }
        ],
        style: _vm.placeholderStyle
      })
    ]
  )
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  var __vue_inject_styles__$4 = undefined;
  /* scoped */
  var __vue_scope_id__$4 = undefined;
  /* module identifier */
  var __vue_module_identifier__$4 = undefined;
  /* functional template */
  var __vue_is_functional_template__$4 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$4 = normalizeComponent(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$5 = {
  name: 'XBackTop',
  components: { XIcon: __vue_component__ },
  props: {
    height: {
      type: Number,
      default: 400
    },
    bottom: {
      type: [Number, String],
      default: 30
    },
    right: {
      type: [Number, String],
      default: 30
    },
    duration: {
      type: Number,
      default: 300
    }
  },
  data: function data() {
    return { prefix: 'x-backTop', visible: false }
  },
  computed: {
    styles: function styles() {
      return { right: ((+this.right) + "px"), bottom: ((+this.bottom) + "px") }
    }
  },
  directives: { winscroll: winscroll },
  methods: {
    handleClick: function handleClick() {
      var this$1 = this;

      if (this.timer) { return }
      var x = window.scrollX, y = window.scrollY, ms = 16;
      var step = y / (this.duration / ms);
      this.timer = setInterval(function () {
        if (y > 0) {
          y -= step;
        } else {
          clearInterval(this$1.timer);
          this$1.timer = null;
        }
        window.scrollTo(x, y);
      }, ms);
    },
    onScroll: function onScroll() {
      var this$1 = this;

      return throttle(function () { return this$1.visible = window.scrollY > this$1.height; }, 200)
    }
  }
};

/* script */
var __vue_script__$5 = script$5;
/* template */
var __vue_render__$5 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("transition", { attrs: { name: _vm.prefix } }, [
    _c(
      "div",
      {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.visible,
            expression: "visible"
          },
          {
            name: "winscroll",
            rawName: "v-winscroll",
            value: _vm.onScroll(),
            expression: "onScroll()"
          }
        ],
        class: _vm.prefix,
        style: _vm.styles,
        on: { click: _vm.handleClick }
      },
      [
        _vm._t("default", [
          _c("x-Icon", {
            class: _vm.prefix + "_btn",
            attrs: { type: "ios-arrow-up" }
          })
        ])
      ],
      2
    )
  ])
};
var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;

  /* style */
  var __vue_inject_styles__$5 = undefined;
  /* scoped */
  var __vue_scope_id__$5 = undefined;
  /* module identifier */
  var __vue_module_identifier__$5 = undefined;
  /* functional template */
  var __vue_is_functional_template__$5 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$5 = normalizeComponent(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$6 = {
  name: 'XAvatar',
  components: { XIcon: __vue_component__ },
  props: {
    shape: {
      default: 'circle',
      validator: function validator(v) {
        return ['circle', 'square'].indexOf(v) !== -1
      }
    },
    size: [String, Number],
    src: String,
    icon: String,
    customIcon: String,
    text: String
  },
  data: function data() {
    return { prefix: 'x-avatar', textStyle: null }
  },
  computed: {
    classes: function classes() {
      var ref = this;
      var prefix = ref.prefix;
      var shape = ref.shape;
      var size = ref.size;
      var icon = ref.icon;
      return [prefix, (prefix + "_" + shape), size && (prefix + "_" + size), { isIcon: icon }]
    },
    styles: function styles() {
      var size = parseInt(this.size);
      return isNaN(size) ? {} : { width: (size + "px"), height: (size + "px"), fontSize: ((size / 2) + "px") }
    }
  },
  watch: {
    text: {
      immediate: true,
      handler: function handler(val) {
        var this$1 = this;

        if (this.src || this.icon || this.customIcon) { return }
        this.$nextTick(function () {
          var width = this$1.$el.offsetWidth,
            textWidth = this$1.$refs.textBox.offsetWidth;
          this$1.textStyle = {
            transform: ("scale(" + (width - 8 < textWidth ? (width - 8) / textWidth : 1) + ")")
          };
        });
      }
    }
  }
};

/* script */
var __vue_script__$6 = script$6;
/* template */
var __vue_render__$6 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "span",
    { class: _vm.classes, style: _vm.styles },
    [
      _vm.src
        ? _c("img", { attrs: { src: _vm.src } })
        : _vm.icon || _vm.customIcon
        ? _c("x-icon", { attrs: { type: _vm.icon, custom: _vm.customIcon } })
        : _c(
            "span",
            { ref: "textBox", style: _vm.textStyle },
            [_vm._t("default", [_vm._v(_vm._s(_vm.text))])],
            2
          )
    ],
    1
  )
};
var __vue_staticRenderFns__$6 = [];
__vue_render__$6._withStripped = true;

  /* style */
  var __vue_inject_styles__$6 = undefined;
  /* scoped */
  var __vue_scope_id__$6 = undefined;
  /* module identifier */
  var __vue_module_identifier__$6 = undefined;
  /* functional template */
  var __vue_is_functional_template__$6 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$6 = normalizeComponent(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$7 = {
  name: 'XCloseIconButton',
  components: { XIcon: __vue_component__ },
  props: {
    size: {
      type: [Number, String],
      default: 22
    }
  },
  computed: {
    styles: function styles() {
      return { fontSize: parseSize(this.size) }
    }
  }
};

/* script */
var __vue_script__$7 = script$7;
/* template */
var __vue_render__$7 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "x-icon",
    _vm._g(
      {
        staticClass: "x-close-icon-button",
        style: _vm.styles,
        attrs: { type: "ios-close-empty" }
      },
      _vm.$listeners
    )
  )
};
var __vue_staticRenderFns__$7 = [];
__vue_render__$7._withStripped = true;

  /* style */
  var __vue_inject_styles__$7 = undefined;
  /* scoped */
  var __vue_scope_id__$7 = undefined;
  /* module identifier */
  var __vue_module_identifier__$7 = undefined;
  /* functional template */
  var __vue_is_functional_template__$7 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$7 = normalizeComponent(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$8 = {
  name: 'XAlert',
  components: { XIcon: __vue_component__, XCloseIconButton: __vue_component__$7 },
  props: {
    type: {
      default: 'info',
      validator: function validator(v) {
        return ['info', 'success', 'warning', 'error'].indexOf(v) !== -1
      }
    },
    closable: Boolean,
    showIcon: Boolean
  },
  data: function data() {
    return { prefix: 'x-alert', hasDesc: false, visible: true }
  },
  computed: {
    iconType: function iconType() {
      return iconTypes[this.type]
    }
  },
  mounted: function mounted() {
    this.hasDesc = !!this.$slots.desc;
  },
  methods: {
    close: function close(e) {
      this.visible = false;
      this.$emit('on-close', e);
    }
  }
};

/* script */
var __vue_script__$8 = script$8;
/* template */
var __vue_render__$8 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("transition", { attrs: { name: _vm.prefix } }, [
    _vm.visible
      ? _c(
          "div",
          {
            class: [
              _vm.prefix,
              _vm.prefix + "_" + _vm.type,
              { hasDesc: _vm.hasDesc }
            ]
          },
          [
            _vm.showIcon
              ? _c(
                  "span",
                  { class: _vm.prefix + "_icon" },
                  [
                    _vm._t("icon", [
                      _c("x-icon", { attrs: { type: _vm.iconType } })
                    ])
                  ],
                  2
                )
              : _vm._e(),
            _vm._v(" "),
            _c("div", [
              _c(
                "div",
                { class: _vm.prefix + "_title" },
                [_vm._t("default")],
                2
              ),
              _vm._v(" "),
              _c("div", { class: _vm.prefix + "_desc" }, [_vm._t("desc")], 2)
            ]),
            _vm._v(" "),
            _vm.closable
              ? _c(
                  "span",
                  { class: _vm.prefix + "_close", on: { click: _vm.close } },
                  [_vm._t("close", [_c("x-close-icon-button")])],
                  2
                )
              : _vm._e()
          ]
        )
      : _vm._e()
  ])
};
var __vue_staticRenderFns__$8 = [];
__vue_render__$8._withStripped = true;

  /* style */
  var __vue_inject_styles__$8 = undefined;
  /* scoped */
  var __vue_scope_id__$8 = undefined;
  /* module identifier */
  var __vue_module_identifier__$8 = undefined;
  /* functional template */
  var __vue_is_functional_template__$8 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$8 = normalizeComponent(
    { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
    __vue_inject_styles__$8,
    __vue_script__$8,
    __vue_scope_id__$8,
    __vue_is_functional_template__$8,
    __vue_module_identifier__$8,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$9 = {
  name: 'XTag',
  components: { XCloseIconButton: __vue_component__$7 },
  props: {
    closable: Boolean,
    checkable: Boolean,
    checked: {
      type: Boolean,
      default: true
    },
    type: {
      validator: function validator(v) {
        return ['border', 'dot'].indexOf(v) !== -1
      }
    },
    color: {
      type: String,
      default: 'default'
    },
    name: [String, Number],
    fade: {
      type: Boolean,
      default: true
    },
    size: {
      default: 'default',
      validator: function validator(v) {
        return ['large', 'medium', 'default'].indexOf(v) !== -1
      }
    }
  },
  data: function data() {
    return { prefix: 'x-tag', isChecked: this.checked }
  },
  computed: {
    colorClass: function colorClass() {
      var this$1 = this;

      return ['default', 'primary', 'success', 'warning', 'error', 'blue', 'green', 'red', 'orange'].find(function (_) { return _ === this$1.color; })
    },
    classes: function classes() {
      var ref = this;
      var prefix = ref.prefix;
      var colorClass = ref.colorClass;
      var type = ref.type;
      var isChecked = ref.isChecked;
      var fade = ref.fade;
      var size = ref.size;
      var color = ref.color;
      var closable = ref.closable;
      return [
        prefix,
        !type && (prefix + "_size_" + size),
        colorClass && (prefix + "_" + colorClass),
        type && (prefix + "_" + type),
        { checked: isChecked && !type, color: color && !colorClass, closable: closable, fade: fade }
      ]
    },
    styles: function styles() {
      return this.colorClass ?
        {} : this.type === 'border' ?
          { color: this.color } : this.type === 'dot' ?
            { borderColor: this.color } : this.isChecked ? 
              { backgroundColor: this.color, color: '#fff' } : {}
    },
    dotStyle: function dotStyle() {
      return this.colorClass ? {} : { backgroundColor: this.color }
    }
  },
  watch: {
    checked: function checked(val) {
      this.isChecked = val;
    }
  },
  methods: {
    onClose: function onClose(e) {
      this.$emit('on-close', e, this.name);
    },
    onClick: function onClick() {
      if (!this.checkable || this.type) { return }
      this.isChecked = !this.isChecked;
      this.$emit('on-change', this.isChecked, this.name);
    }
  }
};

/* script */
var __vue_script__$9 = script$9;
/* template */
var __vue_render__$9 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("transition", { attrs: { name: _vm.prefix } }, [
    _c(
      "div",
      { class: _vm.classes, style: _vm.styles, on: { click: _vm.onClick } },
      [
        _vm.type === "dot"
          ? _c("span", { class: _vm.prefix + "_circle", style: _vm.dotStyle })
          : _vm._e(),
        _vm._v(" "),
        _vm._t("default"),
        _vm._v(" "),
        _vm.closable
          ? _c("x-close-icon-button", {
              class: _vm.prefix + "_close",
              on: { click: _vm.onClose }
            })
          : _vm._e()
      ],
      2
    )
  ])
};
var __vue_staticRenderFns__$9 = [];
__vue_render__$9._withStripped = true;

  /* style */
  var __vue_inject_styles__$9 = undefined;
  /* scoped */
  var __vue_scope_id__$9 = undefined;
  /* module identifier */
  var __vue_module_identifier__$9 = undefined;
  /* functional template */
  var __vue_is_functional_template__$9 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$9 = normalizeComponent(
    { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
    __vue_inject_styles__$9,
    __vue_script__$9,
    __vue_scope_id__$9,
    __vue_is_functional_template__$9,
    __vue_module_identifier__$9,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//

var script$a = {
  name: 'XCircle',
  props: {
    percent: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 120
    },
    strokeLinecap: {
      type: String,
      default: 'round'
    },
    strokeWidth: {
      type: Number,
      default: 6
    },
    strokeColor: {
      type: String,
      default: '#2db7f5'
    },
    trailWidth: {
      type: Number,
      default: 5
    },
    trailColor: {
      type: String,
      default: '#eaeef2'
    },
    dashboard: Boolean
  },
  data: function data() {
    return { prefix: 'x-circle' }
  },
  computed: {
    styles: function styles() {
      return { width: ((this.size) + "px"), height: ((this.size) + "px") }
    },
    skWidth: function skWidth () {
      return this.percent === 0 && this.dashboard ? 0 : this.strokeWidth
    },
    radius: function radius() {
      return 50 - this.strokeWidth / 2
    },
    pathString: function pathString() {
      var r = this.radius;
      return this.dashboard ? ("M 50,50 m 0," + r + " a " + r + "," + r + " 0 1 1 0,-" + (2 * r) + " a " + r + "," + r + " 0 1 1 0," + (2 * r)) :
        ("M 50,50 m 0,-" + r + " a " + r + "," + r + " 0 1 1 0," + (2 * r) + " a " + r + "," + r + " 0 1 1 0,-" + (2 * r))
    },
    len: function len() {
      return Math.PI * 2 * this.radius
    },
    trailStyle: function trailStyle() {
      return this.dashboard && {
        'stroke-dashoffset': ("-" + (75 / 2) + "px"),
        'stroke-dasharray': ((this.len - 75) + "px " + (this.len) + "px"),
        'transition': 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s'
      }
    },
    pathStyle: function pathStyle() {
      return this.dashboard ? {
        'stroke-dashoffset': ("-" + (75 / 2) + "px"),
        'stroke-dasharray': (((this.percent / 100) * (this.len - 75)) + "px " + (this.len) + "px"),
        'transition': 'stroke-dashoffset .3s ease 0s, stroke-dasharray .6s ease 0s, stroke .6s, stroke-width .06s ease .6s'
      } : {
        'stroke-dashoffset': ((((100 - this.percent) / 100 * this.len)) + "px"),
        'stroke-dasharray': ((this.len) + "px " + (this.len) + "px"),
        'transition': 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
      }
    }
  }
};

/* script */
var __vue_script__$a = script$a;
/* template */
var __vue_render__$a = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { class: _vm.prefix, style: _vm.styles }, [
    _c("svg", { attrs: { viewBox: "0 0 100 100" } }, [
      _c("path", {
        style: _vm.trailStyle,
        attrs: {
          d: _vm.pathString,
          stroke: _vm.trailColor,
          "stroke-width": _vm.trailWidth,
          "fill-opacity": 0
        }
      }),
      _vm._v(" "),
      _c("path", {
        style: _vm.pathStyle,
        attrs: {
          d: _vm.pathString,
          "stroke-linecap": _vm.strokeLinecap,
          stroke: _vm.strokeColor,
          "stroke-width": _vm.skWidth,
          "fill-opacity": "0"
        }
      })
    ]),
    _vm._v(" "),
    _c("div", { class: _vm.prefix + "_inner" }, [_vm._t("default")], 2)
  ])
};
var __vue_staticRenderFns__$a = [];
__vue_render__$a._withStripped = true;

  /* style */
  var __vue_inject_styles__$a = undefined;
  /* scoped */
  var __vue_scope_id__$a = undefined;
  /* module identifier */
  var __vue_module_identifier__$a = undefined;
  /* functional template */
  var __vue_is_functional_template__$a = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$a = normalizeComponent(
    { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
    __vue_inject_styles__$a,
    __vue_script__$a,
    __vue_scope_id__$a,
    __vue_is_functional_template__$a,
    __vue_module_identifier__$a,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$b = {
  name: 'XTime',
  props: {
    time: [Number, Date, String],
    type: {
      default: 'relative',
      validator: function validator(v) {
        return ['relative', 'date', 'datetime'].indexOf(v) !== -1
      }
    },
    interval: {
      type: Number,
      default: 60
    },
    hash: String
  },
  data: function data() {
    return { convertedValue: '' }
  },
  mounted: function mounted() {
    this.update();
  },
  beforeDestroy: function beforeDestroy() {
    clearInterval(this.tid);
  },
  methods: {
    update: function update() {
      this.convert();
      if (this.type === 'relative') { this.tid = setInterval(this.convert, this.interval * 1000); }
    },
    convert: function convert() {
      this.convertedValue = ({
        relative: this.convertRelTime(),
        date: dateFormat(this.time, 'yyyy-MM-dd'),
        datetime: dateFormat(this.time)
      })[this.type];
    },
    convertRelTime: function convertRelTime() {
      var ms = (Date.now() - new Date(this.time)) / 1000;
      return ms < 60 ? 
        ((~~ms) + "秒前") : ms < 3600 ?
          ((~~(ms / 60)) + "分钟前") : ms < 86400 ?
            ((~~(ms / 3600)) + "小时前") : ms < 2592000 ?
              ((~~(ms / 86400)) + "天前") : ms < 31104000 ?
                ((~~(ms / 2592000)) + "个月前") : ((~~(ms / 31104000)) + "年前")
    }
  }
};

/* script */
var __vue_script__$b = script$b;
/* template */
var __vue_render__$b = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    _vm.hash ? "a" : "span",
    { tag: "span", staticClass: "x-time", attrs: { href: _vm.hash } },
    [_vm._v(_vm._s(_vm.convertedValue))]
  )
};
var __vue_staticRenderFns__$b = [];
__vue_render__$b._withStripped = true;

  /* style */
  var __vue_inject_styles__$b = undefined;
  /* scoped */
  var __vue_scope_id__$b = undefined;
  /* module identifier */
  var __vue_module_identifier__$b = undefined;
  /* functional template */
  var __vue_is_functional_template__$b = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$b = normalizeComponent(
    { render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b },
    __vue_inject_styles__$b,
    __vue_script__$b,
    __vue_scope_id__$b,
    __vue_is_functional_template__$b,
    __vue_module_identifier__$b,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$c = {
  mixins: [link],
  name: 'XCard',
  components: { XIcon: __vue_component__ },
  props: {
    bordered: { type: Boolean, default: true },
    disHover: Boolean,
    shadow: Boolean,
    padding: { type: [Number, String], default: 16 },
    title: String,
    icon: String
  },
  data: function data() {
    return { prefix: 'x-card', hasHeader: false }
  },
  computed: {
    classes: function classes() {
      return [this.prefix, { bordered: this.bordered, disHover: this.disHover, shadow: this.shadow }]
    },
    bindProps: function bindProps() {
      return this.getLinkProps()
    },
    bodyStyle: function bodyStyle() {
      return { padding: parseSize(this.padding) }
    }
  },
  mounted: function mounted() {
    this.hasHeader = this.$slots.title || this.$slots.extra || this.icon || this.title;
  }
};

/* script */
var __vue_script__$c = script$c;
/* template */
var __vue_render__$c = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    _vm._b({ class: _vm.classes }, "div", _vm.bindProps, false),
    [
      _vm.hasHeader
        ? _c(
            "div",
            { class: _vm.prefix + "_header" },
            [
              _c(
                "div",
                { class: _vm.prefix + "_title" },
                [
                  _vm._t("title", [
                    _vm.icon
                      ? _c("x-icon", { attrs: { type: _vm.icon } })
                      : _vm._e(),
                    _vm._v(_vm._s(_vm.title) + "\n      ")
                  ])
                ],
                2
              ),
              _vm._v(" "),
              _vm._t("extra")
            ],
            2
          )
        : _vm._e(),
      _vm._v(" "),
      _c("div", { style: _vm.bodyStyle }, [_vm._t("default")], 2)
    ]
  )
};
var __vue_staticRenderFns__$c = [];
__vue_render__$c._withStripped = true;

  /* style */
  var __vue_inject_styles__$c = undefined;
  /* scoped */
  var __vue_scope_id__$c = undefined;
  /* module identifier */
  var __vue_module_identifier__$c = undefined;
  /* functional template */
  var __vue_is_functional_template__$c = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$c = normalizeComponent(
    { render: __vue_render__$c, staticRenderFns: __vue_staticRenderFns__$c },
    __vue_inject_styles__$c,
    __vue_script__$c,
    __vue_scope_id__$c,
    __vue_is_functional_template__$c,
    __vue_module_identifier__$c,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//

var script$d = {
  name: 'XBreadcrumb',
  props: {
    separator: { type: String, default: '/' }
  }
};

/* script */
var __vue_script__$d = script$d;

/* template */
var __vue_render__$d = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", [_vm._t("default")], 2)
};
var __vue_staticRenderFns__$d = [];
__vue_render__$d._withStripped = true;

  /* style */
  var __vue_inject_styles__$d = undefined;
  /* scoped */
  var __vue_scope_id__$d = undefined;
  /* module identifier */
  var __vue_module_identifier__$d = undefined;
  /* functional template */
  var __vue_is_functional_template__$d = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$d = normalizeComponent(
    { render: __vue_render__$d, staticRenderFns: __vue_staticRenderFns__$d },
    __vue_inject_styles__$d,
    __vue_script__$d,
    __vue_scope_id__$d,
    __vue_is_functional_template__$d,
    __vue_module_identifier__$d,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$e = {
  mixins: [link],
  name: 'XBreadcrumbItem',
  data: function data() {
    return { prefix: 'x-breadcrumb-item', separator: '' }
  },
  computed: {
    bindProps: function bindProps() {
      return this.getLinkProps()
    }
  },
  mounted: function mounted() {
    var parent = findParent(this, 'XBreadcrumb');
    if (parent) { this.separator = parent.separator; }
  }
};

/* script */
var __vue_script__$e = script$e;
/* template */
var __vue_render__$e = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("span", { class: _vm.prefix }, [
    _c(
      "span",
      _vm._b({ class: _vm.prefix + "_link" }, "span", _vm.bindProps, false),
      [_vm._t("default")],
      2
    ),
    _vm._v(" "),
    _c("span", {
      class: _vm.prefix + "_sep",
      domProps: { innerHTML: _vm._s(_vm.separator) }
    })
  ])
};
var __vue_staticRenderFns__$e = [];
__vue_render__$e._withStripped = true;

  /* style */
  var __vue_inject_styles__$e = undefined;
  /* scoped */
  var __vue_scope_id__$e = undefined;
  /* module identifier */
  var __vue_module_identifier__$e = undefined;
  /* functional template */
  var __vue_is_functional_template__$e = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$e = normalizeComponent(
    { render: __vue_render__$e, staticRenderFns: __vue_staticRenderFns__$e },
    __vue_inject_styles__$e,
    __vue_script__$e,
    __vue_scope_id__$e,
    __vue_is_functional_template__$e,
    __vue_module_identifier__$e,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//

var script$f = {
  name: 'XDivider',
  props: {
    type: {
      default: 'horizontal',
      validator: function validator(v) {
        return ['horizontal', 'vertical'].indexOf(v) !== -1
      }
    },
    orientation: {
      default: 'center',
      validator: function validator(v) {
        return ['left', 'right', 'center'].indexOf(v) !== -1
      }
    },
    dashed: Boolean,
    size: {
      validator: function validator(v) {
        return ['small', 'default'].indexOf(v) !== -1
      }
    }
  },
  data: function data() {
    return { prefix: 'x-divider', hasText: false }
  },
  mounted: function mounted() {
    this.hasText = this.type === 'horizontal' && this.$slots.default;
  }
};

/* script */
var __vue_script__$f = script$f;
/* template */
var __vue_render__$f = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      class: [
        _vm.prefix + "_" + _vm.type,
        _vm.prefix + "_" + _vm.orientation,
        _vm.size,
        { dashed: _vm.dashed }
      ]
    },
    [
      _c(
        "span",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.hasText,
              expression: "hasText"
            }
          ],
          class: _vm.prefix + "_text"
        },
        [_vm._t("default")],
        2
      )
    ]
  )
};
var __vue_staticRenderFns__$f = [];
__vue_render__$f._withStripped = true;

  /* style */
  var __vue_inject_styles__$f = undefined;
  /* scoped */
  var __vue_scope_id__$f = undefined;
  /* module identifier */
  var __vue_module_identifier__$f = undefined;
  /* functional template */
  var __vue_is_functional_template__$f = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$f = normalizeComponent(
    { render: __vue_render__$f, staticRenderFns: __vue_staticRenderFns__$f },
    __vue_inject_styles__$f,
    __vue_script__$f,
    __vue_scope_id__$f,
    __vue_is_functional_template__$f,
    __vue_module_identifier__$f,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$g = {
  mixins: [link],
  name: 'XCell',
  components: { XIcon: __vue_component__ },
  props: {
    name: [String, Number],
    title: String,
    label: String,
    extra: String,
    disabled: Boolean,
    selected: Boolean
  },
  data: function data() {
    return { prefix: 'x-cell' }
  },
  computed: {
    bindProps: function bindProps() {
      return this.getLinkProps()
    }
  },
  methods: {
    onClick: function onClick(e) {
      if (this.disabled) { return }
      var par = findParent(this, 'XCellGroup');
      par && par.$emit('on-click', this.name);
    }
  }
};

/* script */
var __vue_script__$g = script$g;
/* template */
var __vue_render__$g = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    _vm._b(
      {
        class: [_vm.prefix, { disabled: _vm.disabled, selected: _vm.selected }],
        on: { click: _vm.onClick }
      },
      "div",
      _vm.bindProps,
      false
    ),
    [
      _c("div", [
        _c(
          "div",
          { class: _vm.prefix + "_title" },
          [
            _vm._t("icon"),
            _vm._v(" "),
            _vm._t("default", [_vm._v(_vm._s(_vm.title))])
          ],
          2
        ),
        _vm._v(" "),
        _c(
          "div",
          { class: _vm.prefix + "_label" },
          [_vm._t("label", [_vm._v(_vm._s(_vm.label))])],
          2
        )
      ]),
      _vm._v(" "),
      _c(
        "div",
        { class: _vm.prefix + "_right" },
        [
          _vm._t("extra", [_vm._v(_vm._s(_vm.extra))]),
          _vm._v(" "),
          _vm.to
            ? [
                _vm._t("arrow", [
                  _c("x-icon", { attrs: { type: "ios-arrow-forward" } })
                ])
              ]
            : _vm._e()
        ],
        2
      )
    ]
  )
};
var __vue_staticRenderFns__$g = [];
__vue_render__$g._withStripped = true;

  /* style */
  var __vue_inject_styles__$g = undefined;
  /* scoped */
  var __vue_scope_id__$g = undefined;
  /* module identifier */
  var __vue_module_identifier__$g = undefined;
  /* functional template */
  var __vue_is_functional_template__$g = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$g = normalizeComponent(
    { render: __vue_render__$g, staticRenderFns: __vue_staticRenderFns__$g },
    __vue_inject_styles__$g,
    __vue_script__$g,
    __vue_scope_id__$g,
    __vue_is_functional_template__$g,
    __vue_module_identifier__$g,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//

var script$h = {
  name: 'XCellGroup'
};

/* script */
var __vue_script__$h = script$h;

/* template */
var __vue_render__$h = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", [_vm._t("default")], 2)
};
var __vue_staticRenderFns__$h = [];
__vue_render__$h._withStripped = true;

  /* style */
  var __vue_inject_styles__$h = undefined;
  /* scoped */
  var __vue_scope_id__$h = undefined;
  /* module identifier */
  var __vue_module_identifier__$h = undefined;
  /* functional template */
  var __vue_is_functional_template__$h = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$h = normalizeComponent(
    { render: __vue_render__$h, staticRenderFns: __vue_staticRenderFns__$h },
    __vue_inject_styles__$h,
    __vue_script__$h,
    __vue_scope_id__$h,
    __vue_is_functional_template__$h,
    __vue_module_identifier__$h,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$i = {
  name: 'XSplit',
  props: {
    value: {
      type: [Number, String],
      default: .5
    },
    mode: {
      default: 'horizontal',
      validator: function validator(v) {
        return ['horizontal', 'vertical'].indexOf(v) !== -1
      }
    },
    min: {
      type: [Number, String],
      default: '40px'
    },
    max: {
      type: [Number, String],
      default: '40px'
    }
  },
  data: function data() {
    return { prefix: 'x_split', paneStyle: {}, inputValue: this.value }
  },
  computed: {
    isHor: function isHor() {
      return this.mode === 'horizontal'
    },
    bodyClass: function bodyClass() {
      return [((this.prefix) + "_disSelection"), this.mode]
    }
  },
  watch: {
    value: function value(val) {
      this.inputValue = val;
    },
    inputValue: function inputValue(val) {
      this.$emit('input', val);
    }
  },
  mounted: function mounted() {
    this.updatePaneStyle();
  },
  methods: {
    onMousedown: function onMousedown(e) {
      var ref;

      this.initValue = this.inputValue;
      this.offset = this.isHor ? e.pageX : e.pageY
      (ref = document.body.classList).add.apply(ref, this.bodyClass);
      document.addEventListener('mousemove', this.onMousemove);
      document.addEventListener('mouseup', this.onMouseup);
      this.$emit('on-move-start');
    },
    onMousemove: function onMousemove(e) {
      var minVal, maxVal, value;
      var ref = this.$el;
      var width = ref.offsetWidth;
      var height = ref.offsetHeight;
      if (this.isHor) {
        var triggerSize = this.$refs.trigger.offsetWidth / width;
        minVal = isNaN(this.min) ? parseInt(this.min) / width : this.min;
        maxVal = (isNaN(this.max) ? (width - parseInt(this.max)) / width : this.max) - triggerSize;
        value = this.initValue + (e.pageX - this.offset) / width;
      } else {
        var triggerSize$1 = this.$refs.trigger.offsetHeight / height;
        minVal = isNaN(this.min) ? parseInt(this.min) / height : this.min;
        maxVal = (isNaN(this.max) ? (height - parseInt(this.max)) / height : this.max) - triggerSize$1;
        value = this.initValue + (e.pageY - this.offset) / height;
      }
      this.inputValue = Math.min(Math.max(minVal, value), maxVal);
      this.updatePaneStyle();
      this.$emit('on-moving', e);
    },
    onMouseup: function onMouseup(e) {
      var ref;

      (ref = document.body.classList).remove.apply(ref, this.bodyClass);
      document.removeEventListener('mousemove', this.onMousemove);
      document.removeEventListener('mouseup', this.onMouseup);
      this.$emit('on-move-end');
    },
    updatePaneStyle: function updatePaneStyle() {
      var size = this.inputValue;
      if (isNaN(size)) { size = this.isHor ? parseInt(size) / this.$el.offsetWidth : parseInt(size) / this.$el.offsetHeight; }
      size = (size * 100) + "%";
      this.paneStyle = this.isHor ? { width: size } : { height: size };
    }
  }
};

/* script */
var __vue_script__$i = script$i;
/* template */
var __vue_render__$i = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: [_vm.prefix, _vm.prefix + "_" + _vm.mode] },
    [
      _vm.isHor
        ? [
            _c("div", { style: _vm.paneStyle }, [_vm._t("left")], 2),
            _vm._v(" "),
            _c(
              "div",
              { ref: "trigger", on: { mousedown: _vm.onMousedown } },
              [
                _vm._t("trigger", [
                  _c(
                    "div",
                    { class: [_vm.prefix + "_triggerBar", _vm.mode] },
                    _vm._l(8, function(i) {
                      return _c("i", { key: i })
                    }),
                    0
                  )
                ])
              ],
              2
            ),
            _vm._v(" "),
            _c("div", { class: _vm.prefix + "_right" }, [_vm._t("right")], 2)
          ]
        : [
            _c("div", { style: _vm.paneStyle }, [_vm._t("top")], 2),
            _vm._v(" "),
            _c(
              "div",
              { ref: "trigger", on: { mousedown: _vm.onMousedown } },
              [
                _vm._t("trigger", [
                  _c(
                    "div",
                    { class: [_vm.prefix + "_triggerBar", _vm.mode] },
                    _vm._l(8, function(i) {
                      return _c("i", { key: i })
                    }),
                    0
                  )
                ])
              ],
              2
            ),
            _vm._v(" "),
            _c("div", { class: _vm.prefix + "_bottom" }, [_vm._t("bottom")], 2)
          ]
    ],
    2
  )
};
var __vue_staticRenderFns__$i = [];
__vue_render__$i._withStripped = true;

  /* style */
  var __vue_inject_styles__$i = undefined;
  /* scoped */
  var __vue_scope_id__$i = undefined;
  /* module identifier */
  var __vue_module_identifier__$i = undefined;
  /* functional template */
  var __vue_is_functional_template__$i = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$i = normalizeComponent(
    { render: __vue_render__$i, staticRenderFns: __vue_staticRenderFns__$i },
    __vue_inject_styles__$i,
    __vue_script__$i,
    __vue_scope_id__$i,
    __vue_is_functional_template__$i,
    __vue_module_identifier__$i,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//

var script$j = {
  name: 'XTimeline',
  props: { pending: Boolean }
};

/* script */
var __vue_script__$j = script$j;

/* template */
var __vue_render__$j = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "ul",
    { staticClass: "x-timeline", class: { pending: _vm.pending } },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$j = [];
__vue_render__$j._withStripped = true;

  /* style */
  var __vue_inject_styles__$j = undefined;
  /* scoped */
  var __vue_scope_id__$j = undefined;
  /* module identifier */
  var __vue_module_identifier__$j = undefined;
  /* functional template */
  var __vue_is_functional_template__$j = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$j = normalizeComponent(
    { render: __vue_render__$j, staticRenderFns: __vue_staticRenderFns__$j },
    __vue_inject_styles__$j,
    __vue_script__$j,
    __vue_scope_id__$j,
    __vue_is_functional_template__$j,
    __vue_module_identifier__$j,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//

var script$k = {
  name: 'XTimelineItem',
  props: { color: String },
  data: function data() {
    return { prefix: 'x-timeline-item', custom: false }
  },
  computed: {
    clsName: function clsName() {
      return ['blue', 'red', 'green'].indexOf(this.color) !== -1
    },
    styles: function styles() {
      return this.clsName ? {} : { color: this.color }
    }
  },
  mounted: function mounted() {
    this.custom = this.$slots.dot;
  }
};

/* script */
var __vue_script__$k = script$k;
/* template */
var __vue_render__$k = function() {
  var _obj;
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("li", { class: _vm.prefix }, [
    _c("span", { class: _vm.prefix + "_tail" }),
    _vm._v(" "),
    _c(
      "span",
      {
        class: [
          _vm.prefix + "_dot",
          ((_obj = {}),
          (_obj[_vm.color] = _vm.clsName),
          (_obj.custom = _vm.custom),
          _obj)
        ],
        style: _vm.styles
      },
      [_vm._t("dot")],
      2
    ),
    _vm._v(" "),
    _c("div", { class: _vm.prefix + "_content" }, [_vm._t("default")], 2)
  ])
};
var __vue_staticRenderFns__$k = [];
__vue_render__$k._withStripped = true;

  /* style */
  var __vue_inject_styles__$k = undefined;
  /* scoped */
  var __vue_scope_id__$k = undefined;
  /* module identifier */
  var __vue_module_identifier__$k = undefined;
  /* functional template */
  var __vue_is_functional_template__$k = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$k = normalizeComponent(
    { render: __vue_render__$k, staticRenderFns: __vue_staticRenderFns__$k },
    __vue_inject_styles__$k,
    __vue_script__$k,
    __vue_scope_id__$k,
    __vue_is_functional_template__$k,
    __vue_module_identifier__$k,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$l = {
  name: 'XSwitch',
  props:{
    value: {},
    size: {
      validator: function validator(v) {
        return ['large', 'default','small'].indexOf(v) !== -1
      }
    },
    disabled: Boolean,
    trueValue: {
      type: [String, Number, Boolean],
      default: true
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false
    },
    trueColor: String,
    falseColor: String,
    beforeChange: Function,
    loading: Boolean
  },
  data: function data() {
    return { prefix: 'x-switch', inputValue: this.value }
  },
  computed: {
    opened: function opened() {
      return this.inputValue === this.trueValue
    },
    classes: function classes() {
      return [
        this.prefix,
        this.size && ((this.prefix) + "_" + (this.size)),
        { opened: this.opened, disabled: this.disabled, loading: this.loading }
      ]
    },
    styles: function styles() {
      return { background: this.opened ? this.trueColor : this.falseColor }
    }
  },
  watch: {
    value: function value(val) {
      this.inputValue = val;
    },
    inputValue: function inputValue(val) {
      this.$emit('input', val);
    }
  },
  methods: {
    onClick: function onClick() {
      var this$1 = this;

      if (this.disabled || this.loading) { return }
      var change = function () {
        this$1.inputValue = this$1.opened ? this$1.falseValue : this$1.trueValue;
        this$1.$emit('on-change', this$1.inputValue);
      };
      isFunc(this.beforeChange) ? this.beforeChange().then(change) : change();
    },
    onSpaceKeydown: function onSpaceKeydown() {
      if (this.keydown) { return }
      this.onClick();
      this.keydown = true;
    },
    onSpaceKeyup: function onSpaceKeyup() {
      this.keydown = false;
    }
  }
};

/* script */
var __vue_script__$l = script$l;
/* template */
var __vue_render__$l = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "span",
    {
      class: _vm.classes,
      style: _vm.styles,
      attrs: { tabindex: "0" },
      on: {
        click: _vm.onClick,
        keydown: function($event) {
          if (
            !$event.type.indexOf("key") &&
            _vm._k($event.keyCode, "space", 32, $event.key, [" ", "Spacebar"])
          ) {
            return null
          }
          $event.preventDefault();
          return _vm.onSpaceKeydown($event)
        },
        keyup: function($event) {
          if (
            !$event.type.indexOf("key") &&
            _vm._k($event.keyCode, "space", 32, $event.key, [" ", "Spacebar"])
          ) {
            return null
          }
          return _vm.onSpaceKeyup($event)
        }
      }
    },
    [
      _vm.opened ? _vm._t("open") : _vm._t("close"),
      _vm._v(" "),
      _c("span", { class: [_vm.prefix + "_ball", { loading: _vm.loading }] })
    ],
    2
  )
};
var __vue_staticRenderFns__$l = [];
__vue_render__$l._withStripped = true;

  /* style */
  var __vue_inject_styles__$l = undefined;
  /* scoped */
  var __vue_scope_id__$l = undefined;
  /* module identifier */
  var __vue_module_identifier__$l = undefined;
  /* functional template */
  var __vue_is_functional_template__$l = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$l = normalizeComponent(
    { render: __vue_render__$l, staticRenderFns: __vue_staticRenderFns__$l },
    __vue_inject_styles__$l,
    __vue_script__$l,
    __vue_scope_id__$l,
    __vue_is_functional_template__$l,
    __vue_module_identifier__$l,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$m = {
  name: 'XRate',
  components: { XIcon: __vue_component__ },
  props: {
    count: {
      type: Number,
      default: 5
    },
    value: {
      type: Number,
      default: 0
    },
    allowHalf: Boolean,
    disabled: Boolean,
    showText: Boolean,
    clearable: Boolean,
    icon: {
      type: String,
      default: 'star'
    },
    customIcon: String
  },
  data: function data() {
    return { prefix: 'x-rate', inputValue: this.value, tempValue: this.value }
  },
  watch: {
    value: function value(val) {
      this.inputValue = this.tempValue = val;
    },
    inputValue: function inputValue(val) {
      this.$emit('input', val);
    }
  },
  methods: {
    onMouseenter: function onMouseenter(i, isFull) {
      if ( isFull === void 0 ) isFull = true;

      if (this.disabled) { return }
      this.tempValue = isFull ? i : i - .5;
    },
    onMouseleave: function onMouseleave() {
      this.tempValue = this.inputValue;
    },
    onClick: function onClick(i, isFull) {
      if ( isFull === void 0 ) isFull = true;

      if (this.disabled) { return }
      var value = isFull ? i : i - .5, thisValue = this.inputValue;
      this.inputValue = this.clearable && value === thisValue ? 0 : value;
      if (this.inputValue !== thisValue) { this.$emit('on-change', this.inputValue); }
    },
    isActive: function isActive(i, isFull) {
      if ( isFull === void 0 ) isFull = true;

      return i <= this.tempValue && i <= this.inputValue + (isFull ? 0 : .5)
    },
    fullClasses: function fullClasses(i) {
      var ref = this;
      var prefix = ref.prefix;
      var tempValue = ref.tempValue;
      var disabled = ref.disabled;
      return { active: this.isActive(i), hover: i <= tempValue, disabled: disabled }
    },
    halfClasses: function halfClasses(i) {
      var ref = this;
      var prefix = ref.prefix;
      var tempValue = ref.tempValue;
      var disabled = ref.disabled;
      return { active: this.isActive(i, false), hover: i <= tempValue + .5, disabled: disabled }
    }
  }
};

/* script */
var __vue_script__$m = script$m;
/* template */
var __vue_render__$m = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { class: _vm.prefix }, [
    _c(
      "ul",
      { class: _vm.prefix + "_list" },
      _vm._l(_vm.count, function(i) {
        return _c(
          "li",
          { key: i, class: _vm.prefix + "_item" },
          [
            _c("x-icon", {
              class: _vm.fullClasses(i),
              attrs: { type: _vm.icon, custom: _vm.customIcon },
              on: {
                mouseenter: function($event) {
                  return _vm.onMouseenter(i)
                },
                mouseleave: _vm.onMouseleave,
                click: function($event) {
                  return _vm.onClick(i)
                }
              }
            }),
            _vm._v(" "),
            _vm.allowHalf
              ? _c(
                  "div",
                  { class: _vm.prefix + "_half" },
                  [
                    _c("x-icon", {
                      class: _vm.halfClasses(i),
                      attrs: { type: _vm.icon, custom: _vm.customIcon },
                      on: {
                        mouseenter: function($event) {
                          return _vm.onMouseenter(i, false)
                        },
                        mouseleave: _vm.onMouseleave,
                        click: function($event) {
                          return _vm.onClick(i, false)
                        }
                      }
                    })
                  ],
                  1
                )
              : _vm._e()
          ],
          1
        )
      }),
      0
    ),
    _vm._v(" "),
    _vm.showText
      ? _c(
          "span",
          { class: _vm.prefix + "_text" },
          [_vm._t("default", [_vm._v(_vm._s(_vm.inputValue) + " 星")])],
          2
        )
      : _vm._e()
  ])
};
var __vue_staticRenderFns__$m = [];
__vue_render__$m._withStripped = true;

  /* style */
  var __vue_inject_styles__$m = undefined;
  /* scoped */
  var __vue_scope_id__$m = undefined;
  /* module identifier */
  var __vue_module_identifier__$m = undefined;
  /* functional template */
  var __vue_is_functional_template__$m = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$m = normalizeComponent(
    { render: __vue_render__$m, staticRenderFns: __vue_staticRenderFns__$m },
    __vue_inject_styles__$m,
    __vue_script__$m,
    __vue_scope_id__$m,
    __vue_is_functional_template__$m,
    __vue_module_identifier__$m,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$n = {
  name: 'XCheckbox',
  components: { XIcon: __vue_component__ },
  props: {
    value: [String, Number, Boolean],
    label: [String, Number, Boolean],
    border: Boolean,
    disabled: Boolean,
    indeterminate: Boolean,
    size: {
      validator: function validator(v) {
        return ['small', 'default', 'large'].indexOf(v) !== -1
      }
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false
    }
  },
  data: function data() {
    return { prefix: 'x-checkbox' }
  },
  computed: {
    prop: function prop() {
      var par = findParent(this, 'XCheckboxGroup');
      var checked = par ? par.includes(this.label) : this.value === this.trueValue;
      var size = this.size || par && par.size;
      var ref = this;
      var prefix = ref.prefix;
      var border = ref.border;
      var disabled = ref.disabled;
      var indeterminate = ref.indeterminate;
      var label = ref.label;
      return {
        checked: checked,
        label: isBool(label) ? '' : label,
        classes: [prefix, size && (prefix + "_" + size), { checked: checked, border: border, disabled: disabled, indeterminate: indeterminate }]
      }
    }
  },
  methods: {
    onClick: function onClick() {
      if (this.disabled) { return }
      var ref = this.prop;
      var checked = ref.checked;
      var par = findParent(this, 'XCheckboxGroup');
      if (par) {
        par.updateValue(this.label);
      } else {
        this.$emit('input', checked ? this.falseValue : this.trueValue);
        this.$emit('on-change', !checked);
      }
      this.$refs.btn.focus();
    }
  }
};

/* script */
var __vue_script__$n = script$n;
/* template */
var __vue_render__$n = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "span",
    {
      class: _vm.prop.classes,
      on: {
        keydown: function($event) {
          if (
            !$event.type.indexOf("key") &&
            _vm._k($event.keyCode, "space", 32, $event.key, [" ", "Spacebar"])
          ) {
            return null
          }
          $event.preventDefault();
        },
        keyup: function($event) {
          if (
            !$event.type.indexOf("key") &&
            _vm._k($event.keyCode, "space", 32, $event.key, [" ", "Spacebar"])
          ) {
            return null
          }
          return _vm.onClick($event)
        },
        click: _vm.onClick
      }
    },
    [
      _c(
        "span",
        { ref: "btn", class: _vm.prefix + "_btn", attrs: { tabindex: "0" } },
        [
          _vm.indeterminate
            ? _c("span", { class: _vm.prefix + "_line" })
            : _c("x-icon", {
                class: _vm.prefix + "_icon",
                attrs: { type: "checkmark" }
              })
        ],
        1
      ),
      _vm._v(" "),
      _vm._t("default", [_vm._v(_vm._s(_vm.prop.label))])
    ],
    2
  )
};
var __vue_staticRenderFns__$n = [];
__vue_render__$n._withStripped = true;

  /* style */
  var __vue_inject_styles__$n = undefined;
  /* scoped */
  var __vue_scope_id__$n = undefined;
  /* module identifier */
  var __vue_module_identifier__$n = undefined;
  /* functional template */
  var __vue_is_functional_template__$n = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$n = normalizeComponent(
    { render: __vue_render__$n, staticRenderFns: __vue_staticRenderFns__$n },
    __vue_inject_styles__$n,
    __vue_script__$n,
    __vue_scope_id__$n,
    __vue_is_functional_template__$n,
    __vue_module_identifier__$n,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//

var script$o = {
  name: 'XCheckboxGroup',
  props: {
    value: {
      type: Array,
      default: function () { return []; }
    },
    size: {
      validator: function validator(v) {
        return ['small', 'default', 'large'].indexOf(v) !== -1
      }
    }
  },
  data: function data() {
    return { data: this.value }
  },
  watch: {
    value: function value(val) {
      this.data = val;
    }
  },
  methods: {
    updateValue: function updateValue(value) {
      var index = this.data.indexOf(value);
      index === -1 ? this.data.push(value) : this.data.splice(index, 1);
      this.$emit('input', this.data);
      this.$emit('on-change', this.data);
    },
    includes: function includes(label) {
      return this.data.indexOf(label) !== -1
    }
  }
};

/* script */
var __vue_script__$o = script$o;

/* template */
var __vue_render__$o = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", [_vm._t("default")], 2)
};
var __vue_staticRenderFns__$o = [];
__vue_render__$o._withStripped = true;

  /* style */
  var __vue_inject_styles__$o = undefined;
  /* scoped */
  var __vue_scope_id__$o = undefined;
  /* module identifier */
  var __vue_module_identifier__$o = undefined;
  /* functional template */
  var __vue_is_functional_template__$o = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$o = normalizeComponent(
    { render: __vue_render__$o, staticRenderFns: __vue_staticRenderFns__$o },
    __vue_inject_styles__$o,
    __vue_script__$o,
    __vue_scope_id__$o,
    __vue_is_functional_template__$o,
    __vue_module_identifier__$o,
    false,
    undefined,
    undefined,
    undefined
  );

var props = {
  percent: {
    type: Number,
    default: 0
  },
  status: {
    default: 'normal',
    validator: function validator(value) {
      return ['normal', 'active', 'wrong', 'success'].indexOf(value) !== -1
    }
  },
  hideInfo: Boolean,
  textInside: Boolean
};

//
var script$p = {
  components: { XIcon: __vue_component__ },
  props: props,
  data: function data() {
    return { prefix: 'x-progress-info' }
  },
  computed: {
    icon: function icon() {
      return !this.textInside && ({ wrong: 'ios-close', success: 'ios-checkmark' })[this.status]
    }
  }
};

/* script */
var __vue_script__$p = script$p;

/* template */
var __vue_render__$p = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return !_vm.hideInfo
    ? _c(
        "span",
        { class: [_vm.prefix, { textInside: _vm.textInside }] },
        [
          _vm._t("default", [
            _vm.icon
              ? _c("x-icon", { attrs: { type: _vm.icon } })
              : _c("span", { class: _vm.prefix + "_text" }, [
                  _vm._v(_vm._s(Math.min(_vm.percent, 100)) + "%")
                ])
          ])
        ],
        2
      )
    : _vm._e()
};
var __vue_staticRenderFns__$p = [];
__vue_render__$p._withStripped = true;

  /* style */
  var __vue_inject_styles__$p = undefined;
  /* scoped */
  var __vue_scope_id__$p = undefined;
  /* module identifier */
  var __vue_module_identifier__$p = undefined;
  /* functional template */
  var __vue_is_functional_template__$p = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$p = normalizeComponent(
    { render: __vue_render__$p, staticRenderFns: __vue_staticRenderFns__$p },
    __vue_inject_styles__$p,
    __vue_script__$p,
    __vue_scope_id__$p,
    __vue_is_functional_template__$p,
    __vue_module_identifier__$p,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$q = {
  name: 'XProgress',
  components: { XInfo: __vue_component__$p },
  data: function data() {
    return { prefix: 'x-progress' }
  },
  props: Object.assign({}, props,
    {successPercent: {
      type: Number,
      default: 0
    },
    strokeWidth: {
      type: Number,
      default: 10
    },
    strokeColor: [String, Array],
    vertical: Boolean}),
  computed: {
    iconProps: function iconProps() {
      return Object.assign({}, this.$props, {status: this.percent < 100 ? this.status : 'success'})
    },
    classes: function classes() {
      return [this.prefix, ((this.prefix) + "_" + (this.iconProps.status)), { vertical: this.vertical }]
    },
    boxStyle: function boxStyle() {
      var obj;

      return ( obj = { borderRadius: ((this.strokeWidth) + "px") }, obj[this.vertical ? 'width' : 'height'] = ((this.strokeWidth) + "px"), obj )
    },
    bgStyle: function bgStyle() {
      var obj;

      var c = this.strokeColor;
      var ref = isArr(c) ? c : [c];
      var c0 = ref[0];
      var c1 = ref[1];
      var bgStyle = { background: c1 ? ("linear-gradient(to right," + c0 + "," + c1 + ")") : c0 };
      return Object.assign({}, bgStyle, this.boxStyle, ( obj = {}, obj[this.vertical ? 'height' : 'width'] = ((Math.min(this.percent, 100)) + "%"), obj ))
    },
    successBGStyle: function successBGStyle() {
      var obj;

      return Object.assign({}, this.boxStyle, ( obj = {}, obj[this.vertical ? 'height' : 'width'] = ((Math.min(this.successPercent, 100)) + "%"), obj ))
    }
  }
};

/* script */
var __vue_script__$q = script$q;
/* template */
var __vue_render__$q = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: _vm.classes },
    [
      _c("div", { class: _vm.prefix + "_box", style: _vm.boxStyle }, [
        _c(
          "div",
          { class: _vm.prefix + "_bg", style: _vm.bgStyle },
          [
            _vm.textInside
              ? _c("x-info", _vm._b({}, "x-info", _vm.iconProps, false))
              : _vm._e()
          ],
          1
        ),
        _vm._v(" "),
        _vm.successPercent
          ? _c("div", {
              class: _vm.prefix + "_bg success",
              style: _vm.successBGStyle
            })
          : _vm._e()
      ]),
      _vm._v(" "),
      !_vm.textInside
        ? _c("x-info", _vm._b({}, "x-info", _vm.iconProps, false))
        : _vm._e()
    ],
    1
  )
};
var __vue_staticRenderFns__$q = [];
__vue_render__$q._withStripped = true;

  /* style */
  var __vue_inject_styles__$q = undefined;
  /* scoped */
  var __vue_scope_id__$q = undefined;
  /* module identifier */
  var __vue_module_identifier__$q = undefined;
  /* functional template */
  var __vue_is_functional_template__$q = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$q = normalizeComponent(
    { render: __vue_render__$q, staticRenderFns: __vue_staticRenderFns__$q },
    __vue_inject_styles__$q,
    __vue_script__$q,
    __vue_scope_id__$q,
    __vue_is_functional_template__$q,
    __vue_module_identifier__$q,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$r = {
  name: 'XCollapse',
  props: {
    accordion: Boolean,
    value: [Array, String],
    simple: Boolean
  },
  data: function data() {
    return { panels: [], names: [] }
  },
  watch: {
    value: {
      immediate: true,
      handler: 'syncValue'
    },
    names: function names(val) {
      this.$emit('input', val);
    }
  },
  methods: {
    inNames: function inNames(vm) {
      return this.names.indexOf(vm.name || this.panels.indexOf(vm)) !== -1
    },
    syncValue: function syncValue() {
      this.names = isArr(this.value) ? this.value : [this.value];
    },
    updateNames: function updateNames(vm) {
      var name = vm.name || this.panels.indexOf(vm);
      var index = this.names.indexOf(name);
      index < 0 ? this.accordion ? (this.names = [name]) : this.names.push(name) : this.names.splice(index, 1);
      this.$emit('on-change', this.names);
    },
    addPanel: function addPanel(vm) {
      this.panels.push(vm);
    }
  }
};

/* script */
var __vue_script__$r = script$r;
/* template */
var __vue_render__$r = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: ["x-collapse", { simple: _vm.simple }] },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$r = [];
__vue_render__$r._withStripped = true;

  /* style */
  var __vue_inject_styles__$r = undefined;
  /* scoped */
  var __vue_scope_id__$r = undefined;
  /* module identifier */
  var __vue_module_identifier__$r = undefined;
  /* functional template */
  var __vue_is_functional_template__$r = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$r = normalizeComponent(
    { render: __vue_render__$r, staticRenderFns: __vue_staticRenderFns__$r },
    __vue_inject_styles__$r,
    __vue_script__$r,
    __vue_scope_id__$r,
    __vue_is_functional_template__$r,
    __vue_module_identifier__$r,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//

var script$s = {
  data: function data() {
    return {
      listeners: {
        enter: function enter(el) {
          el.style.height = 'auto';
          var endWidth = window.getComputedStyle(el).height;
          el.style.height = '0px';
          el.offsetHeight; // 强制重绘
          el.style.height = endWidth;
        },
        afterEnter: function afterEnter(el) {
          el.style.height = null;
        },
        leave: function leave(el) {
          el.style.height = window.getComputedStyle(el).height;
          el.offsetHeight; // 强制重绘
          el.style.height = '0px';
        },
        afterLeave: function afterLeave(el) {
          el.style.height = null;
        }
      }
    }
  }
};

/* script */
var __vue_script__$s = script$s;

/* template */
var __vue_render__$s = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("transition", _vm._g({}, _vm.listeners), [_vm._t("default")], 2)
};
var __vue_staticRenderFns__$s = [];
__vue_render__$s._withStripped = true;

  /* style */
  var __vue_inject_styles__$s = undefined;
  /* scoped */
  var __vue_scope_id__$s = undefined;
  /* module identifier */
  var __vue_module_identifier__$s = undefined;
  /* functional template */
  var __vue_is_functional_template__$s = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$s = normalizeComponent(
    { render: __vue_render__$s, staticRenderFns: __vue_staticRenderFns__$s },
    __vue_inject_styles__$s,
    __vue_script__$s,
    __vue_scope_id__$s,
    __vue_is_functional_template__$s,
    __vue_module_identifier__$s,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$t = {
  name: 'XPanel',
  components: { XIcon: __vue_component__, XCollapseTransition: __vue_component__$s },
  props: { name: String, hideArrow: Boolean },
  data: function data() {
    return { prefix: 'x-panel' }
  },
  computed: {
    expand: function expand() {
      return findParent(this, 'XCollapse').inNames(this)
    }
  },
  methods: {
    onClick: function onClick() {
      this.parent.updateNames(this);
    }
  },
  mounted: function mounted() {
    this.parent = findParent(this, 'XCollapse');
    this.parent.addPanel(this);
  }
};

/* script */
var __vue_script__$t = script$t;

/* template */
var __vue_render__$t = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: _vm.prefix },
    [
      _c(
        "div",
        { class: _vm.prefix + "_header", on: { click: _vm.onClick } },
        [
          !_vm.hideArrow
            ? _c("x-icon", {
                class: [_vm.prefix + "_icon", { expand: _vm.expand }],
                attrs: { type: "ios-arrow-forward" }
              })
            : _vm._e(),
          _vm._v(" "),
          _vm._t("default")
        ],
        2
      ),
      _vm._v(" "),
      _c("x-collapse-transition", [
        _c(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.expand,
                expression: "expand"
              }
            ],
            class: _vm.prefix + "_body"
          },
          [
            _c(
              "div",
              { class: _vm.prefix + "_content" },
              [_vm._t("content")],
              2
            )
          ]
        )
      ])
    ],
    1
  )
};
var __vue_staticRenderFns__$t = [];
__vue_render__$t._withStripped = true;

  /* style */
  var __vue_inject_styles__$t = undefined;
  /* scoped */
  var __vue_scope_id__$t = undefined;
  /* module identifier */
  var __vue_module_identifier__$t = undefined;
  /* functional template */
  var __vue_is_functional_template__$t = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$t = normalizeComponent(
    { render: __vue_render__$t, staticRenderFns: __vue_staticRenderFns__$t },
    __vue_inject_styles__$t,
    __vue_script__$t,
    __vue_scope_id__$t,
    __vue_is_functional_template__$t,
    __vue_module_identifier__$t,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$u = {
  name: 'XStep',
  components: { XIcon: __vue_component__ },
  props: {
    title: String,
    content: String,
    icon: String
  },
  data: function data() {
    return { prefix: 'x-step', state: {}, hasContent: false }
  },
  computed: {
    iconType: function iconType() {
      return this.icon || ({ finish: 'ios-checkmark-empty', error: 'ios-close-empty' })[this.state.status]
    }
  },
  mounted: function mounted() {
    this.hasContent = this.content || this.$slots.content;
  }
};

/* script */
var __vue_script__$u = script$u;

/* template */
var __vue_render__$u = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: [_vm.prefix, _vm.prefix + "_" + _vm.state.status] },
    [
      _c("div", { class: _vm.prefix + "_head" }, [
        _c(
          "span",
          { class: [_vm.prefix + "_icon", { custom: _vm.icon }] },
          [
            _vm.iconType
              ? _c("x-icon", { attrs: { type: _vm.iconType } })
              : [_vm._v(_vm._s(_vm.state.index + 1))]
          ],
          2
        ),
        _vm._v(" "),
        _c("div", { class: _vm.prefix + "_tail" })
      ]),
      _vm._v(" "),
      _c("div", { class: _vm.prefix + "_main" }, [
        _c(
          "b",
          { class: _vm.prefix + "_title" },
          [_vm._t("title", [_vm._v(_vm._s(_vm.title))])],
          2
        ),
        _vm._v(" "),
        _c(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.hasContent,
                expression: "hasContent"
              }
            ],
            class: _vm.prefix + "_content"
          },
          [_vm._t("content", [_vm._v(_vm._s(_vm.content))])],
          2
        )
      ])
    ]
  )
};
var __vue_staticRenderFns__$u = [];
__vue_render__$u._withStripped = true;

  /* style */
  var __vue_inject_styles__$u = undefined;
  /* scoped */
  var __vue_scope_id__$u = undefined;
  /* module identifier */
  var __vue_module_identifier__$u = undefined;
  /* functional template */
  var __vue_is_functional_template__$u = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$u = normalizeComponent(
    { render: __vue_render__$u, staticRenderFns: __vue_staticRenderFns__$u },
    __vue_inject_styles__$u,
    __vue_script__$u,
    __vue_scope_id__$u,
    __vue_is_functional_template__$u,
    __vue_module_identifier__$u,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$v = {
  name: 'XSteps',
  props: {
    status: {
      default: 'process',
      validator: function validator(v) {
        return ['wait', 'process', 'finish', 'error'].indexOf(v) !== -1
      }
    },
    current: {
      type: Number,
      default: 0
    },
    size: {
      validator: function validator(v) {
        return v === 'small'
      }
    },
    direction: {
      validator: function validator(v) {
        return ['horizontal', 'vertical'].indexOf(v) !== -1
      }
    }
  },
  watch: {
    current: {
      immediate: true,
      handler: 'setItemsState'
    }
  },
  methods: {
    setItemsState: function setItemsState() {
      var this$1 = this;

      this.$nextTick(function () {
        var steps = findChildrens(this$1, 'XStep');
        steps.forEach(function (_, i) { return _.state = {
          index: i,
          status: i === this$1.current ? this$1.status : i < this$1.current ? 'finish' : 'wait'
        }; });
      });
    }
  }
};

/* script */
var __vue_script__$v = script$v;
/* template */
var __vue_render__$v = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: ["x-steps", _vm.size, _vm.direction] },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$v = [];
__vue_render__$v._withStripped = true;

  /* style */
  var __vue_inject_styles__$v = undefined;
  /* scoped */
  var __vue_scope_id__$v = undefined;
  /* module identifier */
  var __vue_module_identifier__$v = undefined;
  /* functional template */
  var __vue_is_functional_template__$v = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$v = normalizeComponent(
    { render: __vue_render__$v, staticRenderFns: __vue_staticRenderFns__$v },
    __vue_inject_styles__$v,
    __vue_script__$v,
    __vue_scope_id__$v,
    __vue_is_functional_template__$v,
    __vue_module_identifier__$v,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$w = {
  name: 'XRadio',
  props: {
    label: {
      required: true,
      type: [String, Number]
    },
    disabled: Boolean,
    border: Boolean,
    size: {
      validator: function validator(v) {
        return ['large', 'small', 'default'].indexOf(v) !== -1
      }
    }
  },
  data: function data() {
    return { prefix: 'x-radio', parent: null }
  },
  computed: {
    isBtn: function isBtn() {
      return this.parent && this.parent.type === 'button'
    },
    checked: function checked() {
      return this.parent && this.parent.checkedValue === this.label
    },
    bindProps: function bindProps() {
      var ref = this;
      var border = ref.border;
      var disabled = ref.disabled;
      var checked = ref.checked;
      var prefix = ref.prefix;
      var size = this.size || (this.parent && this.parent.size);
      return this.isBtn ?
        { is: __vue_component__$1, disabled: disabled, size: size, class: [(prefix + "_btn"), { checked: checked }] } :
        { tabindex: '0', class: [prefix, size && (prefix + "_" + size), { border: border, disabled: disabled }] }
    }
  },
  methods: {
    onClick: function onClick() {
      if (!this.disabled) { this.parent.update(this.label); }
    }
  },
  mounted: function mounted() {
    this.parent = findParent(this, 'XRadioGroup');
  }
};

/* script */
var __vue_script__$w = script$w;
/* template */
var __vue_render__$w = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    _vm._b({ on: { click: _vm.onClick } }, "div", _vm.bindProps, false),
    [
      !_vm.isBtn
        ? _c("span", { class: [_vm.prefix + "_box", { checked: _vm.checked }] })
        : _vm._e(),
      _vm._v(" "),
      _vm._t("default", [_vm._v(_vm._s(_vm.label))])
    ],
    2
  )
};
var __vue_staticRenderFns__$w = [];
__vue_render__$w._withStripped = true;

  /* style */
  var __vue_inject_styles__$w = undefined;
  /* scoped */
  var __vue_scope_id__$w = undefined;
  /* module identifier */
  var __vue_module_identifier__$w = undefined;
  /* functional template */
  var __vue_is_functional_template__$w = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$w = normalizeComponent(
    { render: __vue_render__$w, staticRenderFns: __vue_staticRenderFns__$w },
    __vue_inject_styles__$w,
    __vue_script__$w,
    __vue_scope_id__$w,
    __vue_is_functional_template__$w,
    __vue_module_identifier__$w,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$x = {
  name: 'XRadioGroup',
  props: {
    value: [String, Number],
    type: {
      validator: function validator(v) {
        return v === 'button'
      }
    },
    size: {
      validator: function validator(v) {
        return ['large', 'small', 'default'].indexOf(v) !== -1
      }
    },
    vertical: Boolean
  },
  data: function data() {
    return { checkedValue: this.value }
  },
  computed: {
    bindProps: function bindProps() {
      var prefix = 'x-radio-group';
      var ref = this;
      var vertical = ref.vertical;
      return this.type === 'button' ? { is: __vue_component__$2, class: prefix } : { class: [prefix, { vertical: vertical }] }
    }
  },
  watch: {
    value: function value(val) {
      this.checkedValue = val;
    },
    checkedValue: function checkedValue(val) {
      this.$emit('input', val);
    }
  },
  methods: {
    update: function update(label) {
      this.checkedValue = label;
      this.$emit('on-change', label);
    }
  }
};

/* script */
var __vue_script__$x = script$x;

/* template */
var __vue_render__$x = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    _vm._b({}, "div", _vm.bindProps, false),
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$x = [];
__vue_render__$x._withStripped = true;

  /* style */
  var __vue_inject_styles__$x = undefined;
  /* scoped */
  var __vue_scope_id__$x = undefined;
  /* module identifier */
  var __vue_module_identifier__$x = undefined;
  /* functional template */
  var __vue_is_functional_template__$x = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$x = normalizeComponent(
    { render: __vue_render__$x, staticRenderFns: __vue_staticRenderFns__$x },
    __vue_inject_styles__$x,
    __vue_script__$x,
    __vue_scope_id__$x,
    __vue_is_functional_template__$x,
    __vue_module_identifier__$x,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//

var script$y = {
  name: 'XSpin',
  props: {
    size: {
      validator: function validator(v) {
        return ['large', 'small'].indexOf(v) !== -1
      }
    },
    fix: Boolean
  },
  data: function data() {
    return { prefix: 'x-spin' }
  }
};

/* script */
var __vue_script__$y = script$y;
/* template */
var __vue_render__$y = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("transition", { attrs: { name: "x-animate-fade" } }, [
    _c("div", { class: [_vm.prefix, { fix: _vm.fix }] }, [
      _c(
        "div",
        [
          _vm._t("default", [
            _c("div", {
              class: [
                _vm.prefix + "_dot",
                _vm.size && _vm.prefix + "_" + _vm.size
              ]
            })
          ])
        ],
        2
      )
    ])
  ])
};
var __vue_staticRenderFns__$y = [];
__vue_render__$y._withStripped = true;

  /* style */
  var __vue_inject_styles__$y = undefined;
  /* scoped */
  var __vue_scope_id__$y = undefined;
  /* module identifier */
  var __vue_module_identifier__$y = undefined;
  /* functional template */
  var __vue_is_functional_template__$y = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$y = normalizeComponent(
    { render: __vue_render__$y, staticRenderFns: __vue_staticRenderFns__$y },
    __vue_inject_styles__$y,
    __vue_script__$y,
    __vue_scope_id__$y,
    __vue_is_functional_template__$y,
    __vue_module_identifier__$y,
    false,
    undefined,
    undefined,
    undefined
  );

var vm, getVM = function () { return vm || (vm = new Vue({
  data: function data() {
    return { visible: false, options: {} }
  },
  watch: {
    visible: function visible(val) {
      winScrollbarLock[val ? 'lock' : 'unlock']();
    }
  },
  render: function render(h) {
    var ref = this;
    var options = ref.options;
    return h(__vue_component__$y, {
      props: { size: options.size, fix: true },
      style: { zIndex: getMaxZIndex(), position: 'fixed' },
      directives: [{ name: 'show', value: this.visible }]
    }, options.render && [options.render(h)])
  },
  mounted: function mounted() {
    document.body.appendChild(this.$el);
  },
  beforeDestroy: function beforeDestroy() {
    this.$el.parentNode && this.$el.parentNode.removeChild(this.$el);
  },
  methods: {
    show: function show(options) {
      if ( options === void 0 ) options = {};

      this.options = Object.assign({}, {size: 'large'}, options);
      this.visible = true;
    },
    hide: function hide() {
      this.visible = false;
    }
  }
}).$mount()); };

__vue_component__$y.service = {
  show: function show(options) {
    getVM().show(options);
  },
  hide: function hide() {
    getVM().hide();
  },
  destroy: function destroy() {
    vm && vm.$destroy();
    vm = null;
  }
};

//
var script$z = {
  name: 'XLoading',
  components: { XIcon: __vue_component__, XSpin: __vue_component__$y },
  props: {
    loading: Boolean,
    loadingText: String,
    iconClass: String
  },
  data: function data() {
    return { prefix: 'x-loading' }
  }
};

/* script */
var __vue_script__$z = script$z;
/* template */
var __vue_render__$z = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: _vm.prefix },
    [
      _vm.loading
        ? _c(
            "x-spin",
            { attrs: { fix: "" } },
            [
              _c("x-icon", {
                class: [_vm.prefix + "_icon", _vm.iconClass],
                attrs: { type: "load-c", size: "18" }
              }),
              _vm._v(" "),
              _c("span", { class: _vm.prefix + "_text" }, [
                _vm._v(_vm._s(_vm.loadingText))
              ])
            ],
            1
          )
        : _vm._e()
    ],
    1
  )
};
var __vue_staticRenderFns__$z = [];
__vue_render__$z._withStripped = true;

  /* style */
  var __vue_inject_styles__$z = undefined;
  /* scoped */
  var __vue_scope_id__$z = undefined;
  /* module identifier */
  var __vue_module_identifier__$z = undefined;
  /* functional template */
  var __vue_is_functional_template__$z = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$z = normalizeComponent(
    { render: __vue_render__$z, staticRenderFns: __vue_staticRenderFns__$z },
    __vue_inject_styles__$z,
    __vue_script__$z,
    __vue_scope_id__$z,
    __vue_is_functional_template__$z,
    __vue_module_identifier__$z,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$A = {
  name: 'XScroll',
  components: { XLoading: __vue_component__$z },
  props: {
    height: {
      type: [String, Number],
      default: 300
    },
    loadingText: {
      type: String,
      default: '加载中'
    },
    onReachTop: Function,
    onReachBottom: Function,
    onReachEdge: Function,
    distanceToEdge: {
      type: [Number, Array],
      default: function () { return [20, 20]; }
    }
  },
  data: function data() {
    return { topLoading: false, bottomLoading: false }
  },
  computed: {
    styles: function styles() {
      return { height: parseSize(this.height) }
    },
    edge: function edge() {
      var edge = this.distanceToEdge;
      var ref = isArr(edge) ? edge : [edge, edge];
      var e1 = ref[0];
      var e2 = ref[1];
      return [e1, e2 || e1]
    },
    topHandlers: function topHandlers() {
      return [this.onReachTop, this.onReachEdge].filter(function (_) { return _; })
    },
    bottomHandlers: function bottomHandlers() {
      return [this.onReachBottom, this.onReachEdge].filter(function (_) { return _; })
    }
  },
  methods: {
    onScroll: function onScroll() {
      var this$1 = this;

      var ref = this.$el;
      var scrollTop = ref.scrollTop;
      var scrollHeight = ref.scrollHeight;
      var clientHeight = ref.clientHeight;
      if (scrollTop + clientHeight >= scrollHeight - this.edge[1]) { // 到达底部
        if (this.bottomLoading) { return }
        if (this.bottomHandlers.length) { this.bottomLoading = true; }
        Promise.all(this.bottomHandlers.map(function (_) { return _(); })).finally(function () { return this$1.bottomLoading = false; });
      } else if (scrollTop <= this.edge[0]) { // 到达顶部
        if (this.topLoading) { return }
        if (this.topHandlers.length) { this.topLoading = true; }
        Promise.all(this.topHandlers.map(function (_) { return _(); })).then(function () {
          this$1.$nextTick(function () {
            this$1.$el.scrollTop = this$1.$el.scrollHeight - scrollHeight + this$1.$el.scrollTop;
          });
        }).finally(function () { return this$1.topLoading = false; });
      }
    },
    onMouseWheel: function onMouseWheel(e) {
      if (
        (this.topHandlers.length && this.$el.scrollTop <= 0 && e.deltaY < 0) ||
        (this.bottomHandlers.length && this.$el.scrollTop + this.$el.clientHeight >= this.$el.scrollHeight && e.deltaY > 0)
      ) {
        e.preventDefault();
      }
    }
  }
};

/* script */
var __vue_script__$A = script$A;
/* template */
var __vue_render__$A = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      staticClass: "x-scroll",
      style: _vm.styles,
      on: { scroll: _vm.onScroll, mousewheel: _vm.onMouseWheel }
    },
    [
      _vm.topHandlers.length
        ? _c("x-loading", {
            attrs: { loadingText: _vm.loadingText, loading: _vm.topLoading }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm._t("default"),
      _vm._v(" "),
      _vm.bottomHandlers.length
        ? _c("x-loading", {
            attrs: { loadingText: _vm.loadingText, loading: _vm.bottomLoading }
          })
        : _vm._e()
    ],
    2
  )
};
var __vue_staticRenderFns__$A = [];
__vue_render__$A._withStripped = true;

  /* style */
  var __vue_inject_styles__$A = undefined;
  /* scoped */
  var __vue_scope_id__$A = undefined;
  /* module identifier */
  var __vue_module_identifier__$A = undefined;
  /* functional template */
  var __vue_is_functional_template__$A = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$A = normalizeComponent(
    { render: __vue_render__$A, staticRenderFns: __vue_staticRenderFns__$A },
    __vue_inject_styles__$A,
    __vue_script__$A,
    __vue_scope_id__$A,
    __vue_is_functional_template__$A,
    __vue_module_identifier__$A,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//

var script$B = {
  name: 'XOverlay'
};

/* script */
var __vue_script__$B = script$B;
/* template */
var __vue_render__$B = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("transition", { attrs: { name: "x-overlay" } }, [
    _c("div", _vm._g({ staticClass: "x-overlay" }, _vm.$listeners))
  ])
};
var __vue_staticRenderFns__$B = [];
__vue_render__$B._withStripped = true;

  /* style */
  var __vue_inject_styles__$B = undefined;
  /* scoped */
  var __vue_scope_id__$B = undefined;
  /* module identifier */
  var __vue_module_identifier__$B = undefined;
  /* functional template */
  var __vue_is_functional_template__$B = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$B = normalizeComponent(
    { render: __vue_render__$B, staticRenderFns: __vue_staticRenderFns__$B },
    __vue_inject_styles__$B,
    __vue_script__$B,
    __vue_scope_id__$B,
    __vue_is_functional_template__$B,
    __vue_module_identifier__$B,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$C = {
  name: 'XDrawer',
  components: { XOverlay: __vue_component__$B, XCloseIconButton: __vue_component__$7 },
  props: {
    value: Boolean,
    title: String,
    width: {
      type: [Number, String],
      default: 256
    },
    closable: {
      type: Boolean,
      default: true
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    mask: {
      type: Boolean,
      default: true
    },
    maskStyle: Object,
    styles: Object,
    scrollable: Boolean,
    placement: {
      default: 'right',
      validator: function validator(v) {
        return ['left', 'right'].indexOf(v) !== -1
      }
    },
    transfer: {
      type: Boolean,
      default: true
    },
    inner: Boolean,
    beforeClose: Function
  },
  data: function data() {
    return { zIndex: 1, prefix: 'x-drawer', visible: this.value }
  },
  computed: {
    overlayStyle: function overlayStyle() {
      var style = Object.assign({}, this.maskStyle, {zIndex: this.zIndex - 1});
      return this.inner ? Object.assign({}, style, {position: 'absolute'}) : style
    },
    boxStyle: function boxStyle() {
      var style = Object.assign({}, this.styles, {width: parseSize(this.width), zIndex: this.zIndex});
      return this.inner ? Object.assign({}, style, {position: 'absolute'}) : style
    },
    hasHeader: function hasHeader() {
      return this.title || this.$slots.header
    },
    hasFooter: function hasFooter() {
      return this.$slots.footer
    }
  },
  watch: {
    value: function value(val) {
      this.visible = val;
    },
    visible: function visible(val) {
      this.$emit('input', val);
      this.$emit('on-visible-change', val);
      if (val) { this.onOpen(); }
    }
  },
  mounted: function mounted() {
    if (!this.inner && this.transfer) { document.body.appendChild(this.$el); }
  },
  beforeDestroy: function beforeDestroy() {
    this.onLeave();
    this.$el.parentNode && this.$el.parentNode.removeChild(this.$el);
  },
  methods: {
    close: function close() {
      this.beforeClose ? this.beforeClose().then(this.onClose) : this.onClose();
    },
    onClose: function onClose() {
      this.visible = false;
      this.$emit('on-close');
    },
    onOpen: function onOpen() {
      this.zIndex = getMaxZIndex();
      if (this.inner || this.scrollable || winScrollbarLock.locked) { return }
      winScrollbarLock.lock();
      this.isCallLock = true;
    },
    onMaskClick: function onMaskClick() {
      if (this.maskClosable) { this.close(); }
    },
    onLeave: function onLeave() {
      if (!this.isCallLock) { return }
      winScrollbarLock.unlock();
      this.isCallLock = false;
    }
  }
};

/* script */
var __vue_script__$C = script$C;
/* template */
var __vue_render__$C = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: _vm.prefix + "_wrap" },
    [
      _vm.mask
        ? _c("x-overlay", {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.visible,
                expression: "visible"
              }
            ],
            style: _vm.overlayStyle,
            on: { click: _vm.onMaskClick }
          })
        : _vm._e(),
      _vm._v(" "),
      _c(
        "transition",
        {
          attrs: { name: _vm.prefix + "_" + _vm.placement },
          on: { afterLeave: _vm.onLeave }
        },
        [
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.visible,
                  expression: "visible"
                }
              ],
              class: [_vm.prefix, _vm.prefix + "_" + _vm.placement],
              style: _vm.boxStyle
            },
            [
              _vm.closable
                ? _c(
                    "span",
                    { class: _vm.prefix + "_close", on: { click: _vm.close } },
                    [
                      _vm._t("close", [
                        _c("x-close-icon-button", { attrs: { size: "31" } })
                      ])
                    ],
                    2
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.hasHeader
                ? _c(
                    "header",
                    { class: _vm.prefix + "_header" },
                    [_vm._t("header", [_vm._v(_vm._s(_vm.title))])],
                    2
                  )
                : _vm._e(),
              _vm._v(" "),
              _c(
                "main",
                { class: _vm.prefix + "_body" },
                [_vm._t("default")],
                2
              ),
              _vm._v(" "),
              _vm.hasFooter
                ? _c(
                    "footer",
                    { class: _vm.prefix + "_footer" },
                    [_vm._t("footer")],
                    2
                  )
                : _vm._e()
            ]
          )
        ]
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$C = [];
__vue_render__$C._withStripped = true;

  /* style */
  var __vue_inject_styles__$C = undefined;
  /* scoped */
  var __vue_scope_id__$C = undefined;
  /* module identifier */
  var __vue_module_identifier__$C = undefined;
  /* functional template */
  var __vue_is_functional_template__$C = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$C = normalizeComponent(
    { render: __vue_render__$C, staticRenderFns: __vue_staticRenderFns__$C },
    __vue_inject_styles__$C,
    __vue_script__$C,
    __vue_scope_id__$C,
    __vue_is_functional_template__$C,
    __vue_module_identifier__$C,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//

var script$D = {
  name: 'XRow',
  props: {
    gutter: {
      type: Number,
      default: 0
    },
    align: {
      validator: function validator(v) {
        return ['top', 'middle', 'bottom'].indexOf(v) !== -1
      }
    },
    justify: {
      validator: function validator(v) {
        return ['start', 'end', 'center', 'space-around', 'space-between'].indexOf(v) !== -1
      }
    }
  },
  computed: {
    classes: function classes() {
      var prefix = 'x-row';
      var ref = this;
      var align = ref.align;
      var justify = ref.justify;
      var gutter = ref.gutter;
      return [prefix, align && (prefix + "_" + align), justify && (prefix + "_" + justify), { gutter: gutter }]
    },
    styles: function styles() {
      return this.gutter && { margin: ("0 -" + (this.gutter / 2) + "px") }
    }
  }
};

/* script */
var __vue_script__$D = script$D;
/* template */
var __vue_render__$D = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: _vm.classes, style: _vm.styles },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$D = [];
__vue_render__$D._withStripped = true;

  /* style */
  var __vue_inject_styles__$D = undefined;
  /* scoped */
  var __vue_scope_id__$D = undefined;
  /* module identifier */
  var __vue_module_identifier__$D = undefined;
  /* functional template */
  var __vue_is_functional_template__$D = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$D = normalizeComponent(
    { render: __vue_render__$D, staticRenderFns: __vue_staticRenderFns__$D },
    __vue_inject_styles__$D,
    __vue_script__$D,
    __vue_scope_id__$D,
    __vue_is_functional_template__$D,
    __vue_module_identifier__$D,
    false,
    undefined,
    undefined,
    undefined
  );

//
var N = Number, NS = [N, String], NO = [N, Object];
var script$E = {
  name: 'XCol',
  props: {
    xs: NO, sm: NO, md: NO, lg: NO, xl: NO, xxl: NO,
    span: NS, order: NS, offset: NS, push: NS, pull: NS
  },
  computed: {
    classes: function classes() {
      var this$1 = this;

      var prefix = 'x-col', classes = [prefix];
      !['span', 'order', 'pull', 'push', 'offset'].forEach(function (_) {
        this$1[_] !== undefined && classes.push((prefix + "-" + _ + "-" + (this$1[_])));
      });
      var sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
      sizes.forEach(function (_) {
        if (!this$1[_]) { return }
        var options = typeof this$1[_] === 'number' ? { span: this$1[_] } : this$1[_];
        for (var key in options) { classes.push((prefix + "-" + _ + "-" + key + "-" + (options[key]))); }
      });
      return classes
    },
    styles: function styles() {
      var parent = findParent(this, 'XRow');
      var gutter = parent && parent.gutter, padding = (gutter / 2) + "px";
      return gutter && { paddingLeft: padding, paddingRight: padding }
    }
  }
};

/* script */
var __vue_script__$E = script$E;
/* template */
var __vue_render__$E = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: _vm.classes, style: _vm.styles },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$E = [];
__vue_render__$E._withStripped = true;

  /* style */
  var __vue_inject_styles__$E = undefined;
  /* scoped */
  var __vue_scope_id__$E = undefined;
  /* module identifier */
  var __vue_module_identifier__$E = undefined;
  /* functional template */
  var __vue_is_functional_template__$E = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$E = normalizeComponent(
    { render: __vue_render__$E, staticRenderFns: __vue_staticRenderFns__$E },
    __vue_inject_styles__$E,
    __vue_script__$E,
    __vue_scope_id__$E,
    __vue_is_functional_template__$E,
    __vue_module_identifier__$E,
    false,
    undefined,
    undefined,
    undefined
  );

var prefix = '.x-col',
  nulls = Array.apply(null, { length: 25 }),
  getSpan = function (i, val) { return i ? ("width:" + val) : "display:none"; },
  genCol = function () { return nulls.map(function (_, i) {
    var val = (i / 24 * 100) + "%";
    return [
      (prefix + "-span-" + i + "{" + (getSpan(i, val)) + ";}"),
      (prefix + "-order-" + i + "{order:" + i + ";}"),
      (prefix + "-pull-" + i + "{right:" + val + ";}"),
      (prefix + "-push-" + i + "{left:" + val + ";}"),
      (prefix + "-offset-" + i + "{margin-left:" + val + ";}")
    ].join('')
  }).join(''); },
  genGrid = function (size) { return nulls.map(function (_, i) {
    var val = (i / 24 * 100) + "%";
    return [
      (prefix + "-" + size + "-span-" + i + "{" + (getSpan(i, val)) + ";}"),
      (prefix + "-" + size + "-order-" + i + "{order:" + i + ";}"),
      (prefix + "-" + size + "-pull-" + i + "{right:" + val + ";}"),
      (prefix + "-" + size + "-push-" + i + "{left:" + val + ";}"),
      (prefix + "-" + size + "-offset-" + i + "{margin-left:" + val + ";}")
    ].join('')
  }).join(''); },
  genGridAll = function () { return [
    { size: 'xs' },
    { size: 'sm', minWidth: 576 },
    { size: 'md', minWidth: 768 },
    { size: 'lg', minWidth: 992 },
    { size: 'xl', minWidth: 1200 },
    { size: 'xxl', minWidth: 1600 }
  ].map(function (_) { return _.minWidth ? ("@media (min-width:" + (_.minWidth) + "px){" + (genGrid(_.size)) + "}") : genGrid(_.size); }).join(''); };

addStylesheet('XGridLayout', genCol() + genGridAll());

//
//
//
//
//
//
//
//
//
//
//

var S = String, B = Boolean;
var script$F = {
  name: 'XList',
  props: {
    border: B,
    itemLayout: {
      validator: function validator(v) {
        return ['horizontal', 'vertical'].indexOf(v) !== -1
      }
    },
    header: S,
    footer: S,
    loading: B,
    size: {
      validator: function validator(v) {
        return ['small', 'large', 'default'].indexOf(v) !== -1
      }
    },
    split: {
      type: B,
      default: true
    }
  },
  data: function data() {
    return { prefix: 'x-list', hasHeader: false, hasFooter: false }
  },
  computed: {
    classes: function classes() {
      var ref = this;
      var prefix = ref.prefix;
      var border = ref.border;
      var split = ref.split;
      return [prefix, (prefix + "_" + (this.itemLayout)), (prefix + "_" + (this.size)), { border: border, split: split }]
    }
  },
  mounted: function mounted() {
    this.hasHeader = this.header || this.$slots.header;
    this.hasFooter = this.footer || this.$slots.footer;
  }
};

/* script */
var __vue_script__$F = script$F;
/* template */
var __vue_render__$F = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { class: _vm.classes }, [
    _vm.hasHeader
      ? _c(
          "div",
          { class: [_vm.prefix + "_box", _vm.prefix + "_header"] },
          [_vm._t("header", [_vm._v(_vm._s(_vm.header))])],
          2
        )
      : _vm._e(),
    _vm._v(" "),
    _c("ul", [_vm._t("default")], 2),
    _vm._v(" "),
    _vm.hasFooter
      ? _c(
          "div",
          { class: [_vm.prefix + "_box", _vm.prefix + "_footer"] },
          [_vm._t("footer", [_vm._v(_vm._s(_vm.footer))])],
          2
        )
      : _vm._e()
  ])
};
var __vue_staticRenderFns__$F = [];
__vue_render__$F._withStripped = true;

  /* style */
  var __vue_inject_styles__$F = undefined;
  /* scoped */
  var __vue_scope_id__$F = undefined;
  /* module identifier */
  var __vue_module_identifier__$F = undefined;
  /* functional template */
  var __vue_is_functional_template__$F = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$F = normalizeComponent(
    { render: __vue_render__$F, staticRenderFns: __vue_staticRenderFns__$F },
    __vue_inject_styles__$F,
    __vue_script__$F,
    __vue_scope_id__$F,
    __vue_is_functional_template__$F,
    __vue_module_identifier__$F,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$G = {
  name: 'XListItem',
  data: function data() {
    return { prefix: 'x-list' }
  },
  computed: {
    vertical: function vertical() {
      var par = findParent(this, 'XList');
      return par && par.itemLayout === 'vertical'
    }
  }
};

/* script */
var __vue_script__$G = script$G;

/* template */
var __vue_render__$G = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("li", { class: [_vm.prefix + "_box", _vm.prefix + "-item"] }, [
    _c(
      "div",
      { class: _vm.prefix + "-item_box" },
      [
        _vm._t("default"),
        _vm._v(" "),
        _vm.vertical
          ? _c(
              "ul",
              { class: _vm.prefix + "-item_action" },
              [_vm._t("action")],
              2
            )
          : _vm._e()
      ],
      2
    ),
    _vm._v(" "),
    !_vm.vertical
      ? _c("ul", { class: _vm.prefix + "-item_action" }, [_vm._t("action")], 2)
      : _vm._e(),
    _vm._v(" "),
    _c("div", { class: _vm.prefix + "-item_extra" }, [_vm._t("extra")], 2)
  ])
};
var __vue_staticRenderFns__$G = [];
__vue_render__$G._withStripped = true;

  /* style */
  var __vue_inject_styles__$G = undefined;
  /* scoped */
  var __vue_scope_id__$G = undefined;
  /* module identifier */
  var __vue_module_identifier__$G = undefined;
  /* functional template */
  var __vue_is_functional_template__$G = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$G = normalizeComponent(
    { render: __vue_render__$G, staticRenderFns: __vue_staticRenderFns__$G },
    __vue_inject_styles__$G,
    __vue_script__$G,
    __vue_scope_id__$G,
    __vue_is_functional_template__$G,
    __vue_module_identifier__$G,
    false,
    undefined,
    undefined,
    undefined
  );

//
var S$1 = String;
var script$H = {
  name: 'XListItemMeta',
  components: { XAvatar: __vue_component__$6 },
  props: {
    avatar: S$1,
    title: S$1,
    description: S$1
  },
  data: function data() {
    return { prefix: 'x-list-item-meta' }
  }
};

/* script */
var __vue_script__$H = script$H;

/* template */
var __vue_render__$H = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { class: _vm.prefix }, [
    _c(
      "div",
      { class: _vm.prefix + "_avatar" },
      [_vm._t("avatar", [_c("x-avatar", { attrs: { src: _vm.avatar } })])],
      2
    ),
    _vm._v(" "),
    _c("div", [
      _c(
        "div",
        { class: _vm.prefix + "_title" },
        [_vm._t("title", [_vm._v(_vm._s(_vm.title))])],
        2
      ),
      _vm._v(" "),
      _c(
        "div",
        { class: _vm.prefix + "_desc" },
        [_vm._t("description", [_vm._v(_vm._s(_vm.description))])],
        2
      )
    ])
  ])
};
var __vue_staticRenderFns__$H = [];
__vue_render__$H._withStripped = true;

  /* style */
  var __vue_inject_styles__$H = undefined;
  /* scoped */
  var __vue_scope_id__$H = undefined;
  /* module identifier */
  var __vue_module_identifier__$H = undefined;
  /* functional template */
  var __vue_is_functional_template__$H = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$H = normalizeComponent(
    { render: __vue_render__$H, staticRenderFns: __vue_staticRenderFns__$H },
    __vue_inject_styles__$H,
    __vue_script__$H,
    __vue_scope_id__$H,
    __vue_is_functional_template__$H,
    __vue_module_identifier__$H,
    false,
    undefined,
    undefined,
    undefined
  );

//
var S$2 = String, B$1 = Boolean;
var script$I = {
  name: 'XInput',
  components: { XIcon: __vue_component__, XBtn: __vue_component__$1 },
  props: {
    value: {},
    size: {
      default: 'default',
      validator: function validator(v) {
        return ['small', 'default', 'large'].indexOf(v) !== -1
      }
    },
    clearable: B$1,
    icon: S$2,
    prefix: S$2,
    suffix: S$2,
    search: B$1,
    enterButton: [B$1, S$2],
    autosize: [B$1, Object],
    number: B$1
  },
  data: function data() {
    var _self = this;
    return {
      cls: 'x-input',
      inputVal: this.value,
      listeners: Object.assign({}, this.$listeners,
        {input: function input(e) {
          if (!_self.isText && _self.autosize) {
            var ref = _self.autosize;
            var minRows = ref.minRows;
            var maxRows = ref.maxRows;
            _self.autosize === true ? setAutoHeight(e.target) : setAutoHeight(e.target, minRows, maxRows);
          }
          var val = e.target.value;
          _self.$emit('input', _self.number && val && !isNaN(val) ? +val : val);
        },
        change: function change(e) {
          _self.$emit('on-change', e);
        },
        focus: function focus() {
          _self.$emit('on-focus');
        },
        blur: function blur() {
          _self.$emit('on-blur');
        },
        keyup: function keyup(e) {
          _self.$emit('on-keyup', e);
          if (e.keyCode === 13) {
            _self.$emit('on-enter');
            _self.search && _self.onSearch();
          }
        },
        keydown: function keydown(e) {
          _self.$emit('on-keydown', e);
        },
        keypress: function keypress(e) {
          _self.$emit('on-keypress', e);
        }})
    }
  },
  computed: {
    isText: function isText() {
      return this.$attrs.type !== 'textarea'
    },
    attrs: function attrs() {
      var ref = this;
      var autosize = ref.autosize; if ( autosize === void 0 ) autosize = false;
      var ref$1 = this.$attrs;
      var rows = ref$1.rows; if ( rows === void 0 ) rows = 2;
      if (autosize.minRows && autosize.minRows > rows) {
        rows = autosize.minRows;
      } else if (autosize.maxRows && autosize.maxRows < rows) {
        rows = autosize.maxRows;
      }
      var attrs = Object.assign({}, this.$attrs, {value: this.inputVal, rows: rows});
      return this.isText ? attrs : Object.assign({}, attrs, {is: 'textarea'})
    },
    hasPrefix: function hasPrefix() {
      return this.prefix || this.$slots.prefix
    },
    hasSuffix: function hasSuffix() {
      if (this.icon || this.suffix || this.$slots.suffix || (this.search && !this.enterButton)) {
        return this.clearable ? !this.inputVal : true
      }
    },
    hasSearchIcon: function hasSearchIcon() {
      return this.hasSuffix && !this.icon && !this.suffix && !this.$slots.suffix
    },
    classes: function classes() {
      var ref = this.$slots;
      var prepend = ref.prepend;
      var search = this.search && this.enterButton;
      var append = search || this.$slots.append;
      return [this.cls, this.size && this.isText && ((this.cls) + "_" + (this.size)), { prepend: prepend, append: append, search: search }]
    }
  },
  watch: {
    value: function value(val) {
      this.inputVal = val;
    }
  },
  methods: {
    onClear: function onClear(e) {
      this.$emit('input', '');
      this.$emit('on-clear', e);
    },
    onIconClick: function onIconClick() {
      this.$emit('on-click');
    },
    onSearch: function onSearch() {
      this.focus();
      this.$emit('on-search', this.$refs.Input.value);
    },
    focus: function focus() {
      this.$refs.Input.focus();
    }
  }
};

/* script */
var __vue_script__$I = script$I;
/* template */
var __vue_render__$I = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: _vm.classes },
    [
      _vm.$slots.prepend
        ? _c("div", { class: _vm.cls + "_prepend" }, [_vm._t("prepend")], 2)
        : _vm._e(),
      _vm._v(" "),
      _c(
        "div",
        { class: _vm.cls + "_box" },
        [
          _vm.isText
            ? [
                _vm.hasPrefix
                  ? _c(
                      "span",
                      { class: _vm.cls + "_prefix" },
                      [
                        _vm._t("prefix", [
                          _c("x-icon", { attrs: { type: _vm.prefix } })
                        ])
                      ],
                      2
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.clearable && _vm.inputVal
                  ? _c(
                      "span",
                      {
                        class: _vm.cls + "_suffix clear",
                        on: { click: _vm.onClear }
                      },
                      [_c("x-icon", { attrs: { type: "ios-close" } })],
                      1
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.hasSuffix
                  ? _c(
                      "span",
                      {
                        class: [
                          _vm.cls + "_suffix",
                          { search: _vm.hasSearchIcon }
                        ]
                      },
                      [
                        _vm.icon
                          ? _c("x-icon", {
                              attrs: { type: _vm.icon },
                              on: { click: _vm.onIconClick }
                            })
                          : _vm.suffix || _vm.$slots.suffix
                          ? [
                              _vm._t("suffix", [
                                _c("x-icon", { attrs: { type: _vm.suffix } })
                              ])
                            ]
                          : _c("x-icon", {
                              attrs: { type: "ios-search" },
                              on: { click: _vm.onSearch }
                            })
                      ],
                      2
                    )
                  : _vm._e()
              ]
            : _vm._e(),
          _vm._v(" "),
          _c(
            "input",
            _vm._g(
              _vm._b(
                { ref: "Input", class: _vm.cls + "_input" },
                "input",
                _vm.attrs,
                false
              ),
              _vm.listeners
            )
          )
        ],
        2
      ),
      _vm._v(" "),
      _vm.$slots.append
        ? _c("div", { class: _vm.cls + "_append" }, [_vm._t("append")], 2)
        : _vm.search && _vm.enterButton
        ? _c(
            "x-btn",
            {
              attrs: { type: "primary", size: _vm.size },
              on: { click: _vm.onSearch }
            },
            [
              _vm.enterButton === true
                ? _c("x-icon", { attrs: { type: "ios-search" } })
                : [_vm._v(_vm._s(_vm.enterButton))]
            ],
            2
          )
        : _vm._e()
    ],
    1
  )
};
var __vue_staticRenderFns__$I = [];
__vue_render__$I._withStripped = true;

  /* style */
  var __vue_inject_styles__$I = undefined;
  /* scoped */
  var __vue_scope_id__$I = undefined;
  /* module identifier */
  var __vue_module_identifier__$I = undefined;
  /* functional template */
  var __vue_is_functional_template__$I = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$I = normalizeComponent(
    { render: __vue_render__$I, staticRenderFns: __vue_staticRenderFns__$I },
    __vue_inject_styles__$I,
    __vue_script__$I,
    __vue_scope_id__$I,
    __vue_is_functional_template__$I,
    __vue_module_identifier__$I,
    false,
    undefined,
    undefined,
    undefined
  );

//
var N$1 = Number, S$3 = String, B$2 = Boolean, F = Function, I = Infinity;
var script$J = {
  name: 'XInputNumber',
  components: { XIcon: __vue_component__, XInput: __vue_component__$I },
  props: {
    max: { type: N$1, default: I },
    min: { type: N$1, default: -I
    },
    value: { type: [N$1, S$3], default: 1 },
    step: { type: N$1, default: 1 },
    size: {
      validator: function validator(v) {
        return ['large', 'small', 'default'].indexOf(v) !== -1
      }
    },
    disabled: B$2,
    placeholder: S$3,
    formatter: F,
    parser: F,
    readonly: B$2,
    editable: { type: B$2, default: true },
    precision: N$1
  },
  data: function data() {
    return { prefix: 'x-inputNumber', inputVal: '' }
  },
  computed: {
    showVal: function showVal() {
      return this.formatVal()
    },
    inputProps: function inputProps() {
      var ref = this;
      var size = ref.size;
      var disabled = ref.disabled;
      var placeholder = ref.placeholder;
      return { size: size, disabled: disabled, placeholder: placeholder, readonly: this.readonly || !this.editable }
    },
    disAdd: function disAdd() {
      return +this.inputVal + this.step > this.max
    },
    disMinus: function disMinus() {
      return +this.inputVal - this.step < this.min
    },
    prec: function prec() {
      return this.precision || (('' + this.step).split('.')[1] || '').length
    }
  },
  watch: {
    value: {
      immediate: true,
      handler: function handler(val) {
        this.inputVal = '' + val;
      }
    },
    inputVal: function inputVal(val) {
      if (val) { val = +val; }
      this.$emit('input', val);
      this.$emit('on-change', val);
    }
  },
  methods: {
    add: function add() {
      if (!this.readonly && !this.disAdd) { this.inputVal = '' + (+this.value + this.step).toFixed(this.prec); }
    },
    minus: function minus() {
      if (!this.readonly && !this.disMinus) { this.inputVal = '' + (+this.value - this.step).toFixed(this.prec); }
    },
    getVal: function getVal(val) {
      val = (val + '').trim();
      if (val) {
        if (isNaN(val)) {
          val = this.value;
        } else if (+val > this.max) {
          val = this.max;
        } else if (+val < this.min) {
          val = this.min;
        }
        if (val && !this.prec) { val = parseInt(val); }
      }
      return val
    },
    formatVal: function formatVal() {
      return this.formatter ? this.formatter(this.inputVal) : this.inputVal
    },
    onInput: function onInput(val) {
      if (this.parser) { val = this.parser(val); }
      this.inputVal = this.getVal(val);
      this.$el.querySelector('input').value = this.formatVal(this.inputVal);
    },
    onKeydown: function onKeydown(e) {
      var k = e.keyCode, obj = { 38: this.add, 40: this.minus };
      if (k in obj) { e.preventDefault(), obj[k](); }
    },
    onBlur: function onBlur() {
      this.$emit('on-blur');
      if (this.inputVal) { this.inputVal = (+this.inputVal).toFixed(this.prec); }
    },
    onFocus: function onFocus(e) {
      this.$emit('on-focus', e);
    }
  }
};

/* script */
var __vue_script__$J = script$J;
/* template */
var __vue_render__$J = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: [_vm.prefix, { disabled: _vm.disabled }] },
    [
      _c(
        "x-input",
        _vm._b(
          {
            attrs: { value: _vm.showVal },
            on: {
              input: _vm.onInput,
              "on-keydown": _vm.onKeydown,
              "on-blur": _vm.onBlur,
              "on-focus": _vm.onFocus
            }
          },
          "x-input",
          _vm.inputProps,
          false
        )
      ),
      _vm._v(" "),
      !_vm.disabled
        ? _c("div", { class: _vm.prefix + "_btns" }, [
            _c(
              "a",
              {
                class: [_vm.prefix + "_btn", { disabled: _vm.disAdd }],
                on: { click: _vm.add }
              },
              [_c("x-icon", { attrs: { type: "ios-arrow-up" } })],
              1
            ),
            _vm._v(" "),
            _c(
              "a",
              {
                class: [_vm.prefix + "_btn", { disabled: _vm.disMinus }],
                on: { click: _vm.minus }
              },
              [_c("x-icon", { attrs: { type: "ios-arrow-down" } })],
              1
            )
          ])
        : _vm._e()
    ],
    1
  )
};
var __vue_staticRenderFns__$J = [];
__vue_render__$J._withStripped = true;

  /* style */
  var __vue_inject_styles__$J = undefined;
  /* scoped */
  var __vue_scope_id__$J = undefined;
  /* module identifier */
  var __vue_module_identifier__$J = undefined;
  /* functional template */
  var __vue_is_functional_template__$J = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$J = normalizeComponent(
    { render: __vue_render__$J, staticRenderFns: __vue_staticRenderFns__$J },
    __vue_inject_styles__$J,
    __vue_script__$J,
    __vue_scope_id__$J,
    __vue_is_functional_template__$J,
    __vue_module_identifier__$J,
    false,
    undefined,
    undefined,
    undefined
  );

var S$4 = String;
var F$1 = Function;
var arrProp = { type: Array, default: function () { return []; } };

var props$1 = {
  data: arrProp,
  renderFormat: F$1,
  selectedKeys: arrProp,
  filterable: Boolean,
  filterPlaceholder: S$4,
  filterMethod: F$1,
  notFoundText: S$4
};

//
var script$K = {
  name: 'XTransferBox',
  components: { XInput: __vue_component__$I, XCheckbox: __vue_component__$n, XCheckboxGroup: __vue_component__$o },
  props: Object.assign({}, props$1, {title: S$4, value: arrProp}),
  data: function data() {
    return { prefix: 'x-transfer-box', checkAll: false, selectedValue: this.value, searchValue: '' }
  },
  computed: {
    showedData: function showedData() {
      var val = this.searchValue;
      return val ? this.filterMethod ? this.filterMethod(this.data, val) :
        this.data.filter(function (_) { return _.label && _.label.indexOf(val) > -1; }) : [].concat( this.data )
    },
    disSelectAll: function disSelectAll() {
      return this.showedData.every(function (_) { return _.disabled; })
    },
    countText: function countText() {
      var this$1 = this;

      var total = this.data.length, checkedCount = this.data.filter(function (_) {
        return !_.disabled && this$1.selectedValue.indexOf(_.key) > -1
      }).length;
      return checkedCount ? (checkedCount + "/" + total) : total
    }
  },
  watch: {
    value: function value(val) {
      this.selectedValue = val;
    },
    selectedValue: function selectedValue(val) {
      this.$emit('input', val);
      this.$emit('change', val);
      this.updateCheckAll();
    },
    data: 'updateCheckAll',
    selectedKeys: {
      immediate: true,
      handler: function handler(val) {
        var this$1 = this;

        this.selectedValue = val.filter(function (key) { return this$1.data.some(function (_) { return _.key === key; }); });
      }
    }
  },
  methods: {
    updateCheckAll: function updateCheckAll() {
      var this$1 = this;

      var noDis = this.showedData.filter(function (_) { return !_.disabled; });
      this.checkAll = noDis.length && noDis.every(function (_) { return this$1.selectedValue.indexOf(_.key) > -1; });
    },
    renderItem: function renderItem(item) {
      return this.renderFormat ? this.renderFormat(item) : item.label || item.key
    },
    onCheckAllChange: function onCheckAllChange(checked) {
      var this$1 = this;

      var disAndSelected = this.data.filter(function (_) { return _.disabled && this$1.selectedValue.indexOf(_.key) > -1; });
      this.selectedValue = disAndSelected.concat(checked ? this.showedData.filter(function (_) { return !_.disabled; }) : []).map(function (_) { return _.key; });
    }
  }
};

/* script */
var __vue_script__$K = script$K;

/* template */
var __vue_render__$K = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: _vm.prefix },
    [
      _c(
        "header",
        { class: _vm.prefix + "_header" },
        [
          _c(
            "x-checkbox",
            {
              attrs: { disabled: _vm.disSelectAll },
              on: { "on-change": _vm.onCheckAllChange },
              model: {
                value: _vm.checkAll,
                callback: function($$v) {
                  _vm.checkAll = $$v;
                },
                expression: "checkAll"
              }
            },
            [_vm._v(_vm._s(_vm.title))]
          ),
          _vm._v(" "),
          _c("span", [_vm._v(_vm._s(_vm.countText))])
        ],
        1
      ),
      _vm._v(" "),
      _vm.filterable
        ? _c(
            "div",
            { class: _vm.prefix + "_search" },
            [
              _c("x-input", {
                attrs: {
                  size: "small",
                  search: "",
                  clearable: "",
                  placeholder: _vm.filterPlaceholder
                },
                model: {
                  value: _vm.searchValue,
                  callback: function($$v) {
                    _vm.searchValue = typeof $$v === "string" ? $$v.trim() : $$v;
                  },
                  expression: "searchValue"
                }
              })
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.showedData.length
        ? _c(
            "x-checkbox-group",
            {
              class: _vm.prefix + "_list",
              model: {
                value: _vm.selectedValue,
                callback: function($$v) {
                  _vm.selectedValue = $$v;
                },
                expression: "selectedValue"
              }
            },
            _vm._l(_vm.showedData, function(_) {
              return _c(
                "x-checkbox",
                { key: _.key, attrs: { label: _.key, disabled: _.disabled } },
                [_vm._v(_vm._s(_vm.renderItem(_)))]
              )
            }),
            1
          )
        : _c("p", { class: _vm.prefix + "_empty" }, [
            _vm._v(_vm._s(_vm.notFoundText))
          ]),
      _vm._v(" "),
      _vm.$slots.default
        ? _c(
            "footer",
            { class: _vm.prefix + "_footer" },
            [_vm._t("default")],
            2
          )
        : _vm._e()
    ],
    1
  )
};
var __vue_staticRenderFns__$K = [];
__vue_render__$K._withStripped = true;

  /* style */
  var __vue_inject_styles__$K = undefined;
  /* scoped */
  var __vue_scope_id__$K = undefined;
  /* module identifier */
  var __vue_module_identifier__$K = undefined;
  /* functional template */
  var __vue_is_functional_template__$K = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$K = normalizeComponent(
    { render: __vue_render__$K, staticRenderFns: __vue_staticRenderFns__$K },
    __vue_inject_styles__$K,
    __vue_script__$K,
    __vue_scope_id__$K,
    __vue_is_functional_template__$K,
    __vue_module_identifier__$K,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$L = {
  name: 'XTransfer',
  components: { XBox: __vue_component__$K, XIcon: __vue_component__, XBtn: __vue_component__$1 },
  props: Object.assign({}, props$1,
    {operations: arrProp,
    targetKeys: arrProp,
    listStyle: { type: Object, default: function () { return ({}); } },
    notFoundText: { type: S$4, default: '列表为空' },
    titles: { type: Array, default: function () { return ['源列表', '目标列表']; } },
    filterPlaceholder: { type: S$4, default: '请输入搜索内容' }}),
  data: function data() {
    return { prefix: 'x-transfer', selectedData: { left: [], right: [] } }
  },
  computed: {
    convertData: function convertData() {
      var this$1 = this;

      return this.data.reduce(function (acc, _) {
        return acc[this$1.targetKeys.indexOf(_.key) < 0 ? 'left' : 'right'].push(_), acc
      }, { left: [], right: [] })
    },
    boxProps: function boxProps() {
      var props = Object.assign({}, this.$props, {style: this.listStyle}), data = this.convertData;
      return {
        left: Object.assign({}, props, {data: data.left, title: this.titles[0]}),
        right: Object.assign({}, props, {data: data.right, title: this.titles[1]})
      }
    },
    btnProps: function btnProps() {
      var props = { type: 'primary', size: 'small' }, data = this.convertData;
      var ref = this.selectedData;
      var left = ref.left;
      var right = ref.right;
      var disToLeft = data.right.filter(function (_) { return !_.disabled; }).every(function (_) { return right.indexOf(_.key) < 0; });
      var disToRight = data.left.filter(function (_) { return !_.disabled; }).every(function (_) { return left.indexOf(_.key) < 0; });
      return { toLeft: Object.assign({}, props, {disabled: disToLeft}), toRight: Object.assign({}, props, {disabled: disToRight}) }
    }
  },
  watch: {
    data: {
      immediate: true,
      handler: function handler(val) {
        var rtnData = { left: [], right: [] };
        var ref = this;
        var selectedData = ref.selectedData;
        var data = ref.convertData;
        var leftKeys = data.left.map(function (_) { return _.key; }), rightKeys = data.right.map(function (_) { return _.key; });
        selectedData.left.forEach(function (key) { return leftKeys.indexOf(key) > 0 && rtnData.left.push(key); });
        selectedData.right.forEach(function (key) { return rightKeys.indexOf(key) > 0 && rtnData.right.push(key); });
        this.selectedData = rtnData;
      }
    }
  },
  methods: {
    getCanMoved: function getCanMoved(keys, data) {
      return keys.reduce(function (acc, key) {
        var isDis = data.find(function (_) { return _.key === key; }).disabled;
        return acc[isDis ? 'noMoved' : 'moved'].push(key), acc
      }, { moved: [], noMoved: [] })
    },
    moveToLeft: function moveToLeft() {
      var ref = this;
      var convertData = ref.convertData;
      var selectedData = ref.selectedData;
      var data = this.getCanMoved(selectedData.right, convertData.right), moveKeys = data.moved;
      selectedData.right = data.noMoved;
      var targetKeys = convertData.right.filter(function (_) { return moveKeys.indexOf(_.key) < 0; }).map(function (_) { return _.key; });
      this.$emit('on-change', targetKeys, 'left', moveKeys);
    },
    moveToRight: function moveToRight() {
      var ref = this;
      var convertData = ref.convertData;
      var selectedData = ref.selectedData;
      var data = this.getCanMoved(selectedData.left, convertData.left), moveKeys = data.moved;
      selectedData.left = data.noMoved;
      var targetKeys = convertData.right.map(function (_) { return _.key; }).concat(moveKeys);
      this.$emit('on-change', targetKeys, 'right', moveKeys);
    },
    onSelectChange: function onSelectChange() {
      this.$emit('on-selected-change', this.selectedData.left, this.selectedData.right);
    }
  }
};

/* script */
var __vue_script__$L = script$L;
/* template */
var __vue_render__$L = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    [
      _c(
        "x-box",
        _vm._b(
          {
            on: { change: _vm.onSelectChange },
            model: {
              value: _vm.selectedData.left,
              callback: function($$v) {
                _vm.$set(_vm.selectedData, "left", $$v);
              },
              expression: "selectedData.left"
            }
          },
          "x-box",
          _vm.boxProps.left,
          false
        ),
        [_vm._t("default")],
        2
      ),
      _vm._v(" "),
      _c(
        "div",
        { class: _vm.prefix + "_btns" },
        [
          _c(
            "x-btn",
            _vm._b(
              { on: { click: _vm.moveToLeft } },
              "x-btn",
              _vm.btnProps.toLeft,
              false
            ),
            [
              _c("x-icon", { attrs: { type: "ios-arrow-left" } }),
              _vm._v(_vm._s(_vm.operations[0]))
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "x-btn",
            _vm._b(
              { on: { click: _vm.moveToRight } },
              "x-btn",
              _vm.btnProps.toRight,
              false
            ),
            [
              _vm._v(_vm._s(_vm.operations[1])),
              _c("x-icon", { attrs: { type: "ios-arrow-right" } })
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "x-box",
        _vm._b(
          {
            on: { change: _vm.onSelectChange },
            model: {
              value: _vm.selectedData.right,
              callback: function($$v) {
                _vm.$set(_vm.selectedData, "right", $$v);
              },
              expression: "selectedData.right"
            }
          },
          "x-box",
          _vm.boxProps.right,
          false
        ),
        [_vm._t("default")],
        2
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$L = [];
__vue_render__$L._withStripped = true;

  /* style */
  var __vue_inject_styles__$L = undefined;
  /* scoped */
  var __vue_scope_id__$L = undefined;
  /* module identifier */
  var __vue_module_identifier__$L = undefined;
  /* functional template */
  var __vue_is_functional_template__$L = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$L = normalizeComponent(
    { render: __vue_render__$L, staticRenderFns: __vue_staticRenderFns__$L },
    __vue_inject_styles__$L,
    __vue_script__$L,
    __vue_scope_id__$L,
    __vue_is_functional_template__$L,
    __vue_module_identifier__$L,
    false,
    undefined,
    undefined,
    undefined
  );

//
var N$2 = Number, B$3 = Boolean, numProp = { type: N$2, default: 0 };
var script$M = {
  name: 'XAnchor',
  props: {
    affix: { type: B$3, default: true },
    offsetTop: numProp,
    offsetBottom: N$2,
    scrollOffset: numProp,
    showInk: B$3
  },
  data: function data() {
    return { prefix: 'x-anchor', ballStyle: {}, items: [], href: '' }
  },
  computed: {
    bindProps: function bindProps() {
      return Object.assign({}, {class: this.prefix,
        offsetTop: this.offsetTop,
        offsetBottom: this.offsetBottom},
        (this.affix ? { is: __vue_component__$4 } : {}))
    }
  },
  directives: { winscroll: winscroll },
  watch: {
    href: function href(newval, oldval) {
      this.$emit('on-change', [newval, oldval]);
    }
  },
  mounted: function mounted() {
    this.update();
  },
  methods: {
    update: function update() {
      var this$1 = this;

      this.items.forEach(function (_) {
        _.active = false;
        var el = document.querySelector(_.href);
        if (el) {
          var rect = el.getBoundingClientRect();
          var scrollOffset = _.scrollOffset || this$1.scrollOffset;
          if (rect.top <= scrollOffset && rect.bottom > 0) {
            _.active = true;
            this$1.href = _.href;
            if (this$1.showInk) {
              this$1.$nextTick(function () {
                var ballHeight = this$1.$refs.Ball.offsetHeight;
                this$1.ballStyle = { top: ((_.$el.offsetTop + (_.$el.offsetHeight - ballHeight) / 2) + "px") };
              });
            }
          }
        }
      });
    },
    onScroll: function onScroll() {
      return throttle(this.update, 50)
    },
    addItem: function addItem(vm) {
      this.items.push(vm);
    },
    removeItem: function removeItem(vm) {
      this.items.splice(this.items.indexOf(vm), 1);
    }
  }
};

/* script */
var __vue_script__$M = script$M;
/* template */
var __vue_render__$M = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    _vm._b({}, "div", _vm.bindProps, false),
    [
      _c(
        "div",
        {
          directives: [
            {
              name: "winscroll",
              rawName: "v-winscroll",
              value: _vm.onScroll(),
              expression: "onScroll()"
            }
          ],
          class: _vm.prefix + "_ink"
        },
        [
          _vm.showInk
            ? _c("span", {
                ref: "Ball",
                class: _vm.prefix + "_ball",
                style: _vm.ballStyle
              })
            : _vm._e()
        ]
      ),
      _vm._v(" "),
      _vm._t("default")
    ],
    2
  )
};
var __vue_staticRenderFns__$M = [];
__vue_render__$M._withStripped = true;

  /* style */
  var __vue_inject_styles__$M = undefined;
  /* scoped */
  var __vue_scope_id__$M = undefined;
  /* module identifier */
  var __vue_module_identifier__$M = undefined;
  /* functional template */
  var __vue_is_functional_template__$M = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$M = normalizeComponent(
    { render: __vue_render__$M, staticRenderFns: __vue_staticRenderFns__$M },
    __vue_inject_styles__$M,
    __vue_script__$M,
    __vue_scope_id__$M,
    __vue_is_functional_template__$M,
    __vue_module_identifier__$M,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$N = {
  name: 'XAnchorLink',
  props: {
    href: String,
    title: String,
    scrollOffset: { type: Number, default: 0 }
  },
  data: function data() {
    return { active: false }
  },
  mounted: function mounted() {
    this.parent = findParent(this, 'XAnchor');
    this.parent.addItem(this);
  },
  beforeDestroy: function beforeDestroy() {
    this.parent.removeItem(this);
  },
  methods: {
    onClick: function onClick(e) {
      this.parent.$emit('on-select', this.href);
      var el = document.querySelector(this.href);
      if (el) {
        var id = el.id, start = window.scrollY, end = getOffset(el).top;
        el.id = '';
        location.hash = this.href;
        this[start > end ? 'toTop' : 'toBottom'](start, end, function () { return el.id = id; });
      }
    },
    toTop: function toTop(start, end, cb) {
      var this$1 = this;
 // start > end
      var ms = 16, step = (start - end) / (300 / ms), current = end + this.scrollOffset;
      this.tid = setInterval(function () {
        if (start > current) {
          start -= step;
          window.scrollTo(window.scrollX, start);
        } else {
          clearInterval(this$1.tid);
          this$1.tid = null;
          window.scrollTo(window.scrollX, current);
          cb && cb();
        }
      }, ms);
    },
    toBottom: function toBottom(start, end, cb) {
      var this$1 = this;
 // start < end
      var ms = 16, step = (end - start) / (300 / ms), current = end + this.scrollOffset;
      this.tid = setInterval(function () {
        if (start < current) {
          start += step;
          window.scrollTo(window.scrollX, start);
        } else {
          clearInterval(this$1.tid);
          this$1.tid = null;
          window.scrollTo(window.scrollX, current);
          cb && cb();
        }
      }, ms);
    }
  }
};

/* script */
var __vue_script__$N = script$N;
/* template */
var __vue_render__$N = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: ["x-anchor-link", { active: _vm.active }] },
    [
      _c(
        "a",
        {
          attrs: { href: _vm.href },
          on: {
            click: function($event) {
              $event.preventDefault();
              return _vm.onClick($event)
            }
          }
        },
        [_vm._v(_vm._s(_vm.title))]
      ),
      _vm._v(" "),
      _vm._t("default")
    ],
    2
  )
};
var __vue_staticRenderFns__$N = [];
__vue_render__$N._withStripped = true;

  /* style */
  var __vue_inject_styles__$N = undefined;
  /* scoped */
  var __vue_scope_id__$N = undefined;
  /* module identifier */
  var __vue_module_identifier__$N = undefined;
  /* functional template */
  var __vue_is_functional_template__$N = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$N = normalizeComponent(
    { render: __vue_render__$N, staticRenderFns: __vue_staticRenderFns__$N },
    __vue_inject_styles__$N,
    __vue_script__$N,
    __vue_scope_id__$N,
    __vue_is_functional_template__$N,
    __vue_module_identifier__$N,
    false,
    undefined,
    undefined,
    undefined
  );

//
var S$5 = String, B$4 = Boolean, N$3 = Number;
var script$O = {
  name: 'XCarousel',
  components: { XIcon: __vue_component__ },
  props: {
    value: { type: N$3, default: 0 },
    height: { type: [S$5, N$3], default: 'auto' },
    loop: B$4,
    autoplay: B$4,
    autoplaySpeed: { type: N$3, default: 2000 },
    dots: {
      default: 'inside',
      validator: function validator(v) {
        return ['inside', 'outside', 'none'].indexOf(v) !== -1
      }
    },
    radiusDot: B$4,
    trigger: {
      default: 'click',
      validator: function validator(v) {
        return ['click', 'hover'].indexOf(v) !== -1
      }
    },
    arrow: {
      default: 'hover',
      validator: function validator(v) {
        return ['hover', 'always', 'never'].indexOf(v) !== -1
      }
    },
    easing: { type: S$5, default: 'ease' }
  },
  data: function data() {
    return { prefix: 'x-carousel', curIndex: this.value, items: [], listStyle: this.getListStyle() }
  },
  computed: {
    count: function count() {
      return this.items.length / 2
    },
    disPrev: function disPrev() {
      return !this.loop && this.curIndex === 0
    },
    disNext: function disNext() {
      return !this.loop && this.curIndex === this.count - 1
    }
  },
  watch: {
    value: function value(val) {
      this.curIndex = val;
    },
    curIndex: function curIndex(newval, oldval) {
      this.$emit('input', newval);
      this.$emit('on-change', oldval, newval);
    }
  },
  mounted: function mounted() {
    var this$1 = this;

    this.unwatch = this.$watch(
      function () { return ((this$1.autoplay) + " " + (this$1.autoplaySpeed)); }, 
      this.startTimer, 
      { immediate: true }
    );
  },
  beforeDestroy: function beforeDestroy() {
    this.unwatch();
  },
  methods: {
    addItem: function addItem(vm) { // 添加项 项被挂载时
      this.items.push(vm);
    },
    removeItem: function removeItem(vm) { // 移除项 项被注销时
      this.items.splice(this.items.indexOf(vm), 1);
    },
    itemClick: function itemClick(vm) { // 项单击 发射索引值
      this.$emit('on-click', this.items.indexOf(vm));
    },
    getListStyle: function getListStyle(hasAnimate) { // 获取列表样式
      var style = {
        height: parseSize(this.height),
        transform: ("translateX(-" + (this.curIndex * 100) + "%)")
      };
      return hasAnimate ? Object.assign({}, style, {transition: ("transform .5s " + (this.easing))}) : style
    },
    setListStyle: function setListStyle(hasAnimate) { // 设置列表样式
      this.listStyle = this.getListStyle(hasAnimate);
    },
    toPrev: function toPrev() {
      var this$1 = this;
 // 切换到前一个
      if (--this.curIndex < 0) {
        this.curIndex = this.count;
        this.setListStyle();
        return setTimeout(function () {
          this$1.curIndex--;
          this$1.setListStyle(true);
        }, 0)
      }
      this.setListStyle(true);
    },
    toNext: function toNext() { // 切换到下一个
      if (this.returning) { return }
      this.curIndex++;
      this.setListStyle(true);
      if (this.curIndex > this.count - 1) {
        this.curIndex = 0;
        this.returning = true;
      }
    },
    toIndex: function toIndex(i, e) { // 切换到指定索引
      if (
        (this.trigger === 'click' && e.type === 'click') ||
        (this.trigger === 'hover' && e.type === 'mouseover')
      ) {
        this.curIndex = i - 1;
        this.setListStyle(true);
      }
    },
    onTransitionend: function onTransitionend() { // 过渡结束
      this.returning = false;
      this.setListStyle();
    },
    startTimer: function startTimer() {
      var this$1 = this;
 // 开始定时器
      this.stopTimer();
      if (this.autoplay) { this.tid = setInterval(function () { return this$1.toNext(); }, this.autoplaySpeed); }
    },
    stopTimer: function stopTimer() { // 停止定时器
      clearInterval(this.tid);
    }
  }
};

/* script */
var __vue_script__$O = script$O;
/* template */
var __vue_render__$O = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      class: [_vm.prefix, _vm.arrow],
      on: { mouseenter: _vm.stopTimer, mouseleave: _vm.startTimer }
    },
    [
      _c("div", { class: _vm.prefix + "_box" }, [
        _c(
          "div",
          {
            class: _vm.prefix + "_list",
            style: _vm.listStyle,
            on: { transitionend: _vm.onTransitionend }
          },
          [_vm._t("default"), _vm._v(" "), _vm._t("default")],
          2
        )
      ]),
      _vm._v(" "),
      _c(
        "button",
        {
          class: _vm.prefix + "_arrow prev",
          attrs: { disabled: _vm.disPrev },
          on: { click: _vm.toPrev }
        },
        [_c("x-icon", { attrs: { type: "chevron-left" } })],
        1
      ),
      _vm._v(" "),
      _c(
        "button",
        {
          class: _vm.prefix + "_arrow next",
          attrs: { disabled: _vm.disNext },
          on: { click: _vm.toNext }
        },
        [_c("x-icon", { attrs: { type: "chevron-right" } })],
        1
      ),
      _vm._v(" "),
      _c(
        "ul",
        {
          class: [_vm.prefix + "_dots", _vm.dots, { radiusDot: _vm.radiusDot }]
        },
        _vm._l(_vm.count, function(i) {
          return _c("li", {
            key: i,
            class: { active: i === _vm.curIndex + 1 },
            on: {
              click: function($event) {
                return _vm.toIndex(i, $event)
              },
              mouseover: function($event) {
                return _vm.toIndex(i, $event)
              }
            }
          })
        }),
        0
      )
    ]
  )
};
var __vue_staticRenderFns__$O = [];
__vue_render__$O._withStripped = true;

  /* style */
  var __vue_inject_styles__$O = undefined;
  /* scoped */
  var __vue_scope_id__$O = undefined;
  /* module identifier */
  var __vue_module_identifier__$O = undefined;
  /* functional template */
  var __vue_is_functional_template__$O = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$O = normalizeComponent(
    { render: __vue_render__$O, staticRenderFns: __vue_staticRenderFns__$O },
    __vue_inject_styles__$O,
    __vue_script__$O,
    __vue_scope_id__$O,
    __vue_is_functional_template__$O,
    __vue_module_identifier__$O,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//

var script$P = {
  name: 'XCarouselItem',
  mounted: function mounted() {
    this.$parent.addItem(this);
  },
  beforeDestroy: function beforeDestroy() {
    this.$parent.removeItem(this);
  },
  methods: {
    onClick: function onClick() {
      this.$parent.itemClick(this);
    }
  }
};

/* script */
var __vue_script__$P = script$P;

/* template */
var __vue_render__$P = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "x-carousel-item", on: { click: _vm.onClick } },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$P = [];
__vue_render__$P._withStripped = true;

  /* style */
  var __vue_inject_styles__$P = undefined;
  /* scoped */
  var __vue_scope_id__$P = undefined;
  /* module identifier */
  var __vue_module_identifier__$P = undefined;
  /* functional template */
  var __vue_is_functional_template__$P = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$P = normalizeComponent(
    { render: __vue_render__$P, staticRenderFns: __vue_staticRenderFns__$P },
    __vue_inject_styles__$P,
    __vue_script__$P,
    __vue_scope_id__$P,
    __vue_is_functional_template__$P,
    __vue_module_identifier__$P,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$Q = {
  name: 'XTreeNode',
  components: { XIcon: __vue_component__, XLoading: __vue_component__$z, XCheckbox: __vue_component__$n, XRender: XRender },
  props: { data: Object, render: Function },
  data: function data() {
    return { prefix: 'x-tree-node', parent: null }
  },
  computed: {
    renderFn: function renderFn() {
      return this.data.render || this.render
    },
    root: function root() {
      return this.parent ? this.parent.flatData : []
    },
    hasArrow: function hasArrow() {
      return this.data.children && (this.parent && this.parent.loadData ? true : this.data.children.length)
    },
    labelClass: function labelClass() {
      return [((this.prefix) + "_label"), { selected: this.data.selected, isRender: this.renderFn }]
    }
  },
  mounted: function mounted() {
    this.parent = findParent(this, 'XTree');
  },
  methods: {
    onSelect: function onSelect() {
      if (!this.data.disabled) { this.parent.updateSelectedNodes(this.data); }
    },
    onCheckChange: function onCheckChange() {
      this.parent.checkChange(this.data);
    },
    onToggleExpand: function onToggleExpand() {
      this.parent.toggleExpand(this.data);
    }
  }
};

/* script */
var __vue_script__$Q = script$Q;
/* template */
var __vue_render__$Q = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: _vm.prefix },
    [
      _c(
        "div",
        { class: _vm.prefix + "_title" },
        [
          _c(
            "span",
            { class: _vm.prefix + "_icon" },
            [
              _vm.data.loading
                ? _c("x-loading", {
                    attrs: {
                      iconClass: _vm.prefix + "_loadingIcon",
                      loading: ""
                    }
                  })
                : _vm.hasArrow
                ? _c("x-icon", {
                    class: [_vm.prefix + "_arrow", { expand: _vm.data.expand }],
                    attrs: { type: "ios-arrow-forward" },
                    on: { click: _vm.onToggleExpand }
                  })
                : _vm._e()
            ],
            1
          ),
          _vm._v(" "),
          _c("x-checkbox", {
            class: _vm.prefix + "_checkbox",
            attrs: {
              indeterminate: _vm.data.indeterminate,
              disabled: _vm.data.disableCheckbox || _vm.data.disabled
            },
            on: { "on-change": _vm.onCheckChange },
            model: {
              value: _vm.data.checked,
              callback: function($$v) {
                _vm.$set(_vm.data, "checked", $$v);
              },
              expression: "data.checked"
            }
          }),
          _vm._v(" "),
          _c(
            "span",
            { class: _vm.labelClass, on: { click: _vm.onSelect } },
            [
              _vm.renderFn
                ? _c("x-render", {
                    attrs: {
                      render: _vm.renderFn,
                      data: _vm.data,
                      root: _vm.root
                    }
                  })
                : _c("div", { domProps: { innerHTML: _vm._s(_vm.data.title) } })
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _vm.data.children && _vm.data.expand
        ? _vm._l(_vm.data.children, function(_, i) {
            return _c("x-tree-node", {
              key: i,
              class: _vm.prefix + "_child",
              attrs: { data: _, render: _vm.render }
            })
          })
        : _vm._e()
    ],
    2
  )
};
var __vue_staticRenderFns__$Q = [];
__vue_render__$Q._withStripped = true;

  /* style */
  var __vue_inject_styles__$Q = undefined;
  /* scoped */
  var __vue_scope_id__$Q = undefined;
  /* module identifier */
  var __vue_module_identifier__$Q = undefined;
  /* functional template */
  var __vue_is_functional_template__$Q = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$Q = normalizeComponent(
    { render: __vue_render__$Q, staticRenderFns: __vue_staticRenderFns__$Q },
    __vue_inject_styles__$Q,
    __vue_script__$Q,
    __vue_scope_id__$Q,
    __vue_is_functional_template__$Q,
    __vue_module_identifier__$Q,
    false,
    undefined,
    undefined,
    undefined
  );

//
var key = 0, B$5 = Boolean, F$2 = Function;
var script$R = {
  name: 'XTree',
  components: { XNode: __vue_component__$Q },
  props: {
    data: { type: Array, default: function () { return []; } },
    multiple: B$5,
    showCheckbox: B$5,
    emptyText: { type: String, default: '暂无数据' },
    loadData: F$2,
    render: F$2,
    checkStrictly: B$5,
    checkDirectly: B$5
  },
  data: function data() {
    return { flatData: [] }
  },
  watch: {
    data: {
      deep: true,
      immediate: true,
      handler: function handler() {
        this.createFlatData();
        this.updateCheckedNodes();
      }
    }
  },
  methods: {
    createFlatData: function createFlatData() { // 转化为一维数组
      var flatData = [];
      var ref = this;
      var data = ref.data;
      var loop = function () {
        var arr = [];
        data.forEach(function (_) {
          if (_.nodeKey === undefined) { _.nodeKey = ++key; }
          flatData.push(_);
          _.children && arr.push.apply(arr, _.children);
        });
        data = arr;
      };

      while (data.length) loop();
      this.flatData = flatData;
    },
    updateSelectedNodes: function updateSelectedNodes(item) {
      var this$1 = this;
 // 更新选中的节点
      if (this.checkDirectly) {
        this.$set(item, 'checked', !item.checked);
        this.checkChange(item);
      } else {
        var selected = item.selected;
        if (!this.multiple) { this.flatData.forEach(function (_) { return this$1.$set(_, 'selected', false); }); }
        this.$set(item, 'selected', !selected);
        this.$emit('on-select-change', this.getSelectedNodes(), item);
      }
    },
    updateCheckedNodes: function updateCheckedNodes(item) {
      var this$1 = this;
      if ( item === void 0 ) item = {};
 // 更新勾选的节点 先子后父遍历
      if (!this.checkStrictly) {
        var eachData = item.children || [];
        var loop = function () {
          var arr = [];
          eachData.forEach(function (_) {
            this$1.$set(_, 'checked', item.checked);
            _.children && arr.push.apply(arr, _.children);
          });
          eachData = arr;
        };

        while (eachData.length) loop();
        var data = [].concat( this.flatData );
        data.reverse();
        data.forEach(function (_) {
          if (_.children && _.children.length) {
            var checkeds = _.children.filter(function (__) { return __.checked; });
            var hasIndeterminate = _.children.some(function (__) { return __.indeterminate; });
            this$1.$set(_, 'checked', checkeds.length === _.children.length);
            this$1.$set(_, 'indeterminate', hasIndeterminate || (checkeds.length > 0 && checkeds.length < _.children.length));
          }
        });
      }
    },
    checkChange: function checkChange(item) { // 勾选改变处理
      this.updateCheckedNodes(item);
      this.$emit('on-check-change', this.getCheckedNodes(), item);
    },
    toggleExpand: function toggleExpand(item) {
      var this$1 = this;
 // 节点的展开和收起
      this.$set(item, 'expand', !item.expand);
      if (!item.children.length && this.loadData) {
        this.$set(item, 'loading', true);
        this.loadData(item, function (data) {
          data.forEach(function (_) { return _.checked = item.checked; });
          item.children = data;
          this$1.$set(item, 'loading', false);
        });
      }
      this.$emit('on-toggle-expand', item);
    },
    getCheckedNodes: function getCheckedNodes() { // API方法 **不可改名** 获取被勾选的节点
      return this.flatData.filter(function (_) { return _.checked; })
    },
    getSelectedNodes: function getSelectedNodes() { // API方法 **不可改名** 获取被选中的节点
      return this.flatData.filter(function (_) { return _.selected; })
    },
    getCheckedAndIndeterminateNodes: function getCheckedAndIndeterminateNodes() { // API方法 **不可改名** 获取选中及半选节点
      return this.flatData.filter(function (_) { return _.checked || _.indeterminate; })
    }
  }
};

/* script */
var __vue_script__$R = script$R;

/* template */
var __vue_render__$R = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "x-tree", class: { showCheckbox: _vm.showCheckbox } },
    _vm._l(_vm.data, function(_, i) {
      return _c("x-node", { key: i, attrs: { data: _, render: _vm.render } })
    }),
    1
  )
};
var __vue_staticRenderFns__$R = [];
__vue_render__$R._withStripped = true;

  /* style */
  var __vue_inject_styles__$R = undefined;
  /* scoped */
  var __vue_scope_id__$R = undefined;
  /* module identifier */
  var __vue_module_identifier__$R = undefined;
  /* functional template */
  var __vue_is_functional_template__$R = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$R = normalizeComponent(
    { render: __vue_render__$R, staticRenderFns: __vue_staticRenderFns__$R },
    __vue_inject_styles__$R,
    __vue_script__$R,
    __vue_scope_id__$R,
    __vue_is_functional_template__$R,
    __vue_module_identifier__$R,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//

var script$S = {
  name: 'XLayout',
  data: function data() {
    return { hasSider: false }
  },
  mounted: function mounted() {
    this.hasSider = this.$children.some(function (_) { return _.$options.name === 'XSider'; });
  }
};

/* script */
var __vue_script__$S = script$S;
/* template */
var __vue_render__$S = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: ["x-layout", { hasSider: _vm.hasSider }] },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$S = [];
__vue_render__$S._withStripped = true;

  /* style */
  var __vue_inject_styles__$S = undefined;
  /* scoped */
  var __vue_scope_id__$S = undefined;
  /* module identifier */
  var __vue_module_identifier__$S = undefined;
  /* functional template */
  var __vue_is_functional_template__$S = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$S = normalizeComponent(
    { render: __vue_render__$S, staticRenderFns: __vue_staticRenderFns__$S },
    __vue_inject_styles__$S,
    __vue_script__$S,
    __vue_scope_id__$S,
    __vue_is_functional_template__$S,
    __vue_module_identifier__$S,
    false,
    undefined,
    undefined,
    undefined
  );

/* script */

/* template */
var __vue_render__$T = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "x-layout-header" }, [_vm._t("default")], 2)
};
var __vue_staticRenderFns__$T = [];
__vue_render__$T._withStripped = true;

  /* style */
  var __vue_inject_styles__$T = undefined;
  /* scoped */
  var __vue_scope_id__$T = undefined;
  /* module identifier */
  var __vue_module_identifier__$T = undefined;
  /* functional template */
  var __vue_is_functional_template__$T = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$T = normalizeComponent(
    { render: __vue_render__$T, staticRenderFns: __vue_staticRenderFns__$T },
    __vue_inject_styles__$T,
    {},
    __vue_scope_id__$T,
    __vue_is_functional_template__$T,
    __vue_module_identifier__$T,
    false,
    undefined,
    undefined,
    undefined
  );

/* script */

/* template */
var __vue_render__$U = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "x-layout-content" }, [_vm._t("default")], 2)
};
var __vue_staticRenderFns__$U = [];
__vue_render__$U._withStripped = true;

  /* style */
  var __vue_inject_styles__$U = undefined;
  /* scoped */
  var __vue_scope_id__$U = undefined;
  /* module identifier */
  var __vue_module_identifier__$U = undefined;
  /* functional template */
  var __vue_is_functional_template__$U = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$U = normalizeComponent(
    { render: __vue_render__$U, staticRenderFns: __vue_staticRenderFns__$U },
    __vue_inject_styles__$U,
    {},
    __vue_scope_id__$U,
    __vue_is_functional_template__$U,
    __vue_module_identifier__$U,
    false,
    undefined,
    undefined,
    undefined
  );

/* script */

/* template */
var __vue_render__$V = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "x-layout-footer" }, [_vm._t("default")], 2)
};
var __vue_staticRenderFns__$V = [];
__vue_render__$V._withStripped = true;

  /* style */
  var __vue_inject_styles__$V = undefined;
  /* scoped */
  var __vue_scope_id__$V = undefined;
  /* module identifier */
  var __vue_module_identifier__$V = undefined;
  /* functional template */
  var __vue_is_functional_template__$V = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$V = normalizeComponent(
    { render: __vue_render__$V, staticRenderFns: __vue_staticRenderFns__$V },
    __vue_inject_styles__$V,
    {},
    __vue_scope_id__$V,
    __vue_is_functional_template__$V,
    __vue_module_identifier__$V,
    false,
    undefined,
    undefined,
    undefined
  );

//
var B$6 = Boolean, NS$1 = [Number, String];
var script$T = {
  name: 'XSider',
  components: { XIcon: __vue_component__ },
  props: {
    value: B$6,
    width: { type: NS$1, default: 200 },
    collapsible: B$6,
    collapsedWidth: { type: NS$1, default: 64 },
    hideTrigger: B$6,
    defaultCollapsed: B$6,
    reverseArrow: B$6,
    breakpoint: {
      validator: function validator(v) {
        return ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(v) > -1
      }
    }
  },
  data: function data() {
    return {
      prefix: 'x-layout-sider',
      isCollapsed: this.value || this.defaultCollapsed,
      zeroTrigger: { visible: false, clicked: false }
    }
  },
  computed: {
    styles: function styles() {
      var size = parseSize(this.isCollapsed ? this.zeroTrigger.visible ? 0 : this.collapsedWidth : this.width);
      return { width: size, minWidth: size, maxWidth: size, flex: ("0 0 " + size) }
    },
    showTrigger: function showTrigger() {
      return !this.hideTrigger && this.collapsible
    },
    triggerIcon: function triggerIcon() {
      return ("ios-arrow-" + (this.reverseArrow ? 'forward' : 'back'))
    }
  },
  directives: { winresize: winresize },
  watch: {
    value: function value(val) {
      this.isCollapsed = val;
    },
    isCollapsed: function isCollapsed(val) {
      this.$emit('input', val);
      this.$emit('on-collapse', val);
    }
  },
  mounted: function mounted() {
    this.onWinResize()();
  },
  methods: {
    toggleCollapse: function toggleCollapse() {
      if (this.collapsible) { this.isCollapsed = !this.isCollapsed; }
    },
    toggleCollapseByZeroTrigger: function toggleCollapseByZeroTrigger() {
      this.toggleCollapse();
      this.zeroTrigger.clicked = true;
    },
    setResponsive: function setResponsive(num) {
      var winWidth = window.innerWidth;
      if (this.zeroTrigger.clicked) {
        if (winWidth > num) { this.zeroTrigger = { visible: false, click: false }; }
      } else {
        this.isCollapsed = window.innerWidth < num;
        this.zeroTrigger.visible = this.isCollapsed;
      }
    },
    onWinResize: function onWinResize() {
      var this$1 = this;

      return throttle(function () {
        this$1.breakpoint && this$1.collapsible && this$1.setResponsive(
          { xs: 480, sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1600 }[this$1.breakpoint]
        );
      }, 50)
    }
  }
};

/* script */
var __vue_script__$T = script$T;

/* template */
var __vue_render__$W = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      directives: [
        {
          name: "winresize",
          rawName: "v-winresize",
          value: _vm.onWinResize(),
          expression: "onWinResize()"
        }
      ],
      class: _vm.prefix,
      style: _vm.styles
    },
    [
      _vm._t("default"),
      _vm._v(" "),
      _vm.zeroTrigger.visible
        ? _c(
            "span",
            {
              class: _vm.prefix + "_zeroWidthTrigger",
              on: { click: _vm.toggleCollapseByZeroTrigger }
            },
            [_c("x-icon", { attrs: { type: "navicon" } })],
            1
          )
        : _vm.showTrigger
        ? _c(
            "div",
            {
              class: _vm.prefix + "_trigger",
              style: { width: _vm.styles.width },
              on: { click: _vm.toggleCollapse }
            },
            [
              _c("x-icon", {
                class: [
                  _vm.prefix + "_triggerIcon",
                  { isCollapsed: _vm.isCollapsed }
                ],
                attrs: { type: _vm.triggerIcon }
              })
            ],
            1
          )
        : _vm._e()
    ],
    2
  )
};
var __vue_staticRenderFns__$W = [];
__vue_render__$W._withStripped = true;

  /* style */
  var __vue_inject_styles__$W = undefined;
  /* scoped */
  var __vue_scope_id__$W = undefined;
  /* module identifier */
  var __vue_module_identifier__$W = undefined;
  /* functional template */
  var __vue_is_functional_template__$W = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$W = normalizeComponent(
    { render: __vue_render__$W, staticRenderFns: __vue_staticRenderFns__$W },
    __vue_inject_styles__$W,
    __vue_script__$T,
    __vue_scope_id__$W,
    __vue_is_functional_template__$W,
    __vue_module_identifier__$W,
    false,
    undefined,
    undefined,
    undefined
  );

function getBoundingClientRect(element) {
  var rect = element.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    x: rect.left,
    y: rect.top
  };
}

/*:: import type { Window } from '../types'; */

/*:: declare function getWindow(node: Node | Window): Window; */
function getWindow(node) {
  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView : window;
  }

  return node;
}

function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}

/*:: declare function isElement(node: mixed): boolean %checks(node instanceof
  Element); */

function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
/*:: declare function isHTMLElement(node: mixed): boolean %checks(node instanceof
  HTMLElement); */


function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}

function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}

function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}

function getDocumentElement(element) {
  // $FlowFixMe: assume body is always available
  return (isElement(element) ? element.ownerDocument : element.document).documentElement;
}

function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}

// Composite means it takes into account transforms as well as layout.

function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var documentElement;
  var rect = getBoundingClientRect(elementOrVirtualElement);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (!isFixed) {
    if (getNodeName(offsetParent) !== 'body') {
      scroll = getNodeScroll(offsetParent);
    }

    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement = getDocumentElement(offsetParent)) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

// Returns the layout rect of an element relative to its offsetParent. Layout
// means it doesn't take into account transforms.
function getLayoutRect(element) {
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: element.offsetWidth,
    height: element.offsetHeight
  };
}

function getParentNode(element) {
  if (getNodeName(element) === 'html') {
    return element;
  }

  return element.parentNode || // DOM Element detected
  // $FlowFixMe: need a better way to handle this...
  element.host || // ShadowRoot detected
  document.ownerDocument || // Fallback to ownerDocument if available
  document.documentElement // Or to documentElement if everything else fails
  ;
}

function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}

function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
    // $FlowFixMe: assume body is always available
    return node.ownerDocument.body;
  }

  if (isHTMLElement(node)) {
    // Firefox wants us to check `-x` and `-y` variations as well
    var _getComputedStyle = getComputedStyle(node),
        overflow = _getComputedStyle.overflow,
        overflowX = _getComputedStyle.overflowX,
        overflowY = _getComputedStyle.overflowY;

    if (/auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX)) {
      return node;
    }
  }

  return getScrollParent(getParentNode(node));
}

function listScrollParents(element, list) {
  if (list === void 0) {
    list = [];
  }

  var scrollParent = getScrollParent(element);
  var isBody = getNodeName(scrollParent) === 'body';
  var target = isBody ? getWindow(scrollParent) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents(getParentNode(target)));
}

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
}

var isFirefox = function isFirefox() {
  return typeof window.InstallTrigger !== 'undefined';
};

function getTrueOffsetParent(element) {
  var offsetParent;

  if (!isHTMLElement(element) || !(offsetParent = element.offsetParent) || // https://github.com/popperjs/popper-core/issues/837
  isFirefox() && getComputedStyle(offsetParent).position === 'fixed') {
    return null;
  }

  return offsetParent;
}

function getOffsetParent(element) {
  var window = getWindow(element);
  var offsetParent = getTrueOffsetParent(element); // Find the nearest non-table offsetParent

  while (offsetParent && isTableElement(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && getNodeName(offsetParent) === 'body' && getComputedStyle(offsetParent).position === 'static') {
    return window;
  }

  return offsetParent || window;
}

var top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto = 'auto';
var basePlacements = [top, bottom, right, left];
var start = 'start';
var end = 'end';
var clippingParents = 'clippingParents';
var viewport = 'viewport';
var popper = 'popper';
var reference = 'reference';
var variationPlacements =
/*#__PURE__*/
basePlacements.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements =
/*#__PURE__*/
[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return modifierPhases.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

function debounce(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}

function format(str) {
  var arguments$1 = arguments;

  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments$1[_key];
  }

  return [].concat(args).reduce(function (p, c) {
    return p.replace(/%s/, c);
  }, str);
}

var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
var VALID_PROPERTIES = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
function validateModifiers(modifiers) {
  modifiers.forEach(function (modifier) {
    Object.keys(modifier).forEach(function (key) {
      switch (key) {
        case 'name':
          if (typeof modifier.name !== 'string') {
            console.error(format(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', "\"" + String(modifier.name) + "\""));
          }

          break;

        case 'enabled':
          if (typeof modifier.enabled !== 'boolean') {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', "\"" + String(modifier.enabled) + "\""));
          }

        case 'phase':
          if (modifierPhases.indexOf(modifier.phase) < 0) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(', '), "\"" + String(modifier.phase) + "\""));
          }

          break;

        case 'fn':
          if (typeof modifier.fn !== 'function') {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'effect':
          if (typeof modifier.effect !== 'function') {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'requires':
          if (!Array.isArray(modifier.requires)) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', "\"" + String(modifier.requires) + "\""));
          }

          break;

        case 'requiresIfExists':
          if (!Array.isArray(modifier.requiresIfExists)) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', "\"" + String(modifier.requiresIfExists) + "\""));
          }

          break;

        case 'options':
        case 'data':
          break;

        default:
          console.error("PopperJS: an invalid property has been provided to the \"" + modifier.name + "\" modifier, valid properties are " + VALID_PROPERTIES.map(function (s) {
            return "\"" + s + "\"";
          }).join(', ') + "; but \"" + key + "\" was provided.");
      }

      modifier.requires && modifier.requires.forEach(function (requirement) {
        if (modifiers.find(function (mod) {
          return mod.name === requirement;
        }) == null) {
          console.error(format(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
        }
      });
    });
  });
}

function uniqueBy(arr, fn) {
  var identifiers = new Set();
  return arr.filter(function (item) {
    var identifier = fn(item);

    if (!identifiers.has(identifier)) {
      identifiers.add(identifier);
      return true;
    }
  });
}

function getBasePlacement(placement) {
  return placement.split('-')[0];
}

function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign({}, existing, {}, current, {
      options: Object.assign({}, existing.options, {}, current.options),
      data: Object.assign({}, existing.data, {}, current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}

var INVALID_ELEMENT_ERROR = 'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.';
var INFINITE_LOOP_ERROR = 'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.';
var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};

function areValidElements() {
  var arguments$1 = arguments;

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments$1[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, {}, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(options) {
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, {}, state.options, {}, options);
        state.scrollParents = {
          reference: isElement(reference) ? listScrollParents(reference) : [],
          popper: listScrollParents(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        }); // Validate the provided modifiers so that the consumer will get warned
        // if one of the modifiers is invalid for any reason

        if (process.env.NODE_ENV !== "production") {
          var modifiers = uniqueBy([].concat(orderedModifiers, state.options.modifiers), function (_ref) {
            var name = _ref.name;
            return name;
          });
          validateModifiers(modifiers);

          if (getBasePlacement(state.options.placement) === auto) {
            var flipModifier = state.orderedModifiers.find(function (_ref2) {
              var name = _ref2.name;
              return name === 'flip';
            });

            if (!flipModifier) {
              console.error(['Popper: "auto" placements require the "flip" modifier be', 'present and enabled to work.'].join(' '));
            }
          }

          var _getComputedStyle = getComputedStyle(popper),
              marginTop = _getComputedStyle.marginTop,
              marginRight = _getComputedStyle.marginRight,
              marginBottom = _getComputedStyle.marginBottom,
              marginLeft = _getComputedStyle.marginLeft; // We no longer take into account `margins` on the popper, and it can
          // cause bugs with positioning, so we'll warn the consumer


          if ([marginTop, marginRight, marginBottom, marginLeft].some(function (margin) {
            return parseFloat(margin);
          })) {
            console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', 'between the popper and its reference element or boundary.', 'To replicate margin, use the `offset` modifier, as well as', 'the `padding` option in the `preventOverflow` and `flip`', 'modifiers.'].join(' '));
          }
        }

        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {
          if (process.env.NODE_ENV !== "production") {
            console.error(INVALID_ELEMENT_ERROR);
          }

          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
          popper: getLayoutRect(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        var __debug_loops__ = 0;

        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (process.env.NODE_ENV !== "production") {
            __debug_loops__ += 1;

            if (__debug_loops__ > 100) {
              console.error(INFINITE_LOOP_ERROR);
              break;
            }
          }

          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };

    if (!areValidElements(reference, popper)) {
      if (process.env.NODE_ENV !== "production") {
        console.error(INVALID_ELEMENT_ERROR);
      }

      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref3) {
        var name = _ref3.name,
            _ref3$options = _ref3.options,
            options = _ref3$options === void 0 ? {} : _ref3$options,
            effect = _ref3.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}

var passive = {
  passive: true
};

function effect(_ref) {
  var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
  var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
  var window = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }

  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
}

var eventListeners = {
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect,
  data: {}
};

function getVariation(placement) {
  return placement.split('-')[1];
}

function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}

function computeOffsets(_ref) {
  var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;

    case bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }

  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';

    switch (variation) {
      case start:
        offsets[mainAxis] = Math.floor(offsets[mainAxis]) - Math.floor(reference[len] / 2 - element[len] / 2);
        break;

      case end:
        offsets[mainAxis] = Math.floor(offsets[mainAxis]) + Math.ceil(reference[len] / 2 - element[len] / 2);
        break;
    }
  }

  return offsets;
}

function popperOffsets(_ref) {
  var state = _ref.state,
      name = _ref.name;
  // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
}

var popperOffsets$1 = {
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
};

var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsets(_ref) {
  var x = _ref.x,
      y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: Math.round(x * dpr) / dpr || 0,
    y: Math.round(y * dpr) / dpr || 0
  };
}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive;

  var _roundOffsets = roundOffsets(offsets),
      x = _roundOffsets.x,
      y = _roundOffsets.y;

  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = left;
  var sideY = top;
  var win = window;

  if (adaptive) {
    var offsetParent = getOffsetParent(popper);

    if (offsetParent === getWindow(popper)) {
      offsetParent = getDocumentElement(popper);
    } // $FlowFixMe: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it

    /*:: offsetParent = (offsetParent: Element); */


    if (placement === top) {
      sideY = bottom;
      y -= offsetParent.clientHeight - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === left) {
      sideX = right;
      x -= offsetParent.clientWidth - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);

  if (gpuAcceleration) {
    var _Object$assign;

    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) < 2 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref3) {
  var state = _ref3.state,
      options = _ref3.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive;

  if (process.env.NODE_ENV !== "production") {
    var _getComputedStyle = getComputedStyle(state.elements.popper),
        transitionProperty = _getComputedStyle.transitionProperty;

    if (adaptive && ['transform', 'top', 'right', 'bottom', 'left'].some(function (property) {
      return transitionProperty.indexOf(property) >= 0;
    })) {
      console.warn(['Popper: Detected CSS transitions on at least one of the following', 'CSS properties: "transform", "top", "right", "bottom", "left".', '\n\n', 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', 'for smooth transitions, or remove these properties from the CSS', 'transition declaration on the popper element if only transitioning', 'opacity or background-color for example.', '\n\n', 'We recommend using the popper element as a wrapper around an inner', 'element that can have any CSS property transitioned for animations.'].join(' '));
    }
  }

  var commonStyles = {
    placement: getBasePlacement(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration
  }; // popper offsets are always available

  state.styles.popper = Object.assign({}, state.styles.popper, {}, mapToStyles(Object.assign({}, commonStyles, {
    offsets: state.modifiersData.popperOffsets,
    position: state.options.strategy,
    adaptive: adaptive
  }))); // arrow offsets may not be available

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, {}, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false
    })));
  }

  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-placement': state.placement
  });
}

var computeStyles$1 = {
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
};

// and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe


    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}

function effect$1(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: 'absolute',
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);

  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      } // Flow doesn't support to extend this property, but it's the most
      // effective way to apply styles to an HTMLElement
      // $FlowFixMe


      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}

var applyStyles$1 = {
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: effect$1,
  requires: ['computeStyles']
};

function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
    placement: placement
  })) : offset,
      skidding = _ref[0],
      distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}

function offset(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;
  state.modifiersData.popperOffsets.x += x;
  state.modifiersData.popperOffsets.y += y;
  state.modifiersData[name] = data;
}

var offset$1 = {
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset
};

var hash = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

var hash$1 = {
  start: 'end',
  end: 'start'
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return hash$1[matched];
  });
}

function getViewportRect(element) {
  var win = getWindow(element);
  return {
    width: win.innerWidth,
    height: win.innerHeight,
    x: 0,
    y: 0
  };
}

function getDocumentRect(element) {
  var win = getWindow(element);
  var winScroll = getWindowScroll(element);
  var documentRect = getCompositeRect(getDocumentElement(element), win);
  documentRect.height = Math.max(documentRect.height, win.innerHeight);
  documentRect.width = Math.max(documentRect.width, win.innerWidth);
  documentRect.x = -winScroll.scrollLeft;
  documentRect.y = -winScroll.scrollTop;
  return documentRect;
}

function toNumber(cssValue) {
  return parseFloat(cssValue) || 0;
}

function getBorders(element) {
  var computedStyle = isHTMLElement(element) ? getComputedStyle(element) : {};
  return {
    top: toNumber(computedStyle.borderTopWidth),
    right: toNumber(computedStyle.borderRightWidth),
    bottom: toNumber(computedStyle.borderBottomWidth),
    left: toNumber(computedStyle.borderLeftWidth)
  };
}

function getDecorations(element) {
  var win = getWindow(element);
  var borders = getBorders(element);
  var isHTML = getNodeName(element) === 'html';
  var winScrollBarX = getWindowScrollBarX(element);
  var x = element.clientWidth + borders.right;
  var y = element.clientHeight + borders.bottom; // HACK:
  // document.documentElement.clientHeight on iOS reports the height of the
  // viewport including the bottom bar, even if the bottom bar isn't visible.
  // If the difference between window innerHeight and html clientHeight is more
  // than 50, we assume it's a mobile bottom bar and ignore scrollbars.
  // * A 50px thick scrollbar is likely non-existent (macOS is 15px and Windows
  //   is about 17px)
  // * The mobile bar is 114px tall

  if (isHTML && win.innerHeight - element.clientHeight > 50) {
    y = win.innerHeight - borders.bottom;
  }

  return {
    top: isHTML ? 0 : element.clientTop,
    right: // RTL scrollbar (scrolling containers only)
    element.clientLeft > borders.left ? borders.right : // LTR scrollbar
    isHTML ? win.innerWidth - x - winScrollBarX : element.offsetWidth - x,
    bottom: isHTML ? win.innerHeight - y : element.offsetHeight - y,
    left: isHTML ? winScrollBarX : element.clientLeft
  };
}

function contains(parent, child) {
  // $FlowFixMe: hasOwnProperty doesn't seem to work in tests
  var isShadow = Boolean(child.getRootNode && child.getRootNode().host); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (isShadow) {
      var next = child;

      do {
        if (next && parent.isSameNode(next)) {
          return true;
        } // $FlowFixMe: need a better way to handle this...


        next = next.parentNode || next.host;
      } while (next);
    } // Give up, the result is false


  return false;
}

function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

function getClientRectFromMixedType(element, clippingParent) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isHTMLElement(clippingParent) ? getBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingParents(element) {
  var clippingParents = listScrollParents(element);
  var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

  if (!isElement(clipperElement)) {
    return [];
  } // $FlowFixMe: https://github.com/facebook/flow/issues/1414


  return clippingParents.filter(function (clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement);
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents


function getClippingRect(element, boundary, rootBoundary) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent);
    var decorations = getDecorations(isHTMLElement(clippingParent) ? clippingParent : getDocumentElement(element));
    accRect.top = Math.max(rect.top + decorations.top, accRect.top);
    accRect.right = Math.min(rect.right - decorations.right, accRect.right);
    accRect.bottom = Math.min(rect.bottom - decorations.bottom, accRect.bottom);
    accRect.left = Math.max(rect.left + decorations.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), {}, paddingObject);
}

function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$placement = _options.placement,
      placement = _options$placement === void 0 ? state.placement : _options$placement,
      _options$boundary = _options.boundary,
      boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
      _options$rootBoundary = _options.rootBoundary,
      rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
      _options$elementConte = _options.elementContext,
      elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
      _options$altBoundary = _options.altBoundary,
      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
      _options$padding = _options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var referenceElement = state.elements.reference;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : getDocumentElement(state.elements.popper), boundary, rootBoundary);
  var referenceClientRect = getBoundingClientRect(referenceElement);
  var popperOffsets = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, {}, popperOffsets));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === popper && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }

  return overflowOffsets;
}

function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      placement = _options.placement,
      boundary = _options.boundary,
      rootBoundary = _options.rootBoundary,
      padding = _options.padding,
      flipVariations = _options.flipVariations;
  var variation = getVariation(placement);
  var placements = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
    return getVariation(placement) === variation;
  }) : basePlacements; // $FlowFixMe: Flow seems to have problems with two array unions...

  var overflows = placements.reduce(function (acc, placement) {
    acc[placement] = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[getBasePlacement(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}

function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }

  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}

function flip(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;

  if (state.modifiersData[name]._skip) {
    return;
  }

  var specifiedFallbackPlacements = options.fallbackPlacements,
      padding = options.padding,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      _options$flipVariatio = options.flipVariations,
      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];

  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];

    var _basePlacement = getBasePlacement(placement);

    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }

    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [overflow[_basePlacement] <= 0, overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0];

    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }

    checksMap.set(placement, checks);
  }

  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;

    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);

        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });

      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };

    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);

      if (_ret === "break") { break; }
    }
  }

  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
}

var flip$1 = {
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
};

function getAltAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}

function within(min, value, max) {
  return Math.max(min, Math.min(value, max));
}

function preventOverflow(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      padding = options.padding,
      _options$tether = options.tether,
      tether = _options$tether === void 0 ? true : _options$tether,
      _options$tetherOffset = options.tetherOffset,
      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var data = {
    x: 0,
    y: 0
  };

  if (checkMainAxis) {
    var mainSide = mainAxis === 'y' ? top : left;
    var altSide = mainAxis === 'y' ? bottom : right;
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min = popperOffsets[mainAxis] + overflow[mainSide];
    var max = popperOffsets[mainAxis] - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
    var tetherMin = popperOffsets[mainAxis] + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = popperOffsets[mainAxis] + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? Math.min(min, tetherMin) : min, offset, tether ? Math.max(max, tetherMax) : max);
    popperOffsets[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset;
  }

  if (checkAltAxis) {
    var _mainSide = mainAxis === 'x' ? top : left;

    var _altSide = mainAxis === 'x' ? bottom : right;

    var _offset = popperOffsets[altAxis];

    var _min = _offset + overflow[_mainSide];

    var _max = _offset - overflow[_altSide];

    var _preventedOffset = within(_min, _offset, _max);

    state.modifiersData.popperOffsets[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }

  state.modifiersData[name] = data;
}

var preventOverflow$1 = {
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow,
  requiresIfExists: ['offset']
};

function arrow(_ref) {
  var _state$modifiersData$;

  var state = _ref.state,
      name = _ref.name;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';

  if (!arrowElement) {
    return;
  }

  var paddingObject = state.modifiersData[name + "#persistent"].padding;
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === 'y' ? top : left;
  var maxProp = axis === 'y' ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
  var clientOffset = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientLeft || 0 : arrowOffsetParent.clientTop || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2 - clientOffset; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var center = within(paddingObject[minProp], state.rects.popper[len] / 2 - arrowRect[len] / 2 + centerToReference, state.rects.popper[len] - arrowRect[len] - paddingObject[maxProp]); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = center, _state$modifiersData$);
}

function effect$2(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$element = options.element,
      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element,
      _options$padding = options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding; // CSS selector

  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);

    if (!arrowElement) {
      return;
    }
  }

  if (!contains(state.elements.popper, arrowElement)) {
    if (process.env.NODE_ENV !== "production") {
      console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', 'element.'].join(' '));
    }

    return;
  }

  state.elements.arrow = arrowElement;
  state.modifiersData[name + "#persistent"] = {
    padding: mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements))
  };
}

var arrow$1 = {
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow,
  effect: effect$2,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
};

function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }

  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}

function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function (side) {
    return overflow[side] >= 0;
  });
}

function hide(_ref) {
  var state = _ref.state,
      name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: 'reference'
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-reference-hidden': isReferenceHidden,
    'data-popper-escaped': hasPopperEscaped
  });
}

var hide$1 = {
  name: 'hide',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: hide
};

var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
var createPopper =
/*#__PURE__*/
popperGenerator({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

function objectWithoutProperties (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }
var S$6 = String, B$7 = Boolean;
var script$U = {
  name: 'XPopper',
  props: {
    offset: { type: Number, default: 0 },
    options: Object,
    adaptive: { type: B$7, default: true },
    hasArrow: B$7,
    arrowClass: S$6,
    transitionName: S$6,
    visible: B$7,
    transfer: B$7,
    placement: {
      default: 'bottom',
      validator: function validator(v) {
        return [
          'top', 'top-start', 'top-end',
          'right', 'right-start', 'right-end',
          'bottom', 'bottom-start', 'bottom-end',
          'left', 'left-start', 'left-end'
        ].indexOf(v) > -1
      }
    }
  },
  data: function data() {
    return { prefix: 'x-popper', zIndex: 0 }
  },
  directives: { clickoutside: clickoutside },
  watch: {
    visible: function visible(val) {
      this.onVisible();
      this.$emit(("on-popper-" + (val ? 'show' : 'hide')));
    }
  },
  mounted: function mounted() {
    if (this.transfer) {
      document.body.appendChild(this.$refs.popper);
    }
    this.onVisible();
  },
  beforeDestroy: function beforeDestroy() {
    if (this.popper) {
      this.popper.destroy();
      this.popper = null;
    }
    if (this.transfer) {
      var ref = this.$refs;
      var popper = ref.popper;
      popper.parentNode && popper.parentNode.removeChild(popper);
    }
  },
  methods: {
    createPopper: function createPopper$1() {
      var ref = this.$refs;
      var popper = ref.popper;
      var arrow = ref.arrow;
      var ref$1 = this.options || {};
      var modifiers = ref$1.modifiers;
      var rest = objectWithoutProperties( ref$1, ["modifiers"] );
      var others = rest;
      var options = Object.assign({}, {placement: this.placement,
        strategy: 'fixed',
        modifiers: [
          {
            name: 'arrow',
            options: {
              element: arrow
            }
          },
          {
            name: 'offset',
            options: {
              offset: [this.offset, 0]
            }
          },
          {
            name: 'computeStyles',
            options: {
              adaptive: this.adaptive,
              gpuAcceleration: false
            }
          }
        ].concat(modifiers || [])},
        others);
      if (this.popper) {
        this.popper.setOptions(options);
      } else {
        this.popper = createPopper(this.getReference(), popper, options);
      }
    },
    getReference: function getReference() {
      var ref = this.$refs;
      var reference = ref.reference;
      return [reference ].concat( Array.from(reference.querySelectorAll('*'))).find(function (el) { return el.offsetWidth && el.offsetHeight; }) || reference
    },
    update: function update() {
      this.popper && this.popper.update();
    },
    onVisible: function onVisible() {
      var this$1 = this;

      if (this.visible) {
        this.zIndex = getMaxZIndex();
        this.$nextTick(function () { return this$1.createPopper(); });
      }
    },
    onClickoutside: function onClickoutside(e) {
      if (isOutside(e, this.$el) && this.visible) { this.$emit('clickoutside', e); }
    },
    onRefClick: function onRefClick(e) {
      this.$emit('ref-click', e);
    }
  }
};

/* script */
var __vue_script__$U = script$U;
/* template */
var __vue_render__$X = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    _vm._g({ class: _vm.prefix }, _vm.$listeners),
    [
      _c(
        "span",
        {
          ref: "reference",
          class: _vm.prefix + "_reference",
          on: { click: _vm.onRefClick }
        },
        [_vm._t("reference")],
        2
      ),
      _vm._v(" "),
      _c(
        "transition",
        { attrs: { name: _vm.transitionName || "x-animate-fade" } },
        [
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.visible,
                  expression: "visible"
                },
                {
                  name: "clickoutside",
                  rawName: "v-clickoutside",
                  value: _vm.onClickoutside,
                  expression: "onClickoutside"
                }
              ],
              ref: "popper",
              class: _vm.prefix + "_popper",
              style: { zIndex: _vm.zIndex }
            },
            [
              _c(
                "div",
                { class: _vm.prefix + "_content" },
                [_vm._t("default")],
                2
              ),
              _vm._v(" "),
              _c("div", {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.hasArrow || _vm.arrowClass,
                    expression: "hasArrow || arrowClass"
                  }
                ],
                ref: "arrow",
                class: [_vm.prefix + "_arrow", _vm.arrowClass]
              })
            ]
          )
        ]
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$X = [];
__vue_render__$X._withStripped = true;

  /* style */
  var __vue_inject_styles__$X = undefined;
  /* scoped */
  var __vue_scope_id__$X = undefined;
  /* module identifier */
  var __vue_module_identifier__$X = undefined;
  /* functional template */
  var __vue_is_functional_template__$X = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$X = normalizeComponent(
    { render: __vue_render__$X, staticRenderFns: __vue_staticRenderFns__$X },
    __vue_inject_styles__$X,
    __vue_script__$U,
    __vue_scope_id__$X,
    __vue_is_functional_template__$X,
    __vue_module_identifier__$X,
    false,
    undefined,
    undefined,
    undefined
  );

var Cache = function Cache(value, label) {
  var obj;

  this.data = ['', null, undefined].indexOf(value) > -1 ? {} :
    isArr(value) ? value.reduce(function (acc, _, i) {
      var obj;

      return (Object.assign({}, acc, ( obj = {}, obj[_] = label[i], obj )));
  }, {}) : ( obj = {}, obj[value] = label, obj );
};

Cache.prototype.add = function add (item) {
  this.data[item.value] = item.label || item.value;
};

Cache.prototype.remove = function remove (value) {
  delete this.data[value];
};

Cache.prototype.getLabel = function getLabel (value) {
  return this.data[value]
};

Cache.prototype.clear = function clear () {
  this.data = {};
};

//
var N$4 = Number, S$7 = String, B$8 = Boolean, SNA = [S$7, N$4, Array];
var script$V = {
  name: 'XSelect',
  components: { XTag: __vue_component__$9, XIcon: __vue_component__, XPopper: __vue_component__$X },
  props: {
    value: SNA,
    multiple: B$8,
    disabled: B$8,
    clearable: B$8,
    filterable: B$8,
    remote: B$8,
    remoteMethod: Function,
    loading: B$8,
    loadingText: { type: S$7, default: '加载中' },
    label: SNA,
    size: {
      validator: function validator(v) {
        return ['large', 'small', 'default'].indexOf(v) > -1
      }
    },
    placeholder: { type: S$7, default: '请选择' },
    notFoundText: { type: S$7, default: '无匹配数据' },
    prefix: S$7,
    maxTagCount: N$4,
    maxTagPlaceholder: Function
  },
  data: function data() {
    return {
      visible: false,
      prefixCls: 'x-select',
      listStyle: null,
      selectedValue: this.getModel(),
      children: [],
      searchValue: '',
      inputFocus: false,
      cache: new Cache(this.value, this.label)
    }
  },
  computed: {
    popperProps: function popperProps() {
      return Object.assign({}, this.$attrs,
        {ref: 'Popper',
        adaptive: false,
        visible: this.visible,
        placement: 'bottom-start',
        transitionName: 'x-animate-dropdown'})
    },
    boxClass: function boxClass() {
      return [
        ((this.prefixCls) + "_selection"),
        this.size && ((this.prefixCls) + "_" + (this.size)),
        {
          inputFocus: this.inputFocus,
          listVisible: this.visible,
          disabled: this.disabled,
          multiple: this.multiple,
          filterable: this.filterable,
          clearable: this.clearable && this.selectedValue.length
        }
      ]
    },
    inputStyle: function inputStyle() {
      return this.selectedValue.length && { width: '20px' }
    },
    inputPlaceholder: function inputPlaceholder() {
      return !this.selectedValue.length && this.placeholder
    },
    searchText: function searchText() {
      return this.searchValue.replace(/\s/gm, function (val) { return '&nbsp;'; })
    },
    singleLabel: function singleLabel() {
      var val = this.selectedValue[0];
      var vm = this.children.find(function (_) { return _.value === val; });
      return this.remote ? this.cache.getLabel(val) : vm && (vm.label || vm.value)
    },
    showedValues: function showedValues() {
      return this.maxTagCount ? this.selectedValue.slice(0, this.maxTagCount) : this.selectedValue
    },
    moreValue: function moreValue() {
      var moreCount = this.maxTagCount ? this.selectedValue.length - this.maxTagCount : 0;
      return moreCount > 0 ? this.maxTagPlaceholder ? this.maxTagPlaceholder(moreCount) : ("+ " + moreCount + "...") : 0
    },
    isEmpty: function isEmpty() {
      return this.children.every(function (_) { return _.removed; })
    }
  },
  watch: {
    visible: function visible(val) {
      var this$1 = this;

      val && this.$nextTick(function () { return this$1.listStyle = { minWidth: ((this$1.$el.offsetWidth) + "px") }; });
    },
    value: 'updateModel',
    selectedValue: function selectedValue(val) {
      var this$1 = this;

      this.$emit('input', this.multiple ? val : val[0]);
      this.children.forEach(function (_) { return _.selected = val.indexOf(_.value) > -1; });
      if (this.multiple && this.visible) {
        clearTimeout(this.tid);
        this.tid = setTimeout(function () { return this$1.$refs.Popper.update(); }, 50);
      }
    },
    children: function children(val) {
      var this$1 = this;

      val.forEach(function (_) { return _.selected = this$1.selectedValue.indexOf(_.value) > -1; });
    },
    searchValue: function searchValue(val) {
      var this$1 = this;

      if (this.filterable) {
        this.throttleSearch && this.throttleSearch();
        if (this.multiple) {
          this.$nextTick(function () {
            this$1.$refs.Input.style.width = val || this$1.selectedValue.length ?
              Math.min(this$1.$refs.SearchText.offsetWidth, this$1.$el.offsetWidth - 25) + 'px' : '';
          });
        }
      }
    }
  },
  mounted: function mounted() {
    var this$1 = this;

    this.throttleSearch = throttle(function () {
      if (this$1.remote && this$1.searchValue) {
        this$1.remoteMethod && this$1.remoteMethod(this$1.searchValue);
      } else {
        var val = (this$1.searchValue + '').toLowerCase();
        this$1.children.forEach(function (_) {
          var optionVal = (_.value + '').toLowerCase();
          var optionLabel = _.label === undefined ? '' : (_.label + '').toLowerCase();
          _.removed = optionVal.indexOf(val) < 0 && optionLabel.indexOf(val) < 0;
        });
      }
    }, 1000);
  },
  methods: {
    getModel: function getModel() {
      return this.multiple ? this.value : ['', null, undefined].indexOf(this.value) < 0 ? [this.value] : []
    },
    updateModel: function updateModel(val) {
      this.selectedValue = this.getModel(val);
    },
    updateSelected: function updateSelected(vm) {
      if (this.multiple) {
        this.filterable && this.$refs.Input.focus();
        var index = this.selectedValue.indexOf(vm.value);
        if (index < 0) {
          this.cache.add(vm);
          this.selectedValue.push(vm.value);
        } else {
          this.cache.remove(vm.value);
          this.selectedValue.splice(index, 1);
        }
      } else {
        this.toggle(false);
        this.cache.add(vm);
        this.selectedValue = [vm.value];
        if (this.filterable) { this.searchValue = vm.label || vm.value; }
      }
      this.$refs.Box.focus();
      this.children.forEach(function (_) { return _.focus = _.value === vm.value; });
      this.$emit('on-change', this.selectedValue);
    },
    removeSelected: function removeSelected(val) {
      this.cache.remove(val);
      this.selectedValue.splice(this.selectedValue.indexOf(val), 1);
      this.$emit('on-change', this.selectedValue);
    },
    addItem: function addItem(vm) {
      this.children.push(vm);
    },
    removeItem: function removeItem(vm) {
      this.children.splice(this.children.indexOf(vm), 1);
    },
    getLabel: function getLabel(value) {
      var vm = this.children.find(function (_) { return _.value === value; });
      return this.remote ? this.cache.getLabel(value) : vm ? vm.label || vm.value : value
    },
    setOptionFocus: function setOptionFocus(isUp) {
      if (this.visible) {
        var children = this.children.filter(function (_) { return !_.removed && !_.disabled; }), len = children.length;
        if (len) {
          var index = children.findIndex(function (_) { return _.focus; });
          this.children.forEach(function (_) { return _.focus = false; });
          index = isUp ? (index <= 0 ? len - 1 : index - 1) : (index < len - 1 ? index + 1 : 0);
          var vm = children[index];
          vm.focus = true;
          vm.$el.scrollIntoViewIfNeeded();
        }
      } else {
        this.toggle();
      }
    },
    toggle: function toggle(visible) {
      this.visible = visible === undefined ? !this.visible : visible;
    },
    onClick: function onClick() {
      if (!this.disabled) { this.toggle(); }
    },
    onClear: function onClear() {
      this.selectedValue = [];
    },
    show: function show(visible) {
      this.$emit('on-open-change', visible);
    },
    onFocus: function onFocus() {
      if (!this.disabled && this.filterable) { this.$refs.Input.focus(); }
    },
    onKeydown: function onKeydown(e) {
      if (!this.disabled) {
        var keyCode = e.keyCode;
        var UP = 38, DOWN = 40, ESC = 27, ENTER = 13, DEL = 46, BACKSPACE = 8, TAB = 9;
        if (
          [UP, DOWN].indexOf(keyCode) > -1 ||
          (this.visible && [ESC, TAB].indexOf(keyCode) > -1)
        ) { e.preventDefault(); }
        if (keyCode === ENTER) {
          if (this.visible) {
            var vm =  this.children.find(function (_) { return _.focus && !_.removed; });
            vm ? this.updateSelected(vm) : this.toggle();
          }
        } else if (keyCode === UP) {
          this.setOptionFocus(true);
        } else if (keyCode === DOWN) {
          this.setOptionFocus();
        } else if (keyCode === ESC) {
          this.toggle(false);
        } else if ([DEL, BACKSPACE].indexOf(keyCode) > -1) {
          this.multiple && this.filterable && !this.searchValue && this.selectedValue.pop();
        }
      }
    },
    onInputFocus: function onInputFocus() {
      this.inputFocus = true;
    },
    onInputBlur: function onInputBlur() {
      var this$1 = this;

      this.inputFocus = false;
      !this.multiple && setTimeout(function () { return this$1.searchValue = this$1.singleLabel; }, 300);
    }
  }
};

/* script */
var __vue_script__$V = script$V;
/* template */
var __vue_render__$Y = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: _vm.prefixCls },
    [
      _c(
        "x-popper",
        _vm._b(
          {
            on: {
              clickoutside: function($event) {
                return _vm.toggle(false)
              },
              "on-popper-show": function($event) {
                return _vm.show(true)
              },
              "on-popper-hide": function($event) {
                return _vm.show(false)
              }
            }
          },
          "x-popper",
          _vm.popperProps,
          false
        ),
        [
          _c(
            "div",
            {
              ref: "Box",
              class: _vm.boxClass,
              attrs: { slot: "reference", tabindex: "0" },
              on: {
                click: _vm.onClick,
                focus: _vm.onFocus,
                keydown: _vm.onKeydown
              },
              slot: "reference"
            },
            [
              _vm.prefix || _vm.$slots.prefix
                ? [
                    _vm._t("prefix", [
                      _c("x-icon", { attrs: { type: _vm.prefix } })
                    ])
                  ]
                : _vm._e(),
              _vm._v(" "),
              _c(
                "div",
                { class: _vm.prefixCls + "_middle" },
                [
                  _vm.multiple
                    ? [
                        _vm._l(_vm.showedValues, function(_) {
                          return _c(
                            "x-tag",
                            {
                              key: _,
                              attrs: { closable: "", fade: false },
                              on: {
                                "on-close": function($event) {
                                  $event.stopPropagation();
                                  return _vm.removeSelected(_)
                                }
                              }
                            },
                            [_vm._v(_vm._s(_vm.getLabel(_)))]
                          )
                        }),
                        _vm._v(" "),
                        _vm.moreValue
                          ? _c("x-tag", { attrs: { fade: false } }, [
                              _vm._v(_vm._s(_vm.moreValue))
                            ])
                          : _vm._e(),
                        _vm._v(" "),
                        !_vm.filterable && !_vm.selectedValue.length
                          ? _c("input", {
                              class: _vm.prefixCls + "_input placeholder",
                              attrs: { placeholder: _vm.placeholder }
                            })
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.filterable
                          ? _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.searchValue,
                                  expression: "searchValue"
                                }
                              ],
                              ref: "Input",
                              class: _vm.prefixCls + "_input",
                              style: _vm.inputStyle,
                              attrs: { placeholder: _vm.inputPlaceholder },
                              domProps: { value: _vm.searchValue },
                              on: {
                                focus: _vm.onInputFocus,
                                blur: _vm.onInputBlur,
                                input: [
                                  function($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.searchValue = $event.target.value;
                                  },
                                  function($event) {
                                    return _vm.toggle(true)
                                  }
                                ]
                              }
                            })
                          : _vm._e(),
                        _vm._v(" "),
                        _c(
                          "span",
                          {
                            ref: "SearchText",
                            class: _vm.prefixCls + "_inputText"
                          },
                          [_vm._v(_vm._s(_vm.searchText))]
                        )
                      ]
                    : [
                        _vm.filterable
                          ? _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.searchValue,
                                  expression: "searchValue"
                                }
                              ],
                              ref: "Input",
                              class: _vm.prefixCls + "_input",
                              attrs: { placeholder: _vm.placeholder },
                              domProps: { value: _vm.searchValue },
                              on: {
                                focus: _vm.onInputFocus,
                                blur: _vm.onInputBlur,
                                input: [
                                  function($event) {
                                    if ($event.target.composing) {
                                      return
                                    }
                                    _vm.searchValue = $event.target.value;
                                  },
                                  function($event) {
                                    return _vm.toggle(true)
                                  }
                                ]
                              }
                            })
                          : [
                              _vm.selectedValue.length
                                ? _c(
                                    "span",
                                    { class: _vm.prefixCls + "_label" },
                                    [_vm._v(_vm._s(_vm.singleLabel))]
                                  )
                                : _c(
                                    "span",
                                    { class: _vm.prefixCls + "_placeholder" },
                                    [_vm._v(_vm._s(_vm.placeholder))]
                                  )
                            ]
                      ]
                ],
                2
              ),
              _vm._v(" "),
              _c("x-icon", {
                class: _vm.prefixCls + "_clearIcon",
                attrs: { type: "ios-close" },
                on: {
                  click: function($event) {
                    $event.stopPropagation();
                    return _vm.onClear($event)
                  }
                }
              }),
              _vm._v(" "),
              _c("x-icon", {
                class: _vm.prefixCls + "_arrowIcon",
                attrs: { type: "ios-arrow-down" }
              })
            ],
            2
          ),
          _vm._v(" "),
          _c(
            "ul",
            {
              class: [_vm.prefixCls + "_options", { multiple: _vm.multiple }],
              style: _vm.listStyle
            },
            [
              _vm.isEmpty
                ? _c("li", { class: _vm.prefixCls + "_empty" }, [
                    _vm._v(
                      _vm._s(_vm.loading ? _vm.loadingText : _vm.notFoundText)
                    )
                  ])
                : _vm._e(),
              _vm._v(" "),
              _vm._t("default")
            ],
            2
          )
        ]
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$Y = [];
__vue_render__$Y._withStripped = true;

  /* style */
  var __vue_inject_styles__$Y = undefined;
  /* scoped */
  var __vue_scope_id__$Y = undefined;
  /* module identifier */
  var __vue_module_identifier__$Y = undefined;
  /* functional template */
  var __vue_is_functional_template__$Y = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$Y = normalizeComponent(
    { render: __vue_render__$Y, staticRenderFns: __vue_staticRenderFns__$Y },
    __vue_inject_styles__$Y,
    __vue_script__$V,
    __vue_scope_id__$Y,
    __vue_is_functional_template__$Y,
    __vue_module_identifier__$Y,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$W = {
  name: 'XOption',
  components: { XIcon: __vue_component__ },
  props: {
    label: String,
    disabled: Boolean,
    value: [String, Number]
  },
  data: function data() {
    return {
      focus: false,
      removed: false,
      selected: false,
      prefix: 'x-option'
    }
  },
  computed: {
    classes: function classes() {
      return [
        this.prefix,
        {
          focus: this.focus,
          selected: this.selected,
          disabled: this.disabled
        }
      ]
    }
  },
  mounted: function mounted() {
    this.parent = findParent(this, 'XSelect') ||
      findParent(this, 'XAutocomplete');
    this.parent.addItem(this);
  },
  beforeDestroy: function beforeDestroy() {
    this.parent.removeItem(this);
    this.parent = null;
  },
  methods: {
    onClick: function onClick() {
      !this.disabled && this.parent.updateSelected(this);
    }
  }
};

/* script */
var __vue_script__$W = script$W;
/* template */
var __vue_render__$Z = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return !_vm.removed
    ? _c(
        "li",
        { class: _vm.classes, on: { click: _vm.onClick } },
        [
          _c(
            "div",
            { class: _vm.prefix + "_content" },
            [_vm._t("default", [_vm._v(_vm._s(_vm.label || _vm.value))])],
            2
          ),
          _vm._v(" "),
          _vm.selected
            ? _c("x-icon", {
                class: _vm.prefix + "_doneIcon",
                attrs: { type: "android-done" }
              })
            : _vm._e()
        ],
        1
      )
    : _vm._e()
};
var __vue_staticRenderFns__$Z = [];
__vue_render__$Z._withStripped = true;

  /* style */
  var __vue_inject_styles__$Z = undefined;
  /* scoped */
  var __vue_scope_id__$Z = undefined;
  /* module identifier */
  var __vue_module_identifier__$Z = undefined;
  /* functional template */
  var __vue_is_functional_template__$Z = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$Z = normalizeComponent(
    { render: __vue_render__$Z, staticRenderFns: __vue_staticRenderFns__$Z },
    __vue_inject_styles__$Z,
    __vue_script__$W,
    __vue_scope_id__$Z,
    __vue_is_functional_template__$Z,
    __vue_module_identifier__$Z,
    false,
    undefined,
    undefined,
    undefined
  );

//
var N$5 = Number, B$9 = Boolean;
var script$X = {
  name: 'XPage',
  components: { XIcon: __vue_component__, XSelect: __vue_component__$Y, XOption: __vue_component__$Z, XInput: __vue_component__$I },
  props: {
    current: { type: N$5, default: 1 },
    total: { type: N$5, default: 0 },
    pageSize: { type: N$5, default: 10 },
    pageSizeOpts: { type: Array, default: function () { return [10, 20, 30, 40]; } },
    placement: {
      default: 'bottom',
      validator: function validator(v) {
        return ['bottom', 'top'].indexOf(v) > -1
      }
    },
    size: {
      validator: function validator(v) {
        return v === 'small'
      }
    },
    simple: B$9,
    showTotal: B$9,
    showElevator: B$9,
    showSizer: B$9,
    transfer: B$9,
    prevText: String,
    nextText: String
  },
  data: function data() {
    return { prefix: 'x-page', limit: this.pageSize, currentPage: 1, inputValue: 1 }
  },
  computed: {
    pageCount: function pageCount() {
      return Math.ceil(this.total / this.limit)
    },
    disabledPrev: function disabledPrev() {
      return this.currentPage === 1
    },
    disabledNext: function disabledNext() {
      return this.currentPage === this.pageCount
    },
    showPages: function showPages() {
      var ref = this;
      var currentPage = ref.currentPage;
      var pageCount = ref.pageCount;
      var nums = [];
      if (currentPage < 5) {
        for (var i = 1; i <= currentPage; i++) { nums.push(i); }
      } else {
        nums = [currentPage - 2, currentPage - 1, currentPage];
      }
      if (pageCount - currentPage <= 3) {
        for (var i$1 = currentPage + 1; i$1 <= pageCount; i$1++) { nums.push(i$1); }
      } else {
        nums.push(currentPage + 1, currentPage + 2);
      }
      return nums
    }
  },
  watch: {
    limit: function limit(val) { // 页大小改变 跳转到首页 并发射页大小改变事件 但不发射当前页改变事件
      this.goPage(1);
      this.$emit('on-page-size-change', val);
    },
    current: {
      immediate: true,
      handler: function handler(val) {
        this.currentPage = this.inputValue = val;
      }
    },
    pageSize: function pageSize(val) {
      this.limit = val;
    }
  },
  methods: {
    goPage: function goPage(page) { // 到第几页 不发射改变事件
      this.inputValue = page;
      this.currentPage = page;
      this.$emit('update:current', page);
    },
    toPage: function toPage(page) { // 到第几页 手动触发导致 发射改变事件
      this.goPage(page);
      this.$emit('on-change', page);
    },
    toPrev: function toPrev() { // 到上1页
      !this.disabledPrev && this.toPage(this.currentPage - 1);
    },
    toNext: function toNext() { // 到下1页
      !this.disabledNext && this.toPage(this.currentPage + 1);
    },
    toPrev5: function toPrev5() { // 到上5页
      this.toPage(Math.max(this.currentPage - 5, 1));
    },
    toNext5: function toNext5() { // 到下5页
      this.toPage(Math.min(this.currentPage + 5, this.pageCount));
    },
    toInputPage: function toInputPage() { // 电梯直达目标页
      var inputValue = +this.inputValue;
      if (isNaN(inputValue) || inputValue < 1) {
        this.toPage(1);
      } else if (inputValue > this.pageCount) {
        this.toPage(this.pageCount);
      } else {
        this.toPage(inputValue);
      }
    },
    onKeydown: function onKeydown(e) { // 简洁版输入框键盘按下
      if ([38, 40].indexOf(e.keyCode) > -1) { e.preventDefault(); }
    },
    onKeyup: function onKeyup(e) { // 简洁版输入框键盘松开
      if (e.keyCode === 38) {
        this.inputValue = this.currentPage = Math.min(this.pageCount, this.currentPage + 1);
      } else if (e.keyCode === 40) {
        this.inputValue = this.currentPage = Math.max(1, this.currentPage - 1);
      }
    }
  }
};

/* script */
var __vue_script__$X = script$X;
/* template */
var __vue_render__$_ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "ul",
    { class: [_vm.prefix, _vm.size, { simple: _vm.simple }] },
    [
      _vm.showTotal && !_vm.simple
        ? _c(
            "span",
            { class: _vm.prefix + "_total" },
            [_vm._t("default", [_vm._v("共 " + _vm._s(_vm.total) + " 条")])],
            2
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "li",
        {
          class: { isText: _vm.prevText, disabled: _vm.disabledPrev },
          on: { click: _vm.toPrev }
        },
        [
          _vm._v("\n    " + _vm._s(_vm.prevText)),
          _c("x-icon", { attrs: { type: "ios-arrow-left" } })
        ],
        1
      ),
      _vm._v(" "),
      _vm.simple
        ? _c(
            "span",
            { class: _vm.prefix + "_elevator" },
            [
              _c("x-input", {
                attrs: { size: "small" },
                on: {
                  "on-enter": _vm.toInputPage,
                  "on-keydown": _vm.onKeydown,
                  "on-keyup": _vm.onKeyup
                },
                model: {
                  value: _vm.inputValue,
                  callback: function($$v) {
                    _vm.inputValue = $$v;
                  },
                  expression: "inputValue"
                }
              }),
              _vm._v(" "),
              _c("span", { class: _vm.prefix + "_slash" }, [_vm._v("/")]),
              _vm._v(" " + _vm._s(_vm.pageCount) + "\n  ")
            ],
            1
          )
        : [
            _vm.currentPage >= 5
              ? [
                  _c(
                    "li",
                    {
                      class: { active: _vm.currentPage === 1 },
                      on: {
                        click: function($event) {
                          return _vm.toPage(1)
                        }
                      }
                    },
                    [_vm._v("1")]
                  ),
                  _vm._v(" "),
                  _c(
                    "li",
                    {
                      class: _vm.prefix + "_more",
                      attrs: { title: "向前5页" },
                      on: { click: _vm.toPrev5 }
                    },
                    [
                      _c(
                        "span",
                        { staticClass: "arrows" },
                        _vm._l(2, function(i) {
                          return _c("x-icon", {
                            key: i,
                            attrs: { type: "ios-arrow-left" }
                          })
                        }),
                        1
                      ),
                      _vm._v(" "),
                      _c("x-icon", {
                        staticClass: "icon-more",
                        attrs: { type: "ios-more" }
                      })
                    ],
                    1
                  )
                ]
              : _vm._e(),
            _vm._v(" "),
            _vm._l(_vm.showPages, function(_) {
              return _c(
                "li",
                {
                  key: _,
                  class: { active: _vm.currentPage === _ },
                  on: {
                    click: function($event) {
                      return _vm.toPage(_)
                    }
                  }
                },
                [_vm._v(_vm._s(_))]
              )
            }),
            _vm._v(" "),
            _vm.pageCount - _vm.currentPage >= 4
              ? [
                  _c(
                    "li",
                    {
                      class: _vm.prefix + "_more",
                      attrs: { title: "向后5页" },
                      on: { click: _vm.toNext5 }
                    },
                    [
                      _c(
                        "span",
                        { staticClass: "arrows" },
                        _vm._l(2, function(i) {
                          return _c("x-icon", {
                            key: i,
                            attrs: { type: "ios-arrow-right" }
                          })
                        }),
                        1
                      ),
                      _vm._v(" "),
                      _c("x-icon", {
                        staticClass: "icon-more",
                        attrs: { type: "ios-more" }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "li",
                    {
                      class: { active: _vm.currentPage === _vm.pageCount },
                      on: {
                        click: function($event) {
                          return _vm.toPage(_vm.pageCount)
                        }
                      }
                    },
                    [_vm._v(_vm._s(_vm.pageCount))]
                  )
                ]
              : _vm._e()
          ],
      _vm._v(" "),
      _c(
        "li",
        {
          class: { isText: _vm.nextText, disabled: _vm.disabledNext },
          on: { click: _vm.toNext }
        },
        [
          _vm._v("\n    " + _vm._s(_vm.nextText)),
          _c("x-icon", { attrs: { type: "ios-arrow-right" } })
        ],
        1
      ),
      _vm._v(" "),
      !_vm.simple
        ? [
            _vm.showSizer
              ? _c(
                  "x-select",
                  {
                    class: _vm.prefix + "_sizer",
                    attrs: {
                      placement: _vm.placement,
                      transfer: _vm.transfer,
                      size: _vm.size
                    },
                    model: {
                      value: _vm.limit,
                      callback: function($$v) {
                        _vm.limit = $$v;
                      },
                      expression: "limit"
                    }
                  },
                  _vm._l(_vm.pageSizeOpts, function(_) {
                    return _c("x-option", {
                      key: _,
                      attrs: { value: _, label: _ + " 条/页" }
                    })
                  }),
                  1
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.showElevator
              ? _c(
                  "span",
                  { class: _vm.prefix + "_elevator" },
                  [
                    _vm._v("\n      跳至"),
                    _c("x-input", {
                      attrs: { size: _vm.size },
                      on: { "on-enter": _vm.toInputPage },
                      model: {
                        value: _vm.inputValue,
                        callback: function($$v) {
                          _vm.inputValue = $$v;
                        },
                        expression: "inputValue"
                      }
                    }),
                    _vm._v("页\n    ")
                  ],
                  1
                )
              : _vm._e()
          ]
        : _vm._e()
    ],
    2
  )
};
var __vue_staticRenderFns__$_ = [];
__vue_render__$_._withStripped = true;

  /* style */
  var __vue_inject_styles__$_ = undefined;
  /* scoped */
  var __vue_scope_id__$_ = undefined;
  /* module identifier */
  var __vue_module_identifier__$_ = undefined;
  /* functional template */
  var __vue_is_functional_template__$_ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$_ = normalizeComponent(
    { render: __vue_render__$_, staticRenderFns: __vue_staticRenderFns__$_ },
    __vue_inject_styles__$_,
    __vue_script__$X,
    __vue_scope_id__$_,
    __vue_is_functional_template__$_,
    __vue_module_identifier__$_,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$Y = {
  name: 'XTabs',
  components: { XIcon: __vue_component__, XCloseIconButton: __vue_component__$7, XRender: XRender },
  props: {
    value: [String, Number],
    type: {
      default: 'line',
      validator: function validator(v) {
        return ['line', 'card'].indexOf(v) > -1
      }
    },
    size: {
      validator: function validator(v) {
        return ['default', 'small'].indexOf(v) > -1
      }
    },
    closable: Boolean,
    animated: { type: Boolean, default: true },
    beforeClose: Function
  },
  data: function data() {
    return {
      prefix: 'x-tabs',
      items: [],
      activeTab: this.value,
      showNavBtns: false,
      translateX: 0
    }
  },
  computed: {
    classes: function classes() {
      var ref = this;
      var prefix = ref.prefix;
      return [prefix, this.size && (prefix + "_" + (this.size)), (prefix + "_" + (this.type))]
    },
    contentStyle: function contentStyle() {
      var this$1 = this;

      var index = this.items.findIndex(function (_) { return _.key === this$1.activeTab; });
      return index > -1 && { transform: ("translateX(" + (-index * 100) + "%)") }
    }
  },
  watch: {
    value: function value(val) {
      this.activeTab = val;
    },
    activeTab: function activeTab(val) {
      var this$1 = this;

      this.$emit('input', val);
      this.$nextTick(function () { return this$1.scrollToCurrent(); });
    },
    items: function items(val) {
      if (val.length) {
        if (this.activeTab === undefined) { this.activeTab = this.items[0].key; }
      } else {
        this.activeTab = undefined;
      }
    }
  },
  directives: { winresize: winresize },
  methods: {
    isFunc: isFunc,
    tabClass: function tabClass(item) { // 项class
      return [((this.prefix) + "_navItem"), { active: item.key === this.activeTab, disabled: item.disabled }]
    },
    addItem: function addItem(vm) {
      var this$1 = this;
 // 添加项组件 仅供子组件调用
      var len = this.items.push(vm);
      this.$nextTick(function () { return this$1.winResizeHandler(); });
      return len
    },
    removeItem: function removeItem(vm) {
      var this$1 = this;
 // 移除项组件 仅供子组件调用
      var index = this.items.indexOf(vm);
      this.items.splice(index, 1);
      if (vm.key === this.activeTab && this.items.length) {
        this.activeTab = this.items[index > 0 ? index - 1 : 0].key;
      }
      this.$nextTick(function () { return this$1.winResizeHandler(); });
    },
    deleteItem: function deleteItem(item) {
      var this$1 = this;
 // 删除项 单击关闭按钮调用
      var fn = function () { return this$1.$emit('on-tab-remove', item.key); };
      this.beforeClose ? this.beforeClose().then(fn) : fn();
    },
    scrollToCurrent: function scrollToCurrent() {
      var this$1 = this;
 // 滚动到目标tab
      if (this.activeTab !== undefined) {
        var index = this.items.findIndex(function (_) { return _.key === this$1.activeTab; });
        var ref = this.$refs;
        var scrollView = ref.scrollView;
        var el = scrollView.querySelectorAll('li')[index];
        var rect = el.getBoundingClientRect();
        var scrollViewLeft = scrollView.getBoundingClientRect().left + Math.abs(this.translateX);
        var rightMoveDis = scrollViewLeft + scrollView.clientWidth - rect.right;
        var leftMoveDis = scrollViewLeft - rect.left;
        if (rightMoveDis < 0) {
          this.onNavNext(Math.max(-rightMoveDis, el.clientWidth));
        } else if (leftMoveDis > 0) {
          this.onNavPrev(Math.max(leftMoveDis, el.clientWidth));
        }
      }
    },
    onTabClick: function onTabClick(item) { // tab单击
      this.activeTab = item.key;
      this.$emit('on-click', item.key);
    },
    canClose: function canClose(item) { // 是否可关闭
      return item.closable === false ? false : (item.closable || this.closable) && this.type === 'card'
    },
    onNavPrev: function onNavPrev(dis) { // 向前导航
      var ref = this.$refs.scrollView;
      var clientWidth = ref.clientWidth;
      var maxDis = Math.abs(this.translateX);
      this.translateX += dis ? Math.min(maxDis, dis) : Math.min(clientWidth, maxDis > 0 ? maxDis : 0);
    },
    onNavNext: function onNavNext(dis) { // 向后导航
      var ref = this.$refs.scrollView;
      var clientWidth = ref.clientWidth;
      var scrollWidth = ref.scrollWidth;
      var maxDis = scrollWidth - clientWidth - Math.abs(this.translateX);
      this.translateX -= dis ? Math.min(maxDis, dis) : Math.min(clientWidth, maxDis > 0 ? maxDis : 0);
    },
    winResizeHandler: function winResizeHandler() { // 窗口大小改变处理
      var ref = this.$refs;
      var scrollView = ref.scrollView;
      if (scrollView) {
        var clientWidth = scrollView.clientWidth;
        var scrollWidth = scrollView.scrollWidth;
        if (clientWidth + Math.abs(this.translateX) > scrollWidth) {
          this.translateX = -scrollWidth + clientWidth;
        }
        this.showNavBtns = clientWidth < scrollWidth;
      }
    },
    onWinResize: function onWinResize() { // 窗口大小改变节流处理 指令专用
      return throttle(this.winResizeHandler, 50)
    }
  }
};

/* script */
var __vue_script__$Y = script$Y;
/* template */
var __vue_render__$$ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      directives: [
        {
          name: "winresize",
          rawName: "v-winresize",
          value: _vm.onWinResize(),
          expression: "onWinResize()"
        }
      ],
      class: _vm.classes
    },
    [
      _c(
        "div",
        { class: _vm.prefix + "_bar" },
        [
          _c(
            "div",
            {
              class: [_vm.prefix + "_navWrap", { showNavBtns: _vm.showNavBtns }]
            },
            [
              _c("div", { class: _vm.prefix + "_scrollWrap" }, [
                _c(
                  "ul",
                  {
                    ref: "scrollView",
                    class: _vm.prefix + "_nav",
                    style: { transform: "translateX(" + _vm.translateX + "px)" }
                  },
                  _vm._l(_vm.items, function(_) {
                    return _c(
                      "li",
                      {
                        key: _.key,
                        class: _vm.tabClass(_),
                        on: {
                          click: function($event) {
                            return _vm.onTabClick(_)
                          }
                        }
                      },
                      [
                        _.icon
                          ? _c("x-icon", {
                              class: _vm.prefix + "_icon",
                              attrs: { type: _.icon }
                            })
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.isFunc(_.label)
                          ? _c("x-render", { attrs: { render: _.label } })
                          : [_vm._v(_vm._s(_.label))],
                        _vm._v(" "),
                        _vm.canClose(_)
                          ? _c("x-close-icon-button", {
                              class: _vm.prefix + "_close",
                              on: {
                                click: function($event) {
                                  $event.stopPropagation();
                                  return _vm.deleteItem(_)
                                }
                              }
                            })
                          : _vm._e()
                      ],
                      2
                    )
                  }),
                  0
                )
              ]),
              _vm._v(" "),
              _vm.showNavBtns
                ? [
                    _c("x-icon", {
                      class: _vm.prefix + "_navPrev",
                      attrs: { type: "ios-arrow-back" },
                      on: {
                        click: function($event) {
                          return _vm.onNavPrev()
                        }
                      }
                    }),
                    _vm._v(" "),
                    _c("x-icon", {
                      class: _vm.prefix + "_navNext",
                      attrs: { type: "ios-arrow-forward" },
                      on: {
                        click: function($event) {
                          return _vm.onNavNext()
                        }
                      }
                    })
                  ]
                : _vm._e()
            ],
            2
          ),
          _vm._v(" "),
          _vm._t("extra")
        ],
        2
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          class: [_vm.prefix + "_content", { animated: _vm.animated }],
          style: _vm.contentStyle
        },
        [_vm._t("default")],
        2
      )
    ]
  )
};
var __vue_staticRenderFns__$$ = [];
__vue_render__$$._withStripped = true;

  /* style */
  var __vue_inject_styles__$$ = undefined;
  /* scoped */
  var __vue_scope_id__$$ = undefined;
  /* module identifier */
  var __vue_module_identifier__$$ = undefined;
  /* functional template */
  var __vue_is_functional_template__$$ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$$ = normalizeComponent(
    { render: __vue_render__$$, staticRenderFns: __vue_staticRenderFns__$$ },
    __vue_inject_styles__$$,
    __vue_script__$Y,
    __vue_scope_id__$$,
    __vue_is_functional_template__$$,
    __vue_module_identifier__$$,
    false,
    undefined,
    undefined,
    undefined
  );

//
var S$8 = String, B$a = Boolean;
var script$Z = {
  name: 'XTabPane',
  data: function data() {
    return { key: this.name }
  },
  props: {
    name: S$8,
    label: [S$8, Function],
    icon: S$8,
    disabled: B$a,
    closable: { type: B$a, default: null }
  },
  mounted: function mounted() {
    this.parent = findParent(this, 'XTabs');
    var len = this.parent.addItem(this);
    if (this.key === undefined) { this.key = len - 1; }
  },
  beforeDestroy: function beforeDestroy() {
    this.parent.removeItem(this);
  }
};

/* script */
var __vue_script__$Z = script$Z;

/* template */
var __vue_render__$10 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "x-tabs-pane" }, [_vm._t("default")], 2)
};
var __vue_staticRenderFns__$10 = [];
__vue_render__$10._withStripped = true;

  /* style */
  var __vue_inject_styles__$10 = undefined;
  /* scoped */
  var __vue_scope_id__$10 = undefined;
  /* module identifier */
  var __vue_module_identifier__$10 = undefined;
  /* functional template */
  var __vue_is_functional_template__$10 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$10 = normalizeComponent(
    { render: __vue_render__$10, staticRenderFns: __vue_staticRenderFns__$10 },
    __vue_inject_styles__$10,
    __vue_script__$Z,
    __vue_scope_id__$10,
    __vue_is_functional_template__$10,
    __vue_module_identifier__$10,
    false,
    undefined,
    undefined,
    undefined
  );

//
var N$6 = Number, B$b = Boolean, NS$2 = [N$6, String];
var script$_ = {
  name: 'XTooltip',
  components: { XPopper: __vue_component__$X },
  props: {
    content: NS$2,
    disabled: B$b,
    delay: { type: N$6, default: 0 },
    always: B$b,
    theme: {
      default: 'dark',
      validator: function validator(v) {
        return ['dark', 'light'].indexOf(v) > -1
      }
    },
    maxWidth: NS$2
  },
  data: function data() {
    return { visible: false, prefix: 'x-tooltip' }
  },
  computed: {
    contentStyle: function contentStyle() {
      return { maxWidth: parseSize(this.maxWidth) }
    },
    popperProps: function popperProps() {
      return Object.assign({}, this.$attrs,
        {ref: 'popper',
        arrowClass: ((this.prefix) + "_arrow " + (this.theme)),
        visible: !this.disabled && (this.always || this.visible)})
    },
    popperListeners: function popperListeners() {
      var _self = this;
      return Object.assign({}, this.$listeners,
        {mouseenter: function mouseenter() {
          if (!_self.disabled) {
            _self.tid = setTimeout(function () { return _self.visible = true; }, _self.delay);
          }
        },
        mouseleave: function mouseleave() {
          clearTimeout(_self.tid);
          _self.visible = false;
        }})
    }
  },
  methods: {
    updatePosition: function updatePosition() {
      this.$refs.popper.update();
    }
  }
};

/* script */
var __vue_script__$_ = script$_;
/* template */
var __vue_render__$11 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "x-popper",
    _vm._g(
      _vm._b(
        {
          scopedSlots: _vm._u(
            [
              {
                key: "reference",
                fn: function() {
                  return [_vm._t("default")]
                },
                proxy: true
              }
            ],
            null,
            true
          )
        },
        "x-popper",
        _vm.popperProps,
        false
      ),
      _vm.popperListeners
    ),
    [
      _vm._v(" "),
      _c(
        "div",
        {
          class: [_vm.prefix + "_content", _vm.theme],
          style: _vm.contentStyle
        },
        [_vm._t("content", [_vm._v(_vm._s(_vm.content))])],
        2
      )
    ]
  )
};
var __vue_staticRenderFns__$11 = [];
__vue_render__$11._withStripped = true;

  /* style */
  var __vue_inject_styles__$11 = undefined;
  /* scoped */
  var __vue_scope_id__$11 = undefined;
  /* module identifier */
  var __vue_module_identifier__$11 = undefined;
  /* functional template */
  var __vue_is_functional_template__$11 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$11 = normalizeComponent(
    { render: __vue_render__$11, staticRenderFns: __vue_staticRenderFns__$11 },
    __vue_inject_styles__$11,
    __vue_script__$_,
    __vue_scope_id__$11,
    __vue_is_functional_template__$11,
    __vue_module_identifier__$11,
    false,
    undefined,
    undefined,
    undefined
  );

//
var N$7 = Number, B$c = Boolean;
var script$$ = {
  name: 'XSlider',
  components: { XTooltip: __vue_component__$11, XInputNumber: __vue_component__$J },
  props: {
    value: { type: [N$7, Array], default: 0 },
    min: { type: N$7, default: 0 },
    max: { type: N$7, default: 100 },
    step: { type: N$7, default: 1 },
    disabled: B$c,
    range: B$c,
    showInput: B$c,
    showStops: B$c,
    showTip: {
      default: 'hover',
      validator: function validator(v) {
        return ['hover', 'always', 'never'].indexOf(v) > -1
      }
    },
    tipFormat: Function,
    inputSize: {
      validator: function validator(v) {
        return ['large', 'small', 'default'].indexOf(v) > -1
      }
    },
    marks: Object
  },
  data: function data() {
    return { prefix: 'x-slider', inputValue: this.value, oldValue: this.value, rightDown: false, leftDown: false }
  },
  computed: {
    inputProps: function inputProps() { // 输入框属性
      return { min: this.min, max: this.max, step: this.step, size: this.inputSize }
    },
    total: function total() { // 总数值
      return this.max - this.min
    },
    stops: function stops() {
      var this$1 = this;
 // 离散点数据
      return this.showStops ?
        Array.apply(null, { length: Math.floor(this.total / this.step) }).map(function (_, i) { return (i + 1) * this$1.step; }) : Object.keys(this.marks || {})
    },
    markArray: function markArray() {
      var this$1 = this;
 // 标记
      return Object.keys(this.marks || {}).map(function (key) {
        return isStr(this$1.marks[key]) ? { key: key, style: {}, label: this$1.marks[key] } : Object.assign({}, {key: key}, this$1.marks[key])
      })
    },
    btnClass: function btnClass() { // 按钮类
      var btnClass = (this.prefix) + "_btn";
      return { left: [btnClass, 'left', { down: this.leftDown }], right: [btnClass, 'right', { down: this.rightDown }] }
    },
    tipProps: function tipProps() { // 文字提示属性
      var prop = { placement: 'top', transfer: true }, always = this.showTip === 'always';
      return { left: Object.assign({}, prop, {always: this.leftDown || always}), right: Object.assign({}, prop, {always: this.rightDown || always}) }
    },
    tipContent: function tipContent() {
      var this$1 = this;
 // 文字提示内容
      var ref = this;
      var inputValue = ref.inputValue;
      var getText = function (v) { return this$1.tipFormat ? this$1.tipFormat(v) : v; };
      return this.range ? { left: getText(inputValue[0]), right: getText(inputValue[1]) } : { right: getText(inputValue) }
    },
    barStyle: function barStyle() { // bar样式
      var ref = this;
      var inputValue = ref.inputValue;
      var range = ref.range;
      var total = ref.total;
      if (range) {
        var a = inputValue[0];
        var b = inputValue[1];
        return { left: ((a / total * 100) + "%"), width: (((b - a) / total * 100) + "%") }
      } else {
        return { width: ((inputValue / total * 100) + "%") }
      }
    }
  },
  watch: {
    value: function value(val) {
      this.inputValue = val;
    },
    inputValue: function inputValue(val) {
      var this$1 = this;

      this.$emit('input', val);
      this.$emit('on-input', val);
      var ref = this.$refs;
      var LTip = ref.LeftTooltip;
      var RTip = ref.RightTooltip;
      this.$nextTick(function () { return this$1.leftDown ? LTip && LTip.updatePosition() : this$1.rightDown ? RTip && RTip.updatePosition() : 1; });
    }
  },
  methods: {
    getStopClass: function getStopClass(stop) {
      var ref = this.range ? this.inputValue : [this.inputValue];
      var a = ref[0];
      var b = ref[1];
      return [((this.prefix) + "_stop"), { inside: this.range ? stop > a && stop < b : stop < a }]
    },
    update: function update(e) {
      if (!this.disabled) {
        var ref = this.$refs;
        var Wrap = ref.Wrap;
        var ref$1 = getOffset(Wrap);
        var left = ref$1.left;
        var tarVal = (e.clientX - left ) / Wrap.offsetWidth * this.total,
          val = Math.floor(tarVal / this.step) * this.step,
          toValue = Math.max(Math.min(val, this.max), this.min);
        if (this.range) {
          var ref$2 = this.inputValue;
          var a = ref$2[0];
          var b = ref$2[1];
          if (this.leftDown) {
            this.inputValue = toValue > b ? [toValue, toValue] : [toValue, b];
          } else if (this.rightDown) {
            this.inputValue = toValue > a ? [a, toValue] : [toValue, toValue];
          } else {
            this.inputValue = Math.abs(a - toValue) < Math.abs(b - toValue) ? [toValue, b] : [a, toValue];
          }
        } else {
          this.inputValue = toValue;
        }
      }
    },
    onRightMousedown: function onRightMousedown() {
      if (!this.disabled) {
        this.rightDown = true;
        this.addWinEvents();
      }
    },
    onLeftMousedown: function onLeftMousedown() {
      if (!this.disabled) {
        this.leftDown = true;
        this.addWinEvents();
      }
    },
    addWinEvents: function addWinEvents() {
      this.oldValue = this.range ? [].concat( this.inputValue ) : this.inputValue;
      document.body.classList.add(((this.prefix) + "_move"));
      window.addEventListener('mouseup', this.onMouseup);
      window.addEventListener('mousemove', this.onMousemove);
    },
    onMousemove: function onMousemove(e) {
      if (this.rightDown || this.leftDown) { this.update(e); }
    },
    onMouseup: function onMouseup() {
      var ref = this;
      var oldValue = ref.oldValue;
      var inputValue = ref.inputValue;
      var ref$1 = this.range ? oldValue : [oldValue];
      var a = ref$1[0];
      var b = ref$1[1];
      var ref$2 = this.range ? inputValue : [inputValue];
      var m = ref$2[0];
      var n = ref$2[1];
      if (a !== m || b !== n) { this.$emit('on-change', inputValue); }
      document.body.classList.remove(((this.prefix) + "_move"));
      this.rightDown = this.leftDown = false;
      window.removeEventListener('mouseup', this.onMouseup);
      window.removeEventListener('mousemove', this.onMousemove);
    }
  }
};

/* script */
var __vue_script__$$ = script$$;
/* template */
var __vue_render__$12 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: [_vm.prefix, { disabled: _vm.disabled }] },
    [
      _c(
        "div",
        { ref: "Wrap", class: _vm.prefix + "_wrap", on: { click: _vm.update } },
        [
          _vm._l(_vm.stops, function(_) {
            return _c("span", {
              key: _,
              class: _vm.getStopClass(_),
              style: { left: _ + "%" }
            })
          }),
          _vm._v(" "),
          _c(
            "div",
            { class: _vm.prefix + "_bar", style: _vm.barStyle },
            [
              _vm.range
                ? [
                    _vm.showTip !== "never" && _vm.tipContent.left !== null
                      ? _c(
                          "x-tooltip",
                          _vm._b(
                            { ref: "LeftTooltip" },
                            "x-tooltip",
                            _vm.tipProps.left,
                            false
                          ),
                          [
                            _c(
                              "div",
                              { attrs: { slot: "content" }, slot: "content" },
                              [_vm._v(_vm._s(_vm.tipContent.left))]
                            ),
                            _vm._v(" "),
                            _c("span", {
                              class: _vm.btnClass.left,
                              on: {
                                mousedown: function($event) {
                                  $event.preventDefault();
                                  return _vm.onLeftMousedown($event)
                                }
                              }
                            })
                          ]
                        )
                      : _c("span", {
                          class: _vm.btnClass.left,
                          on: {
                            mousedown: function($event) {
                              $event.preventDefault();
                              return _vm.onLeftMousedown($event)
                            }
                          }
                        })
                  ]
                : _vm._e(),
              _vm._v(" "),
              _vm.showTip !== "never" && _vm.tipContent.right !== null
                ? _c(
                    "x-tooltip",
                    _vm._b(
                      { ref: "RightTooltip" },
                      "x-tooltip",
                      _vm.tipProps.right,
                      false
                    ),
                    [
                      _c(
                        "div",
                        { attrs: { slot: "content" }, slot: "content" },
                        [_vm._v(_vm._s(_vm.tipContent.right))]
                      ),
                      _vm._v(" "),
                      _c("span", {
                        class: _vm.btnClass.right,
                        on: {
                          mousedown: function($event) {
                            $event.preventDefault();
                            return _vm.onRightMousedown($event)
                          }
                        }
                      })
                    ]
                  )
                : _c("span", {
                    class: _vm.btnClass.right,
                    on: {
                      mousedown: function($event) {
                        $event.preventDefault();
                        return _vm.onRightMousedown($event)
                      }
                    }
                  })
            ],
            2
          ),
          _vm._v(" "),
          _c(
            "div",
            _vm._l(_vm.markArray, function(_) {
              return _c("span", {
                key: _.key,
                class: _vm.prefix + "_mark",
                style: Object.assign({}, { left: _.key + "%" }, _.style),
                domProps: { innerHTML: _vm._s(_.label) }
              })
            }),
            0
          )
        ],
        2
      ),
      _vm._v(" "),
      _vm.showInput && !_vm.range
        ? _c(
            "x-input-number",
            _vm._b(
              {
                class: _vm.prefix + "_input",
                model: {
                  value: _vm.inputValue,
                  callback: function($$v) {
                    _vm.inputValue = $$v;
                  },
                  expression: "inputValue"
                }
              },
              "x-input-number",
              _vm.inputProps,
              false
            )
          )
        : _vm._e()
    ],
    1
  )
};
var __vue_staticRenderFns__$12 = [];
__vue_render__$12._withStripped = true;

  /* style */
  var __vue_inject_styles__$12 = undefined;
  /* scoped */
  var __vue_scope_id__$12 = undefined;
  /* module identifier */
  var __vue_module_identifier__$12 = undefined;
  /* functional template */
  var __vue_is_functional_template__$12 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$12 = normalizeComponent(
    { render: __vue_render__$12, staticRenderFns: __vue_staticRenderFns__$12 },
    __vue_inject_styles__$12,
    __vue_script__$$,
    __vue_scope_id__$12,
    __vue_is_functional_template__$12,
    __vue_module_identifier__$12,
    false,
    undefined,
    undefined,
    undefined
  );

//
var S$9 = String, B$d = Boolean, NS$3 = [Number, String];
var script$10 = {
  name: 'XPoptip',
  components: { XIcon: __vue_component__, XBtn: __vue_component__$1, XPopper: __vue_component__$X },
  props: {
    trigger: {
      default: 'click',
      validator: function validator(v) {
        return ['hover', 'click', 'focus'].indexOf(v) > -1
      }
    },
    title: NS$3,
    content: NS$3,
    width: NS$3,
    confirm: B$d,
    disabled: B$d,
    okText: { type: S$9, default: '确定' },
    cancelText: { type: S$9, default: '取消' },
    popperClass: S$9,
    padding: { type: S$9, default: '8px 16px' },
    value: B$d
  },
  data: function data() {
    return { visible: this.value, prefix: 'x-poptip' }
  },
  computed: {
    showTitle: function showTitle() {
      return this.title || this.$slots.title
    },
    showContent: function showContent() {
      return !this.confirm && (this.content || this.$slots.content)
    },
    bodyStyle: function bodyStyle() {
      return this.width && { width: parseSize(this.width) }
    },
    contentStyle: function contentStyle() {
      return !this.confirm && { padding: this.padding }
    },
    popperProps: function popperProps() {
      return Object.assign({}, {placement: 'top'},
        this.$attrs,
        {hasArrow: true,
        visible: !this.disabled && this.visible})
    },
    listenHover: function listenHover() {
      return !this.disabled && !this.confirm && this.trigger === 'hover'
    },
    listenDownUp: function listenDownUp() {
      return !this.disabled && !this.confirm && this.trigger === 'focus'
    },
    popperListeners: function popperListeners() {
      var _self = this;
      return Object.assign({}, this.$listeners,
        {mouseenter: function mouseenter() {
          if (_self.listenHover) { _self.visible = true; }
        },
        mouseleave: function mouseleave() {
          if (_self.listenHover) { _self.visible = false; }
        },
        mousedown: function mousedown(e) {
          if (_self.listenDownUp && !_self.getTarget(e).isDisabledInput) { _self.visible = true; }
        },
        mouseup: function mouseup(e) {
          var target = _self.getTarget(e);
          if (_self.listenDownUp && (!target.isInput || target.disabled)) { _self.visible = false; }
        },
        'ref-click': function ref_click(e) {
          if (!_self.disabled && _self.trigger === 'click' && !_self.getTarget(e).isDisabledInput) { _self.visible = true; }
        },
        clickoutside: function clickoutside() {
          _self.visible = false;
        }})
    }
  },
  watch: {
    visible: function visible(val) {
      this.$emit('input', val);
    },
    value: function value(val) {
      this.visible = val;
    }
  },
  methods: {
    onCancel: function onCancel() {
      this.visible = false;
      this.$emit('on-cancel');
    },
    onOK: function onOK() {
      this.visible = false;
      this.$emit('on-ok');
    },
    getTarget: function getTarget(e) {
      var tar = e.target;
      var disabled = tar.disabled;
      var isInput = tar.tagName.toLowerCase() === 'input';
      return { disabled: disabled, isInput: isInput, isDisabledInput: isInput && disabled }
    }
  }
};

/* script */
var __vue_script__$10 = script$10;
/* template */
var __vue_render__$13 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "x-popper",
    _vm._g(
      _vm._b(
        {
          scopedSlots: _vm._u(
            [
              {
                key: "reference",
                fn: function() {
                  return [_vm._t("default")]
                },
                proxy: true
              }
            ],
            null,
            true
          )
        },
        "x-popper",
        _vm.popperProps,
        false
      ),
      _vm.popperListeners
    ),
    [
      _vm._v(" "),
      _c(
        "div",
        {
          class: [
            _vm.prefix + "_body",
            { confirm: _vm.confirm },
            _vm.popperClass
          ],
          style: _vm.bodyStyle
        },
        [
          _vm.showTitle
            ? _c(
                "div",
                { class: _vm.prefix + "_title", style: _vm.contentStyle },
                [
                  _vm.confirm
                    ? _c("x-icon", {
                        class: _vm.prefix + "_icon",
                        attrs: { type: "help-circled" }
                      })
                    : _vm._e(),
                  _vm._v(" "),
                  _vm._t("title", [_vm._v(_vm._s(_vm.title))])
                ],
                2
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.showContent
            ? _c(
                "div",
                { class: _vm.prefix + "_content", style: _vm.contentStyle },
                [_vm._t("content", [_vm._v(_vm._s(_vm.content))])],
                2
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.confirm
            ? _c(
                "div",
                { class: _vm.prefix + "_actions" },
                [
                  _c(
                    "x-btn",
                    {
                      attrs: { type: "text", size: "small" },
                      on: { click: _vm.onCancel }
                    },
                    [_vm._v(_vm._s(_vm.cancelText))]
                  ),
                  _vm._v(" "),
                  _c(
                    "x-btn",
                    {
                      attrs: { type: "primary", size: "small" },
                      on: { click: _vm.onOK }
                    },
                    [_vm._v(_vm._s(_vm.okText))]
                  )
                ],
                1
              )
            : _vm._e()
        ]
      )
    ]
  )
};
var __vue_staticRenderFns__$13 = [];
__vue_render__$13._withStripped = true;

  /* style */
  var __vue_inject_styles__$13 = undefined;
  /* scoped */
  var __vue_scope_id__$13 = undefined;
  /* module identifier */
  var __vue_module_identifier__$13 = undefined;
  /* functional template */
  var __vue_is_functional_template__$13 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$13 = normalizeComponent(
    { render: __vue_render__$13, staticRenderFns: __vue_staticRenderFns__$13 },
    __vue_inject_styles__$13,
    __vue_script__$10,
    __vue_scope_id__$13,
    __vue_is_functional_template__$13,
    __vue_module_identifier__$13,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$11 = {
  name: 'XDropdown',
  components: { XPopper: __vue_component__$X },
  props: {
    trigger: {
      default: 'hover',
      validator: function validator(v) {
        return ['hover', 'click', 'contextMenu', 'custom'].indexOf(v) > -1
      }
    },
    visible: Boolean
  },
  data: function data() {
    return { isVisible: false }
  },
  computed: {
    popperProps: function popperProps() {
      return Object.assign({}, this.$attrs,
        {adaptive: false,
        transitionName: 'x-animate-dropdown',
        visible: this.trigger === 'custom' ? this.visible : this.isVisible})
    }
  },
  methods: {
    onMouseenter: function onMouseenter() {
      if (this.trigger === 'hover') {
        clearTimeout(this.tid);
        this.isVisible = true;
      }
    },
    onMouseleave: function onMouseleave() {
      var this$1 = this;

      if (this.trigger === 'hover') { this.tid = setTimeout(function () { return this$1.isVisible = false; }, 150); }
    },
    onPopperMouseleave: function onPopperMouseleave(e) {
      if (isOutside(e, this.$el)) { this.onMouseleave(); }
    },
    onRefClick: function onRefClick(e) {
      if (this.trigger === 'click') { this.isVisible = true; }
    },
    onContextmenu: function onContextmenu(e) {
      if (this.trigger === 'contextMenu') {
        e.preventDefault();
        this.isVisible = true;
      }
    },
    show: function show(visible) {
      this.$emit('on-visible-change', visible);
    },
    onClickoutside: function onClickoutside() {
      this.isVisible = false;
    },
    itemClick: function itemClick(name) {
      this.isVisible = false;
      this.$emit('on-click', name);
    }
  }
};

/* script */
var __vue_script__$11 = script$11;
/* template */
var __vue_render__$14 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "x-popper",
    _vm._b(
      {
        on: {
          mouseenter: _vm.onMouseenter,
          mouseleave: _vm.onMouseleave,
          contextmenu: _vm.onContextmenu,
          "on-popper-show": function($event) {
            return _vm.show(true)
          },
          "on-popper-hide": function($event) {
            return _vm.show(false)
          },
          "ref-click": _vm.onRefClick,
          clickoutside: _vm.onClickoutside
        },
        scopedSlots: _vm._u(
          [
            {
              key: "reference",
              fn: function() {
                return [_vm._t("default")]
              },
              proxy: true
            }
          ],
          null,
          true
        )
      },
      "x-popper",
      _vm.popperProps,
      false
    ),
    [
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "x-dropdown",
          on: {
            mouseenter: _vm.onMouseenter,
            mouseleave: _vm.onPopperMouseleave
          }
        },
        [_vm._t("list")],
        2
      )
    ]
  )
};
var __vue_staticRenderFns__$14 = [];
__vue_render__$14._withStripped = true;

  /* style */
  var __vue_inject_styles__$14 = undefined;
  /* scoped */
  var __vue_scope_id__$14 = undefined;
  /* module identifier */
  var __vue_module_identifier__$14 = undefined;
  /* functional template */
  var __vue_is_functional_template__$14 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$14 = normalizeComponent(
    { render: __vue_render__$14, staticRenderFns: __vue_staticRenderFns__$14 },
    __vue_inject_styles__$14,
    __vue_script__$11,
    __vue_scope_id__$14,
    __vue_is_functional_template__$14,
    __vue_module_identifier__$14,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$12 = {
  name: 'XDropdownItem',
  props: {
    name: String,
    disabled: Boolean,
    divided: Boolean,
    selected: Boolean
  },
  data: function data() {
    return { prefix: 'x-dropdown-item' }
  },
  methods: {
    onClick: function onClick() {
      var parent = findParent(this, 'XDropdown');
      !this.disabled && parent && parent.itemClick(this.name);
    }
  }
};

/* script */
var __vue_script__$12 = script$12;
/* template */
var __vue_render__$15 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("li", { class: _vm.prefix, on: { click: _vm.onClick } }, [
    _vm.divided ? _c("div", { class: _vm.prefix + "_divider" }) : _vm._e(),
    _vm._v(" "),
    _c(
      "div",
      {
        class: [
          _vm.prefix + "_inner",
          { selected: _vm.selected, disabled: _vm.disabled }
        ]
      },
      [_vm._t("default")],
      2
    )
  ])
};
var __vue_staticRenderFns__$15 = [];
__vue_render__$15._withStripped = true;

  /* style */
  var __vue_inject_styles__$15 = undefined;
  /* scoped */
  var __vue_scope_id__$15 = undefined;
  /* module identifier */
  var __vue_module_identifier__$15 = undefined;
  /* functional template */
  var __vue_is_functional_template__$15 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$15 = normalizeComponent(
    { render: __vue_render__$15, staticRenderFns: __vue_staticRenderFns__$15 },
    __vue_inject_styles__$15,
    __vue_script__$12,
    __vue_scope_id__$15,
    __vue_is_functional_template__$15,
    __vue_module_identifier__$15,
    false,
    undefined,
    undefined,
    undefined
  );

/* script */

/* template */
var __vue_render__$16 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("ul", [_vm._t("default")], 2)
};
var __vue_staticRenderFns__$16 = [];
__vue_render__$16._withStripped = true;

  /* style */
  var __vue_inject_styles__$16 = undefined;
  /* scoped */
  var __vue_scope_id__$16 = undefined;
  /* module identifier */
  var __vue_module_identifier__$16 = undefined;
  /* functional template */
  var __vue_is_functional_template__$16 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$16 = normalizeComponent(
    { render: __vue_render__$16, staticRenderFns: __vue_staticRenderFns__$16 },
    __vue_inject_styles__$16,
    {},
    __vue_scope_id__$16,
    __vue_is_functional_template__$16,
    __vue_module_identifier__$16,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$13 = {
  name: 'XMenu',
  props: {
    mode: {
      default: 'vertical',
      validator: function validator(v) {
        return ['horizontal', 'vertical'].indexOf(v) > -1
      }
    },
    theme: {
      default: 'light',
      validator: function validator(v) {
        return ['light', 'dark', 'primary'].indexOf(v) > -1
      }
    },
    activeName: [String, Number],
    openNames: { type: Array, default: function () { return []; } },
    accordion: Boolean,
    width: { type: String, default: '240px' }
  },
  data: function data() {
    return { prefix: 'x-menu', openedNames: this.openNames, activedItemName: this.activeName }
  },
  computed: {
    classes: function classes() {
      var ref = this;
      var prefix = ref.prefix;
      return [prefix, (prefix + "_" + (this.mode)), (prefix + "_" + (this.theme))]
    },
    styles: function styles() {
      return this.mode === 'vertical' && { width: this.width }
    }
  },
  watch: {
    openedNames: function openedNames(val) {
      this.$emit('on-open-change', val);
    }
  },
  methods: {
    updateActiveName: function updateActiveName(name) {
      this.activedItemName = name;
    },
    addOpenedNames: function addOpenedNames(name) {
      this.openedNames.push(name);
    },
    removeOpenedNames: function removeOpenedNames(vms) {
      var this$1 = this;

      vms.forEach(function (_) {
        var i = this$1.openedNames.indexOf(_.name);
        i > -1 && this$1.openedNames.splice(i, 1);
      });
    },
    toggleSubmenu: function toggleSubmenu(vm) {
      var index = this.openedNames.indexOf(vm.name);
      if (this.accordion) {
        var siblings = vm.getSiblings();
        if (index < 0) { // 不在里面 -> 添加到里面并折叠兄弟及其所有子菜单
          this.removeOpenedNames(siblings.reduce(function (acc, _) { return acc.concat( _.getSubAll()); }, siblings));
          this.openedNames.push(vm.name);
        } else { // 在里面 -> 移除其及其所有子菜单
          this.removeOpenedNames([vm ].concat( vm.getSubAll()));
        }
      } else {
        if (index < 0) {
          this.openedNames.push(vm.name);
        } else {
          this.removeOpenedNames([vm ].concat( vm.getSubAll()));
        }
      }
    }
  }
};

/* script */
var __vue_script__$13 = script$13;

/* template */
var __vue_render__$17 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "ul",
    { class: _vm.classes, style: _vm.styles },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$17 = [];
__vue_render__$17._withStripped = true;

  /* style */
  var __vue_inject_styles__$17 = undefined;
  /* scoped */
  var __vue_scope_id__$17 = undefined;
  /* module identifier */
  var __vue_module_identifier__$17 = undefined;
  /* functional template */
  var __vue_is_functional_template__$17 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$17 = normalizeComponent(
    { render: __vue_render__$17, staticRenderFns: __vue_staticRenderFns__$17 },
    __vue_inject_styles__$17,
    __vue_script__$13,
    __vue_scope_id__$17,
    __vue_is_functional_template__$17,
    __vue_module_identifier__$17,
    false,
    undefined,
    undefined,
    undefined
  );

var watchMode = {
  data: function data() {
    return { titleStyle: null, isHor: false }
  },
  mounted: function mounted() {
    var this$1 = this;

    var menu = findParent(this, 'XMenu');
    this.unwatchMode = this.$watch(
      function () { return menu.mode; },
      function (val) {
        this$1.isHor = val === 'horizontal';
        this$1.titleStyle = this$1.isHor ? null : { paddingLeft: ((24 + this$1.getParCount() * 20) + "px") };
      },
      { immediate: true }
    );
  },
  beforeDestroy: function beforeDestroy() {
    this.unwatchMode();
  },
  methods: {
    getParCount: function getParCount() {
      var count = 0, submenu = findParent(this, 'XSubmenu');
      while (submenu) {
        count++;
        submenu = findParent(submenu, 'XSubmenu');
      }
      return count
    }
  }
};

//
var script$14 = {
  mixins: [watchMode],
  name: 'XSubmenu',
  components: { XIcon: __vue_component__, XPopper: __vue_component__$X, XCollapseTransition: __vue_component__$s },
  props: {
    name: [String, Number]
  },
  data: function data() {
    return { prefix: 'x-submenu', visible: false, active: false, isOpened: false, listStyle: null }
  },
  computed: {
    popperProps: function popperProps() {
      return { adaptive: false, visible: this.visible, transitionName: 'x-animate-dropdown' }
    },
    titleClass: function titleClass() {
      return [((this.prefix) + "_title"), { active: this.visible || this.active }]
    }
  },
  mounted: function mounted() {
    var this$1 = this;

    var menu = findParent(this, 'XMenu');
    this.unwatchActivedName = this.$watch(
      function () { return menu.activedItemName; },
      function (val) { return this$1.active = findChildrens(this$1, 'XMenuItem').some(function (_) { return _.name === val; }); },
      { immediate: true }
    );
    this.unwatchOpenedNames = this.$watch(
      function () { return menu.openedNames; },
      function (val) {
        if (menu.openedNames.indexOf(this$1.name) < 0 && this$1.hasExpandedChild()) {
          menu.addOpenedNames(this$1.name);
        }
        this$1.isOpened = val.indexOf(this$1.name) > -1;
      },
      { immediate: true }
    );
  },
  beforeDestroy: function beforeDestroy() {
    this.unwatchActivedName();
    this.unwatchOpenedNames();
  },
  methods: {
    show: function show(visible) {
      this.visible = visible;
      if (visible && this.isHor) {
        this.listStyle = { minWidth: ((this.$el.offsetWidth) + "px") };
      }
    },
    onMouseenter: function onMouseenter() {
      clearTimeout(this.tid);
      if (this.isHor) { this.show(true); }
    },
    onMouseleave: function onMouseleave() {
      var this$1 = this;

      if (this.isHor) { this.tid = setTimeout(function () { return this$1.show(false); }, 150); }
    },
    onTitleClick: function onTitleClick() {
      findParent(this, 'XMenu').toggleSubmenu(this);
    },
    getSubAll: function getSubAll() {
      var arr = [], waitCheck = findChildrens(this, 'XSubmenu');
      while (waitCheck.length) {
        var current = waitCheck.pop();
        arr.push(current);
        waitCheck.push.apply(waitCheck, findChildrens(current, 'XSubmenu'));
      }
      return arr
    },
    getSiblings: function getSiblings() {
      var this$1 = this;

      return findChildrens(
        findParent(this, 'XSubmenu') || findParent(this, 'XMenu'),
        'XSubmenu'
      ).filter(function (_) { return _.name !== this$1.name; })
    },
    hasExpandedChild: function hasExpandedChild() {
      var menu = findParent(this, 'XMenu');
      return this.getSubAll().some(function (_) { return menu.openedNames.indexOf(_.name) > -1; })
    }
  }
};

/* script */
var __vue_script__$14 = script$14;

/* template */
var __vue_render__$18 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.isHor
    ? _c(
        "x-popper",
        _vm._b(
          {
            class: _vm.prefix,
            on: { mouseenter: _vm.onMouseenter, mouseleave: _vm.onMouseleave }
          },
          "x-popper",
          _vm.popperProps,
          false
        ),
        [
          _c(
            "div",
            {
              class: _vm.titleClass,
              attrs: { slot: "reference" },
              slot: "reference"
            },
            [
              _vm._t("title"),
              _vm._v(" "),
              _c("x-icon", {
                class: [_vm.prefix + "_arrow", { isOpened: _vm.visible }],
                attrs: { type: "ios-arrow-down" }
              })
            ],
            2
          ),
          _vm._v(" "),
          _c(
            "ul",
            { class: _vm.prefix + "_list", style: _vm.listStyle },
            [_vm._t("default")],
            2
          )
        ]
      )
    : _c(
        "li",
        { class: _vm.prefix },
        [
          _c(
            "div",
            {
              class: _vm.titleClass,
              style: _vm.titleStyle,
              on: { click: _vm.onTitleClick }
            },
            [
              _vm._t("title"),
              _vm._v(" "),
              _c("span", { class: _vm.prefix + "_spring" }),
              _vm._v(" "),
              _c("x-icon", {
                class: [_vm.prefix + "_arrow", { isOpened: _vm.isOpened }],
                attrs: { type: "ios-arrow-down" }
              })
            ],
            2
          ),
          _vm._v(" "),
          _c("x-collapse-transition", [
            _c(
              "ul",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.isOpened,
                    expression: "isOpened"
                  }
                ],
                class: _vm.prefix + "_list"
              },
              [_vm._t("default")],
              2
            )
          ])
        ],
        1
      )
};
var __vue_staticRenderFns__$18 = [];
__vue_render__$18._withStripped = true;

  /* style */
  var __vue_inject_styles__$18 = undefined;
  /* scoped */
  var __vue_scope_id__$18 = undefined;
  /* module identifier */
  var __vue_module_identifier__$18 = undefined;
  /* functional template */
  var __vue_is_functional_template__$18 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$18 = normalizeComponent(
    { render: __vue_render__$18, staticRenderFns: __vue_staticRenderFns__$18 },
    __vue_inject_styles__$18,
    __vue_script__$14,
    __vue_scope_id__$18,
    __vue_is_functional_template__$18,
    __vue_module_identifier__$18,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$15 = {
  mixins: [watchMode],
  name: 'XMenuItem',
  props: {
    name: [String, Number]
  },
  data: function data() {
    return { active: false }
  },
  mounted: function mounted() {
    var this$1 = this;

    var menu = findParent(this, 'XMenu');
    this.unwatchActivedName = this.$watch(
      function () { return menu.activedItemName; },
      function (val) { return this$1.active = val === this$1.name; },
      { immediate: true }
    );
  },
  beforeDestroy: function beforeDestroy() {
    this.unwatchActivedName();
  },
  methods: {
    onClick: function onClick() {
      var menu = findParent(this, 'XMenu'), 
        submenu = findParent(this, 'XSubmenu');
      menu.updateActiveName(this.name);
      menu.$emit('on-select', this.name);
      if (menu.mode === 'horizontal' && submenu) { submenu.show(false); }
    }
  }
};

/* script */
var __vue_script__$15 = script$15;

/* template */
var __vue_render__$19 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "li",
    {
      class: ["x-menu-item", { active: _vm.active }],
      style: _vm.titleStyle,
      on: { click: _vm.onClick }
    },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$19 = [];
__vue_render__$19._withStripped = true;

  /* style */
  var __vue_inject_styles__$19 = undefined;
  /* scoped */
  var __vue_scope_id__$19 = undefined;
  /* module identifier */
  var __vue_module_identifier__$19 = undefined;
  /* functional template */
  var __vue_is_functional_template__$19 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$19 = normalizeComponent(
    { render: __vue_render__$19, staticRenderFns: __vue_staticRenderFns__$19 },
    __vue_inject_styles__$19,
    __vue_script__$15,
    __vue_scope_id__$19,
    __vue_is_functional_template__$19,
    __vue_module_identifier__$19,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$16 = {
  mixins: [watchMode],
  props: { title: String }
};

/* script */
var __vue_script__$16 = script$16;

/* template */
var __vue_render__$1a = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("li", [
    _c("div", { staticClass: "x-menu-group_title", style: _vm.titleStyle }, [
      _vm._v(_vm._s(_vm.title))
    ]),
    _vm._v(" "),
    _c("ul", [_vm._t("default")], 2)
  ])
};
var __vue_staticRenderFns__$1a = [];
__vue_render__$1a._withStripped = true;

  /* style */
  var __vue_inject_styles__$1a = undefined;
  /* scoped */
  var __vue_scope_id__$1a = undefined;
  /* module identifier */
  var __vue_module_identifier__$1a = undefined;
  /* functional template */
  var __vue_is_functional_template__$1a = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1a = normalizeComponent(
    { render: __vue_render__$1a, staticRenderFns: __vue_staticRenderFns__$1a },
    __vue_inject_styles__$1a,
    __vue_script__$16,
    __vue_scope_id__$1a,
    __vue_is_functional_template__$1a,
    __vue_module_identifier__$1a,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//

var script$17 = {
  props: { label: String }
};

/* script */
var __vue_script__$17 = script$17;
/* template */
var __vue_render__$1b = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("li", [
    _c("span", { staticClass: "x-option-group_title" }, [
      _vm._v(_vm._s(_vm.label))
    ]),
    _vm._v(" "),
    _c("ul", [_vm._t("default")], 2)
  ])
};
var __vue_staticRenderFns__$1b = [];
__vue_render__$1b._withStripped = true;

  /* style */
  var __vue_inject_styles__$1b = undefined;
  /* scoped */
  var __vue_scope_id__$1b = undefined;
  /* module identifier */
  var __vue_module_identifier__$1b = undefined;
  /* functional template */
  var __vue_is_functional_template__$1b = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1b = normalizeComponent(
    { render: __vue_render__$1b, staticRenderFns: __vue_staticRenderFns__$1b },
    __vue_inject_styles__$1b,
    __vue_script__$17,
    __vue_scope_id__$1b,
    __vue_is_functional_template__$1b,
    __vue_module_identifier__$1b,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$18 = {
  name: 'XAutocomplete',
  components: { XInput: __vue_component__$I, XPopper: __vue_component__$X },
  props: {
    value: [String, Number],
    data: {
      type: Array,
      default: function () { return []; }
    },
    filterMethod: {
      type: [Function, Boolean],
      default: false
    },
    placement: String,
    transfer: Boolean
  },
  data: function data() {
    return {
      children: [],
      visible: false,
      listStyle: null,
      focusValue: this.value,
      inputValue: this.value,
      prefix: 'x-autocomplete'
    }
  },
  computed: {
    popperProps: function popperProps() {
      return {
        ref: 'Popper',
        adaptive: false,
        transfer: this.transfer,
        transitionName: 'x-animate-dropdown',
        placement: this.placement || 'bottom-start',
        visible: this.visible && (this.children.length > 0 || this.filtered.length > 0)
      }
    },
    filtered: function filtered() {
      var val = this.inputValue, filter = this.filterMethod;
      return val && filter ? this.data.filter(function (_) { return isFunc(filter) ? filter(val, _) : (_ + '').indexOf(val) > -1; }) : this.data
    },
    inputListeners: function inputListeners() {
      var this$1 = this;

      return Object.assign({}, this.$listeners,
        {click: function () { return this$1.toggle(); },
        input: function () { return this$1.toggle(true); },
        'on-keydown': this.onKeydown})
    }
  },
  watch: {
    value: function value(val) {
      this.inputValue = val;
    },
    inputValue: function inputValue(val) {
      this.$emit('input', val);
      this.$emit('on-change', val);
      val && this.$emit('on-search', val);
      this.updateFocus();
      this.focusValue = val;
    },
    visible: function visible(val) {
      var this$1 = this;

      if (val) {
        this.updateFocus();
        this.$nextTick(function () { return this$1.listStyle = { minWidth: ((this$1.$el.offsetWidth) + "px") }; });
      }
    }
  },
  methods: {
    updateFocus: function updateFocus() {
      var this$1 = this;

      if (this.children.length) { this.children.forEach(function (_) { return _.focus = [_.value, _.label].indexOf(this$1.inputValue) > -1; }); }
    },
    addItem: function addItem(vm) {
      this.children.push(vm);
    },
    removeItem: function removeItem(vm) {
      this.children.splice(this.children.indexOf(vm), 1);
    },
    updateSelected: function updateSelected(vm) {
      this.toggle(false);
      this.inputValue = vm.label || vm.value;
      this.children.forEach(function (_) { return _.focus = false; });
      vm.focus = true;
    },
    toggle: function toggle(visible) {
      this.visible = visible === undefined ? !this.visible : visible;
    },
    onItemClick: function onItemClick(val) {
      this.toggle(false);
      this.inputValue = val;
    },
    onKeydown: function onKeydown(e) {
      if (this.visible) { // 38: 向上, 40: 向下, 27: ESC, 13: 回车, 9: TAB
        if ([9, 27, 38, 40].indexOf(e.keyCode) > -1) { e.preventDefault(); }
        var action = {
          13: this.onEnter,
          27: this.toggle,
          38: this.setFocus.bind(this, true),
          40: this.setFocus
        }[e.keyCode];
        action && action();
      }
    },
    onEnter: function onEnter() {
      if (this.children.length) {
        var vm = this.children.find(function (_) { return _.focus; });
        return vm ? this.updateSelected(vm) : this.toggle()
      }
      this.toggle();
      this.inputValue = this.focusValue;
    },
    getNextIndex: function getNextIndex(index, len, isUp) {
      return isUp ? (index <= 0 ? len - 1 : index - 1) : (index < len - 1 ? index + 1 : 0)
    },
    setFocus: function setFocus(isUp) {
      if (this.children.length) {
        var children = this.children.filter(function (_) { return !_.disabled; });
        if (children.length) {
          var index = children.findIndex(function (_) { return _.focus; });
          this.children.forEach(function (_) { return _.focus = false; });
          children[this.getNextIndex(index, children.length, isUp)].focus = true;
        }
      } else {
        var index$1 = this.filtered.indexOf(this.focusValue);
        this.focusValue = this.filtered[this.getNextIndex(index$1, this.filtered.length, isUp)];
      }
    }
  }
};

/* script */
var __vue_script__$18 = script$18;
/* template */
var __vue_render__$1c = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: _vm.prefix },
    [
      _c(
        "x-popper",
        _vm._b(
          {
            on: {
              clickoutside: function($event) {
                return _vm.toggle(false)
              }
            }
          },
          "x-popper",
          _vm.popperProps,
          false
        ),
        [
          _c(
            "x-input",
            _vm._g(
              _vm._b(
                {
                  attrs: { slot: "reference" },
                  slot: "reference",
                  model: {
                    value: _vm.inputValue,
                    callback: function($$v) {
                      _vm.inputValue = $$v;
                    },
                    expression: "inputValue"
                  }
                },
                "x-input",
                _vm.$attrs,
                false
              ),
              _vm.inputListeners
            )
          ),
          _vm._v(" "),
          _c(
            "ul",
            { class: _vm.prefix + "_list", style: _vm.listStyle },
            [
              _vm._t(
                "default",
                _vm._l(_vm.filtered, function(_, i) {
                  return _c(
                    "li",
                    {
                      key: i,
                      class: [
                        _vm.prefix + "_item",
                        { focus: _ === _vm.focusValue }
                      ],
                      on: {
                        click: function($event) {
                          return _vm.onItemClick(_)
                        }
                      }
                    },
                    [_vm._v(_vm._s(_))]
                  )
                })
              )
            ],
            2
          )
        ],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$1c = [];
__vue_render__$1c._withStripped = true;

  /* style */
  var __vue_inject_styles__$1c = undefined;
  /* scoped */
  var __vue_scope_id__$1c = undefined;
  /* module identifier */
  var __vue_module_identifier__$1c = undefined;
  /* functional template */
  var __vue_is_functional_template__$1c = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1c = normalizeComponent(
    { render: __vue_render__$1c, staticRenderFns: __vue_staticRenderFns__$1c },
    __vue_inject_styles__$1c,
    __vue_script__$18,
    __vue_scope_id__$1c,
    __vue_is_functional_template__$1c,
    __vue_module_identifier__$1c,
    false,
    undefined,
    undefined,
    undefined
  );

//
var B$e = Boolean, F$3 = Function;
var incKey = 0;
var script$19 = {
  name: 'XUpload',
  components: { XIcon: __vue_component__, XProgress: __vue_component__$q, XCloseIconButton: __vue_component__$7 },
  props: {
    action: { type: String, required: true },
    headers: { type: Object, default: function () { return ({}); } },
    disabled: B$e,
    data: Object,
    name: { type: String, default: 'file' },
    withCredentials: B$e,
    showUploadList: { type: B$e, default: true },
    type: { default: 'select', validator: function (v) { return ['select', 'drag'].indexOf(v) > -1; } },
    format: { type: Array, default: function () { return []; } },
    maxSize: Number,
    beforeUpload: F$3,
    onProgress: F$3,
    onSuccess: F$3,
    onError: F$3,
    onPreview: F$3,
    onRemove: F$3,
    onFormatError: F$3,
    onExceededSize: F$3,
    defaultFileList: { type: Array, default: function () { return []; } }
  },
  data: function data() {
    return { prefix: 'x-upload', fileList: [], dragOver: false }
  },
  computed: {
    inputProps: function inputProps() {
      return Object.assign({}, this.$attrs, {type: 'file', ref: 'File', disabled: this.disabled})
    }
  },
  watch: {
    defaultFileList: {
      immediate: true,
      handler: function handler(val) {
        this.fileList = val.map(function (_) { return (Object.assign({}, _,  {key: incKey++, status: 'success'})); });
      }
    }
  },
  methods: {
    selectFile: function selectFile() {
      this.$refs.File.click();
    },
    onDrop: function onDrop(e) {
      this.dragOver = false;
      if (!this.disabled) { this.onFileChange(e); }
    },
    onFileChange: function onFileChange(e) {
      var this$1 = this;

      Array.from(e.target.files || e.dataTransfer.files).forEach(function (_) { return this$1.validate(_) && this$1.upload(_); });
      this.$nextTick(function () { return e.target.value = ''; });
    },
    validate: function validate(file) {
      if (this.format.length) {
        var fileFormat = file.name.split('.').pop().toLowerCase();
        if (this.format.indexOf(fileFormat) < 0) {
          this.onFormatError && this.onFormatError(file, this.fileList);
          return false
        }
      } else if (this.maxSize && file.size > this.maxSize * 1024) {
        this.onExceededSize && this.onExceededSize(file, this.fileList);
        return false
      }
      return true
    },
    onFail: function onFail(e, item) {
      item.percent = 100;
      item.status = 'wrong';
      item.showProgress = false;
      this.fileList.splice(this.fileList.indexOf(item), 1);
      this.onError && this.onError(e, item, this.fileList);
    },
    upload: function upload(file) {
      var this$1 = this;

      var fileItem = {
        file: file,
        percent: 0,
        key: incKey++,
        name: file.name,
        status: 'normal'
      };
      if (this.beforeUpload) {
        var result = this.beforeUpload(file);
        if (result === false || result instanceof Promise) { return }
      }
      fileItem.showProgress = true;
      this.fileList.push(fileItem);
      var formData = new FormData();
      formData.append(this.name, file);
      this.data && Object.keys(this.data).forEach(function (_) { return formData.append(_, this$1.data[_]); });
      var xhr = new XMLHttpRequest();
      xhr.onprogress = function (e) {
        if (e.total > 0) {
          fileItem.percent = e.loaded / e.total * 100;
        }
        this$1.onProgress && this$1.onProgress(e, fileItem, this$1.fileList);
      };
      xhr.onload = function () {
        if (xhr.status < 200 || xhr.status >= 300) {
          return this$1.onFail(new Error(("fail to post " + (this$1.action) + " " + (xhr.status))), fileItem)
        }
        fileItem.percent = 100;
        fileItem.status = 'success';
        fileItem.showProgress = false;
        fileItem.response = xhr.response;
        this$1.onSuccess && this$1.onSuccess(xhr.response, fileItem, this$1.fileList);
      };
      xhr.onerror = function (e) { return this$1.onFail(e, fileItem); };
      xhr.open('post', this.action, true);
      xhr.withCredentials = this.withCredentials;
      Object.keys(this.headers).forEach(function (_) { return xhr.setRequestHeader(_, headers[_]); });
      xhr.send(formData);
    },
    removeItem: function removeItem(item) {
      this.fileList.splice(this.fileList.indexOf(item), 1);
      this.onRemove && this.onRemove(item, this.fileList);
    },
    previewItem: function previewItem(item) {
      this.onPreview && this.onPreview(item);
    },
    clearFiles: function clearFiles() {
      this.fileList = [];
    }
  }
};

/* script */
var __vue_script__$19 = script$19;
/* template */
var __vue_render__$1d = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { class: _vm.prefix }, [
    _c(
      "input",
      _vm._b(
        {
          directives: [
            { name: "show", rawName: "v-show", value: 0, expression: "0" }
          ],
          on: { change: _vm.onFileChange }
        },
        "input",
        _vm.inputProps,
        false
      )
    ),
    _vm._v(" "),
    _c(
      "div",
      {
        class: [_vm.prefix + "_" + _vm.type, { dragOver: _vm.dragOver }],
        on: {
          click: _vm.selectFile,
          drop: function($event) {
            $event.preventDefault();
            return _vm.onDrop($event)
          },
          dragover: function($event) {
            $event.preventDefault();
            _vm.dragOver = true;
          },
          dragleave: function($event) {
            $event.preventDefault();
            _vm.dragOver = false;
          }
        }
      },
      [_vm._t("default")],
      2
    ),
    _vm._v(" "),
    _vm.showUploadList
      ? _c(
          "ul",
          { class: _vm.prefix + "_list" },
          _vm._l(_vm.fileList, function(_) {
            return _c(
              "li",
              { key: _.key },
              [
                _c(
                  "div",
                  { class: _vm.prefix + "_finish" },
                  [
                    _c("x-icon", { attrs: { type: "document" } }),
                    _vm._v(" "),
                    _c(
                      "span",
                      {
                        class: _vm.prefix + "_filename",
                        on: { click: _vm.previewItem }
                      },
                      [_vm._v(_vm._s(_.name))]
                    ),
                    _vm._v(" "),
                    _c("b", { class: _vm.prefix + "_spring" }),
                    _vm._v(" "),
                    _.status !== "normal"
                      ? _c("x-close-icon-button", {
                          class: _vm.prefix + "_remove",
                          attrs: { size: "18" },
                          on: {
                            click: function($event) {
                              return _vm.removeItem(_)
                            }
                          }
                        })
                      : _vm._e()
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "transition",
                  { attrs: { name: _vm.prefix + "_progress" } },
                  [
                    _.showProgress
                      ? _c("x-progress", {
                          class: _vm.prefix + "_progress",
                          attrs: {
                            strokeWidth: 2,
                            percent: _.percent,
                            status: _.status
                          }
                        })
                      : _vm._e()
                  ],
                  1
                )
              ],
              1
            )
          }),
          0
        )
      : _vm._e(),
    _vm._v(" "),
    _vm.$slots.tip
      ? _c("div", { class: _vm.prefix + "_tip" }, [_vm._t("tip")], 2)
      : _vm._e()
  ])
};
var __vue_staticRenderFns__$1d = [];
__vue_render__$1d._withStripped = true;

  /* style */
  var __vue_inject_styles__$1d = undefined;
  /* scoped */
  var __vue_scope_id__$1d = undefined;
  /* module identifier */
  var __vue_module_identifier__$1d = undefined;
  /* functional template */
  var __vue_is_functional_template__$1d = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1d = normalizeComponent(
    { render: __vue_render__$1d, staticRenderFns: __vue_staticRenderFns__$1d },
    __vue_inject_styles__$1d,
    __vue_script__$19,
    __vue_scope_id__$1d,
    __vue_is_functional_template__$1d,
    __vue_module_identifier__$1d,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$1a = {
  name: 'XCascaderItem',
  components: { XIcon: __vue_component__, XLoading: __vue_component__$z },
  props: { option: Object },
  data: function data() {
    return { prefix: 'x-cascader-item', selected: false }
  }
};

/* script */
var __vue_script__$1a = script$1a;
/* template */
var __vue_render__$1e = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "li",
    { class: [_vm.prefix, { selected: _vm.selected }] },
    [
      _c("span", { class: _vm.prefix + "_label" }, [
        _vm._v(_vm._s(_vm.option.label))
      ]),
      _vm._v(" "),
      _vm.option.children
        ? [
            _vm.option.loading
              ? _c("x-loading", {
                  attrs: { iconClass: _vm.prefix + "_loadingIcon", loading: "" }
                })
              : _c("x-icon", { attrs: { type: "ios-arrow-right" } })
          ]
        : _vm._e()
    ],
    2
  )
};
var __vue_staticRenderFns__$1e = [];
__vue_render__$1e._withStripped = true;

  /* style */
  var __vue_inject_styles__$1e = undefined;
  /* scoped */
  var __vue_scope_id__$1e = undefined;
  /* module identifier */
  var __vue_module_identifier__$1e = undefined;
  /* functional template */
  var __vue_is_functional_template__$1e = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1e = normalizeComponent(
    { render: __vue_render__$1e, staticRenderFns: __vue_staticRenderFns__$1e },
    __vue_inject_styles__$1e,
    __vue_script__$1a,
    __vue_scope_id__$1e,
    __vue_is_functional_template__$1e,
    __vue_module_identifier__$1e,
    false,
    undefined,
    undefined,
    undefined
  );

//
var getChildren = function (vm, name) {
  if ( name === void 0 ) name = 'XCascaderMenu';

  return vm.$children.filter(function (_) { return _.$options.name === name; });
};
var script$1b = {
  name: 'XCascaderMenu',
  components: { XCascaderItem: __vue_component__$1e },
  props: { data: Array },
  data: function data() {
    return { prefix: 'x-cascader-menu', nextData: null }
  },
  methods: {
    onItemClick: function onItemClick(option, e) {
      var this$1 = this;

      var ref = findParent(this, 'XCascader');
      var trigger = ref.trigger;
      var loadData = ref.loadData;
      var isClick = e.type === 'click',
        isHover = e.type === 'mouseenter' && trigger === 'hover';
      if (isClick || isHover) {
        this.getSubMenus().forEach(function (_) { return _.nextData = null; });
        if (loadData && option.children && option.children.length < 1) {
          loadData(option, function () { return this$1.nextData = option.children; });
        } else {
          this.nextData = option.children;
        }
        getChildren(this, 'XCascaderItem').forEach(function (_) {
          if (isClick || option.children) {
            _.selected = _.option.value === option.value;
          }
        });
      }
      if (!option.children && isClick) {
        findParent(this, 'XCascader').updateValue();
      }
    },
    getSubMenus: function getSubMenus() {
      var menus = [], menu = getChildren(this)[0];
      while (menu) {
        menus.push(menu);
        menu = getChildren(menu)[0];
      }
      return menus
    }
  }
};

/* script */
var __vue_script__$1b = script$1b;
/* template */
var __vue_render__$1f = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "span",
    [
      _c(
        "ul",
        { class: _vm.prefix },
        _vm._l(_vm.data, function(_) {
          return _c("x-cascader-item", {
            key: _.value,
            attrs: { option: _ },
            nativeOn: {
              click: function($event) {
                return _vm.onItemClick(_, $event)
              },
              mouseenter: function($event) {
                return _vm.onItemClick(_, $event)
              }
            }
          })
        }),
        1
      ),
      _vm._v(" "),
      _vm.nextData
        ? _c("x-cascader-menu", { attrs: { data: _vm.nextData } })
        : _vm._e()
    ],
    1
  )
};
var __vue_staticRenderFns__$1f = [];
__vue_render__$1f._withStripped = true;

  /* style */
  var __vue_inject_styles__$1f = undefined;
  /* scoped */
  var __vue_scope_id__$1f = undefined;
  /* module identifier */
  var __vue_module_identifier__$1f = undefined;
  /* functional template */
  var __vue_is_functional_template__$1f = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1f = normalizeComponent(
    { render: __vue_render__$1f, staticRenderFns: __vue_staticRenderFns__$1f },
    __vue_inject_styles__$1f,
    __vue_script__$1b,
    __vue_scope_id__$1f,
    __vue_is_functional_template__$1f,
    __vue_module_identifier__$1f,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$1c = {
  name: 'XCascader',
  components: { XInput: __vue_component__$I, XPopper: __vue_component__$X, XCascaderMenu: __vue_component__$1f },
  props: {
    data: {
      type: Array,
      default: function () { return []; }
    },
    value: {
      type: Array,
      default: function () { return []; }
    },
    disabled: Boolean,
    renderFormat: {
      type: Function,
      default: function (label) { return label.join(' / '); }
    },
    trigger: {
      validator: function (v) { return ['click', 'hover'].indexOf(v) > -1; }
    },
    changeOnSelect: Boolean,
    loadData: Function,
    filterable: Boolean,
    notFoundText: {
      type: String,
      default: '无匹配数据'
    },
    transfer: Boolean
  },
  data: function data() {
    return { visible: false, selectedValue: this.value }
  },
  computed: {
    inputProps: function inputProps() {
      return Object.assign({}, {clearable: true,
        placeholder: '请选择'},
        this.$attrs,
        {icon: 'ios-arrow-down',
        disabled: this.disabled,
        value: this.inputValue,
        readonly: !this.filterable})
    },
    popperProps: function popperProps() {
      return {
        adaptive: false,
        visible: this.visible,
        transfer: this.transfer,
        placement: 'bottom-start',
        transitionName: 'x-animate-dropdown'
      }
    },
    inputValue: function inputValue() {
      var selected = this.getSelected();
      return this.renderFormat(selected.map(function (_) { return _.label; }), selected)
    }
  },
  watch: {
    value: function value(val) {
      this.selectedValue = val;
    },
    selectedValue: function selectedValue(val) {
      this.$emit('input', val);
    }
  },
  methods: {
    toggle: function toggle(visible) {
      this.visible = visible === undefined ? !this.visible : visible;
    },
    onClick: function onClick() {
      !this.disabled && this.toggle();
    },
    onClear: function onClear() {
      this.toggle(false);
      this.selectedValue = [];
      this.emitChange();
    },
    onVisibleChange: function onVisibleChange(visible) {
      var this$1 = this;

      this.$emit('on-visible-change', visible);
      if (visible) {
        var menus = findChildrens(this, 'XCascaderMenu');
        menus.forEach(function (_) { return _.nextData = null; });
        var eachItems = function (menu) {
          var items = menu.$children.filter(function (_) { return _.$options.name === 'XCascaderItem'; });
          items.forEach(function (_) { return _.selected = this$1.selectedValue.indexOf(_.option.value) > -1; });
          var item = items.find(function (_) { return _.selected; });
          if (item) {
            menu.nextData = item.option.children;
            if (menu.nextData) {
              this$1.$nextTick(function () { return eachItems(menu.$children.find(function (_) { return _.$options.name === 'XCascaderMenu'; })); });
            }
          }
        };
        eachItems(menus[0]);
      }
    },
    emitChange: function emitChange() {
      this.$emit('on-change', this.selectedValue, this.getSelected());
    },
    updateValue: function updateValue() {
      this.toggle(false);
      this.selectedValue = findChildrens(this, 'XCascaderItem').filter(function (_) { return _.selected; }).map(function (_) { return _.option.value; });
      this.emitChange();
    },
    getFlatData: function getFlatData() {
      var reduce = function (data) { return data.reduce(function (acc, _) { return acc.concat( [_], (_.children ? reduce(_.children) : [])); }, []); };
      return reduce(this.data)
    },
    getSelected: function getSelected() {
      var this$1 = this;

      return this.getFlatData().filter(function (_) { return this$1.selectedValue.indexOf(_.value) > -1; })
    }
  }
};

/* script */
var __vue_script__$1c = script$1c;
/* template */
var __vue_render__$1g = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: ["x-cascader", { noSlot: !_vm.$slots.default }] },
    [
      _c(
        "x-popper",
        _vm._b(
          {
            on: {
              clickoutside: function($event) {
                return _vm.toggle(false)
              },
              "on-popper-show": function($event) {
                return _vm.onVisibleChange(true)
              },
              "on-popper-hide": function($event) {
                return _vm.onVisibleChange(false)
              }
            }
          },
          "x-popper",
          _vm.popperProps,
          false
        ),
        [
          _c(
            "span",
            {
              attrs: { slot: "reference" },
              on: { click: _vm.onClick },
              slot: "reference"
            },
            [
              _vm._t("default", [
                _c(
                  "x-input",
                  _vm._b(
                    {
                      on: {
                        "on-clear": function($event) {
                          $event.stopPropagation();
                          return _vm.onClear($event)
                        }
                      }
                    },
                    "x-input",
                    _vm.inputProps,
                    false
                  )
                )
              ])
            ],
            2
          ),
          _vm._v(" "),
          _c("x-cascader-menu", { attrs: { data: _vm.data } })
        ],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$1g = [];
__vue_render__$1g._withStripped = true;

  /* style */
  var __vue_inject_styles__$1g = undefined;
  /* scoped */
  var __vue_scope_id__$1g = undefined;
  /* module identifier */
  var __vue_module_identifier__$1g = undefined;
  /* functional template */
  var __vue_is_functional_template__$1g = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1g = normalizeComponent(
    { render: __vue_render__$1g, staticRenderFns: __vue_staticRenderFns__$1g },
    __vue_inject_styles__$1g,
    __vue_script__$1c,
    __vue_scope_id__$1g,
    __vue_is_functional_template__$1g,
    __vue_module_identifier__$1g,
    false,
    undefined,
    undefined,
    undefined
  );

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var tinycolor = createCommonjsModule(function (module) {
// TinyColor v1.4.1
// https://github.com/bgrins/TinyColor
// Brian Grinstead, MIT License

(function(Math) {

var trimLeft = /^\s+/,
    trimRight = /\s+$/,
    tinyCounter = 0,
    mathRound = Math.round,
    mathMin = Math.min,
    mathMax = Math.max,
    mathRandom = Math.random;

function tinycolor (color, opts) {

    color = (color) ? color : '';
    opts = opts || { };

    // If input is already a tinycolor, return itself
    if (color instanceof tinycolor) {
       return color;
    }
    // If we are called as a function, call using new instead
    if (!(this instanceof tinycolor)) {
        return new tinycolor(color, opts);
    }

    var rgb = inputToRGB(color);
    this._originalInput = color,
    this._r = rgb.r,
    this._g = rgb.g,
    this._b = rgb.b,
    this._a = rgb.a,
    this._roundA = mathRound(100*this._a) / 100,
    this._format = opts.format || rgb.format;
    this._gradientType = opts.gradientType;

    // Don't let the range of [0,255] come back in [0,1].
    // Potentially lose a little bit of precision here, but will fix issues where
    // .5 gets interpreted as half of the total, instead of half of 1
    // If it was supposed to be 128, this was already taken care of by `inputToRgb`
    if (this._r < 1) { this._r = mathRound(this._r); }
    if (this._g < 1) { this._g = mathRound(this._g); }
    if (this._b < 1) { this._b = mathRound(this._b); }

    this._ok = rgb.ok;
    this._tc_id = tinyCounter++;
}

tinycolor.prototype = {
    isDark: function() {
        return this.getBrightness() < 128;
    },
    isLight: function() {
        return !this.isDark();
    },
    isValid: function() {
        return this._ok;
    },
    getOriginalInput: function() {
      return this._originalInput;
    },
    getFormat: function() {
        return this._format;
    },
    getAlpha: function() {
        return this._a;
    },
    getBrightness: function() {
        //http://www.w3.org/TR/AERT#color-contrast
        var rgb = this.toRgb();
        return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    },
    getLuminance: function() {
        //http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
        var rgb = this.toRgb();
        var RsRGB, GsRGB, BsRGB, R, G, B;
        RsRGB = rgb.r/255;
        GsRGB = rgb.g/255;
        BsRGB = rgb.b/255;

        if (RsRGB <= 0.03928) {R = RsRGB / 12.92;} else {R = Math.pow(((RsRGB + 0.055) / 1.055), 2.4);}
        if (GsRGB <= 0.03928) {G = GsRGB / 12.92;} else {G = Math.pow(((GsRGB + 0.055) / 1.055), 2.4);}
        if (BsRGB <= 0.03928) {B = BsRGB / 12.92;} else {B = Math.pow(((BsRGB + 0.055) / 1.055), 2.4);}
        return (0.2126 * R) + (0.7152 * G) + (0.0722 * B);
    },
    setAlpha: function(value) {
        this._a = boundAlpha(value);
        this._roundA = mathRound(100*this._a) / 100;
        return this;
    },
    toHsv: function() {
        var hsv = rgbToHsv(this._r, this._g, this._b);
        return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a };
    },
    toHsvString: function() {
        var hsv = rgbToHsv(this._r, this._g, this._b);
        var h = mathRound(hsv.h * 360), s = mathRound(hsv.s * 100), v = mathRound(hsv.v * 100);
        return (this._a == 1) ?
          "hsv("  + h + ", " + s + "%, " + v + "%)" :
          "hsva(" + h + ", " + s + "%, " + v + "%, "+ this._roundA + ")";
    },
    toHsl: function() {
        var hsl = rgbToHsl(this._r, this._g, this._b);
        return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a };
    },
    toHslString: function() {
        var hsl = rgbToHsl(this._r, this._g, this._b);
        var h = mathRound(hsl.h * 360), s = mathRound(hsl.s * 100), l = mathRound(hsl.l * 100);
        return (this._a == 1) ?
          "hsl("  + h + ", " + s + "%, " + l + "%)" :
          "hsla(" + h + ", " + s + "%, " + l + "%, "+ this._roundA + ")";
    },
    toHex: function(allow3Char) {
        return rgbToHex(this._r, this._g, this._b, allow3Char);
    },
    toHexString: function(allow3Char) {
        return '#' + this.toHex(allow3Char);
    },
    toHex8: function(allow4Char) {
        return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);
    },
    toHex8String: function(allow4Char) {
        return '#' + this.toHex8(allow4Char);
    },
    toRgb: function() {
        return { r: mathRound(this._r), g: mathRound(this._g), b: mathRound(this._b), a: this._a };
    },
    toRgbString: function() {
        return (this._a == 1) ?
          "rgb("  + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" :
          "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
    },
    toPercentageRgb: function() {
        return { r: mathRound(bound01(this._r, 255) * 100) + "%", g: mathRound(bound01(this._g, 255) * 100) + "%", b: mathRound(bound01(this._b, 255) * 100) + "%", a: this._a };
    },
    toPercentageRgbString: function() {
        return (this._a == 1) ?
          "rgb("  + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" :
          "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
    },
    toName: function() {
        if (this._a === 0) {
            return "transparent";
        }

        if (this._a < 1) {
            return false;
        }

        return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
    },
    toFilter: function(secondColor) {
        var hex8String = '#' + rgbaToArgbHex(this._r, this._g, this._b, this._a);
        var secondHex8String = hex8String;
        var gradientType = this._gradientType ? "GradientType = 1, " : "";

        if (secondColor) {
            var s = tinycolor(secondColor);
            secondHex8String = '#' + rgbaToArgbHex(s._r, s._g, s._b, s._a);
        }

        return "progid:DXImageTransform.Microsoft.gradient("+gradientType+"startColorstr="+hex8String+",endColorstr="+secondHex8String+")";
    },
    toString: function(format) {
        var formatSet = !!format;
        format = format || this._format;

        var formattedString = false;
        var hasAlpha = this._a < 1 && this._a >= 0;
        var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8" || format === "name");

        if (needsAlphaFormat) {
            // Special case for "transparent", all other non-alpha formats
            // will return rgba when there is transparency.
            if (format === "name" && this._a === 0) {
                return this.toName();
            }
            return this.toRgbString();
        }
        if (format === "rgb") {
            formattedString = this.toRgbString();
        }
        if (format === "prgb") {
            formattedString = this.toPercentageRgbString();
        }
        if (format === "hex" || format === "hex6") {
            formattedString = this.toHexString();
        }
        if (format === "hex3") {
            formattedString = this.toHexString(true);
        }
        if (format === "hex4") {
            formattedString = this.toHex8String(true);
        }
        if (format === "hex8") {
            formattedString = this.toHex8String();
        }
        if (format === "name") {
            formattedString = this.toName();
        }
        if (format === "hsl") {
            formattedString = this.toHslString();
        }
        if (format === "hsv") {
            formattedString = this.toHsvString();
        }

        return formattedString || this.toHexString();
    },
    clone: function() {
        return tinycolor(this.toString());
    },

    _applyModification: function(fn, args) {
        var color = fn.apply(null, [this].concat([].slice.call(args)));
        this._r = color._r;
        this._g = color._g;
        this._b = color._b;
        this.setAlpha(color._a);
        return this;
    },
    lighten: function() {
        return this._applyModification(lighten, arguments);
    },
    brighten: function() {
        return this._applyModification(brighten, arguments);
    },
    darken: function() {
        return this._applyModification(darken, arguments);
    },
    desaturate: function() {
        return this._applyModification(desaturate, arguments);
    },
    saturate: function() {
        return this._applyModification(saturate, arguments);
    },
    greyscale: function() {
        return this._applyModification(greyscale, arguments);
    },
    spin: function() {
        return this._applyModification(spin, arguments);
    },

    _applyCombination: function(fn, args) {
        return fn.apply(null, [this].concat([].slice.call(args)));
    },
    analogous: function() {
        return this._applyCombination(analogous, arguments);
    },
    complement: function() {
        return this._applyCombination(complement, arguments);
    },
    monochromatic: function() {
        return this._applyCombination(monochromatic, arguments);
    },
    splitcomplement: function() {
        return this._applyCombination(splitcomplement, arguments);
    },
    triad: function() {
        return this._applyCombination(triad, arguments);
    },
    tetrad: function() {
        return this._applyCombination(tetrad, arguments);
    }
};

// If input is an object, force 1 into "1.0" to handle ratios properly
// String input requires "1.0" as input, so 1 will be treated as 1
tinycolor.fromRatio = function(color, opts) {
    if (typeof color == "object") {
        var newColor = {};
        for (var i in color) {
            if (color.hasOwnProperty(i)) {
                if (i === "a") {
                    newColor[i] = color[i];
                }
                else {
                    newColor[i] = convertToPercentage(color[i]);
                }
            }
        }
        color = newColor;
    }

    return tinycolor(color, opts);
};

// Given a string or object, convert that input to RGB
// Possible string inputs:
//
//     "red"
//     "#f00" or "f00"
//     "#ff0000" or "ff0000"
//     "#ff000000" or "ff000000"
//     "rgb 255 0 0" or "rgb (255, 0, 0)"
//     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
//     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
//     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
//     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
//     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
//     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
//
function inputToRGB(color) {

    var rgb = { r: 0, g: 0, b: 0 };
    var a = 1;
    var s = null;
    var v = null;
    var l = null;
    var ok = false;
    var format = false;

    if (typeof color == "string") {
        color = stringInputToObject(color);
    }

    if (typeof color == "object") {
        if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
            rgb = rgbToRgb(color.r, color.g, color.b);
            ok = true;
            format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
        }
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
            s = convertToPercentage(color.s);
            v = convertToPercentage(color.v);
            rgb = hsvToRgb(color.h, s, v);
            ok = true;
            format = "hsv";
        }
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
            s = convertToPercentage(color.s);
            l = convertToPercentage(color.l);
            rgb = hslToRgb(color.h, s, l);
            ok = true;
            format = "hsl";
        }

        if (color.hasOwnProperty("a")) {
            a = color.a;
        }
    }

    a = boundAlpha(a);

    return {
        ok: ok,
        format: color.format || format,
        r: mathMin(255, mathMax(rgb.r, 0)),
        g: mathMin(255, mathMax(rgb.g, 0)),
        b: mathMin(255, mathMax(rgb.b, 0)),
        a: a
    };
}


// Conversion Functions
// --------------------

// `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
// <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>

// `rgbToRgb`
// Handle bounds / percentage checking to conform to CSS color spec
// <http://www.w3.org/TR/css3-color/>
// *Assumes:* r, g, b in [0, 255] or [0, 1]
// *Returns:* { r, g, b } in [0, 255]
function rgbToRgb(r, g, b){
    return {
        r: bound01(r, 255) * 255,
        g: bound01(g, 255) * 255,
        b: bound01(b, 255) * 255
    };
}

// `rgbToHsl`
// Converts an RGB color value to HSL.
// *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
// *Returns:* { h, s, l } in [0,1]
function rgbToHsl(r, g, b) {

    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);

    var max = mathMax(r, g, b), min = mathMin(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min) {
        h = s = 0; // achromatic
    }
    else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }

    return { h: h, s: s, l: l };
}

// `hslToRgb`
// Converts an HSL color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
function hslToRgb(h, s, l) {
    var r, g, b;

    h = bound01(h, 360);
    s = bound01(s, 100);
    l = bound01(l, 100);

    function hue2rgb(p, q, t) {
        if(t < 0) { t += 1; }
        if(t > 1) { t -= 1; }
        if(t < 1/6) { return p + (q - p) * 6 * t; }
        if(t < 1/2) { return q; }
        if(t < 2/3) { return p + (q - p) * (2/3 - t) * 6; }
        return p;
    }

    if(s === 0) {
        r = g = b = l; // achromatic
    }
    else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return { r: r * 255, g: g * 255, b: b * 255 };
}

// `rgbToHsv`
// Converts an RGB color value to HSV
// *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
// *Returns:* { h, s, v } in [0,1]
function rgbToHsv(r, g, b) {

    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);

    var max = mathMax(r, g, b), min = mathMin(r, g, b);
    var h, s, v = max;

    var d = max - min;
    s = max === 0 ? 0 : d / max;

    if(max == min) {
        h = 0; // achromatic
    }
    else {
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: h, s: s, v: v };
}

// `hsvToRgb`
// Converts an HSV color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
 function hsvToRgb(h, s, v) {

    h = bound01(h, 360) * 6;
    s = bound01(s, 100);
    v = bound01(v, 100);

    var i = Math.floor(h),
        f = h - i,
        p = v * (1 - s),
        q = v * (1 - f * s),
        t = v * (1 - (1 - f) * s),
        mod = i % 6,
        r = [v, q, p, p, t, v][mod],
        g = [t, v, v, q, p, p][mod],
        b = [p, p, t, v, v, q][mod];

    return { r: r * 255, g: g * 255, b: b * 255 };
}

// `rgbToHex`
// Converts an RGB color to hex
// Assumes r, g, and b are contained in the set [0, 255]
// Returns a 3 or 6 character hex
function rgbToHex(r, g, b, allow3Char) {

    var hex = [
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16))
    ];

    // Return a 3 character hex if possible
    if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
    }

    return hex.join("");
}

// `rgbaToHex`
// Converts an RGBA color plus alpha transparency to hex
// Assumes r, g, b are contained in the set [0, 255] and
// a in [0, 1]. Returns a 4 or 8 character rgba hex
function rgbaToHex(r, g, b, a, allow4Char) {

    var hex = [
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16)),
        pad2(convertDecimalToHex(a))
    ];

    // Return a 4 character hex if possible
    if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
    }

    return hex.join("");
}

// `rgbaToArgbHex`
// Converts an RGBA color to an ARGB Hex8 string
// Rarely used, but required for "toFilter()"
function rgbaToArgbHex(r, g, b, a) {

    var hex = [
        pad2(convertDecimalToHex(a)),
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16))
    ];

    return hex.join("");
}

// `equals`
// Can be called with any tinycolor input
tinycolor.equals = function (color1, color2) {
    if (!color1 || !color2) { return false; }
    return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
};

tinycolor.random = function() {
    return tinycolor.fromRatio({
        r: mathRandom(),
        g: mathRandom(),
        b: mathRandom()
    });
};


// Modification Functions
// ----------------------
// Thanks to less.js for some of the basics here
// <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>

function desaturate(color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.s -= amount / 100;
    hsl.s = clamp01(hsl.s);
    return tinycolor(hsl);
}

function saturate(color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.s += amount / 100;
    hsl.s = clamp01(hsl.s);
    return tinycolor(hsl);
}

function greyscale(color) {
    return tinycolor(color).desaturate(100);
}

function lighten (color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.l += amount / 100;
    hsl.l = clamp01(hsl.l);
    return tinycolor(hsl);
}

function brighten(color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var rgb = tinycolor(color).toRgb();
    rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * - (amount / 100))));
    rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * - (amount / 100))));
    rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * - (amount / 100))));
    return tinycolor(rgb);
}

function darken (color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.l -= amount / 100;
    hsl.l = clamp01(hsl.l);
    return tinycolor(hsl);
}

// Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
// Values outside of this range will be wrapped into this range.
function spin(color, amount) {
    var hsl = tinycolor(color).toHsl();
    var hue = (hsl.h + amount) % 360;
    hsl.h = hue < 0 ? 360 + hue : hue;
    return tinycolor(hsl);
}

// Combination Functions
// ---------------------
// Thanks to jQuery xColor for some of the ideas behind these
// <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>

function complement(color) {
    var hsl = tinycolor(color).toHsl();
    hsl.h = (hsl.h + 180) % 360;
    return tinycolor(hsl);
}

function triad(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [
        tinycolor(color),
        tinycolor({ h: (h + 120) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 240) % 360, s: hsl.s, l: hsl.l })
    ];
}

function tetrad(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [
        tinycolor(color),
        tinycolor({ h: (h + 90) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 180) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 270) % 360, s: hsl.s, l: hsl.l })
    ];
}

function splitcomplement(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [
        tinycolor(color),
        tinycolor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l}),
        tinycolor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l})
    ];
}

function analogous(color, results, slices) {
    results = results || 6;
    slices = slices || 30;

    var hsl = tinycolor(color).toHsl();
    var part = 360 / slices;
    var ret = [tinycolor(color)];

    for (hsl.h = ((hsl.h - (part * results >> 1)) + 720) % 360; --results; ) {
        hsl.h = (hsl.h + part) % 360;
        ret.push(tinycolor(hsl));
    }
    return ret;
}

function monochromatic(color, results) {
    results = results || 6;
    var hsv = tinycolor(color).toHsv();
    var h = hsv.h, s = hsv.s, v = hsv.v;
    var ret = [];
    var modification = 1 / results;

    while (results--) {
        ret.push(tinycolor({ h: h, s: s, v: v}));
        v = (v + modification) % 1;
    }

    return ret;
}

// Utility Functions
// ---------------------

tinycolor.mix = function(color1, color2, amount) {
    amount = (amount === 0) ? 0 : (amount || 50);

    var rgb1 = tinycolor(color1).toRgb();
    var rgb2 = tinycolor(color2).toRgb();

    var p = amount / 100;

    var rgba = {
        r: ((rgb2.r - rgb1.r) * p) + rgb1.r,
        g: ((rgb2.g - rgb1.g) * p) + rgb1.g,
        b: ((rgb2.b - rgb1.b) * p) + rgb1.b,
        a: ((rgb2.a - rgb1.a) * p) + rgb1.a
    };

    return tinycolor(rgba);
};


// Readability Functions
// ---------------------
// <http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef (WCAG Version 2)

// `contrast`
// Analyze the 2 colors and returns the color contrast defined by (WCAG Version 2)
tinycolor.readability = function(color1, color2) {
    var c1 = tinycolor(color1);
    var c2 = tinycolor(color2);
    return (Math.max(c1.getLuminance(),c2.getLuminance())+0.05) / (Math.min(c1.getLuminance(),c2.getLuminance())+0.05);
};

// `isReadable`
// Ensure that foreground and background color combinations meet WCAG2 guidelines.
// The third argument is an optional Object.
//      the 'level' property states 'AA' or 'AAA' - if missing or invalid, it defaults to 'AA';
//      the 'size' property states 'large' or 'small' - if missing or invalid, it defaults to 'small'.
// If the entire object is absent, isReadable defaults to {level:"AA",size:"small"}.

// *Example*
//    tinycolor.isReadable("#000", "#111") => false
//    tinycolor.isReadable("#000", "#111",{level:"AA",size:"large"}) => false
tinycolor.isReadable = function(color1, color2, wcag2) {
    var readability = tinycolor.readability(color1, color2);
    var wcag2Parms, out;

    out = false;

    wcag2Parms = validateWCAG2Parms(wcag2);
    switch (wcag2Parms.level + wcag2Parms.size) {
        case "AAsmall":
        case "AAAlarge":
            out = readability >= 4.5;
            break;
        case "AAlarge":
            out = readability >= 3;
            break;
        case "AAAsmall":
            out = readability >= 7;
            break;
    }
    return out;

};

// `mostReadable`
// Given a base color and a list of possible foreground or background
// colors for that base, returns the most readable color.
// Optionally returns Black or White if the most readable color is unreadable.
// *Example*
//    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:false}).toHexString(); // "#112255"
//    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:true}).toHexString();  // "#ffffff"
//    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"large"}).toHexString(); // "#faf3f3"
//    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"small"}).toHexString(); // "#ffffff"
tinycolor.mostReadable = function(baseColor, colorList, args) {
    var bestColor = null;
    var bestScore = 0;
    var readability;
    var includeFallbackColors, level, size ;
    args = args || {};
    includeFallbackColors = args.includeFallbackColors ;
    level = args.level;
    size = args.size;

    for (var i= 0; i < colorList.length ; i++) {
        readability = tinycolor.readability(baseColor, colorList[i]);
        if (readability > bestScore) {
            bestScore = readability;
            bestColor = tinycolor(colorList[i]);
        }
    }

    if (tinycolor.isReadable(baseColor, bestColor, {"level":level,"size":size}) || !includeFallbackColors) {
        return bestColor;
    }
    else {
        args.includeFallbackColors=false;
        return tinycolor.mostReadable(baseColor,["#fff", "#000"],args);
    }
};


// Big List of Colors
// ------------------
// <http://www.w3.org/TR/css3-color/#svg-color>
var names = tinycolor.names = {
    aliceblue: "f0f8ff",
    antiquewhite: "faebd7",
    aqua: "0ff",
    aquamarine: "7fffd4",
    azure: "f0ffff",
    beige: "f5f5dc",
    bisque: "ffe4c4",
    black: "000",
    blanchedalmond: "ffebcd",
    blue: "00f",
    blueviolet: "8a2be2",
    brown: "a52a2a",
    burlywood: "deb887",
    burntsienna: "ea7e5d",
    cadetblue: "5f9ea0",
    chartreuse: "7fff00",
    chocolate: "d2691e",
    coral: "ff7f50",
    cornflowerblue: "6495ed",
    cornsilk: "fff8dc",
    crimson: "dc143c",
    cyan: "0ff",
    darkblue: "00008b",
    darkcyan: "008b8b",
    darkgoldenrod: "b8860b",
    darkgray: "a9a9a9",
    darkgreen: "006400",
    darkgrey: "a9a9a9",
    darkkhaki: "bdb76b",
    darkmagenta: "8b008b",
    darkolivegreen: "556b2f",
    darkorange: "ff8c00",
    darkorchid: "9932cc",
    darkred: "8b0000",
    darksalmon: "e9967a",
    darkseagreen: "8fbc8f",
    darkslateblue: "483d8b",
    darkslategray: "2f4f4f",
    darkslategrey: "2f4f4f",
    darkturquoise: "00ced1",
    darkviolet: "9400d3",
    deeppink: "ff1493",
    deepskyblue: "00bfff",
    dimgray: "696969",
    dimgrey: "696969",
    dodgerblue: "1e90ff",
    firebrick: "b22222",
    floralwhite: "fffaf0",
    forestgreen: "228b22",
    fuchsia: "f0f",
    gainsboro: "dcdcdc",
    ghostwhite: "f8f8ff",
    gold: "ffd700",
    goldenrod: "daa520",
    gray: "808080",
    green: "008000",
    greenyellow: "adff2f",
    grey: "808080",
    honeydew: "f0fff0",
    hotpink: "ff69b4",
    indianred: "cd5c5c",
    indigo: "4b0082",
    ivory: "fffff0",
    khaki: "f0e68c",
    lavender: "e6e6fa",
    lavenderblush: "fff0f5",
    lawngreen: "7cfc00",
    lemonchiffon: "fffacd",
    lightblue: "add8e6",
    lightcoral: "f08080",
    lightcyan: "e0ffff",
    lightgoldenrodyellow: "fafad2",
    lightgray: "d3d3d3",
    lightgreen: "90ee90",
    lightgrey: "d3d3d3",
    lightpink: "ffb6c1",
    lightsalmon: "ffa07a",
    lightseagreen: "20b2aa",
    lightskyblue: "87cefa",
    lightslategray: "789",
    lightslategrey: "789",
    lightsteelblue: "b0c4de",
    lightyellow: "ffffe0",
    lime: "0f0",
    limegreen: "32cd32",
    linen: "faf0e6",
    magenta: "f0f",
    maroon: "800000",
    mediumaquamarine: "66cdaa",
    mediumblue: "0000cd",
    mediumorchid: "ba55d3",
    mediumpurple: "9370db",
    mediumseagreen: "3cb371",
    mediumslateblue: "7b68ee",
    mediumspringgreen: "00fa9a",
    mediumturquoise: "48d1cc",
    mediumvioletred: "c71585",
    midnightblue: "191970",
    mintcream: "f5fffa",
    mistyrose: "ffe4e1",
    moccasin: "ffe4b5",
    navajowhite: "ffdead",
    navy: "000080",
    oldlace: "fdf5e6",
    olive: "808000",
    olivedrab: "6b8e23",
    orange: "ffa500",
    orangered: "ff4500",
    orchid: "da70d6",
    palegoldenrod: "eee8aa",
    palegreen: "98fb98",
    paleturquoise: "afeeee",
    palevioletred: "db7093",
    papayawhip: "ffefd5",
    peachpuff: "ffdab9",
    peru: "cd853f",
    pink: "ffc0cb",
    plum: "dda0dd",
    powderblue: "b0e0e6",
    purple: "800080",
    rebeccapurple: "663399",
    red: "f00",
    rosybrown: "bc8f8f",
    royalblue: "4169e1",
    saddlebrown: "8b4513",
    salmon: "fa8072",
    sandybrown: "f4a460",
    seagreen: "2e8b57",
    seashell: "fff5ee",
    sienna: "a0522d",
    silver: "c0c0c0",
    skyblue: "87ceeb",
    slateblue: "6a5acd",
    slategray: "708090",
    slategrey: "708090",
    snow: "fffafa",
    springgreen: "00ff7f",
    steelblue: "4682b4",
    tan: "d2b48c",
    teal: "008080",
    thistle: "d8bfd8",
    tomato: "ff6347",
    turquoise: "40e0d0",
    violet: "ee82ee",
    wheat: "f5deb3",
    white: "fff",
    whitesmoke: "f5f5f5",
    yellow: "ff0",
    yellowgreen: "9acd32"
};

// Make it easy to access colors via `hexNames[hex]`
var hexNames = tinycolor.hexNames = flip(names);


// Utilities
// ---------

// `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`
function flip(o) {
    var flipped = { };
    for (var i in o) {
        if (o.hasOwnProperty(i)) {
            flipped[o[i]] = i;
        }
    }
    return flipped;
}

// Return a valid alpha value [0,1] with all invalid values being set to 1
function boundAlpha(a) {
    a = parseFloat(a);

    if (isNaN(a) || a < 0 || a > 1) {
        a = 1;
    }

    return a;
}

// Take input from [0, n] and return it as [0, 1]
function bound01(n, max) {
    if (isOnePointZero(n)) { n = "100%"; }

    var processPercent = isPercentage(n);
    n = mathMin(max, mathMax(0, parseFloat(n)));

    // Automatically convert percentage into number
    if (processPercent) {
        n = parseInt(n * max, 10) / 100;
    }

    // Handle floating point rounding errors
    if ((Math.abs(n - max) < 0.000001)) {
        return 1;
    }

    // Convert into [0, 1] range if it isn't already
    return (n % max) / parseFloat(max);
}

// Force a number between 0 and 1
function clamp01(val) {
    return mathMin(1, mathMax(0, val));
}

// Parse a base-16 hex value into a base-10 integer
function parseIntFromHex(val) {
    return parseInt(val, 16);
}

// Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
// <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
function isOnePointZero(n) {
    return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
}

// Check to see if string passed in is a percentage
function isPercentage(n) {
    return typeof n === "string" && n.indexOf('%') != -1;
}

// Force a hex value to have 2 characters
function pad2(c) {
    return c.length == 1 ? '0' + c : '' + c;
}

// Replace a decimal with it's percentage value
function convertToPercentage(n) {
    if (n <= 1) {
        n = (n * 100) + "%";
    }

    return n;
}

// Converts a decimal to a hex value
function convertDecimalToHex(d) {
    return Math.round(parseFloat(d) * 255).toString(16);
}
// Converts a hex value to a decimal
function convertHexToDecimal(h) {
    return (parseIntFromHex(h) / 255);
}

var matchers = (function() {

    // <http://www.w3.org/TR/css3-values/#integers>
    var CSS_INTEGER = "[-\\+]?\\d+%?";

    // <http://www.w3.org/TR/css3-values/#number-value>
    var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";

    // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
    var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";

    // Actual matching.
    // Parentheses and commas are optional, but not required.
    // Whitespace can take the place of commas or opening paren
    var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
    var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";

    return {
        CSS_UNIT: new RegExp(CSS_UNIT),
        rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
        rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
        hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
        hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
        hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
        hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
        hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
        hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
    };
})();

// `isValidCSSUnit`
// Take in a single string / number and check to see if it looks like a CSS unit
// (see `matchers` above for definition).
function isValidCSSUnit(color) {
    return !!matchers.CSS_UNIT.exec(color);
}

// `stringInputToObject`
// Permissive string parsing.  Take in a number of formats, and output an object
// based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
function stringInputToObject(color) {

    color = color.replace(trimLeft,'').replace(trimRight, '').toLowerCase();
    var named = false;
    if (names[color]) {
        color = names[color];
        named = true;
    }
    else if (color == 'transparent') {
        return { r: 0, g: 0, b: 0, a: 0, format: "name" };
    }

    // Try to match string input using regular expressions.
    // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
    // Just return an object and let the conversion functions handle that.
    // This way the result will be the same whether the tinycolor is initialized with string or object.
    var match;
    if ((match = matchers.rgb.exec(color))) {
        return { r: match[1], g: match[2], b: match[3] };
    }
    if ((match = matchers.rgba.exec(color))) {
        return { r: match[1], g: match[2], b: match[3], a: match[4] };
    }
    if ((match = matchers.hsl.exec(color))) {
        return { h: match[1], s: match[2], l: match[3] };
    }
    if ((match = matchers.hsla.exec(color))) {
        return { h: match[1], s: match[2], l: match[3], a: match[4] };
    }
    if ((match = matchers.hsv.exec(color))) {
        return { h: match[1], s: match[2], v: match[3] };
    }
    if ((match = matchers.hsva.exec(color))) {
        return { h: match[1], s: match[2], v: match[3], a: match[4] };
    }
    if ((match = matchers.hex8.exec(color))) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            a: convertHexToDecimal(match[4]),
            format: named ? "name" : "hex8"
        };
    }
    if ((match = matchers.hex6.exec(color))) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            format: named ? "name" : "hex"
        };
    }
    if ((match = matchers.hex4.exec(color))) {
        return {
            r: parseIntFromHex(match[1] + '' + match[1]),
            g: parseIntFromHex(match[2] + '' + match[2]),
            b: parseIntFromHex(match[3] + '' + match[3]),
            a: convertHexToDecimal(match[4] + '' + match[4]),
            format: named ? "name" : "hex8"
        };
    }
    if ((match = matchers.hex3.exec(color))) {
        return {
            r: parseIntFromHex(match[1] + '' + match[1]),
            g: parseIntFromHex(match[2] + '' + match[2]),
            b: parseIntFromHex(match[3] + '' + match[3]),
            format: named ? "name" : "hex"
        };
    }

    return false;
}

function validateWCAG2Parms(parms) {
    // return valid WCAG2 parms for isReadable.
    // If input parms are invalid, return {"level":"AA", "size":"small"}
    var level, size;
    parms = parms || {"level":"AA", "size":"small"};
    level = (parms.level || "AA").toUpperCase();
    size = (parms.size || "small").toLowerCase();
    if (level !== "AA" && level !== "AAA") {
        level = "AA";
    }
    if (size !== "small" && size !== "large") {
        size = "small";
    }
    return {"level":level, "size":size};
}

// Node: Export function
if ( module.exports) {
    module.exports = tinycolor;
}
// AMD/requirejs: Define the module
else {
    window.tinycolor = tinycolor;
}

})(Math);
});

var recommendColors = [
  '#2D8CF0', '#19BE6B', '#FF9900', '#ED4014', '#00B5FF', '#19C919', '#F9E31C', '#EA1A1A', '#9B1DEA', '#00C2B1', '#AC7A33', '#1D35EA',
  '#8BC34A', '#F16B62', '#EA4CA3', '#0D94AA', '#FEBD79', '#5D4037', '#00BCD4', '#F06292', '#CDDC39', '#607D8B', '#000000', '#FFFFFF'
];

//
var B$f = Boolean, BTrue = { type: B$f, default: true };
var script$1d = {
  name: 'XColorPicker',
  components: { XIcon: __vue_component__, XInput: __vue_component__$I, XBtn: __vue_component__$1, XPopper: __vue_component__$X },
  props: {
    value: String,
    disabled: B$f,
    editable: BTrue,
    alpha: B$f,
    hue: BTrue,
    recommend: B$f,
    colors: { type: Array, default: function () { return []; } },
    format: {
      validator: function (v) { return ['hsl', 'hsv', 'hex', 'rgb'].indexOf(v) > -1; }
    },
    size: {
      validator: function (v) { return ['large', 'small', 'default'].indexOf(v) > -1; }
    }
  },
  data: function data() {
    return {
      visible: false,
      tempValue: this.value,
      selectedValue: this.value,
      prefix: 'x-color-picker',
      hueCursor: {},
      pointer: {},
      hsv: {}
    }
  },
  computed: {
    classes: function classes() {
      return [
        this.prefix,
        this.size && ((this.prefix) + "_" + (this.size)),
        { visible: this.visible, disabled: this.disabled }
      ]
    },
    popperProps: function popperProps() {
      return Object.assign({}, {adaptive: false,
        visible: this.visible},
        this.$attrs,
        {transitionName: 'x-animate-dropdown'})
    },
    blockStyle: function blockStyle() {
      return { background: this.visible ? this.tempValue : this.selectedValue }
    },
    defaultColors: function defaultColors() {
      return this.colors.length ? this.colors : this.recommend ? recommendColors : []
    },
    saturStyle: function saturStyle() {
      return { background: tinycolor({ h: this.hsv.h, s: 1, v: 1 }).toHexString() }
    },
    hueCursorStyle: function hueCursorStyle() {
      return { h: this.hsv.h, left: ((this.hsv.h / 360 * 100) + "%") }
    },
    pointerStyle: function pointerStyle() {
      return { left: ((this.hsv.s * 100) + "%"), top: (((1 - this.hsv.v) * 100) + "%") }
    },
    alphaStyle: function alphaStyle() {
      var ref = tinycolor(this.tempValue).toRgb();
      var r = ref.r;
      var g = ref.g;
      var b = ref.b;
      var rgb = r + "," + g + "," + b;
      return { background: ("linear-gradient(to right,rgba(" + rgb + ",0) 0%,rgb(" + rgb + ") 100%)") }
    },
    alphaCursorStyle: function alphaCursorStyle() {
      return { left: ((this.hsv.a / 1 * 100) + "%") }
    }
  },
  watch: {
    hsv: function hsv(val) {
      this.tempValue = this.formatter(val);
    },
    selectedValue: function selectedValue(val) {
      this.$emit('input', val);
    },
    value: function value(val) {
      this.selectedValue = val;
    }
  },
  methods: {
    formatter: function formatter(hsv) {
      var this$1 = this;

      var format = this.format || (this.alpha ? 'rgb' : 'hex'), color = tinycolor(hsv);
      return {
        hsl: function () { return color.toHslString(); },
        hsv: function () { return color.toHsvString(); },
        hex: function () { return this$1.alpha ? color.toHex8String() : color.toHexString(); },
        rgb: function () { return color.toRgbString(); }
      }[format]()
    },
    toggle: function toggle(visible) {
      this.visible = visible === undefined ? !this.visible : visible;
    },
    onClick: function onClick() {
      !this.disabled && this.toggle();
    },
    onPopperShow: function onPopperShow() {
      this.tempValue = this.selectedValue || '#2d8cf0';
      this.updateHsv();
      this.onOpenChange(true);
    },
    onOpenChange: function onOpenChange(visible) {
      this.$emit('on-open-change', visible);
    },
    updateHsv: function updateHsv() {
      this.hsv = tinycolor(this.tempValue).toHsv();
    },
    onClear: function onClear() {
      this.toggle(false);
      this.selectedValue = '';
      this.$emit('on-change', this.selectedValue);
    },
    onOK: function onOK() {
      this.toggle(false);
      this.selectedValue = this.tempValue;
      this.$emit('on-change', this.selectedValue);
    },
    updatePointer: function updatePointer(e) {
      var offset = getOffset(this.$refs.Satur);
      var ref = this.$refs.Satur;
      var offsetWidth = ref.offsetWidth;
      var offsetHeight = ref.offsetHeight;
      var s = (e.clientX - offset.left) / offsetWidth;
      var v = (offsetHeight - (e.clientY - offset.top)) / offsetHeight;
      s = s < 0 ? 0 : s > 1 ? 1 : s;
      v = v < 0 ? 0 : v > 1 ? 1 : v;
      this.hsv = Object.assign({}, this.hsv, {s: s, v: v});
    },
    onSaturMousedown: function onSaturMousedown(e) {
      this.updatePointer(e);
      window.addEventListener('mousemove', this.updatePointer, false);
      window.addEventListener('mouseup', this.onSaturMouseup, false);
    },
    onSaturMouseup: function onSaturMouseup(e) {
      this.$refs.Satur.focus();
      window.removeEventListener('mousemove', this.updatePointer, false);
      window.removeEventListener('mouseup', this.onSaturMouseup, false);
    },
    updateHue: function updateHue(e) {
      var offset = getOffset(this.$refs.Hue);
      var ref = this.$refs.Hue;
      var offsetWidth = ref.offsetWidth;
      var offsetHeight = ref.offsetHeight;
      var h = (e.clientX - offset.left) / offsetWidth * 360;
      this.hsv = Object.assign({}, this.hsv, {h: h > 360 || h < 0 ? 0 : h});
    },
    onHueMousedown: function onHueMousedown(e) {
      this.updateHue(e);
      window.addEventListener('mousemove', this.updateHue, false);
      window.addEventListener('mouseup', this.onHueMouseup, false);
    },
    onHueMouseup: function onHueMouseup() {
      this.$refs.Hue.focus();
      window.removeEventListener('mousemove', this.updateHue, false);
      window.removeEventListener('mouseup', this.onHueMouseup, false);
    },
    onBlockClick: function onBlockClick(color) {
      this.hsv = tinycolor(color).toHsv();
    },
    updateAlpha: function updateAlpha(e) {
      var offset = getOffset(this.$refs.Alpha);
      var ref = this.$refs.Alpha;
      var offsetWidth = ref.offsetWidth;
      var offsetHeight = ref.offsetHeight;
      var a = (e.clientX - offset.left) / offsetWidth;
      this.hsv = Object.assign({}, this.hsv, {a: a > 1 ? 1 : a < 0 ? 0 : a});
    },
    onAlphaMousedown: function onAlphaMousedown(e) {
      this.updateAlpha(e);
      window.addEventListener('mousemove', this.updateAlpha, false);
      window.addEventListener('mouseup', this.onAlphaMouseup, false);
    },
    onAlphaMouseup: function onAlphaMouseup() {
      this.$refs.Alpha.focus();
      window.removeEventListener('mousemove', this.updateAlpha, false);
      window.removeEventListener('mouseup', this.onAlphaMouseup, false);
    }
  }
};

/* script */
var __vue_script__$1d = script$1d;
/* template */
var __vue_render__$1h = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "x-popper",
    _vm._b(
      {
        on: {
          clickoutside: function($event) {
            return _vm.toggle(false)
          },
          "on-popper-show": _vm.onPopperShow,
          "on-popper-hide": function($event) {
            return _vm.onOpenChange(false)
          }
        }
      },
      "x-popper",
      _vm.popperProps,
      false
    ),
    [
      _c(
        "div",
        {
          class: _vm.classes,
          attrs: { slot: "reference", tabindex: "0" },
          on: { click: _vm.onClick },
          slot: "reference"
        },
        [
          _c("div", { class: _vm.prefix + "_color" }, [
            !_vm.visible && !_vm.selectedValue
              ? _c(
                  "div",
                  { class: _vm.prefix + "_color_empty" },
                  [_c("x-icon", { attrs: { type: "ios-close-empty" } })],
                  1
                )
              : _c("div", { style: _vm.blockStyle })
          ]),
          _vm._v(" "),
          _c("x-icon", {
            class: _vm.prefix + "_arrow",
            attrs: { type: "ios-arrow-down" }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c("div", { class: _vm.prefix + "_dropdown" }, [
        _c("div", { class: _vm.prefix + "_picker" }, [
          _c(
            "div",
            {
              ref: "Satur",
              class: _vm.prefix + "_satur",
              style: _vm.saturStyle,
              attrs: { tabindex: "0" },
              on: {
                mousedown: function($event) {
                  $event.preventDefault();
                  return _vm.onSaturMousedown($event)
                }
              }
            },
            [
              _c("div", { class: _vm.prefix + "_satur_white" }),
              _vm._v(" "),
              _c("div", { class: _vm.prefix + "_satur_black" }),
              _vm._v(" "),
              _c("div", {
                class: _vm.prefix + "_pointer",
                style: _vm.pointerStyle
              })
            ]
          ),
          _vm._v(" "),
          _vm.hue
            ? _c(
                "div",
                {
                  ref: "Hue",
                  class: _vm.prefix + "_hue",
                  attrs: { tabindex: "0" },
                  on: {
                    mousedown: function($event) {
                      $event.preventDefault();
                      return _vm.onHueMousedown($event)
                    }
                  }
                },
                [_c("span", { style: _vm.hueCursorStyle })]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.alpha
            ? _c(
                "div",
                {
                  ref: "Alpha",
                  class: _vm.prefix + "_alpha",
                  attrs: { tabindex: "0" },
                  on: {
                    mousedown: function($event) {
                      $event.preventDefault();
                      return _vm.onAlphaMousedown($event)
                    }
                  }
                },
                [
                  _c("div", {
                    class: _vm.prefix + "_alpha_bar",
                    style: _vm.alphaStyle
                  }),
                  _vm._v(" "),
                  _c("span", { style: _vm.alphaCursorStyle })
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.defaultColors.length
            ? _c(
                "ul",
                { class: _vm.prefix + "_colors" },
                _vm._l(_vm.defaultColors, function(color) {
                  return _c("li", { key: color }, [
                    _c(
                      "div",
                      {
                        class: _vm.prefix + "_colors_block",
                        style: { background: color },
                        attrs: { tabindex: "-1" },
                        on: {
                          click: function($event) {
                            return _vm.onBlockClick(color)
                          }
                        }
                      },
                      [_c("div", { class: _vm.prefix + "_pointer" })]
                    )
                  ])
                }),
                0
              )
            : _vm._e()
        ]),
        _vm._v(" "),
        _c(
          "div",
          { class: _vm.prefix + "_confirm" },
          [
            _c("x-input", {
              attrs: { size: "small", readonly: !_vm.editable },
              on: { "on-blur": _vm.updateHsv },
              model: {
                value: _vm.tempValue,
                callback: function($$v) {
                  _vm.tempValue = $$v;
                },
                expression: "tempValue"
              }
            }),
            _vm._v(" "),
            _c(
              "x-btn",
              { attrs: { size: "small" }, on: { click: _vm.onClear } },
              [_vm._v("清空")]
            ),
            _vm._v(" "),
            _c(
              "x-btn",
              {
                attrs: { size: "small", type: "primary" },
                on: { click: _vm.onOK }
              },
              [_vm._v("确定")]
            )
          ],
          1
        )
      ])
    ]
  )
};
var __vue_staticRenderFns__$1h = [];
__vue_render__$1h._withStripped = true;

  /* style */
  var __vue_inject_styles__$1h = undefined;
  /* scoped */
  var __vue_scope_id__$1h = undefined;
  /* module identifier */
  var __vue_module_identifier__$1h = undefined;
  /* functional template */
  var __vue_is_functional_template__$1h = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1h = normalizeComponent(
    { render: __vue_render__$1h, staticRenderFns: __vue_staticRenderFns__$1h },
    __vue_inject_styles__$1h,
    __vue_script__$1d,
    __vue_scope_id__$1h,
    __vue_is_functional_template__$1h,
    __vue_module_identifier__$1h,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//

var script$1e = {
  name: 'XLoadingBar',
  props: {
    color: String,
    failedColor: String,
    height: {
      type: Number,
      default: 2
    },
    percent: Number,
    status: String
  },
  data: function data() {
    return { prefix: 'x-loadingBar' }
  },
  computed: {
    styles: function styles() {
      return { height: ((this.height) + "px") }
    },
    barStyle: function barStyle() {
      return { transform: ("scaleX(" + (this.percent / 100) + ")"), background: this.status === 'error' ? this.failedColor : this.color }
    }
  }
};

/* script */
var __vue_script__$1e = script$1e;
/* template */
var __vue_render__$1i = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("transition", { attrs: { name: _vm.prefix } }, [
    _c("div", { class: _vm.prefix, style: _vm.styles }, [
      _c("div", {
        class: [_vm.prefix + "_bar", _vm.status],
        style: _vm.barStyle
      })
    ])
  ])
};
var __vue_staticRenderFns__$1i = [];
__vue_render__$1i._withStripped = true;

  /* style */
  var __vue_inject_styles__$1i = undefined;
  /* scoped */
  var __vue_scope_id__$1i = undefined;
  /* module identifier */
  var __vue_module_identifier__$1i = undefined;
  /* functional template */
  var __vue_is_functional_template__$1i = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1i = normalizeComponent(
    { render: __vue_render__$1i, staticRenderFns: __vue_staticRenderFns__$1i },
    __vue_inject_styles__$1i,
    __vue_script__$1e,
    __vue_scope_id__$1i,
    __vue_is_functional_template__$1i,
    __vue_module_identifier__$1i,
    false,
    undefined,
    undefined,
    undefined
  );

var vm$1, tid, clearTimer = function () { clearInterval(tid), tid = null; },
  getVM$1 = function () { return vm$1 || (vm$1 = new Vue({
    data: function data() {
      return {
        customOptions: {},
        options: { percent: 0 }
      }
    },
    render: function render(h) {
      return h(__vue_component__$1i, {
        style: { zIndex: this.options.zIndex },
        props: Object.assign({}, this.options, this.customOptions),
        directives: [{ name: 'show', value: this.options.visible }]
      })
    },
    mounted: function mounted() {
      document.body.appendChild(this.$el);
    },
    beforeDestroy: function beforeDestroy() {
      this.$el.parentNode && this.$el.parentNode.removeChild(this.$el);
    },
    methods: {
      update: function update(options) {
        if ( options === void 0 ) options = {};

        this.options = Object.assign({}, this.options, options);
      },
      config: function config(options) {
        if ( options === void 0 ) options = {};

        this.customOptions = Object.assign({}, this.customOptions, options);
      }
    }
  }).$mount()); };

var loadingBarService = {
  start: function start() {
    var this$1 = this;

    if (tid) { return }
    getVM$1().update({ visible: true, percent: 0, status: undefined, zIndex: getMaxZIndex() });
    var percent = 0;
    tid = setInterval(function () {
      percent += Math.floor(Math.random() * 3 + 2);
      if (percent > 90) { clearTimer(); }
      this$1.update(percent);
    }, 200);
  },
  finish: function finish(status) {
    clearTimer();
    var vm = getVM$1();
    vm.update({ visible: true, percent: 100, status: status });
    vm.$nextTick(function () { return vm.update({ visible: false }); });
  },
  error: function error() {
    this.finish('error');
  },
  update: function update(percent) {
    getVM$1().update({ percent: percent });
  },
  config: function config(options) {
    getVM$1().config(options);
  },
  destroy: function destroy() {
    clearTimer();
    vm$1 && vm$1.$destroy();
    vm$1 = null;
  }
};

//
//
//
//
//
//
//

var script$1f = {
  props: {
    transition: String
  }
};

/* script */
var __vue_script__$1f = script$1f;
/* template */
var __vue_render__$1j = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "x-notice-wrapper" },
    [
      _c(
        "transition-group",
        { attrs: { name: _vm.transition, tag: "div" } },
        [_vm._t("default")],
        2
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$1j = [];
__vue_render__$1j._withStripped = true;

  /* style */
  var __vue_inject_styles__$1j = undefined;
  /* scoped */
  var __vue_scope_id__$1j = undefined;
  /* module identifier */
  var __vue_module_identifier__$1j = undefined;
  /* functional template */
  var __vue_is_functional_template__$1j = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1j = normalizeComponent(
    { render: __vue_render__$1j, staticRenderFns: __vue_staticRenderFns__$1j },
    __vue_inject_styles__$1j,
    __vue_script__$1f,
    __vue_scope_id__$1j,
    __vue_is_functional_template__$1j,
    __vue_module_identifier__$1j,
    false,
    undefined,
    undefined,
    undefined
  );

function creator (Component, config, addons) {
  if ( addons === void 0 ) addons = {};

  var vm, key = 0, getVM = function () { return vm || (vm = new Vue({
    data: function data() {
      return { items: [], zIndex: 0 }
    },
    watch: {
      'items.length': function items_length(newval, oldval) {
        if (newval > oldval) { this.zIndex = getMaxZIndex(); }
      }
    },
    render: function render(h) {
      var this$1 = this;

      return h(__vue_component__$1j, {
        style: { zIndex: this.zIndex },
        props: { transition: Component.transition }
      }, this.items.map(function (ref, i) {
        var ui = ref.ui;
        var key = ref.key;
        var props = ref.props;

        return h(
          ui,
          { key: key, props: props, on: { close: function () { return this$1.items.splice(i, 1); } } },
          props.render ? [props.render(h)] : props.content || props.desc)
      }))
    },
    mounted: function mounted() {
      document.body.appendChild(this.$el);
    },
    beforeDestroy: function beforeDestroy() {
      this.$el.parentNode && this.$el.parentNode.removeChild(this.$el);
    },
    methods: {
      addItem: function addItem(props) {
        if ( props === void 0 ) props = {};

        var item = { props: props, ui: Component, key: key++ };
        this.items.push(item);
        return item.key
      },
      removeItem: function removeItem(key) {
        var index = this.items.findIndex(function (_) { return _.key === key; });
        if (index >= 0) { this.items.splice(index, 1); }
      }
    }
  }).$mount()); };

  var defaultConfig = Object.assign({}, {duration: 1.5}, (config || {})),
    addNotice = function (options, type) { return getVM().addItem(Object.assign({}, defaultConfig, (isStr(options) ? { content: options } : options), {type: type})); },
    noticeFunc = function (options) { return addNotice(options); }

  ;['info', 'warning', 'error', 'success'].forEach(function (_) { return noticeFunc[_] = function (options) { return addNotice(options, _); }; });
  noticeFunc.config = function (options) { return defaultConfig = Object.assign({}, defaultConfig, options); };
  noticeFunc.destroy = function () {
    vm && vm.$destroy();
    vm = null;
  };
  var loop = function ( k ) {
    noticeFunc[k] = function (options) { return addons[k](addNotice, options, getVM); };
  };

  for (var k in addons) loop( k );
  return noticeFunc
}

//
var prefix$1 = 'x-message';
var script$1g = {
  name: 'XMessage',
  components: { XIcon: __vue_component__, XCloseIconButton: __vue_component__$7 },
  transition: prefix$1,
  props: {
    duration: Number,
    onClose: Function,
    closable: Boolean,
    background: Boolean,
    type: {
      default: 'info',
      validator: function validator(v) {
        return ['info', 'success', 'warning', 'error', 'loading'].indexOf(v) !== -1
      }
    }
  },
  data: function data() {
    return { prefix: prefix$1 }
  },
  computed: {
    icon: function icon() {
      return iconTypes[this.type]
    }
  },
  mounted: function mounted() {
    var this$1 = this;

    if (this.duration) { this.tid = setTimeout(function () { return this$1.close(); }, this.duration * 1000); }
  },
  beforeDestroy: function beforeDestroy() {
    clearTimeout(this.tid);
  },
  methods: {
    close: function close() {
      this.onClose && this.onClose(), this.$emit('close');
    }
  }
};

/* script */
var __vue_script__$1g = script$1g;
/* template */
var __vue_render__$1k = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { class: _vm.prefix }, [
    _c(
      "div",
      {
        class: [
          _vm.prefix + "_box",
          _vm.prefix + "_" + _vm.type,
          { background: _vm.background }
        ]
      },
      [
        _c("x-icon", {
          class: _vm.prefix + "_icon",
          attrs: { type: _vm.icon }
        }),
        _vm._v(" "),
        _vm._t("default"),
        _vm._v(" "),
        _vm.closable
          ? _c("x-close-icon-button", {
              class: _vm.prefix + "_close",
              on: { click: _vm.close }
            })
          : _vm._e()
      ],
      2
    )
  ])
};
var __vue_staticRenderFns__$1k = [];
__vue_render__$1k._withStripped = true;

  /* style */
  var __vue_inject_styles__$1k = undefined;
  /* scoped */
  var __vue_scope_id__$1k = undefined;
  /* module identifier */
  var __vue_module_identifier__$1k = undefined;
  /* functional template */
  var __vue_is_functional_template__$1k = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1k = normalizeComponent(
    { render: __vue_render__$1k, staticRenderFns: __vue_staticRenderFns__$1k },
    __vue_inject_styles__$1k,
    __vue_script__$1g,
    __vue_scope_id__$1k,
    __vue_is_functional_template__$1k,
    __vue_module_identifier__$1k,
    false,
    undefined,
    undefined,
    undefined
  );

var Message = creator(__vue_component__$1k, null, {
  loading: function loading(addNotice, options, getVM) {
    var key = addNotice(options, 'loading');
    return function () { return getVM().removeItem(key); }
  }
});

//
var prefix$2 = 'x-notice';
var script$1h = {
  name: 'XNotice',
  components: { XIcon: __vue_component__, XCloseIconButton: __vue_component__$7 },
  transition: prefix$2,
  props: {
    title: String,
    duration: Number,
    onClose: Function,
    type: {
      default: 'open',
      validator: function validator(v) {
        return ['info', 'success', 'warning', 'error', 'open'].indexOf(v) !== -1
      }
    }
  },
  data: function data() {
    return { prefix: prefix$2, hasDesc: false }
  },
  computed: {
    icon: function icon() {
      return iconTypes[this.type]
    },
    showIcon: function showIcon() {
      return this.type !== 'open'
    }
  },
  mounted: function mounted() {
    var this$1 = this;

    var ref = this.$slots.default;
    var desc = ref[0];
    this.hasDesc = desc && (desc.text || desc.children);
    if (this.duration) { this.tid = setTimeout(function () { return this$1.close(); }, this.duration * 1000); }
  },
  beforeDestroy: function beforeDestroy() {
    clearTimeout(this.tid);
  },
  methods: {
    close: function close() {
      this.onClose && this.onClose(), this.$emit('close');
    }
  }
};

/* script */
var __vue_script__$1h = script$1h;
/* template */
var __vue_render__$1l = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { class: _vm.prefix }, [
    _c(
      "div",
      { class: [_vm.prefix + "_box", { hasDesc: _vm.hasDesc }] },
      [
        _vm.showIcon
          ? _c("x-icon", {
              class: [_vm.prefix + "_icon", _vm.type],
              attrs: { type: _vm.icon }
            })
          : _vm._e(),
        _vm._v(" "),
        _c(
          "div",
          [
            _vm.title
              ? _c("div", { class: _vm.prefix + "_title" }, [
                  _vm._v(_vm._s(_vm.title))
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm._t("default")
          ],
          2
        ),
        _vm._v(" "),
        _c("x-close-icon-button", {
          class: _vm.prefix + "_close",
          on: { click: _vm.close }
        })
      ],
      1
    )
  ])
};
var __vue_staticRenderFns__$1l = [];
__vue_render__$1l._withStripped = true;

  /* style */
  var __vue_inject_styles__$1l = undefined;
  /* scoped */
  var __vue_scope_id__$1l = undefined;
  /* module identifier */
  var __vue_module_identifier__$1l = undefined;
  /* functional template */
  var __vue_is_functional_template__$1l = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1l = normalizeComponent(
    { render: __vue_render__$1l, staticRenderFns: __vue_staticRenderFns__$1l },
    __vue_inject_styles__$1l,
    __vue_script__$1h,
    __vue_scope_id__$1l,
    __vue_is_functional_template__$1l,
    __vue_module_identifier__$1l,
    false,
    undefined,
    undefined,
    undefined
  );

var Notice = creator(__vue_component__$1l, { duration: 4.5 }, {
  open: function open(addNotice, options) {
    addNotice(options, 'open');
  }
});

//
var S$a = String, B$g = Boolean, BTrue$1 = { type: B$g, default: true };
var script$1i = {
  name: 'XModal',
  components: { XOverlay: __vue_component__$B, XBtn: __vue_component__$1, XCloseIconButton: __vue_component__$7 },
  props: {
    value: B$g,
    title: S$a,
    closable: BTrue$1,
    maskClosable: BTrue$1,
    loading: B$g,
    scrollable: B$g,
    fullscreen: B$g,
    mask: BTrue$1,
    okText: { type: S$a, default: '确定' },
    cancelText: { type: S$a, default: '取消' },
    width: { type: [Number, S$a], default: 520 },
    footerHide: B$g,
    styles: Object,
    className: S$a,
    transfer: BTrue$1,
    hasCancel: BTrue$1
  },
  data: function data() {
    return { prefix: 'x-modal', visible: false, zIndex: 1, isLoading: false, isCallLock: false }
  },
  computed: {
    classes: function classes() {
      return [this.prefix, this.className, { fullscreen: this.fullscreen }]
    },
    dialogStyle: function dialogStyle() {
      return this.fullscreen ? this.styles : Object.assign({}, this.styles, {width: parseSize(this.width)})
    }
  },
  watch: {
    value: {
      immediate: true,
      handler: function handler(val) {
        this.visible = val;
      }
    },
    visible: function visible(val) {
      this.$emit('input', val);
      this.$emit('on-visible-change', val);
      if (val) {
        this.isLoading = false;
        this.zIndex = getMaxZIndex();
        if (winScrollbarLock.locked || this.scrollable) { return }
        winScrollbarLock.lock();
        this.isCallLock = true;
      }
    }
  },
  mounted: function mounted() {
    this.transfer && document.body.appendChild(this.$el);
  },
  beforeDestroy: function beforeDestroy() {
    this.onLeave();
    this.$el.parentNode && this.$el.parentNode.removeChild(this.$el);
  },
  methods: {
    hide: function hide() {
      this.visible = false;
    },
    onMaskClose: function onMaskClose() {
      if (this.maskClosable) { this.hide(); }
    },
    onCancel: function onCancel() {
      this.hide();
      this.$emit('on-cancel');
    },
    onOk: function onOk() {
      this.$emit('on-ok');
      if (this.loading) { return this.isLoading = true }
      this.hide();
    },
    onLeave: function onLeave() {
      this.$emit('leave');
      if (this.isCallLock) {
        winScrollbarLock.unlock();
        this.isCallLock = false;
      }
    }
  }
};

/* script */
var __vue_script__$1i = script$1i;
/* template */
var __vue_render__$1m = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    [
      _vm.mask && !_vm.fullscreen
        ? _c("x-overlay", {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.visible,
                expression: "visible"
              }
            ],
            style: { zIndex: _vm.zIndex },
            on: { click: _vm.onMaskClose }
          })
        : _vm._e(),
      _vm._v(" "),
      _c(
        "transition",
        { attrs: { name: _vm.prefix }, on: { afterLeave: _vm.onLeave } },
        [
          _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.visible,
                  expression: "visible"
                }
              ],
              class: _vm.classes,
              style: { zIndex: _vm.zIndex }
            },
            [
              _c(
                "div",
                {
                  class: [_vm.prefix + "_content", { noMask: !_vm.mask }],
                  style: _vm.dialogStyle
                },
                [
                  _vm.closable
                    ? _c(
                        "span",
                        { class: _vm.prefix + "_close" },
                        [
                          _vm._t("close", [
                            _c("x-close-icon-button", {
                              attrs: { size: "31" },
                              on: { click: _vm.hide }
                            })
                          ])
                        ],
                        2
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.title || _vm.$slots.header
                    ? _c(
                        "div",
                        { class: _vm.prefix + "_header" },
                        [
                          _vm._t("header", [
                            _c("div", {
                              domProps: { innerHTML: _vm._s(_vm.title) }
                            })
                          ])
                        ],
                        2
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "div",
                    { class: _vm.prefix + "_body" },
                    [_vm._t("default")],
                    2
                  ),
                  _vm._v(" "),
                  !_vm.footerHide
                    ? _c(
                        "div",
                        { class: _vm.prefix + "_footer" },
                        [
                          _vm._t("footer", [
                            _vm.hasCancel
                              ? _c(
                                  "x-btn",
                                  {
                                    attrs: { type: "text" },
                                    on: { click: _vm.onCancel }
                                  },
                                  [_vm._v(_vm._s(_vm.cancelText))]
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            _c(
                              "x-btn",
                              {
                                attrs: {
                                  type: "primary",
                                  loading: _vm.isLoading
                                },
                                on: { click: _vm.onOk }
                              },
                              [_vm._v(_vm._s(_vm.okText))]
                            )
                          ])
                        ],
                        2
                      )
                    : _vm._e()
                ]
              )
            ]
          )
        ]
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$1m = [];
__vue_render__$1m._withStripped = true;

  /* style */
  var __vue_inject_styles__$1m = undefined;
  /* scoped */
  var __vue_scope_id__$1m = undefined;
  /* module identifier */
  var __vue_module_identifier__$1m = undefined;
  /* functional template */
  var __vue_is_functional_template__$1m = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1m = normalizeComponent(
    { render: __vue_render__$1m, staticRenderFns: __vue_staticRenderFns__$1m },
    __vue_inject_styles__$1m,
    __vue_script__$1i,
    __vue_scope_id__$1m,
    __vue_is_functional_template__$1m,
    __vue_module_identifier__$1m,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//

function objectWithoutProperties$1 (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }
var S$b = String, B$h = Boolean, F$4 = Function;
var script$1j = {
  name: 'XDialog',
  components: { XIcon: __vue_component__, XModal: __vue_component__$1m, XBtn: __vue_component__$1 },
  props: {
    value: B$h,
    title: S$b,
    content: S$b,
    width: { default: 416 },
    okText: { type: S$b, default: '确定' },
    cancelText: {},
    loading: B$h,
    scrollable: B$h,
    onOk: F$4,
    onCancel: F$4,
    type: {
      validator: function validator(v) {
        return ['info', 'success', 'warning', 'error', 'confirm'].indexOf(v) !== -1
      }
    }
  },
  data: function data() {
    var _self = this;
    return {
      prefix: 'x-dialog',
      listeners: Object.assign({}, this.$listeners,
        {'on-ok': function on_ok() {
          _self.onOk && _self.onOk();
        },
        'on-cancel': function on_cancel() {
          _self.onCancel && _self.onCancel();
        }})
    }
  },
  computed: {
    icon: function icon() {
      return iconTypes[this.type]
    },
    modalProps: function modalProps() {
      var ref = this.$props;
      var content = ref.content;
      var onOk = ref.onOk;
      var onCancel = ref.onCancel;
      var type = ref.type;
      var rest = objectWithoutProperties$1( ref, ["content", "onOk", "onCancel", "type"] );
      var props = rest;
      return Object.assign({}, props, {closable: false, maskClosable: false, className: this.prefix, hasCancel: this.type === 'confirm'})
    }
  }
};

/* script */
var __vue_script__$1j = script$1j;
/* template */
var __vue_render__$1n = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "x-modal",
    _vm._g(
      _vm._b({ class: _vm.prefix + "_wrap" }, "x-modal", _vm.modalProps, false),
      _vm.listeners
    ),
    [
      _vm._t("default", [
        _c(
          "div",
          { class: _vm.prefix + "_content" },
          [
            _c("x-icon", {
              class: [_vm.prefix + "_icon", _vm.type],
              attrs: { size: "36", type: _vm.icon }
            }),
            _vm._v(" "),
            _c("div", { domProps: { innerHTML: _vm._s(_vm.content) } })
          ],
          1
        )
      ])
    ],
    2
  )
};
var __vue_staticRenderFns__$1n = [];
__vue_render__$1n._withStripped = true;

  /* style */
  var __vue_inject_styles__$1n = undefined;
  /* scoped */
  var __vue_scope_id__$1n = undefined;
  /* module identifier */
  var __vue_module_identifier__$1n = undefined;
  /* functional template */
  var __vue_is_functional_template__$1n = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1n = normalizeComponent(
    { render: __vue_render__$1n, staticRenderFns: __vue_staticRenderFns__$1n },
    __vue_inject_styles__$1n,
    __vue_script__$1j,
    __vue_scope_id__$1n,
    __vue_is_functional_template__$1n,
    __vue_module_identifier__$1n,
    false,
    undefined,
    undefined,
    undefined
  );

function objectWithoutProperties$2 (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }

var vm$2, getVM$2 = function () { return vm$2 || (vm$2 = new Vue({
  data: function data() {
    return { options: {} }
  },
  render: function render(h) {
    var this$1 = this;

    var ref = this.options;
    var render = ref.render;
    var rest = objectWithoutProperties$2( ref, ["render"] );
    var props = rest;
    return h(__vue_component__$1n, {
      props: props, on: { leave: function () { return this$1.destroy(); } }
    }, render && [render(h)])
  },
  methods: {
    toggle: function toggle(value) {
      this.options = Object.assign({}, this.options, {value: value});
    },
    show: function show(options) {
      this.options = Object.assign({}, options, {value: true});
    },
    destroy: function destroy() {
      this.$destroy();
      vm$2 = null;
    }
  }
}).$mount()); };

__vue_component__$1m.service = Object.assign({}, [
    'info',
    'success',
    'warning',
    'error',
    'confirm'
  ].reduce(function (acc, type) {
    var obj;

    return Object.assign({}, acc,
      ( obj = {}, obj[type] = function (options) { getVM$2().show(Object.assign({}, options, {type: type})); }, obj ))
  }, {}),
  {remove: function remove() {
    vm$2 && vm$2.toggle(false);
  }});

//
//
//
//
//

var script$1k = {
  name: 'UiForm',
  data: function data() {
    return { fields: [] }
  },
  props: {
    model: Object,
    rules: Object,
    inline: Boolean,
    labelPosition: {
      default: 'right',
      validator: function validator(value) {
        return ['left', 'right', 'top'].indexOf(value) !== -1
      }
    },
    labelWidth: [Number, String],
    showMessage: {
      type: Boolean,
      default: true
    },
    autocomplete: {
      default: 'off',
      validator: function validator(value) {
        return ['off', 'on'].indexOf(value) !== -1
      }
    }
  },
  methods: {
    addItem: function addItem(vm) {
      this.fields.push(vm);
    },
    removeItem: function removeItem(vm) {
      this.fields.splice(this.fields.indexOf(vm), 1);
    },
    validate: function validate(callback) {

    },
    validateField: function validateField(prop, callback) {

    },
    resetFields: function resetFields() {

    }
  }
};

/* script */
var __vue_script__$1k = script$1k;
/* template */
var __vue_render__$1o = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "form",
    {
      staticClass: "ui-form",
      class: [_vm.labelPosition, { inline: _vm.inline }],
      attrs: { autocomplete: _vm.autocomplete }
    },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$1o = [];
__vue_render__$1o._withStripped = true;

  /* style */
  var __vue_inject_styles__$1o = undefined;
  /* scoped */
  var __vue_scope_id__$1o = undefined;
  /* module identifier */
  var __vue_module_identifier__$1o = undefined;
  /* functional template */
  var __vue_is_functional_template__$1o = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1o = normalizeComponent(
    { render: __vue_render__$1o, staticRenderFns: __vue_staticRenderFns__$1o },
    __vue_inject_styles__$1o,
    __vue_script__$1k,
    __vue_scope_id__$1o,
    __vue_is_functional_template__$1o,
    __vue_module_identifier__$1o,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$1l = {
  name: 'UiFormItem',
  data: function data() {
    return { prefix: 'ui-form-item', parent: null }
  },
  props: {
    prop: String,
    label: String,
    labelWidth: [Number, String],
    rules: [Object, Array],
    showMessage: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    lw: function lw() {
      return this.labelWidth || (this.parent && this.parent.labelWidth)
    },
    hasLabel: function hasLabel() {
      return this.label || this.$slots.label !== undefined || this.lw
    },
    labelStyle: function labelStyle() {
      return this.lw && { width: parseSize(this.lw) }
    },
    showMsg: function showMsg() {
      return this.showMessage && this.parent && this.parent.showMessage
    }
  },
  mounted: function mounted() {
    this.parent = findParent(this, 'UiForm');
    this.parent.addItem(this);
  },
  beforeDestroy: function beforeDestroy() {
    this.parent.removeItem(this);
  }
};

/* script */
var __vue_script__$1l = script$1l;

/* template */
var __vue_render__$1p = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { class: _vm.prefix }, [
    _vm.hasLabel
      ? _c(
          "label",
          { class: _vm.prefix + "-label", style: _vm.labelStyle },
          [_vm._t("label", [_vm._v(_vm._s(_vm.label))])],
          2
        )
      : _vm._e(),
    _vm._v(" "),
    _c(
      "div",
      { class: _vm.prefix + "-content" },
      [
        _vm._t("default"),
        _vm._v(" "),
        _c("transition", { attrs: { name: "x-animate-fade" } }, [
          _vm.showMsg
            ? _c("div", { class: _vm.prefix + "-error-tip" })
            : _vm._e()
        ])
      ],
      2
    )
  ])
};
var __vue_staticRenderFns__$1p = [];
__vue_render__$1p._withStripped = true;

  /* style */
  var __vue_inject_styles__$1p = undefined;
  /* scoped */
  var __vue_scope_id__$1p = undefined;
  /* module identifier */
  var __vue_module_identifier__$1p = undefined;
  /* functional template */
  var __vue_is_functional_template__$1p = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1p = normalizeComponent(
    { render: __vue_render__$1p, staticRenderFns: __vue_staticRenderFns__$1p },
    __vue_inject_styles__$1p,
    __vue_script__$1l,
    __vue_scope_id__$1p,
    __vue_is_functional_template__$1p,
    __vue_module_identifier__$1p,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$1m = {
  props: {
    columns: Array
  }
};

/* script */
var __vue_script__$1m = script$1m;

/* template */
var __vue_render__$1q = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "ui-table-header" }, [
    _c("table", [
      _c(
        "colgroup",
        _vm._l(_vm.columns, function(item) {
          return _c("col", { key: item.key })
        }),
        0
      ),
      _vm._v(" "),
      _c("thead", [
        _c(
          "tr",
          _vm._l(_vm.columns, function(item) {
            return _c("th", { key: item.key }, [
              _c("div", { staticClass: "ui-table-cell" }, [
                _vm._v(_vm._s(item.title))
              ])
            ])
          }),
          0
        )
      ])
    ])
  ])
};
var __vue_staticRenderFns__$1q = [];
__vue_render__$1q._withStripped = true;

  /* style */
  var __vue_inject_styles__$1q = undefined;
  /* scoped */
  var __vue_scope_id__$1q = undefined;
  /* module identifier */
  var __vue_module_identifier__$1q = undefined;
  /* functional template */
  var __vue_is_functional_template__$1q = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1q = normalizeComponent(
    { render: __vue_render__$1q, staticRenderFns: __vue_staticRenderFns__$1q },
    __vue_inject_styles__$1q,
    __vue_script__$1m,
    __vue_scope_id__$1q,
    __vue_is_functional_template__$1q,
    __vue_module_identifier__$1q,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//

var script$1n = {
  props: {
    data: Array,
    columns: Array,
    rowClassName: Function
  },
  methods: {
    setRowClassName: function setRowClassName(row, index) {
      var customClsName = this.rowClassName && this.rowClassName(row, index);
      return [customClsName, { hasCustomClsName: customClsName }]
    },
    setColClassName: function setColClassName(row, col) {
      var cellClsName = (row.cellClassName || {})[col.key];
      return [col.className, cellClsName, { hasCustomClsName: cellClsName || col.className }]
    }
  }
};

/* script */
var __vue_script__$1n = script$1n;

/* template */
var __vue_render__$1r = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "ui-table-body" }, [
    _c("table", [
      _c(
        "tbody",
        _vm._l(_vm.data, function(row, index) {
          return _c(
            "tr",
            { key: index, class: _vm.setRowClassName(row, index) },
            _vm._l(_vm.columns, function(col) {
              return _c(
                "td",
                { key: col.key, class: _vm.setColClassName(row, col) },
                [
                  _c("div", { staticClass: "ui-table-cell" }, [
                    _vm._v(_vm._s(row[col.key]))
                  ])
                ]
              )
            }),
            0
          )
        }),
        0
      )
    ])
  ])
};
var __vue_staticRenderFns__$1r = [];
__vue_render__$1r._withStripped = true;

  /* style */
  var __vue_inject_styles__$1r = undefined;
  /* scoped */
  var __vue_scope_id__$1r = undefined;
  /* module identifier */
  var __vue_module_identifier__$1r = undefined;
  /* functional template */
  var __vue_is_functional_template__$1r = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1r = normalizeComponent(
    { render: __vue_render__$1r, staticRenderFns: __vue_staticRenderFns__$1r },
    __vue_inject_styles__$1r,
    __vue_script__$1n,
    __vue_scope_id__$1r,
    __vue_is_functional_template__$1r,
    __vue_module_identifier__$1r,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$1o = {
  components: { UiTableHeader: __vue_component__$1q, UiTableBody: __vue_component__$1r },
  props: {
    data: {
      type: Array,
      default: function () { return []; }
    },
    columns: {
      type: Array,
      default: function () { return []; }
    },
    stripe: Boolean,
    border: Boolean,
    showHeader: {
      type: Boolean,
      default: true
    },
    width: {
      type: [Number, String],
      default: 'auto'
    },
    height: [Number, String],
    loading: Boolean,
    disabledHover: Boolean,
    highlightRow: Boolean,
    rowClassName: Function,
    size: {
      validator: function validator(value) {
        return ['large', 'small', 'default'].indexOf(value) !== -1
      }
    },
    noDataText: {
      type: String,
      default: '暂无数据'
    },
    noFilteredDataText: {
      type: String,
      default: '暂无筛选结果'
    }
  },
  computed: {
    bodyStyle: function bodyStyle() {
      var height = this.height && (isNaN(this.height) ? this.height : ((this.height) + "px"));
      return height ? { overflowY: 'scroll', height: height } : {}
    }
  }
};

/* script */
var __vue_script__$1o = script$1o;
/* template */
var __vue_render__$1s = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      staticClass: "ui-table-wrapper",
      class: [{ stripe: _vm.stripe, border: _vm.border }]
    },
    [
      _c(
        "div",
        { staticClass: "ui-table" },
        [
          _c("UiTableHeader", { attrs: { columns: _vm.columns } }),
          _vm._v(" "),
          _c("UiTableBody", {
            style: _vm.bodyStyle,
            attrs: {
              data: _vm.data,
              columns: _vm.columns,
              rowClassName: _vm.rowClassName
            }
          })
        ],
        1
      )
    ]
  )
};
var __vue_staticRenderFns__$1s = [];
__vue_render__$1s._withStripped = true;

  /* style */
  var __vue_inject_styles__$1s = undefined;
  /* scoped */
  var __vue_scope_id__$1s = undefined;
  /* module identifier */
  var __vue_module_identifier__$1s = undefined;
  /* functional template */
  var __vue_is_functional_template__$1s = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1s = normalizeComponent(
    { render: __vue_render__$1s, staticRenderFns: __vue_staticRenderFns__$1s },
    __vue_inject_styles__$1s,
    __vue_script__$1o,
    __vue_scope_id__$1s,
    __vue_is_functional_template__$1s,
    __vue_module_identifier__$1s,
    false,
    undefined,
    undefined,
    undefined
  );

// 日期选择器
// import DatePicker from './components/picker/DatePicker.vue'
// // 时间选择器
// import TimePicker from './components/picker/TimePicker.vue'

var comps = {
  Icon: __vue_component__,
  Button: __vue_component__$1,
  ButtonGroup: __vue_component__$2,
  Badge: __vue_component__$3,
  Affix: __vue_component__$4,
  BackTop: __vue_component__$5,
  Avatar: __vue_component__$6,
  Alert: __vue_component__$8,
  Tag: __vue_component__$9,
  ICircle: __vue_component__$a,
  Time: __vue_component__$b,
  Card: __vue_component__$c,
  Breadcrumb: __vue_component__$d,
  BreadcrumbItem: __vue_component__$e,
  Divider: __vue_component__$f,
  Cell: __vue_component__$g,
  CellGroup: __vue_component__$h,
  Split: __vue_component__$i,
  Timeline: __vue_component__$j,
  TimelineItem: __vue_component__$k,
  ISwitch: __vue_component__$l,
  Rate: __vue_component__$m,
  Checkbox: __vue_component__$n,
  CheckboxGroup: __vue_component__$o,
  Progress: __vue_component__$q,
  Collapse: __vue_component__$r,
  Panel: __vue_component__$t,
  Step: __vue_component__$u,
  Steps: __vue_component__$v,
  Radio: __vue_component__$w,
  RadioGroup: __vue_component__$x,
  Spin: __vue_component__$y,
  Scroll: __vue_component__$A,
  Drawer: __vue_component__$C,
  Row: __vue_component__$D,
  Col: __vue_component__$E,
  List: __vue_component__$F,
  ListItem: __vue_component__$G,
  ListItemMeta: __vue_component__$H,
  Input: __vue_component__$I,
  InputNumber: __vue_component__$J,
  Transfer: __vue_component__$L,
  Anchor: __vue_component__$M,
  AnchorLink: __vue_component__$N,
  Modal: __vue_component__$1m,
  Carousel: __vue_component__$O,
  CarouselItem: __vue_component__$P,
  Tree: __vue_component__$R,
  Layout: __vue_component__$S,
  Header: __vue_component__$T,
  Content: __vue_component__$U,
  Footer: __vue_component__$V,
  Sider: __vue_component__$W,
  Page: __vue_component__$_,
  Tabs: __vue_component__$$,
  TabPane: __vue_component__$10,
  Slider: __vue_component__$12,
  Tooltip: __vue_component__$11,
  Poptip: __vue_component__$13,
  Dropdown: __vue_component__$14,
  DropdownMenu: __vue_component__$16,
  DropdownItem: __vue_component__$15,
  Menu: __vue_component__$17,
  MenuItem: __vue_component__$19,
  Submenu: __vue_component__$18,
  MenuGroup: __vue_component__$1a,
  Select: __vue_component__$Y,
  Option: __vue_component__$Z,
  OptionGroup: __vue_component__$1b,
  AutoComplete: __vue_component__$1c,
  Upload: __vue_component__$1d,
  Cascader: __vue_component__$1g,
  ColorPicker: __vue_component__$1h,

  Form: __vue_component__$1o,
  FormItem: __vue_component__$1p,
  Table: __vue_component__$1s,
  // DatePicker,
  // TimePicker
};

/**
 * 安装插件
 * @param {import('vue').VueConstructor} Vue
 */
function index (Vue, options) {
  if ( options === void 0 ) options = {};

  Vue.prototype.$XVIEW_UI = tools;
  Vue.prototype.$Notice = Notice;
  Vue.prototype.$Message = Message;
  Vue.prototype.$Spin = __vue_component__$y.service;
  Vue.prototype.$Modal = __vue_component__$1m.service;
  Vue.LoadingBar = Vue.prototype.$Loading = loadingBarService;
  var prefix = typeof options.prefix === 'string' ? options.prefix : 'Ui';
  for (var name in comps) { Vue.component(prefix + name, comps[name]); }
}

module.exports = index;
