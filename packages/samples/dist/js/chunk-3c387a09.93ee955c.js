(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3c387a09"],{1321:function(t,s,e){},4175:function(t,s,e){"use strict";var a=e("1321"),i=e.n(a);i.a},6617:function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticStyle:{"padding-bottom":"100px"}},[e("div",{staticClass:"page-title"},[t._v("Switch 开关")]),e("p",[t._v("在两种状态间切换时用到的开关选择器。")]),e("div",{staticClass:"page-sub-title"},[t._v("基本用法")]),e("p",[t._v("状态切换时会触发事件。")]),e("br"),e("ISwitch",{on:{"on-change":t.change},model:{value:t.switch1,callback:function(s){t.switch1=s},expression:"switch1"}}),e("ISwitch",{attrs:{"true-value":"1","false-value":"0"},on:{"on-change":t.change},model:{value:t.switch2,callback:function(s){t.switch2=s},expression:"switch2"}}),e("div",{staticClass:"page-sub-title"},[t._v("尺寸")]),e("p",[t._v("设置size为 large 或 small 使用大号和小号的开关。")]),e("br"),e("div",{staticClass:"switchbox"},[e("ISwitch",{attrs:{size:"large"}}),e("ISwitch"),e("ISwitch",{attrs:{size:"small"}})],1),e("br"),e("br"),e("div",{staticClass:"page-sub-title"},[t._v("文字和图标")]),e("p",[t._v("自定义内容，建议如果使用2个汉字，将开关尺寸设置为 large。")]),e("br"),e("ISwitch",[e("span",{attrs:{slot:"open"},slot:"open"},[t._v("开")]),e("span",{attrs:{slot:"close"},slot:"close"},[t._v("关")])]),e("ISwitch",{staticStyle:{"margin-left":"10px"}},[e("Icon",{attrs:{slot:"open",type:"android-done"},slot:"open"}),e("Icon",{attrs:{slot:"close",type:"android-close"},slot:"close"})],1),e("br"),e("br"),e("ISwitch",{attrs:{size:"large"}},[e("span",{attrs:{slot:"open"},slot:"open"},[t._v("开启")]),e("span",{attrs:{slot:"close"},slot:"close"},[t._v("关闭")])]),e("ISwitch",{staticStyle:{"margin-left":"10px"},attrs:{size:"large"}},[e("span",{attrs:{slot:"open"},slot:"open"},[t._v("ON")]),e("span",{attrs:{slot:"close"},slot:"close"},[t._v("OFF")])]),e("div",{staticClass:"page-sub-title"},[t._v("不可用")]),e("p",[t._v("禁用开关。")]),e("br"),e("ISwitch",{staticStyle:{"margin-right":"10px"},attrs:{disabled:t.disabled}}),e("Button",{attrs:{type:"primary"},on:{click:function(s){t.disabled=!t.disabled}}},[t._v("Toggle Disabled")]),e("div",{staticClass:"page-sub-title"},[t._v("加载中")]),e("p",[t._v("标识开关操作仍在执行中。")]),e("br"),e("ISwitch",{attrs:{loading:"",value:!0}}),e("ISwitch",{attrs:{loading:"",value:!1,size:"small"}}),e("div",{staticClass:"page-sub-title"},[t._v("自定义颜色")]),e("p",[t._v("设置属性 true-color 和 false-color 可以自定义背景色。")]),e("br"),e("ISwitch",{attrs:{"true-color":"#13ce66","false-color":"#ff4949"}}),e("div",{staticClass:"page-sub-title"},[t._v("阻止切换")]),e("p",[t._v("设置属性 before-change 并返回 Promise，可以阻止切换。")]),e("br"),e("ISwitch",{attrs:{"before-change":t.handleBeforeChange}})],1)},i=[],l=(e("ef1f"),{data:function(){return{switch1:!0,disabled:!0,switch2:"0"}},methods:{change:function(t){this.$Message.info("开关状态："+t)},handleBeforeChange:function(){var t=this;return new Promise((function(s){t.$Modal.confirm({title:"切换确认",content:"您确认要切换开关状态吗？",onOk:function(){s()}})}))}}}),o=l,c=(e("4175"),e("2be6")),n=Object(c["a"])(o,a,i,!1,null,"16ad0b86",null);s["default"]=n.exports}}]);