// 数组find方法
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function (predicate) {
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }
      var o = Object(this);
      var len = o.length >>> 0;
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function')
      }
      var thisArg = arguments[1];
      var k = 0;
      while (k < len) {
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue
        }
        k++;
      }
      return undefined
    }
  });
}

// 数组findIndex方法
if (!Array.prototype.findIndex) {
  Object.defineProperty(Array.prototype, 'findIndex', {
    value: function(predicate) {
      if (this == null) {
        throw new TypeError('"this" is null or not defined')
      }
      var o = Object(this);
      var len = o.length >>> 0;
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }
      var thisArg = arguments[1];
      var k = 0;
      while (k < len) {
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return k
        }
        k++;
      }
      return -1
    }
  });
}

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

var isArr = function (arr) { return arr instanceof Array; };

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
    var winHeight = window.innerHeight;
    var ref = document.body;
    var scrollHeight = ref.scrollHeight;
    if (winHeight > scrollHeight) { return }
    document.body.style.paddingRight = (this.getScrollbarWidth()) + "px";
    document.body.style.overflow = 'hidden';
  },
  unlock: function unlock() {
    document.body.style.paddingRight = document.body.style.overflow = '';
  }
};

var throttle = function (fn, gapTime) {
  if ( gapTime === void 0 ) gapTime = 16;

  var lastTime = null;
  return function () {
    var nowTime = Date.now();
    if (!lastTime ||  nowTime - lastTime > gapTime) {
      fn();
      lastTime = nowTime;
    }
  }
};

var debounce = function (fn, gapTime) {
  if ( gapTime === void 0 ) gapTime = 16;

  var timerId = null;
  return function () {
    if (timerId) {
      clearTimeout(timerId);
      return timerId = null
    }
    timerId = setTimeout(fn, gapTime);
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

var UiRender = {
  functional: true,
  render: function (h, ctx) { return ctx.props.render(h); }
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
  if (typeof minRows === 'number' && (!compare && lbCount <= minRows)) { return }
  if (typeof maxRows === 'number' && lbCount >= maxRows) { return }
  textarea.style.height = 'auto';
  textarea.style.height = (textarea.scrollHeight + borderWidth) + "px";
};

var tools = /*#__PURE__*/Object.freeze({
  iconTypes: iconTypes,
  isFunc: isFunc,
  isStr: isStr,
  isArr: isArr,
  getType: getType,
  getMaxZIndex: getMaxZIndex,
  findChildrens: findChildrens,
  findParent: findParent,
  winScrollbarLock: winScrollbarLock,
  throttle: throttle,
  debounce: debounce,
  addStylesheet: addStylesheet,
  parseSize: parseSize,
  UiRender: UiRender,
  setAutoHeight: setAutoHeight
});

//
//
//

var script = {
  name: 'UiIcon',
  props: {
    type: String,
    size: [Number, String],
    color: String
  },
  computed: {
    styles: function styles() {
      var fontSize = this.size && ((parseInt(this.size)) + "px");
      return { fontSize: fontSize, color: this.color }
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
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
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

/* script */
var __vue_script__ = script;
/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('i',_vm._g({class:[("ion-" + _vm.type), 'ui-icon'],style:(_vm.styles)},_vm.$listeners))};
var __vue_staticRenderFns__ = [];

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
  

  
  var Icon = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

//
var script$1 = {
  name: 'UiAvatar',
  components: { UiIcon: Icon },
  data: function data() {
    return { prefix: 'ui-avatar' }
  },
  props: {
    shape: {
      default: 'circle',
      validator: function validator(value) {
        return ['circle', 'square'].indexOf(value) !== -1
      }
    },
    size: {
      default: 'default',
      validator: function validator(value) {
        return ['large', 'small', 'default'].indexOf(value) !== -1
      }
    },
    src: String,
    icon: String
  },
  computed: {
    classes: function classes() {
      var ref = this;
      var prefix = ref.prefix;
      var shape = ref.shape;
      var size = ref.size;
      var icon = ref.icon;
      var src = ref.src;
      return [prefix, (prefix + "--" + shape), (prefix + "--" + size), { isIcon: icon }]
    }
  }
};

/* script */
var __vue_script__$1 = script$1;
/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',_vm._g({class:_vm.classes},_vm.$listeners),[_vm._t("default",[(_vm.src)?_c('img',{attrs:{"src":_vm.src}}):(_vm.icon)?_c('UiIcon',{attrs:{"type":_vm.icon}}):_vm._e()])],2)};
var __vue_staticRenderFns__$1 = [];

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
  

  
  var Avatar = normalizeComponent_1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    undefined,
    undefined
  );

//
var script$2 = {
  name: 'UiCard',
  components: { UiIcon: Icon },
  data: function data() {
    return { prefix: 'ui-card', hasHeader: false }
  },
  props: {
    bordered: {
      type: Boolean,
      default: true
    },
    disHover: Boolean,
    shadow: Boolean,
    padding: {
      type: [Number, String],
      default: 16
    },
    title: String,
    icon: String
  },
  computed: {
    classes: function classes() {
      var ref = this;
      var prefix = ref.prefix;
      var bordered = ref.bordered;
      var disHover = ref.disHover;
      var shadow = ref.shadow;
      return [prefix, { bordered: bordered, disHover: disHover, shadow: shadow }]
    }
  },
  mounted: function mounted() {
    var ref = this.$slots;
    var title = ref.title;
    var extra = ref.extra;
    this.hasHeader = title !== undefined || extra !== undefined || this.icon || this.title;
  }
};

/* script */
var __vue_script__$2 = script$2;
/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.classes},[(_vm.hasHeader)?_c('div',{class:(_vm.prefix + "--header")},[_c('div',{class:(_vm.prefix + "--title")},[_vm._t("title",[(_vm.icon)?_c('UiIcon',{attrs:{"type":_vm.icon}}):_vm._e(),_vm._v("\n        "+_vm._s(_vm.title)+"\n      ")])],2),_vm._v(" "),_vm._t("extra")],2):_vm._e(),_vm._v(" "),_c('div',{class:(_vm.prefix + "--body"),style:({padding: (_vm.padding + "px")})},[_vm._t("default")],2)])};
var __vue_staticRenderFns__$2 = [];

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
  

  
  var Card = normalizeComponent_1(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    undefined,
    undefined
  );

//
var script$3 = {
  name: 'UiCloseIconButton',
  components: { UiIcon: Icon }
};

/* script */
var __vue_script__$3 = script$3;
/* template */
var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('UiIcon',_vm._g({staticClass:"ui-close-icon-button",attrs:{"type":"ios-close-empty"}},_vm.$listeners))};
var __vue_staticRenderFns__$3 = [];

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
  

  
  var CloseIconButton = normalizeComponent_1(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    undefined,
    undefined
  );

//
var script$4 = {
  name: 'UiAlert',
  components: { UiIcon: Icon, UiCloseIconButton: CloseIconButton },
  data: function data() {
    return { prefix: 'ui-alert', hasDesc: false, visible: true }
  },
  props: {
    type: {
      default: 'info',
      validator: function validator(value) {
        return ['info', 'success', 'warning', 'error'].indexOf(value) !== -1
      }
    },
    closable: Boolean,
    showIcon: Boolean
  },
  computed: {
    iconType: function iconType() {
      return iconTypes[this.type]
    },
    classes: function classes() {
      var ref = this;
      var prefix = ref.prefix;
      var type = ref.type;
      var hasDesc = ref.hasDesc;
      return [prefix, (prefix + "--" + type), { hasDesc: hasDesc }]
    }
  },
  methods: {
    close: function close(event) {
      this.visible = false;
      this.$emit('on-close', event);
    }
  },
  mounted: function mounted() {
    this.hasDesc = this.$slots.desc !== undefined;
  }
};

/* script */
var __vue_script__$4 = script$4;
/* template */
var __vue_render__$4 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":_vm.prefix}},[(_vm.visible)?_c('div',{class:_vm.classes},[(_vm.showIcon)?_c('UiIcon',{class:(_vm.prefix + "--icon"),attrs:{"type":_vm.iconType}}):_vm._e(),_vm._v(" "),_c('div',{class:(_vm.prefix + "--body")},[_c('p',{class:(_vm.prefix + "--title")},[_vm._t("default")],2),_vm._v(" "),_c('p',{class:(_vm.prefix + "--desc")},[_vm._t("desc")],2)]),_vm._v(" "),(_vm.closable)?_c('UiCloseIconButton',{class:(_vm.prefix + "--close"),on:{"click":_vm.close}}):_vm._e()],1):_vm._e()])};
var __vue_staticRenderFns__$4 = [];

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
  

  
  var Alert = normalizeComponent_1(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
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

var script$5 = {
  name: 'UiBadge',
  data: function data() {
    return { prefix: 'ui-badge', hasSlot: false }
  },
  props: {
    count: [Number, String],
    overflowCount: {
      type: [Number, String],
      default: 99
    },
    dot: Boolean,
    className: String,
    type: {
      default: 'error',
      validator: function validator(value) {
        return ['success', 'primary', 'normal', 'error', 'warning', 'info'].indexOf(value) !== -1
      }
    },
    showZero: Boolean,
    text: String,
    offset: Array
  },
  computed: {
    showCount: function showCount() {
      return this.text || (+this.count > +this.overflowCount ? ((this.overflowCount) + "+") : this.count)
    },
    isDot: function isDot() {
      return this.dot && this.count !== 0
    },
    isShow: function isShow() {
      return this.text || (!this.dot && (this.count || this.showZero))
    },
    contentClasses: function contentClasses() {
      return [((this.prefix) + "--count"), this.type, this.className]
    },
    contentStyles: function contentStyles() {
      var ref = (this.offset || []);
      var x = ref[0];
      var y = ref[1];
      var style = {};
      if (x) { style.right = (-x) + "px"; }
      if (y) { style.top = y + "px"; }
      return style
    }
  },
  mounted: function mounted() {
    this.hasSlot = this.$slots.default !== undefined;
  }
};

/* script */
var __vue_script__$5 = script$5;
/* template */
var __vue_render__$5 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{class:[_vm.prefix, {hasSlot: _vm.hasSlot}]},[_vm._t("default"),_vm._v(" "),(_vm.isDot)?_c('sup',{class:[(_vm.prefix + "--dot"), _vm.type],style:(_vm.contentStyles)}):(_vm.isShow)?_c('sup',{class:_vm.contentClasses,style:(_vm.contentStyles)},[_vm._v(_vm._s(_vm.showCount))]):_vm._e()],2)};
var __vue_staticRenderFns__$5 = [];

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
  

  
  var Badge = normalizeComponent_1(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    undefined,
    undefined
  );

//
var script$6 = {
  name: 'UiRate',
  components: { UiIcon: Icon },
  data: function data() {
    return {
      prefix: 'ui-rate',
      inputValue: this.value,
      tempValue: this.value
    }
  },
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
    }
  },
  watch: {
    value: function value(newval) {
      this.inputValue = this.tempValue = newval;
    },
    inputValue: function inputValue(newval) {
      this.$emit('input', newval);
      this.$emit('on-change', newval);
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
      var value = isFull ? i : i - .5;
      if (this.clearable && value === this.inputValue) { return this.inputValue = 0 }
      this.inputValue = value;
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
      return [(prefix + "--icon"), { active: this.isActive(i), hover: i <= tempValue, disabled: disabled }]
    },
    halfClasses: function halfClasses(i) {
      var ref = this;
      var prefix = ref.prefix;
      var tempValue = ref.tempValue;
      var disabled = ref.disabled;
      return [(prefix + "--icon"), { active: this.isActive(i, false), hover: i <= tempValue + .5, disabled: disabled }]
    }
  }
};

/* script */
var __vue_script__$6 = script$6;
/* template */
var __vue_render__$6 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.prefix},[_c('ul',{class:(_vm.prefix + "--list")},_vm._l((_vm.count),function(i){return _c('li',{key:i,class:(_vm.prefix + "--item")},[_c('UiIcon',{class:_vm.fullClasses(i),attrs:{"type":_vm.icon},on:{"mouseenter":function($event){return _vm.onMouseenter(i)},"mouseleave":_vm.onMouseleave,"click":function($event){return _vm.onClick(i)}}}),_vm._v(" "),(_vm.allowHalf)?_c('div',{class:(_vm.prefix + "--half")},[_c('UiIcon',{class:_vm.halfClasses(i),attrs:{"type":_vm.icon},on:{"mouseenter":function($event){return _vm.onMouseenter(i, false)},"mouseleave":_vm.onMouseleave,"click":function($event){return _vm.onClick(i, false)}}})],1):_vm._e()],1)}),0),_vm._v(" "),(_vm.showText)?_c('span',{class:(_vm.prefix + "--text")},[_vm._t("default",[_vm._v(_vm._s(_vm.inputValue)+" 星")])],2):_vm._e()])};
var __vue_staticRenderFns__$6 = [];

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
  

  
  var Rate = normalizeComponent_1(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    undefined,
    undefined
  );

//
var prefix = 'ui-notice';
var script$7 = {
  name: 'UiNotice',
  components: { UiIcon: Icon, UiCloseIconButton: CloseIconButton },
  transition: prefix,
  data: function data() {
    return { prefix: prefix, hasDesc: false }
  },
  props: {
    title: String,
    duration: Number,
    onClose: Function,
    type: {
      default: 'open',
      validator: function validator(value) {
        return ['info', 'success', 'warning', 'error', 'open'].indexOf(value) !== -1
      }
    }
  },
  computed: {
    iconType: function iconType() {
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
    if (this.duration) {
      this.timerId = setTimeout(function () { return this$1.close(); }, this.duration * 1000);
    }
  },
  beforeDestroy: function beforeDestroy() {
    clearTimeout(this.timerId);
  },
  methods: {
    close: function close(event) {
      isFunc(this.onClose) && this.onClose();
      this.$emit('close');
    }
  }
};

/* script */
var __vue_script__$7 = script$7;
/* template */
var __vue_render__$7 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.prefix},[_c('div',{class:[(_vm.prefix + "--box"), {hasDesc: _vm.hasDesc}]},[(_vm.showIcon)?_c('UiIcon',{class:[(_vm.prefix + "--icon"), _vm.type],attrs:{"type":_vm.iconType}}):_vm._e(),_vm._v(" "),_c('div',{class:(_vm.prefix + "--body")},[(_vm.title)?_c('div',{class:(_vm.prefix + "--title")},[_vm._v(_vm._s(_vm.title))]):_vm._e(),_vm._v(" "),_vm._t("default")],2),_vm._v(" "),_c('UiCloseIconButton',{class:(_vm.prefix + "--close"),on:{"click":_vm.close}})],1)])};
var __vue_staticRenderFns__$7 = [];

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
  

  
  var UiNotice = normalizeComponent_1(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    undefined,
    undefined
  );

//
var prefix$1 = 'ui-message';
var script$8 = {
  name: 'UiMessage',
  components: { UiIcon: Icon, UiCloseIconButton: CloseIconButton },
  transition: prefix$1,
  data: function data() {
    return { prefix: prefix$1 }
  },
  props: {
    duration: Number,
    onClose: Function,
    closable: Boolean,
    type: {
      default: 'info',
      validator: function validator(value) {
        return ['info', 'success', 'warning', 'error', 'loading'].indexOf(value) !== -1
      }
    }
  },
  computed: {
    iconType: function iconType() {
      return iconTypes[this.type]
    }
  },
  mounted: function mounted() {
    var this$1 = this;

    if (this.duration) {
      this.timerId = setTimeout(function () { return this$1.close(); }, this.duration * 1000);
    }
  },
  beforeDestroy: function beforeDestroy() {
    clearTimeout(this.timerId);
  },
  methods: {
    close: function close() {
      isFunc(this.onClose) && this.onClose();
      this.$emit('close');
    }
  }
};

/* script */
var __vue_script__$8 = script$8;
/* template */
var __vue_render__$8 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.prefix},[_c('div',{class:(_vm.prefix + "--box")},[_c('UiIcon',{class:[(_vm.prefix + "--icon"), _vm.type],attrs:{"type":_vm.iconType}}),_vm._v(" "),_vm._t("default"),_vm._v(" "),(_vm.closable)?_c('UiCloseIconButton',{class:(_vm.prefix + "--close"),on:{"click":_vm.close}}):_vm._e()],2)])};
var __vue_staticRenderFns__$8 = [];

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
  

  
  var UiMessage = normalizeComponent_1(
    { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
    __vue_inject_styles__$8,
    __vue_script__$8,
    __vue_scope_id__$8,
    __vue_is_functional_template__$8,
    __vue_module_identifier__$8,
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

var script$9 = {
  props: {
    transition: String
  }
};

/* script */
var __vue_script__$9 = script$9;
/* template */
var __vue_render__$9 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ui-notice-wrapper"},[_c('transition-group',{attrs:{"name":_vm.transition,"tag":"div"}},[_vm._t("default")],2)],1)};
var __vue_staticRenderFns__$9 = [];

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
  

  
  var UiWrapper = normalizeComponent_1(
    { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
    __vue_inject_styles__$9,
    __vue_script__$9,
    __vue_scope_id__$9,
    __vue_is_functional_template__$9,
    __vue_module_identifier__$9,
    undefined,
    undefined
  );

/**
 * @param {import('vue').VueConstructor} Vue 
 * @param {Vue} Component
 * @param {Vue} WrappedComponent
 */
var createNoticeManager = function (Vue, Component, config) {
  if ( config === void 0 ) config = {};

  var comWrapper, key = 0;
  var getWrapper = function () {
    comWrapper = comWrapper || new Vue({
      name: 'UiNoticeManager',
      data: function data() {
        return { comps: [], zIndex: 0 }
      },
      watch: {
        'comps.length': function comps_length(newval, oldval) {
          if (newval > oldval) {
            this.zIndex = getMaxZIndex();
          }
        }
      },
      render: function render(h) {
        var this$1 = this;

        return h(
          UiWrapper,
          {
            style: { zIndex: this.zIndex },
            props: { transition: Component.transition }
          },
          this.comps.map(function (ref, i) {
            var ui = ref.ui;
            var key = ref.key;
            var props = ref.props;

            return h(
              ui,
              {
                key: key,
                props: props,
                on: {
                  close: function () { return this$1.comps.splice(i, 1); }
                }
              },
              isFunc(props.render) ? [props.render(h)] : (props.content || props.desc)
            )
          })
        )
      },
      mounted: function mounted() {
        document.body.appendChild(this.$el);
      },
      beforeDestroy: function beforeDestroy() {
        comWrapper = null;
        document.body.removeChild(this.$el);
      },
      methods: {
        addCompOptions: function addCompOptions(props) {
          if ( props === void 0 ) props = {};

          var option = { props: props, ui: Component, key: key++ };
          this.comps.push(option);
          return option.key
        },
        delComOptionByKey: function delComOptionByKey(key) {
          var index = this.comps.find(function (_) { return _.key === key; });
          if (index !== -1) { this.comps.splice(index, 1); }
        }
      }
    }).$mount();
    return comWrapper
  };
  var defaultConfig = Object.assign({}, { duration: 2, closable: false }, config);
  var addNotice = function (options, type) {
    if ( type === void 0 ) type = 'info';

    options = isStr(options) ?
      Object.assign({}, defaultConfig, { content: options, type: type }) :
      Object.assign({}, defaultConfig, options, { type: type });
    return getWrapper().addCompOptions(options)
  };
  var noticeFunc = function (options) { return addNotice(options); };
  noticeFunc.open = function (options) { return addNotice(options, 'open'); };
  noticeFunc.info = function (options) { return addNotice(options, 'info'); };
  noticeFunc.warning = function (options) { return addNotice(options, 'warning'); };
  noticeFunc.error = function (options) { return addNotice(options, 'error'); };
  noticeFunc.success = function (options) { return addNotice(options, 'success'); };
  noticeFunc.loading = function (options) {
    var key = addNotice(options, 'loading');
    return function () { return getWrapper().delComOptionByKey(key); }
  };
  noticeFunc.config = function (options) { return defaultConfig = Object.assign({}, defaultConfig, options); };
  noticeFunc.destroy = function () { return comWrapper && comWrapper.$destroy(); };
  return noticeFunc
};

var createNotice = function (Vue) { return createNoticeManager(Vue, UiNotice, { duration: 4 }); };
var createMessage = function (Vue) { return createNoticeManager(Vue, UiMessage); };

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
  name: 'UiCircle',
  data: function data() {
    return { prefix: 'ui-circle' }
  },
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
  computed: {
    styles: function styles() {
      return { width: ((this.size) + "px"), height: ((this.size) + "px") }
    },
    computedStrokeWidth: function computedStrokeWidth () {
      return this.percent === 0 && this.dashboard ? 0 : this.strokeWidth
    },
    radius: function radius() {
      return 50 - this.strokeWidth / 2
    },
    pathString: function pathString() {
      var ref = this;
      var r = ref.radius;
      var dashboard = ref.dashboard;
      return dashboard ? 
        ("M 50,50 m 0," + r + " a " + r + "," + r + " 0 1 1 0,-" + (2 * r) + " a " + r + "," + r + " 0 1 1 0," + (2 * r)) :
        ("M 50,50 m 0,-" + r + " a " + r + "," + r + " 0 1 1 0," + (2 * r) + " a " + r + "," + r + " 0 1 1 0,-" + (2 * r))
    },
    len: function len() {
      return Math.PI * 2 * this.radius
    },
    trailStyle: function trailStyle() {
      return this.dashboard && {
        'stroke-dasharray': ((this.len - 75) + "px " + (this.len) + "px"),
        'stroke-dashoffset': ("-" + (75 / 2) + "px"),
        'transition': 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s'
      }
    },
    pathStyle: function pathStyle() {
      return this.dashboard ? {
        'stroke-dasharray': (((this.percent / 100) * (this.len - 75)) + "px " + (this.len) + "px"),
        'stroke-dashoffset': ("-" + (75 / 2) + "px"),
        'transition': 'stroke-dashoffset .3s ease 0s, stroke-dasharray .6s ease 0s, stroke .6s, stroke-width .06s ease .6s'
      } : {
        'stroke-dasharray': ((this.len) + "px " + (this.len) + "px"),
        'stroke-dashoffset': ((((100 - this.percent) / 100 * this.len)) + "px"),
        'transition': 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
      }
    }
  }
};

/* script */
var __vue_script__$a = script$a;
/* template */
var __vue_render__$a = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.prefix,style:(_vm.styles)},[_c('svg',{attrs:{"viewBox":"0 0 100 100"}},[_c('path',{style:(_vm.trailStyle),attrs:{"d":_vm.pathString,"stroke":_vm.trailColor,"stroke-width":_vm.trailWidth,"fill-opacity":0}}),_vm._v(" "),_c('path',{style:(_vm.pathStyle),attrs:{"d":_vm.pathString,"stroke-linecap":_vm.strokeLinecap,"stroke":_vm.strokeColor,"stroke-width":_vm.computedStrokeWidth,"fill-opacity":"0"}})]),_vm._v(" "),_c('div',{class:(_vm.prefix + "--inner")},[_vm._t("default")],2)])};
var __vue_staticRenderFns__$a = [];

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
  

  
  var Circle = normalizeComponent_1(
    { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
    __vue_inject_styles__$a,
    __vue_script__$a,
    __vue_scope_id__$a,
    __vue_is_functional_template__$a,
    __vue_module_identifier__$a,
    undefined,
    undefined
  );

//
//
//
//
//

var script$b = {
  name: 'UiBreadcrumb',
  props: {
    separator: {
      type: String,
      default: '/'
    }
  }
};

/* script */
var __vue_script__$b = script$b;

/* template */
var __vue_render__$b = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ui-breadcrumb"},[_vm._t("default")],2)};
var __vue_staticRenderFns__$b = [];

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
  

  
  var UiBreadcrumb = normalizeComponent_1(
    { render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b },
    __vue_inject_styles__$b,
    __vue_script__$b,
    __vue_scope_id__$b,
    __vue_is_functional_template__$b,
    __vue_module_identifier__$b,
    undefined,
    undefined
  );

//
var script$c = {
  name: 'UiBreadcrumbItem',
  data: function data() {
    return { prefix: 'ui-breadcrumb-item', separator: '' }
  },
  props: {
    replace: Boolean,
    to: [String, Object],
    target: {
      type: String,
      default: '_self'
    },
    href: String,
    append: Boolean
  },
  mounted: function mounted() {
    var parent = findParent(this, 'UiBreadcrumb');
    if (parent) { this.separator = parent.separator; }
  }
};

/* script */
var __vue_script__$c = script$c;
/* template */
var __vue_render__$c = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{class:_vm.prefix},[(_vm.to)?_c('router-link',{class:(_vm.prefix + "--link"),attrs:{"to":_vm.to,"replace":_vm.replace,"append":_vm.append}},[_vm._t("default")],2):(_vm.href)?_c('a',{class:(_vm.prefix + "--link"),attrs:{"href":_vm.href,"target":_vm.target}},[_vm._t("default")],2):_c('span',{class:[(_vm.prefix + "--link"), 'notlink']},[_vm._t("default")],2),_vm._v(" "),_c('span',{class:(_vm.prefix + "--separator"),domProps:{"innerHTML":_vm._s(_vm.separator)}})],1)};
var __vue_staticRenderFns__$c = [];

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
  

  
  var UiBreadcrumbItem = normalizeComponent_1(
    { render: __vue_render__$c, staticRenderFns: __vue_staticRenderFns__$c },
    __vue_inject_styles__$c,
    __vue_script__$c,
    __vue_scope_id__$c,
    __vue_is_functional_template__$c,
    __vue_module_identifier__$c,
    undefined,
    undefined
  );

