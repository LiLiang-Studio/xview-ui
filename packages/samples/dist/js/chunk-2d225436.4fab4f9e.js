(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d225436"],{e43d:function(t,o,r){"use strict";r.r(o);var a=function(){var t=this,o=t.$createElement,r=t._self._c||o;return r("div",[r("div",{staticClass:"page-title"},[t._v("Button 按钮")]),r("p",[t._v(" 按钮类型有：默认按钮、主按钮、虚线按钮、文字按钮以及四种颜色按钮。 通过设置type为primary、dashed、text、info、success、warning、error创建不同样式的按钮，不设置为默认样式。 ")]),r("div",{staticClass:"page-sub-title"},[t._v("按钮类型")]),r("Button",[t._v("Default")]),r("Button",{attrs:{type:"primary"}},[t._v("Primary")]),r("Button",{attrs:{type:"dashed"}},[t._v("Dashed")]),r("Button",{attrs:{type:"text"}},[t._v("Text")]),r("br"),r("br"),r("Button",{attrs:{type:"info"}},[t._v("Info")]),r("Button",{attrs:{type:"success"}},[t._v("Success")]),r("Button",{attrs:{type:"warning"}},[t._v("Warning")]),r("Button",{attrs:{type:"error"}},[t._v("Error")]),r("div",{staticClass:"page-sub-title"},[t._v("幽灵按钮")]),r("p",[t._v("幽灵按钮将其他按钮的内容反色，背景变为透明，常用在有色背景上。")]),r("div",{staticStyle:{padding:"20px",background:"rgb(190, 200, 200)"}},[r("Button",{attrs:{type:"default",ghost:""}},[t._v("Default")]),r("Button",{attrs:{type:"primary",ghost:""}},[t._v("Primary")]),r("Button",{attrs:{type:"dashed",ghost:""}},[t._v("Dashed")]),r("Button",{attrs:{type:"text",ghost:""}},[t._v("Text")]),r("Button",{attrs:{type:"info",ghost:""}},[t._v("Info")]),r("Button",{attrs:{type:"success",ghost:""}},[t._v("Success")]),r("Button",{attrs:{type:"warning",ghost:""}},[t._v("Warning")]),r("Button",{attrs:{type:"error",ghost:""}},[t._v("Error")])],1),r("div",{staticClass:"page-sub-title"},[t._v("图标按钮及按钮形状")]),r("p",[t._v(" 通过设置icon属性在Button内嵌入一个Icon，或者直接在Button内使用Icon组件。 使用Button的icon属性，图标位置将在最左边，如果需要自定义位置，需使用Icon组件。 通过设置shape属性为circle，可将按钮置为圆的形状。 ")]),r("Button",{attrs:{type:"primary",shape:"circle",icon:"ios-search"}}),r("Button",{attrs:{type:"primary",icon:"ios-search"}},[t._v("Search")]),r("Button",{attrs:{type:"primary",shape:"circle",icon:"ios-search"}},[t._v("Search")]),r("Button",{attrs:{type:"primary",shape:"circle"}},[t._v("Circle")]),r("br"),r("br"),r("Button",{attrs:{shape:"circle",icon:"ios-search"}}),r("Button",{attrs:{icon:"ios-search"}},[t._v("Search")]),r("Button",{attrs:{shape:"circle",icon:"ios-search"}},[t._v("Search")]),r("Button",{attrs:{shape:"circle"}},[t._v("Circle")]),r("div",{staticClass:"page-sub-title"},[t._v("按钮尺寸")]),r("p",[t._v(" 按钮有三种尺寸：大、默认（中）、小 通过设置size为large和small将按钮设置为大和小尺寸，不设置为默认（中）尺寸 ")]),r("RadioGroup",{attrs:{type:"button"},model:{value:t.buttonSize,callback:function(o){t.buttonSize=o},expression:"buttonSize"}},[r("Radio",{attrs:{label:"large"}},[t._v("Large")]),r("Radio",{attrs:{label:"default"}},[t._v("Default")]),r("Radio",{attrs:{label:"small"}},[t._v("small")])],1),r("br"),r("br"),r("Button",{attrs:{size:t.buttonSize,type:"primary"}},[t._v("Primary")]),r("Button",{attrs:{size:t.buttonSize,type:"default"}},[t._v("Default")]),r("Button",{attrs:{size:t.buttonSize,type:"dashed"}},[t._v("Dashed")]),r("Button",{attrs:{size:t.buttonSize,type:"text"}},[t._v("Text")]),r("br"),r("br"),r("Button",{attrs:{size:t.buttonSize,icon:"ios-download-outline",type:"primary",shape:"circle"}}),r("Button",{attrs:{size:t.buttonSize,icon:"ios-download-outline",type:"primary"}},[t._v("Download")]),r("br"),r("br"),r("ButtonGroup",{attrs:{size:t.buttonSize}},[r("Button",{attrs:{size:t.buttonSize,type:"primary"}},[r("Icon",{attrs:{type:"ios-arrow-back"}}),t._v("Backward ")],1),r("Button",{attrs:{size:t.buttonSize,type:"primary"}},[t._v(" Forward "),r("Icon",{attrs:{type:"ios-arrow-forward"}})],1)],1),r("div",{staticClass:"page-sub-title"},[t._v("长按钮")]),r("p",[t._v(" 通过设置属性 long 可将按钮宽度设置为 100%，常用于弹窗内操作按钮。 使用者也可以直接通过给组件添加 style 来设置更细节的样式，比如定宽。 ")]),r("Button",{attrs:{type:"success",long:""}},[t._v("SUBMIT")]),r("br"),r("br"),r("Button",{attrs:{type:"error",long:""}},[t._v("DELETE")]),r("div",{staticClass:"page-sub-title"},[t._v("不可用状态")]),r("p",[t._v("通过添加disabled属性可将按钮设置为不可用状态。")]),r("Button",[t._v("Default")]),r("Button",{attrs:{disabled:""}},[t._v("Default(Disabled)")]),r("br"),r("Button",{attrs:{type:"primary"}},[t._v("Primary")]),r("Button",{attrs:{type:"primary",disabled:""}},[t._v("Primary(Disabled)")]),r("br"),r("Button",{attrs:{type:"dashed"}},[t._v("Dashed")]),r("Button",{attrs:{type:"dashed",disabled:""}},[t._v("Dashed(Disabled)")]),r("br"),r("Button",{attrs:{type:"text"}},[t._v("Text")]),r("Button",{attrs:{type:"text",disabled:""}},[t._v("Text(Disabled)")]),r("div",{staticClass:"page-sub-title"},[t._v("加载中状态")]),r("p",[t._v("通过添加loading属性可以让按钮处于加载中状态，后两个按钮在点击时进入加载状态。")]),r("Button",{attrs:{type:"primary",loading:""}},[t._v("Loading...")]),r("Button",{attrs:{type:"primary",loading:t.loading},on:{click:t.toLoading}},[t.loading?r("span",[t._v("Loading...")]):r("span",[t._v("Click me!")])]),r("Button",{attrs:{type:"primary",loading:t.loading2,icon:"ios-power"},on:{click:t.toLoading2}},[t.loading2?r("span",[t._v("Loading...")]):r("span",[t._v("Click me!")])]),r("Button",{attrs:{loading:"",shape:"circle"}}),r("Button",{attrs:{loading:"",shape:"circle",type:"primary"}}),r("div",{staticClass:"page-sub-title"},[t._v("按钮组合")]),r("p",[t._v(" 将多个Button放入ButtonGroup内，可实现按钮组合的效果。 通过设置ButtonGroup的属性size为large和small，可将按钮组尺寸设置为大和小，不设置size，则为默认（中）尺寸。 通过设置ButtonGroup的属性shape为circle，可将按钮组形状设置为圆角。 ")]),r("h4",[t._v("Basic")]),r("br"),r("br"),r("ButtonGroup",[r("Button",[t._v("Cancel")]),r("Button",{attrs:{type:"primary"}},[t._v("Confirm")])],1),r("ButtonGroup",[r("Button",{attrs:{disabled:""}},[t._v("Yesterday")]),r("Button",{attrs:{disabled:""}},[t._v("Today")]),r("Button",{attrs:{disabled:""}},[t._v("Tomorrow")])],1),r("ButtonGroup",[r("Button",{attrs:{type:"primary"}},[t._v("L")]),r("Button",[t._v("M")]),r("Button",[t._v("M")]),r("Button",{attrs:{type:"dashed"}},[t._v("R")])],1),r("br"),r("br"),r("h4",[t._v("Icons")]),r("br"),r("br"),r("ButtonGroup",[r("Button",{attrs:{type:"primary"}},[r("Icon",{attrs:{type:"ios-arrow-back"}}),t._v("Backward ")],1),r("Button",{attrs:{type:"primary"}},[t._v(" Forward "),r("Icon",{attrs:{type:"ios-arrow-forward"}})],1)],1),r("ButtonGroup",[r("Button",{attrs:{type:"primary",icon:"ios-arrow-back"}}),r("Button",{attrs:{type:"primary",icon:"ios-arrow-forward"}})],1),r("ButtonGroup",[r("Button",{attrs:{icon:"ios-color-wand-outline"}}),r("Button",{attrs:{icon:"ios-sunny-outline"}}),r("Button",{attrs:{icon:"ios-crop"}}),r("Button",{attrs:{icon:"ios-color-filter-outline"}})],1),r("br"),r("br"),r("h4",[t._v("Circle")]),r("br"),r("br"),r("ButtonGroup",{attrs:{shape:"circle"}},[r("Button",{attrs:{type:"primary"}},[r("Icon",{attrs:{type:"ios-arrow-back"}}),t._v("Backward ")],1),r("Button",{attrs:{type:"primary"}},[t._v(" Forward "),r("Icon",{attrs:{type:"ios-arrow-forward"}})],1)],1),r("ButtonGroup",{attrs:{shape:"circle"}},[r("Button",{attrs:{type:"primary",icon:"ios-arrow-back"}}),r("Button",{attrs:{type:"primary",icon:"ios-arrow-forward"}})],1),r("ButtonGroup",{attrs:{shape:"circle"}},[r("Button",{attrs:{icon:"ios-color-wand-outline"}}),r("Button",{attrs:{icon:"ios-sunny-outline"}}),r("Button",{attrs:{icon:"ios-crop"}}),r("Button",{attrs:{icon:"ios-color-filter-outline"}})],1),r("br"),r("br"),r("h4",[t._v("Size")]),r("br"),r("br"),r("ButtonGroup",{attrs:{size:"large"}},[r("Button",[t._v("Large")]),r("Button",[t._v("Large")])],1),r("ButtonGroup",[r("Button",[t._v("Default")]),r("Button",[t._v("Default")])],1),r("ButtonGroup",{attrs:{size:"small"}},[r("Button",[t._v("Small")]),r("Button",[t._v("Small")])],1),r("br"),r("br"),r("ButtonGroup",{attrs:{size:"large",shape:"circle"}},[r("Button",[t._v("Large")]),r("Button",[t._v("Large")])],1),r("ButtonGroup",{attrs:{shape:"circle"}},[r("Button",[t._v("Default")]),r("Button",[t._v("Default")])],1),r("ButtonGroup",{attrs:{size:"small",shape:"circle"}},[r("Button",[t._v("Small")]),r("Button",[t._v("Small")])],1),r("div",{staticClass:"page-sub-title"},[t._v("按钮组纵向排列")]),r("p",[t._v("通过设置ButtonGroup的属性vertical，可以使按钮组纵向排列。")]),r("ButtonGroup",{attrs:{vertical:""}},[r("Button",{attrs:{icon:"ios-color-wand-outline"}}),r("Button",{attrs:{icon:"ios-sunny-outline"}}),r("Button",{attrs:{icon:"ios-crop"}}),r("Button",{attrs:{icon:"ios-color-filter-outline"}})],1),r("ButtonGroup",{attrs:{vertical:"",shape:"circle"}},[r("Button",{attrs:{icon:"ios-color-wand-outline"}}),r("Button",{attrs:{icon:"ios-sunny-outline"}}),r("Button",{attrs:{icon:"ios-crop"}}),r("Button",{attrs:{icon:"ios-color-filter-outline"}})],1),r("div",{staticClass:"page-sub-title"},[t._v("跳转")]),r("p",[t._v(" 通过设置 to 可以实现点击按钮直接跳转，支持传入 vue-router 对象。 设置 replace 则不会保存历史记录。 设置 target，会跟 a 标签一样的行为。 ")]),r("br"),r("Button",{attrs:{to:"/#/samples/Icon"}},[t._v("Normal")]),r("Button",{attrs:{to:"/#/samples/Icon",replace:""}},[t._v("No history")]),r("Button",{attrs:{to:"//iviewui.com",target:"_blank"}},[t._v("New window")])],1)},s=[],e={data(){return{loading:!1,loading2:!1,buttonSize:"large"}},methods:{toLoading(){this.loading=!0},toLoading2(){this.loading2=!0}}},n=e,i=r("2be6"),u=Object(i["a"])(n,a,s,!1,null,null,null);o["default"]=u.exports}}]);