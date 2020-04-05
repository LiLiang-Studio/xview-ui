<template>
  <div>
    <div class="page-title">Poptip 气泡提示</div>
    <p>
      Poptip 与 Tooltip 类似，具有很多相同配置，不同点是 Poptip 以卡片的形式承载了更多的内容，比如链接、表格、按钮等。
      <br>Poptip 还 confirm 确认框，与 Modal 不同的是，它会出现在就近元素，相对轻量。
    </p>

    <div class="page-sub-title">基础用法</div>
    <p>支持三种触发方式：鼠标悬停、点击、聚焦。默认是点击。</p><br>
    <Poptip trigger="hover" title="Title" content="content">
      <Button>Hover</Button>
    </Poptip>
    <Poptip transfer title="Title" content="content" @on-popper-show="show(true)" @on-popper-hide="show(false)">
      <Button>Click</Button>
    </Poptip>
    <Poptip trigger="focus" title="Title" content="content">
      <Button>Focus</Button>
    </Poptip>
    <Poptip trigger="focus" title="Title" content="content">
      <Input placeholder="Input focus"/>
    </Poptip>

    <div class="page-sub-title">位置</div>
    <p>组件提供了12个不同的方向显示Poptip，具体配置可查看API。</p><br>
    <div class="top">
      <Poptip title="Title" content="content" placement="top-start">
        <Button>Top Left</Button>
      </Poptip>
      <Poptip title="Title" content="content" placement="top">
        <Button>Top Center</Button>
      </Poptip>
      <Poptip title="Title" content="content" placement="top-end">
        <Button>Top Right</Button>
      </Poptip>
    </div>
    <div class="center">
      <div class="center-left">
        <Poptip title="Title" content="content" placement="left-start">
          <Button>Left Top</Button>
        </Poptip>
        <br>
        <br>
        <Poptip title="Title" content="content" placement="left">
          <Button>Left Center</Button>
        </Poptip>
        <br>
        <br>
        <Poptip title="Title" content="content" placement="left-end">
          <Button>Left Right</Button>
        </Poptip>
      </div>
      <div class="center-right">
        <Poptip title="Title" content="content" placement="right-start">
          <Button>Right Top</Button>
        </Poptip>
        <br>
        <br>
        <Poptip title="Title" content="content" placement="right">
          <Button>Right Center</Button>
        </Poptip>
        <br>
        <br>
        <Poptip title="Title" content="content" placement="right-end">
          <Button>Right Bottom</Button>
        </Poptip>
      </div>
    </div>
    <div class="bottom">
      <Poptip title="Title" content="content" placement="bottom-start">
        <Button>Bottom Left</Button>
      </Poptip>
      <Poptip title="Title" content="content" placement="bottom">
        <Button>Bottom Center</Button>
      </Poptip>
      <Poptip title="Title" content="content" placement="bottom-end">
        <Button>Bottom Right</Button>
      </Poptip>
    </div>

    <div class="page-sub-title">从浮层内关闭</div>
    <p>通过v-model来控制提示框的显示和隐藏。</p><br>
    <Poptip v-model="visible">
      <a>click激活</a>
      <div slot="title">
        <i>自定义标题</i>
      </div>
      <div slot="content">
        <a @click="close">关闭提示框</a>
      </div>
    </Poptip>

    <div class="page-sub-title">嵌套复杂内容</div>
    <p>通过自定义 slot 来实现复杂的内容。</p><br>
    <Poptip placement="right" width="400">
      <Button>Click</Button>
      <div class="api" slot="content">
        <table>
          <thead>
            <tr>
              <th>Version</th>
              <th>Update Time</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0.9.5</td>
              <td>2016-10-26</td>
              <td>
                Add new components
                <code>Tooltip</code> and
                <code>Poptip</code>
              </td>
            </tr>
            <tr>
              <td>0.9.4</td>
              <td>2016-10-25</td>
              <td>
                Add new components
                <code>Modal</code>
              </td>
            </tr>
            <tr>
              <td>0.9.2</td>
              <td>2016-09-28</td>
              <td>
                Add new components
                <code>Select</code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Poptip>

    <div class="page-sub-title">宽度</div>
    <p>设置最大宽度</p><br>
    <Poptip width="200" content="史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。">
        <Button>长文本</Button>
    </Poptip>

    <div class="page-sub-title">确认框</div>
    <p>
      通过设置属性confirm开启确认框模式。
      确认框只会以 click 的形式激活，并且只会显示 title 的内容，忽略 content。</p><br>
    <Poptip
      confirm
      title="您确认删除这条内容吗？"
      @on-ok="ok"
      @on-cancel="cancel"
    >
      <Button>删除</Button>
    </Poptip>
    <Poptip
      confirm
      title="Are you sure delete this task?"
      @on-ok="ok"
      @on-cancel="cancel"
      ok-text="yes"
      cancel-text="no"
    >
      <Button>国际化</Button>
    </Poptip>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false
    };
  },
  methods: {
    close() {
      this.visible = false;
    },
    ok() {
      this.$Message.info("You click ok");
    },
    cancel() {
      this.$Message.info("You click cancel");
    },
    show(visible) {
      this.$Message(visible ? '显示' : '隐藏')
    }
  }
};
</script>
<style lang="less" scoped>
.top,
.bottom {
  text-align: center;
}
.center {
  width: 300px;
  margin: 10px auto;
  overflow: hidden;
}
.center-left {
  float: left;
}
.center-right {
  float: right;
}
</style>