var Breadcrumb = UiBreadcrumb;
var BreadcrumbItem = UiBreadcrumbItem;

//
//
//
//
//

var script$d = {
  name: 'UiTimeline',
  props: { pending: Boolean }
};

/* script */
var __vue_script__$d = script$d;
/* template */
var __vue_render__$d = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{staticClass:"ui-timeline",class:{pending: _vm.pending}},[_vm._t("default")],2)};
var __vue_staticRenderFns__$d = [];

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
  

  
  var UiTimeline = normalizeComponent_1(
    { render: __vue_render__$d, staticRenderFns: __vue_staticRenderFns__$d },
    __vue_inject_styles__$d,
    __vue_script__$d,
    __vue_scope_id__$d,
    __vue_is_functional_template__$d,
    __vue_module_identifier__$d,
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

var script$e = {
  name: 'UiTimelineItem',
  data: function data() {
    return { prefix: 'ui-timeline-item', custom: false }
  },
  props: {
    color: {
      type: String,
      default: 'blue'
    }
  },
  computed: {
    clsName: function clsName() {
      return ['blue', 'red', 'green'].indexOf(this.color) !== -1
    },
    styles: function styles() {
      return !this.clsName && { color: this.color }
    }
  },
  mounted: function mounted() {
    this.custom = this.$slots.dot !== undefined;
  }
};

/* script */
var __vue_script__$e = script$e;
/* template */
var __vue_render__$e = function () {
var _obj;
var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{class:_vm.prefix},[_c('span',{class:(_vm.prefix + "--tail")}),_vm._v(" "),_c('span',{class:[(_vm.prefix + "--dot"), ( _obj = {}, _obj[_vm.color] = _vm.clsName, _obj.custom = _vm.custom, _obj )],style:(_vm.styles)},[_vm._t("dot")],2),_vm._v(" "),_c('div',{class:(_vm.prefix + "--content")},[_vm._t("default")],2)])};
var __vue_staticRenderFns__$e = [];

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
  

  
  var UiTimelineItem = normalizeComponent_1(
    { render: __vue_render__$e, staticRenderFns: __vue_staticRenderFns__$e },
    __vue_inject_styles__$e,
    __vue_script__$e,
    __vue_scope_id__$e,
    __vue_is_functional_template__$e,
    __vue_module_identifier__$e,
    undefined,
    undefined
  );

var Timeline = UiTimeline;
var TimelineItem = UiTimelineItem;

//
//
//
//
//
//
//
//
//

var script$f = {
  name: 'UiSpin',
  data: function data() {
    return { prefix: 'ui-spin' }
  },
  props: {
    size: {
      validator: function validator(value) {
        return ['large', 'small'].indexOf(value) !== -1
      }
    },
    fix: Boolean
  }
};

/* script */
var __vue_script__$f = script$f;
/* template */
var __vue_render__$f = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":_vm.prefix}},[_c('div',{class:[_vm.prefix, {fix: _vm.fix}]},[_c('div',[_vm._t("default",[_c('div',{class:[(_vm.prefix + "--dot"), _vm.size]})])],2)])])};
var __vue_staticRenderFns__$f = [];

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
  

  
  var UiSpin = normalizeComponent_1(
    { render: __vue_render__$f, staticRenderFns: __vue_staticRenderFns__$f },
    __vue_inject_styles__$f,
    __vue_script__$f,
    __vue_scope_id__$f,
    __vue_is_functional_template__$f,
    __vue_module_identifier__$f,
    undefined,
    undefined
  );

/**
 * 创建加载中组件
 * @param {Vue.VueConstructor} Vue 
 */
var spinService = function (Vue) {
  return {
    getVM: function getVM(options) {
      if ( options === void 0 ) options = {};

      var that = this;
      return this.vm || new Vue({
        data: function data() {
          return { visible: false }
        },
        watch: {
          visible: function visible(newval) {
            if (!newval) { winScrollbarLock.unlock(); }
          }
        },
        render: function render(h) {
          return h(UiSpin, {
            props: { size: options.size, fix: true },
            style: { zIndex: getMaxZIndex(), position: 'fixed' },
            directives: [{ name: 'show', value: this.visible }],
          }, isFunc(options.render) ? [options.render(h)] : undefined)
        },
        mounted: function mounted() {
          document.body.appendChild(this.$el);
          this.visible = true;
        },
        beforeDestroy: function beforeDestroy() {
          that.vm = null;
          this.$el.parentNode && this.$el.parentNode.removeChild(this.$el);
        },
        methods: {
          show: function show(visible) {
            if ( visible === void 0 ) visible = true;

            this.visible = visible;
          }
        }
      }).$mount()
    },
    show: function show(options) {
      winScrollbarLock.lock();
      this.vm = this.getVM(options);
      this.vm.show();
    },
    hide: function hide() {
      this.vm.show(false);
    },
    destroy: function destroy() {
      this.vm.$destroy();
    }
  }
};

//
var script$g = {
  name: 'UiSteps',
  props: {
    current: {
      type: Number,
      default: 0
    },
    status: {
      default: 'process',
      validator: function validator(value) {
        return ['wait', 'process', 'finish', 'error'].indexOf(value) !== -1
      }
    },
    size: {
      validator: function validator(value) {
        return value === 'small'
      }
    },
    direction: {
      default: 'horizontal',
      validator: function validator(value) {
        return ['horizontal', 'vertical'].indexOf(value) !== -1
      }
    }
  },
  watch: {
    current: function current() {
      this.setItemsState();
    }
  },
  mounted: function mounted() {
    this.setItemsState();
  },
  methods: {
    setItemsState: function setItemsState() {
      var this$1 = this;

      var childs = findChildrens(this, 'UiStep'), count = childs.length;
      childs.forEach(function (item, index) {
        var isCurrent = index === this$1.current;
        var width = this$1.direction === 'horizontal' ? ((1 / count * 100) + "%") : undefined;
        var status = isCurrent ? this$1.status : index < this$1.current ? 'finish' : 'wait';
        item.setState({ index: index, isCurrent: isCurrent, width: width, status: status });
      });
    }
  }
};

/* script */
var __vue_script__$g = script$g;
/* template */
var __vue_render__$g = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ui-steps",class:[_vm.size, _vm.direction]},[_vm._t("default")],2)};
var __vue_staticRenderFns__$g = [];

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
  

  
  var UiSteps = normalizeComponent_1(
    { render: __vue_render__$g, staticRenderFns: __vue_staticRenderFns__$g },
    __vue_inject_styles__$g,
    __vue_script__$g,
    __vue_scope_id__$g,
    __vue_is_functional_template__$g,
    __vue_module_identifier__$g,
    undefined,
    undefined
  );

//
var script$h = {
  name: 'UiStep',
  components: { UiIcon: Icon },
  data: function data() {
    return { prefix: 'ui-step', state: {} }
  },
  props: {
    title: String,
    content: String,
    icon: String
  },
  computed: {
    iconType: function iconType() {
      var ref = this.state;
      var status = ref.status;
      return this.icon || (status === 'finish' && 'ios-checkmark-empty') || (status === 'error' && 'ios-close-empty')
    }
  },
  methods: {
    setState: function setState(state) {
      this.state = Object.assign({}, this.state, state);
    }
  }
};

/* script */
var __vue_script__$h = script$h;

/* template */
var __vue_render__$h = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:[_vm.prefix, _vm.state.status],style:({width: _vm.state.width})},[_c('div',{class:(_vm.prefix + "--tail")}),_vm._v(" "),_c('span',{class:[(_vm.prefix + "--head"), {icon: _vm.icon}]},[(_vm.iconType)?_c('UiIcon',{attrs:{"type":_vm.iconType}}):_c('b',[_vm._v(_vm._s(_vm.state.index + 1))])],1),_vm._v(" "),_c('div',{class:(_vm.prefix + "--main")},[_c('div',{class:(_vm.prefix + "--title")},[_vm._v(_vm._s(_vm.title))]),_vm._v(" "),(_vm.content)?_c('div',{class:(_vm.prefix + "--content")},[_vm._v(_vm._s(_vm.content))]):_vm._e()])])};
var __vue_staticRenderFns__$h = [];

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
  

  
  var UiStep = normalizeComponent_1(
    { render: __vue_render__$h, staticRenderFns: __vue_staticRenderFns__$h },
    __vue_inject_styles__$h,
    __vue_script__$h,
    __vue_scope_id__$h,
    __vue_is_functional_template__$h,
    __vue_module_identifier__$h,
    undefined,
    undefined
  );

var Steps = UiSteps;
var Step = UiStep;

//
var script$i = {
  data: function data() {
    return {
      fixed: false,
      affixStyle: {},
      placeholderStyle: {}
    }
  },
  props: {
    offsetTop: {
      type: Number,
      default: 0
    },
    offsetBottom: Number
  },
  computed: {
    isFixedBottom: function isFixedBottom() {
      return this.offsetBottom !== undefined && this.offsetTop === 0
    }
  },
  watch: {
    fixed: function fixed(newVal) {
      this.$emit('on-change', newVal);
    }
  },
  mounted: function mounted() {
    var this$1 = this;

    this.onResize();
    this.throttleScroll = throttle(function () { return this$1.onScroll(); }, 50);
    this.throttleResize = throttle(function () { return this$1.onResize(); }, 50);
    window.addEventListener('scroll', this.throttleScroll);
    window.addEventListener('resize', this.throttleResize);
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('scroll', this.throttleScroll);
    window.removeEventListener('resize', this.throttleResize);
  },
  methods: {
    onScroll: function onScroll() {
      var rect = this.$el.getBoundingClientRect();
      this.fixed = this.isFixedBottom ? window.innerHeight - rect.bottom <= this.offsetBottom : rect.top <= this.offsetTop;
    },
    onResize: function onResize() {
      var rect = this.$el.getBoundingClientRect();
      this.placeholderStyle = { width: ((rect.width) + "px"), height: ((rect.height) + "px") };
      var obj = this.isFixedBottom ? { bottom: ((this.offsetBottom) + "px") } : { top: ((this.offsetTop) + "px") };
      this.affixStyle = Object.assign({}, obj, {left: ((rect.left) + "px")});
    }
  }
};

/* script */
var __vue_script__$i = script$i;
/* template */
var __vue_render__$i = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{class:{'ui-affix': _vm.fixed},style:(_vm.affixStyle)},[_vm._t("default")],2),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.fixed),expression:"fixed"}],style:(_vm.placeholderStyle)})])};
var __vue_staticRenderFns__$i = [];

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
  

  
  var Affix = normalizeComponent_1(
    { render: __vue_render__$i, staticRenderFns: __vue_staticRenderFns__$i },
    __vue_inject_styles__$i,
    __vue_script__$i,
    __vue_scope_id__$i,
    __vue_is_functional_template__$i,
    __vue_module_identifier__$i,
    undefined,
    undefined
  );

//
//
//
//
//

var script$j = {
  name: 'UiRow',
  props: {
    gutter: {
      type: Number,
      default: 0
    },
    align: {
      validator: function validator(value) {
        return ['top', 'middle', 'bottom'].indexOf(value) !== -1
      }
    },
    justify: {
      validator: function validator(value) {
        return ['start', 'end', 'center', 'space-around', 'space-between'].indexOf(value) !== -1
      }
    }
  },
  computed: {
    classes: function classes() {
      var prefix = 'ui-row';
      var ref = this;
      var align = ref.align;
      var justify = ref.justify;
      var gutter = ref.gutter;
      return [prefix, align && (prefix + "-" + align), justify && (prefix + "-" + justify), { gutter: gutter }].filter(function (_) { return _; })
    },
    styles: function styles() {
      return this.gutter && { margin: ("0 -" + (this.gutter / 2) + "px") }
    }
  }
};

/* script */
var __vue_script__$j = script$j;
/* template */
var __vue_render__$j = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.classes,style:(_vm.styles)},[_vm._t("default")],2)};
var __vue_staticRenderFns__$j = [];

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
  

  
  var UiRow = normalizeComponent_1(
    { render: __vue_render__$j, staticRenderFns: __vue_staticRenderFns__$j },
    __vue_inject_styles__$j,
    __vue_script__$j,
    __vue_scope_id__$j,
    __vue_is_functional_template__$j,
    __vue_module_identifier__$j,
    undefined,
    undefined
  );

//
var script$k = {
  name: 'UiCol',
  props: {
    span: [Number, String],
    order: [Number, String],
    offset: [Number, String],
    push: [Number, String],
    pull: [Number, String],
    xs: [Number, Object],
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object]
  },
  computed: {
    classes: function classes() {
      var this$1 = this;

      var prefix = 'ui-col';
      var rtnArr = [prefix], arr = ['span', 'order', 'pull', 'push', 'offset'];
      arr.forEach(function (_) { return this$1[_] !== undefined && rtnArr.push((prefix + "-" + _ + "-" + (this$1[_]))); });
      var sizes = ['xs', 'sm', 'md', 'lg'];
      sizes.forEach(function (_) {
        if (!this$1[_]) { return }
        var options = typeof this$1[_] === 'number' ? { span: this$1[_] } : this$1[_];
        for (var key in options) { rtnArr.push((prefix + "-" + _ + "-" + key + "-" + (options[key]))); }
      });
      return rtnArr
    },
    styles: function styles() {
      var parent = findParent(this, 'UiRow');
      var gutter = parent && parent.gutter, padding = (gutter / 2) + "px";
      return gutter && { paddingLeft: padding, paddingRight: padding }
    }
  }
};

/* script */
var __vue_script__$k = script$k;
/* template */
var __vue_render__$k = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.classes,style:(_vm.styles)},[_vm._t("default")],2)};
var __vue_staticRenderFns__$k = [];

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
  

  
  var UiCol = normalizeComponent_1(
    { render: __vue_render__$k, staticRenderFns: __vue_staticRenderFns__$k },
    __vue_inject_styles__$k,
    __vue_script__$k,
    __vue_scope_id__$k,
    __vue_is_functional_template__$k,
    __vue_module_identifier__$k,
    undefined,
    undefined
  );

var Row = UiRow;
var Col = UiCol;

var prefix$2 = '.ui-col';

var genCol = function () {
  return Array.apply(null, { length: 24 }).map(function (_, i) {
    var num = i + 1;
    var val = (num / 24 * 100) + "%";
    return ("\n      " + prefix$2 + "-span-" + num + " {\n        width: " + val + ";\n      }\n      " + prefix$2 + "-order-" + num + " {\n        order: " + num + ";\n      }\n      " + prefix$2 + "-pull-" + num + " {\n        right: " + val + ";\n      }\n      " + prefix$2 + "-push-" + num + " {\n        left: " + val + ";\n      }\n      " + prefix$2 + "-offset-" + num + " {\n        margin-left: " + val + ";\n      }\n    ")
  }).join('')
};

var genGrid = function (size) {
  return Array.apply(null, { length: 25 }).map(function (_, i) {
    var val = (i / 24 * 100) + "%";
    return i === 0 ? ("\n      " + prefix$2 + "-" + size + "-span-" + i + " {\n        display: none;\n      }\n    ") : ("\n      " + prefix$2 + "-" + size + "-span-" + i + " {\n        width: " + val + ";\n      }\n      " + prefix$2 + "-" + size + "-order-" + i + " {\n        order: " + i + ";\n      }\n      " + prefix$2 + "-" + size + "-pull-" + i + " {\n        right: " + val + ";\n      }\n      " + prefix$2 + "-" + size + "-push-" + i + " {\n        left: " + val + ";\n      }\n      " + prefix$2 + "-" + size + "-offset-" + i + " {\n        margin-left: " + val + ";\n      }\n    ")
  }).join('')
};

var genGridAll = function () {
  return [
    { size: 'xs' },
    { size: 'sm', minWidth: 768 },
    { size: 'md', minWidth: 992 },
    { size: 'lg', minWidth: 1200 }
  ].map(function (_) {
    return _.minWidth ? ("\n      @media (min-width: " + (_.minWidth) + "px) {\n        " + (genGrid(_.size)) + "\n      }\n    ") : genGrid(_.size)
  }).join('')
};

addStylesheet('uiGridLayout', genCol() + genGridAll());

//
var script$l = {
  name: 'UiBackTop',
  components: { UiIcon: Icon },
  data: function data() {
    return { prefix: 'ui-backTop', visible: false }
  },
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
  computed: {
    styles: function styles() {
      return { right: ((+this.right) + "px"), bottom: ((+this.bottom) + "px") }
    }
  },
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
      this.visible = window.scrollY > this.height;
    }
  },
  mounted: function mounted() {
    window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  }
};

/* script */
var __vue_script__$l = script$l;
/* template */
var __vue_render__$l = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":_vm.prefix}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.visible),expression:"visible"}],class:_vm.prefix,style:(_vm.styles),on:{"click":_vm.handleClick}},[_vm._t("default",[_c('UiIcon',{class:(_vm.prefix + "--icon"),attrs:{"type":"ios-arrow-up"}})])],2)])};
var __vue_staticRenderFns__$l = [];

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
  

  
  var BackTop = normalizeComponent_1(
    { render: __vue_render__$l, staticRenderFns: __vue_staticRenderFns__$l },
    __vue_inject_styles__$l,
    __vue_script__$l,
    __vue_scope_id__$l,
    __vue_is_functional_template__$l,
    __vue_module_identifier__$l,
    undefined,
    undefined
  );

//
var script$m = {
  name: 'UiProgress',
  components: { UiIcon: Icon },
  data: function data() {
    return { prefix: 'ui-progress' }
  },
  props: {
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
    strokeWidth: {
      type: Number,
      default: 10
    },
    hideInfo: Boolean,
    vertical: Boolean
  },
  computed: {
    innerStyle: function innerStyle() {
      var obj;

      return ( obj = { borderRadius: ((this.strokeWidth * .5) + "px") }, obj[this.vertical ? 'width' : 'height'] = ((this.strokeWidth) + "px"), obj )
    },
    bgStyle: function bgStyle() {
      var obj;

      return Object.assign({}, this.innerStyle, ( obj = {}, obj[this.vertical ? 'height' : 'width'] = ((Math.min(this.percent, 100)) + "%"), obj ))
    },
    curStatus: function curStatus() {
      return this.percent < 100 ? this.status : 'success'
    },
    statusIcon: function statusIcon() {
      return ({ wrong: 'ios-close', success: 'ios-checkmark' })[this.curStatus]
    }
  }
};

