(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d212b75"],{aa32:function(t,e,s){"use strict";s.r(e);var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"page-title"},[t._v("Progress 进度条")]),s("div",{staticClass:"page-sub-title"},[t._v("处在不同状态下的进度条，当 percent 为 100 时，自动将状态置为 success。")]),s("Progress",{attrs:{percent:25}}),s("Progress",{attrs:{percent:45,status:"active"}}),s("Progress",{attrs:{percent:65,status:"wrong"}}),s("Progress",{attrs:{percent:100}}),s("Progress",{attrs:{percent:25,"hide-info":""}}),s("div",{staticClass:"page-sub-title"},[t._v("设置属性 vertical 将以垂直方向显示。")]),s("div",{staticStyle:{height:"100px"}},[s("Progress",{attrs:{vertical:"",percent:25}}),s("Progress",{attrs:{vertical:"",percent:45,status:"active"}}),s("Progress",{attrs:{vertical:"",percent:65,status:"wrong"}}),s("Progress",{attrs:{vertical:"",percent:100}}),s("Progress",{attrs:{vertical:"",percent:25,"hide-info":""}})],1),s("div",{staticClass:"page-sub-title"},[t._v("配合外部组件使用")]),s("Progress",{attrs:{percent:t.percent}}),s("ButtonGroup",{attrs:{size:"large"}},[s("Button",{attrs:{icon:"ios-plus-empty"},on:{click:t.add}}),s("Button",{attrs:{icon:"ios-minus-empty"},on:{click:t.minus}})],1),s("div",{staticClass:"page-sub-title"},[t._v("通过自定义slot和属性stroke-width改变进度条效果")]),s("Progress",{attrs:{percent:25,"stroke-width":5}}),s("Progress",{attrs:{percent:100}},[s("Icon",{attrs:{type:"checkmark-circled"}}),s("span",[t._v("成功")])],1)],1)},a=[],c={data:function(){return{percent:0}},methods:{add:function(){if(this.percent>=100)return!1;this.percent+=10},minus:function(){if(this.percent<=0)return!1;this.percent-=10}}},i=c,n=s("2be6"),o=Object(n["a"])(i,r,a,!1,null,null,null);e["default"]=o.exports}}]);