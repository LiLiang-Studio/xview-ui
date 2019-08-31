# vueui-widgets

[![npm package](https://img.shields.io/npm/v/vueui-widgets.svg)](https://www.npmjs.org/package/vueui-widgets)
![JS gzip size](http://img.badgesize.io/https://unpkg.com/vueui-widgets/dist/vueui-widgets.umd.min.js?compression=gzip&label=gzip:%20JS)
![CSS gzip size](http://img.badgesize.io/https://unpkg.com/vueui-widgets/dist/index.css?compression=gzip&label=gzip:%20CSS)
![License: MIT](https://img.shields.io/npm/l/vueui-widgets)

### 基于Vuejs的高性能超轻量级组件库

### 与iview功能和用法几乎一样，但这更轻量级，性能更有优势；

demo地址(暂不完善) [vueui-widgets](https://vueui-widgets.web.app)

```
0.5.0版本开始采用Rollup构建，比之前体积更小
1.0.0版本发布之前，不建议商用；
当然，可供学习交流之用，欢迎大家下载体验；
```

```javascript
import Vue from 'vue'
import VueUI from 'vueui-widgets'
import 'vueui-widgets/dist/index.css'
Vue.use(VueUI, { prefix: 'ui' })
```
#### options 目前仅支持 prefix属性，默认值为 'ui'，用来设置组件名字前缀，
#### 如果为空字符串，则不带前缀使用组件，这样iview官方例子基本可以直接拿来用

#### 0.6.0版本更新（2019年8月31日）
已新增或优化了29个组件

#### 0.5.9版本更新（2019年8月29日）
已新增或优化了28个组件

#### 0.5.8版本更新（2019年8月28日）
已新增或优化了26个组件

#### 0.5.6版本更新（2019年8月26日）
已新增或优化了22个组件

#### 0.5.2版本更新（2019年8月24日）
webpack切换到Rollup构建，优化了15个组件，压缩版体积较4.x版本减小了近100kb

#### 0.4.4版本更新（2019年4月23日）
新增AutoComplete组件，暂不支持自定义slot选项列表

#### 0.4.3版本更新（2019年4月19日）
新增Form，FormItem组件，暂不支持表单验证

#### 0.4.2版本更新（2019年4月18日）
新增Slider组件

#### 0.4.1版本更新（2019年4月16日）
新增Table组件，该版本仅实现了部分功能，后续版本会逐步实现所有功能，详见演示地址：[打开Demo](https://liliangabc.github.io/vueui-widgets/#/samples/Table)

#### 0.4.0版本更新（2019年4月14日）
新增Tree组件，暂不支持渲染方法，将在1.0版本之前提供支持

#### 0.3.9版本更新（2019年4月13日）
新增Poptip组件

#### 0.3.8版本更新（2019年4月12日）
新增Tooltip组件

#### 0.3.7版本更新（2019年4月11日）
新增垂直导航菜单，但没有动画效果，计划1.0版本发布之前完美支持该功能，可能还存在一些细节未完善

#### 0.3.6版本更新（2019年4月10日）
新增Menu，MenuItem，Submenu，MenuGroup组件，目前仅支持水平导航菜单，垂直导航菜单下个版本提供支持

#### 0.3.5版本更新（2019年4月9日）
新增Dropdown, DropdownMenu, DropdownItem组件, 暂不支持菜单位置设置和二级菜单，计划1.0版本发布之前完美支持该功能

#### 0.3.4版本更新（2019年4月8日）
新增Page组件

#### 0.3.3版本更新（2019年4月7日）
新增LoadingBar组件，具体用法请参见demo演示和介绍 [打开Demo](https://liliangabc.github.io/vueui-widgets/#/samples/LoadingBar)

#### 0.3.2版本更新（2019年4月6日）
新增Affix组件

#### 0.3.1版本更新（2019年4月6日）
新增Scroll，ICircle，Step，Steps组件，ICircle对应于iview中的Circle组件

#### 0.3.0版本更新（2019年4月5日）
Select组件新增支持多选和键盘选择，以及本地和远程搜索功能，与iview Select用法完全一致

#### 0.2.9版本更新（2019年4月3日）
新增Select，Option，OptionGroup组件，暂不支持多选和键盘选择，将在下个版本提供支持

#### 0.2.8版本更新（2019年4月2日）
新增InputNumber组件 暂不支持用于格式化数值的 formatter 和 parser属性

#### 0.2.7版本更新（2019年4月1日）
新增Rate组件

#### 0.2.6版本更新（2019年3月31日）
新增Transfer组件

#### 0.2.5版本更新（2019年3月30日）
新增Spin组件

#### 0.2.4版本更新（2019年3月30日）
新增Tabs，TabPane组件

#### 0.2.3版本更新（2019年3月28日）
新增ISwitch组件，对应iview中的Switch组件，用法完全一样；

#### 0.2.2版本更新（2019年3月27日）
新增Radio，RadioGroup组件

#### 0.2.1版本更新（2019年3月26日）
新增Layout，Header，Content，Footer，Sider组件，除了Sider不支持breakpoint属性，其它与iview完全一致；

#### 0.2.0版本更新（2019年3月25日）
新增Row，Col组件，用来实现与boostrap一致的响应式网格布局

#### 0.1.9版本更新（2019年3月25日）
1. 因发现Swiper组件存在bug，和代码实现上的不够完美，紧急修复bug并优化代码逻辑，尺寸计算全部改成百分比，更适应窗口大小的变化;
2. github仓库地址已变更，现在和包名保持一致;

#### 0.1.8版本更新（2019年3月24日）

新增Swiper, SwiperItem组件; 对应于iview中的Carousel, CarouselItem，用法完全一样;

#### 0.1.7版本更新（2019年3月23日）

+ 新增breadcrumb， breadcrumbItem导航组件

#### 0.1.6版本更新（2019年3月22日）

+ 新增Modal组件

该组件既可以在模板中使用，亦可以通过添加到Vue实例的$Modal对象使用
对象用法如下：

 + this.$Modal.info(config)
 + this.$Modal.success(config)
 + this.$Modal.warning(config)
 + this.$Modal.error(config)
 + this.$Modal.confirm(config)
 + this.$Modal.remove()  // 全局关闭对话框

#### 0.1.5版本更新

新增Progress, Collapse, Panel组件

#### 0.1.4版本更新

新增Card, Timeline, TimelineItem组件

#### 0.1.3版本更新

新增Checkbox和CheckboxGroup组件

#### Message用法 (options 为String || Object 类型)

```javascript
this.$Message.info(options)
this.$Message.success(options)
this.$Message.warning(options)
this.$Message.error(options)
this.$Message.loading(options)

this.$Message.config(options)
this.$Message.destroy(options)
```

#### Notice用法 (options 为String || Object 类型)

```javascript
this.$Notice.open(options)
this.$Notice.info(options)
this.$Notice.success(options)
this.$Notice.warning(options)
this.$Notice.error(options)

this.$Notice.config(options)
this.$Notice.destroy(options)
```
***稳定版将兼容IE10以上和其它浏览器，如果你要考虑IE9的兼容，请谨慎选择！***

很抱歉，因精力有限，目前专注于开发新组件，文档暂时没充足时间编写，
详细文档请暂时参见iview [http://www.iviewui.com/](http://www.iviewui.com/)


更多组件正在开发的路上，敬请期待...