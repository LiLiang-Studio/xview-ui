(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e60f7"],{"96ae":function(e,l,t){"use strict";t.r(l);var a=function(){var e=this,l=e.$createElement,t=e._self._c||l;return t("div",[t("div",{staticClass:"page-title"},[e._v("Select 选择器")]),t("p",[e._v("使用模拟的增强下拉选择器来代替浏览器原生的选择器。选择器支持单选、多选、搜索，以及键盘快捷操作。")]),e._m(0),t("Select",{staticStyle:{width:"200px"},model:{value:e.model1,callback:function(l){e.model1=l},expression:"model1"}},e._l(e.cityList,(function(l){return t("Option",{key:l.value,attrs:{value:l.value}},[e._v(e._s(l.label))])})),1),t("div",{staticClass:"page-sub-title"},[e._v("通过设置size属性为large和small将输入框设置为大和小尺寸，不设置为默认（中）尺寸。")]),t("Select",{staticStyle:{width:"100px"},attrs:{size:"small"},model:{value:e.model2,callback:function(l){e.model2=l},expression:"model2"}},e._l(e.cityList,(function(l){return t("Option",{key:l.value,attrs:{value:l.value}},[e._v(e._s(l.label))])})),1),t("Select",{staticStyle:{width:"100px","margin-left":"10px"},model:{value:e.model3,callback:function(l){e.model3=l},expression:"model3"}},e._l(e.cityList,(function(l){return t("Option",{key:l.value,attrs:{value:l.value}},[e._v(e._s(l.label))])})),1),t("Select",{staticStyle:{width:"100px","margin-left":"10px"},attrs:{size:"large"},model:{value:e.model4,callback:function(l){e.model4=l},expression:"model4"}},e._l(e.cityList,(function(l){return t("Option",{key:l.value,attrs:{value:l.value}},[e._v(e._s(l.label))])})),1),t("div",{staticClass:"page-sub-title"},[e._v("通过给Select设置属性disabled禁用整个选择器。通过给Option设置属性disabled可以禁用当前项。")]),t("Select",{staticStyle:{width:"200px"},attrs:{disabled:""},model:{value:e.model5,callback:function(l){e.model5=l},expression:"model5"}},e._l(e.cityList,(function(l){return t("Option",{key:l.value,attrs:{value:l.value}},[e._v(e._s(l.label))])})),1),t("Select",{staticStyle:{width:"200px","margin-left":"10px"},model:{value:e.model6,callback:function(l){e.model6=l},expression:"model6"}},[t("Option",{attrs:{value:"beijing"}},[e._v("New York")]),t("Option",{attrs:{value:"shanghai",disabled:""}},[e._v("London")]),t("Option",{attrs:{value:"shenzhen"}},[e._v("Sydney")])],1),t("div",{staticClass:"page-sub-title"},[e._v("通过设置属性clearable可以清空已选项，仅适用于单选模式。")]),t("Select",{staticStyle:{width:"200px"},attrs:{clearable:""},model:{value:e.model8,callback:function(l){e.model8=l},expression:"model8"}},e._l(e.cityList,(function(l){return t("Option",{key:l.value,attrs:{value:l.value}},[e._v(e._s(l.label))])})),1),t("div",{staticClass:"page-sub-title"},[e._v("使用OptionGroup可将选项进行分组。")]),t("Select",{staticStyle:{width:"200px"},model:{value:e.model7,callback:function(l){e.model7=l},expression:"model7"}},[t("OptionGroup",{attrs:{label:"Hot Cities"}},e._l(e.cityList1,(function(l){return t("Option",{key:l.value,attrs:{value:l.value}},[e._v(e._s(l.label))])})),1),t("OptionGroup",{attrs:{label:"Other Cities"}},e._l(e.cityList2,(function(l){return t("Option",{key:l.value,attrs:{value:l.value}},[e._v(e._s(l.label))])})),1)],1),t("div",{staticClass:"page-sub-title"},[e._v("自定义模板")]),t("p",[e._v(" 对选项内容可以进行自定义。注意在Option中使用label属性，可以让选择器优先读取该属性的值以显示， 否则选中时显示的内容会和自定义的一样，这往往不是我们想要的。 ")]),t("p",[e._v("对于选项显示内容的逻辑：优先显示 slot 内容，如果没有定义 slot，则显示label的值，如果没有设置 label，则显示value的值。")]),t("br"),t("Select",{staticStyle:{width:"200px"},model:{value:e.model9,callback:function(l){e.model9=l},expression:"model9"}},[t("Option",{attrs:{value:"New York",label:"纽约"}},[t("span",[e._v("New York")]),t("span",{staticStyle:{float:"right",color:"#ccc"}},[e._v("America")])]),t("Option",{attrs:{value:"London",label:"伦敦"}},[t("span",[e._v("London")]),t("span",{staticStyle:{float:"right",color:"#ccc"}},[e._v("U.K.")])]),t("Option",{attrs:{value:"Sydney",label:"悉尼"}},[t("span",[e._v("Sydney")]),t("span",{staticStyle:{float:"right",color:"#ccc"}},[e._v("Australian")])])],1),t("div",{staticClass:"page-sub-title"},[e._v("通过设置属性multiple可以开启多选模式。多选模式下，model 接受数组类型的数据，所返回的也是数组。")]),t("Select",{staticStyle:{width:"260px"},attrs:{multiple:""},model:{value:e.model10,callback:function(l){e.model10=l},expression:"model10"}},e._l(e.cityList,(function(l){return t("Option",{key:l.value,attrs:{value:l.value}},[e._v(e._s(l.label))])})),1),t("div",{staticClass:"page-sub-title"},[e._v(" 通过设置属性filterable可以开启搜索模式。 单选和多选都支持搜索模式。多选搜索时，可以使用键盘Delete快捷删除最后一个已选项。 ")]),t("Row",[t("Col",{staticStyle:{"padding-right":"10px"},attrs:{span:"12"}},[t("Select",{attrs:{filterable:""},model:{value:e.model11,callback:function(l){e.model11=l},expression:"model11"}},e._l(e.cityList,(function(l){return t("Option",{key:l.value,attrs:{value:l.value}},[e._v(e._s(l.label))])})),1)],1),t("Col",{attrs:{span:"12"}},[t("Select",{attrs:{filterable:"",multiple:""},model:{value:e.model12,callback:function(l){e.model12=l},expression:"model12"}},e._l(e.cityList,(function(l){return t("Option",{key:l.value,attrs:{value:l.value}},[e._v(e._s(l.label))])})),1)],1)],1),t("div",{staticClass:"page-sub-title"},[e._v("远程搜索")]),t("p",[e._v(" 远程搜索需同时设置 filterable、remote、remote-method、loading 四个 props，其中 loading 用于控制是否正在搜索中， remote-method 是远程搜索的方法。注意：需要给 Option 设置 key。设置初始显示值，需设置 label 属性。本例为美国州名，尝试输入一些字母。 ")]),t("Row",[t("Col",{staticStyle:{"padding-right":"10px"},attrs:{span:"12"}},[t("Select",{attrs:{filterable:"",remote:"","remote-method":e.remoteMethod1,loading:e.loading1},model:{value:e.model13,callback:function(l){e.model13=l},expression:"model13"}},e._l(e.options1,(function(l,a){return t("Option",{key:a,attrs:{value:l.value}},[e._v(e._s(l.label))])})),1)],1),t("Col",{attrs:{span:"12"}},[t("Select",{attrs:{multiple:"",filterable:"",remote:"","remote-method":e.remoteMethod2,loading:e.loading2},model:{value:e.model14,callback:function(l){e.model14=l},expression:"model14"}},e._l(e.options2,(function(l,a){return t("Option",{key:a,attrs:{value:l.value}},[e._v(e._s(l.label))])})),1)],1)],1),t("div",{staticStyle:{padding:"100px"}})],1)},o=[function(){var e=this,l=e.$createElement,t=e._self._c||l;return t("div",{staticClass:"page-sub-title"},[e._v(" 基本用法。可以使用 v-model 双向绑定数据。 "),t("br"),e._v("单选时，value 只接受字符串和数字类型，多选时，只接受数组类型，组件会自动根据Option的value来返回选中的数据。 "),t("br"),e._v("可以给Select添加 style 样式，比如宽度。 "),t("br"),e._v("在展开选择器后，可以使用键盘的up和down快速上下选择，按下Enter选择，按下Esc收起选择器。 ")])}],i={data(){return{cityList:[{value:"New York",label:"New York"},{value:"London",label:"London"},{value:"Sydney",label:"Sydney"},{value:"Ottawa",label:"Ottawa"},{value:"Paris",label:"Paris"},{value:"Canberra",label:"Canberra"}],model1:"London",model2:"",model3:"",model4:"",model5:"",model6:"",model8:"",cityList1:[{value:"New York",label:"New York"},{value:"London",label:"London"},{value:"Sydney",label:"Sydney"}],cityList2:[{value:"Ottawa",label:"Ottawa"},{value:"Paris",label:"Paris"},{value:"Canberra",label:"Canberra"}],model7:"",model9:"",model10:[],model11:"",model12:[],model13:"",loading1:!1,options1:[],model14:[],loading2:!1,options2:[],list:["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New hampshire","New jersey","New mexico","New york","North carolina","North dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode island","South carolina","South dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West virginia","Wisconsin","Wyoming"]}},methods:{remoteMethod1(e){""!==e?(this.loading1=!0,setTimeout(()=>{this.loading1=!1;const l=this.list.map(e=>({value:e,label:e}));this.options1=l.filter(l=>l.label.toLowerCase().indexOf(e.toLowerCase())>-1)},200)):this.options1=[]},remoteMethod2(e){""!==e?(this.loading2=!0,setTimeout(()=>{this.loading2=!1;const l=this.list.map(e=>({value:e,label:e}));this.options2=l.filter(l=>l.label.toLowerCase().indexOf(e.toLowerCase())>-1)},200)):this.options2=[]}}},s=i,n=t("2be6"),r=Object(n["a"])(s,a,o,!1,null,null,null);l["default"]=r.exports}}]);