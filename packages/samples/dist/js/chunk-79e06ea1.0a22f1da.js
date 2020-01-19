(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-79e06ea1"],{"0946":function(t,e,a){},"5da4":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{"padding-bottom":"200px"}},[a("div",{staticClass:"page-title"},[t._v("Upload 上传")]),a("p",[t._v("文件选择上传和拖拽上传控件。")]),a("br"),a("div",{staticClass:"page-sub-title"},[t._v("点击上传")]),a("p",[t._v("最基本用法，点击上传，一次选择一个文件。")]),a("br"),a("Upload",{attrs:{action:"//jsonplaceholder.typicode.com/posts/"}},[a("Button",{attrs:{icon:"ios-cloud-upload-outline"}},[t._v("Upload files")]),a("div",{attrs:{slot:"tip"},slot:"tip"},[t._v("请选择一个文件(tip slot 测试用)")])],1),a("div",{staticClass:"page-sub-title"},[t._v("多选")]),a("p",[t._v("设置属性 multiple，可以选择多个文件。")]),a("br"),a("Upload",{attrs:{multiple:"",action:"//jsonplaceholder.typicode.com/posts/","default-file-list":t.defaultList}},[a("Button",{attrs:{icon:"ios-cloud-upload-outline"}},[t._v("Upload files")])],1),a("div",{staticClass:"page-sub-title"},[t._v("手动上传")]),a("p",[t._v("绑定 before-upload，并返回false，可以阻止默认上传流程，手动控制文件上传。")]),a("br"),a("div",[a("Upload",{attrs:{"before-upload":t.handleUpload,action:"//jsonplaceholder.typicode.com/posts/"}},[a("Button",{attrs:{icon:"ios-cloud-upload-outline"}},[t._v("Select the file to upload")])],1),null!==t.file?a("div",[t._v(" Upload file: "+t._s(t.file.name)+" "),a("Button",{attrs:{type:"text",loading:t.loadingStatus},on:{click:t.upload}},[t._v(t._s(t.loadingStatus?"Uploading":"Click to upload"))])],1):t._e()],1),a("div",{staticClass:"page-sub-title"},[t._v("拖拽上传")]),a("p",[t._v("设置属性 type 为 drag，可以拖拽上传。")]),a("br"),a("Upload",{attrs:{multiple:"",type:"drag",action:"//jsonplaceholder.typicode.com/posts/"}},[a("div",{staticStyle:{padding:"20px 0"}},[a("Icon",{staticStyle:{color:"#3399ff"},attrs:{type:"ios-cloud-upload",size:"52"}}),a("p",[t._v("Click or drag files here to upload")])],1)]),a("div",{staticClass:"page-sub-title"},[t._v("自定义上传列表")]),t._m(0),a("br"),a("div",[t._l(t.uploadList,(function(e,i){return a("div",{key:i,staticClass:"demo-upload-list"},["success"===e.status?[a("img",{attrs:{src:e.url}}),a("div",{staticClass:"demo-upload-list-cover"},[a("Icon",{attrs:{type:"ios-eye-outline"},nativeOn:{click:function(a){return t.handleView(e.name)}}}),a("Icon",{attrs:{type:"ios-trash-outline"},nativeOn:{click:function(a){return t.handleRemove(e)}}})],1)]:e.showProgress?a("Progress",{attrs:{percent:e.percentage,"hide-info":""}}):t._e()],2)})),a("Upload",{ref:"upload",staticStyle:{display:"inline-block",width:"58px"},attrs:{"show-upload-list":!1,"default-file-list":t.defaultList,"on-success":t.handleSuccess,format:["jpg","jpeg","png"],"max-size":2048,"on-format-error":t.handleFormatError,"on-exceeded-size":t.handleMaxSize,"before-upload":t.handleBeforeUpload,multiple:"",type:"drag",action:"//jsonplaceholder.typicode.com/posts/"}},[a("div",{staticStyle:{width:"58px",height:"58px","line-height":"58px"}},[a("Icon",{attrs:{type:"ios-camera",size:"20"}})],1)]),a("Modal",{attrs:{title:"View Image"},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[t.visible?a("img",{staticStyle:{width:"100%"},attrs:{src:"https://o5wwk8baw.qnssl.com/"+t.imgName+"/large"}}):t._e()])],2)],1)},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("p",[t._v(" 可以自由控制上传列表，完成各种业务逻辑，示例是一个照片墙，可以查看大图和删除。"),a("br"),t._v(" 设置属性 show-upload-list 为 false，可以不显示默认的上传列表。"),a("br"),t._v(" 设置属性 default-file-list 设置默认已上传的列表。"),a("br"),t._v(" 通过 on-success 等属性来控制完整的上传过程，详见API。"),a("br"),t._v(" 另外，可以通过丰富的配置，来定制上传需求，本例中包含了："),a("br"),t._v(" 文件必须是 jpg 或 png 格式的图片。"),a("br"),t._v(" 最多上传5张图片。"),a("br"),t._v(" 每个文件大小不超过 2M。"),a("br")])}],l={data(){return{file:null,loadingStatus:!1,defaultList:[{name:"a42bdcc1178e62b4694c830f028db5c0",url:"https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar"},{name:"bc7521e033abdd1e92222d733590f104",url:"https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar"}],imgName:"",visible:!1,uploadList:[]}},mounted(){this.uploadList=this.$refs.upload.fileList},methods:{handleUpload(t){return this.file=t,!1},upload(){this.loadingStatus=!0,setTimeout(()=>{this.file=null,this.loadingStatus=!1,this.$Message.success("Success")},1500)},handleView(t){this.imgName=t,this.visible=!0},handleRemove(t){const e=this.$refs.upload.fileList;this.$refs.upload.fileList.splice(e.indexOf(t),1)},handleSuccess(t,e){e.url="https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar",e.name="7eb99afb9d5f317c912f08b5212fd69a"},handleFormatError(t){this.$Notice.warning({title:"The file format is incorrect",desc:"File format of "+t.name+" is incorrect, please select jpg or png."})},handleMaxSize(t){this.$Notice.warning({title:"Exceeding file size limit",desc:"File  "+t.name+" is too large, no more than 2M."})},handleBeforeUpload(){const t=this.uploadList.length<5;return t||this.$Notice.warning({title:"Up to five pictures can be uploaded."}),t}}},o=l,d=(a("c8ea"),a("2be6")),n=Object(d["a"])(o,i,s,!1,null,null,null);e["default"]=n.exports},c8ea:function(t,e,a){"use strict";var i=a("0946"),s=a.n(i);s.a}}]);