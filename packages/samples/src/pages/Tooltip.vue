<template>
  <div>
    <div class="page-title">Tooltip 文字提示</div>
    <p>文字提示气泡框，在鼠标悬停时显示，代替了系统的title提示。</p>

    <div class="page-sub-title">基础用法</div>
    <p>最简单的用法。</p><br>
    <Tooltip content="这里是提示文字">当鼠标经过这段文字时，会显示一个气泡框</Tooltip>

    <div class="page-sub-title">位置</div>
    <p>组件提供了12个不同的方向显示Tooltip，具体配置可查看API。</p><br>
    <div class="top">
      <Tooltip content="Top Left text" placement="top-start">
        <Button>Top Left</Button>
      </Tooltip>
      <Tooltip content="Top Center text" placement="top">
        <Button>Top Center</Button>
      </Tooltip>
      <Tooltip content="Top Right text" placement="top-end">
        <Button>Top Right</Button>
      </Tooltip>
    </div>
    <div class="center">
      <div class="center-left">
        <Tooltip content="Left Top text" placement="left-start">
          <Button>Left Top</Button>
        </Tooltip>
        <br>
        <br>
        <Tooltip content="Left Center text" placement="left">
          <Button>Left Center</Button>
        </Tooltip>
        <br>
        <br>
        <Tooltip content="Left Bottom text" placement="left-end">
          <Button>Left Bottom</Button>
        </Tooltip>
      </div>
      <div class="center-right">
        <Tooltip content="Right Top text" placement="right-start">
          <Button>Right Top</Button>
        </Tooltip>
        <br>
        <br>
        <Tooltip content="Right Center text" placement="right">
          <Button>Right Center</Button>
        </Tooltip>
        <br>
        <br>
        <Tooltip content="Right Bottom text" placement="right-end">
          <Button>Right Bottom</Button>
        </Tooltip>
      </div>
    </div>
    <div class="bottom">
      <Tooltip content="Bottom Left text" placement="bottom-start">
        <Button>Bottom Left</Button>
      </Tooltip>
      <Tooltip content="Bottom Center text" placement="bottom">
        <Button>Bottom Center</Button>
      </Tooltip>
      <Tooltip content="Bottom Right text" placement="bottom-end">
        <Button>Bottom Right</Button>
      </Tooltip>
    </div>

    <div class="page-sub-title">自定义内容</div>
    <p>通过自定义 slot 显示多行文本或更复杂的样式。</p><br>
    <Tooltip placement="top">
      <Button>多行</Button>
      <div slot="content">
        <p>显示多行信息</p>
        <p>
          <i>可以自定义样式</i>
        </p>
      </div>
    </Tooltip>

    <div class="page-sub-title">禁用</div>
    <p>通过设置属性disabled可以禁用文字提示。</p><br>
    <Tooltip placement="top" content="Can disable text prompts" :disabled="disabled">
      <Button @click="disabled = true">点击关闭提示</Button>
    </Tooltip>

    <div class="page-sub-title">延时</div>
    <p>通过设置属性delay可以延时显示文字提示，单位毫秒。</p><br>
    <Tooltip placement="top" content="Tooltip 文字提示" :delay="1000">
      <Button @click="disabled = true">延时1s显示</Button>
    </Tooltip>

    <div class="page-sub-title">主题</div>
    <p>设置属性 theme 可以显示不同的颜色</p><br>
    <Tooltip content="content of tooltip">
      <Button>Dark(default)</Button>
    </Tooltip>
    <Tooltip content="content of tooltip" theme="light">
      <Button>Light</Button>
    </Tooltip>

    <div class="page-sub-title">自动换行</div>
    <p>设置最大宽度。</p><br>
    <Tooltip max-width="200" content="史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人">
      <Button>Long Content</Button>
    </Tooltip>
  </div>
</template>
<script>
export default {
  data() {
    return {
      disabled: false
    };
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