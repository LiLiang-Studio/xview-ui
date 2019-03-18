# vueui-widgets

## 与iview功能几乎一样的Vuejs UI库，但这可能更轻量级，部分组件可能实现的更好；

```
  npm install vueui-widgets

  import Vue from 'vue'
  import VueUIWidgets from 'vueui-widgets'
  Vue.use(VueUIWidgets, { prefix: 'ui' })
```

### options 目前仅支持 prefix属性，默认值为 'ui'，用来设置组件名字前缀，如果为空字符串，则不带前缀使用组件


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

### Message用法 (options 为String || Object 类型)

```
  this.$Message.info(options)
  this.$Message.success(options)
  this.$Message.warning(options)
  this.$Message.error(options)
  this.$Message.loading(options)

  this.$Message.config(options)
  this.$Message.destroy(options)
```

### Notice用法 (options 为String || Object 类型)

```
  this.$Notice.open(options)
  this.$Notice.info(options)
  this.$Notice.success(options)
  this.$Notice.warning(options)
  this.$Notice.error(options)

  this.$Notice.config(options)
  this.$Notice.destroy(options)
```

详细文档请参见iview(http://www.iviewui.com/)


更多组件正在开发的路上，敬请期待...