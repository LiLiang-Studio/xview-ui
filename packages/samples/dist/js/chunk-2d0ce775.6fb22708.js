(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0ce775"],{6027:function(e,a,l){"use strict";l.r(a);var t=function(){var e=this,a=e.$createElement,l=e._self._c||a;return l("div",{staticStyle:{"padding-bottom":"200px"}},[l("div",{staticClass:"page-title"},[e._v("InputNumber 数字输入框")]),l("p",[e._v("使用鼠标或键盘输入一定范围的标准数值。")]),l("div",{staticClass:"page-sub-title"},[e._v("基础用法")]),l("p",[e._v("可以通过输入、鼠标点击或键盘的上下键来改变数值大小。")]),l("br"),l("InputNumber",{attrs:{placeholder:"请输入",max:10,min:1},model:{value:e.value1,callback:function(a){e.value1=a},expression:"value1"}}),l("div",{staticClass:"page-sub-title"},[e._v("小数")]),l("p",[e._v("通过设置step属性控制每次改变的精度。")]),l("br"),l("InputNumber",{attrs:{max:10,min:1,step:1.2},model:{value:e.value2,callback:function(a){e.value2=a},expression:"value2"}}),l("div",{staticClass:"page-sub-title"},[e._v("格式化展示")]),l("p",[e._v("通过 formatter 格式化数字，以展示具有具体含义的数据，往往需要配合 parser 一起使用。")]),l("br"),l("InputNumber",{attrs:{max:1e4,formatter:function(e){return("$ "+e).replace(/\B(?=(\d{3})+(?!\d))/g,",")},parser:function(e){return e.replace(/\$\s?|(,*)/g,"")}},model:{value:e.value9,callback:function(a){e.value9=a},expression:"value9"}}),l("InputNumber",{staticStyle:{"margin-left":"12px"},attrs:{max:100,formatter:function(e){return e+"%"},parser:function(e){return e.replace("%","")}},model:{value:e.value10,callback:function(a){e.value10=a},expression:"value10"}}),l("div",{staticClass:"page-sub-title"},[e._v("尺寸")]),l("p",[e._v("通过设置size属性为large和small将输入框设置为大和小尺寸，不设置为默认（中）尺寸。")]),l("br"),l("InputNumber",{attrs:{size:"small"},model:{value:e.value3,callback:function(a){e.value3=a},expression:"value3"}}),l("InputNumber",{staticStyle:{"margin-left":"12px"},model:{value:e.value4,callback:function(a){e.value4=a},expression:"value4"}}),l("InputNumber",{staticStyle:{"margin-left":"12px"},attrs:{size:"large"},model:{value:e.value5,callback:function(a){e.value5=a},expression:"value5"}}),l("div",{staticClass:"page-sub-title"},[e._v("不可用")]),l("p",[e._v("通过设置disabled属性禁用输入框，点击按钮切换状态。")]),l("br"),l("InputNumber",{attrs:{disabled:e.disabled},model:{value:e.value6,callback:function(a){e.value6=a},expression:"value6"}}),l("Button",{staticStyle:{"margin-left":"12px"},attrs:{type:"primary"},on:{click:function(a){e.disabled=!e.disabled}}},[e._v("Toggle Disabled")]),l("div",{staticClass:"page-sub-title"},[e._v("只读")]),l("p",[e._v("通过设置readonly属性开启只读。")]),l("br"),l("InputNumber",{attrs:{readonly:!0},model:{value:e.value7,callback:function(a){e.value7=a},expression:"value7"}}),l("div",{staticClass:"page-sub-title"},[e._v("不可编辑")]),l("p",[e._v("通过设置editable属性控制是否能编辑。")]),l("br"),l("InputNumber",{attrs:{editable:!1},model:{value:e.value8,callback:function(a){e.value8=a},expression:"value8"}})],1)},u=[],s={data:function(){return{value1:"",value2:1,value9:1e3,value10:100,value3:2,value4:2,value5:2,disabled:!0,value6:1,value7:1,value8:1}}},i=s,n=l("2be6"),r=Object(n["a"])(i,t,u,!1,null,null,null);a["default"]=r.exports}}]);