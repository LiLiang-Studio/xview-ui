# vueui-widgets

### 与iview功能几乎一样的Vuejs UI库，但这更轻量级，部分组件可能实现的更好；用更少的代码完成更多的功能是我的目标；

demo地址(不完善) (https://liliangabc.github.io/vuewidgets)

```
  import Vue from 'vue'
  import VueUI from 'vueui-widgets'
  import 'vueui-widgets/dist/vueui.css'
  Vue.use(VueUI, { prefix: 'ui' })
```

#### options 目前仅支持 prefix属性，默认值为 'ui'，用来设置组件名字前缀，
#### 如果为空字符串，则不带前缀使用组件，这样iview官方例子基本可以直接拿来用


目前已完成的组件如下：

1. Alert
2. Avator
3. BackTop
4. Badge
5. Button
6. ButtonGroup
7. Icon
8. Input
9. Tag
10. Message
11. Notice
12. Checkbox
13. CheckboxGroup
14. Card
15. Timeline
16. TimelineItem
17. Progress
18. Collapse
19. Panel
20. Modal

#### 0.1.6版本更新
新增Modal组件

该组件既可以再模板中使用，亦可以通过添加到Vue实例的$Modal对象使用
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

```
  this.$Message.info(options)
  this.$Message.success(options)
  this.$Message.warning(options)
  this.$Message.error(options)
  this.$Message.loading(options)

  this.$Message.config(options)
  this.$Message.destroy(options)
```

#### Notice用法 (options 为String || Object 类型)

```
  this.$Notice.open(options)
  this.$Notice.info(options)
  this.$Notice.success(options)
  this.$Notice.warning(options)
  this.$Notice.error(options)

  this.$Notice.config(options)
  this.$Notice.destroy(options)
```
很抱歉，因精力有限，目前专注于开发新组件，文档暂时没充足时间编写，
详细文档请暂时参见iview (http://www.iviewui.com/)


更多组件正在开发的路上，敬请期待...