/* script */
var __vue_script__$m = script$m;
/* template */
var __vue_render__$m = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:[_vm.prefix, _vm.curStatus, {vertical: _vm.vertical}]},[_c('div',{class:(_vm.prefix + "-box")},[_c('div',{class:(_vm.prefix + "-outer")},[_c('div',{class:(_vm.prefix + "-inner"),style:(_vm.innerStyle)},[_c('div',{class:(_vm.prefix + "-bg"),style:(_vm.bgStyle)})])]),_vm._v(" "),(!_vm.hideInfo)?_c('div',{class:(_vm.prefix + "-text")},[_vm._t("default",[(_vm.statusIcon)?_c('UiIcon',{attrs:{"type":_vm.statusIcon}}):_c('span',[_vm._v(_vm._s(Math.min(_vm.percent, 100))+"%")])])],2):_vm._e()])])};
var __vue_staticRenderFns__$m = [];

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
  

  
  var Progress = normalizeComponent_1(
    { render: __vue_render__$m, staticRenderFns: __vue_staticRenderFns__$m },
    __vue_inject_styles__$m,
    __vue_script__$m,
    __vue_scope_id__$m,
    __vue_is_functional_template__$m,
    __vue_module_identifier__$m,
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

var script$n = {
  name: 'UiLoadingBar',
  data: function data() {
    return { prefix: 'ui-loadingBar' }
  },
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
  computed: {
    styles: function styles() {
      return { height: ((this.height) + "px") }
    },
    innerStyles: function innerStyles() {
      return { transform: ("scaleX(" + (this.percent / 100) + ")"), backgroundColor: this.status === 'error' ? this.failedColor : this.color }
    }
  }
};

/* script */
var __vue_script__$n = script$n;
/* template */
var __vue_render__$n = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":_vm.prefix}},[_c('div',{class:_vm.prefix,style:(_vm.styles)},[_c('div',{class:[(_vm.prefix + "-inner"), _vm.status],style:(_vm.innerStyles)})])])};
var __vue_staticRenderFns__$n = [];

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
  

  
  var UiLoadingBar = normalizeComponent_1(
    { render: __vue_render__$n, staticRenderFns: __vue_staticRenderFns__$n },
    __vue_inject_styles__$n,
    __vue_script__$n,
    __vue_scope_id__$n,
    __vue_is_functional_template__$n,
    __vue_module_identifier__$n,
    undefined,
    undefined
  );

/**
 * 创建加载条
 * @param {import("vue").VueConstructor} Vue 
 */
function loadingBarService (Vue) {
  return {
    getVM: function getVM() {
      return this.vm || (this.vm = new Vue({
        data: function data() {
          return {
            customOptions: {},
            options: { percent: 0 }
          }
        },
        render: function render(h) {
          return h(UiLoadingBar, {
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
      }).$mount())
    },
    start: function start() {
      var this$1 = this;

      if (this.tid) { return }
      this.getVM().update({ visible: true, percent: 0, status: undefined, zIndex: getMaxZIndex() });
      var percent = 0;
      this.tid = setInterval(function () {
        percent += Math.floor(Math.random() * 3 + 2);
        if (percent > 90) { this$1.clearTimer(); }
        this$1.update(percent);
      }, 200);
    },
    finish: function finish(status) {
      this.clearTimer();
      var vm = this.getVM();
      vm.update({ visible: true, percent: 100, status: status });
      Vue.nextTick(function () { return vm.update({ visible: false }); });
    },
    error: function error() {
      this.finish('error');
    },
    update: function update(percent) {
      this.getVM().update({ percent: percent });
    },
    config: function config(options) {
      this.getVM().config(options);
    },
    destroy: function destroy() {
      this.clearTimer();
      this.vm && this.vm.$destroy();
      this.vm = null;
    },
    clearTimer: function clearTimer() {
      clearInterval(this.tid);
      this.tid = null;
    }
  }
}

//
var script$o = {
  name: 'UiButton',
  components: { UiIcon: Icon },
  data: function data() {
    return { prefix: 'ui-btn', isOnlyIcon: false }
  },
  props: {
    type: {
      default: 'default',
      validator: function validator(value) {
        return ['default', 'primary', 'dashed', 'text', 'info', 'success', 'warning', 'error'].indexOf(value) !== -1
      }
    },
    ghost: Boolean,
    size: {
      validator: function validator(value) {
        return ['large', 'default', 'small'].indexOf(value) !== -1
      }
    },
    shape: {
      validator: function validator(value) {
        return value === 'circle'
      }
    },
    long: Boolean,
    htmlType: {
      default: 'button',
      validator: function validator(value) {
        return ['button', 'submit', 'reset'].indexOf(value) !== -1
      }
    },
    disabled: Boolean,
    loading: Boolean,
    icon: String,
    to: [String, Object],
    replace: Boolean,
    target: String,
    append: Boolean
  },
  computed: {
    classes: function classes() {
      return [
        this.prefix,
        this.type && ((this.prefix) + "-" + (this.type)),
        this.size && ((this.prefix) + "-" + (this.size)),
        this.shape && ((this.prefix) + "-" + (this.shape)),
        { long: this.long, ghost: this.ghost, isOnlyIcon: this.isOnlyIcon, loading: this.loading, disabled: this.disabled }
      ]
    },
    listeners: function listeners() {
      var that = this;
      return Object.assign({}, this.$listeners, {
        click: function click(event) {
          !that.disabled && that.$emit('click', event);
        }
      })
    },
    root: function root() {
      if (this.to) {
        if (!this.target && this.$router) {
          return { name: 'RouterLink', attrs: { to: this.to, replace: this.replace, append: this.append } }
        }
        return { name: 'a', attrs: { target: this.target, href: this.to } }
      }
      return { name: 'button', attrs: { disabled: this.disabled, type: this.htmlType } }
    }
  },
  mounted: function mounted() {
    this.isOnlyIcon = this.$slots.default === undefined;
  }
};

/* script */
var __vue_script__$o = script$o;
/* template */
var __vue_render__$o = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.root.name,_vm._g(_vm._b({tag:"a",class:_vm.classes},'a',_vm.root.attrs,false),_vm.listeners),[(_vm.loading)?_c('UiIcon',{staticClass:"icon-loading",attrs:{"type":"load-c"}}):(_vm.icon)?_c('UiIcon',{attrs:{"type":_vm.icon}}):_vm._e(),_vm._v(" "),(!_vm.isOnlyIcon)?_c('span',[_vm._t("default")],2):_vm._e()],1)};
var __vue_staticRenderFns__$o = [];

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
  

  
  var UiButton = normalizeComponent_1(
    { render: __vue_render__$o, staticRenderFns: __vue_staticRenderFns__$o },
    __vue_inject_styles__$o,
    __vue_script__$o,
    __vue_scope_id__$o,
    __vue_is_functional_template__$o,
    __vue_module_identifier__$o,
    undefined,
    undefined
  );

//
//
//
//
//

var script$p = {
  name: 'UiButtonGroup',
  data: function data() {
    return { prefix: 'ui-btn-group' }
  },
  props: {
    size: {
      default: 'default',
      validator: function validator(value) {
        return ['large', 'default', 'small'].indexOf(value) !== -1
      }
    },
    shape: {
      validator: function validator(value) {
        return value === 'circle'
      }
    },
    vertical: Boolean
  }
};

/* script */
var __vue_script__$p = script$p;
/* template */
var __vue_render__$p = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:[_vm.prefix, (_vm.prefix + "-" + _vm.size), (_vm.prefix + "-" + _vm.shape), { vertical: _vm.vertical }]},[_vm._t("default")],2)};
var __vue_staticRenderFns__$p = [];

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
  

  
  var UiButtonGroup = normalizeComponent_1(
    { render: __vue_render__$p, staticRenderFns: __vue_staticRenderFns__$p },
    __vue_inject_styles__$p,
    __vue_script__$p,
    __vue_scope_id__$p,
    __vue_is_functional_template__$p,
    __vue_module_identifier__$p,
    undefined,
    undefined
  );

var Button = UiButton;
var ButtonGroup = UiButtonGroup;

//
//
//
//
//
//
//

var script$q = {
  name: 'UiDivider',
  data: function data() {
    return { prefix: 'ui-divider', hasText: false }
  },
  props: {
    type: {
      default: 'horizontal',
      validator: function validator(value) {
        return ['horizontal', 'vertical'].indexOf(value) !== -1
      }
    },
    orientation: {
      default: 'center',
      validator: function validator(value) {
        return ['left', 'right', 'center'].indexOf(value) !== -1
      }
    },
    dashed: Boolean
  },
  mounted: function mounted() {
    this.hasText = this.$slots.default !== undefined;
  }
};

/* script */
var __vue_script__$q = script$q;
/* template */
var __vue_render__$q = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:[(_vm.prefix + "-" + _vm.type), _vm.orientation, {dashed: _vm.dashed}]},[(_vm.hasText && _vm.type === 'horizontal')?_c('span',{class:(_vm.prefix + "-text")},[_vm._t("default")],2):_vm._e()])};
var __vue_staticRenderFns__$q = [];

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
  

  
  var Divider = normalizeComponent_1(
    { render: __vue_render__$q, staticRenderFns: __vue_staticRenderFns__$q },
    __vue_inject_styles__$q,
    __vue_script__$q,
    __vue_scope_id__$q,
    __vue_is_functional_template__$q,
    __vue_module_identifier__$q,
    undefined,
    undefined
  );

//
//
//
//
//
//

var script$r = {
  name: 'UiSwitch',
  data: function data() {
    return { prefix: 'ui-switch', inputValue: this.value }
  },
  props:{
    value: {},
    size: {
      validator: function validator(value) {
        return ['large', 'default','small'].indexOf(value) !== -1
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
    }
  },
  computed: {
    checked: function checked() {
      return this.inputValue === this.trueValue
    }
  },
  watch: {
    value: function value(newval) {
      this.inputValue = newval;
    },
    checked: function checked(newval) {
      this.$emit('on-change', newval);
    },
    inputValue: function inputValue(newval) {
      this.$emit('input', newval);
    }
  },
  methods: {
    onClick: function onClick() {
      if (!this.disabled) { this.inputValue = this.checked ? this.falseValue : this.trueValue; }
    }
  }
};

/* script */
var __vue_script__$r = script$r;
/* template */
var __vue_render__$r = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{class:[_vm.prefix, (_vm.prefix + "-" + _vm.size), {checked: _vm.checked, disabled: _vm.disabled}],attrs:{"tabindex":"0"},on:{"click":_vm.onClick}},[(_vm.checked)?_vm._t("open"):_vm._t("close")],2)};
var __vue_staticRenderFns__$r = [];

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
  

  
  var UiSwitch = normalizeComponent_1(
    { render: __vue_render__$r, staticRenderFns: __vue_staticRenderFns__$r },
    __vue_inject_styles__$r,
    __vue_script__$r,
    __vue_scope_id__$r,
    __vue_is_functional_template__$r,
    __vue_module_identifier__$r,
    undefined,
    undefined
  );

//
var script$s = {
  name: 'UiLoading',
  components: { UiIcon: Icon, UiSpin: UiSpin },
  data: function data() {
    return { prefix: 'ui-loading' }
  },
  props: {
    loading: Boolean,
    loadingText: String,
    iconClass: String
  }
};

/* script */
var __vue_script__$s = script$s;
/* template */
var __vue_render__$s = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.prefix},[(_vm.loading)?_c('UiSpin',{attrs:{"fix":""}},[_c('UiIcon',{class:[(_vm.prefix + "-icon"), _vm.iconClass],attrs:{"type":"load-c","size":"18"}}),_vm._v(" "),_c('span',{class:(_vm.prefix + "-text")},[_vm._v(_vm._s(_vm.loadingText))])],1):_vm._e()],1)};
var __vue_staticRenderFns__$s = [];

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
  

  
  var UiLoading = normalizeComponent_1(
    { render: __vue_render__$s, staticRenderFns: __vue_staticRenderFns__$s },
    __vue_inject_styles__$s,
    __vue_script__$s,
    __vue_scope_id__$s,
    __vue_is_functional_template__$s,
    __vue_module_identifier__$s,
    undefined,
    undefined
  );

//
var script$t = {
  name: 'UiScroll',
  components: { UiLoading: UiLoading },
  data: function data() {
    return { topLoading: false, bottomLoading: false }
  },
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
  computed: {
    styles: function styles() {
      return { height: isNaN(this.height) ? this.height : ((this.height) + "px") }
    },
    edge: function edge() {
      return this.distanceToEdge instanceof Array ? this.distanceToEdge : [this.distanceToEdge, this.distanceToEdge]
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
    onMouseWheel: function onMouseWheel(event) {
      if (this.topHandlers.length && this.$el.scrollTop <= 0 && event.deltaY < 0) {
        event.preventDefault();
        this.onScroll();
      }
    }
  }
};

/* script */
var __vue_script__$t = script$t;
/* template */
var __vue_render__$t = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ui-scroll",style:(_vm.styles),on:{"scroll":_vm.onScroll,"mousewheel":_vm.onMouseWheel}},[(_vm.topHandlers.length)?_c('UiLoading',{attrs:{"loadingText":_vm.loadingText,"loading":_vm.topLoading}}):_vm._e(),_vm._v(" "),_vm._t("default"),_vm._v(" "),(_vm.bottomHandlers.length)?_c('UiLoading',{attrs:{"loadingText":_vm.loadingText,"loading":_vm.bottomLoading}}):_vm._e()],2)};
var __vue_staticRenderFns__$t = [];

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
  

  
  var Scroll = normalizeComponent_1(
    { render: __vue_render__$t, staticRenderFns: __vue_staticRenderFns__$t },
    __vue_inject_styles__$t,
    __vue_script__$t,
    __vue_scope_id__$t,
    __vue_is_functional_template__$t,
    __vue_module_identifier__$t,
    undefined,
    undefined
  );

//
var script$u = {
  name: 'UiCheckbox',
  components: { UiIcon: Icon },
  data: function data() {
    return { prefix: 'ui-checkbox' }
  },
  props: {
    value: [String, Number, Boolean],
    label: [String, Number, Boolean],
    disabled: Boolean,
    indeterminate: Boolean,
    size: {
      validator: function validator(value) {
        return ['small', 'default', 'large'].indexOf(value) !== -1
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
  computed: {
    checked: function checked() {
      var parent = findParent(this, 'UiCheckboxGroup');
      return parent ? parent.includes(this.label) : this.value === this.trueValue
    }
  },
  watch: {
    checked: function checked(newVal) {
      this.$emit('on-change', newVal);
    }
  },
  methods: {
    onClick: function onClick(event) {
      if (this.disabled) { return }
      var parent = findParent(this, 'UiCheckboxGroup');
      if (parent) {
        parent.updateValue(this.label);
      } else {
        this.$emit('input', this.checked ? this.falseValue : this.trueValue);
      }
    }
  }
};

/* script */
var __vue_script__$u = script$u;
/* template */
var __vue_render__$u = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{class:[_vm.prefix, _vm.size, {checked: _vm.checked || _vm.indeterminate, disabled: _vm.disabled}],on:{"click":_vm.onClick}},[_c('span',{class:(_vm.prefix + "-btn"),attrs:{"tabindex":"0"}},[_c('UiIcon',{class:[(_vm.prefix + "-icon"), {indeterminate: _vm.indeterminate}],attrs:{"type":"checkmark"}})],1),_vm._v(" "),_vm._t("default",[_vm._v(_vm._s(_vm.label))])],2)};
var __vue_staticRenderFns__$u = [];

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
  

  
  var UiCheckbox = normalizeComponent_1(
    { render: __vue_render__$u, staticRenderFns: __vue_staticRenderFns__$u },
    __vue_inject_styles__$u,
    __vue_script__$u,
    __vue_scope_id__$u,
    __vue_is_functional_template__$u,
    __vue_module_identifier__$u,
    undefined,
    undefined
  );

//
//
//
//
//

var script$v = {
  name: 'UiCheckboxGroup',
  data: function data() {
    return { checkedArray: this.value }
  },
  props: {
    value: {
      type: Array,
      default: function () { return []; }
    },
    size: {
      validator: function validator(value) {
        return ['small', 'default', 'large'].indexOf(value) !== -1
      }
    }
  },
  watch: {
    value: function value(newVal) {
      this.checkedArray = newVal;
    }
  },
  methods: {
    updateValue: function updateValue(value) {
      var index = this.checkedArray.indexOf(value);
      if (index === -1) {
        this.checkedArray.push(value);
      } else {
        this.checkedArray.splice(index, 1);
      }
      this.$emit('input', this.checkedArray);
      this.$emit('on-change', this.checkedArray);
    },
    includes: function includes(label) {
      return this.checkedArray.indexOf(label) !== -1
    }
  }
};

/* script */
var __vue_script__$v = script$v;

/* template */
var __vue_render__$v = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ui-checkbox-group",class:_vm.size},[_vm._t("default")],2)};
var __vue_staticRenderFns__$v = [];

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
  

  
  var UiCheckboxGroup = normalizeComponent_1(
    { render: __vue_render__$v, staticRenderFns: __vue_staticRenderFns__$v },
    __vue_inject_styles__$v,
    __vue_script__$v,
    __vue_scope_id__$v,
    __vue_is_functional_template__$v,
    __vue_module_identifier__$v,
    undefined,
    undefined
  );

var Checkbox = UiCheckbox;
var CheckboxGroup = UiCheckboxGroup;

//
//
//
//
//

var script$w = {
  name: 'UiLayout',
  data: function data() {
    return { hasSider: false }
  },
  mounted: function mounted() {
    this.hasSider = this.$children.some(function (_) { return _.$options.name === 'UiSider'; });
  }
};

/* script */
var __vue_script__$w = script$w;
/* template */
var __vue_render__$w = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ui-layout",class:{hasSider: _vm.hasSider}},[_vm._t("default")],2)};
var __vue_staticRenderFns__$w = [];

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
  

  
  var UiLayout = normalizeComponent_1(
    { render: __vue_render__$w, staticRenderFns: __vue_staticRenderFns__$w },
    __vue_inject_styles__$w,
    __vue_script__$w,
    __vue_scope_id__$w,
    __vue_is_functional_template__$w,
    __vue_module_identifier__$w,
    undefined,
    undefined
  );

/* script */

/* template */
var __vue_render__$x = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ui-layout-header"},[_vm._t("default")],2)};
var __vue_staticRenderFns__$x = [];

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
  

  
  var UiHeader = normalizeComponent_1(
    { render: __vue_render__$x, staticRenderFns: __vue_staticRenderFns__$x },
    __vue_inject_styles__$x,
    {},
    __vue_scope_id__$x,
    __vue_is_functional_template__$x,
    __vue_module_identifier__$x,
    undefined,
    undefined
  );

//
var script$x = {
  name: 'UiSider',
  components: { UiIcon: Icon },
  data: function data() {
    return { prefix: 'ui-layout-sider', isCollapsed: this.value || this.defaultCollapsed }
  },
  props: {
    value: Boolean,
    width: {
      type: [Number, String],
      default: 200
    },
    collapsible: Boolean,
    collapsedWidth: {
      type: [Number, String],
      default: 64
    },
    hideTrigger: Boolean,
    defaultCollapsed: Boolean,
    reverseArrow: Boolean
  },
  computed: {
    styles: function styles() {
      var condition = this.defaultCollapsed || this.collapsible;
      var size = parseSize(condition && this.isCollapsed ? this.collapsedWidth : this.width);
      return { width: size, minWidth: size, maxWidth: size, flex: ("0 0 " + size) }
    },
    showTrigger: function showTrigger() {
      return !this.hideTrigger && this.collapsible
    },
    triggerIcon: function triggerIcon() {
      return this.reverseArrow ? 'ios-arrow-forward' : 'ios-arrow-back'
    }
  },
  watch: {
    value: function value(newVal) {
      this.isCollapsed = newVal;
    }
  },
  methods: {
    toggleCollapse: function toggleCollapse() {
      if (!(this.defaultCollapsed || this.collapsible)) { return }
      this.isCollapsed = !this.isCollapsed;
      this.$emit('input', this.isCollapsed);
      this.$emit('on-change', this.isCollapsed);
    }
  }
};

/* script */
var __vue_script__$x = script$x;

/* template */
var __vue_render__$y = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.prefix,style:(_vm.styles)},[_vm._t("default"),_vm._v(" "),(_vm.showTrigger)?_c('div',{class:(_vm.prefix + "-trigger"),style:({width: _vm.styles.width}),on:{"click":_vm.toggleCollapse}},[_c('UiIcon',{class:[(_vm.prefix + "-trigger-icon"), {isCollapsed: _vm.isCollapsed}],attrs:{"type":"ios-arrow-back"}})],1):_vm._e()],2)};
var __vue_staticRenderFns__$y = [];

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
  

  
  var UiSider = normalizeComponent_1(
    { render: __vue_render__$y, staticRenderFns: __vue_staticRenderFns__$y },
    __vue_inject_styles__$y,
    __vue_script__$x,
    __vue_scope_id__$y,
    __vue_is_functional_template__$y,
    __vue_module_identifier__$y,
    undefined,
    undefined
  );

/* script */

/* template */
var __vue_render__$z = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ui-layout-content"},[_vm._t("default")],2)};
var __vue_staticRenderFns__$z = [];

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
  

  
  var UiContent = normalizeComponent_1(
    { render: __vue_render__$z, staticRenderFns: __vue_staticRenderFns__$z },
    __vue_inject_styles__$z,
    {},
    __vue_scope_id__$z,
    __vue_is_functional_template__$z,
    __vue_module_identifier__$z,
    undefined,
    undefined
  );

/* script */

/* template */
var __vue_render__$A = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ui-layout-footer"},[_vm._t("default")],2)};
var __vue_staticRenderFns__$A = [];

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
  

  
  var UiFooter = normalizeComponent_1(
    { render: __vue_render__$A, staticRenderFns: __vue_staticRenderFns__$A },
    __vue_inject_styles__$A,
    {},
    __vue_scope_id__$A,
    __vue_is_functional_template__$A,
    __vue_module_identifier__$A,
    undefined,
    undefined
  );

var Layout = UiLayout;
var Header = UiHeader;
var Sider = UiSider;
var Content = UiContent;
var Footer = UiFooter;

//
var script$y = {
  name: 'UiTag',
  components: { UiIcon: Icon },
  data: function data() {
    return { prefix: 'ui-tag', isChecked: this.checked }
  },
  props: {
    closable: Boolean,
    checkable: Boolean,
    checked: {
      type: Boolean,
      default: true
    },
    type: {
      validator: function validator(value) {
        return ['border', 'dot'].indexOf(value) !== -1
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
    }
  },
  computed: {
    colorClass: function colorClass() {
      var this$1 = this;

      return [
        'default', 'primary', 'success', 'warning', 'error',
        'blue', 'green', 'red', 'yellow', 'magenta', 'volcano', 'orange', 'gold', 'lime', 'cyan', 'geekblue', 'purple'
      ].find(function (_) { return _ === this$1.color; })
    },
    classes: function classes() {
      return [
        this.prefix, 
        this.colorClass && ((this.prefix) + "-" + (this.colorClass)),
        this.type && ((this.prefix) + "-" + (this.type)),
        { checked: this.isChecked }
      ]
    },
    styles: function styles() {
      return !this.colorClass && { color: '#fff', backgroundColor: this.color }
    }
  },
  watch: {
    checked: function checked(newVal) {
      this.isChecked = newVal;
    }
  },
  methods: {
    onClose: function onClose(event) {
      this.$emit('on-close', event, this.name);
    },
    onClick: function onClick() {
      if (!this.checkable) { return }
      this.isChecked = !this.isChecked;
      this.$emit('on-change', this.isChecked, this.name);
    }
  }
};

/* script */
var __vue_script__$y = script$y;
/* template */
var __vue_render__$B = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.fade)?_c('transition',{attrs:{"name":_vm.prefix}},[_c('div',{class:_vm.classes,style:(_vm.styles),on:{"click":_vm.onClick}},[_vm._t("default"),_vm._v(" "),(_vm.closable)?_c('UiIcon',{class:(_vm.prefix + "-close"),attrs:{"type":"ios-close-empty"},on:{"click":_vm.onClose}}):_vm._e()],2)]):_c('div',{class:_vm.classes,style:(_vm.styles),on:{"click":_vm.onClick}},[_vm._t("default"),_vm._v(" "),(_vm.closable)?_c('UiIcon',{class:(_vm.prefix + "-close"),attrs:{"type":"ios-close-empty"},on:{"click":_vm.onClose}}):_vm._e()],2)};
var __vue_staticRenderFns__$B = [];

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
  

  
  var Tag = normalizeComponent_1(
    { render: __vue_render__$B, staticRenderFns: __vue_staticRenderFns__$B },
    __vue_inject_styles__$B,
    __vue_script__$y,
    __vue_scope_id__$B,
    __vue_is_functional_template__$B,
    __vue_module_identifier__$B,
    undefined,
    undefined
  );

//
var script$z = {
  name: 'UiCollapse',
  data: function data() {
    return { childs: [], names: this.syncModel() }
  },
  props: {
    accordion: Boolean,
    value: [Array, String],
    simple: Boolean
  },
  watch: {
    value: function value(newVal) {
      this.names = this.syncModel();
    },
    names: function names(newval) {
      this.$emit('input', newval);
      this.$emit('on-change', newval);
    }
  },
  methods: {
    isExpand: function isExpand(vm) {
      return this.names.indexOf(vm.name || this.childs.indexOf(vm)) !== -1
    },
    syncModel: function syncModel() {
      return isArr(this.value) ? this.value : [this.value]
    },
    updateModel: function updateModel(vm) {
      var name = vm.name || this.childs.indexOf(vm);
      var index = this.names.indexOf(name);
      if (this.accordion) {
        this.names = index === -1 ? [name] : [];
        return this.childs.forEach(function (_) { return _.name !== name && _.fold(); })
      }
      if (index === -1) { return this.names.push(name) }
      this.names.splice(index, 1);
    },
    addChild: function addChild(vm) {
      this.childs.push(vm);
    }
  }
};

/* script */
var __vue_script__$z = script$z;
/* template */
var __vue_render__$C = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:['ui-collapse', {simple: _vm.simple}]},[_vm._t("default")],2)};
var __vue_staticRenderFns__$C = [];

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
  

  
  var UiCollapse = normalizeComponent_1(
    { render: __vue_render__$C, staticRenderFns: __vue_staticRenderFns__$C },
    __vue_inject_styles__$C,
    __vue_script__$z,
    __vue_scope_id__$C,
    __vue_is_functional_template__$C,
    __vue_module_identifier__$C,
    undefined,
    undefined
  );

//
var script$A = {
  name: 'UiPanel',
  components: { UiIcon: Icon },
  data: function data() {
    return { prefix: 'ui-collapse-item', isExpanded: false }
  },
  props: {
    name: String,
    hideArrow: Boolean
  },
  methods: {
    onHeaderClick: function onHeaderClick() {
      this.isExpanded = !this.isExpanded;
      this.parent.updateModel(this);
    },
    fold: function fold() {
      this.isExpanded = false;
    }
  },
  mounted: function mounted() {
    this.parent = findParent(this, 'UiCollapse');
    this.parent.addChild(this);
    this.isExpanded = this.parent.isExpand(this);
  }
};

