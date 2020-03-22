/*!
 * xview-ui v1.4.4
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
  getOffset: getOffset
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
 * 事件指令
 */

function EventManager(object, eventName) {
  this.handlers = [];
  this.object = object;
  this.eventName = eventName;
  this.eventHandler = this.eventHandler.bind(this);
  this.addListener();
}

EventManager.prototype = {
  addListener: function addListener() {
    this.object.addEventListener(this.eventName, this.eventHandler);
  },
  removeListener: function removeListener() {
    this.object.removeEventListener(this.eventName, this.eventHandler);
  },
  addHandler: function addHandler(fn) {
    this.handlers.push(fn);
  },
  removeHandler: function removeHandler(fn) {
    this.handlers.splice(this.handlers.indexOf(fn), 1);
  },
  eventHandler: function eventHandler(event) {
    this.handlers.forEach(function (handler) { return handler(event); });
  },
  getHandlerCount: function getHandlerCount() {
    return this.handlers.length
  }
};

/**
 * 创建事件指令
 * 
 * @param {Object} object
 * @param {String} eventName
 */
function createEventDirective(object, eventName) {
  var eventManager;
  return {
    inserted: function inserted(el, ref) {
      var value = ref.value;

      if (typeof value !== 'function') {
        throw new Error('The value of directive must be a function !')
      }
      if (!eventManager) {
        eventManager = new EventManager(object, eventName);
      }
      el[el.tagName + eventName] = value;
      eventManager.addHandler(value);
    },
    unbind: function unbind(el) {
      var handler = el[el.tagName + eventName];
      handler && eventManager.removeHandler(handler);
      if (eventManager.getHandlerCount() === 0) {
        eventManager.removeListener();
        eventManager = null;
      }
    }
  }
}

var winclick = createEventDirective(window, 'click');
var winresize = createEventDirective(window, 'resize');
var winscroll = createEventDirective(window, 'scroll');

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
var script$s = {
  name: 'XPanel',
  components: { XIcon: __vue_component__ },
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
var __vue_script__$s = script$s;

/* template */
var __vue_render__$s = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { class: _vm.prefix }, [
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
        class: _vm.prefix + "_content"
      },
      [_vm._t("content")],
      2
    )
  ])
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
var __vue_script__$t = script$t;

