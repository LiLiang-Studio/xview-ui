(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d225bea"],{e669:function(a,t,e){"use strict";e.r(t);var s=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticStyle:{"padding-bottom":"100px"}},[e("div",{staticClass:"page-title"},[a._v("Tabs 标签页")]),e("p",[a._v("选项卡切换组件，常用于平级区域大块内容的的收纳和展现。")]),e("div",{staticClass:"page-sub-title"},[a._v("基础用法")]),e("p",[a._v("value 与 TabPane 的 name 对应，用于标识当前激活的是哪一项，name 值默认从 0 开始，默认激活第一项。 可以使用 v-model 双向绑定数据。")]),e("br"),e("Tabs",{attrs:{value:"name1"}},[e("TabPane",{attrs:{label:"标签一",name:"name1"}},[a._v("标签一的内容")]),e("TabPane",{attrs:{label:"标签二",name:"name2"}},[a._v("标签二的内容")]),e("TabPane",{attrs:{label:"标签三",name:"name3"}},[a._v("标签三的内容")])],1),e("div",{staticClass:"page-sub-title"},[a._v("禁用")]),e("p",[a._v("禁用某一项。")]),e("br"),e("Tabs",[e("TabPane",{attrs:{label:"标签一"}},[a._v("标签一的内容")]),e("TabPane",{attrs:{label:"标签二",disabled:""}},[a._v("标签二的内容")]),e("TabPane",{attrs:{label:"标签三"}},[a._v("标签三的内容")])],1),e("div",{staticClass:"page-sub-title"},[a._v("图标")]),e("p",[a._v("通过设置属性 icon，可以显示一个图标。")]),e("br"),e("Tabs",[e("TabPane",{attrs:{label:"macOS",icon:"social-apple"}},[a._v("标签一的内容")]),e("TabPane",{attrs:{label:"Windows",icon:"social-windows"}},[a._v("标签二的内容")]),e("TabPane",{attrs:{label:"Linux",icon:"social-tux"}},[a._v("标签三的内容")])],1),e("div",{staticClass:"page-sub-title"},[a._v("迷你型")]),e("p",[a._v("设置属性 size 为 small 可以显示为迷你型，只在 type 为 line 时有效。")]),e("br"),e("Tabs",{attrs:{size:"small"}},[e("TabPane",{attrs:{label:"标签一"}},[a._v("标签一的内容")]),e("TabPane",{attrs:{label:"标签二"}},[a._v("标签二的内容")]),e("TabPane",{attrs:{label:"标签三"}},[a._v("标签三的内容")])],1),e("div",{staticClass:"page-sub-title"},[a._v("卡片样式")]),e("p",[a._v("设置属性 type 为 card 可以显示卡片样式，常用于容器顶部。")]),e("br"),e("Tabs",{attrs:{type:"card",value:2}},[e("TabPane",{attrs:{label:"标签一"}},[a._v("标签一的内容")]),e("TabPane",{attrs:{label:"标签二"}},[a._v("标签二的内容")]),e("TabPane",{attrs:{label:"标签三"}},[a._v("标签三的内容")])],1),e("div",{staticClass:"page-sub-title"},[a._v("可关闭")]),e("p",[a._v("通过设置属性 closable 可以关闭某一项，仅在 type 为 card 时有效。 需结合 @on-tab-remove 事件手动关闭标签页。")]),e("br"),e("Tabs",{attrs:{type:"card",closable:""},on:{"on-tab-remove":a.handleTabRemove}},[a.tab0?e("TabPane",{attrs:{label:"标签一"}},[a._v("标签一的内容")]):a._e(),a.tab1?e("TabPane",{attrs:{label:"标签二"}},[a._v("标签二的内容")]):a._e(),a.tab2?e("TabPane",{attrs:{label:"标签三"}},[a._v("标签三的内容")]):a._e()],1),e("div",{staticClass:"page-sub-title"},[a._v("自定义标签页")]),e("p",[a._v("设置 label 为 Render 函数后，可以自定义标签页的内容。")]),e("br"),e("Tabs",{attrs:{value:"name2"}},[e("TabPane",{attrs:{label:a.label,name:"name1"}},[a._v("标签一的内容")]),e("TabPane",{attrs:{label:"标签二",name:"name2"}},[a._v("标签二的内容")]),e("TabPane",{attrs:{label:"标签三",name:"name3"}},[a._v("标签三的内容")])],1),e("div",{staticClass:"page-sub-title"},[a._v("附加内容")]),e("p",[a._v("设置 slot extra 可以在页签右边添加附加操作。")]),e("br"),e("Tabs",{attrs:{type:"card"}},[a._l(a.tabs,(function(t){return e("TabPane",{key:t,attrs:{label:"标签"+t}},[a._v("标签"+a._s(t))])})),e("Button",{attrs:{slot:"extra",size:"small"},on:{click:a.handleTabsAdd},slot:"extra"},[a._v("增加")])],2),e("div",{staticClass:"page-sub-title"},[a._v("不使用动画")]),e("p",[a._v("通过设置属性 animated 为 false 可以禁用动画。")]),e("Tabs",{attrs:{animated:!1}},[e("TabPane",{attrs:{label:"标签一"}},[a._v("标签一的内容")]),e("TabPane",{attrs:{label:"标签二"}},[a._v("标签二的内容")]),e("TabPane",{attrs:{label:"标签三"}},[a._v("标签三的内容")])],1)],1)},l=[],b={data:function(){return{tab0:!0,tab1:!0,tab2:!0,tabs:2,label:function(a){return a("div",[a("span","标签一"),a("Badge",{props:{count:3}})])}}},methods:{handleTabRemove:function(a){this["tab"+a]=!1},handleTabsAdd:function(){this.tabs++}}},n=b,v=e("2be6"),r=Object(v["a"])(n,s,l,!1,null,null,null);t["default"]=r.exports}}]);