/* script */
var __vue_script__$A = script$A;

/* template */
var __vue_render__$D = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.prefix},[_c('div',{class:(_vm.prefix + "-header"),on:{"click":_vm.onHeaderClick}},[(!_vm.hideArrow)?_c('UiIcon',{class:[(_vm.prefix + "-icon"), {isExpanded: _vm.isExpanded}],attrs:{"type":"ios-arrow-forward"}}):_vm._e(),_vm._v(" "),_vm._t("default")],2),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isExpanded),expression:"isExpanded"}],class:(_vm.prefix + "-content")},[_vm._t("content")],2)])};
var __vue_staticRenderFns__$D = [];

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
  

  
  var UiPanel = normalizeComponent_1(
    { render: __vue_render__$D, staticRenderFns: __vue_staticRenderFns__$D },
    __vue_inject_styles__$D,
    __vue_script__$A,
    __vue_scope_id__$D,
    __vue_is_functional_template__$D,
    __vue_module_identifier__$D,
    undefined,
    undefined
  );

var Collapse = UiCollapse;
var Panel = UiPanel;

//
var script$B = {
  name: 'UiCell',
  components: { UiIcon: Icon },
  data: function data() {
    return { prefix: 'ui-cell' }
  },
  props: {
    name: [String, Number],
    title: String,
    label: String,
    extra: String,
    disabled: Boolean,
    selected: Boolean,
    to: [String, Object],
    replace: Boolean,
    target: String,
    append: Boolean
  },
  computed: {
    root: function root() {
      if (this.to) {
        if (!this.target && this.$router) {
          return { name: 'RouterLink', attrs: { to: this.to, replace: this.replace, append: this.append } }
        }
        return { name: 'a', attrs: { target: this.target, href: this.to } }
      }
      return { name: 'div', attrs: {} }
    },
    listeners: function listeners() {
      var that = this;
      return Object.assign({}, this.$listeners, {
        click: function click(event) {
          that.$emit('click', event);
          var parent = findParent(that, 'UiCellGroup');
          parent && parent.$emit('on-click', that.name);
        }
      })
    }
  }
};

/* script */
var __vue_script__$B = script$B;
/* template */
var __vue_render__$E = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.root.name,_vm._g(_vm._b({tag:"div",class:[_vm.prefix, {disabled: _vm.disabled, selected: _vm.selected}]},'div',_vm.root.attrs,false),_vm.listeners),[_c('div',[_c('p',{class:(_vm.prefix + "-title")},[_vm._t("default",[_vm._v(_vm._s(_vm.title))]),_vm._v(" "),_vm._t("icon")],2),_vm._v(" "),_c('p',{class:(_vm.prefix + "-label")},[_vm._t("label",[_vm._v(_vm._s(_vm.label))])],2)]),_vm._v(" "),_c('div',[_vm._t("extra",[_vm._v(_vm._s(_vm.extra))]),_vm._v(" "),(_vm.to)?[_vm._t("arrow",[_c('UiIcon',{attrs:{"type":"ios-arrow-forward"}})])]:_vm._e()],2)])};
var __vue_staticRenderFns__$E = [];

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
  

  
  var UiCell = normalizeComponent_1(
    { render: __vue_render__$E, staticRenderFns: __vue_staticRenderFns__$E },
    __vue_inject_styles__$E,
    __vue_script__$B,
    __vue_scope_id__$E,
    __vue_is_functional_template__$E,
    __vue_module_identifier__$E,
    undefined,
    undefined
  );

//
//
//
//
//

var script$C = {
  name: 'UiCellGroup'
};

/* script */
var __vue_script__$C = script$C;

/* template */
var __vue_render__$F = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._t("default")],2)};
var __vue_staticRenderFns__$F = [];

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
  

  
  var UiCellGroup = normalizeComponent_1(
    { render: __vue_render__$F, staticRenderFns: __vue_staticRenderFns__$F },
    __vue_inject_styles__$F,
    __vue_script__$C,
    __vue_scope_id__$F,
    __vue_is_functional_template__$F,
    __vue_module_identifier__$F,
    undefined,
    undefined
  );

var Cell = UiCell;
var CellGroup = UiCellGroup;

//
var script$D = {
  name: 'UiRadio',
  components: { UiButton: Button },
  data: function data() {
    return { prefix: 'ui-radio', checked: false, parent: null }
  },
  props: {
    label: [String, Number],
    disabled: Boolean
  },
  watch: {
    checked: function checked(newVal) {
      this.$emit('on-change', newVal);
    }
  },
  computed: {
    isButtonType: function isButtonType() {
      return this.parent && this.parent.type === 'button'
    }
  },
  methods: {
    onClick: function onClick() {
      if (this.disabled) { return }
      this.parent.updateValue(this);
    }
  },
  mounted: function mounted() {
    this.parent = findParent(this, 'UiRadioGroup');
    this.parent.addChild(this);
    this.checked = this.parent.value === this.label;
  }
};

/* script */
var __vue_script__$D = script$D;
/* template */
var __vue_render__$G = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.isButtonType)?_c('UiButton',{class:[(_vm.prefix + "-btn"), {checked: _vm.checked}],attrs:{"disabled":_vm.disabled},on:{"click":_vm.onClick}},[_vm._t("default",[_vm._v(_vm._s(_vm.label))])],2):_c('div',{class:[_vm.prefix, {disabled: _vm.disabled}],attrs:{"tabindex":"0"},on:{"click":_vm.onClick}},[_c('span',{class:[(_vm.prefix + "-box"), {checked: _vm.checked}]}),_vm._v(" "),_c('span',[_vm._t("default",[_vm._v(_vm._s(_vm.label))])],2)])};
var __vue_staticRenderFns__$G = [];

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
  

  
  var UiRadio = normalizeComponent_1(
    { render: __vue_render__$G, staticRenderFns: __vue_staticRenderFns__$G },
    __vue_inject_styles__$G,
    __vue_script__$D,
    __vue_scope_id__$G,
    __vue_is_functional_template__$G,
    __vue_module_identifier__$G,
    undefined,
    undefined
  );

//
var script$E = {
  name: 'UiRadioGroup',
  components: { ButtonGroup: ButtonGroup },
  data: function data() {
    return { checkedValue: this.value, childs: [] }
  },
  props: {
    value: [String, Number],
    type: {
      validator: function validator(value) {
        return value === 'button'
      }
    },
    size: {
      validator: function validator(value) {
        return ['large', 'small', 'default'].indexOf(value) !== -1
      }
    },
    vertical: Boolean
  },
  watch: {
    value: function value(newVal) {
      this.checkedValue = newVal;
    }
  },
  methods: {
    addChild: function addChild(vm) {
      this.childs.push(vm);
    },
    updateValue: function updateValue(vm) {
      this.childs.forEach(function (_) { return _.checked = false; });
      vm.checked = true;
      this.checkedValue = vm.label;
      this.$emit('input', this.checkedValue);
      this.$emit('on-change', this.checkedValue);
    }
  }
};

/* script */
var __vue_script__$E = script$E;

/* template */
var __vue_render__$H = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.type === 'button')?_c('ButtonGroup',{staticClass:"ui-radio-group isButtonType",attrs:{"size":_vm.size}},[_vm._t("default")],2):_c('div',{staticClass:"ui-radio-group",class:{vertical: _vm.vertical}},[_vm._t("default")],2)};
var __vue_staticRenderFns__$H = [];

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
  

  
  var UiRadioGroup = normalizeComponent_1(
    { render: __vue_render__$H, staticRenderFns: __vue_staticRenderFns__$H },
    __vue_inject_styles__$H,
    __vue_script__$E,
    __vue_scope_id__$H,
    __vue_is_functional_template__$H,
    __vue_module_identifier__$H,
    undefined,
    undefined
  );

var Radio = UiRadio;
var RadioGroup = UiRadioGroup;

//
var script$F = {
  name: 'UiTabs',
  components: { UiIcon: Icon, UiCloseIconButton: CloseIconButton, UiRender: UiRender },
  data: function data() {
    return {
      prefix: 'ui-tabs',
      childs: [],
      activeTab: this.value,
      showNavBtns: false,
      translateX: 0
    }
  },
  props: {
    value: [String, Number],
    type: {
      default: 'line',
      validator: function validator(value) {
        return ['line', 'card'].indexOf(value) !== -1
      }
    },
    size: {
      validator: function validator(value) {
        return ['default', 'small'].indexOf(value) !== -1
      }
    },
    closable: Boolean,
    animated: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    contentStyle: function contentStyle() {
      var i = this.childs.map(function (_) { return _.key; }).indexOf(this.activeTab);
      return i > 0 && { transform: ("translateX(" + (-i * 100) + "%)") }
    }
  },
  watch: {
    value: function value(newval) {
      this.activeTab = newval;
    },
    activeTab: function activeTab(newval) {
      this.$emit('input', newval);
    },
    childs: function childs(newval) {
      if (newval.length) {
        if (this.activeTab === undefined) { this.activeTab = this.childs[0].key; }
      } else {
        this.activeTab = undefined;
      }
    }
  },
  mounted: function mounted() {
    this.onWinResize();
    window.addEventListener('resize', this.onWinResize);
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('resize', this.onWinResize);
  },
  methods: {
    navItemClasses: function navItemClasses(item) {
      return [((this.prefix) + "-nav-item"), { active: item.key === this.activeTab, disabled: item.disabled }]
    },
    addItem: function addItem(vm) {
      var this$1 = this;

      this.$nextTick(function () { return this$1.onWinResize(); });
      return this.childs.push(vm)
    },
    removeItem: function removeItem(vm) {
      var this$1 = this;

      var i = this.childs.indexOf(vm);
      this.childs.splice(i, 1);
      if (vm.key === this.activeTab && this.childs.length) { this.activeTab = this.childs[i > 0 ? i - 1 : 0].key; }
      this.$nextTick(function () { return this$1.onWinResize(); });
    },
    deleteItem: function deleteItem(item) {
      this.$emit('on-tab-remove', item.key);
    },
    onNavItemClick: function onNavItemClick(item) {
      this.activeTab = item.key;
      var ref = this.$refs;
      var scrollView = ref.scrollView;
      var target = this.$refs[item.key][0];
      var targetRect = target.getBoundingClientRect();
      var scrollViewLeft = scrollView.getBoundingClientRect().left + Math.abs(this.translateX);
      if (scrollViewLeft + scrollView.clientWidth < targetRect.right) {
        this.onNavNext(target.clientWidth);
      } else if (scrollViewLeft > targetRect.left) {
        this.onNavPrev(target.clientWidth);
      }
    },
    isFunc: function isFunc$1(label) {
      return isFunc(label)
    },
    canClose: function canClose(item) {
      return item.closable === false ? false : this.closable && this.type === 'card'
    },
    onNavPrev: function onNavPrev(dis) {
      var ref = this.$refs.scrollView;
      var clientWidth = ref.clientWidth;
      var scrollWidth = ref.scrollWidth;
      var maxDis = Math.min(Math.abs(this.translateX), dis || Infinity);
      this.translateX += Math.min(clientWidth, maxDis > 0 ? maxDis : 0);
    },
    onNavNext: function onNavNext(dis) {
      var ref = this.$refs.scrollView;
      var clientWidth = ref.clientWidth;
      var scrollWidth = ref.scrollWidth;
      var maxDis = Math.min(scrollWidth - clientWidth - Math.abs(this.translateX), dis || Infinity);
      this.translateX -= Math.min(clientWidth, maxDis > 0 ? maxDis : 0);
    },
    onWinResize: function onWinResize() {
      var ref = this.$refs;
      var scrollView = ref.scrollView;
      if (!scrollView) { return }
      var clientWidth = scrollView.clientWidth;
      var scrollWidth = scrollView.scrollWidth;
      if (clientWidth + Math.abs(this.translateX) > scrollWidth) {
        this.translateX = -scrollWidth + clientWidth;
      }
      this.showNavBtns = clientWidth < scrollWidth;
    }
  }
};

/* script */
var __vue_script__$F = script$F;
/* template */
var __vue_render__$I = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:[_vm.prefix, (_vm.prefix + "-" + _vm.size), (_vm.prefix + "-" + _vm.type)]},[_c('div',{class:(_vm.prefix + "-bar")},[_c('div',{class:[(_vm.prefix + "-nav-wrap"), {showNavBtns: _vm.showNavBtns}]},[_c('ul',{ref:"scrollView",class:(_vm.prefix + "-nav"),style:({transform: ("translateX(" + _vm.translateX + "px)")})},_vm._l((_vm.childs),function(item){return _c('li',{key:item.key,ref:item.key,refInFor:true,class:_vm.navItemClasses(item),on:{"click":function($event){return _vm.onNavItemClick(item)}}},[(item.icon)?_c('ui-icon',{class:(_vm.prefix + "-icon"),attrs:{"type":item.icon}}):_vm._e(),_vm._v(" "),(_vm.isFunc(item.label))?_c('UiRender',{attrs:{"render":item.label}}):[_vm._v(_vm._s(item.label))],_vm._v(" "),(_vm.canClose(item))?_c('ui-close-icon-button',{class:(_vm.prefix + "-close"),on:{"click":function($event){$event.stopPropagation();return _vm.deleteItem(item)}}}):_vm._e()],2)}),0),_vm._v(" "),(_vm.showNavBtns)?[_c('span',{class:(_vm.prefix + "-nav-prev"),on:{"click":function($event){return _vm.onNavPrev()}}},[_c('ui-icon',{attrs:{"type":"ios-arrow-back"}})],1),_vm._v(" "),_c('span',{class:(_vm.prefix + "-nav-next"),on:{"click":function($event){return _vm.onNavNext()}}},[_c('ui-icon',{attrs:{"type":"ios-arrow-forward"}})],1)]:_vm._e()],2),_vm._v(" "),_vm._t("extra")],2),_vm._v(" "),_c('div',{class:[(_vm.prefix + "-content"), {animated: _vm.animated}],style:(_vm.contentStyle)},[_vm._t("default")],2)])};
var __vue_staticRenderFns__$I = [];

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
  

  
  var UiTabs = normalizeComponent_1(
    { render: __vue_render__$I, staticRenderFns: __vue_staticRenderFns__$I },
    __vue_inject_styles__$I,
    __vue_script__$F,
    __vue_scope_id__$I,
    __vue_is_functional_template__$I,
    __vue_module_identifier__$I,
    undefined,
    undefined
  );

//
var script$G = {
  name: 'UiTabPane',
  data: function data() {
    return { key: this.name, parent: null }
  },
  props: {
    name: String,
    label: [String, Function],
    icon: String,
    disabled: Boolean,
    closable: {
      type: Boolean,
      default: null
    }
  },
  mounted: function mounted() {
    this.parent = findParent(this, 'UiTabs');
    var len = this.parent.addItem(this);
    this.key = this.name || len - 1;
  },
  beforeDestroy: function beforeDestroy() {
    this.parent.removeItem(this);
  }
};

/* script */
var __vue_script__$G = script$G;

/* template */
var __vue_render__$J = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ui-tabs-pane"},[_vm._t("default")],2)};
var __vue_staticRenderFns__$J = [];

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
  

  
  var UiTabPane = normalizeComponent_1(
    { render: __vue_render__$J, staticRenderFns: __vue_staticRenderFns__$J },
    __vue_inject_styles__$J,
    __vue_script__$G,
    __vue_scope_id__$J,
    __vue_is_functional_template__$J,
    __vue_module_identifier__$J,
    undefined,
    undefined
  );

var Tabs = UiTabs;
var TabPane = UiTabPane;

//
var script$H = {
  name: 'UiInput',
  components: { UiIcon: Icon },
  data: function data() {
    return { prefixCls: 'ui-input' }
  },
  props: {
    value: [String, Number],
    size: {
      default: 'default',
      validator: function validator(value) {
        return ['small', 'default', 'large'].indexOf(value) !== -1
      }
    },
    clearable: Boolean,
    icon: String,
    prefix: String,
    suffix: String,
    search: Boolean,
    enterButton: [Boolean, String],
    rows: {
      type: [Number, String],
      default: 2
    },
    autosize: [Boolean, Object]
  },
  computed: {
    hasPrefix: function hasPrefix() {
      return this.prefix || this.$slots.prefix
    },
    hasSuffix: function hasSuffix() {
      return this.suffix || this.$slots.suffix
    },
    hasAppend: function hasAppend() {
      return this.$slots.append
    },
    hasSearchAppend: function hasSearchAppend() {
      return this.search && this.enterButton
    },
    isArea: function isArea() {
      return this.$attrs.type === 'textarea'
    },
    bindProps: function bindProps() {
      var ref = this;
      var autosize = ref.autosize; if ( autosize === void 0 ) autosize = false;
      var rows = ref.rows;
      if (autosize.minRows && autosize.minRows > rows) {
        rows = autosize.minRows;
      } else if (autosize.maxRows && autosize.maxRows < rows) {
        rows = autosize.maxRows;
      }
      return Object.assign({}, this.$attrs, {rows: rows, ref: 'Input', value: this.value})
    },
    listeners: function listeners() {
      var that = this;
      return Object.assign({}, this.$listeners, {
        input: function input(event) {
          if (that.isArea && that.autosize) {
            if (typeof that.autosize === 'boolean') {
              setAutoHeight(event.target);
            } else {
              setAutoHeight(event.target, that.autosize.minRows, that.autosize.maxRows);
            }
          }
          that.$emit('input', event.target.value);
        },
        focus: function focus() {
          that.$emit('on-focus');
        },
        blur: function blur() {
          that.$emit('on-blur');
        },
        change: function change(event) {
          that.$emit('on-change', event);
        },
        keyup: function keyup(event) {
          that.$emit('on-keyup', event);
          if (event.keyCode === 13) {
            that.$emit('on-enter');
            if (that.search) { that.onSearch(); }
          }
        },
        keydown: function keydown(event) {
          that.$emit('on-keydown', event);
        },
        keypress: function keypress(event) {
          that.$emit('on-keypress', event);
        }
      })
    }
  },
  methods: {
    focus: function focus() {
      this.$refs.Input.focus();
    },
    clear: function clear() {
      this.$emit('input', '');
    },
    onIconClick: function onIconClick() {
      this.$emit('on-click');
    },
    onSearch: function onSearch() {
      this.focus();
      this.$emit('on-search', this.$refs.Input.value);
    }
  }
};

/* script */
var __vue_script__$H = script$H;
/* template */
var __vue_render__$K = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:[_vm.prefixCls, !_vm.isArea && (_vm.prefixCls + "-" + _vm.size)]},[(_vm.$slots.prepend)?_c('div',{class:(_vm.prefixCls + "-prepend")},[_vm._t("prepend")],2):_vm._e(),_vm._v(" "),_c('div',{class:[(_vm.prefixCls + "-box"), {hasAppend: _vm.hasAppend || _vm.hasSearchAppend}]},[(_vm.isArea)?_c('textarea',_vm._g(_vm._b({class:(_vm.prefixCls + "-input textarea")},'textarea',_vm.bindProps,false),_vm.listeners)):[(_vm.hasPrefix)?_c('span',{class:(_vm.prefixCls + "-prefix")},[_vm._t("prefix",[_c('ui-icon',{attrs:{"type":_vm.prefix}})])],2):_vm._e(),_vm._v(" "),(_vm.hasSuffix)?_c('span',{class:(_vm.prefixCls + "-suffix")},[_vm._t("suffix",[_c('ui-icon',{attrs:{"type":_vm.suffix}})])],2):(_vm.icon)?_c('span',{class:(_vm.prefixCls + "-suffix"),on:{"click":_vm.onIconClick}},[_c('ui-icon',{attrs:{"type":_vm.icon}})],1):(_vm.search && !_vm.enterButton)?_c('span',{class:(_vm.prefixCls + "-suffix search"),on:{"click":_vm.onSearch}},[_c('ui-icon',{attrs:{"type":"ios-search"}})],1):(_vm.clearable && _vm.value)?_c('span',{class:(_vm.prefixCls + "-suffix clear"),on:{"click":_vm.clear}},[_c('ui-icon',{attrs:{"type":"ios-close"}})],1):_vm._e(),_vm._v(" "),_c('input',_vm._g(_vm._b({class:(_vm.prefixCls + "-input")},'input',_vm.bindProps,false),_vm.listeners))]],2),_vm._v(" "),(_vm.hasAppend)?_c('div',{class:(_vm.prefixCls + "-append")},[_vm._t("append")],2):(_vm.hasSearchAppend)?_c('div',{class:(_vm.prefixCls + "-search"),on:{"click":_vm.onSearch}},[(_vm.enterButton === true)?_c('ui-icon',{attrs:{"type":"ios-search"}}):[_vm._v(_vm._s(_vm.enterButton))]],2):_vm._e()])};
var __vue_staticRenderFns__$K = [];

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
  

  
  var Input = normalizeComponent_1(
    { render: __vue_render__$K, staticRenderFns: __vue_staticRenderFns__$K },
    __vue_inject_styles__$K,
    __vue_script__$H,
    __vue_scope_id__$K,
    __vue_is_functional_template__$K,
    __vue_module_identifier__$K,
    undefined,
    undefined
  );

//
//
//

var script$I = {
  
};

/* script */
var __vue_script__$I = script$I;
/* template */
var __vue_render__$L = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div')};
var __vue_staticRenderFns__$L = [];

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
  

  
  var Upload = normalizeComponent_1(
    { render: __vue_render__$L, staticRenderFns: __vue_staticRenderFns__$L },
    __vue_inject_styles__$L,
    __vue_script__$I,
    __vue_scope_id__$L,
    __vue_is_functional_template__$L,
    __vue_module_identifier__$L,
    undefined,
    undefined
  );

//
var script$J = {
  components: { UiIcon: Icon, UiInput: Input },
  data: function data() {
    return {
      inputValue: this.setValue(this.value)
    }
  },
  props: {
    max: {
      type: Number,
      default: Infinity
    },
    min: {
      type: Number,
      default: -Infinity
    },
    value: {
      type: [Number, String],
      default: 1
    },
    step: {
      type: Number,
      default: 1
    },
    size: {
      validator: function validator(value) {
        return ['large', 'small', 'default'].indexOf(value) !== -1
      }
    },
    disabled: Boolean,
    placeholder: String,
    formatter: Function,
    parser: Function,
    readonly: Boolean,
    editable: {
      type: Boolean,
      default: true
    },
    precision: Number,
    elementId: String
  },
  computed: {
    disabledAdd: function disabledAdd() {
      return +this.inputValue + this.step > this.max
    },
    disabledMinus: function disabledMinus() {
      return +this.inputValue - this.step < this.min
    },
    prec: function prec() {
      var s = this.step.toString().split('.')[1];
      var digits = s ? s.length : 0;
      return this.precision || digits
    }
  },
  watch: {
    inputValue: function inputValue(newVal, oldVal) {
      var this$1 = this;

      if (!newVal) { return }
      if (newVal.toString().split('').reverse()[0] === '.') { return }
      this.$nextTick(function () { return this$1.$refs.UiInput.$el.querySelector('input').value = newVal; });
      this.$emit('input', +newVal);
    },
    value: function value(newVal) {
      this.inputValue = this.setValue(newVal);
    }
  },
  methods: {
    setValue: function setValue(val) {
      return Math.min(Math.max(+val, this.min), this.max)
    },
    add: function add() {
      if (this.readonly) { return }
      if (+this.inputValue + this.step <= this.max) {
        this.inputValue = (+this.inputValue + this.step).toFixed(this.prec);
      }
    },
    minus: function minus() {
      if (this.readonly) { return }
      if (+this.inputValue - this.step >= this.min) {
        this.inputValue = (+this.inputValue - this.step).toFixed(this.prec);
      }
    },
    handleKeydown: function handleKeydown(event) {
      if (event.keyCode === 40) {
        event.preventDefault();
        this.minus();
      } else if (event.keyCode === 38) {
        event.preventDefault();
        this.add();
      }
    },
    handleKeypress: function handleKeypress(event) {
      var ref = event.target;
      var value = ref.value;
      if (event.keyCode === 46) {
        if (value.length === 0 || value.indexOf('.') !== -1) {
          return event.preventDefault()
        }
      }
      if (event.keyCode && (event.keyCode < 48 || event.keyCode > 57) && event.keyCode != 8 && event.keyCode != 46) {
        return event.preventDefault()
      }
    },
    handleBlur: function handleBlur() {
      this.inputValue = this.setValue(this.inputValue);
    }
  }
};

