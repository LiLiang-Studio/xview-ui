(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2136cc"],{ad2e:function(a,e,l){"use strict";l.r(e);var t=function(){var a=this,e=a.$createElement,l=a._self._c||e;return l("div",[l("div",{staticClass:"page-title"},[a._v("Cascader 级联选择")]),l("p",[a._v(" 从一组相关联的数据集合中进行选择，常用于省市区、公司级层、事务分类等。 相比 Select 组件，可以一次性完成选择，体验更好。 ")]),l("div",{staticClass:"page-sub-title"},[a._v("基础用法")]),a._m(0),l("br"),l("Cascader",{attrs:{data:a.data},model:{value:a.value1,callback:function(e){a.value1=e},expression:"value1"}}),l("div",{staticClass:"page-sub-title"},[a._v("默认值")]),l("p",[a._v("指定 value 默认值，组件会在初始化时选定数据。")]),l("br"),l("Cascader",{attrs:{data:a.data},model:{value:a.value2,callback:function(e){a.value2=e},expression:"value2"}}),l("div",{staticClass:"page-sub-title"},[a._v("移入展开")]),l("p",[a._v("设置属性 trigger 为 hover，当鼠标悬停时就会展开子集。")]),l("br"),l("Cascader",{attrs:{data:a.data,trigger:"hover"}}),l("div",{staticClass:"page-sub-title"},[a._v("自定义显示")]),l("p",[a._v("通过设置 slot 可以自定义显示内容，不局限于输入框。")]),l("br"),a._v(" "+a._s(a.text)+" "),l("Cascader",{attrs:{data:a.data},on:{"on-change":a.handleChange}},[l("a",{attrs:{href:"javascript:void(0)"}},[a._v("选择")])]),l("div",{staticClass:"page-sub-title"},[a._v("禁用")]),l("p",[a._v("设置属性 disabled 可以禁用组件。给某项数据设置 disabled: true 可以禁用某一项")]),l("br"),l("Row",[l("Col",{attrs:{span:"12"}},[l("Cascader",{attrs:{data:a.data2,disabled:""}})],1),l("Col",{attrs:{span:"12"}},[l("Cascader",{attrs:{data:a.data2}})],1)],1),l("div",{staticClass:"page-sub-title"},[a._v("自定义已选项")]),a._m(1),l("br"),l("Cascader",{attrs:{data:a.data3,"render-format":a.format}}),l("div",{staticClass:"page-sub-title"},[a._v("尺寸")]),l("p",[a._v("通过设置size属性为large和small将输入框设置为大和小尺寸，不设置为默认（中）尺寸。")]),l("br"),l("Cascader",{attrs:{data:a.data,size:"large"}}),l("br"),l("br"),l("Cascader",{attrs:{data:a.data}}),l("br"),l("br"),l("Cascader",{attrs:{data:a.data,size:"small"}}),l("div",{staticClass:"page-sub-title"},[a._v("动态加载选项")]),a._m(2),l("br"),l("Cascader",{attrs:{data:a.data4,"load-data":a.loadData}})],1)},n=[function(){var a=this,e=a.$createElement,l=a._self._c||e;return l("p",[a._v(" 级联选择对数据有较严格要求，请参照示例的格式使用data，每项数据至少包含 value、label 两项，子集为 children，以此类推。 "),l("br"),a._v("value 为当前选择的数据的 value 值的数组，比如 ['beijing', 'gugong'] ，按照级联顺序依次排序，使用 v-model 进行双向绑定。 ")])},function(){var a=this,e=a.$createElement,l=a._self._c||e;return l("p",[a._v(" 对于显示的结果，可以通过 render-format 接收一个函数来自定义。 "),l("br"),a._v("其中第一个参数 labels 是当前选择的label的集合，第二个参数 selectedData 是当前选择的数据集合，可以利用它们组合出你想要显示的内容。 ")])},function(){var a=this,e=a.$createElement,l=a._self._c||e;return l("p",[a._v(" 使用 load-data 属性可以异步加载子选项，需要给数据增加 loading 来标识当前是否在加载中。 "),l("br"),a._v("load-data 的第二个参数为回调，如果执行，则会自动展开当前项的子列表。 ")])}],i=(l("ef14"),l("cfce"),{data:function(){return{value1:[],value2:["jiangsu","suzhou","zhuozhengyuan"],text:"未选择",value3:[],data:[{value:"beijing",label:"北京",children:[{value:"gugong",label:"故宫"},{value:"tiantan",label:"天坛"},{value:"wangfujing",label:"王府井"}]},{value:"jiangsu",label:"江苏",children:[{value:"nanjing",label:"南京",children:[{value:"fuzimiao",label:"夫子庙"}]},{value:"suzhou",label:"苏州",children:[{value:"zhuozhengyuan",label:"拙政园"},{value:"shizilin",label:"狮子林"}]}]}],data2:[{value:"zhejiang",label:"浙江",children:[{value:"hangzhou",label:"杭州",children:[{value:"xihu",label:"西湖"}]}]},{value:"jiangsu",label:"江苏",disabled:!0,children:[{value:"nanjing",label:"南京",children:[{value:"zhonghuamen",label:"中华门"}]}]}],data3:[{value:"zhejiang",label:"浙江",children:[{value:"hangzhou",label:"杭州",children:[{value:"xihu",label:"西湖",code:31e4}]}]},{value:"jiangsu",label:"江苏",children:[{value:"nanjing",label:"南京",children:[{value:"zhonghuamen",label:"中华门",code:21e4}]}]}],data4:[{value:"beijing",label:"北京",children:[],loading:!1},{value:"hangzhou",label:"杭州",children:[],loading:!1}]}},methods:{handleChange:function(a,e){this.text=e.map((function(a){return a.label})).join(", ")},format:function(a,e){var l=a.length-1,t=e[l]||!1;return t&&t.code?a[l]+" - "+t.code:a[l]},loadData:function(a,e){a.loading=!0,setTimeout((function(){"beijing"===a.value?a.children=[{value:"talkingdata",label:"TalkingData"},{value:"baidu",label:"百度"},{value:"sina",label:"新浪"}]:"hangzhou"===a.value&&(a.children=[{value:"ali",label:"阿里巴巴"},{value:"163",label:"网易"}]),a.loading=!1,e()}),1e3)}}}),d=i,u=l("2be6"),r=Object(u["a"])(d,t,n,!1,null,null,null);e["default"]=r.exports}}]);