/* template */
var __vue_render__$t = function() {
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
var __vue_script__$u = script$u;
/* template */
var __vue_render__$u = function() {
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
var __vue_script__$v = script$v;
/* template */
var __vue_render__$v = function() {
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
var __vue_script__$w = script$w;

/* template */
var __vue_render__$w = function() {
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

var script$x = {
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
var __vue_script__$x = script$x;
/* template */
var __vue_render__$x = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("transition", { attrs: { name: _vm.prefix } }, [
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
    return h(__vue_component__$x, {
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

__vue_component__$x.service = {
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
var script$y = {
  name: 'XLoading',
  components: { XIcon: __vue_component__, XSpin: __vue_component__$x },
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
var __vue_script__$y = script$y;
/* template */
var __vue_render__$y = function() {
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

//
var script$z = {
  name: 'XScroll',
  components: { XLoading: __vue_component__$y },
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
var __vue_script__$z = script$z;
/* template */
var __vue_render__$z = function() {
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
//
//
//
//

var script$A = {
  name: 'XOverlay'
};

/* script */
var __vue_script__$A = script$A;
/* template */
var __vue_render__$A = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("transition", { attrs: { name: "x-overlay" } }, [
    _c("div", _vm._g({ staticClass: "x-overlay" }, _vm.$listeners))
  ])
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
var script$B = {
  name: 'XDrawer',
  components: { XOverlay: __vue_component__$A, XCloseIconButton: __vue_component__$7 },
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
var __vue_script__$B = script$B;
/* template */
var __vue_render__$B = function() {
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
//
//
//
//

var script$C = {
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
var __vue_script__$C = script$C;
/* template */
var __vue_render__$C = function() {
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
var N = Number, NS = [N, String], NO = [N, Object];
var script$D = {
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
var script$E = {
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
var __vue_script__$E = script$E;
/* template */
var __vue_render__$E = function() {
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

//
var script$F = {
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
var __vue_script__$F = script$F;

/* template */
var __vue_render__$F = function() {
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
var S$1 = String;
var script$G = {
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
var __vue_script__$G = script$G;

/* template */
var __vue_render__$G = function() {
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
var S$2 = String, B$1 = Boolean;
var script$H = {
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
    onClear: function onClear() {
      this.$emit('input', '');
      this.$emit('on-clear');
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
var __vue_script__$H = script$H;
/* template */
var __vue_render__$H = function() {
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
var N$1 = Number, S$3 = String, B$2 = Boolean, F = Function, I = Infinity;
var script$I = {
  name: 'XInputNumber',
  components: { XIcon: __vue_component__, XInput: __vue_component__$H },
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
var __vue_script__$I = script$I;
/* template */
var __vue_render__$I = function() {
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
var script$J = {
  name: 'XTransferBox',
  components: { XInput: __vue_component__$H, XCheckbox: __vue_component__$n, XCheckboxGroup: __vue_component__$o },
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
var __vue_script__$J = script$J;

/* template */
var __vue_render__$J = function() {
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

//
var script$K = {
  name: 'XTransfer',
  components: { XBox: __vue_component__$J, XIcon: __vue_component__, XBtn: __vue_component__$1 },
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
var __vue_script__$K = script$K;
/* template */
var __vue_render__$K = function() {
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
var N$2 = Number, B$3 = Boolean, numProp = { type: N$2, default: 0 };
var script$L = {
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
var __vue_script__$L = script$L;
/* template */
var __vue_render__$L = function() {
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
var script$M = {
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
var __vue_script__$M = script$M;
/* template */
var __vue_render__$M = function() {
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
var S$5 = String, B$4 = Boolean, N$3 = Number;
var script$N = {
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
var __vue_script__$N = script$N;
/* template */
var __vue_render__$N = function() {
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
//
//
//
//

var script$O = {
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
var __vue_script__$O = script$O;

/* template */
var __vue_render__$O = function() {
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
var script$P = {
  name: 'XTreeNode',
  components: { XIcon: __vue_component__, XLoading: __vue_component__$y, XCheckbox: __vue_component__$n, XRender: XRender },
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
var __vue_script__$P = script$P;
/* template */
var __vue_render__$P = function() {
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
var key = 0, B$5 = Boolean, F$2 = Function;
var script$Q = {
  name: 'XTree',
  components: { XNode: __vue_component__$P },
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
var __vue_script__$Q = script$Q;

/* template */
var __vue_render__$Q = function() {
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
//
//
//
//

var script$R = {
  name: 'XLayout',
  data: function data() {
    return { hasSider: false }
  },
  mounted: function mounted() {
    this.hasSider = this.$children.some(function (_) { return _.$options.name === 'XSider'; });
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
    { class: ["x-layout", { hasSider: _vm.hasSider }] },
    [_vm._t("default")],
    2
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

/* script */

/* template */
var __vue_render__$S = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "x-layout-header" }, [_vm._t("default")], 2)
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
    {},
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
  return _c("div", { staticClass: "x-layout-content" }, [_vm._t("default")], 2)
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
  return _c("div", { staticClass: "x-layout-footer" }, [_vm._t("default")], 2)
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

//
var B$6 = Boolean, NS$1 = [Number, String];
var script$S = {
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
var __vue_script__$S = script$S;

/* template */
var __vue_render__$V = function() {
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
    __vue_script__$S,
    __vue_scope_id__$V,
    __vue_is_functional_template__$V,
    __vue_module_identifier__$V,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$T = {
  data: function data() {
    return { styles: {}, parent: null }
  },
  props: { visible: Boolean, parentName: String },
  computed: {
    multiple: function multiple() {
      return this.parent && this.parent.multiple
    }
  },
  watch: {
    /**
     * 可见时，更新层索引和位置信息
     */
    visible: function visible(newVal) {
      if (!newVal) { return }
      this.styles = Object.assign({}, {zIndex: getMaxZIndex()}, this.getPosition());
    }
  },
  methods: {
    /**
     * 获取位置信息
     */
    getPosition: function getPosition() {
      if (!this.parent) { return {} }
      var offset = getOffset(this.parent.$el);
      return { minWidth: ((offset.width) + "px"), top: ((offset.top + offset.height) + "px"), left: ((offset.left) + "px") }
    },
    /**
     * 更新位置，仅可见时更新
     */
    updatePosition: function updatePosition() {
      if (this.visible) {
        this.styles = Object.assign({}, this.styles, this.getPosition());
      }
    }
  },
  /**
   * 挂载完成后，将挂载元素插入文档主体尾部
   */
  mounted: function mounted() {
    document.body.appendChild(this.$el);
    this.parent = findParent(this, this.parentName || 'ui-select');
    window.addEventListener('resize', this.updatePosition);
  },
  /**
   * 注销之前，移除挂载元素
   */
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('resize', this.updatePosition);
    this.$el.parentNode && this.$el.parentNode.removeChild(this.$el);
  }
};

/* script */
var __vue_script__$T = script$T;
/* template */
var __vue_render__$W = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("transition", { attrs: { name: "ui-dropdown" } }, [
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
        staticClass: "ui-select-dropdown",
        class: { multiple: _vm.multiple },
        style: _vm.styles
      },
      [
        _c("div", { staticClass: "ui-select-empty" }, [_vm._t("empty")], 2),
        _vm._v(" "),
        _vm._t("default")
      ],
      2
    )
  ])
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

/**
 * 判断一个元素是否另一个元素的父元素或者自身
 * @param {HTMLElement} par 
 * @param {HTMLElement} el 
 */
function isSelfOrParent(par, el) {
  do {
    if (el === par) { return true }
    el = el.parentNode;
  } while (el && el !== document.body)
  return false
}

/**
 * 判断一个元素的父元素是否有指定的类
 * @param {HTMLElement} el 
 * @param {String} clsName 
 */
function hasClassNameOfParent(el, clsName) {
  return !!findParentByClassName(el, clsName)
}

/**
 * 通过类名查找父元素
 * @param {HTMLElement} el 
 * @param {String} clsName 
 */
function findParentByClassName(el, clsName) {
  do {
    if (el.classList.contains(clsName)) { return el }
    el = el.parentNode;
  } while (el && el !== document.body)
  return null
}

//

// 目标选项列表组件
var currentSelect = null;

/**
 * 关闭目标选项列表下拉框
 * @param {MouseEvent} event
 */
function closeSelect(event) {
  if (!(currentSelect && currentSelect.isCollapsed)) { return }
  var domSelect = findParentByClassName(event.target, 'ui-select');
  var isDropdown = hasClassNameOfParent(event.target, 'ui-select-dropdown');
  var isDisabled = domSelect && domSelect.classList.contains('disabled');
  if (isDropdown || (domSelect && !isDisabled)) { return }
  currentSelect.$data.isCollapsed = false;
}

/**
 * 添加窗口单击事件监听器
 */
function addDocClickListener() {
  // console.log('监听器被添加')
  window.addEventListener('click', closeSelect);
}

addDocClickListener();

var script$U = {
  name: 'ui-select',
  components: { UiTag: __vue_component__$9, UiIcon: __vue_component__, UiOptionList: __vue_component__$W },
  data: function data() {
    return {
      isCollapsed: false, // 是否展开下拉列表
      selectedItem: {}, // 选择的item，单选
      selectedItems: [], // 选择的items，多选
      children: [], // Option组件数组
      searchValue: '' // 搜索值
    }
  },
  props: {
    value: [String, Number, Array],
    multiple: Boolean,
    disabled: Boolean,
    clearable: Boolean,
    filterable: Boolean,
    remote: Boolean,
    remoteMethod: Function,
    loading: Boolean,
    loadingText: {
      type: String,
      default: '加载中'
    },
    label: [String, Number, Array],
    size: {
      validator: function validator(value) {
        return ['large', 'small', 'default'].indexOf(value) !== -1
      }
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    notFoundText: {
      type: String,
      default: '无匹配数据'
    },
    placement: {
      default: 'bottom',
      validator: function validator(value) {
        return ['bottom', 'top'].indexOf(value) !== -1
      }
    }
  },
  computed: {
    /**
     * 单选选中的标签
     */
    selectedLabelOfSingle: function selectedLabelOfSingle() {
      return this.selectedItem.label || this.selectedItem.value
    },
    /**
     * 是否显示清除按钮
     */
    showClear: function showClear() {
      return this.clearable && (this.multiple ? this.selectedItems.length : this.selectedItem.value)
    },
    isEmpty: function isEmpty() {
      return this.children.every(function (_) { return _.isDelete; })
    },
    multipleInputStyles: function multipleInputStyles() {
      return this.selectedItems.length ? { width: '20px' } : {}
    },
    multiplePlaceholder: function multiplePlaceholder() {
      return this.selectedItems.length === 0 && this.placeholder
    },
    searchText: function searchText() {
      return this.searchValue.replace(/\s/gm, function (val) { return '&nbsp;'; })
    }
  },
  watch: {
    /**
     * 值改变
     */
    value: function value(newVal) {
      this.updateModel(newVal);
    },
    /**
     * 选择的值改变，单选
     */
    selectedItem: function selectedItem(newVal) {
      this.syncModel();
    },
    /**
     * 选择的值改变，多选
     */
    selectedItems: function selectedItems(newVal) {
      var this$1 = this;

      if (this.isCollapsed) {
        this.$nextTick(function () { return this$1.$refs.UiOptionList.updatePosition(); });
      }
    },
    /**
     * 搜索值改变
     */
    searchValue: function searchValue(newVal) {
      var this$1 = this;

      if (!this.filterable) { return }
      // 远程搜索
      if (this.remote) {
        this.remoteMethod && this.remoteMethod(newVal);
      // 本地搜索
      } else {
        var _newVal = newVal.toLowerCase();
        this.children.forEach(function (_) {
          var _val = ('' + _.value).toLowerCase();
          var _label = _.label === undefined ? '' : ('' + _.label).toLowerCase();
          _.$data.isDelete = _val.indexOf(_newVal) === -1 && _label.indexOf(_newVal) === -1;
        });
      }
      if (!this.multiple) { return }
      // 更新文本框框宽度
      this.$nextTick(function () {
        this$1.$refs.Input.style.width = 
          newVal || this$1.selectedItems.length ? 
          Math.min(this$1.$refs.SearchText.offsetWidth, this$1.$el.offsetWidth - 25) + 'px' : '';
      });
    }
  },
  methods: {
    /**
     * 显示所有Option组件
     */
    showAll: function showAll() {
      this.children.forEach(function (_) { return _.$data.isDelete = false; });
    },
    /**
     * 切换显示和隐藏选项列表
     */
    toggleCollapse: function toggleCollapse(flag) {
      if (this.disabled) { return }
      this.isCollapsed = typeof flag === 'boolean' ? flag : !this.isCollapsed;
      if (this.isCollapsed) {
        if (currentSelect && currentSelect !== this) {
          currentSelect.$data.isCollapsed = false;
        }
        currentSelect = this;
        this.showAll();
      }
      this.$emit('on-open-change', this.isCollapsed);
    },
    /**
     * 是否被选中的Option组件
     * @param {Vue.default} vm
     */
    isSelectedChild: function isSelectedChild(vm) {
      return this.multiple ? this.inSelectedItems(vm.value) : this.selectedItem.value === vm.value
    },
    /**
     * 是否在选择的items中
     * @param {String|Number} value
     */
    inSelectedItems: function inSelectedItems(value) {
      return this.selectedItems.some(function (_) { return _.value === value; })
    },
    /**
     * 根据值，移除选择的item
     * @param {String|Number} value
     */
    removeSelectedItemByValue: function removeSelectedItemByValue(value) {
      var index = this.selectedItems.map(function (_) { return _.value; }).indexOf(value);
      this.selectedItems.splice(index, 1);
    },
    /**
     * 移除选择的item
     * @param {Object} item
     */
    removeSelectedItem: function removeSelectedItem(item) {
      this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
      this.syncModel();
    },
    /**
     * 添加选择的item
     */
    addSelectedItem: function addSelectedItem(value, label) {
      this.selectedItems.push({ value: value, label: label });
    },
    /**
     * 更新选择的值
     * @param {Vue.default} vm
     */
    updateSelectedValue: function updateSelectedValue(vm) {
      if (this.multiple) {
        this.filterable && this.$refs.Input.focus();
        this.inSelectedItems(vm.value) ? this.removeSelectedItemByValue(vm.value) : this.addSelectedItem(vm.value, vm.label);
        this.syncModel();
      } else {
        this.isCollapsed = false;
        this.selectedItem = { value: vm.value, label: vm.label };
        if (this.filterable) {
          this.searchValue = this.getCheckedTextOfSingle();
        }
      }
    },
    getCheckedTextOfSingle: function getCheckedTextOfSingle() {
      return (this.selectedItem.label || this.selectedItem.value) + ''
    },
    /**
     * 添加Option组件实例
     * @param {Vue.default} vm
     */
    addChild: function addChild(vm) {
      this.children.push(vm);
    },
    /**
     * 移除Option组件实例
     * @param {Vue.default} vm
     */
    removeChild: function removeChild(vm) {
      this.children.splice(this.children.indexOf(vm), 1);
    },
    /**
     * 清除选中的值
     */
    clearValue: function clearValue() {
      if (this.multiple) {
        this.selectedItems = [];
      } else {
        this.selectedItem = {};
      }
      this.isCollapsed = false;
    },
    /**
     * 选择框得到焦点处理
     */
    handleFocus: function handleFocus() {
      if (this.filterable) { this.$refs.Input.focus(); }
    },
    /**
     * 选择框键盘按下事件处理
     * @param {KeyboardEvent} event
     */
    handleKeydown: function handleKeydown(event) {
      var K_UP = 38, K_DOWN = 40, K_ESC = 27, K_ENTER = 13, K_DEL = 46, K_BACKSPACE = 8;
      var keyCode = event.keyCode;
      if ([K_UP, K_DOWN, K_ESC].indexOf(keyCode) !== -1) {
        event.preventDefault();
      }
      if (keyCode === K_ENTER) {
        this.isCollapsed && this.updateValueByFocusOption();
      } else if (keyCode === K_UP) {
        if (this.isCollapsed) { this.setOptionFocus('up'); }
      } else if (keyCode === K_DOWN) {
        this.isCollapsed ? this.setOptionFocus() : this.toggleCollapse(true);
      } else if (keyCode === K_ESC) {
        this.isCollapsed = false;
      } else if (keyCode === K_DEL || keyCode === K_BACKSPACE) {
        if (!(this.multiple && this.filterable) || this.searchValue) { return }
        this.selectedItems.pop();
      }
    },
    /**
     * 获取得到焦点的Option
     */
    updateValueByFocusOption: function updateValueByFocusOption() {
      var vm =  this.children.find(function (_) { return _.focus; });
      if (vm) { this.updateSelectedValue(vm); }
    },
    /**
     * 设置焦点Option
     * @param {String} dir
     */
    setOptionFocus: function setOptionFocus(dir) {
      if ( dir === void 0 ) dir = 'down';

      var arr = this.children.filter(function (_) { return !_.isDelete; });
      var len = arr.length;
      if (!len) { return }
      var focusIndex = arr.map(function (_) { return _.focus; }).indexOf(true);
      this.children.forEach(function (_) { return _.$data.focus = false; });
      if (dir === 'down') {
        if (focusIndex < len - 1) {
          focusIndex++;
        } else {
          focusIndex = 0;
        }
      } else {
        if (focusIndex <= 0) {
          focusIndex = len - 1;
        } else {
          focusIndex--;
        }
      }
      var vm = arr[focusIndex];
      vm.$data.focus = true;
      vm.$el.scrollIntoViewIfNeeded();
    },
    /**
     * 搜索框失去焦点处理
     * @param {MouseEvent} event
     */
    handleSearchBlur: function handleSearchBlur(event) {
      if (!this.filterable || this.multiple) { return }
      var relatedTarget = event.relatedTarget;
      if (
        relatedTarget && 
        (isSelfOrParent(this.$el, relatedTarget) || 
        isSelfOrParent(this.$refs.UiOptionList.$el, relatedTarget))
      ) { return }
      this.searchValue = this.getCheckedTextOfSingle();
    },
    /**
     * 更新模型数据
     * @param {String|Number|Array} value
     */
    updateModel: function updateModel(value) {
      var this$1 = this;

      if (this.multiple) {
        this.selectedItems = value.map(function (_) { return ({ value: _, label: this$1.getLabelByValue(_) }); });
      } else {
        this.selectedItem = { value: value, label: this.getLabelByValue(value) };
      }
    },
    /**
     * 向父组件同步模型数据
     */
    syncModel: function syncModel() {
      var value = this.multiple ? this.selectedItems.map(function (_) { return _.value; }) : this.selectedItem.value;
      this.$emit('input', value);
      this.$emit('on-change', value);
    },
    /**
     * 通过值获取标签
     * @param {String|Number} value
     */
    getLabelByValue: function getLabelByValue(value) {
      var vm = this.children.find(function (_) { return _.value === value; });
      return vm && vm.label
    }
  },
  mounted: function mounted() {
    this.updateModel(this.value);
  },
  beforeDestroy: function beforeDestroy() {
    if (currentSelect === this) { currentSelect = null; }
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
    { staticClass: "ui-select", class: { disabled: _vm.disabled } },
    [
      _c(
        "div",
        {
          staticClass: "ui-select-selection",
          class: [
            _vm.size,
            {
              isCollapsed: _vm.isCollapsed,
              clearable: _vm.showClear,
              multiple: _vm.multiple,
              filterable: _vm.filterable,
              disabled: _vm.disabled
            }
          ],
          attrs: { tabindex: "0" },
          on: {
            click: _vm.toggleCollapse,
            focus: _vm.handleFocus,
            keydown: _vm.handleKeydown
          }
        },
        [
          _vm.multiple
            ? [
                _vm._l(_vm.selectedItems, function(item) {
                  return _c(
                    "ui-tag",
                    {
                      key: item.value,
                      attrs: { closable: "", fade: false },
                      on: {
                        "on-close": function($event) {
                          return _vm.removeSelectedItem(item)
                        }
                      }
                    },
                    [
                      _vm._v(
                        "\n        " +
                          _vm._s(item.label || item.value) +
                          "\n      "
                      )
                    ]
                  )
                }),
                _vm._v(" "),
                !(_vm.filterable || _vm.selectedItems.length)
                  ? _c("input", {
                      staticClass: "ui-select-search placeholder",
                      attrs: { readonly: "", placeholder: _vm.placeholder }
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
                      staticClass: "ui-select-search",
                      style: _vm.multipleInputStyles,
                      attrs: { placeholder: _vm.multiplePlaceholder },
                      domProps: { value: _vm.searchValue },
                      on: {
                        blur: _vm.handleSearchBlur,
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.searchValue = $event.target.value;
                        }
                      }
                    })
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "span",
                  { ref: "SearchText", staticClass: "ui-select-search-text" },
                  [_vm._v(_vm._s(_vm.searchText))]
                )
              ]
            : _c(
                "div",
                { staticClass: "ui-select-single" },
                [
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
                        staticClass: "ui-select-search",
                        attrs: { placeholder: _vm.placeholder },
                        domProps: { value: _vm.searchValue },
                        on: {
                          blur: _vm.handleSearchBlur,
                          input: function($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.searchValue = $event.target.value;
                          }
                        }
                      })
                    : [
                        _vm.selectedLabelOfSingle
                          ? _c("span", { staticClass: "ui-select-label" }, [
                              _vm._v(_vm._s(_vm.selectedLabelOfSingle))
                            ])
                          : _c(
                              "span",
                              { staticClass: "ui-select-placeholder" },
                              [_vm._v(_vm._s(_vm.placeholder))]
                            )
                      ]
                ],
                2
              ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "ui-select-arrow" },
            [
              _c("UiIcon", {
                staticClass: "ui-select-clear-icon",
                attrs: { type: "ios-close" },
                nativeOn: {
                  click: function($event) {
                    $event.stopPropagation();
                    return _vm.clearValue($event)
                  }
                }
              }),
              _vm._v(" "),
              _c("UiIcon", {
                staticClass: "ui-select-down-icon",
                attrs: { type: "arrow-down-b" }
              })
            ],
            1
          )
        ],
        2
      ),
      _vm._v(" "),
      _c(
        "ui-option-list",
        { ref: "UiOptionList", attrs: { visible: _vm.isCollapsed } },
        [
          _vm.isEmpty
            ? _c("span", { attrs: { slot: "empty" }, slot: "empty" }, [
                _vm._v(_vm._s(_vm.loading ? _vm.loadingText : _vm.notFoundText))
              ])
            : _vm._e(),
          _vm._v(" "),
          _c("ul", [_vm._t("default")], 2)
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

//
var script$V = {
  name: 'ui-select-option',
  components: { UiIcon: __vue_component__ },
  data: function data() {
    return {
      parent: null,
      isDelete: false,
      focus: false
    }
  },
  props: {
    value: [String, Number],
    label: String,
    disabled: Boolean
  },
  computed: {
    selected: function selected() {
      return this.parent && this.parent.isSelectedChild(this)
    },
    multiple: function multiple() {
      return this.parent && this.parent.multiple
    }
  },
  methods: {
    handleClick: function handleClick() {
      if (this.disabled) { return }
      if (this.parent) { this.parent.updateSelectedValue(this); }
    }
  },
  mounted: function mounted() {
    this.parent = findParent(this, 'ui-select');
    this.parent && this.parent.addChild(this);
  },
  beforeDestroy: function beforeDestroy() {
    this.parent && this.parent.removeChild(this);
  }
};

/* script */
var __vue_script__$V = script$V;
/* template */
var __vue_render__$Y = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return !_vm.isDelete
    ? _c(
        "li",
        {
          staticClass: "ui-select-option",
          class: {
            selected: _vm.selected,
            multiple: _vm.multiple,
            focus: _vm.focus,
            disabled: _vm.disabled
          },
          attrs: { tabindex: "-1" },
          on: { click: _vm.handleClick }
        },
        [
          _vm._t("default", [_vm._v(_vm._s(_vm.label || _vm.value))]),
          _vm._v(" "),
          _vm.selected && _vm.multiple
            ? _c("UiIcon", {
                staticClass: "ui-select-option-icon",
                attrs: { type: "android-done" }
              })
            : _vm._e()
        ],
        2
      )
    : _vm._e()
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
var N$4 = Number, B$7 = Boolean;
var script$W = {
  name: 'XPage',
  components: { XIcon: __vue_component__, XSelect: __vue_component__$X, XOption: __vue_component__$Y, XInput: __vue_component__$H },
  props: {
    current: { type: N$4, default: 1 },
    total: { type: N$4, default: 0 },
    pageSize: { type: N$4, default: 10 },
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
    simple: B$7,
    showTotal: B$7,
    showElevator: B$7,
    showSizer: B$7,
    transfer: B$7,
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
var __vue_script__$W = script$W;
/* template */
var __vue_render__$Z = function() {
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
var script$X = {
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
var __vue_script__$X = script$X;
/* template */
var __vue_render__$_ = function() {
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
var S$6 = String, B$8 = Boolean;
var script$Y = {
  name: 'XTabPane',
  data: function data() {
    return { key: this.name }
  },
  props: {
    name: S$6,
    label: [S$6, Function],
    icon: S$6,
    disabled: B$8,
    closable: { type: B$8, default: null }
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
var __vue_script__$Y = script$Y;

/* template */
var __vue_render__$$ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "x-tabs-pane" }, [_vm._t("default")], 2)
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
var script$Z = {
  data: function data() {
    return { zIndex: 0, styles: {} }
  },
  props: {
    placement: {
      default: 'bottom',
      validator: function validator(value) {
        return [
          'top', 'top-start', 'top-end',
          'right', 'right-start', 'right-end',
          'bottom', 'bottom-start', 'bottom-end',
          'left', 'left-start', 'left-end'
        ].indexOf(value) !== -1
      }
    },
    visible: Boolean,
    transitionName: {
      type: String,
      default: 'ui-fade'
    },
    hasArrow: Boolean,
    arrowClass: String,
    refElement: {}
  },
  watch: {
    visible: function visible() {
      this.updatePosition();
    }
  },
  methods: {
    /**
     * 获取挂载元素位置
     */
    setPosition: function setPosition() {
      // 挂载元素尺寸
      var ref = this.$el;
      var oh = ref.offsetHeight;
      var ow = ref.offsetWidth;
      // 引用元素位置和尺寸
      var refElement = this.refElement || this.$parent.$el;
      var ref$1 = getOffset(refElement);
      var t = ref$1.top;
      var r = ref$1.right;
      var b = ref$1.bottom;
      var l = ref$1.left;
      var w = ref$1.width;
      var h = ref$1.height;
      var pos = {};
      var ref$2 = this;
      var placement = ref$2.placement;
      // 如果是顶部和底部 那么top一样；如果是右边和左边 那么left一样
      if (placement.startsWith('top')) {
        pos.top = (t - oh) + "px";
      } else if (placement.startsWith('right')) {
        pos.left = r + "px";
      } else if (placement.startsWith('bottom')) {
        pos.top = b + "px";
      } else if (placement.startsWith('left')) {
        pos.left = (l - ow) + "px";
      }

      if (['top', 'bottom'].indexOf(placement) !== -1) {
        pos.left = (l - (ow - w) / 2) + "px";
      } else if (['top-start', 'bottom-start'].indexOf(placement) !== -1) {
        pos.left = l + "px";
      } else if (['top-end', 'bottom-end'].indexOf(placement) !== -1) {
        pos.left = (r - ow) + "px";
      } else if (['right', 'left'].indexOf(placement) !== -1) {
        pos.top = (t - (oh - h) / 2) + "px";
      } else if (['right-start', 'left-start'].indexOf(placement) !== -1) {
        pos.top = t + "px";
      } else if (['right-end', 'left-end'].indexOf(placement) !== -1) {
        pos.top = (b - oh) + "px";
      }
      this.styles = pos;
    },
    updatePosition: function updatePosition() {
      if (!this.visible) { return }
      this.zIndex = getMaxZIndex();
      this.$nextTick(this.setPosition);
    }
  },
  mounted: function mounted() {
    document.body.appendChild(this.$el);
    this.updatePosition();
  },
  beforeDestroy: function beforeDestroy() {
    this.$el.parentNode && this.$el.parentNode.removeChild(this.$el);
  }
};

/* script */
var __vue_script__$Z = script$Z;
/* template */
var __vue_render__$10 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("transition", { attrs: { name: _vm.transitionName } }, [
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
        staticClass: "ui-popper",
        class: { hasArrow: _vm.hasArrow },
        style: Object.assign({}, _vm.styles, { zIndex: _vm.zIndex }),
        attrs: { "x-placement": _vm.placement }
      },
      [
        _vm._t("default"),
        _vm._v(" "),
        _vm.hasArrow
          ? _c("span", {
              staticClass: "ui-popper-arrow",
              class: _vm.arrowClass
            })
          : _vm._e()
      ],
      2
    )
  ])
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
var script$_ = {
  components: { UiPopper: __vue_component__$10 },
  data: function data() {
    return { popperVisible: false, refElement: null }
  },
  props: {
    content: [String, Number],
    placement: String,
    disabled: Boolean,
    delay: {
      type: Number,
      default: 0
    },
    always: Boolean
  },
  watch: {
    disabled: function disabled(newVal) {
      if (newVal) { this.popperVisible = false; }
    }
  },
  methods: {
    handleMouseenter: function handleMouseenter() {
      var this$1 = this;

      if (this.disabled) { return }
      this.timeout = setTimeout(function () {
        this$1.popperVisible = true;
        this$1.$emit('on-popper-show');
      }, this.delay);
    },
    handleMouseleave: function handleMouseleave() {
      clearTimeout(this.timeout);
      this.popperVisible = false;
      this.$emit('on-popper-hide');
    },
    setPosition: function setPosition() {
      this.$refs.Popper.setPosition();
    }
  },
  mounted: function mounted() {
    this.refElement = this.$refs.Ref.children[0];
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
    "div",
    { staticClass: "ui-tooltip" },
    [
      _c(
        "div",
        {
          ref: "Ref",
          staticClass: "ui-tooltip-rel",
          on: {
            mouseenter: _vm.handleMouseenter,
            mouseleave: _vm.handleMouseleave
          }
        },
        [_vm._t("default")],
        2
      ),
      _vm._v(" "),
      _c(
        "ui-popper",
        {
          ref: "Popper",
          attrs: {
            hasArrow: "",
            refElement: _vm.refElement,
            placement: _vm.placement,
            visible: _vm.always || _vm.popperVisible
          }
        },
        [
          _c(
            "div",
            { staticClass: "ui-tooltip-content" },
            [_vm._t("content", [_vm._v(_vm._s(_vm.content))])],
            2
          )
        ]
      )
    ],
    1
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
var N$5 = Number, B$9 = Boolean;
var script$$ = {
  name: 'XSlider',
  components: { XTooltip: __vue_component__$11, XInputNumber: __vue_component__$I },
  props: {
    value: { type: [N$5, Array], default: 0 },
    min: { type: N$5, default: 0 },
    max: { type: N$5, default: 100 },
    step: { type: N$5, default: 1 },
    disabled: B$9,
    range: B$9,
    showInput: B$9,
    showStops: B$9,
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
    return { prefix: 'x-slider', inputValue: this.value, rightDown: false, leftDown: false }
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
      var prop = { placement: 'top' }, always = this.showTip === 'always';
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
      var ref = this.$refs;
      var LTip = ref.LeftTooltip;
      var RTip = ref.RightTooltip;
      this.$nextTick(function () { return this$1.leftDown ? LTip && LTip.setPosition() : this$1.rightDown ? RTip && RTip.setPosition() : 1; });
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
      document.body.classList.add(((this.prefix) + "_move"));
      window.addEventListener('mouseup', this.onMouseup);
      window.addEventListener('mousemove', this.onMousemove);
    },
    onMousemove: function onMousemove(e) {
      if (this.rightDown || this.leftDown) { this.update(e); }
    },
    onMouseup: function onMouseup() {
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
//
//
//
//
//
//

var script$10 = {
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
var __vue_script__$10 = script$10;
/* template */
var __vue_render__$13 = function() {
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

var vm$1, tid, clearTimer = function () { clearInterval(tid), tid = null; },
  getVM$1 = function () { return vm$1 || (vm$1 = new Vue({
    data: function data() {
      return {
        customOptions: {},
        options: { percent: 0 }
      }
    },
    render: function render(h) {
      return h(__vue_component__$13, {
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

var script$11 = {
  props: {
    transition: String
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

      return h(__vue_component__$14, {
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
var script$12 = {
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
var __vue_script__$12 = script$12;
/* template */
var __vue_render__$15 = function() {
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

var Message = creator(__vue_component__$15, null, {
  loading: function loading(addNotice, options, getVM) {
    var key = addNotice(options, 'loading');
    return function () { return getVM().removeItem(key); }
  }
});

//
var prefix$2 = 'x-notice';
var script$13 = {
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
var __vue_script__$13 = script$13;
/* template */
var __vue_render__$16 = function() {
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
    __vue_script__$13,
    __vue_scope_id__$16,
    __vue_is_functional_template__$16,
    __vue_module_identifier__$16,
    false,
    undefined,
    undefined,
    undefined
  );

var Notice = creator(__vue_component__$16, { duration: 4.5 }, {
  open: function open(addNotice, options) {
    addNotice(options, 'open');
  }
});

//
var S$7 = String, B$a = Boolean, BTrue = { type: B$a, default: true };
var script$14 = {
  name: 'XModal',
  components: { XOverlay: __vue_component__$A, XBtn: __vue_component__$1, XCloseIconButton: __vue_component__$7 },
  props: {
    value: B$a,
    title: S$7,
    closable: BTrue,
    maskClosable: BTrue,
    loading: B$a,
    scrollable: B$a,
    fullscreen: B$a,
    mask: BTrue,
    okText: { type: S$7, default: '确定' },
    cancelText: { type: S$7, default: '取消' },
    width: { type: [Number, S$7], default: 520 },
    footerHide: B$a,
    styles: Object,
    className: S$7,
    transfer: BTrue,
    hasCancel: BTrue
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
var __vue_script__$14 = script$14;
/* template */
var __vue_render__$17 = function() {
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
    __vue_script__$14,
    __vue_scope_id__$17,
    __vue_is_functional_template__$17,
    __vue_module_identifier__$17,
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

function objectWithoutProperties (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }
var S$8 = String, B$b = Boolean, F$3 = Function;
var script$15 = {
  name: 'XDialog',
  components: { XIcon: __vue_component__, XModal: __vue_component__$17, XBtn: __vue_component__$1 },
  props: {
    value: B$b,
    title: S$8,
    content: S$8,
    width: { default: 416 },
    okText: { type: S$8, default: '确定' },
    cancelText: {},
    loading: B$b,
    scrollable: B$b,
    onOk: F$3,
    onCancel: F$3,
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
      var rest = objectWithoutProperties( ref, ["content", "onOk", "onCancel", "type"] );
      var props = rest;
      return Object.assign({}, props, {closable: false, maskClosable: false, className: this.prefix, hasCancel: this.type === 'confirm'})
    }
  }
};

/* script */
var __vue_script__$15 = script$15;
/* template */
var __vue_render__$18 = function() {
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
    __vue_script__$15,
    __vue_scope_id__$18,
    __vue_is_functional_template__$18,
    __vue_module_identifier__$18,
    false,
    undefined,
    undefined,
    undefined
  );

function objectWithoutProperties$1 (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }

var vm$2, getVM$2 = function () { return vm$2 || (vm$2 = new Vue({
  data: function data() {
    return { options: {} }
  },
  render: function render(h) {
    var this$1 = this;

    var ref = this.options;
    var render = ref.render;
    var rest = objectWithoutProperties$1( ref, ["render"] );
    var props = rest;
    return h(__vue_component__$18, {
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

__vue_component__$17.service = Object.assign({}, [
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
var incKey = 0;
var script$16 = {
  name: 'UiUpload',
  components: { UiIcon: __vue_component__, UiProgress: __vue_component__$q, UiCloseIconButton: __vue_component__$7 },
  data: function data() {
    return {
      prefix: 'ui-upload',
      fileList: [],
      dragOver: false
    }
  },
  props: {
    action: {
      type: String,
      required: true
    },
    headers: {
      type: Object,
      default: function () { return ({}); }
    },
    multiple: Boolean,
    disabled: Boolean,
    data: Object,
    name: {
      type: String,
      default: 'file'
    },
    withCredentials: Boolean,
    showUploadList: {
      type: Boolean,
      default: true
    },
    type: {
      default: 'select',
      validator: function validator(value) {
        return ['select', 'drag'].indexOf(value) !== -1
      }
    },
    accept: String,
    format: {
      type: Array,
      default: function () { return []; }
    },
    maxSize: Number,
    beforeUpload: Function,
    onProgress: Function,
    onSuccess: Function,
    onError: Function,
    onPreview: Function,
    onRemove: Function,
    onFormatError: Function,
    onExceededSize: Function,
    defaultFileList: {
      type: Array,
      default: function () { return []; }
    }
  },
  computed: {
    hasTip: function hasTip() {
      return this.$slots.tip !== undefined
    }
  },
  watch: {
    defaultFileList: {
      immediate: true,
      handler: function handler(newval) {
        this.fileList = newval.map(function (_) { return (Object.assign({}, _, 
          {key: incKey++,
          showProgress: false,
          status: 'success'})); });
      }
    }
  },
  methods: {
    selectFile: function selectFile() {
      this.$refs.File.click();
    },
    onDrop: function onDrop(e) {
      this.dragOver = false;
      if (this.disabled) { return }
      this.onFileChange(e);
    },
    onFileChange: function onFileChange(e) {
      var this$1 = this;

      var files = Array.prototype.slice.call(e.target.files || e.dataTransfer.files);
      files.forEach(function (file) { return this$1.validFormat(file) && this$1.validSize(file) && this$1.upload(file); });
      this.$nextTick(function () { return e.target.value = ''; });
    },
    validFormat: function validFormat(file) {
      if (this.format.length) {
        var fileFormat = file.name.split('.').pop().toLowerCase();
        if (this.format.every(function (_) { return _.toLowerCase() !== fileFormat; })) {
          this.onFormatError && this.onFormatError(file, this.fileList);
          return false
        }
      }
      return true
    },
    validSize: function validSize(file) {
      if (this.maxSize && file.size > this.maxSize * 1024) {
        this.onExceededSize && this.onExceededSize(file, this.fileList);
        return false
      }
      return true
    },
    upload: function upload(file) {
      var this$1 = this;

      var fileItem = {
        file: file,
        percentage: 0,
        key: incKey++,
        name: file.name,
        status: 'normal',
        showProgress: true
      };
      this.fileList.push(fileItem);
      var formData = new FormData();
      formData.append(this.name, file);
      this.data && Object.keys(this.data).forEach(function (_) { return formData.append(_, this$1.data[_]); });
      var xhr = new XMLHttpRequest();
      xhr.onprogress = function (e) {
        if (e.total > 0) {
          fileItem.percentage = e.loaded / e.total * 100;
        }
        this$1.onProgress && this$1.onProgress(e, fileItem, this$1.fileList);
      };
      xhr.onload = function () {
        if (xhr.status < 200 && xhr.status >= 300) {
          fileItem.status = 'wrong';
          fileItem.showProgress = false;
          this$1.fileList.splice(this$1.fileList.indexOf(fileItem), 1);
          return this$1.onError && this$1.onError(new Error(("fail to post " + (this$1.action) + " " + (xhr.status) + "'")), fileItem, this$1.fileList)
        }
        fileItem.percentage = 100;
        fileItem.status = 'success';
        fileItem.showProgress = false;
        fileItem.response = xhr.response;
        this$1.onSuccess && this$1.onSuccess(xhr.response, fileItem, this$1.fileList);
      };
      xhr.onerror = function (err) {
        fileItem.percentage = 100;
        fileItem.status = 'wrong';
        fileItem.showProgress = false;
        this$1.fileList.splice(this$1.fileList.indexOf(fileItem), 1);
        this$1.onError && this$1.onError(err);
      };
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
var __vue_script__$16 = script$16;
/* template */
var __vue_render__$19 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { class: _vm.prefix }, [
    _c("input", {
      directives: [
        { name: "show", rawName: "v-show", value: false, expression: "false" }
      ],
      ref: "File",
      attrs: {
        type: "file",
        disabled: _vm.disabled,
        multiple: _vm.multiple,
        accept: _vm.accept
      },
      on: { change: _vm.onFileChange }
    }),
    _vm._v(" "),
    _c(
      "div",
      {
        class: [_vm.prefix + "-" + _vm.type, { dragOver: _vm.dragOver }],
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
          { class: _vm.prefix + "-list" },
          _vm._l(_vm.fileList, function(item) {
            return _c(
              "li",
              { key: item.key },
              [
                _c(
                  "div",
                  { class: _vm.prefix + "-finish" },
                  [
                    _c("ui-icon", { attrs: { type: "document" } }),
                    _vm._v(" "),
                    _c(
                      "span",
                      {
                        class: _vm.prefix + "-filename",
                        on: { click: _vm.previewItem }
                      },
                      [_vm._v(_vm._s(item.name))]
                    ),
                    _vm._v(" "),
                    _c("b", { class: _vm.prefix + "-spring" }),
                    _vm._v(" "),
                    _c("ui-close-icon-button", {
                      class: _vm.prefix + "-remove",
                      attrs: { size: "18" },
                      on: {
                        click: function($event) {
                          return _vm.removeItem(item)
                        }
                      }
                    })
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "transition",
                  { attrs: { name: _vm.prefix + "-progressbar" } },
                  [
                    item.showProgress
                      ? _c("ui-progress", {
                          class: _vm.prefix + "-progressbar",
                          attrs: {
                            strokeWidth: 2,
                            percent: item.percentage,
                            status: item.status
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
    _vm.hasTip
      ? _c("div", { class: _vm.prefix + "-tip" }, [_vm._t("tip")], 2)
      : _vm._e()
  ])
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
    __vue_script__$16,
    __vue_scope_id__$19,
    __vue_is_functional_template__$19,
    __vue_module_identifier__$19,
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

var script$17 = {
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
var __vue_script__$17 = script$17;
/* template */
var __vue_render__$1a = function() {
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
    __vue_script__$17,
    __vue_scope_id__$1a,
    __vue_is_functional_template__$1a,
    __vue_module_identifier__$1a,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$18 = {
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
var __vue_script__$18 = script$18;

/* template */
var __vue_render__$1b = function() {
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
        _c("transition", { attrs: { name: "ui-fade" } }, [
          _vm.showMsg
            ? _c("div", { class: _vm.prefix + "-error-tip" })
            : _vm._e()
        ])
      ],
      2
    )
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
    __vue_script__$18,
    __vue_scope_id__$1b,
    __vue_is_functional_template__$1b,
    __vue_module_identifier__$1b,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$19 = {
  name: 'ui-dropdown',
  components: { UiOptionList: __vue_component__$W },
  data: function data() {
    return { isVisible: false, timeout: null }
  },
  props: {
    trigger: {
      default: 'hover',
      validator: function validator(value) {
        return ['hover', 'click', 'custom'].indexOf(value) !== -1
      }
    },
    visible: Boolean,
    placement: {
      default: 'bottom',
      validator: function validator(value) {
        return [
          'top', 'top-start', 'top-end', 
          'right', 'right-start', 'right-end', 
          'bottom', 'bottom-start', 'bottom-end', 
          'left', 'left-start', 'left-end'
        ].indexOf(value) !== -1
      }
    }
  },
  directives: { winclick: winclick },
  watch: {
    visible: function visible(newVal) {
      if (this.trigger === 'custom') { this.isVisible = newVal; }
    },
    isVisible: function isVisible(newVal) {
      this.$emit('on-visible-change', newVal);
    }
  },
  methods: {
    handleMouseenter: function handleMouseenter() {
      if (this.trigger === 'hover') { this.isVisible = true; }
    },
    handleMouseleave: function handleMouseleave(event) {
      if (this.trigger === 'hover') { this.timeout = setTimeout(this.close, 150); }
    },
    handleClick: function handleClick() {
      if (this.trigger === 'click') { this.isVisible = true; }
    },
    close: function close() {
      this.isVisible = false;
    },
    itemClick: function itemClick(name) {
      this.close();
      this.$emit('on-click', name);
    },
    handleDropMouseenter: function handleDropMouseenter(event) {
      clearTimeout(this.timeout);
    },
    handleDropMouseleave: function handleDropMouseleave(event) {
      if (this.trigger === 'hover') { this.isVisible = false; }
    },
    /**
     * 窗口单击事件处理
     * @param {MouseEvent} event
     * 模拟方式不是单击 或者下拉菜单不可见 --> 退出
     * 如果不是挂载元素 也不是该下拉菜单 --> 退出
     */
    handleWinClick: function handleWinClick(event) {
      if (this.trigger !== 'click' || !this.isVisible) { return }
      if (isSelfOrParent(this.$el, event.target) || 
        isSelfOrParent(this.$refs.Drop, event.target)) { return }
      this.isVisible = false;
      this.$emit('on-clickoutside', event);
    }
  }
};

/* script */
var __vue_script__$19 = script$19;
/* template */
var __vue_render__$1c = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      directives: [
        {
          name: "winclick",
          rawName: "v-winclick",
          value: _vm.handleWinClick,
          expression: "handleWinClick"
        }
      ],
      staticClass: "ui-dropdown"
    },
    [
      _c(
        "div",
        {
          staticClass: "ui-dropdown-rel",
          on: {
            mouseenter: _vm.handleMouseenter,
            mouseleave: _vm.handleMouseleave,
            click: _vm.handleClick
          }
        },
        [_vm._t("default")],
        2
      ),
      _vm._v(" "),
      _c(
        "ui-option-list",
        {
          ref: "Drop",
          attrs: { parentName: _vm.$options.name, visible: _vm.isVisible },
          nativeOn: {
            mouseenter: function($event) {
              return _vm.handleDropMouseenter($event)
            },
            mouseleave: function($event) {
              return _vm.handleDropMouseleave($event)
            }
          }
        },
        [_vm._t("list")],
        2
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
    __vue_script__$19,
    __vue_scope_id__$1c,
    __vue_is_functional_template__$1c,
    __vue_module_identifier__$1c,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$1a = {
  data: function data() {
    return { parent: null }
  },
  props: {
    name: String,
    disabled: Boolean,
    divided: Boolean,
    selected: Boolean
  },
  methods: {
    handleClick: function handleClick(event) {
      if (this.disabled) { return }
      this.parent && this.parent.itemClick(this.name);
    }
  },
  mounted: function mounted() {
    this.parent = findParent(this, 'ui-dropdown');
  }
};

/* script */
var __vue_script__$1a = script$1a;
/* template */
var __vue_render__$1d = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "li",
    { staticClass: "ui-dropdown-item", class: { divided: _vm.divided } },
    [
      _c(
        "div",
        {
          staticClass: "ui-dropdown-item-btn",
          class: { selected: _vm.selected, disabled: _vm.disabled },
          on: { click: _vm.handleClick }
        },
        [_vm._t("default")],
        2
      )
    ]
  )
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
    __vue_script__$1a,
    __vue_scope_id__$1d,
    __vue_is_functional_template__$1d,
    __vue_module_identifier__$1d,
    false,
    undefined,
    undefined,
    undefined
  );

/* script */

/* template */
var __vue_render__$1e = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("ul", { staticClass: "ui-dropdown-menu" }, [_vm._t("default")], 2)
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
    {},
    __vue_scope_id__$1e,
    __vue_is_functional_template__$1e,
    __vue_module_identifier__$1e,
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

var script$1b = {
  name: 'ui-menu',
  data: function data() {
    return {
      openedNames: this.openNames,
      currentActiveName: this.activeName
    }
  },
  props: {
    mode: {
      default: 'vertical',
      validator: function validator(value) {
        return ['horizontal', 'vertical'].indexOf(value) !== -1
      }
    },
    theme: {
      default: 'light',
      validator: function validator(value) {
        return ['light', 'dark', 'primary'].indexOf(value) !== -1
      }
    },
    activeName: [String, Number],
    openNames: {
      type: Array,
      default: function () { return []; }
    },
    accordion: Boolean,
    width: {
      type: String,
      default: '240px'
    }
  },
  computed: {
    styles: function styles() {
      return this.mode === 'vertical' ? { width: this.width } : {}
    }
  },
  methods: {
    /**
     * 更新打开的菜单
     */
    updateOpened: function updateOpened(names) {
      if ( names === void 0 ) names = [];

      this.openedNames = names;
      this.$emit('update:openNames', names);
    },
    /**
     * 切换子菜单打开状态
     */
    toggleSubmenu: function toggleSubmenu(name) {
      var index = this.openedNames.indexOf(name);
      if (this.accordion) {
        this.openedNames = index === -1 ? [name] : [];
      } else {
        if (index === -1) {
          this.openedNames.push(name);
        } else {
          this.openedNames.splice(index, 1);
        }
      }
      this.$emit('update:openNames', this.openedNames);
    },
    /**
     * 更新活动菜单
     */
    updateActiveName: function updateActiveName(name) {
      this.currentActiveName = name;
      this.$emit('update:activeName', name);
    },
    /**
     * 获取活动菜单
     */
    getActiveName: function getActiveName() {
      return this.currentActiveName
    },
    /**
     * 获取模式
     */
    getMode: function getMode() {
      return this.mode
    },
    /**
     * 获取打开的菜单
     */
    getOpenedNames: function getOpenedNames() {
      return this.openedNames
    },
    /**
     * 子菜单可见状态改变
     */
    onOpenChange: function onOpenChange(name, isOpen) {
      this.$emit('on-open-change', name, isOpen);
    },
    /**
     * 菜单选择改变
     */
    onSelect: function onSelect(name) {
      this.$emit('on-select', name);
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
    "ul",
    { staticClass: "x-menu", class: [_vm.mode, _vm.theme], style: _vm.styles },
    [_vm._t("default")],
    2
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
  name: 'ui-menu-submenu',
  components: { UiIcon: __vue_component__, UiOptionList: __vue_component__$W },
  data: function data() {
    return {
      visible: false,
      timeout: null,
      parent: null
    }
  },
  props: {
    name: [String, Number]
  },
  computed: {
    active: function active() {
      return this.visible || this.parent && this.parent.getActiveName() === this.name
    },
    isVertical: function isVertical() {
      return this.parent && this.parent.getMode() === 'vertical'
    },
    isOpened: function isOpened() {
      return this.parent && this.parent.getOpenedNames().indexOf(this.name) !== -1
    }
  },
  watch: {
    visible: function visible(newVal) {
      this.parent && this.parent.onOpenChange(this.name, newVal);
    }
  },
  methods: {
    close: function close() {
      this.visible = false;
    },
    handleMouseenter: function handleMouseenter() {
      if (this.isVertical) { return }
      clearTimeout(this.timeout);
      this.visible = true;
    },
    handleMouseleave: function handleMouseleave() {
      if (this.isVertical) { return }
      this.timeout = setTimeout(this.close, 150);
    },
    handleDropMouseenter: function handleDropMouseenter() {
      clearTimeout(this.timeout);
    },
    handleDropMouseleave: function handleDropMouseleave() {
      this.timeout = setTimeout(this.close, 150);
    },
    getName: function getName() {
      return this.name
    },
    handleTitleClick: function handleTitleClick() {
      this.parent && this.parent.toggleSubmenu(this.name);
    }
  },
  mounted: function mounted() {
    this.parent = findParent(this, 'ui-menu');
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
    "li",
    {
      staticClass: "ui-menu-submenu",
      class: { vertical: _vm.isVertical, active: _vm.active },
      on: { mouseenter: _vm.handleMouseenter, mouseleave: _vm.handleMouseleave }
    },
    [
      _c(
        "div",
        {
          staticClass: "ui-menu-submenu-title",
          on: { click: _vm.handleTitleClick }
        },
        [
          _vm._t("title"),
          _vm._v(" "),
          _c("UiIcon", {
            staticClass: "title-icon",
            attrs: { type: "ios-arrow-down" }
          })
        ],
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
              value: _vm.isVertical && _vm.isOpened,
              expression: "isVertical && isOpened"
            }
          ],
          staticClass: "vertical"
        },
        [_c("ul", [_vm._t("default")], 2)]
      ),
      _vm._v(" "),
      !_vm.isVertical
        ? _c(
            "ui-option-list",
            {
              staticClass: "ui-menu-submenu-list",
              attrs: { visible: _vm.visible, parentName: _vm.$options.name },
              nativeOn: {
                mouseenter: function($event) {
                  return _vm.handleDropMouseenter($event)
                },
                mouseleave: function($event) {
                  return _vm.handleDropMouseleave($event)
                }
              }
            },
            [_c("ul", [_vm._t("default")], 2)]
          )
        : _vm._e()
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

//
var script$1d = {
  data: function data() {
    return {
      parent: null,
      menuRoot: null
    }
  },
  props: {
    name: [String, Number]
  },
  computed: {
    isVertical: function isVertical() {
      return this.menuRoot && this.menuRoot.getMode() === 'vertical'
    },
    active: function active() {
      if (this.parent) {
        return this.isVertical && this.menuRoot.getActiveName() === this.name
      } else {
        return this.menuRoot && this.menuRoot.getActiveName() === this.name
      }
    }
  },
  methods: {
    handleClick: function handleClick() {
      this.menuRoot && this.menuRoot.updateActiveName(
        !this.parent || this.isVertical ? this.name : this.parent.getName()
      );
      !this.isVertical && this.parent && this.parent.close();
      this.menuRoot && this.menuRoot.onSelect(this.name);
    }
  },
  mounted: function mounted() {
    this.menuRoot = findParent(this, 'ui-menu');
    this.parent = findParent(this, 'ui-menu-submenu');
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
    "li",
    {
      staticClass: "ui-menu-item",
      class: { active: _vm.active },
      on: { click: _vm.handleClick }
    },
    [_vm._t("default")],
    2
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

var script$1e = {
  props: {
    title: String
  }
};

/* script */
var __vue_script__$1e = script$1e;

/* template */
var __vue_render__$1i = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("li", { staticClass: "ui-menu-item-group" }, [
    _c("div", { staticClass: "ui-menu-item-group-title" }, [
      _vm._v(_vm._s(_vm.title))
    ]),
    _vm._v(" "),
    _c("ul", [_vm._t("default")], 2)
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

//
//
//
//
//
//
//
//

var script$1f = {
  props: { label: String }
};

/* script */
var __vue_script__$1f = script$1f;
/* template */
var __vue_render__$1j = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("li", { staticClass: "ui-option-group" }, [
    _c("span", { staticClass: "ui-option-group-title" }, [
      _vm._v(_vm._s(_vm.label))
    ]),
    _vm._v(" "),
    _c("ul", [_vm._t("default")], 2)
  ])
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

//
var script$1g = {
  components: { UiIcon: __vue_component__, UiPopper: __vue_component__$10, UiButton: __vue_component__$1 },
  data: function data() {
    return { popperVisible: this.value, refElement: null }
  },
  props: {
    trigger: {
      default: 'click',
      validator: function validator(value) {
        return ['hover', 'click', 'focus'].indexOf(value) !== -1
      }
    },
    title: [String, Number],
    content: [String, Number],
    placement: {
      type: String,
      default: 'top'
    },
    width: [String, Number],
    confirm: Boolean,
    okText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    popperClass: String,
    value: Boolean
  },
  computed: {
    hasContent: function hasContent() {
      return this.content || this.$slots.content !== undefined
    },
    popperStyles: function popperStyles() {
      return this.width ? { width: ((parseInt(this.width)) + "px") } : {}
    }
  },
  directives: { winclick: winclick },
  watch: {
    popperVisible: function popperVisible(newVal) {
      this.$emit('input', newVal);
      this.$emit(("on-popper-" + (newVal ? 'show' : 'hide')));
    },
    value: function value(newVal) {
      this.popperVisible = newVal;
    }
  },
  methods: {
    handleMouseenter: function handleMouseenter() {
      if (this.confirm) { return }
      if (this.trigger === 'hover') { this.popperVisible = true; }
    },
    handleMouseleave: function handleMouseleave() {
      if (this.confirm) { return }
      if (this.trigger === 'hover') { this.popperVisible = false; }
    },
    handleMousedown: function handleMousedown() {
      if (this.confirm) { return }
      if (this.trigger === 'focus') { this.popperVisible = true; }
    },
    handleMouseup: function handleMouseup() {
      if (this.confirm) { return }
      if (this.trigger === 'focus') { this.popperVisible = false; }
    },
    handleClick: function handleClick() {
      if (this.trigger === 'click') {
        this.popperVisible = !this.popperVisible;
      }
    },
    /**
     * 窗口单击处理
     * @param {MouseEvent} event
     */
    handleWinClick: function handleWinClick(event) {
      if (this.trigger !== 'click') { return }
      var target = event.target;
      if (
        isSelfOrParent(this.$el, target) || 
        isSelfOrParent(this.$refs.Popper.$el, target)
      ) { return }
      this.popperVisible = false;
    },
    onCancel: function onCancel() {
      this.popperVisible = false;
      this.$emit('on-cancel');
    },
    onOK: function onOK() {
      this.popperVisible = false;
      this.$emit('on-ok');
    }
  },
  mounted: function mounted() {
    this.refElement = this.$refs.Ref.children[0];
  }
};

/* script */
var __vue_script__$1g = script$1g;
/* template */
var __vue_render__$1k = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      directives: [
        {
          name: "winclick",
          rawName: "v-winclick",
          value: _vm.handleWinClick,
          expression: "handleWinClick"
        }
      ],
      staticClass: "ui-poptip"
    },
    [
      _c(
        "div",
        {
          ref: "Ref",
          staticClass: "ui-poptip-rel",
          on: {
            mouseenter: _vm.handleMouseenter,
            mouseleave: _vm.handleMouseleave,
            mousedown: _vm.handleMousedown,
            mouseup: _vm.handleMouseup,
            click: _vm.handleClick
          }
        },
        [_vm._t("default")],
        2
      ),
      _vm._v(" "),
      _c(
        "ui-popper",
        {
          ref: "Popper",
          class: [{ confirm: _vm.confirm }, _vm.popperClass],
          style: _vm.popperStyles,
          attrs: {
            arrowClass: "ui-poptip-arrow",
            hasArrow: "",
            refElement: _vm.refElement,
            placement: _vm.placement,
            visible: _vm.popperVisible
          }
        },
        [
          _c("div", { staticClass: "ui-poptip-body" }, [
            _c(
              "div",
              { staticClass: "ui-poptip-title" },
              [
                _vm.confirm
                  ? _c("UiIcon", {
                      staticClass: "ui-poptip-confirm-icon",
                      attrs: { type: "help-circled" }
                    })
                  : _vm._e(),
                _vm._v(" "),
                _vm._t("title", [_vm._v(_vm._s(_vm.title))])
              ],
              2
            ),
            _vm._v(" "),
            _vm.hasContent
              ? _c(
                  "div",
                  { staticClass: "ui-poptip-content" },
                  [_vm._t("content", [_vm._v(_vm._s(_vm.content))])],
                  2
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.confirm
              ? _c(
                  "div",
                  { staticClass: "ui-poptip-actions" },
                  [
                    _c(
                      "ui-button",
                      {
                        attrs: { type: "text", size: "small" },
                        on: { click: _vm.onCancel }
                      },
                      [_vm._v(_vm._s(_vm.cancelText))]
                    ),
                    _vm._v(" "),
                    _c(
                      "ui-button",
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
          ])
        ]
      )
    ],
    1
  )
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

//
var script$1h = {
  name: 'ui-autocomplete',
  components: { UiInput: __vue_component__$H, UiDrop: __vue_component__$W },
  data: function data() {
    return {
      visible: false,
      inputValue: this.value,
      children: []
    }
  },
  props: {
    value: [String, Number],
    data: {
      type: Array,
      default: function () { return []; }
    },
    clearable: Boolean,
    disabled: Boolean,
    placeholder: String,
    size: {
      validator: function validator(value) {
        return ['large', 'small', 'default'].indexOf(value) !== -1
      }
    },
    icon: String,
    filterMethod: {
      type: [Function, Boolean],
      default: false
    },
    placement: {
      default: 'bottom',
      validator: function validator(value) {
        return ['bottom', 'top'].indexOf(value) !== -1
      }
    },
    elementId: String
  },
  computed: {
    filteredData: function filteredData() {
      var this$1 = this;

      return this.inputValue ? this.data.filter(function (_) { return typeof this$1.filterMethod === 'function' ?
          this$1.filterMethod(this$1.inputValue, _) :
          _.toString().indexOf(this$1.inputValue) !== -1; }
      ) : this.data
    },
    dropShow: function dropShow() {
      return !!this.filteredData.length && this.visible
    },
    hasSlot: function hasSlot() {
      return this.$slots.default !== undefined
    }
  },
  directives: { winclick: winclick },
  watch: {
    value: function value(newVal) {
      this.inputValue = newVal;
    },
    inputValue: function inputValue(newVal) {
      this.$emit('input', newVal);
      this.$emit('on-search', newVal);
      this.$emit('on-change', newVal);
    }
  },
  methods: {
    handleClick: function handleClick(event) {
      this.visible = !this.visible;
    },
    handleOptionClick: function handleOptionClick(item) {
      var this$1 = this;

      this.inputValue = item;
      this.$emit('on-select', item);
      this.$nextTick(function () { return this$1.visible = false; });
    },
    handleWinClick: function handleWinClick(event) {
      var target = event.target;
      if (
        target && 
        (isSelfOrParent(this.$el, target) || 
        isSelfOrParent(this.$refs.UiDrop.$el, target))
      ) { return }
      this.visible = false;
    },
    handleFocus: function handleFocus(event) {
      this.$emit('on-focus', event);
    },
    handleBlur: function handleBlur(event) {
      this.$emit('on-blur', event);
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
  return _c(
    "div",
    {
      directives: [
        {
          name: "winclick",
          rawName: "v-winclick",
          value: _vm.handleWinClick,
          expression: "handleWinClick"
        }
      ],
      staticClass: "ui-autocomplete"
    },
    [
      _c("UiInput", {
        attrs: {
          placeholder: _vm.placeholder,
          clearable: _vm.clearable,
          size: _vm.size,
          disabled: _vm.disabled,
          elementId: _vm.elementId,
          icon: _vm.icon
        },
        on: { "on-focus": _vm.handleFocus, "on-blur": _vm.handleBlur },
        nativeOn: {
          click: function($event) {
            return _vm.handleClick($event)
          }
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
      _c(
        "ui-drop",
        {
          ref: "UiDrop",
          attrs: { visible: _vm.dropShow, parentName: _vm.$options.name }
        },
        [
          _c(
            "ul",
            { staticClass: "ui-autocomplete-select" },
            [
              _vm._t("default"),
              _vm._v(" "),
              !_vm.hasSlot
                ? _vm._l(_vm.filteredData, function(item, index) {
                    return _c(
                      "li",
                      {
                        key: index,
                        staticClass: "ui-autocomplete-select-item",
                        class: { active: item === _vm.inputValue },
                        on: {
                          click: function($event) {
                            return _vm.handleOptionClick(item)
                          }
                        }
                      },
                      [_vm._v("\n          " + _vm._s(item) + "\n        ")]
                    )
                  })
                : _vm._e()
            ],
            2
          )
        ]
      )
    ],
    1
  )
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

var script$1i = {
  props: {
    columns: Array
  }
};

/* script */
var __vue_script__$1i = script$1i;

/* template */
var __vue_render__$1m = function() {
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
//
//
//

var script$1j = {
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
var __vue_script__$1j = script$1j;

/* template */
var __vue_render__$1n = function() {
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

//
var script$1k = {
  components: { UiTableHeader: __vue_component__$1m, UiTableBody: __vue_component__$1n },
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
var __vue_script__$1k = script$1k;
/* template */
var __vue_render__$1o = function() {
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
  Panel: __vue_component__$s,
  Step: __vue_component__$t,
  Steps: __vue_component__$u,
  Radio: __vue_component__$v,
  RadioGroup: __vue_component__$w,
  Spin: __vue_component__$x,
  Scroll: __vue_component__$z,
  Drawer: __vue_component__$B,
  Row: __vue_component__$C,
  Col: __vue_component__$D,
  List: __vue_component__$E,
  ListItem: __vue_component__$F,
  ListItemMeta: __vue_component__$G,
  Input: __vue_component__$H,
  InputNumber: __vue_component__$I,
  Transfer: __vue_component__$K,
  Anchor: __vue_component__$L,
  AnchorLink: __vue_component__$M,
  Modal: __vue_component__$17,
  Carousel: __vue_component__$N,
  CarouselItem: __vue_component__$O,
  Tree: __vue_component__$Q,
  Layout: __vue_component__$R,
  Header: __vue_component__$S,
  Content: __vue_component__$T,
  Footer: __vue_component__$U,
  Sider: __vue_component__$V,
  Page: __vue_component__$Z,
  Tabs: __vue_component__$_,
  TabPane: __vue_component__$$,
  Slider: __vue_component__$12,

  Upload: __vue_component__$19,
  Form: __vue_component__$1a,
  FormItem: __vue_component__$1b,
  // Cascader,
  // ColorPicker,
  Select: __vue_component__$X,
  Option: __vue_component__$Y,
  OptionGroup: __vue_component__$1j,
  Dropdown: __vue_component__$1c,
  DropdownMenu: __vue_component__$1e,
  DropdownItem: __vue_component__$1d,
  Menu: __vue_component__$1f,
  MenuItem: __vue_component__$1h,
  Submenu: __vue_component__$1g,
  MenuGroup: __vue_component__$1i,
  Tooltip: __vue_component__$11,
  Poptip: __vue_component__$1k,
  Table: __vue_component__$1o,
  AutoComplete: __vue_component__$1l
  // ,DatePicker,
  // TimePicker
};

/**
 * 安装插件
 * @param {import('vue').VueConstructor} Vue 
 * @param {Object} options 
 */
function index (Vue, options) {
  if ( options === void 0 ) options = {};

  Vue.prototype.$XVIEW_UI = tools;
  Vue.prototype.$Notice = Notice;
  Vue.prototype.$Message = Message;
  Vue.prototype.$Spin = __vue_component__$x.service;
  Vue.prototype.$Modal = __vue_component__$17.service;
  Vue.LoadingBar = Vue.prototype.$Loading = loadingBarService;
  var prefix = typeof options.prefix === 'string' ? options.prefix : 'Ui';
  for (var name in comps) { Vue.component(prefix + name, comps[name]); }
}

module.exports = index;