/* script */
var __vue_script__$J = script$J;
/* template */
var __vue_render__$M = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ui-input-number"},[_c('UiInput',{ref:"UiInput",attrs:{"elementId":_vm.elementId,"size":_vm.size,"disabled":_vm.disabled,"readonly":_vm.readonly||!_vm.editable},on:{"on-keydown":_vm.handleKeydown,"on-keypress":_vm.handleKeypress,"on-blur":_vm.handleBlur},model:{value:(_vm.inputValue),callback:function ($$v) {_vm.inputValue=$$v;},expression:"inputValue"}}),_vm._v(" "),(!_vm.disabled)?_c('div',{staticClass:"ui-input-number-actions"},[_c('a',{staticClass:"ui-input-number-action",class:{disabled: _vm.disabledAdd},on:{"click":_vm.add}},[_c('UiIcon',{attrs:{"type":"ios-arrow-up"}})],1),_vm._v(" "),_c('a',{staticClass:"ui-input-number-action",class:{disabled: _vm.disabledMinus},on:{"click":_vm.minus}},[_c('UiIcon',{attrs:{"type":"ios-arrow-down"}})],1)]):_vm._e()],1)};
var __vue_staticRenderFns__$M = [];

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
  

  
  var InputNumber = normalizeComponent_1(
    { render: __vue_render__$M, staticRenderFns: __vue_staticRenderFns__$M },
    __vue_inject_styles__$M,
    __vue_script__$J,
    __vue_scope_id__$M,
    __vue_is_functional_template__$M,
    __vue_module_identifier__$M,
    undefined,
    undefined
  );

//
var script$K = {
  components: { UiButton: Button, UiCheckbox: Checkbox, UiInput: Input, UiIcon: Icon },
  data: function data() {
    return {
      selectAllOfLeft: false,
      selectAllOfRight: false,
      leftSearchValue: '',
      rightSearchValue: '',
      selectedData: { left: [], right: [] },
      hasSlot: false
    }
  },
  props: {
    data: {
      type: Array,
      default: function () { return []; }
    },
    targetKeys: {
      type: Array,
      default: function () { return []; }
    },
    renderFormat: Function,
    selectedKeys: {
      type: Array,
      default: function () { return []; }
    },
    boxStyle: {
      type: Object,
      default: function () { return ({}); }
    },
    listStyle: {
      type: Object,
      default: function () { return ({}); }
    },
    titles: {
      type: Array,
      default: function () { return ['源列表', '目标列表']; }
    },
    operations: {
      type: Array,
      default: function () { return []; }
    },
    filterable: Boolean,
    filterPlaceholder: {
      type: String,
      default: '请输入搜索内容'
    },
    filterMethod: Function,
    notFoundText: {
      type: String,
      default: '列表为空'
    }
  },
  computed: {
    convertData: function convertData() {
      var this$1 = this;

      var rtnData = { left: [], right: [] };
      this.data.forEach(function (_) {
        var item = Object.assign({}, _, {checked: this$1.selectedKeys.indexOf(_.key) !== -1});
        rtnData[this$1.targetKeys.indexOf(_.key) === -1 ? 'left' : 'right'].push(item);
      });
      return rtnData
    },
    leftData: function leftData() {
      return this.convertData.left
    },
    rightData: function rightData() {
      return this.convertData.right
    },
    searchData: function searchData() {
      var this$1 = this;

      return {
        left: this.filterMethod ? 
          this.filterMethod(this.leftData, this.leftSearchValue) : 
          this.leftData.filter(function (_) { return _.label && _.label.indexOf(this$1.leftSearchValue) !== -1; }),
        right: this.filterMethod ? 
          this.filterMethod(this.rightData, this.rightSearchValue) : 
          this.rightData.filter(function (_) { return _.label && _.label.indexOf(this$1.rightSearchValue) !== -1; })
      }
    },
    leftTargetData: function leftTargetData() {
      return this.leftSearchValue ? this.searchData.left : this.leftData
    },
    rightTargetData: function rightTargetData() {
      return this.rightSearchValue ? this.searchData.right : this.rightData
    },
    leftCountText: function leftCountText() {
      var selectedCount = this.selectedData.left.length;
      return selectedCount ? (selectedCount + "/" + (this.leftData.length)) : this.leftData.length
    },
    rightCountText: function rightCountText() {
      var selectedCount = this.selectedData.right.length;
      return selectedCount ? (selectedCount + "/" + (this.rightData.length)) : this.rightData.length
    },
    disabledLeft: function disabledLeft() {
      return !this.selectedData.right.length
    },
    disabledRight: function disabledRight() {
      return !this.selectedData.left.length
    },
    diaabledSelectAllOfLeft: function diaabledSelectAllOfLeft() {
      return this.leftData.every(function (_) { return _.disabled; })
    },
    disabledSelectAllOfRight: function disabledSelectAllOfRight() {
      return this.rightData.every(function (_) { return _.disabled; })
    }
  },
  watch: {
    targetKeys: function targetKeys(newVal) {
      this.setSelectedData();
    }
  },
  methods: {
    renderItem: function renderItem(item) {
      return this.renderFormat ? this.renderFormat(item) : item.label || item.key
    },
    setSelectedData: function setSelectedData() {
      var left = this.leftData.filter(function (_) { return _.checked; });
      var right = this.rightData.filter(function (_) { return _.checked; });
      this.selectedData = { left: left, right: right };
      this.selectAllOfLeft = this.leftData.every(function (_) { return _.disabled || _.checked; });
      this.selectAllOfRight = this.rightData.every(function (_) { return _.disabled || _.checked; });
      if (this.leftData.every(function (_) { return _.disabled; })) {
        this.selectAllOfLeft = false;
      }
      if (this.rightData.every(function (_) { return _.disabled; })) {
        this.selectAllOfRight = false;
      }
    },
    handleSelectedChange: function handleSelectedChange() {
      this.setSelectedData();
      var ref = this.selectedData;
      var left = ref.left;
      var right = ref.right;
      this.$emit('on-selected-change', left.map(function (_) { return _.key; }), right.map(function (_) { return _.key; }));
    },
    toggleSelectAllOfLeft: function toggleSelectAllOfLeft(checked) {
      this.leftData.forEach(function (_) { return !_.disabled && (_.checked = checked); });
      this.handleSelectedChange();
    },
    toggleSelectAllOfRight: function toggleSelectAllOfRight(checked) {
      this.rightData.forEach(function (_) { return !_.disabled && (_.checked = checked); });
      this.handleSelectedChange();
    },
    moveToLeft: function moveToLeft() {
      var moveKeys = this.selectedData.right.map(function (_) { return _.key; });
      var targetKeys = this.rightData.filter(function (_) { return moveKeys.indexOf(_.key) === -1; }).map(function (_) { return _.key; });
      this.$emit('on-change', targetKeys, 'left', moveKeys);
    },
    moveToRight: function moveToRight() {
      var moveKeys = this.selectedData.left.map(function (_) { return _.key; });
      var targetKeys = this.rightData.map(function (_) { return _.key; }).concat(moveKeys);
      this.$emit('on-change', targetKeys, 'right', moveKeys);
    }
  },
  mounted: function mounted() {
    this.setSelectedData();
    this.hasSlot = this.$slots.default !== undefined;
  }
};

/* script */
var __vue_script__$K = script$K;
/* template */
var __vue_render__$N = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ui-transfer"},[_c('div',{staticClass:"ui-transfer-list",style:(_vm.boxStyle)},[_c('div',{staticClass:"ui-transfer-list-header"},[_c('ui-checkbox',{attrs:{"disabled":_vm.diaabledSelectAllOfLeft},on:{"on-change":_vm.toggleSelectAllOfLeft},model:{value:(_vm.selectAllOfLeft),callback:function ($$v) {_vm.selectAllOfLeft=$$v;},expression:"selectAllOfLeft"}},[_vm._v("\n        "+_vm._s(_vm.titles[0])+"\n      ")]),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.leftCountText))])],1),_vm._v(" "),_c('div',{staticClass:"ui-transfer-list-body"},[(_vm.filterable)?_c('div',{staticClass:"ui-transfer-search"},[_c('UiInput',{attrs:{"size":"small","clearable":"","placeholder":_vm.filterPlaceholder},model:{value:(_vm.leftSearchValue),callback:function ($$v) {_vm.leftSearchValue=(typeof $$v === 'string'? $$v.trim(): $$v);},expression:"leftSearchValue"}})],1):_vm._e(),_vm._v(" "),_c('ul',{staticClass:"ui-transfer-list-content",style:(_vm.listStyle)},[(_vm.leftTargetData.length)?_vm._l((_vm.leftTargetData),function(item){return _c('li',{key:item.key,staticClass:"ui-transfer-list-content-item",attrs:{"title":_vm.renderItem(item)}},[_c('ui-checkbox',{attrs:{"disabled":item.disabled},on:{"on-change":_vm.handleSelectedChange},model:{value:(item.checked),callback:function ($$v) {_vm.$set(item, "checked", $$v);},expression:"item.checked"}},[_vm._v("\n              "+_vm._s(_vm.renderItem(item))+"\n            ")])],1)}):_c('li',{staticClass:"ui-transfer-list-content-empty"},[_vm._v(_vm._s(_vm.notFoundText))])],2)]),_vm._v(" "),(_vm.hasSlot)?_c('div',{staticClass:"ui-transfer-list-footer"},[_vm._t("default")],2):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"ui-transfer-operation"},[(_vm.operations[0])?_c('ui-button',{attrs:{"type":"primary","size":"small","disabled":_vm.disabledLeft},on:{"click":_vm.moveToLeft}},[_c('UiIcon',{attrs:{"type":"ios-arrow-left"}}),_vm._v("\n      "+_vm._s(_vm.operations[0])+"\n    ")],1):_c('ui-button',{attrs:{"type":"primary","size":"small","icon":"ios-arrow-left","disabled":_vm.disabledLeft},on:{"click":_vm.moveToLeft}}),_vm._v(" "),(_vm.operations[1])?_c('ui-button',{attrs:{"type":"primary","size":"small","disabled":_vm.disabledRight},on:{"click":_vm.moveToRight}},[_vm._v("\n      "+_vm._s(_vm.operations[1])+"\n      "),_c('UiIcon',{attrs:{"type":"ios-arrow-right"}})],1):_c('ui-button',{attrs:{"type":"primary","size":"small","icon":"ios-arrow-right","disabled":_vm.disabledRight},on:{"click":_vm.moveToRight}})],1),_vm._v(" "),_c('div',{staticClass:"ui-transfer-list",style:(_vm.boxStyle)},[_c('div',{staticClass:"ui-transfer-list-header"},[_c('ui-checkbox',{attrs:{"disabled":_vm.disabledSelectAllOfRight},on:{"on-change":_vm.toggleSelectAllOfRight},model:{value:(_vm.selectAllOfRight),callback:function ($$v) {_vm.selectAllOfRight=$$v;},expression:"selectAllOfRight"}},[_vm._v("\n        "+_vm._s(_vm.titles[1])+"\n      ")]),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.rightCountText))])],1),_vm._v(" "),_c('div',{staticClass:"ui-transfer-list-body"},[(_vm.filterable)?_c('div',{staticClass:"ui-transfer-search"},[_c('UiInput',{attrs:{"size":"small","clearable":"","placeholder":_vm.filterPlaceholder},model:{value:(_vm.rightSearchValue),callback:function ($$v) {_vm.rightSearchValue=(typeof $$v === 'string'? $$v.trim(): $$v);},expression:"rightSearchValue"}})],1):_vm._e(),_vm._v(" "),_c('ul',{staticClass:"ui-transfer-list-content",style:(_vm.listStyle)},[(_vm.rightTargetData.length)?_vm._l((_vm.rightTargetData),function(item){return _c('li',{key:item.key,staticClass:"ui-transfer-list-content-item",attrs:{"title":_vm.renderItem(item)}},[_c('ui-checkbox',{attrs:{"disabled":item.disabled},on:{"on-change":_vm.handleSelectedChange},model:{value:(item.checked),callback:function ($$v) {_vm.$set(item, "checked", $$v);},expression:"item.checked"}},[_vm._v("\n              "+_vm._s(_vm.renderItem(item))+"\n            ")])],1)}):_c('li',{staticClass:"ui-transfer-list-content-empty"},[_vm._v(_vm._s(_vm.notFoundText))])],2)]),_vm._v(" "),(_vm.hasSlot)?_c('div',{staticClass:"ui-transfer-list-footer"},[_vm._t("default")],2):_vm._e()])])};
var __vue_staticRenderFns__$N = [];

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
  

  
  var Transfer = normalizeComponent_1(
    { render: __vue_render__$N, staticRenderFns: __vue_staticRenderFns__$N },
    __vue_inject_styles__$N,
    __vue_script__$K,
    __vue_scope_id__$N,
    __vue_is_functional_template__$N,
    __vue_module_identifier__$N,
    undefined,
    undefined
  );

//
//
//

var script$L = {
  
};

/* script */
var __vue_script__$L = script$L;
/* template */
var __vue_render__$O = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div')};
var __vue_staticRenderFns__$O = [];

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
  

  
  var ColorPicker = normalizeComponent_1(
    { render: __vue_render__$O, staticRenderFns: __vue_staticRenderFns__$O },
    __vue_inject_styles__$O,
    __vue_script__$L,
    __vue_scope_id__$O,
    __vue_is_functional_template__$O,
    __vue_module_identifier__$O,
    undefined,
    undefined
  );

//
//
//

var script$M = {
  
};

/* script */
var __vue_script__$M = script$M;
/* template */
var __vue_render__$P = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div')};
var __vue_staticRenderFns__$P = [];

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
  

  
  var Cascader = normalizeComponent_1(
    { render: __vue_render__$P, staticRenderFns: __vue_staticRenderFns__$P },
    __vue_inject_styles__$P,
    __vue_script__$M,
    __vue_scope_id__$P,
    __vue_is_functional_template__$P,
    __vue_module_identifier__$P,
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

//
var script$N = {
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
var __vue_script__$N = script$N;
/* template */
var __vue_render__$Q = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":"ui-dropdown"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.visible),expression:"visible"}],staticClass:"ui-select-dropdown",class:{multiple: _vm.multiple},style:(_vm.styles)},[_c('div',{staticClass:"ui-select-empty"},[_vm._t("empty")],2),_vm._v(" "),_vm._t("default")],2)])};
var __vue_staticRenderFns__$Q = [];

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
  

  
  var UiDrop = normalizeComponent_1(
    { render: __vue_render__$Q, staticRenderFns: __vue_staticRenderFns__$Q },
    __vue_inject_styles__$Q,
    __vue_script__$N,
    __vue_scope_id__$Q,
    __vue_is_functional_template__$Q,
    __vue_module_identifier__$Q,
    undefined,
    undefined
  );

//
var script$O = {
  name: 'ui-dropdown',
  components: { UiOptionList: UiDrop },
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
var __vue_script__$O = script$O;
/* template */
var __vue_render__$R = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"winclick",rawName:"v-winclick",value:(_vm.handleWinClick),expression:"handleWinClick"}],staticClass:"ui-dropdown"},[_c('div',{staticClass:"ui-dropdown-rel",on:{"mouseenter":_vm.handleMouseenter,"mouseleave":_vm.handleMouseleave,"click":_vm.handleClick}},[_vm._t("default")],2),_vm._v(" "),_c('ui-option-list',{ref:"Drop",attrs:{"parentName":_vm.$options.name,"visible":_vm.isVisible},nativeOn:{"mouseenter":function($event){return _vm.handleDropMouseenter($event)},"mouseleave":function($event){return _vm.handleDropMouseleave($event)}}},[_vm._t("list")],2)],1)};
var __vue_staticRenderFns__$R = [];

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
  

  
  var UiDropdown = normalizeComponent_1(
    { render: __vue_render__$R, staticRenderFns: __vue_staticRenderFns__$R },
    __vue_inject_styles__$R,
    __vue_script__$O,
    __vue_scope_id__$R,
    __vue_is_functional_template__$R,
    __vue_module_identifier__$R,
    undefined,
    undefined
  );

//
var script$P = {
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
var __vue_script__$P = script$P;
/* template */
var __vue_render__$S = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{staticClass:"ui-dropdown-item",class:{divided: _vm.divided}},[_c('div',{staticClass:"ui-dropdown-item-btn",class:{ selected: _vm.selected, disabled: _vm.disabled},on:{"click":_vm.handleClick}},[_vm._t("default")],2)])};
var __vue_staticRenderFns__$S = [];

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
  

  
  var UiDropdownItem = normalizeComponent_1(
    { render: __vue_render__$S, staticRenderFns: __vue_staticRenderFns__$S },
    __vue_inject_styles__$S,
    __vue_script__$P,
    __vue_scope_id__$S,
    __vue_is_functional_template__$S,
    __vue_module_identifier__$S,
    undefined,
    undefined
  );

/* script */

/* template */
var __vue_render__$T = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{staticClass:"ui-dropdown-menu"},[_vm._t("default")],2)};
var __vue_staticRenderFns__$T = [];

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
  

  
  var UiDropdownMenu = normalizeComponent_1(
    { render: __vue_render__$T, staticRenderFns: __vue_staticRenderFns__$T },
    __vue_inject_styles__$T,
    {},
    __vue_scope_id__$T,
    __vue_is_functional_template__$T,
    __vue_module_identifier__$T,
    undefined,
    undefined
  );

var Dropdown = UiDropdown;
var DropdownItem = UiDropdownItem;
var DropdownMenu = UiDropdownMenu;

//
//
//

var script$Q = {
  name: 'ui-form',
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
    validate: function validate(callback) {

    },
    validateField: function validateField(prop, callback) {

    },
    resetFields: function resetFields() {

    }
  }
};

/* script */
var __vue_script__$Q = script$Q;
/* template */
var __vue_render__$U = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form',{staticClass:"ui-form",class:[_vm.labelPosition, {inline: _vm.inline}],attrs:{"autocomplete":_vm.autocomplete}},[_vm._t("default")],2)};
var __vue_staticRenderFns__$U = [];

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
  

  
  var UiForm = normalizeComponent_1(
    { render: __vue_render__$U, staticRenderFns: __vue_staticRenderFns__$U },
    __vue_inject_styles__$U,
    __vue_script__$Q,
    __vue_scope_id__$U,
    __vue_is_functional_template__$U,
    __vue_module_identifier__$U,
    undefined,
    undefined
  );

//
var script$R = {
  data: function data() {
    return {
      parent: null
    }
  },
  props: {
    prop: String,
    label: String,
    labelWidth: [Number, String],
    labelFor: String,
    required: Boolean,
    rules: [Object, Array],
    error: String,
    showMessage: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    lw: function lw() {
      var labelWidth = this.labelWidth || (this.parent && this.parent.labelWidth);
      if (labelWidth !== undefined) {
        return isNaN(labelWidth) ? labelWidth : (labelWidth + "px")
      }
    },
    labelStyle: function labelStyle() {
      return this.lw && { width: this.lw }
    },
    contentStyle: function contentStyle() {
      return this.lw && { marginLeft: this.lw }
    }
  },
  mounted: function mounted() {
    this.parent = findParent(this, 'ui-form');
  }
};

/* script */
var __vue_script__$R = script$R;

/* template */
var __vue_render__$V = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ui-form-item"},[_c('label',{staticClass:"ui-form-item-label",style:(_vm.labelStyle),attrs:{"for":_vm.labelFor}},[_vm._t("label",[_vm._v(_vm._s(_vm.label))])],2),_vm._v(" "),_c('div',{staticClass:"ui-form-item-content",style:(_vm.contentStyle)},[_vm._t("default"),_vm._v(" "),_c('transition',{attrs:{"name":"ui-fade"}},[_c('div',{staticClass:"ui-form-item-error-tip"})])],2)])};
var __vue_staticRenderFns__$V = [];

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
  

  
  var UiFormItem = normalizeComponent_1(
    { render: __vue_render__$V, staticRenderFns: __vue_staticRenderFns__$V },
    __vue_inject_styles__$V,
    __vue_script__$R,
    __vue_scope_id__$V,
    __vue_is_functional_template__$V,
    __vue_module_identifier__$V,
    undefined,
    undefined
  );

var Form = UiForm;
var FormItem = UiFormItem;

//
//
//
//
//

var script$S = {
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
var __vue_script__$S = script$S;
/* template */
var __vue_render__$W = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{staticClass:"ui-menu",class:[_vm.mode, _vm.theme],style:(_vm.styles)},[_vm._t("default")],2)};
var __vue_staticRenderFns__$W = [];

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
  

  
  var UiMenu = normalizeComponent_1(
    { render: __vue_render__$W, staticRenderFns: __vue_staticRenderFns__$W },
    __vue_inject_styles__$W,
    __vue_script__$S,
    __vue_scope_id__$W,
    __vue_is_functional_template__$W,
    __vue_module_identifier__$W,
    undefined,
    undefined
  );

//
var script$T = {
  name: 'ui-menu-submenu',
  components: { UiIcon: Icon, UiOptionList: UiDrop },
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
var __vue_script__$T = script$T;

/* template */
var __vue_render__$X = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{staticClass:"ui-menu-submenu",class:{vertical: _vm.isVertical, active: _vm.active},on:{"mouseenter":_vm.handleMouseenter,"mouseleave":_vm.handleMouseleave}},[_c('div',{staticClass:"ui-menu-submenu-title",on:{"click":_vm.handleTitleClick}},[_vm._t("title"),_vm._v(" "),_c('UiIcon',{staticClass:"title-icon",attrs:{"type":"ios-arrow-down"}})],2),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isVertical && _vm.isOpened),expression:"isVertical && isOpened"}],staticClass:"vertical"},[_c('ul',[_vm._t("default")],2)]),_vm._v(" "),(!_vm.isVertical)?_c('ui-option-list',{staticClass:"ui-menu-submenu-list",attrs:{"visible":_vm.visible,"parentName":_vm.$options.name},nativeOn:{"mouseenter":function($event){return _vm.handleDropMouseenter($event)},"mouseleave":function($event){return _vm.handleDropMouseleave($event)}}},[_c('ul',[_vm._t("default")],2)]):_vm._e()],1)};
var __vue_staticRenderFns__$X = [];

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
  

  
  var UiSubmenu = normalizeComponent_1(
    { render: __vue_render__$X, staticRenderFns: __vue_staticRenderFns__$X },
    __vue_inject_styles__$X,
    __vue_script__$T,
    __vue_scope_id__$X,
    __vue_is_functional_template__$X,
    __vue_module_identifier__$X,
    undefined,
    undefined
  );

