(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global['xview-ui'] = factory());
}(this, (function () { 'use strict';

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
    return _c("i", { class: _vm.classes, style: _vm.styles })
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

  //
  var script$1 = {
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
      customIcon: String,
      to: [String, Object],
      replace: Boolean,
      target: String,
      append: Boolean
    },
    data: function data() {
      return { prefix: 'x-btn', iconOnly: false }
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
        return [
          prefix,
          (prefix + "_" + type),
          size && (prefix + "_size_" + size),
          shape && (prefix + "_" + shape),
          { long: long, ghost: ghost, loading: loading, disabled: disabled, iconOnly: iconOnly }
        ]
      },
      btnProps: function btnProps() {
        var ref = this;
        var to = ref.to;
        var target = ref.target;
        var $router = ref.$router;
        var replace = ref.replace;
        var append = ref.append;
        var disabled = ref.disabled;
        var type = ref.htmlType;
        return to ? !target && $router ? 
          { is: 'RouterLink', to: to, replace: replace, append: append } : { is: 'a', target: target, href: to } : { is: 'button', disabled: disabled, type: type }
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

  var tools = /*#__PURE__*/Object.freeze({
    __proto__: null,
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
    addStylesheet: addStylesheet,
    parseSize: parseSize,
    UiRender: UiRender,
    setAutoHeight: setAutoHeight,
    dateFormat: dateFormat
  });

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
  var script$2 = {
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
    directives: {
      winresize: winresize,
      winscroll: winscroll
    },
    watch: {
      fixed: function fixed(newVal) {
        this.$emit('on-change', newVal);
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
          this$1.fixed = this$1.isFixedBottom ? window.innerHeight - rect.bottom <= this$1.offsetBottom : rect.top <= this$1.offsetTop;
        }, 50)
      },
      onResize: function onResize() {
        var this$1 = this;

        return throttle(function () {
          var rect = this$1.$el.getBoundingClientRect();
          this$1.placeholderStyle = { width: ((rect.width) + "px"), height: ((rect.height) + "px") };
          var obj = this$1.isFixedBottom ? { bottom: ((this$1.offsetBottom) + "px") } : { top: ((this$1.offsetTop) + "px") };
          this$1.affixStyle = Object.assign({}, obj, {left: ((rect.left) + "px")});
        }, 50)
      }
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
          { class: { "ui-affix": _vm.fixed }, style: _vm.affixStyle },
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
  var script$3 = {
    name: 'UiCloseIconButton',
    components: { UiIcon: __vue_component__ },
    props: {
      size: {
        type: [Number, String],
        default: 22
      }
    },
    computed: {
      styles: function styles() {
        var size = parseSize(this.size);
        return { width: size, fontSize: size }
      }
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
      "UiIcon",
      _vm._g(
        {
          staticClass: "ui-close-icon-button",
          style: _vm.styles,
          attrs: { type: "ios-close-empty" }
        },
        _vm.$listeners
      )
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

  //
  var script$4 = {
    name: 'UiAlert',
    components: { UiIcon: __vue_component__, UiCloseIconButton: __vue_component__$3 },
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
        return [prefix, (prefix + "-" + type), { hasDesc: hasDesc }]
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
  var __vue_render__$4 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("transition", { attrs: { name: _vm.prefix } }, [
      _vm.visible
        ? _c(
            "div",
            { class: _vm.classes },
            [
              _vm.showIcon
                ? _c("UiIcon", {
                    class: _vm.prefix + "-icon",
                    attrs: { type: _vm.iconType }
                  })
                : _vm._e(),
              _vm._v(" "),
              _c("div", { class: _vm.prefix + "-body" }, [
                _c("p", { class: _vm.prefix + "-title" }, [_vm._t("default")], 2),
                _vm._v(" "),
                _c("p", { class: _vm.prefix + "-desc" }, [_vm._t("desc")], 2)
              ]),
              _vm._v(" "),
              _vm.closable
                ? _c("UiCloseIconButton", {
                    class: _vm.prefix + "-close",
                    on: { click: _vm.close }
                  })
                : _vm._e()
            ],
            1
          )
        : _vm._e()
    ])
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
    name: 'UiAvatar',
    components: { UiIcon: __vue_component__ },
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
        return [prefix, (prefix + "-" + shape), (prefix + "-" + size), { isIcon: icon }]
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
    return _c(
      "span",
      _vm._g({ class: _vm.classes }, _vm.$listeners),
      [
        _vm._t("default", [
          _vm.src
            ? _c("img", { attrs: { src: _vm.src } })
            : _vm.icon
            ? _c("UiIcon", { attrs: { type: _vm.icon } })
            : _vm._e()
        ])
      ],
      2
    )
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
    name: 'UiAnchor',
    components: { UiAffix: __vue_component__$2 },
    data: function data() {
      return {
        prefix: 'ui-anchor',
        items: [],
        activeItem: null,
        ballStyle: {}
      }
    },
    props: {
      affix: {
        type: Boolean,
        default: true
      },
      offsetTop: {
        type: Number,
        default: 0
      },
      offsetBottom: Number,
      scrollOffset: {
        type: Number,
        default: 0
      },
      showInk: Boolean
    },
    computed: {
      tag: function tag() {
        return this.affix ? __vue_component__$2 : 'div'
      }
    },
    directives: { winscroll: winscroll },
    watch: {
      activeItem: function activeItem(newval) {
        var this$1 = this;

        if (!this.showInk || !newval) { return }
        this.$nextTick(function () {
          var bh = this$1.$refs.Ball.offsetHeight;
          var ref = newval.$el;
          var oh = ref.offsetHeight;
          var ot = ref.offsetTop;
          this$1.ballStyle = { top: ((ot + (oh - bh) / 2) + "px") };
        });
      }
    },
    methods: {
      addItem: function addItem(vm) {
        this.items.push(vm);
      },
      removeItem: function removeItem(vm) {
        this.items.splice(this.items.indexOf(vm), 1);
      },
      onScroll: function onScroll() {
        var this$1 = this;

        return throttle(function () {
          this$1.activeItem = null;
          this$1.items.forEach(function (_) {
            var el = document.querySelector(_.href);
            if (!el) { return }
            var rect = el.getBoundingClientRect();
            var scrollOffset = _.scrollOffset || this$1.scrollOffset;
            if (rect.top <= scrollOffset && rect.bottom > 0) {
              this$1.activeItem = _;
            }
          });
        }, 50)
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
      _vm.tag,
      {
        tag: "div",
        class: _vm.prefix,
        attrs: { offsetTop: _vm.offsetTop, offsetBottom: _vm.offsetBottom }
      },
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
            class: _vm.prefix + "-ink"
          },
          [
            _vm.showInk
              ? _c("span", {
                  ref: "Ball",
                  class: _vm.prefix + "-ball",
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
    name: 'UiAnchorLink',
    data: function data() {
      return { parent: null }
    },
    props: {
      href: String,
      title: String,
      scrollOffset: {
        type: Number,
        default: 0
      }
    },
    computed: {
      active: function active() {
        return this.parent && this.parent.activeItem === this
      }
    },
    mounted: function mounted() {
      this.parent = findParent(this, 'UiAnchor');
      this.parent.addItem(this);
    },
    beforeDestroy: function beforeDestroy() {
      this.parent.removeItem(this);
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
      "div",
      { staticClass: "ui-anchor-link" },
      [
        _c("a", { class: { active: _vm.active }, attrs: { href: _vm.href } }, [
          _vm._v(_vm._s(_vm.title))
        ]),
        _vm._v(" "),
        _vm._t("default")
      ],
      2
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
    name: 'UiBackTop',
    components: { UiIcon: __vue_component__ },
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
  var __vue_script__$8 = script$8;
  /* template */
  var __vue_render__$8 = function() {
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
            _c("UiIcon", {
              class: _vm.prefix + "-icon",
              attrs: { type: "ios-arrow-up" }
            })
          ])
        ],
        2
      )
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
    name: 'UiCard',
    components: { UiIcon: __vue_component__ },
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
  var __vue_script__$9 = script$9;
  /* template */
  var __vue_render__$9 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { class: _vm.classes }, [
      _vm.hasHeader
        ? _c(
            "div",
            { class: _vm.prefix + "--header" },
            [
              _c(
                "div",
                { class: _vm.prefix + "--title" },
                [
                  _vm._t("title", [
                    _vm.icon
                      ? _c("UiIcon", { attrs: { type: _vm.icon } })
                      : _vm._e(),
                    _vm._v("\n        " + _vm._s(_vm.title) + "\n      ")
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
      _c(
        "div",
        { class: _vm.prefix + "--body", style: { padding: _vm.padding + "px" } },
        [_vm._t("default")],
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

  var script$a = {
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
  var __vue_script__$a = script$a;
  /* template */
  var __vue_render__$a = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "span",
      { class: [_vm.prefix, { hasSlot: _vm.hasSlot }] },
      [
        _vm._t("default"),
        _vm._v(" "),
        _vm.isDot
          ? _c("sup", {
              class: [_vm.prefix + "--dot", _vm.type],
              style: _vm.contentStyles
            })
          : _vm.isShow
          ? _c("sup", { class: _vm.contentClasses, style: _vm.contentStyles }, [
              _vm._v(_vm._s(_vm.showCount))
            ])
          : _vm._e()
      ],
      2
    )
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
    name: 'UiRate',
    components: { UiIcon: __vue_component__ },
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
  var __vue_script__$b = script$b;
  /* template */
  var __vue_render__$b = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { class: _vm.prefix }, [
      _c(
        "ul",
        { class: _vm.prefix + "--list" },
        _vm._l(_vm.count, function(i) {
          return _c(
            "li",
            { key: i, class: _vm.prefix + "--item" },
            [
              _c("UiIcon", {
                class: _vm.fullClasses(i),
                attrs: { type: _vm.icon },
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
                    { class: _vm.prefix + "--half" },
                    [
                      _c("UiIcon", {
                        class: _vm.halfClasses(i),
                        attrs: { type: _vm.icon },
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
            { class: _vm.prefix + "--text" },
            [_vm._t("default", [_vm._v(_vm._s(_vm.inputValue) + " 星")])],
            2
          )
        : _vm._e()
    ])
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
  var prefix = 'ui-notice';
  var script$c = {
    name: 'UiNotice',
    components: { UiIcon: __vue_component__, UiCloseIconButton: __vue_component__$3 },
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
  var __vue_script__$c = script$c;
  /* template */
  var __vue_render__$c = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { class: _vm.prefix }, [
      _c(
        "div",
        { class: [_vm.prefix + "--box", { hasDesc: _vm.hasDesc }] },
        [
          _vm.showIcon
            ? _c("UiIcon", {
                class: [_vm.prefix + "--icon", _vm.type],
                attrs: { type: _vm.iconType }
              })
            : _vm._e(),
          _vm._v(" "),
          _c(
            "div",
            { class: _vm.prefix + "--body" },
            [
              _vm.title
                ? _c("div", { class: _vm.prefix + "--title" }, [
                    _vm._v(_vm._s(_vm.title))
                  ])
                : _vm._e(),
              _vm._v(" "),
              _vm._t("default")
            ],
            2
          ),
          _vm._v(" "),
          _c("UiCloseIconButton", {
            class: _vm.prefix + "--close",
            on: { click: _vm.close }
          })
        ],
        1
      )
    ])
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
  var prefix$1 = 'ui-message';
  var script$d = {
    name: 'UiMessage',
    components: { UiIcon: __vue_component__, UiCloseIconButton: __vue_component__$3 },
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
  var __vue_script__$d = script$d;
  /* template */
  var __vue_render__$d = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { class: _vm.prefix }, [
      _c(
        "div",
        { class: _vm.prefix + "--box" },
        [
          _c("UiIcon", {
            class: [_vm.prefix + "--icon", _vm.type],
            attrs: { type: _vm.iconType }
          }),
          _vm._v(" "),
          _vm._t("default"),
          _vm._v(" "),
          _vm.closable
            ? _c("UiCloseIconButton", {
                class: _vm.prefix + "--close",
                on: { click: _vm.close }
              })
            : _vm._e()
        ],
        2
      )
    ])
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
  //
  //
  //
  //
  //
  //

  var script$e = {
    props: {
      transition: String
    }
  };

  /* script */
  var __vue_script__$e = script$e;
  /* template */
  var __vue_render__$e = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { staticClass: "ui-notice-wrapper" },
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
            __vue_component__$e,
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

  var createNotice = function (Vue) { return createNoticeManager(Vue, __vue_component__$c, { duration: 4 }); };
  var createMessage = function (Vue) { return createNoticeManager(Vue, __vue_component__$d); };

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

  var script$f = {
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
  var __vue_script__$f = script$f;
  /* template */
  var __vue_render__$f = function() {
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
            "stroke-width": _vm.computedStrokeWidth,
            "fill-opacity": "0"
          }
        })
      ]),
      _vm._v(" "),
      _c("div", { class: _vm.prefix + "--inner" }, [_vm._t("default")], 2)
    ])
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
  //
  //
  //
  //

  var script$g = {
    name: 'UiBreadcrumb',
    props: {
      separator: {
        type: String,
        default: '/'
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
    return _c("div", { staticClass: "ui-breadcrumb" }, [_vm._t("default")], 2)
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
  var script$h = {
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
  var __vue_script__$h = script$h;
  /* template */
  var __vue_render__$h = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "span",
      { class: _vm.prefix },
      [
        _vm.to
          ? _c(
              "router-link",
              {
                class: _vm.prefix + "--link",
                attrs: { to: _vm.to, replace: _vm.replace, append: _vm.append }
              },
              [_vm._t("default")],
              2
            )
          : _vm.href
          ? _c(
              "a",
              {
                class: _vm.prefix + "--link",
                attrs: { href: _vm.href, target: _vm.target }
              },
              [_vm._t("default")],
              2
            )
          : _c(
              "span",
              { class: [_vm.prefix + "--link", "notlink"] },
              [_vm._t("default")],
              2
            ),
        _vm._v(" "),
        _c("span", {
          class: _vm.prefix + "--separator",
          domProps: { innerHTML: _vm._s(_vm.separator) }
        })
      ],
      1
    )
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

  var script$i = {
    name: 'UiTimeline',
    props: { pending: Boolean }
  };

  /* script */
  var __vue_script__$i = script$i;
  /* template */
  var __vue_render__$i = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "ul",
      { staticClass: "ui-timeline", class: { pending: _vm.pending } },
      [_vm._t("default")],
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
  //
  //
  //
  //
  //
  //

  var script$j = {
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
  var __vue_script__$j = script$j;
  /* template */
  var __vue_render__$j = function() {
    var _obj;
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("li", { class: _vm.prefix }, [
      _c("span", { class: _vm.prefix + "--tail" }),
      _vm._v(" "),
      _c(
        "span",
        {
          class: [
            _vm.prefix + "--dot",
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
      _c("div", { class: _vm.prefix + "--content" }, [_vm._t("default")], 2)
    ])
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

  var script$k = {
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
  var __vue_script__$k = script$k;
  /* template */
  var __vue_render__$k = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("transition", { attrs: { name: _vm.prefix } }, [
      _c("div", { class: [_vm.prefix, { fix: _vm.fix }] }, [
        _c(
          "div",
          [
            _vm._t("default", [
              _c("div", { class: [_vm.prefix + "--dot", _vm.size] })
            ])
          ],
          2
        )
      ])
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
            return h(__vue_component__$k, {
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
  var script$l = {
    name: 'UiStep',
    components: { UiIcon: __vue_component__ },
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
  var __vue_script__$l = script$l;

  /* template */
  var __vue_render__$l = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      {
        class: [_vm.prefix, _vm.state.status],
        style: { width: _vm.state.width }
      },
      [
        _c("div", { class: _vm.prefix + "--tail" }),
        _vm._v(" "),
        _c(
          "span",
          { class: [_vm.prefix + "--head", { icon: _vm.icon }] },
          [
            _vm.iconType
              ? _c("UiIcon", { attrs: { type: _vm.iconType } })
              : _c("b", [_vm._v(_vm._s(_vm.state.index + 1))])
          ],
          1
        ),
        _vm._v(" "),
        _c("div", { class: _vm.prefix + "--main" }, [
          _c("div", { class: _vm.prefix + "--title" }, [
            _vm._v(_vm._s(_vm.title))
          ]),
          _vm._v(" "),
          _vm.content
            ? _c("div", { class: _vm.prefix + "--content" }, [
                _vm._v(_vm._s(_vm.content))
              ])
            : _vm._e()
        ])
      ]
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
  var __vue_script__$m = script$m;
  /* template */
  var __vue_render__$m = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { staticClass: "ui-steps", class: [_vm.size, _vm.direction] },
      [_vm._t("default")],
      2
    )
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
  //
  //
  //
  //

  var script$n = {
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
  var __vue_script__$n = script$n;
  /* template */
  var __vue_render__$n = function() {
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
  var script$o = {
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
  var __vue_script__$o = script$o;
  /* template */
  var __vue_render__$o = function() {
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
  var script$p = {
    name: 'UiProgress',
    components: { UiIcon: __vue_component__ },
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
  var __vue_script__$p = script$p;
  /* template */
  var __vue_render__$p = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { class: [_vm.prefix, _vm.curStatus, { vertical: _vm.vertical }] },
      [
        _c("div", { class: _vm.prefix + "-box" }, [
          _c("div", { class: _vm.prefix + "-outer" }, [
            _c("div", { class: _vm.prefix + "-inner", style: _vm.innerStyle }, [
              _c("div", { class: _vm.prefix + "-bg", style: _vm.bgStyle })
            ])
          ]),
          _vm._v(" "),
          !_vm.hideInfo
            ? _c(
                "div",
                { class: _vm.prefix + "-text" },
                [
                  _vm._t("default", [
                    _vm.statusIcon
                      ? _c("UiIcon", {
                          class: _vm.prefix + "-status-icon",
                          attrs: { type: _vm.statusIcon }
                        })
                      : _c("span", [
                          _vm._v(_vm._s(Math.min(_vm.percent, 100)) + "%")
                        ])
                  ])
                ],
                2
              )
            : _vm._e()
        ])
      ]
    )
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
  //
  //
  //
  //
  //
  //

  var script$q = {
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
  var __vue_script__$q = script$q;
  /* template */
  var __vue_render__$q = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("transition", { attrs: { name: _vm.prefix } }, [
      _c("div", { class: _vm.prefix, style: _vm.styles }, [
        _c("div", {
          class: [_vm.prefix + "-inner", _vm.status],
          style: _vm.innerStyles
        })
      ])
    ])
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
            return h(__vue_component__$q, {
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
  //
  //
  //
  //

  var script$r = {
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
  var __vue_script__$r = script$r;
  /* template */
  var __vue_render__$r = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      {
        class: [
          _vm.prefix,
          _vm.prefix + "-" + _vm.size,
          _vm.prefix + "-" + _vm.shape,
          { vertical: _vm.vertical }
        ]
      },
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
  //
  //
  //
  //

  var script$s = {
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
  var __vue_script__$s = script$s;
  /* template */
  var __vue_render__$s = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      {
        class: [
          _vm.prefix + "-" + _vm.type,
          _vm.orientation,
          { dashed: _vm.dashed }
        ]
      },
      [
        _vm.hasText && _vm.type === "horizontal"
          ? _c("span", { class: _vm.prefix + "-text" }, [_vm._t("default")], 2)
          : _vm._e()
      ]
    )
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
  //
  //
  //
  //
  //

  var script$t = {
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
  var __vue_script__$t = script$t;
  /* template */
  var __vue_render__$t = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "span",
      {
        class: [
          _vm.prefix,
          _vm.prefix + "-" + _vm.size,
          { checked: _vm.checked, disabled: _vm.disabled }
        ],
        attrs: { tabindex: "0" },
        on: { click: _vm.onClick }
      },
      [_vm.checked ? _vm._t("open") : _vm._t("close")],
      2
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
    name: 'UiLoading',
    components: { UiIcon: __vue_component__, UiSpin: __vue_component__$k },
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
  var __vue_script__$u = script$u;
  /* template */
  var __vue_render__$u = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { class: _vm.prefix },
      [
        _vm.loading
          ? _c(
              "UiSpin",
              { attrs: { fix: "" } },
              [
                _c("UiIcon", {
                  class: [_vm.prefix + "-icon", _vm.iconClass],
                  attrs: { type: "load-c", size: "18" }
                }),
                _vm._v(" "),
                _c("span", { class: _vm.prefix + "-text" }, [
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
    name: 'UiScroll',
    components: { UiLoading: __vue_component__$u },
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
  var __vue_script__$v = script$v;
  /* template */
  var __vue_render__$v = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      {
        staticClass: "ui-scroll",
        style: _vm.styles,
        on: { scroll: _vm.onScroll, mousewheel: _vm.onMouseWheel }
      },
      [
        _vm.topHandlers.length
          ? _c("UiLoading", {
              attrs: { loadingText: _vm.loadingText, loading: _vm.topLoading }
            })
          : _vm._e(),
        _vm._v(" "),
        _vm._t("default"),
        _vm._v(" "),
        _vm.bottomHandlers.length
          ? _c("UiLoading", {
              attrs: { loadingText: _vm.loadingText, loading: _vm.bottomLoading }
            })
          : _vm._e()
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
    name: 'UiCheckbox',
    components: { UiIcon: __vue_component__ },
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
      },
      labelText: function labelText() {
        return typeof this.label === 'boolean' ? '' : this.label
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
  var __vue_script__$w = script$w;
  /* template */
  var __vue_render__$w = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "span",
      {
        class: [
          _vm.prefix,
          _vm.size,
          { checked: _vm.checked || _vm.indeterminate, disabled: _vm.disabled }
        ],
        on: { click: _vm.onClick }
      },
      [
        _c(
          "span",
          { class: _vm.prefix + "-btn", attrs: { tabindex: "0" } },
          [
            _c("UiIcon", {
              class: [_vm.prefix + "-icon", { indeterminate: _vm.indeterminate }],
              attrs: { type: "checkmark" }
            })
          ],
          1
        ),
        _vm._v(" "),
        _vm._t("default", [_vm._v(_vm._s(_vm.labelText))])
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
  //
  //
  //
  //

  var script$x = {
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
  var __vue_script__$x = script$x;

  /* template */
  var __vue_render__$x = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { staticClass: "ui-checkbox-group", class: _vm.size },
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

  var script$y = {
    name: 'UiLayout',
    data: function data() {
      return { hasSider: false }
    },
    mounted: function mounted() {
      this.hasSider = this.$children.some(function (_) { return _.$options.name === 'UiSider'; });
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
      { staticClass: "ui-layout", class: { hasSider: _vm.hasSider } },
      [_vm._t("default")],
      2
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

  /* script */

  /* template */
  var __vue_render__$z = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "ui-layout-header" }, [_vm._t("default")], 2)
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
      {},
      __vue_scope_id__$z,
      __vue_is_functional_template__$z,
      __vue_module_identifier__$z,
      false,
      undefined,
      undefined,
      undefined
    );

  /* script */

  /* template */
  var __vue_render__$A = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "ui-layout-content" }, [_vm._t("default")], 2)
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
      {},
      __vue_scope_id__$A,
      __vue_is_functional_template__$A,
      __vue_module_identifier__$A,
      false,
      undefined,
      undefined,
      undefined
    );

  /* script */

  /* template */
  var __vue_render__$B = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "ui-layout-footer" }, [_vm._t("default")], 2)
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
      {},
      __vue_scope_id__$B,
      __vue_is_functional_template__$B,
      __vue_module_identifier__$B,
      false,
      undefined,
      undefined,
      undefined
    );

  //
  var script$z = {
    name: 'UiSider',
    components: { UiIcon: __vue_component__ },
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
  var __vue_script__$z = script$z;

  /* template */
  var __vue_render__$C = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { class: _vm.prefix, style: _vm.styles },
      [
        _vm._t("default"),
        _vm._v(" "),
        _vm.showTrigger
          ? _c(
              "div",
              {
                class: _vm.prefix + "-trigger",
                style: { width: _vm.styles.width },
                on: { click: _vm.toggleCollapse }
              },
              [
                _c("UiIcon", {
                  class: [
                    _vm.prefix + "-trigger-icon",
                    { isCollapsed: _vm.isCollapsed }
                  ],
                  attrs: { type: "ios-arrow-back" }
                })
              ],
              1
            )
          : _vm._e()
      ],
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
      __vue_script__$z,
      __vue_scope_id__$C,
      __vue_is_functional_template__$C,
      __vue_module_identifier__$C,
      false,
      undefined,
      undefined,
      undefined
    );

  //
  var script$A = {
    name: 'UiTag',
    components: { UiIcon: __vue_component__ },
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
  var __vue_script__$A = script$A;
  /* template */
  var __vue_render__$D = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _vm.fade
      ? _c("transition", { attrs: { name: _vm.prefix } }, [
          _c(
            "div",
            { class: _vm.classes, style: _vm.styles, on: { click: _vm.onClick } },
            [
              _vm._t("default"),
              _vm._v(" "),
              _vm.closable
                ? _c("UiIcon", {
                    class: _vm.prefix + "-close",
                    attrs: { type: "ios-close-empty" },
                    on: { click: _vm.onClose }
                  })
                : _vm._e()
            ],
            2
          )
        ])
      : _c(
          "div",
          { class: _vm.classes, style: _vm.styles, on: { click: _vm.onClick } },
          [
            _vm._t("default"),
            _vm._v(" "),
            _vm.closable
              ? _c("UiIcon", {
                  class: _vm.prefix + "-close",
                  attrs: { type: "ios-close-empty" },
                  on: { click: _vm.onClose }
                })
              : _vm._e()
          ],
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
      __vue_script__$A,
      __vue_scope_id__$D,
      __vue_is_functional_template__$D,
      __vue_module_identifier__$D,
      false,
      undefined,
      undefined,
      undefined
    );

  //
  var script$B = {
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
  var __vue_script__$B = script$B;
  /* template */
  var __vue_render__$E = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { class: ["ui-collapse", { simple: _vm.simple }] },
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
      __vue_script__$B,
      __vue_scope_id__$E,
      __vue_is_functional_template__$E,
      __vue_module_identifier__$E,
      false,
      undefined,
      undefined,
      undefined
    );

  //
  var script$C = {
    name: 'UiPanel',
    components: { UiIcon: __vue_component__ },
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
  var __vue_script__$C = script$C;

  /* template */
  var __vue_render__$F = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { class: _vm.prefix }, [
      _c(
        "div",
        { class: _vm.prefix + "-header", on: { click: _vm.onHeaderClick } },
        [
          !_vm.hideArrow
            ? _c("UiIcon", {
                class: [_vm.prefix + "-icon", { isExpanded: _vm.isExpanded }],
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
              value: _vm.isExpanded,
              expression: "isExpanded"
            }
          ],
          class: _vm.prefix + "-content"
        },
        [_vm._t("content")],
        2
      )
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
      __vue_script__$C,
      __vue_scope_id__$F,
      __vue_is_functional_template__$F,
      __vue_module_identifier__$F,
      false,
      undefined,
      undefined,
      undefined
    );

  //
  var script$D = {
    name: 'UiCell',
    components: { UiIcon: __vue_component__ },
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
  var __vue_script__$D = script$D;
  /* template */
  var __vue_render__$G = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      _vm.root.name,
      _vm._g(
        _vm._b(
          {
            tag: "div",
            class: [
              _vm.prefix,
              { disabled: _vm.disabled, selected: _vm.selected }
            ]
          },
          "div",
          _vm.root.attrs,
          false
        ),
        _vm.listeners
      ),
      [
        _c("div", [
          _c(
            "p",
            { class: _vm.prefix + "-title" },
            [
              _vm._t("default", [_vm._v(_vm._s(_vm.title))]),
              _vm._v(" "),
              _vm._t("icon")
            ],
            2
          ),
          _vm._v(" "),
          _c(
            "p",
            { class: _vm.prefix + "-label" },
            [_vm._t("label", [_vm._v(_vm._s(_vm.label))])],
            2
          )
        ]),
        _vm._v(" "),
        _c(
          "div",
          [
            _vm._t("extra", [_vm._v(_vm._s(_vm.extra))]),
            _vm._v(" "),
            _vm.to
              ? [
                  _vm._t("arrow", [
                    _c("UiIcon", { attrs: { type: "ios-arrow-forward" } })
                  ])
                ]
              : _vm._e()
          ],
          2
        )
      ]
    )
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
      __vue_script__$D,
      __vue_scope_id__$G,
      __vue_is_functional_template__$G,
      __vue_module_identifier__$G,
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

  var script$E = {
    name: 'UiCellGroup'
  };

  /* script */
  var __vue_script__$E = script$E;

  /* template */
  var __vue_render__$H = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", [_vm._t("default")], 2)
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
      __vue_script__$E,
      __vue_scope_id__$H,
      __vue_is_functional_template__$H,
      __vue_module_identifier__$H,
      false,
      undefined,
      undefined,
      undefined
    );

  //
  var script$F = {
    name: 'UiRadio',
    components: { UiButton: __vue_component__$1 },
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
  var __vue_script__$F = script$F;
  /* template */
  var __vue_render__$I = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _vm.isButtonType
      ? _c(
          "UiButton",
          {
            class: [_vm.prefix + "-btn", { checked: _vm.checked }],
            attrs: { disabled: _vm.disabled },
            on: { click: _vm.onClick }
          },
          [_vm._t("default", [_vm._v(_vm._s(_vm.label))])],
          2
        )
      : _c(
          "div",
          {
            class: [_vm.prefix, { disabled: _vm.disabled }],
            attrs: { tabindex: "0" },
            on: { click: _vm.onClick }
          },
          [
            _c("span", {
              class: [_vm.prefix + "-box", { checked: _vm.checked }]
            }),
            _vm._v(" "),
            _c("span", [_vm._t("default", [_vm._v(_vm._s(_vm.label))])], 2)
          ]
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
      __vue_script__$F,
      __vue_scope_id__$I,
      __vue_is_functional_template__$I,
      __vue_module_identifier__$I,
      false,
      undefined,
      undefined,
      undefined
    );

  //
  var script$G = {
    name: 'UiRadioGroup',
    components: { ButtonGroup: __vue_component__$r },
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
  var __vue_script__$G = script$G;

  /* template */
  var __vue_render__$J = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _vm.type === "button"
      ? _c(
          "ButtonGroup",
          {
            staticClass: "ui-radio-group isButtonType",
            attrs: { size: _vm.size }
          },
          [_vm._t("default")],
          2
        )
      : _c(
          "div",
          { staticClass: "ui-radio-group", class: { vertical: _vm.vertical } },
          [_vm._t("default")],
          2
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
      __vue_script__$G,
      __vue_scope_id__$J,
      __vue_is_functional_template__$J,
      __vue_module_identifier__$J,
      false,
      undefined,
      undefined,
      undefined
    );

  //
  var script$H = {
    name: 'UiTabs',
    components: { UiIcon: __vue_component__, UiCloseIconButton: __vue_component__$3, UiRender: UiRender },
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
  var __vue_script__$H = script$H;
  /* template */
  var __vue_render__$K = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      {
        class: [
          _vm.prefix,
          _vm.prefix + "-" + _vm.size,
          _vm.prefix + "-" + _vm.type
        ]
      },
      [
        _c(
          "div",
          { class: _vm.prefix + "-bar" },
          [
            _c(
              "div",
              {
                class: [
                  _vm.prefix + "-nav-wrap",
                  { showNavBtns: _vm.showNavBtns }
                ]
              },
              [
                _c(
                  "ul",
                  {
                    ref: "scrollView",
                    class: _vm.prefix + "-nav",
                    style: { transform: "translateX(" + _vm.translateX + "px)" }
                  },
                  _vm._l(_vm.childs, function(item) {
                    return _c(
                      "li",
                      {
                        key: item.key,
                        ref: item.key,
                        refInFor: true,
                        class: _vm.navItemClasses(item),
                        on: {
                          click: function($event) {
                            return _vm.onNavItemClick(item)
                          }
                        }
                      },
                      [
                        item.icon
                          ? _c("ui-icon", {
                              class: _vm.prefix + "-icon",
                              attrs: { type: item.icon }
                            })
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.isFunc(item.label)
                          ? _c("UiRender", { attrs: { render: item.label } })
                          : [_vm._v(_vm._s(item.label))],
                        _vm._v(" "),
                        _vm.canClose(item)
                          ? _c("ui-close-icon-button", {
                              class: _vm.prefix + "-close",
                              on: {
                                click: function($event) {
                                  $event.stopPropagation();
                                  return _vm.deleteItem(item)
                                }
                              }
                            })
                          : _vm._e()
                      ],
                      2
                    )
                  }),
                  0
                ),
                _vm._v(" "),
                _vm.showNavBtns
                  ? [
                      _c(
                        "span",
                        {
                          class: _vm.prefix + "-nav-prev",
                          on: {
                            click: function($event) {
                              return _vm.onNavPrev()
                            }
                          }
                        },
                        [_c("ui-icon", { attrs: { type: "ios-arrow-back" } })],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "span",
                        {
                          class: _vm.prefix + "-nav-next",
                          on: {
                            click: function($event) {
                              return _vm.onNavNext()
                            }
                          }
                        },
                        [_c("ui-icon", { attrs: { type: "ios-arrow-forward" } })],
                        1
                      )
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
            class: [_vm.prefix + "-content", { animated: _vm.animated }],
            style: _vm.contentStyle
          },
          [_vm._t("default")],
          2
        )
      ]
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
      __vue_script__$H,
      __vue_scope_id__$K,
      __vue_is_functional_template__$K,
      __vue_module_identifier__$K,
      false,
      undefined,
      undefined,
      undefined
    );

  //
  var script$I = {
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
  var __vue_script__$I = script$I;

  /* template */
  var __vue_render__$L = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "ui-tabs-pane" }, [_vm._t("default")], 2)
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
      __vue_script__$I,
      __vue_scope_id__$L,
      __vue_is_functional_template__$L,
      __vue_module_identifier__$L,
      false,
      undefined,
      undefined,
      undefined
    );

  //
  var script$J = {
    name: 'UiInput',
    components: { UiIcon: __vue_component__ },
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
          focus: function focus(event) {
            that.$emit('on-focus', event);
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
  var __vue_script__$J = script$J;
  /* template */
  var __vue_render__$M = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { class: [_vm.prefixCls, !_vm.isArea && _vm.prefixCls + "-" + _vm.size] },
      [
        _vm.$slots.prepend
          ? _c(
              "div",
              { class: _vm.prefixCls + "-prepend" },
              [_vm._t("prepend")],
              2
            )
          : _vm._e(),
        _vm._v(" "),
        _c(
          "div",
          {
            class: [
              _vm.prefixCls + "-box",
              { hasAppend: _vm.hasAppend || _vm.hasSearchAppend }
            ]
          },
          [
            _vm.isArea
              ? _c(
                  "textarea",
                  _vm._g(
                    _vm._b(
                      { class: _vm.prefixCls + "-input textarea" },
                      "textarea",
                      _vm.bindProps,
                      false
                    ),
                    _vm.listeners
                  )
                )
              : [
                  _vm.hasPrefix
                    ? _c(
                        "span",
                        { class: _vm.prefixCls + "-prefix" },
                        [
                          _vm._t("prefix", [
                            _c("ui-icon", { attrs: { type: _vm.prefix } })
                          ])
                        ],
                        2
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.clearable && _vm.value
                    ? _c(
                        "span",
                        {
                          class: _vm.prefixCls + "-suffix clear",
                          on: { click: _vm.clear }
                        },
                        [_c("ui-icon", { attrs: { type: "ios-close" } })],
                        1
                      )
                    : _vm.hasSuffix
                    ? _c(
                        "span",
                        { class: _vm.prefixCls + "-suffix" },
                        [
                          _vm._t("suffix", [
                            _c("ui-icon", { attrs: { type: _vm.suffix } })
                          ])
                        ],
                        2
                      )
                    : _vm.icon
                    ? _c(
                        "span",
                        {
                          class: _vm.prefixCls + "-suffix",
                          on: { click: _vm.onIconClick }
                        },
                        [_c("ui-icon", { attrs: { type: _vm.icon } })],
                        1
                      )
                    : _vm.search && !_vm.enterButton
                    ? _c(
                        "span",
                        {
                          class: _vm.prefixCls + "-suffix search",
                          on: { click: _vm.onSearch }
                        },
                        [_c("ui-icon", { attrs: { type: "ios-search" } })],
                        1
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "input",
                    _vm._g(
                      _vm._b(
                        { class: _vm.prefixCls + "-input" },
                        "input",
                        _vm.bindProps,
                        false
                      ),
                      _vm.listeners
                    )
                  )
                ]
          ],
          2
        ),
        _vm._v(" "),
        _vm.hasAppend
          ? _c("div", { class: _vm.prefixCls + "-append" }, [_vm._t("append")], 2)
          : _vm.hasSearchAppend
          ? _c(
              "div",
              { class: _vm.prefixCls + "-search", on: { click: _vm.onSearch } },
              [
                _vm.enterButton === true
                  ? _c("ui-icon", { attrs: { type: "ios-search" } })
                  : [_vm._v(_vm._s(_vm.enterButton))]
              ],
              2
            )
          : _vm._e()
      ]
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
      __vue_script__$J,
      __vue_scope_id__$M,
      __vue_is_functional_template__$M,
      __vue_module_identifier__$M,
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

  var script$K = {
    name: 'UiOverlay'
  };

  /* script */
  var __vue_script__$K = script$K;
  /* template */
  var __vue_render__$N = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("transition", { attrs: { name: "ui-overlay" } }, [
      _c("div", _vm._g({ staticClass: "ui-overlay" }, _vm.$listeners))
    ])
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
      __vue_script__$K,
      __vue_scope_id__$N,
      __vue_is_functional_template__$N,
      __vue_module_identifier__$N,
      false,
      undefined,
      undefined,
      undefined
    );

  //
  var script$L = {
    name: 'UiDrawer',
    components: { UiOverlay: __vue_component__$N, UiCloseIconButton: __vue_component__$3 },
    data: function data() {
      return { prefix: 'ui-drawer', visible: this.value, zIndex: 1, isCallLock: false }
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
        if (!newval) { return }
        this.zIndex = getMaxZIndex();
        if (winScrollbarLock.locked) { return }
        winScrollbarLock.lock();
        this.isCallLock = true;
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
        if (!this.isCallLock) { return }
        winScrollbarLock.unlock();
        this.isCallLock = false;
      }
    }
  };

  /* script */
  var __vue_script__$L = script$L;
  /* template */
  var __vue_render__$O = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { class: _vm.prefix + "-wrap" },
      [
        _vm.mask
          ? _c("ui-overlay", {
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
            attrs: { name: _vm.prefix + "-" + _vm.placement },
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
                class: [_vm.prefix, _vm.prefix + "-" + _vm.placement],
                style: _vm.contentStyle
              },
              [
                _vm.closable
                  ? _c(
                      "span",
                      {
                        class: _vm.prefix + "-close",
                        on: {
                          click: function($event) {
                            return _vm.show(false)
                          }
                        }
                      },
                      [
                        _vm._t("close", [
                          _c("ui-close-icon-button", {
                            class: _vm.prefix + "-close-icon"
                          })
                        ])
                      ],
                      2
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.hasHeader
                  ? _c(
                      "header",
                      { class: _vm.prefix + "-header" },
                      [_vm._t("header", [_vm._v(_vm._s(_vm.title))])],
                      2
                    )
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "main",
                  { class: _vm.prefix + "-body" },
                  [_vm._t("default")],
                  2
                ),
                _vm._v(" "),
                _vm.hasFooter
                  ? _c(
                      "footer",
                      { class: _vm.prefix + "-footer" },
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
      __vue_script__$L,
      __vue_scope_id__$O,
      __vue_is_functional_template__$O,
      __vue_module_identifier__$O,
      false,
      undefined,
      undefined,
      undefined
    );

  //
  var script$M = {
    name: 'UiModal',
    components: { UiOverlay: __vue_component__$N, UiButton: __vue_component__$1, UiCloseIconButton: __vue_component__$3 },
    data: function data() {
      return {
        prefix: 'ui-modal',
        visible: this.value,
        zIndex: 1,
        isLoading: false,
        isCallLock: false
      }
    },
    props: {
      value: Boolean,
      title: String,
      closable: {
        type: Boolean,
        default: true
      },
      loading: Boolean,
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
      onOk: Function,
      onCancel: Function
    },
    computed: {
      contentStyle: function contentStyle() {
        return Object.assign({}, this.styles, {width: parseSize(this.width)})
      },
      hasHeader: function hasHeader() {
        return this.title || this.$slots.header !== undefined
      }
    },
    watch: {
      value: function value(newval) {
        this.visible = newval;
      },
      visible: function visible(newval) {
        this.$emit('input', newval);
        this.$emit('on-visible-change', newval);
        if (!newval) { return }
        this.isLoading = false;
        this.zIndex = getMaxZIndex();
        if (winScrollbarLock.locked) { return }
        winScrollbarLock.lock();
        this.isCallLock = true;
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
      cancel: function cancel() {
        this.$emit('on-cancel');
        isFunc(this.onCancel) && this.onCancel();
        this.show(false);
      },
      ok: function ok() {
        this.$emit('on-ok');
        isFunc(this.onOk) && this.onOk();
        if (this.loading) { return this.isLoading = true }
        this.show(false);
      },
      onLeave: function onLeave() {
        this.$emit('leave');
        if (!this.isCallLock) { return }
        winScrollbarLock.unlock();
        this.isCallLock = false;
      }
    }
  };

  /* script */
  var __vue_script__$M = script$M;
  /* template */
  var __vue_render__$P = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { class: _vm.prefix + "-wrap" },
      [
        _c("ui-overlay", {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.visible,
              expression: "visible"
            }
          ],
          style: { zIndex: _vm.zIndex - 1 },
          on: { click: _vm.onMaskClick }
        }),
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
                class: _vm.prefix,
                style: { zIndex: _vm.zIndex }
              },
              [
                _c(
                  "div",
                  {
                    class: [_vm.prefix + "-content", _vm.className],
                    style: _vm.contentStyle
                  },
                  [
                    _vm.closable
                      ? _c(
                          "span",
                          { class: _vm.prefix + "-close" },
                          [
                            _vm._t("close", [
                              _c("ui-close-icon-button", {
                                class: _vm.prefix + "-close-icon",
                                on: {
                                  click: function($event) {
                                    return _vm.show(false)
                                  }
                                }
                              })
                            ])
                          ],
                          2
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.hasHeader
                      ? _c(
                          "div",
                          { class: _vm.prefix + "-header" },
                          [_vm._t("header", [_vm._v(_vm._s(_vm.title))])],
                          2
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _c(
                      "div",
                      { class: _vm.prefix + "-body" },
                      [_vm._t("default")],
                      2
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      { class: _vm.prefix + "-footer" },
                      [
                        _vm._t("footer", [
                          _c("ui-button", { on: { click: _vm.cancel } }, [
                            _vm._v(_vm._s(_vm.cancelText))
                          ]),
                          _vm._v(" "),
                          _c(
                            "ui-button",
                            {
                              attrs: { type: "primary", loading: _vm.isLoading },
                              on: { click: _vm.ok }
                            },
                            [_vm._v(_vm._s(_vm.okText))]
                          )
                        ])
                      ],
                      2
                    )
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
      __vue_script__$M,
      __vue_scope_id__$P,
      __vue_is_functional_template__$P,
      __vue_module_identifier__$P,
      false,
      undefined,
      undefined,
      undefined
    );

  //
  var script$N = {
    name: 'UiDialog',
    components: { UiIcon: __vue_component__, UiModal: __vue_component__$P, UiButton: __vue_component__$1 },
    data: function data() {
      return { prefix: 'ui-dialog' }
    },
    props: Object.assign({}, __vue_component__$P.props,
      {content: String,
      type: {
        validator: function validator(value) {
          return ['info', 'success', 'warning', 'error', 'confirm'].indexOf(value) !== -1
        }
      }}),
    computed: {
      icon: function icon() {
        return iconTypes[this.type]
      },
      isNoNormal: function isNoNormal() {
        return this.type !== 'confirm'
      }
    },
    methods: {
      onOK: function onOK() {
        this.$emit('ok');
      }
    }
  };

  /* script */
  var __vue_script__$N = script$N;
  /* template */
  var __vue_render__$Q = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "ui-modal",
      _vm._g(
        _vm._b(
          { attrs: { className: _vm.prefix, maskClosable: false } },
          "ui-modal",
          _vm.$props,
          false
        ),
        _vm.$listeners
      ),
      [
        _c(
          "div",
          { class: _vm.prefix + "-content" },
          [
            _c("ui-icon", {
              class: [_vm.prefix + "-icon", _vm.type],
              attrs: { type: _vm.icon }
            }),
            _vm._v(" "),
            _c("div", { domProps: { innerHTML: _vm._s(_vm.content) } })
          ],
          1
        ),
        _vm._v(" "),
        _vm.isNoNormal
          ? _c(
              "ui-button",
              {
                attrs: { slot: "footer", type: "primary" },
                on: { click: _vm.onOK },
                slot: "footer"
              },
              [_vm._v(_vm._s(_vm.okText))]
            )
          : _vm._e()
      ],
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
      __vue_script__$N,
      __vue_scope_id__$Q,
      __vue_is_functional_template__$Q,
      __vue_module_identifier__$Q,
      false,
      undefined,
      undefined,
      undefined
    );

  /**
   * 创建对话框
   * @param {Vue.VueConstructor} Vue 
   */
  var modalService = function (Vue) {
    var vm;
    var getVM = function () { return vm || (vm = new Vue({
      data: function data() {
        return { options: {} }
      },
      render: function render(h) {
        var this$1 = this;

        return h(__vue_component__$Q, {
          props: this.options,
          on: {
            ok: function () { return this$1.show(false); },
            input: function (val) { return this$1.show(val); },
            leave: function () { return this$1.destroy(); }
          }
        })
      },
      methods: {
        show: function show(visible) {
          this.$set(this.options, 'value', visible);
        },
        setOptions: function setOptions(options) {
          this.options = options;
        },
        destroy: function destroy() {
          this.$destroy();
          vm = null;
        }
      }
    }).$mount()); };
    var openDialog = function (type, options) { return getVM().setOptions(Object.assign({}, options, {type: type, value: true})); };
    return Object.assign({}, ['info', 'success', 'warning', 'error', 'confirm'].reduce(function (acc, _) {
        var obj;

        return Object.assign({}, acc, ( obj = {}, obj[_] = function (options) { openDialog(_, options); }, obj ))
      }, {}),
      {remove: function remove() {
        vm && vm.show(false);
      }})
  };

  //
  var script$O = {
    name: 'UiInputNumber',
    components: { UiIcon: __vue_component__, UiInput: __vue_component__$M },
    data: function data() {
      return { prefix: 'ui-inputNumber', inputValue: this.parseValue(this.value) }
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
      formatter: Function,
      parser: Function,
      readonly: Boolean,
      editable: {
        type: Boolean,
        default: true
      },
      precision: Number
    },
    computed: {
      inputProps: function inputProps() {
        return { size: this.size, disabled: this.disabled, readonly: this.readonly || !this.editable }
      },
      disAdd: function disAdd() {
        return +this.value + this.step > this.max
      },
      disMinus: function disMinus() {
        return +this.value - this.step < this.min
      },
      prec: function prec() {
        var s = this.step.toString().split('.')[1];
        var digits = s ? s.length : 0;
        return this.precision || digits
      }
    },
    watch: {
      value: function value(newval) {
        this.$emit('on-change', newval);
        this.inputValue = this.parseValue(newval);
      },
      inputValue: function inputValue() {
        var val = this.parseInputValue();
        if (!isNaN(val)) { this.$emit('input', val); }
      }
    },
    methods: {
      parseValue: function parseValue(val) {
        val = Math.min(Math.max(+val, this.min), this.max);
        return this.formatter ? this.formatter(val) : val
      },
      parseInputValue: function parseInputValue() {
        return this.parser ? this.parser(this.inputValue) : this.inputValue
      },
      add: function add() {
        if (this.readonly || this.disAdd) { return }
        this.$emit('input', (+this.value + this.step).toFixed(this.prec));
      },
      minus: function minus() {
        if (this.readonly || this.disMinus) { return }
        this.$emit('input', (+this.value - this.step).toFixed(this.prec));
      },
      onKeydown: function onKeydown(e) {
        if (e.keyCode === 40) {
          e.preventDefault();
          this.minus();
        } else if (e.keyCode === 38) {
          e.preventDefault();
          this.add();
        }
      },
      onBlur: function onBlur() {
        this.$emit('on-blur');
        if (isNaN(this.parseInputValue())) { this.inputValue = this.parseValue(this.value); }
      },
      onFocus: function onFocus(e) {
        this.$emit('on-focus', e);
      }
    }
  };

  /* script */
  var __vue_script__$O = script$O;
  /* template */
  var __vue_render__$R = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { class: [_vm.prefix, { disabled: _vm.disabled }] },
      [
        _c(
          "ui-input",
          _vm._b(
            {
              on: {
                "on-keydown": _vm.onKeydown,
                "on-blur": _vm.onBlur,
                "on-focus": _vm.onFocus
              },
              model: {
                value: _vm.inputValue,
                callback: function($$v) {
                  _vm.inputValue = $$v;
                },
                expression: "inputValue"
              }
            },
            "ui-input",
            _vm.inputProps,
            false
          )
        ),
        _vm._v(" "),
        !_vm.disabled
          ? _c("div", { class: _vm.prefix + "-btns" }, [
              _c(
                "a",
                {
                  class: [_vm.prefix + "-btn", { disabled: _vm.disAdd }],
                  on: { click: _vm.add }
                },
                [_c("ui-icon", { attrs: { type: "ios-arrow-up" } })],
                1
              ),
              _vm._v(" "),
              _c(
                "a",
                {
                  class: [_vm.prefix + "-btn", { disabled: _vm.disMinus }],
                  on: { click: _vm.minus }
                },
                [_c("ui-icon", { attrs: { type: "ios-arrow-down" } })],
                1
              )
            ])
          : _vm._e()
      ],
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
      __vue_script__$O,
      __vue_scope_id__$R,
      __vue_is_functional_template__$R,
      __vue_module_identifier__$R,
      false,
      undefined,
      undefined,
      undefined
    );

  //
  var script$P = {
    name: 'UiTransferBox',
    components: { UiInput: __vue_component__$M, UiCheckbox: __vue_component__$w, UiCheckboxGroup: __vue_component__$x },
    data: function data() {
      return {
        prefix: 'ui-transferBox',
        checkAll: false,
        selectedKeys: this.value,
        searchValue: ''
      }
    },
    props: {
      value: {
        type: Array,
        default: function () { return []; }
      },
      data: {
        type: Array,
        default: function () { return []; }
      },
      renderFormat: Function,
      title: String,
      filterable: Boolean,
      filterPlaceholder: String,
      filterMethod: Function,
      notFoundText: String
    },
    computed: {
      showedData: function showedData() {
        var ref = this;
        var val = ref.searchValue;
        if (this.filterMethod) { return this.filterMethod(this.data, val) }
        return val ? this.data.filter(function (_) { return _.label && _.label.indexOf(val) !== -1; }) : [].concat( this.data )
      },
      disSelectAll: function disSelectAll() {
        return this.showedData.every(function (_) { return _.disabled; })
      },
      hasFooter: function hasFooter() {
        return this.$slots.default !== undefined
      },
      countText: function countText() {
        var total = this.data.length, checkedCount = this.selectedKeys.length;
        return checkedCount ? (checkedCount + "/" + total) : total
      }
    },
    watch: {
      selectedKeys: function selectedKeys(newval) {
        this.$emit('input', newval);
        this.$emit('on-selected-change', newval);
        this.checkAll = newval.length && newval.length === this.showedData.filter(function (_) { return !_.disabled; }).length;
      },
      value: function value(newval) {
        this.selectedKeys = newval;
      }
    },
    methods: {
      renderItem: function renderItem(item) {
        return this.renderFormat ? this.renderFormat(item) : item.label || item.key
      },
      onCheckAllClick: function onCheckAllClick() {
        if (this.disSelectAll) { return }
        this.selectedKeys = this.checkAll ? this.showedData.filter(function (_) { return !_.disabled; }).map(function (_) { return _.key; }) : [];
      }
    }
  };

  /* script */
  var __vue_script__$P = script$P;
  /* template */
  var __vue_render__$S = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { class: _vm.prefix }, [
      _c(
        "header",
        { class: _vm.prefix + "-header" },
        [
          _c(
            "ui-checkbox",
            {
              attrs: { disabled: _vm.disSelectAll },
              nativeOn: {
                click: function($event) {
                  return _vm.onCheckAllClick($event)
                }
              },
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
            { class: _vm.prefix + "-search" },
            [
              _c("ui-input", {
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
      _c(
        "div",
        { class: _vm.prefix + "-list" },
        [
          _c(
            "ui-checkbox-group",
            {
              model: {
                value: _vm.selectedKeys,
                callback: function($$v) {
                  _vm.selectedKeys = $$v;
                },
                expression: "selectedKeys"
              }
            },
            _vm._l(_vm.showedData, function(item) {
              return _c(
                "ui-checkbox",
                {
                  key: item.key,
                  class: _vm.prefix + "-item",
                  attrs: {
                    title: _vm.renderItem(item),
                    label: item.key,
                    disabled: item.disabled
                  }
                },
                [_vm._v("\n        " + _vm._s(_vm.renderItem(item)) + "\n      ")]
              )
            }),
            1
          ),
          _vm._v(" "),
          !_vm.showedData.length
            ? _c("p", { class: _vm.prefix + "-empty" }, [
                _vm._v(_vm._s(_vm.notFoundText))
              ])
            : _vm._e()
        ],
        1
      ),
      _vm._v(" "),
      _vm.hasFooter
        ? _c("footer", { class: _vm.prefix + "-footer" }, [_vm._t("default")], 2)
        : _vm._e()
    ])
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
      __vue_script__$P,
      __vue_scope_id__$S,
      __vue_is_functional_template__$S,
      __vue_module_identifier__$S,
      false,
      undefined,
      undefined,
      undefined
    );

  //
  var script$Q = {
    components: { UiBox: __vue_component__$S, UiButton: __vue_component__$1, UiIcon: __vue_component__ },
    data: function data() {
      return { prefix: 'ui-transfer', selectedData: { left: [], right: [] } }
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
      boxProps: function boxProps() {
        return {
          style: this.listStyle,
          filterable: this.filterable,
          filterMethod: this.filterMethod,
          renderFormat: this.renderFormat,
          notFoundText: this.notFoundText,
          filterPlaceholder: this.filterPlaceholder
        }
      },
      convertData: function convertData() {
        var this$1 = this;

        var rtnData = { left: [], right: [] };
        this.data.forEach(function (_) {
          rtnData[this$1.targetKeys.indexOf(_.key) === -1 ? 'left' : 'right'].push(_);
        });
        return rtnData
      },
      disLeft: function disLeft() {
        return !this.selectedData.right.length
      },
      disRight: function disRight() {
        return !this.selectedData.left.length
      }
    },
    methods: {
      moveToLeft: function moveToLeft() {
        var moveKeys = this.selectedData.right;
        this.selectedData.right = [];
        var targetKeys = this.convertData.right.filter(function (_) { return moveKeys.indexOf(_.key) === -1; }).map(function (_) { return _.key; });
        this.$emit('on-change', targetKeys, 'left', moveKeys);
      },
      moveToRight: function moveToRight() {
        var moveKeys = this.selectedData.left;
        this.selectedData.left = [];
        var targetKeys = this.convertData.right.map(function (_) { return _.key; }).concat(moveKeys);
        this.$emit('on-change', targetKeys, 'right', moveKeys);
      },
      onSelectedChange: function onSelectedChange() {
        this.$emit('on-selected-change', this.selectedData.left, this.selectedData.right);
      }
    }
  };

  /* script */
  var __vue_script__$Q = script$Q;
  /* template */
  var __vue_render__$T = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { class: _vm.prefix },
      [
        _c(
          "ui-box",
          _vm._b(
            {
              attrs: { title: _vm.titles[0], data: _vm.convertData.left },
              on: { "on-selected-change": _vm.onSelectedChange },
              model: {
                value: _vm.selectedData.left,
                callback: function($$v) {
                  _vm.$set(_vm.selectedData, "left", $$v);
                },
                expression: "selectedData.left"
              }
            },
            "ui-box",
            _vm.boxProps,
            false
          ),
          [_vm._t("default")],
          2
        ),
        _vm._v(" "),
        _c(
          "div",
          { class: _vm.prefix + "-btns" },
          [
            _vm.operations[0]
              ? _c(
                  "ui-button",
                  {
                    attrs: {
                      type: "primary",
                      size: "small",
                      disabled: _vm.disLeft
                    },
                    on: { click: _vm.moveToLeft }
                  },
                  [
                    _c("ui-icon", { attrs: { type: "ios-arrow-left" } }),
                    _vm._v(_vm._s(_vm.operations[0]) + "\n    ")
                  ],
                  1
                )
              : _c("ui-button", {
                  attrs: {
                    type: "primary",
                    size: "small",
                    icon: "ios-arrow-left",
                    disabled: _vm.disLeft
                  },
                  on: { click: _vm.moveToLeft }
                }),
            _vm._v(" "),
            _vm.operations[1]
              ? _c(
                  "ui-button",
                  {
                    attrs: {
                      type: "primary",
                      size: "small",
                      disabled: _vm.disRight
                    },
                    on: { click: _vm.moveToRight }
                  },
                  [
                    _vm._v("\n      " + _vm._s(_vm.operations[1])),
                    _c("ui-icon", { attrs: { type: "ios-arrow-right" } })
                  ],
                  1
                )
              : _c("ui-button", {
                  attrs: {
                    type: "primary",
                    size: "small",
                    icon: "ios-arrow-right",
                    disabled: _vm.disRight
                  },
                  on: { click: _vm.moveToRight }
                })
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "ui-box",
          _vm._b(
            {
              attrs: { title: _vm.titles[1], data: _vm.convertData.right },
              on: { "on-selected-change": _vm.onSelectedChange },
              model: {
                value: _vm.selectedData.right,
                callback: function($$v) {
                  _vm.$set(_vm.selectedData, "right", $$v);
                },
                expression: "selectedData.right"
              }
            },
            "ui-box",
            _vm.boxProps,
            false
          ),
          [_vm._t("default")],
          2
        )
      ],
      1
    )
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
      __vue_script__$Q,
      __vue_scope_id__$T,
      __vue_is_functional_template__$T,
      __vue_module_identifier__$T,
      false,
      undefined,
      undefined,
      undefined
    );

  //
  var UiRender$1 = {
    functional: true,
    render: function (h, ctx) { return ctx.props.render(h, ctx.props); }
  };
  var script$R = {
    name: 'UiTreeNode',
    components: { UiIcon: __vue_component__, UiLoading: __vue_component__$u, UiCheckbox: __vue_component__$w, UiRender: UiRender$1 },
    data: function data() {
      return { prefix: 'ui-tree-node', parent: null }
    },
    props: {
      data: Object,
      render: Function
    },
    computed: {
      renderFns: function renderFns() {
        return this.data.render || this.render
      },
      rootData: function rootData() {
        return this.parent ? this.parent.flatState : []
      },
      hasArrow: function hasArrow() {
        if (this.parent && this.parent.loadData) { return this.data.children }
        return this.data.children && this.data.children.length
      }
    },
    methods: {
      onTextClick: function onTextClick(item) {
        if (item.disabled) { return }
        this.parent.updateSeleckedNodes(item);
      },
      onCheckboxClick: function onCheckboxClick(item) {
        if (item.disabled || item.disableCheckbox) { return }
        this.parent.updateCheckedNodes(item);
      },
      toggleExpand: function toggleExpand(item) {
        this.parent.toggleExpand(item);
      }
    },
    mounted: function mounted() {
      this.parent = findParent(this, 'UiTree');
    }
  };

  /* script */
  var __vue_script__$R = script$R;
  /* template */
  var __vue_render__$U = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("ul", { class: _vm.prefix }, [
      _c(
        "li",
        { class: _vm.prefix + "-item" },
        [
          _c(
            "div",
            { class: _vm.prefix + "-title" },
            [
              _vm.data.loading
                ? _c("ui-loading", {
                    class: _vm.prefix + "-loading",
                    attrs: {
                      iconClass: _vm.prefix + "-loading-icon",
                      loading: ""
                    }
                  })
                : _vm.hasArrow
                ? _c("ui-icon", {
                    class: [_vm.prefix + "-arrow", { expand: _vm.data.expand }],
                    attrs: { type: "ios-arrow-forward" },
                    on: {
                      click: function($event) {
                        return _vm.toggleExpand(_vm.data)
                      }
                    }
                  })
                : _vm._e(),
              _vm._v(" "),
              _c("ui-checkbox", {
                class: _vm.prefix + "-checkbox",
                attrs: {
                  disabled: _vm.data.disableCheckbox || _vm.data.disabled,
                  indeterminate: _vm.data.indeterminate
                },
                nativeOn: {
                  click: function($event) {
                    return _vm.onCheckboxClick(_vm.data)
                  }
                },
                model: {
                  value: _vm.data.checked,
                  callback: function($$v) {
                    _vm.$set(_vm.data, "checked", $$v);
                  },
                  expression: "data.checked"
                }
              }),
              _vm._v(" "),
              _vm.renderFns
                ? _c("ui-render", {
                    attrs: {
                      render: _vm.renderFns,
                      data: _vm.data,
                      root: _vm.rootData
                    }
                  })
                : _c(
                    "span",
                    {
                      class: [
                        _vm.prefix + "-text",
                        { selected: _vm.data.selected }
                      ],
                      on: {
                        click: function($event) {
                          return _vm.onTextClick(_vm.data)
                        }
                      }
                    },
                    [_vm._v(_vm._s(_vm.data.title))]
                  )
            ],
            1
          ),
          _vm._v(" "),
          _vm.data.children && _vm.data.expand
            ? _vm._l(_vm.data.children, function(item, index) {
                return _c("ui-tree-node", {
                  key: index,
                  class: _vm.prefix + "-child",
                  attrs: { data: item, render: _vm.render }
                })
              })
            : _vm._e()
        ],
        2
      )
    ])
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
      __vue_script__$R,
      __vue_scope_id__$U,
      __vue_is_functional_template__$U,
      __vue_module_identifier__$U,
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

  function objectWithoutProperties (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }
  var key = 0;
  var script$S = {
    name: 'UiTree',
    components: { UiNode: __vue_component__$U },
    data: function data() {
      return { selectedNodes: [] }
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
      checkStrictly: Boolean
    },
    computed: {
      flatState: function flatState() {
        return this.getFlatState()
      }
    },
    mounted: function mounted() {
      this.updateCheckedNodes();
    },
    methods: {
      // 将树形数据转化为一维数组
      getFlatState: function getFlatState() {
        var flatState = [];
        var ref = this;
        var data = ref.data;
        var loop = function () {
          var arr = [];
          data.forEach(function (_) {
            if (_.nodeKey === undefined) { _.nodeKey = ++key; }
            flatState.push(_);
            _.children && arr.push.apply(arr, _.children);
          });
          data = arr;
        };

        while (data.length) loop();
        return flatState
      },
      // 更新选中的节点
      updateSeleckedNodes: function updateSeleckedNodes(item) {
        var this$1 = this;

        var selected = item.selected;
        if (!this.multiple) { this.flatState.forEach(function (_) { return this$1.$set(_, 'selected', false); }); }
        this.$set(item, 'selected', !selected);
        this.$emit('on-select-change', this.getSelectedNodes(), item);
      },
      // 获取被选中的节点
      getSelectedNodes: function getSelectedNodes() {
        return this.flatState.filter(function (_) { return _.selected; }).map(function (_) {
          var children = _.children;
          var rest = objectWithoutProperties( _, ["children"] );
          var data = rest;
          return data
        })
      },
      // 更新勾选的节点
      updateCheckedNodes: function updateCheckedNodes(item) {
        var this$1 = this;
        if ( item === void 0 ) item = {};

        if (this.checkStrictly) { return this.$emit('on-check-change', this.getCheckedNodes(), item) }
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
          if (_.children && _.children.length) {
            var checkeds = _.children.filter(function (__) { return __.checked; });
            var hasIndeterminate = _.children.some(function (__) { return __.indeterminate; });
            this$1.$set(_, 'checked', checkeds.length === _.children.length);
            this$1.$set(_, 'indeterminate', hasIndeterminate || (checkeds.length > 0 && checkeds.length < _.children.length));
          }
        });
        this.$emit('on-check-change', this.getCheckedNodes(), item);
      },
      // 获取被勾选的节点
      getCheckedNodes: function getCheckedNodes() {
        return this.flatState.filter(function (_) { return _.checked; }).map(function (_) {
          var __ = _.children;
          var rest = objectWithoutProperties( _, ["children"] );
          var data = rest;
          return data
        })
      },
      // 获取选中及半选节点
      getCheckedAndIndeterminateNodes: function getCheckedAndIndeterminateNodes() {
        return this.flatState.filter(function (_) { return _.checked || _.indeterminate; }).map(function (_) {
          var __ = _.children;
          var rest = objectWithoutProperties( _, ["children"] );
          var data = rest;
          return data
        })
      },
      // 节点的展开和收起
      toggleExpand: function toggleExpand(item) {
        var this$1 = this;

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
      { staticClass: "ui-tree", class: { showCheckbox: _vm.showCheckbox } },
      _vm._l(_vm.data, function(item) {
        return _c("ui-node", {
          key: item.nodeKey,
          attrs: { data: item, render: _vm.render }
        })
      }),
      1
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
    name: 'UiTime',
    data: function data() {
      return { convertedValue: '' }
    },
    props: {
      time: [Number, Date, String],
      type: {
        default: 'relative',
        validator: function validator(value) {
          return ['relative', 'date', 'datetime'].indexOf(value) !== -1
        }
      },
      interval: {
        type: Number,
        default: 60
      },
      hash: String
    },
    computed: {
      tag: function tag() {
        return this.hash ? 'a' : 'span'
      }
    },
    mounted: function mounted() {
      this.update();
    },
    beforeDestroy: function beforeDestroy() {
      clearInterval(this.tid);
    },
    methods: {
      update: function update() {
        var this$1 = this;

        this.convert();
        if (this.type !== 'relative') { return }
        this.tid = setInterval(function () { return this$1.convert(); }, this.interval * 1000);
      },
      convert: function convert() {
        this.convertedValue = ({
          relative: this.convertRelTime(),
          date: dateFormat(this.time, 'yyyy-MM-dd'),
          datetime: dateFormat(this.time, 'yyyy-MM-dd hh:mm:ss')
        })[this.type];
      },
      convertRelTime: function convertRelTime() {
        var ms = (Date.now() - new Date(this.time)) / 1000;
        if (ms < 60) {
          return ((~~ms) + "秒前")
        } else if (ms < 3600) {
          return ((~~(ms / 60)) + "分钟前")
        } else if (ms < 86400) {
          return ((~~(ms / 3600)) + "小时前")
        } else if (ms < 2592000) {
          return ((~~(ms / 86400)) + "天前")
        } else if (ms < 31104000) {
          return ((~~(ms / 2592000)) + "个月前")
        }
        return ((~~(ms / 31104000)) + "年前")
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
      _vm.tag,
      { tag: "span", staticClass: "ui-time", attrs: { href: _vm.hash } },
      [_vm._v(_vm._s(_vm.convertedValue))]
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
  //
  //
  //
  //
  //
  //
  //
  //

  var script$U = {
    name: 'UiSplit',
    data: function data() {
      return { prefix: 'ui-split', paneStyle: {}, inputValue: this.value }
    },
    props: {
      value: {
        type: [Number, String],
        default: .5
      },
      mode: {
        default: 'horizontal',
        validator: function validator(value) {
          return ['horizontal', 'vertical'].indexOf(value) !== -1
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
    computed: {
      isHor: function isHor() {
        return this.mode === 'horizontal'
      }
    },
    watch: {
      value: function value(newval) {
        this.inputValue = newval;
      },
      inputValue: function inputValue(newval) {
        this.$emit('input', newval);
      }
    },
    mounted: function mounted() {
      this.updatePaneStyle();
    },
    methods: {
      onMousedown: function onMousedown(e) {
        this.initValue = this.inputValue;
        this.offset = this.isHor ? e.pageX : e.pageY;
        document.body.classList.add('ui-disable-selection');
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
          var triggerSize = this.$refs.Trigger.offsetWidth / width;
          minVal = isNaN(this.min) ? parseInt(this.min) / width : this.min;
          maxVal = (isNaN(this.max) ? (width - parseInt(this.max)) / width : this.max) - triggerSize;
          value = this.initValue + (e.pageX - this.offset) / width;
        } else {
          var triggerSize$1 = this.$refs.Trigger.offsetHeight / height;
          minVal = isNaN(this.min) ? parseInt(this.min) / height : this.min;
          maxVal = (isNaN(this.max) ? (height - parseInt(this.max)) / height : this.max) - triggerSize$1;
          value = this.initValue + (e.pageY - this.offset) / height;
        }
        this.inputValue = Math.min(Math.max(minVal, value), maxVal);
        this.updatePaneStyle();
        this.$emit('on-moving', e);
      },
      onMouseup: function onMouseup(e) {
        document.body.classList.remove('ui-disable-selection');
        document.removeEventListener('mousemove', this.onMousemove);
        document.removeEventListener('mouseup', this.onMouseup);
        this.$emit('on-move-end');
      },
      updatePaneStyle: function updatePaneStyle() {
        var size = this.inputValue;
        if (typeof size === 'string') {
          if (this.isHor) {
            size = parseInt(size) / this.$el.offsetWidth;
          } else {
            size = parseInt(size) / this.$el.offsetHeight;
          }
        }
        size = (size * 100) + "%";
        this.paneStyle = this.isHor ? { width: size } : { height: size };
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
      { class: [_vm.prefix, _vm.mode] },
      [
        _vm.isHor
          ? [
              _c(
                "div",
                { class: _vm.prefix + "-left", style: _vm.paneStyle },
                [_vm._t("left")],
                2
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  ref: "Trigger",
                  class: [_vm.prefix + "-trigger", _vm.mode],
                  on: { mousedown: _vm.onMousedown }
                },
                [
                  _vm._t("trigger", [
                    _c(
                      "div",
                      { class: [_vm.prefix + "-trigger-bar", _vm.mode] },
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
              _c("div", { class: _vm.prefix + "-right" }, [_vm._t("right")], 2)
            ]
          : [
              _c(
                "div",
                { class: _vm.prefix + "-top", style: _vm.paneStyle },
                [_vm._t("top")],
                2
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  ref: "Trigger",
                  class: [_vm.prefix + "-trigger", _vm.mode],
                  on: { mousedown: _vm.onMousedown }
                },
                [
                  _vm._t("trigger", [
                    _c(
                      "div",
                      { class: [_vm.prefix + "-trigger-bar", _vm.mode] },
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
              _c("div", { class: _vm.prefix + "-bottom" }, [_vm._t("bottom")], 2)
            ]
      ],
      2
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
    name: 'UiCarousel',
    components: { UiIcon: __vue_component__ },
    data: function data() {
      return {
        prefix: 'ui-carousel',
        curIndex: this.value,
        items: [],
        listStyle: this.getListStyle()
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
          return ['inside', 'outside', 'none'].indexOf(value) !== -1
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
      value: function value(newval) {
        this.curIndex = newval;
      },
      curIndex: function curIndex(newval) {
        this.$emit('input', newval);
      },
      autoplay: function autoplay() {
        this.startTimer();
      },
      autoplaySpeed: function autoplaySpeed() {
        this.startTimer();
      }
    },
    mounted: function mounted() {
      this.startTimer();
    },
    methods: {
      addItem: function addItem(vm) {
        this.items.push(vm);
      },
      removeItem: function removeItem(vm) {
        this.items.splice(this.items.indexOf(vm), 1);
      },
      getListStyle: function getListStyle(animated) {
        var style = {
          height: parseSize(this.height),
          transform: ("translateX(-" + (this.curIndex * 100) + "%)")
        };
        return animated ? Object.assign({}, style, {transition: ("transform .5s " + (this.easing))}) : style
      },
      toPrev: function toPrev() {
        var this$1 = this;

        if (--this.curIndex < 0) {
          this.curIndex = this.count;
          this.listStyle = this.getListStyle();
          this.curIndex--;
        }
        this.$nextTick(function () { return this$1.listStyle = this$1.getListStyle(true); });
      },
      toNext: function toNext() {
        if (this.isTail) { return }
        this.curIndex++;
        this.listStyle = this.getListStyle(true);
        if (this.curIndex > this.count - 1) {
          this.curIndex = 0;
          this.isTail = true;
        }
      },
      toIndex: function toIndex(i, e) {
        if ((this.trigger === 'click' && e.type === 'click') || (this.trigger === 'hover' && e.type === 'mouseover')) {
          this.curIndex = i - 1;
          this.listStyle = this.getListStyle(true);
        }
      },
      onTransitionend: function onTransitionend() {
        this.isTail = false;
        this.listStyle = this.getListStyle();
      },
      startTimer: function startTimer() {
        var this$1 = this;

        this.stopTimer();
        if (this.autoplay) { this.timerId = setInterval(function () { return this$1.toNext(); }, this.autoplaySpeed); }
      },
      stopTimer: function stopTimer() {
        clearInterval(this.timerId);
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
      {
        class: [_vm.prefix, _vm.arrow],
        on: { mouseenter: _vm.stopTimer, mouseleave: _vm.startTimer }
      },
      [
        _c("div", { class: _vm.prefix + "-box" }, [
          _c(
            "div",
            {
              class: _vm.prefix + "-list",
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
            class: _vm.prefix + "-arrow prev",
            attrs: { disabled: _vm.disPrev },
            on: { click: _vm.toPrev }
          },
          [_c("ui-icon", { attrs: { type: "chevron-left" } })],
          1
        ),
        _vm._v(" "),
        _c(
          "button",
          {
            class: _vm.prefix + "-arrow next",
            attrs: { disabled: _vm.disNext },
            on: { click: _vm.toNext }
          },
          [_c("ui-icon", { attrs: { type: "chevron-right" } })],
          1
        ),
        _vm._v(" "),
        _c(
          "ul",
          {
            class: [_vm.prefix + "-dots", _vm.dots, { radiusDot: _vm.radiusDot }]
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
  //
  //
  //
  //

  var script$W = {
    name: 'UiCarouselItem',
    mounted: function mounted() {
      this.$parent.addItem(this);
    },
    beforeDestroy: function beforeDestroy() {
      this.$parent.removeItem(this);
    }
  };

  /* script */
  var __vue_script__$W = script$W;

  /* template */
  var __vue_render__$Z = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "ui-carousel-item" }, [_vm._t("default")], 2)
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
  var incKey = 0;
  var script$X = {
    name: 'UiUpload',
    components: { UiIcon: __vue_component__, UiProgress: __vue_component__$p, UiCloseIconButton: __vue_component__$3 },
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
  var __vue_script__$X = script$X;
  /* template */
  var __vue_render__$_ = function() {
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
  //
  //
  //
  //

  var script$Y = {
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
  var __vue_script__$Y = script$Y;
  /* template */
  var __vue_render__$$ = function() {
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
  var __vue_script__$Z = script$Z;

  /* template */
  var __vue_render__$10 = function() {
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
  var script$_ = {
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
  var __vue_script__$_ = script$_;
  /* template */
  var __vue_render__$11 = function() {
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
  var script$$ = {
    name: 'ui-dropdown',
    components: { UiOptionList: __vue_component__$11 },
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
  var __vue_script__$$ = script$$;
  /* template */
  var __vue_render__$12 = function() {
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
  var script$10 = {
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
  var __vue_script__$10 = script$10;
  /* template */
  var __vue_render__$13 = function() {
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

  /* script */

  /* template */
  var __vue_render__$14 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("ul", { staticClass: "ui-dropdown-menu" }, [_vm._t("default")], 2)
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
      {},
      __vue_scope_id__$14,
      __vue_is_functional_template__$14,
      __vue_module_identifier__$14,
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

  var script$11 = {
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
  var __vue_script__$11 = script$11;
  /* template */
  var __vue_render__$15 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "ul",
      { staticClass: "ui-menu", class: [_vm.mode, _vm.theme], style: _vm.styles },
      [_vm._t("default")],
      2
    )
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
      __vue_script__$11,
      __vue_scope_id__$15,
      __vue_is_functional_template__$15,
      __vue_module_identifier__$15,
      false,
      undefined,
      undefined,
      undefined
    );

  //
  var script$12 = {
    name: 'ui-menu-submenu',
    components: { UiIcon: __vue_component__, UiOptionList: __vue_component__$11 },
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
  var __vue_script__$12 = script$12;

  /* template */
  var __vue_render__$16 = function() {
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
      __vue_script__$12,
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
  var __vue_script__$13 = script$13;

  /* template */
  var __vue_render__$17 = function() {
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

  //
  //
  //
  //
  //
  //

  var script$14 = {
    props: {
      title: String
    }
  };

  /* script */
  var __vue_script__$14 = script$14;

  /* template */
  var __vue_render__$18 = function() {
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

  var script$15 = {
    name: 'ui-select',
    components: { UiTag: __vue_component__$D, UiIcon: __vue_component__, UiOptionList: __vue_component__$11 },
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
  var __vue_script__$15 = script$15;
  /* template */
  var __vue_render__$19 = function() {
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
  var __vue_script__$16 = script$16;
  /* template */
  var __vue_render__$1a = function() {
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
    return _c("li", { staticClass: "ui-option-group" }, [
      _c("span", { staticClass: "ui-option-group-title" }, [
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
  var __vue_script__$18 = script$18;
  /* template */
  var __vue_render__$1c = function() {
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
  var script$19 = {
    components: { UiIcon: __vue_component__, UiPopper: __vue_component__$1c, UiButton: __vue_component__$1 },
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
  var __vue_script__$19 = script$19;
  /* template */
  var __vue_render__$1d = function() {
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
    components: { UiPopper: __vue_component__$1c },
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
  var __vue_script__$1a = script$1a;
  /* template */
  var __vue_render__$1e = function() {
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
  var script$1b = {
    components: { UiTooltip: __vue_component__$1e, UiInputNumber: __vue_component__$R },
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
  var __vue_script__$1b = script$1b;
  /* template */
  var __vue_render__$1f = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { staticClass: "ui-slider", class: { disabled: _vm.disabled } },
      [
        _c(
          "div",
          {
            ref: "Bar",
            staticClass: "ui-slider-wrap",
            on: { click: _vm.update }
          },
          [
            _vm._l(_vm.stopValues, function(item) {
              return _c("span", {
                key: item,
                staticClass: "ui-slider-breakpoint",
                style: { left: item + "%" }
              })
            }),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "ui-slider-bar", style: _vm.barStyle },
              [
                _vm.range
                  ? [
                      _vm.hasTip
                        ? _c(
                            "ui-tooltip",
                            {
                              ref: "LeftTooltip",
                              attrs: {
                                placement: "top",
                                always: _vm.leftBtnDown || _vm.isTipAlways
                              }
                            },
                            [
                              _c(
                                "div",
                                { attrs: { slot: "content" }, slot: "content" },
                                [_vm._v(_vm._s(_vm.inputValue[0]))]
                              ),
                              _vm._v(" "),
                              _c("span", {
                                staticClass: "ui-slider-btn left",
                                class: { down: _vm.leftBtnDown },
                                on: {
                                  mousedown: function($event) {
                                    $event.preventDefault();
                                    return _vm.handleLeftMousedown($event)
                                  }
                                }
                              })
                            ]
                          )
                        : _c("span", {
                            staticClass: "ui-slider-btn left",
                            class: { down: _vm.leftBtnDown },
                            on: {
                              mousedown: function($event) {
                                $event.preventDefault();
                                return _vm.handleLeftMousedown($event)
                              }
                            }
                          })
                    ]
                  : _vm._e(),
                _vm._v(" "),
                _vm.hasTip && _vm.rightValue !== null
                  ? _c(
                      "ui-tooltip",
                      {
                        ref: "RightTooltip",
                        attrs: {
                          placement: "top",
                          always: _vm.rightBtnDown || _vm.isTipAlways
                        }
                      },
                      [
                        _c(
                          "div",
                          { attrs: { slot: "content" }, slot: "content" },
                          [_vm._v(_vm._s(_vm.rightValue))]
                        ),
                        _vm._v(" "),
                        _c("span", {
                          staticClass: "ui-slider-btn right",
                          class: { down: _vm.rightBtnDown },
                          on: {
                            mousedown: function($event) {
                              $event.preventDefault();
                              return _vm.handleRightMousedown($event)
                            }
                          }
                        })
                      ]
                    )
                  : _c("span", {
                      staticClass: "ui-slider-btn right",
                      class: { down: _vm.rightBtnDown },
                      on: {
                        mousedown: function($event) {
                          $event.preventDefault();
                          return _vm.handleRightMousedown($event)
                        }
                      }
                    })
              ],
              2
            )
          ],
          2
        ),
        _vm._v(" "),
        _vm.hasInputNumber
          ? _c("UiInputNumber", {
              staticClass: "ui-slider-input-number",
              attrs: {
                min: _vm.min,
                max: _vm.max,
                step: _vm.step,
                size: _vm.inputSize
              },
              model: {
                value: _vm.inputValue,
                callback: function($$v) {
                  _vm.inputValue = $$v;
                },
                expression: "inputValue"
              }
            })
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
    components: { UiIcon: __vue_component__, UiSelect: __vue_component__$19, UiOption: __vue_component__$1a, UiInput: __vue_component__$M },
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
  var __vue_script__$1c = script$1c;
  /* template */
  var __vue_render__$1g = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { staticClass: "ui-page", class: [_vm.size, { simple: _vm.simple }] },
      [
        _vm.simple
          ? _c("ul", { staticClass: "ui-page-list simple" }, [
              _c(
                "li",
                {
                  staticClass: "ui-page-arrow prev",
                  class: { disabled: _vm.disabledPrev },
                  on: { click: _vm.toPrev }
                },
                [_c("UiIcon", { attrs: { type: "ios-arrow-left" } })],
                1
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "ui-page-input" },
                [
                  _c("UiInput", {
                    attrs: { size: "small" },
                    on: { "on-enter": _vm.toInputPage },
                    model: {
                      value: _vm.inputValue,
                      callback: function($$v) {
                        _vm.inputValue = $$v;
                      },
                      expression: "inputValue"
                    }
                  }),
                  _vm._v(" "),
                  _c("span", [_vm._v("/")]),
                  _vm._v(" " + _vm._s(_vm.pageCount) + "\n    ")
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "li",
                {
                  staticClass: "ui-page-arrow next",
                  class: { disabled: _vm.disabledNext },
                  on: { click: _vm.toNext }
                },
                [_c("UiIcon", { attrs: { type: "ios-arrow-right" } })],
                1
              )
            ])
          : [
              _vm.showTotal
                ? _c(
                    "span",
                    { staticClass: "ui-page-count" },
                    [
                      _vm._t("default", [
                        _vm._v("共 " + _vm._s(_vm.total) + " 条")
                      ])
                    ],
                    2
                  )
                : _vm._e(),
              _vm._v(" "),
              _c(
                "ul",
                { staticClass: "ui-page-list" },
                [
                  _c(
                    "li",
                    {
                      staticClass: "ui-page-arrow prev",
                      class: { disabled: _vm.disabledPrev },
                      on: { click: _vm.toPrev }
                    },
                    [_c("UiIcon", { attrs: { type: "ios-arrow-left" } })],
                    1
                  ),
                  _vm._v(" "),
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
                            staticClass: "ui-page-more",
                            attrs: { title: "向前5页" },
                            on: { click: _vm.toPrev5 }
                          },
                          [
                            _c("UiIcon", { attrs: { type: "ios-arrow-left" } }),
                            _vm._v(" "),
                            _c("UiIcon", { attrs: { type: "ios-arrow-left" } }),
                            _vm._v(" "),
                            _c("UiIcon", {
                              staticClass: "icon-more",
                              attrs: { type: "ios-more" }
                            })
                          ],
                          1
                        )
                      ]
                    : _vm._e(),
                  _vm._v(" "),
                  _vm._l(_vm.showPages, function(item) {
                    return _c(
                      "li",
                      {
                        key: item,
                        class: { active: _vm.currentPage === item },
                        on: {
                          click: function($event) {
                            return _vm.toPage(item)
                          }
                        }
                      },
                      [_vm._v(_vm._s(item))]
                    )
                  }),
                  _vm._v(" "),
                  _vm.pageCount - _vm.currentPage >= 4
                    ? [
                        _c(
                          "li",
                          {
                            staticClass: "ui-page-more",
                            attrs: { title: "向后5页" },
                            on: { click: _vm.toNext5 }
                          },
                          [
                            _c("UiIcon", { attrs: { type: "ios-arrow-right" } }),
                            _vm._v(" "),
                            _c("UiIcon", { attrs: { type: "ios-arrow-right" } }),
                            _vm._v(" "),
                            _c("UiIcon", {
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
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "li",
                    {
                      staticClass: "ui-page-arrow next",
                      class: { disabled: _vm.disabledNext },
                      on: { click: _vm.toNext }
                    },
                    [_c("UiIcon", { attrs: { type: "ios-arrow-right" } })],
                    1
                  )
                ],
                2
              ),
              _vm._v(" "),
              _vm.showSizer
                ? _c(
                    "ui-select",
                    {
                      staticClass: "ui-page-sizer",
                      attrs: { size: _vm.size },
                      model: {
                        value: _vm.limit,
                        callback: function($$v) {
                          _vm.limit = $$v;
                        },
                        expression: "limit"
                      }
                    },
                    _vm._l(_vm.pageSizeOpts, function(item) {
                      return _c("UiOption", {
                        key: item,
                        attrs: { value: item, label: item + " 条/页" }
                      })
                    }),
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.showElevator
                ? _c(
                    "div",
                    { staticClass: "ui-page-input" },
                    [
                      _vm._v("\n      跳至"),
                      _c("UiInput", {
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
      ],
      2
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
    name: 'ui-autocomplete',
    components: { UiInput: __vue_component__$M, UiDrop: __vue_component__$11 },
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
  var __vue_script__$1d = script$1d;
  /* template */
  var __vue_render__$1h = function() {
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
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script$1e = {
    props: {
      columns: Array
    }
  };

  /* script */
  var __vue_script__$1e = script$1e;

  /* template */
  var __vue_render__$1i = function() {
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
  //
  //
  //
  //
  //

  var script$1f = {
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
  var __vue_script__$1f = script$1f;

  /* template */
  var __vue_render__$1j = function() {
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
    components: { UiTableHeader: __vue_component__$1i, UiTableBody: __vue_component__$1j },
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
  var __vue_script__$1g = script$1g;
  /* template */
  var __vue_render__$1k = function() {
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

  // 日期选择器
  // import DatePicker from './components/picker/DatePicker.vue'
  // // 时间选择器
  // import TimePicker from './components/picker/TimePicker.vue'

  var comps = {
    Icon: __vue_component__,
    Avatar: __vue_component__$5,
    Card: __vue_component__$9,
    Alert: __vue_component__$4,
    Badge: __vue_component__$a,
    Rate: __vue_component__$b,
    ICircle: __vue_component__$f,
    Breadcrumb: __vue_component__$g,
    BreadcrumbItem: __vue_component__$h,
    Timeline: __vue_component__$i,
    TimelineItem: __vue_component__$j,
    Spin: __vue_component__$k,
    Step: __vue_component__$l,
    Steps: __vue_component__$m,
    Affix: __vue_component__$2,
    Row: __vue_component__$n,
    Col: __vue_component__$o,
    BackTop: __vue_component__$8,
    Progress: __vue_component__$p,
    Button: __vue_component__$1,
    ButtonGroup: __vue_component__$r,
    Divider: __vue_component__$s,
    ISwitch: __vue_component__$t,
    Scroll: __vue_component__$v,
    Checkbox: __vue_component__$w,
    CheckboxGroup: __vue_component__$x,
    Layout: __vue_component__$y,
    Header: __vue_component__$z,
    Content: __vue_component__$A,
    Footer: __vue_component__$B,
    Sider: __vue_component__$C,
    Tag: __vue_component__$D,
    Collapse: __vue_component__$E,
    Panel: __vue_component__$F,
    Cell: __vue_component__$G,
    CellGroup: __vue_component__$H,
    Radio: __vue_component__$I,
    RadioGroup: __vue_component__$J,
    Tabs: __vue_component__$K,
    TabPane: __vue_component__$L,
    Input: __vue_component__$M,
    Drawer: __vue_component__$O,
    Modal: __vue_component__$P,
    InputNumber: __vue_component__$R,
    Transfer: __vue_component__$T,
    Tree: __vue_component__$V,
    Time: __vue_component__$W,
    Split: __vue_component__$X,
    Carousel: __vue_component__$Y,
    CarouselItem: __vue_component__$Z,
    Anchor: __vue_component__$6,
    AnchorLink: __vue_component__$7,
    Upload: __vue_component__$_,
    Form: __vue_component__$$,
    FormItem: __vue_component__$10,

    // Cascader,
    // ColorPicker,
    Select: __vue_component__$19,
    Option: __vue_component__$1a,
    OptionGroup: __vue_component__$1b,
    Page: __vue_component__$1g,
    Dropdown: __vue_component__$12,
    DropdownMenu: __vue_component__$14,
    DropdownItem: __vue_component__$13,
    Menu: __vue_component__$15,
    MenuItem: __vue_component__$17,
    Submenu: __vue_component__$16,
    MenuGroup: __vue_component__$18,
    Tooltip: __vue_component__$1e,
    Poptip: __vue_component__$1d,
    Table: __vue_component__$1k,
    Slider: __vue_component__$1f,
    AutoComplete: __vue_component__$1h
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

    Vue.prototype.$uiTools = tools;
    Vue.prototype.$Notice = createNotice(Vue);
    Vue.prototype.$Message = createMessage(Vue);
    Vue.prototype.$Spin = spinService(Vue);
    Vue.prototype.$Modal = modalService(Vue);
    Vue.LoadingBar = Vue.prototype.$Loading = loadingBarService(Vue);
    var prefix = typeof options.prefix === 'string' ? options.prefix : 'Ui';
    for (var name in comps) { Vue.component(prefix + name, comps[name]); }
  }

  return index;

})));