//
var script$U = {
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
var __vue_script__$U = script$U;

/* template */
var __vue_render__$Y = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{staticClass:"ui-menu-item",class:{active: _vm.active},on:{"click":_vm.handleClick}},[_vm._t("default")],2)};
var __vue_staticRenderFns__$Y = [];

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
  

  
  var UiMenuItem = normalizeComponent_1(
    { render: __vue_render__$Y, staticRenderFns: __vue_staticRenderFns__$Y },
    __vue_inject_styles__$Y,
    __vue_script__$U,
    __vue_scope_id__$Y,
    __vue_is_functional_template__$Y,
    __vue_module_identifier__$Y,
    undefined,
    undefined
  );

//
//
//
//
//
//

var script$V = {
  props: {
    title: String
  }
};

/* script */
var __vue_script__$V = script$V;

/* template */
var __vue_render__$Z = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{staticClass:"ui-menu-item-group"},[_c('div',{staticClass:"ui-menu-item-group-title"},[_vm._v(_vm._s(_vm.title))]),_vm._v(" "),_c('ul',[_vm._t("default")],2)])};
var __vue_staticRenderFns__$Z = [];

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
  

  
  var UiMenuGroup = normalizeComponent_1(
    { render: __vue_render__$Z, staticRenderFns: __vue_staticRenderFns__$Z },
    __vue_inject_styles__$Z,
    __vue_script__$V,
    __vue_scope_id__$Z,
    __vue_is_functional_template__$Z,
    __vue_module_identifier__$Z,
    undefined,
    undefined
  );

var Menu = UiMenu;
var Submenu = UiSubmenu;
var MenuItem = UiMenuItem;
var MenuGroup = UiMenuGroup;

//
var script$W = {
  name: 'ui-select-option',
  components: { UiIcon: Icon },
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
var __vue_script__$W = script$W;
/* template */
var __vue_render__$_ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (!_vm.isDelete)?_c('li',{staticClass:"ui-select-option",class:{selected: _vm.selected, multiple: _vm.multiple, focus: _vm.focus, disabled: _vm.disabled},attrs:{"tabindex":"-1"},on:{"click":_vm.handleClick}},[_vm._t("default",[_vm._v(_vm._s(_vm.label || _vm.value))]),_vm._v(" "),(_vm.selected && _vm.multiple)?_c('UiIcon',{staticClass:"ui-select-option-icon",attrs:{"type":"android-done"}}):_vm._e()],2):_vm._e()};
var __vue_staticRenderFns__$_ = [];

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
  

  
  var UiOption = normalizeComponent_1(
    { render: __vue_render__$_, staticRenderFns: __vue_staticRenderFns__$_ },
    __vue_inject_styles__$_,
    __vue_script__$W,
    __vue_scope_id__$_,
    __vue_is_functional_template__$_,
    __vue_module_identifier__$_,
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

var script$X = {
  props: { label: String }
};

/* script */
var __vue_script__$X = script$X;
/* template */
var __vue_render__$$ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{staticClass:"ui-option-group"},[_c('span',{staticClass:"ui-option-group-title"},[_vm._v(_vm._s(_vm.label))]),_vm._v(" "),_c('ul',[_vm._t("default")],2)])};
var __vue_staticRenderFns__$$ = [];

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
  

  
  var UiOptionGroup = normalizeComponent_1(
    { render: __vue_render__$$, staticRenderFns: __vue_staticRenderFns__$$ },
    __vue_inject_styles__$$,
    __vue_script__$X,
    __vue_scope_id__$$,
    __vue_is_functional_template__$$,
    __vue_module_identifier__$$,
    undefined,
    undefined
  );

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

var script$Y = {
  name: 'ui-select',
  components: { UiTag: Tag, UiIcon: Icon, UiOptionList: UiDrop },
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
      var index = this.selectedItems.findIndex(function (_) { return _.value === value; });
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
      var focusIndex = arr.findIndex(function (_) { return _.focus; });
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
var __vue_script__$Y = script$Y;
/* template */
var __vue_render__$10 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ui-select",class:{disabled: _vm.disabled}},[_c('div',{staticClass:"ui-select-selection",class:[_vm.size, {isCollapsed: _vm.isCollapsed, clearable: _vm.showClear, multiple: _vm.multiple, filterable: _vm.filterable, disabled: _vm.disabled}],attrs:{"tabindex":"0"},on:{"click":_vm.toggleCollapse,"focus":_vm.handleFocus,"keydown":_vm.handleKeydown}},[(_vm.multiple)?[_vm._l((_vm.selectedItems),function(item){return _c('ui-tag',{key:item.value,attrs:{"closable":"","fade":false},on:{"on-close":function($event){return _vm.removeSelectedItem(item)}}},[_vm._v("\n        "+_vm._s(item.label || item.value)+"\n      ")])}),_vm._v(" "),(!(_vm.filterable || _vm.selectedItems.length))?_c('input',{staticClass:"ui-select-search placeholder",attrs:{"readonly":"","placeholder":_vm.placeholder}}):_vm._e(),_vm._v(" "),(_vm.filterable)?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.searchValue),expression:"searchValue"}],ref:"Input",staticClass:"ui-select-search",style:(_vm.multipleInputStyles),attrs:{"placeholder":_vm.multiplePlaceholder},domProps:{"value":(_vm.searchValue)},on:{"blur":_vm.handleSearchBlur,"input":function($event){if($event.target.composing){ return; }_vm.searchValue=$event.target.value;}}}):_vm._e(),_vm._v(" "),_c('span',{ref:"SearchText",staticClass:"ui-select-search-text"},[_vm._v(_vm._s(_vm.searchText))])]:_c('div',{staticClass:"ui-select-single"},[(_vm.filterable)?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.searchValue),expression:"searchValue"}],ref:"Input",staticClass:"ui-select-search",attrs:{"placeholder":_vm.placeholder},domProps:{"value":(_vm.searchValue)},on:{"blur":_vm.handleSearchBlur,"input":function($event){if($event.target.composing){ return; }_vm.searchValue=$event.target.value;}}}):[(_vm.selectedLabelOfSingle)?_c('span',{staticClass:"ui-select-label"},[_vm._v(_vm._s(_vm.selectedLabelOfSingle))]):_c('span',{staticClass:"ui-select-placeholder"},[_vm._v(_vm._s(_vm.placeholder))])]],2),_vm._v(" "),_c('div',{staticClass:"ui-select-arrow"},[_c('UiIcon',{staticClass:"ui-select-clear-icon",attrs:{"type":"ios-close"},nativeOn:{"click":function($event){$event.stopPropagation();return _vm.clearValue($event)}}}),_vm._v(" "),_c('UiIcon',{staticClass:"ui-select-down-icon",attrs:{"type":"arrow-down-b"}})],1)],2),_vm._v(" "),_c('ui-option-list',{ref:"UiOptionList",attrs:{"visible":_vm.isCollapsed}},[(_vm.isEmpty)?_c('span',{attrs:{"slot":"empty"},slot:"empty"},[_vm._v(_vm._s(_vm.loading ? _vm.loadingText : _vm.notFoundText))]):_vm._e(),_vm._v(" "),_c('ul',[_vm._t("default")],2)])],1)};
var __vue_staticRenderFns__$10 = [];

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
  

  
  var UiSelect = normalizeComponent_1(
    { render: __vue_render__$10, staticRenderFns: __vue_staticRenderFns__$10 },
    __vue_inject_styles__$10,
    __vue_script__$Y,
    __vue_scope_id__$10,
    __vue_is_functional_template__$10,
    __vue_module_identifier__$10,
    undefined,
    undefined
  );

var Option = UiOption;
var OptionGroup = UiOptionGroup;
var Select = UiSelect;

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
var __vue_render__$11 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":_vm.transitionName}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.visible),expression:"visible"}],staticClass:"ui-popper",class:{hasArrow: _vm.hasArrow},style:(Object.assign({}, _vm.styles, {zIndex: _vm.zIndex})),attrs:{"x-placement":_vm.placement}},[_vm._t("default"),_vm._v(" "),(_vm.hasArrow)?_c('span',{staticClass:"ui-popper-arrow",class:_vm.arrowClass}):_vm._e()],2)])};
var __vue_staticRenderFns__$11 = [];

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
  

  
  var Popper = normalizeComponent_1(
    { render: __vue_render__$11, staticRenderFns: __vue_staticRenderFns__$11 },
    __vue_inject_styles__$11,
    __vue_script__$Z,
    __vue_scope_id__$11,
    __vue_is_functional_template__$11,
    __vue_module_identifier__$11,
    undefined,
    undefined
  );

//
var script$_ = {
  components: { UiIcon: Icon, UiPopper: Popper, UiButton: Button },
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
var __vue_script__$_ = script$_;
/* template */
var __vue_render__$12 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"winclick",rawName:"v-winclick",value:(_vm.handleWinClick),expression:"handleWinClick"}],staticClass:"ui-poptip"},[_c('div',{ref:"Ref",staticClass:"ui-poptip-rel",on:{"mouseenter":_vm.handleMouseenter,"mouseleave":_vm.handleMouseleave,"mousedown":_vm.handleMousedown,"mouseup":_vm.handleMouseup,"click":_vm.handleClick}},[_vm._t("default")],2),_vm._v(" "),_c('ui-popper',{ref:"Popper",class:[{confirm: _vm.confirm}, _vm.popperClass],style:(_vm.popperStyles),attrs:{"arrowClass":"ui-poptip-arrow","hasArrow":"","refElement":_vm.refElement,"placement":_vm.placement,"visible":_vm.popperVisible}},[_c('div',{staticClass:"ui-poptip-body"},[_c('div',{staticClass:"ui-poptip-title"},[(_vm.confirm)?_c('UiIcon',{staticClass:"ui-poptip-confirm-icon",attrs:{"type":"help-circled"}}):_vm._e(),_vm._v(" "),_vm._t("title",[_vm._v(_vm._s(_vm.title))])],2),_vm._v(" "),(_vm.hasContent)?_c('div',{staticClass:"ui-poptip-content"},[_vm._t("content",[_vm._v(_vm._s(_vm.content))])],2):_vm._e(),_vm._v(" "),(_vm.confirm)?_c('div',{staticClass:"ui-poptip-actions"},[_c('ui-button',{attrs:{"type":"text","size":"small"},on:{"click":_vm.onCancel}},[_vm._v(_vm._s(_vm.cancelText))]),_vm._v(" "),_c('ui-button',{attrs:{"type":"primary","size":"small"},on:{"click":_vm.onOK}},[_vm._v(_vm._s(_vm.okText))])],1):_vm._e()])])],1)};
var __vue_staticRenderFns__$12 = [];

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
  

  
  var Poptip = normalizeComponent_1(
    { render: __vue_render__$12, staticRenderFns: __vue_staticRenderFns__$12 },
    __vue_inject_styles__$12,
    __vue_script__$_,
    __vue_scope_id__$12,
    __vue_is_functional_template__$12,
    __vue_module_identifier__$12,
    undefined,
    undefined
  );

//
var script$$ = {
  components: { UiPopper: Popper },
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
var __vue_script__$$ = script$$;
/* template */
var __vue_render__$13 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ui-tooltip"},[_c('div',{ref:"Ref",staticClass:"ui-tooltip-rel",on:{"mouseenter":_vm.handleMouseenter,"mouseleave":_vm.handleMouseleave}},[_vm._t("default")],2),_vm._v(" "),_c('ui-popper',{ref:"Popper",attrs:{"hasArrow":"","refElement":_vm.refElement,"placement":_vm.placement,"visible":_vm.always || _vm.popperVisible}},[_c('div',{staticClass:"ui-tooltip-content"},[_vm._t("content",[_vm._v(_vm._s(_vm.content))])],2)])],1)};
var __vue_staticRenderFns__$13 = [];

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
  

  
  var Tooltip = normalizeComponent_1(
    { render: __vue_render__$13, staticRenderFns: __vue_staticRenderFns__$13 },
    __vue_inject_styles__$13,
    __vue_script__$$,
    __vue_scope_id__$13,
    __vue_is_functional_template__$13,
    __vue_module_identifier__$13,
    undefined,
    undefined
  );

//
var script$10 = {
  components: { UiTooltip: Tooltip, UiInputNumber: InputNumber },
  data: function data() {
    return {
      inputValue: this.value,
      rightBtnDown: false,
      leftBtnDown: false
    }
  },
  props: {
    value: {
      type: [Number, Array],
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    disabled: Boolean,
    range: Boolean,
    showInput: Boolean,
    showStops: Boolean,
    showTip: {
      default: 'hover',
      validator: function validator(value) {
        return ['hover', 'always', 'never'].indexOf(value) !== -1
      }
    },
    tipFormat: Function,
    inputSize: {
      validator: function validator(value) {
        return ['large', 'small', 'default'].indexOf(value) !== -1
      }
    }
  },
  computed: {
    isTipAlways: function isTipAlways() {
      return this.showTip === 'always'
    },
    hasTip: function hasTip() {
      return this.showTip !== 'never'
    },
    val: function val() {
      return this.max - this.min
    },
    rightValue: function rightValue() {
      var value = this.range ? this.inputValue[1] : this.inputValue;
      return this.tipFormat ? this.tipFormat(value) : value
    },
    barStyle: function barStyle() {
      var ref = this;
      var min = ref.min;
      var max = ref.max;
      var inputValue = ref.inputValue;
      var range = ref.range;
      var val = ref.val;
      if (range) {
        var a = inputValue[0];
        var b = inputValue[1];
        return { left: ((a / val * 100) + "%"), width: (((b - a) / val * 100) + "%") }
      } else {
        return { width: ((inputValue / val * 100) + "%") }
      }
    },
    stopValues: function stopValues() {
      if (!this.showStops) { return [] }
      var ref = this;
      var step = ref.step;
      var min = ref.min;
      var max = ref.max;
      var val = ref.val;
      var points = [];
      var start = Math.floor(step / val * 100), p = start;
      while (p < 100) {
        points.push(p);
        p += start;
      }
      return points
    },
    hasInputNumber: function hasInputNumber() {
      return this.showInput && !this.range
    }
  },
  watch: {
    value: function value(newVal) {
      this.inputValue = newVal;
    },
    inputValue: function inputValue(newVal) {
      var this$1 = this;

      this.$emit('input', newVal);
      this.$emit('on-change', newVal);
      this.$nextTick(function () {
        if (this$1.leftBtnDown) {
          this$1.$refs.LeftTooltip && this$1.$refs.LeftTooltip.setPosition();
        } else if (this$1.rightBtnDown) {
          this$1.$refs.RightTooltip && this$1.$refs.RightTooltip.setPosition();
        }
      });
    }
  },
  methods: {
    getMovingValue: function getMovingValue(event) {
      var ref = getOffset(this.$refs.Bar);
      var left = ref.left;
      var tarVal = (event.clientX - left ) / this.$refs.Bar.offsetWidth * this.val;
      var val = Math.floor(tarVal / this.step) * this.step;
      return Math.max(Math.min(val, this.max), this.min)
    },
    update: function update(event) {
      if (this.disabled) { return }
      var ref = getOffset(this.$refs.Bar);
      var left = ref.left;
      var tarVal = (event.clientX - left ) / this.$refs.Bar.offsetWidth * this.val;
      var moveToValue = this.getMovingValue(event);
      if (this.range) {
        var ref$1 = this.inputValue;
        var a = ref$1[0];
        var b = ref$1[1];
        if (this.leftBtnDown) {
          this.inputValue = moveToValue > b ? [moveToValue, moveToValue] : [moveToValue, b];
        } else if (this.rightBtnDown) {
          this.inputValue = moveToValue > a ? [a, moveToValue] : [a, a];
        } else {
          this.inputValue = moveToValue > a ? [a, moveToValue] : [moveToValue, b];
        }
      } else {
        this.inputValue = moveToValue;
      }
    },
    handleRightMousedown: function handleRightMousedown() {
      if (this.disabled) { return }
      this.rightBtnDown = true;
      this.addWinEvents();
    },
    handleLeftMousedown: function handleLeftMousedown(event) {
      if (this.disabled) { return }
      this.leftBtnDown = true;
      this.addWinEvents();
    },
    addWinEvents: function addWinEvents() {
      window.addEventListener('mousemove', this.handleMousemove);
      window.addEventListener('mouseup', this.handleMouseup);
    },
    removeWinEvents: function removeWinEvents() {
      window.removeEventListener('mousemove', this.handleMousemove);
      window.removeEventListener('mouseup', this.handleMouseup);
    },
    handleMousemove: function handleMousemove(event) {
      if (this.rightBtnDown || this.leftBtnDown) { this.update(event); }
    },
    handleMouseup: function handleMouseup() {
      this.removeWinEvents();
      this.rightBtnDown = this.leftBtnDown = false;
    }
  }
};

/* script */
var __vue_script__$10 = script$10;
/* template */
var __vue_render__$14 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ui-slider",class:{disabled: _vm.disabled}},[_c('div',{ref:"Bar",staticClass:"ui-slider-wrap",on:{"click":_vm.update}},[_vm._l((_vm.stopValues),function(item){return _c('span',{key:item,staticClass:"ui-slider-breakpoint",style:({left: (item + "%")})})}),_vm._v(" "),_c('div',{staticClass:"ui-slider-bar",style:(_vm.barStyle)},[(_vm.range)?[(_vm.hasTip)?_c('ui-tooltip',{ref:"LeftTooltip",attrs:{"placement":"top","always":_vm.leftBtnDown || _vm.isTipAlways}},[_c('div',{attrs:{"slot":"content"},slot:"content"},[_vm._v(_vm._s(_vm.inputValue[0]))]),_vm._v(" "),_c('span',{staticClass:"ui-slider-btn left",class:{down: _vm.leftBtnDown},on:{"mousedown":function($event){$event.preventDefault();return _vm.handleLeftMousedown($event)}}})]):_c('span',{staticClass:"ui-slider-btn left",class:{down: _vm.leftBtnDown},on:{"mousedown":function($event){$event.preventDefault();return _vm.handleLeftMousedown($event)}}})]:_vm._e(),_vm._v(" "),(_vm.hasTip && _vm.rightValue !== null)?_c('ui-tooltip',{ref:"RightTooltip",attrs:{"placement":"top","always":_vm.rightBtnDown || _vm.isTipAlways}},[_c('div',{attrs:{"slot":"content"},slot:"content"},[_vm._v(_vm._s(_vm.rightValue))]),_vm._v(" "),_c('span',{staticClass:"ui-slider-btn right",class:{down: _vm.rightBtnDown},on:{"mousedown":function($event){$event.preventDefault();return _vm.handleRightMousedown($event)}}})]):_c('span',{staticClass:"ui-slider-btn right",class:{down: _vm.rightBtnDown},on:{"mousedown":function($event){$event.preventDefault();return _vm.handleRightMousedown($event)}}})],2)],2),_vm._v(" "),(_vm.hasInputNumber)?_c('UiInputNumber',{staticClass:"ui-slider-input-number",attrs:{"min":_vm.min,"max":_vm.max,"step":_vm.step,"size":_vm.inputSize},model:{value:(_vm.inputValue),callback:function ($$v) {_vm.inputValue=$$v;},expression:"inputValue"}}):_vm._e()],1)};
var __vue_staticRenderFns__$14 = [];

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
  

  
  var Slider = normalizeComponent_1(
    { render: __vue_render__$14, staticRenderFns: __vue_staticRenderFns__$14 },
    __vue_inject_styles__$14,
    __vue_script__$10,
    __vue_scope_id__$14,
    __vue_is_functional_template__$14,
    __vue_module_identifier__$14,
    undefined,
    undefined
  );

//
var script$11 = {
  components: { UiIcon: Icon, UiSelect: Select, UiOption: Option, UiInput: Input },
  data: function data() {
    return {
      limit: this.pageSize,
      currentPage: this.current,
      inputValue: this.current
    }
  },
  props: {
    current: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizeOpts: {
      type: Array,
      default: function () { return [10, 20, 30, 40]; }
    },
    placement: {
      default: 'bottom',
      validator: function validator(value) {
        return ['bottom', 'top'].indexOf(value) !== -1
      }
    },
    size: {
      validator: function validator(value) {
        return value === 'small'
      }
    },
    simple: Boolean,
    showTotal: Boolean,
    showElevator: Boolean,
    showSizer: Boolean
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
    limit: function limit(newVal) {
      this.toPage(1);
      this.$emit('on-page-size-change', newVal);
    }
  },
  methods: {
    toPage: function toPage(page) {
      this.currentPage = page;
      this.$emit('update:current', page);
      this.$emit('on-change', page);
    },
    toPrev: function toPrev() {
      !this.disabledPrev && this.toPage(this.currentPage - 1);
    },
    toNext: function toNext() {
      !this.disabledNext && this.toPage(this.currentPage + 1);
    },
    toPrev5: function toPrev5() {
      this.toPage(Math.max(this.currentPage - 5, 1));
    },
    toNext5: function toNext5() {
      this.toPage(Math.min(this.currentPage + 5, this.pageCount));
    },
    toInputPage: function toInputPage() {
      var inputValue = +this.inputValue;
      if (isNaN(inputValue) || inputValue < 1) {
        this.toPage(1);
        this.inputValue = 1;
      } else if (inputValue > this.pageCount) {
        this.toPage(this.pageCount);
        this.inputValue = this.pageCount;
      } else {
        this.toPage(inputValue);
      }
    }
  }
};

/* script */
var __vue_script__$11 = script$11;
/* template */
var __vue_render__$15 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ui-page",class:[_vm.size, {simple: _vm.simple}]},[(_vm.simple)?_c('ul',{staticClass:"ui-page-list simple"},[_c('li',{staticClass:"ui-page-arrow prev",class:{disabled: _vm.disabledPrev},on:{"click":_vm.toPrev}},[_c('UiIcon',{attrs:{"type":"ios-arrow-left"}})],1),_vm._v(" "),_c('div',{staticClass:"ui-page-input"},[_c('UiInput',{attrs:{"size":"small"},on:{"on-enter":_vm.toInputPage},model:{value:(_vm.inputValue),callback:function ($$v) {_vm.inputValue=$$v;},expression:"inputValue"}}),_vm._v(" "),_c('span',[_vm._v("/")]),_vm._v(" "+_vm._s(_vm.pageCount)+"\n    ")],1),_vm._v(" "),_c('li',{staticClass:"ui-page-arrow next",class:{disabled: _vm.disabledNext},on:{"click":_vm.toNext}},[_c('UiIcon',{attrs:{"type":"ios-arrow-right"}})],1)]):[(_vm.showTotal)?_c('span',{staticClass:"ui-page-count"},[_vm._t("default",[_vm._v("共 "+_vm._s(_vm.total)+" 条")])],2):_vm._e(),_vm._v(" "),_c('ul',{staticClass:"ui-page-list"},[_c('li',{staticClass:"ui-page-arrow prev",class:{disabled: _vm.disabledPrev},on:{"click":_vm.toPrev}},[_c('UiIcon',{attrs:{"type":"ios-arrow-left"}})],1),_vm._v(" "),(_vm.currentPage >= 5)?[_c('li',{class:{active: _vm.currentPage === 1},on:{"click":function($event){return _vm.toPage(1)}}},[_vm._v("1")]),_vm._v(" "),_c('li',{staticClass:"ui-page-more",attrs:{"title":"向前5页"},on:{"click":_vm.toPrev5}},[_c('UiIcon',{attrs:{"type":"ios-arrow-left"}}),_vm._v(" "),_c('UiIcon',{attrs:{"type":"ios-arrow-left"}}),_vm._v(" "),_c('UiIcon',{staticClass:"icon-more",attrs:{"type":"ios-more"}})],1)]:_vm._e(),_vm._v(" "),_vm._l((_vm.showPages),function(item){return _c('li',{key:item,class:{active: _vm.currentPage === item},on:{"click":function($event){return _vm.toPage(item)}}},[_vm._v(_vm._s(item))])}),_vm._v(" "),(_vm.pageCount - _vm.currentPage >= 4)?[_c('li',{staticClass:"ui-page-more",attrs:{"title":"向后5页"},on:{"click":_vm.toNext5}},[_c('UiIcon',{attrs:{"type":"ios-arrow-right"}}),_vm._v(" "),_c('UiIcon',{attrs:{"type":"ios-arrow-right"}}),_vm._v(" "),_c('UiIcon',{staticClass:"icon-more",attrs:{"type":"ios-more"}})],1),_vm._v(" "),_c('li',{class:{active: _vm.currentPage === _vm.pageCount},on:{"click":function($event){return _vm.toPage(_vm.pageCount)}}},[_vm._v(_vm._s(_vm.pageCount))])]:_vm._e(),_vm._v(" "),_c('li',{staticClass:"ui-page-arrow next",class:{disabled: _vm.disabledNext},on:{"click":_vm.toNext}},[_c('UiIcon',{attrs:{"type":"ios-arrow-right"}})],1)],2),_vm._v(" "),(_vm.showSizer)?_c('ui-select',{staticClass:"ui-page-sizer",attrs:{"size":_vm.size},model:{value:(_vm.limit),callback:function ($$v) {_vm.limit=$$v;},expression:"limit"}},_vm._l((_vm.pageSizeOpts),function(item){return _c('UiOption',{key:item,attrs:{"value":item,"label":(item + " 条/页")}})}),1):_vm._e(),_vm._v(" "),(_vm.showElevator)?_c('div',{staticClass:"ui-page-input"},[_vm._v("\n      跳至"),_c('UiInput',{attrs:{"size":_vm.size},on:{"on-enter":_vm.toInputPage},model:{value:(_vm.inputValue),callback:function ($$v) {_vm.inputValue=$$v;},expression:"inputValue"}}),_vm._v("页\n    ")],1):_vm._e()]],2)};
var __vue_staticRenderFns__$15 = [];

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
  

  
  var Page = normalizeComponent_1(
    { render: __vue_render__$15, staticRenderFns: __vue_staticRenderFns__$15 },
    __vue_inject_styles__$15,
    __vue_script__$11,
    __vue_scope_id__$15,
    __vue_is_functional_template__$15,
    __vue_module_identifier__$15,
    undefined,
    undefined
  );

//
var script$12 = {
  name: 'ui-autocomplete',
  components: { UiInput: Input, UiDrop: UiDrop },
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
var __vue_script__$12 = script$12;
/* template */
var __vue_render__$16 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"winclick",rawName:"v-winclick",value:(_vm.handleWinClick),expression:"handleWinClick"}],staticClass:"ui-autocomplete"},[_c('UiInput',{attrs:{"placeholder":_vm.placeholder,"clearable":_vm.clearable,"size":_vm.size,"disabled":_vm.disabled,"elementId":_vm.elementId,"icon":_vm.icon},on:{"on-focus":_vm.handleFocus,"on-blur":_vm.handleBlur},nativeOn:{"click":function($event){return _vm.handleClick($event)}},model:{value:(_vm.inputValue),callback:function ($$v) {_vm.inputValue=$$v;},expression:"inputValue"}}),_vm._v(" "),_c('ui-drop',{ref:"UiDrop",attrs:{"visible":_vm.dropShow,"parentName":_vm.$options.name}},[_c('ul',{staticClass:"ui-autocomplete-select"},[_vm._t("default"),_vm._v(" "),(!_vm.hasSlot)?_vm._l((_vm.filteredData),function(item,index){return _c('li',{key:index,staticClass:"ui-autocomplete-select-item",class:{active: item === _vm.inputValue},on:{"click":function($event){return _vm.handleOptionClick(item)}}},[_vm._v("\n          "+_vm._s(item)+"\n        ")])}):_vm._e()],2)])],1)};
var __vue_staticRenderFns__$16 = [];

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
  

  
  var AutoComplete = normalizeComponent_1(
    { render: __vue_render__$16, staticRenderFns: __vue_staticRenderFns__$16 },
    __vue_inject_styles__$16,
    __vue_script__$12,
    __vue_scope_id__$16,
    __vue_is_functional_template__$16,
    __vue_module_identifier__$16,
    undefined,
    undefined
  );

/* script */

/* template */
var __vue_render__$17 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div')};
var __vue_staticRenderFns__$17 = [];

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
  

  
  var Split = normalizeComponent_1(
    { render: __vue_render__$17, staticRenderFns: __vue_staticRenderFns__$17 },
    __vue_inject_styles__$17,
    {},
    __vue_scope_id__$17,
    __vue_is_functional_template__$17,
    __vue_module_identifier__$17,
    undefined,
    undefined
  );

/* script */

/* template */
var __vue_render__$18 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div')};
var __vue_staticRenderFns__$18 = [];

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
  

  
  var UiAnchor = normalizeComponent_1(
    { render: __vue_render__$18, staticRenderFns: __vue_staticRenderFns__$18 },
    __vue_inject_styles__$18,
    {},
    __vue_scope_id__$18,
    __vue_is_functional_template__$18,
    __vue_module_identifier__$18,
    undefined,
    undefined
  );

/* script */

/* template */
var __vue_render__$19 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div')};
var __vue_staticRenderFns__$19 = [];

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
  

  
  var UiAnchorLink = normalizeComponent_1(
    { render: __vue_render__$19, staticRenderFns: __vue_staticRenderFns__$19 },
    __vue_inject_styles__$19,
    {},
    __vue_scope_id__$19,
    __vue_is_functional_template__$19,
    __vue_module_identifier__$19,
    undefined,
    undefined
  );

var Anchor = UiAnchor;
var AnchorLink = UiAnchorLink;

//
//
//
//
//

var script$13 = {
  name: 'UiOverlay'
};

/* script */
var __vue_script__$13 = script$13;
/* template */
var __vue_render__$1a = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":"ui-overlay"}},[_c('div',_vm._g({staticClass:"ui-overlay"},_vm.$listeners))])};
var __vue_staticRenderFns__$1a = [];

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
  

  
  var Overlay = normalizeComponent_1(
    { render: __vue_render__$1a, staticRenderFns: __vue_staticRenderFns__$1a },
    __vue_inject_styles__$1a,
    __vue_script__$13,
    __vue_scope_id__$1a,
    __vue_is_functional_template__$1a,
    __vue_module_identifier__$1a,
    undefined,
    undefined
  );

//
var script$14 = {
  name: 'UiDrawer',
  components: { UiOverlay: Overlay, UiCloseIconButton: CloseIconButton },
  data: function data() {
    return { prefix: 'ui-drawer', visible: this.value, zIndex: 1 }
  },
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
    placement: {
      default: 'right',
      validator: function validator(value) {
        return ['left', 'right'].indexOf(value) !== -1
      }
    }
  },
  computed: {
    overlayStyle: function overlayStyle() {
      return Object.assign({}, this.maskStyle, {zIndex: this.zIndex - 1})
    },
    contentStyle: function contentStyle() {
      return Object.assign({}, this.styles, {width: parseSize(this.width), zIndex: this.zIndex})
    },
    hasHeader: function hasHeader() {
      return this.title || this.$slots.header !== undefined
    },
    hasFooter: function hasFooter() {
      return this.$slots.footer !== undefined
    }
  },
  watch: {
    value: function value(newval) {
      this.visible = newval;
    },
    visible: function visible(newval) {
      this.$emit('input', newval);
      if (newval) {
        winScrollbarLock.lock();
        this.zIndex = getMaxZIndex();
      }
    }
  },
  mounted: function mounted() {
    document.body.appendChild(this.$el);
  },
  beforeDestroy: function beforeDestroy() {
    this.onLeave();
    this.$el.parentNode && this.$el.parentNode.removeChild(this.$el);
  },
  methods: {
    show: function show(visible) {
      if ( visible === void 0 ) visible = true;

      this.visible = visible;
    },
    onMaskClick: function onMaskClick() {
      if (this.maskClosable) { this.show(false); }
    },
    onLeave: function onLeave() {
      var childs = findChildrens(this.$root, this.$options.name);
      if (childs.every(function (_) { return !_.visible; })) { winScrollbarLock.unlock(); }
    }
  }
};

/* script */
var __vue_script__$14 = script$14;
/* template */
var __vue_render__$1b = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:(_vm.prefix + "-wrap")},[(_vm.mask)?_c('ui-overlay',{directives:[{name:"show",rawName:"v-show",value:(_vm.visible),expression:"visible"}],style:(_vm.overlayStyle),on:{"click":_vm.onMaskClick}}):_vm._e(),_vm._v(" "),_c('transition',{attrs:{"name":(_vm.prefix + "-" + _vm.placement)},on:{"afterLeave":_vm.onLeave}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.visible),expression:"visible"}],class:[_vm.prefix, (_vm.prefix + "-" + _vm.placement)],style:(_vm.contentStyle)},[(_vm.closable)?_c('span',{class:(_vm.prefix + "-close"),on:{"click":function($event){return _vm.show(false)}}},[_vm._t("close",[_c('ui-close-icon-button',{class:(_vm.prefix + "-close-icon")})])],2):_vm._e(),_vm._v(" "),(_vm.hasHeader)?_c('header',{class:(_vm.prefix + "-header")},[_vm._t("header",[_vm._v(_vm._s(_vm.title))])],2):_vm._e(),_vm._v(" "),_c('main',{class:(_vm.prefix + "-body")},[_vm._t("default")],2),_vm._v(" "),(_vm.hasFooter)?_c('footer',{class:(_vm.prefix + "-footer")},[_vm._t("footer")],2):_vm._e()])])],1)};
var __vue_staticRenderFns__$1b = [];

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
  

  
  var Drawer = normalizeComponent_1(
    { render: __vue_render__$1b, staticRenderFns: __vue_staticRenderFns__$1b },
    __vue_inject_styles__$1b,
    __vue_script__$14,
    __vue_scope_id__$1b,
    __vue_is_functional_template__$1b,
    __vue_module_identifier__$1b,
    undefined,
    undefined
  );

/* script */

/* template */
var __vue_render__$1c = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div')};
var __vue_staticRenderFns__$1c = [];

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
  

  
  var Time = normalizeComponent_1(
    { render: __vue_render__$1c, staticRenderFns: __vue_staticRenderFns__$1c },
    __vue_inject_styles__$1c,
    {},
    __vue_scope_id__$1c,
    __vue_is_functional_template__$1c,
    __vue_module_identifier__$1c,
    undefined,
    undefined
  );

//
var script$15 = {
  components: { UiIcon: Icon },
  data: function data() {
    return {
      trackStyle: {
        overflow: 'hidden',
        transition: ("transform .5s " + (this.easing)),
        height: this.height === 'auto' ? 'auto' : ((parseInt(this.height)) + "px")
      },
      curIndex: this.value,
      children: []
    }
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    height: {
      type: [String, Number],
      default: 'auto'
    },
    loop: Boolean,
    autoplay: Boolean,
    autoplaySpeed: {
      type: Number,
      default: 2000
    },
    dots: {
      default: 'inside',
      validator: function validator(value) {
        return ['inside', 'outside','none'].indexOf(value) !== -1
      }
    },
    radiusDot: Boolean,
    trigger: {
      default: 'click',
      validator: function validator(value) {
        return ['click', 'hover'].indexOf(value) !== -1
      }
    },
    arrow: {
      default: 'hover',
      validator: function validator(value) {
        return ['hover', 'always', 'never'].indexOf(value) !== -1
      }
    },
    easing: {
      type: String,
      default: 'ease'
    }
  },
  computed: {
    disabledPrev: function disabledPrev() {
      return !this.loop && this.curIndex === 0
    },
    disabledNext: function disabledNext() {
      return !this.loop && this.curIndex === this.children.length - 1
    }
  },
  watch: {
    value: function value(newVal) {
      this.curIndex = newVal;
    },
    curIndex: function curIndex(newVal, oldVal) {
      this.handleIndexChange(newVal, oldVal);
    },
    autoplay: function autoplay(newVal) {
      if (newVal) {
        this.startTimer();
      } else {
        this.stopTimer();
      }
    }
  },
  methods: {
    toPrev: function toPrev() {
      if (this.curIndex === 0) {
        if (this.loop) { this.curIndex = this.children.length - 1; }
      } else {
        this.curIndex--;
      }
      this.$emit('input', this.curIndex);
    },
    toNext: function toNext() {
      if (this.curIndex === this.children.length - 1) {
        if (this.loop) { this.curIndex = 0; }
      } else {
        this.curIndex++;
      }
      this.$emit('input', this.curIndex);
    },
    handleIndexChange: function handleIndexChange(newVal, oldVal) {
      this.$emit('on-change', oldVal, newVal);
      this.trackStyle = Object.assign({}, this.trackStyle,
        {transform: ("translateX(" + (-(newVal / this.children.length) * 100) + "%)")});
    },
    handleDotEvent: function handleDotEvent(index, event) {
      if (
        (this.trigger === 'click' && event.type === 'click') ||
        (this.trigger === 'hover' && event.type === 'mouseover')
      ) {
        this.curIndex = index;
        this.$emit('input', index);
      }
    },
    startTimer: function startTimer() {
      if (this.autoplay) { this.tid = setInterval(this.toNext, this.autoplaySpeed); }
    },
    stopTimer: function stopTimer() {
      clearInterval(this.tid);
    },
    setTrackStyle: function setTrackStyle() {
      this.children = findChildrens(this, 'ui-swiper-item');
      var len = this.children.length;
      this.trackStyle = Object.assign({}, this.trackStyle, {width: ((100 * len) + "%")});
      this.children.forEach(function (item) { return item.$el.style.width = ((1 / len) * 100) + "%"; });
      this.handleIndexChange(this.curIndex, this.curIndex);
    }
  },
  mounted: function mounted() {
    this.startTimer();
    this.$nextTick(this.setTrackStyle);
  },
  beforeDestroy: function beforeDestroy() {
    this.stopTimer();
  }
};

/* script */
var __vue_script__$15 = script$15;
/* template */
var __vue_render__$1d = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ui-swiper",class:_vm.arrow,on:{"mouseenter":_vm.stopTimer,"mouseleave":_vm.startTimer}},[_c('button',{staticClass:"ui-swiper-arrow prev",attrs:{"disabled":_vm.disabledPrev},on:{"click":_vm.toPrev}},[_c('UiIcon',{attrs:{"type":"chevron-left"}})],1),_vm._v(" "),_c('div',{staticClass:"ui-swiper-list"},[_c('div',{style:(_vm.trackStyle)},[_vm._t("default")],2)]),_vm._v(" "),_c('button',{staticClass:"ui-swiper-arrow next",attrs:{"disabled":_vm.disabledNext},on:{"click":_vm.toNext}},[_c('UiIcon',{attrs:{"type":"chevron-right"}})],1),_vm._v(" "),_c('ul',{staticClass:"ui-swiper-dots",class:[_vm.dots, {circle: _vm.radiusDot}]},_vm._l((_vm.children.length),function(i){return _c('li',{key:i,class:{active: _vm.curIndex === i - 1},on:{"click":function($event){return _vm.handleDotEvent(i - 1, $event)},"mouseover":function($event){return _vm.handleDotEvent(i - 1, $event)}}})}),0)])};
var __vue_staticRenderFns__$1d = [];

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
  

  
  var Swiper = normalizeComponent_1(
    { render: __vue_render__$1d, staticRenderFns: __vue_staticRenderFns__$1d },
    __vue_inject_styles__$1d,
    __vue_script__$15,
    __vue_scope_id__$1d,
    __vue_is_functional_template__$1d,
    __vue_module_identifier__$1d,
    undefined,
    undefined
  );

//
//
//

var script$16 = {
  name: 'ui-swiper-item'
};

/* script */
var __vue_script__$16 = script$16;

/* template */
var __vue_render__$1e = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ui-swiper-item"},[_vm._t("default")],2)};
var __vue_staticRenderFns__$1e = [];

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
  

  
  var SwiperItem = normalizeComponent_1(
    { render: __vue_render__$1e, staticRenderFns: __vue_staticRenderFns__$1e },
    __vue_inject_styles__$1e,
    __vue_script__$16,
    __vue_scope_id__$1e,
    __vue_is_functional_template__$1e,
    __vue_module_identifier__$1e,
    undefined,
    undefined
  );

//
var script$17 = {
  name: 'ui-tree-node',
  components: { UiIcon: Icon, UiLoading: UiLoading, UiCheckbox: UiCheckbox },
  data: function data() {
    return { parent: null }
  },
  props: {
    data: {
      type: Array,
      default: function () { return []; }
    }
  },
  computed: {
    showCheckbox: function showCheckbox() {
      return this.parent && this.parent.showCheckbox
    }
  },
  methods: {
    /**
     * 选择当前节点
     */
    handleTextClick: function handleTextClick(item) {
      if (item.disabled) { return }
      this.parent && this.parent.updateSeleckedNodes(item);
    },
    /**
     * 复选框选中状态改变
     */
    handleCheckedChange: function handleCheckedChange(item) {
      this.parent.updateCheckedNodes(item);
    },
    /**
     * 切换折叠和展开子节点
     */
    toggleExpand: function toggleExpand(item) {
      this.$set(item, 'expand', !item.expand);
      this.parent && this.parent.toggleExpand(item);
    }
  },
  mounted: function mounted() {
    this.parent = findParent(this, 'ui-tree');
  }
};

/* script */
var __vue_script__$17 = script$17;
/* template */
var __vue_render__$1f = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{staticClass:"ui-tree-node"},_vm._l((_vm.data),function(item,index){return _c('li',{key:index,staticClass:"ui-tree-node-item"},[_c('div',{staticClass:"ui-tree-node-title"},[(item.loading)?_c('div',{staticClass:"ui-tree-node-loading"},[_c('UiLoading',{attrs:{"iconClass":"ui-tree-node-loading-icon","loading":""}})],1):[(item.children)?_c('UiIcon',{staticClass:"ui-tree-node-arrow",class:{expand: item.expand},attrs:{"type":"arrow-right-b"},on:{"click":function($event){return _vm.toggleExpand(item)}}}):_vm._e()],_vm._v(" "),(_vm.showCheckbox)?_c('UiCheckbox',{attrs:{"disabled":item.disableCheckbox || item.disabled},on:{"on-change":function($event){return _vm.handleCheckedChange(item)}},model:{value:(item.checked),callback:function ($$v) {_vm.$set(item, "checked", $$v);},expression:"item.checked"}}):_vm._e(),_vm._v(" "),_c('span',{staticClass:"ui-tree-node-text",class:{selected: item.selected},on:{"click":function($event){return _vm.handleTextClick(item)}}},[_vm._v(_vm._s(item.title))])],2),_vm._v(" "),(item.children && item.expand)?_c('ui-tree-node',{attrs:{"data":item.children,"showCheckbox":_vm.showCheckbox}}):_vm._e()],1)}),0)};
var __vue_staticRenderFns__$1f = [];

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
  

  
  var UiTreeNode = normalizeComponent_1(
    { render: __vue_render__$1f, staticRenderFns: __vue_staticRenderFns__$1f },
    __vue_inject_styles__$1f,
    __vue_script__$17,
    __vue_scope_id__$1f,
    __vue_is_functional_template__$1f,
    __vue_module_identifier__$1f,
    undefined,
    undefined
  );

//
//
//
//
//

function objectWithoutProperties (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }
var key = 0;
var script$18 = {
  name: 'ui-tree',
  components: { UiTreeNode: UiTreeNode },
  data: function data() {
    return {
      flatState: [],
      selectedNodes: []
    }
  },
  props: {
    data: {
      type: Array,
      default: function () { return []; }
    },
    multiple: Boolean,
    showCheckbox: Boolean,
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    loadData: Function,
    render: Function,
    childrenKey: {
      type: String,
      default: 'children'
    }
  },
  watch: {
    data: {
      deep: true,
      handler: function handler(newVal) {
        this.convertData();
      }
    }
  },
  methods: {
    /**
     * 转换数据，增加唯一标识的key
     */
    convertData: function convertData() {
      var flatState = [];
      var ref = this;
      var data = ref.data;
      var loop = function () {
        var arr = [];
        data.forEach(function (_) {
          _.nodeKey = key++;
          flatState.push(_);
          _.children && arr.push.apply(arr, _.children);
        });
        data = arr;
      };

      while (data.length) loop();
      this.flatState = flatState;
    },
    /**
     * 更新选择的节点
     */
    updateSeleckedNodes: function updateSeleckedNodes(item) {
      var this$1 = this;

      if (this.multiple) {
        this.$set(item, 'selected', !item.selected);
      } else {
        this.flatState.forEach(function (_) { return this$1.$set(_, 'selected', false); });
        this.$set(item, 'selected', true);
      }
      this.$emit('on-select-change', this.getSelectedNodes());
    },
    /**
     * 更新选中的节点
     */
    updateCheckedNodes: function updateCheckedNodes(item) {
      var this$1 = this;

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
      var data = [].concat( this.flatState );
      data.reverse();
      data.forEach(function (_) {
        _.children && this$1.$set(_, 'checked', _.children.every(function (__) { return __.checked; }));
      });
      this.$emit('on-check-change', this.getCheckedNodes());
    },
    /**
     * 获取选中的节点
     */
    getCheckedNodes: function getCheckedNodes() {
      return this.flatState.filter(function (_) { return _.checked; }).map(function (_) {
        var __ = _.children;
        var rest = objectWithoutProperties( _, ["children"] );
        var data = rest;
        return data
      })
    },
    /**
     * 获取选择的节点
     */
    getSelectedNodes: function getSelectedNodes() {
      return this.flatState.filter(function (_) { return _.selected; }).map(function (_) {
        var __ = _.children;
        var rest = objectWithoutProperties( _, ["children"] );
        var data = rest;
        return data
      })
    },
    /**
     * 切换折叠和展开子节点
     */
    toggleExpand: function toggleExpand(item) {
      var this$1 = this;

      if (!item.children.length && this.loadData) {
        this.$set(item, 'loading', true);
        this.loadData(item, function (data) {
          item.children = data;
          this$1.$set(item, 'loading', false);
        });
      }
      this.$emit('on-toggle-expand', item);
    }
  },
  mounted: function mounted() {
    this.convertData();
  }
};

/* script */
var __vue_script__$18 = script$18;

/* template */
var __vue_render__$1g = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ui-tree"},[_c('UiTreeNode',{attrs:{"data":_vm.data}})],1)};
var __vue_staticRenderFns__$1g = [];

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
  

  
  var Tree = normalizeComponent_1(
    { render: __vue_render__$1g, staticRenderFns: __vue_staticRenderFns__$1g },
    __vue_inject_styles__$1g,
    __vue_script__$18,
    __vue_scope_id__$1g,
    __vue_is_functional_template__$1g,
    __vue_module_identifier__$1g,
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

var script$19 = {
  props: {
    columns: Array
  }
};

/* script */
var __vue_script__$19 = script$19;

/* template */
var __vue_render__$1h = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ui-table-header"},[_c('table',[_c('colgroup',_vm._l((_vm.columns),function(item){return _c('col',{key:item.key})}),0),_vm._v(" "),_c('thead',[_c('tr',_vm._l((_vm.columns),function(item){return _c('th',{key:item.key},[_c('div',{staticClass:"ui-table-cell"},[_vm._v(_vm._s(item.title))])])}),0)])])])};
var __vue_staticRenderFns__$1h = [];

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
  

  
  var UiTableHeader = normalizeComponent_1(
    { render: __vue_render__$1h, staticRenderFns: __vue_staticRenderFns__$1h },
    __vue_inject_styles__$1h,
    __vue_script__$19,
    __vue_scope_id__$1h,
    __vue_is_functional_template__$1h,
    __vue_module_identifier__$1h,
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

var script$1a = {
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
var __vue_script__$1a = script$1a;

/* template */
var __vue_render__$1i = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ui-table-body"},[_c('table',[_c('tbody',_vm._l((_vm.data),function(row,index){return _c('tr',{key:index,class:_vm.setRowClassName(row, index)},_vm._l((_vm.columns),function(col){return _c('td',{key:col.key,class:_vm.setColClassName(row, col)},[_c('div',{staticClass:"ui-table-cell"},[_vm._v(_vm._s(row[col.key]))])])}),0)}),0)])])};
var __vue_staticRenderFns__$1i = [];

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
  

  
  var UiTableBody = normalizeComponent_1(
    { render: __vue_render__$1i, staticRenderFns: __vue_staticRenderFns__$1i },
    __vue_inject_styles__$1i,
    __vue_script__$1a,
    __vue_scope_id__$1i,
    __vue_is_functional_template__$1i,
    __vue_module_identifier__$1i,
    undefined,
    undefined
  );

//
var script$1b = {
  components: { UiTableHeader: UiTableHeader, UiTableBody: UiTableBody },
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
var __vue_script__$1b = script$1b;
/* template */
var __vue_render__$1j = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ui-table-wrapper",class:[{stripe: _vm.stripe, border: _vm.border}]},[_c('div',{staticClass:"ui-table"},[_c('UiTableHeader',{attrs:{"columns":_vm.columns}}),_vm._v(" "),_c('UiTableBody',{style:(_vm.bodyStyle),attrs:{"data":_vm.data,"columns":_vm.columns,"rowClassName":_vm.rowClassName}})],1)])};
var __vue_staticRenderFns__$1j = [];

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
  

  
  var Table = normalizeComponent_1(
    { render: __vue_render__$1j, staticRenderFns: __vue_staticRenderFns__$1j },
    __vue_inject_styles__$1j,
    __vue_script__$1b,
    __vue_scope_id__$1j,
    __vue_is_functional_template__$1j,
    __vue_module_identifier__$1j,
    undefined,
    undefined
  );

var propsMixin = {
  value: Date,
  placement: {
    default: 'bottom-start',
    validator: function validator(value) {
      return [
        'top', 'top-start', 'top-end',
        'right', 'right-start', 'right-end',
        'bottom', 'bottom-start', 'bottom-end',
        'left', 'left-start', 'left-end'
      ]
    }
  },
  placeholder: String,
  confirm: Boolean,
  open: {
    type: Boolean,
    default: null
  },
  size: {
    validator: function validator(value) {
      return ['large', 'small', 'default'].indexOf(value) !== -1
    }
  },
  disabled: Boolean,
  clearable: {
    type: Boolean,
    default: true
  },
  readonly: Boolean,
  editable: {
    type: Boolean,
    default: true
  },
  elementId: String
};

//
var script$1c = {
  data: function data() {
    return {
      weeks: ['日', '一', '二', '三', '四', '五', '六']
    }
  },
  props: {
    date: {
      type: Date,
      default: function () { return new Date(); }
    }
  },
  computed: {
    dayCount: function dayCount() {
      return new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate()
    },
    firstDayOfWeek: function firstDayOfWeek() {
      var date = new Date(this.date);
      date.setDate(1);
      return date.getDay()
    }
  }
};

/* script */
var __vue_script__$1c = script$1c;
/* template */
var __vue_render__$1k = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ui-datepicker-dateview"},[_vm._l((_vm.weeks),function(cell){return _c('span',{key:cell,staticClass:"ui-datepicker-dateview-cell disabled"},[_c('span',[_vm._v(_vm._s(cell))])])}),_vm._v(" "),_vm._l((_vm.dayCount),function(cell){return _c('span',{key:cell,staticClass:"ui-datepicker-dateview-cell"},[_c('span',[_vm._v(_vm._s(cell))])])})],2)};
var __vue_staticRenderFns__$1k = [];

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
  

  
  var UiDateView = normalizeComponent_1(
    { render: __vue_render__$1k, staticRenderFns: __vue_staticRenderFns__$1k },
    __vue_inject_styles__$1k,
    __vue_script__$1c,
    __vue_scope_id__$1k,
    __vue_is_functional_template__$1k,
    __vue_module_identifier__$1k,
    undefined,
    undefined
  );

//
var script$1d = {
  components: { UiIcon: Icon }
};

/* script */
var __vue_script__$1d = script$1d;
/* template */
var __vue_render__$1l = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ui-datepicker-header"},[_c('span',{staticClass:"ui-datepicker-header-icon"},[_c('UiIcon',{attrs:{"type":"ios-arrow-left"}}),_vm._v(" "),_c('UiIcon',{attrs:{"type":"ios-arrow-left"}})],1),_vm._v(" "),_c('span',{staticClass:"ui-datepicker-header-icon"},[_c('UiIcon',{attrs:{"type":"ios-arrow-left"}})],1),_vm._v(" "),_vm._m(0),_vm._v(" "),_c('span',{staticClass:"ui-datepicker-header-icon"},[_c('UiIcon',{attrs:{"type":"ios-arrow-right"}})],1),_vm._v(" "),_c('span',{staticClass:"ui-datepicker-header-icon"},[_c('UiIcon',{attrs:{"type":"ios-arrow-right"}}),_vm._v(" "),_c('UiIcon',{attrs:{"type":"ios-arrow-right"}})],1)])};
var __vue_staticRenderFns__$1l = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"ui-datepicker-header-labels"},[_c('span',{staticClass:"ui-datepicker-header-label"},[_vm._v("2019年")]),_vm._v(" "),_c('span',{staticClass:"ui-datepicker-header-label"},[_vm._v("4月")])])}];

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
  

  
  var UiHeader$1 = normalizeComponent_1(
    { render: __vue_render__$1l, staticRenderFns: __vue_staticRenderFns__$1l },
    __vue_inject_styles__$1l,
    __vue_script__$1d,
    __vue_scope_id__$1l,
    __vue_is_functional_template__$1l,
    __vue_module_identifier__$1l,
    undefined,
    undefined
  );

//
var script$1e = {
  name: 'ui-datepicker',
  mixins: [propsMixin],
  components: { UiInput: Input, UiDrop: UiDrop, UiDateView: UiDateView, UiHeader: UiHeader$1 },
  data: function data() {
    return {
      dropVisible: false
    }
  },
  props: {
    type: {
      default: 'date',
      validator: function validator(value) {
        return ['date', 'daterange', 'datetime', 'datetimerange', 'year', 'month'].indexOf(value) !== -1
      }
    },
    format: String,
    options: Object,
    splitPanels: Boolean,
    multiple: Boolean,
    showWeekNumbers: Boolean,
    startDate: Date,
    timePickerOptions: {
      type: Object,
      default: function () {}
    }
  },
  methods: {
    handleClick: function handleClick() {
      this.dropVisible = true;
    },
    handleWinClick: function handleWinClick(event) {
      if (
        isSelfOrParent(this.$el, event.target) || 
        isSelfOrParent(this.$refs.UiDrop.$el, event.target)
      ) { return }
      this.dropVisible = false;
    }
  }
};

/* script */
var __vue_script__$1e = script$1e;
/* template */
var __vue_render__$1m = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"winclick",rawName:"v-winclick",value:(_vm.handleWinClick),expression:"handleWinClick"}],staticClass:"ui-datepicker",on:{"click":_vm.handleClick}},[_c('UiInput',{attrs:{"icon":"ios-calendar-outline"}}),_vm._v(" "),_c('ui-drop',{ref:"UiDrop",staticClass:"ui-datepicker-dropdown",attrs:{"visible":_vm.dropVisible,"parentName":_vm.$options.name}},[_c('UiHeader'),_vm._v(" "),_c('UiDateView')],1)],1)};
var __vue_staticRenderFns__$1m = [];

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
  

  
  var DatePicker = normalizeComponent_1(
    { render: __vue_render__$1m, staticRenderFns: __vue_staticRenderFns__$1m },
    __vue_inject_styles__$1m,
    __vue_script__$1e,
    __vue_scope_id__$1m,
    __vue_is_functional_template__$1m,
    __vue_module_identifier__$1m,
    undefined,
    undefined
  );

//
var script$1f = {
  mixins: [propsMixin],
  props: {
    type: {
      default: 'time',
      validator: function validator(value) {
        return ['', ''].indexOf(value) !== -1
      }
    },
    format: {
      type: String,
      default: 'HH:mm:ss'
    },
    steps: {
      type: Array,
      default: function () { return []; }
    }
  }
};

/* script */
var __vue_script__$1f = script$1f;
/* template */
var __vue_render__$1n = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div')};
var __vue_staticRenderFns__$1n = [];

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
  

  
  var TimePicker = normalizeComponent_1(
    { render: __vue_render__$1n, staticRenderFns: __vue_staticRenderFns__$1n },
    __vue_inject_styles__$1n,
    __vue_script__$1f,
    __vue_scope_id__$1n,
    __vue_is_functional_template__$1n,
    __vue_module_identifier__$1n,
    undefined,
    undefined
  );

/**
 * 全局指令模块
 */

 /**
  * 事件管理器类
  */
var EventManager = function EventManager(object, eventName) {
  this.handlers = [];
  this.object = object;
  this.eventName = eventName;
  this.eventHandler = this.eventHandler.bind(this);
  this.addListener();
};

EventManager.prototype.addListener = function addListener () {
  this.object.addEventListener(this.eventName, this.eventHandler);
};

EventManager.prototype.removeListener = function removeListener () {
  this.object.removeEventListener(this.eventName, this.eventHandler);
};

EventManager.prototype.addHandler = function addHandler (f) {
  this.handlers.push(f);
};

EventManager.prototype.removeHandler = function removeHandler (f) {
  this.handlers.splice(this.handlers.indexOf(f), 1);
};

EventManager.prototype.eventHandler = function eventHandler (event) {
  this.handlers.forEach(function (handler) { return handler(event); });
};

EventManager.prototype.getHandlerCount = function getHandlerCount () {
  return this.handlers.length
};

/**
 * 创建事件指令
 * @param {Vue.VueConstructor} Vue 
 */
function createEventDirective(Vue) {
  return function (directiveName, object, eventName) {
    var eventManager = null;
    Vue.directive(directiveName, {
      inserted: function inserted(el, ref) {
        var value = ref.value;

        if (typeof value !== 'function') { return }
        if (!eventManager) {
          eventManager = new EventManager(object, eventName);
        }
        el[directiveName + eventName] = value;
        eventManager.addHandler(value);
      },
      unbind: function unbind(el) {
        var handler = el[directiveName + eventName];
        handler && eventManager.removeHandler(handler);
        if (eventManager.getHandlerCount() === 0) {
          eventManager.removeListener();
          eventManager = null;
        }
      }
    });
  }
}

/**
 * 创建指令
 * @param {Vue.VueConstructor} Vue 
 */
function createDirectives(Vue) {
  createEventDirective(Vue)('winclick', window, 'click');
}

/**
 * 对话框工具模块
 */

function getDefaultProps() {
  return {
    title: String,
    content: String,
    closable: {
      type: Boolean,
      default: true
    },
    loading: Boolean,
    scrollable: Boolean,
    okText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    width: {
      type: [Number, String],
      default: 520
    },
    styles: Object,
    className: String,
    maskClosable: {
      type: Boolean,
      default: true
    },
    middle: Boolean
  }
}

//
var script$1g = {
  components: { UiButton: UiButton, UiCloseIconButton: CloseIconButton },
  data: function data() {
    return { hasTitle: false }
  },
  props: getDefaultProps(),
  computed: {
    dialogStyle: function dialogStyle() {
      var width = (parseInt(this.width)) + "px";
      return Object.assign({}, {width: width, maxWidth: width}, this.styles)
    }
  },
  methods: {
    handleMaskClick: function handleMaskClick() {
      if (this.maskClosable) { this.close(); }
    },
    close: function close() {
      this.$emit('close');
    },
    handleCancel: function handleCancel() {
      this.$emit('cancel');
    },
    handleOK: function handleOK() {
      this.$emit('ok');
    }
  },
  mounted: function mounted() {
    this.hasTitle = this.$slots.header !== undefined || this.title;
  }
};

/* script */
var __vue_script__$1g = script$1g;
/* template */
var __vue_render__$1o = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ui-modal",class:[{middle: _vm.middle}, _vm.className]},[_c('div',{staticClass:"ui-modal-mask",on:{"click":_vm.handleMaskClick}}),_vm._v(" "),_c('div',{staticClass:"ui-modal-dialog",style:(_vm.dialogStyle)},[(_vm.hasTitle)?_c('div',{staticClass:"ui-modal-header"},[_vm._t("header",[_vm._v(_vm._s(_vm.title))])],2):_vm._e(),_vm._v(" "),(_vm.closable)?_c('a',{staticClass:"ui-modal-close",on:{"click":_vm.close}},[_vm._t("close",[_c('UiCloseIconButton')])],2):_vm._e(),_vm._v(" "),_c('div',{staticClass:"ui-modal-body"},[_vm._t("default")],2),_vm._v(" "),_c('div',{staticClass:"ui-modal-footer"},[_vm._t("footer",[_c('ui-button',{attrs:{"type":"text","size":"large"},on:{"click":_vm.handleCancel}},[_vm._v(_vm._s(_vm.cancelText))]),_vm._v(" "),_c('ui-button',{attrs:{"type":"primary","size":"large","loading":_vm.loading},on:{"click":_vm.handleOK}},[_vm._v(_vm._s(_vm.okText))])])],2)])])};
var __vue_staticRenderFns__$1o = [];

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
  

  
  var UiModalView = normalizeComponent_1(
    { render: __vue_render__$1o, staticRenderFns: __vue_staticRenderFns__$1o },
    __vue_inject_styles__$1o,
    __vue_script__$1g,
    __vue_scope_id__$1o,
    __vue_is_functional_template__$1o,
    __vue_module_identifier__$1o,
    undefined,
    undefined
  );

//
var script$1h = {
  components: { UiIcon: Icon, UiButton: UiButton, UiModalView: UiModalView },
  data: function data() {
    return {
      visible: false
    }
  },
  props: Object.assign({}, getDefaultProps(),
    {type: {
      validator: function validator(value) {
        return ['info', 'success', 'warning', 'error', 'confirm'].indexOf(value) !== -1
      }
    }}),
  computed: {
    iconType: function iconType() {
      return iconTypes[this.type]
    },
    isNormal: function isNormal() {
      return this.type === 'confirm'
    }
  },
  methods: {
    handleOK: function handleOK() {
      this.$emit('ok');
    },
    handleClose: function handleClose() {
      this.$emit('close');
    },
    handleCancel: function handleCancel() {
      this.$emit('cancel');
    }
  },
  mounted: function mounted() {
    this.visible = true;
  }
};

/* script */
var __vue_script__$1h = script$1h;
/* template */
var __vue_render__$1p = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.visible)?_c('UiModalView',_vm._b({staticClass:"ui-dialog",class:[_vm.type],attrs:{"maskClosable":false},on:{"ok":_vm.handleOK,"close":_vm.handleClose,"cancel":_vm.handleCancel}},'UiModalView',this.$props,false),[_c('div',{staticClass:"ui-dialog-content"},[_c('UiIcon',{staticClass:"ui-dialog-icon",attrs:{"type":_vm.iconType}}),_vm._v(" "),_c('div',{domProps:{"innerHTML":_vm._s(_vm.content)}})],1),_vm._v(" "),(!_vm.isNormal)?_c('UiButton',{attrs:{"slot":"footer","type":"primary","size":"large"},on:{"click":_vm.handleOK},slot:"footer"},[_vm._v(_vm._s(_vm.okText || '确定'))]):_vm._e()],1):_vm._e()};
var __vue_staticRenderFns__$1p = [];

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
  

  
  var UiDialog = normalizeComponent_1(
    { render: __vue_render__$1p, staticRenderFns: __vue_staticRenderFns__$1p },
    __vue_inject_styles__$1p,
    __vue_script__$1h,
    __vue_scope_id__$1p,
    __vue_is_functional_template__$1p,
    __vue_module_identifier__$1p,
    undefined,
    undefined
  );

/**
 * 通用对话框模块
 */

function objectWithoutProperties$1 (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }

/**
 * 创建对话框
 * @param {Vue.VueConstructor} Vue 
 */
function createModal(Vue) {
  return {
    create: function create(type, options) {
      if ( options === void 0 ) options = {};

      winScrollbarLock.lock();
      var onOk = options.onOk;
      var onCancel = options.onCancel;
      var rest = objectWithoutProperties$1( options, ["onOk", "onCancel"] );
      var props = rest;
      this.instance = new Vue({
        data: function data() {
          return {
            visible: true,
            loading: options.loading,
            isLoading: false,
            zIndex: getMaxZIndex()
          }
        },
        watch: {
          visible: function visible(newVal) {
            if (newVal) { return }
            winScrollbarLock.unlock();
            this.isLoading = false;
          }
        },
        render: function render(h) {
          var this$1 = this;

          return this.visible && h('transition', {
            props: { name: 'ui-modal' },
            on: {
              afterLeave: function () { return this$1.$destroy(); }
            }
          }, [
            h(UiDialog, {
              props: Object.assign({}, props, {type: type, loading: this.isLoading}),
              style: { zIndex: this.zIndex },
              on: {
                ok: function () {
                  isFunc(onOk) && onOk();
                  if (this$1.loading) { return this$1.isLoading = true }
                  this$1.close();
                },
                close: this.close,
                cancel: function () {
                  this$1.close();
                  isFunc(onCancel) && onCancel();
                }
              }
            })
          ])
        },
        methods: {
          close: function close() {
            this.visible = false;
          }
        },
        mounted: function mounted() {
          document.body.appendChild(this.$el);
        },
        beforeDestroy: function beforeDestroy() {
          this.$el.remove();
        }
      }).$mount();
    },
  
    info: function info(options) {
      return this.create('info', options)
    },
  
    success: function success(options) {
      return this.create('success', options)
    },
  
    warning: function warning(options) {
      return this.create('warning', options)
    },
  
    error: function error(options) {
      return this.create('error', options)
    },
  
    confirm: function confirm(options) {
      return this.create('confirm', options)
    },
  
    remove: function remove() {
      this.instance && (this.instance.visible = false);
    }
  }
}

//
var script$1i = {
  components: { UiModalView: UiModalView },
  data: function data() {
    return {
      zIndex: getMaxZIndex(),
      visible: this.value,
      isLoading: false
    }
  },
  props: Object.assign({}, getDefaultProps(), {value: Boolean}),
  watch: {
    value: function value(newVal) {
      this.visible = newVal;
      if (newVal) {
        winScrollbarLock.lock();
        this.zIndex = getMaxZIndex();
      } else {
        winScrollbarLock.unlock();
        this.isLoading = false;
      }
    }
  },
  methods: {
    handleClose: function handleClose() {
      this.visible = false;
      this.$emit('input', false);
      this.$emit('on-visible-change', false);
    },
    handleCancel: function handleCancel() {
      this.$emit('on-cancel');
      this.handleClose();
    },
    handleOK: function handleOK() {
      this.$emit('on-ok');
      if (this.loading) {
        return this.isLoading = true
      }
      this.handleClose();
    }
  },
  mounted: function mounted() {
    document.body.appendChild(this.$el);
  },
  beforeDestroy: function beforeDestroy() {
    this.$el.remove();
  }
};

/* script */
var __vue_script__$1i = script$1i;

/* template */
var __vue_render__$1q = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":"ui-modal"}},[(_vm.visible)?_c('UiModalView',_vm._b({style:({zIndex: _vm.zIndex}),attrs:{"loading":_vm.isLoading},on:{"ok":_vm.handleOK,"close":_vm.handleClose,"cancel":_vm.handleCancel}},'UiModalView',this.$props,false),[_vm._t("default"),_vm._v(" "),_vm._t("close",null,{"slot":"close"}),_vm._v(" "),_vm._t("header",null,{"slot":"header"}),_vm._v(" "),_vm._t("footer",null,{"slot":"footer"})],2):_vm._e()],1)};
var __vue_staticRenderFns__$1q = [];

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
  

  
  var Modal = normalizeComponent_1(
    { render: __vue_render__$1q, staticRenderFns: __vue_staticRenderFns__$1q },
    __vue_inject_styles__$1q,
    __vue_script__$1i,
    __vue_scope_id__$1q,
    __vue_is_functional_template__$1q,
    __vue_module_identifier__$1q,
    undefined,
    undefined
  );

var comps = {
  Icon: Icon,
  Avatar: Avatar,
  Card: Card,
  Alert: Alert,
  Badge: Badge,
  Rate: Rate,
  ICircle: Circle,
  Breadcrumb: Breadcrumb,
  BreadcrumbItem: BreadcrumbItem,
  Timeline: Timeline,
  TimelineItem: TimelineItem,
  Spin: UiSpin,
  Step: Step,
  Steps: Steps,
  Affix: Affix,
  Row: Row,
  Col: Col,
  BackTop: BackTop,
  Progress: Progress,
  Button: Button,
  ButtonGroup: ButtonGroup,
  Divider: Divider,
  ISwitch: UiSwitch,
  Scroll: Scroll,
  Checkbox: Checkbox,
  CheckboxGroup: CheckboxGroup,
  Layout: Layout,
  Header: Header,
  Content: Content,
  Footer: Footer,
  Sider: Sider,
  Tag: Tag,
  Collapse: Collapse,
  Panel: Panel,
  Cell: Cell,
  CellGroup: CellGroup,
  Radio: Radio,
  RadioGroup: RadioGroup,
  Tabs: Tabs,
  TabPane: TabPane,
  Input: Input,

  Time: Time,
  Drawer: Drawer,
  Anchor: Anchor,
  AnchorLink: AnchorLink,
  Split: Split,
  Cascader: Cascader,
  ColorPicker: ColorPicker,
  Upload: Upload,
  Modal: Modal,
  Swiper: Swiper,
  SwiperItem: SwiperItem,
  Transfer: Transfer,
  InputNumber: InputNumber,
  Select: Select,
  Option: Option,
  OptionGroup: OptionGroup,
  Page: Page,
  Dropdown: Dropdown,
  DropdownMenu: DropdownMenu,
  DropdownItem: DropdownItem,
  Menu: Menu,
  MenuItem: MenuItem,
  Submenu: Submenu,
  MenuGroup: MenuGroup,
  Tooltip: Tooltip,
  Poptip: Poptip,
  Tree: Tree,
  Table: Table,
  Slider: Slider,
  Form: Form,
  FormItem: FormItem,
  AutoComplete: AutoComplete,
  DatePicker: DatePicker,
  TimePicker: TimePicker
};

var index = {
  /**
   * 安装插件
   * @param {import('vue').VueConstructor} Vue 
   * @param {Object} options 
   */
  install: function install(Vue, options) {
    if ( options === void 0 ) options = {};

    Vue.prototype.$uiTools = tools;
    Vue.prototype.$Notice = createNotice(Vue);
    Vue.prototype.$Message = createMessage(Vue);
    Vue.prototype.$Spin = spinService(Vue);
    Vue.LoadingBar = Vue.prototype.$Loading = loadingBarService(Vue);
    var prefix = typeof options.prefix === 'string' ? options.prefix : 'Ui';
    for (var name in comps) { Vue.component(prefix + name, comps[name]); }

    // // 标准对话框
    Vue.prototype.$Modal = createModal(Vue);
    // // 全局指令
    createDirectives(Vue);
  }
};

export default index;
