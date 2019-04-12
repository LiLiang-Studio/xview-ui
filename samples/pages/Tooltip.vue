<template>
  <div>
    <div class="page-title">Tooltip 文字提示</div>
    <p>文字提示气泡框，在鼠标悬停时显示，代替了系统的title提示。</p>

    <div class="page-sub-title">
      注意 Tooltip 内的文本使用了 white-space: nowrap;
      即不自动换行，如需展示很多内容并自动换行时，建议给内容 slot 增加样式 white-space: normal;。
    </div>
    <Tooltip
      content="Here is the prompt text"
    >A balloon appears when the mouse passes over this text</Tooltip>

    <div class="page-sub-title">组件提供了12个不同的方向显示Tooltip，具体配置可查看API。</div>
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

    <div class="page-sub-title">通过自定义 slot 显示多行文本或更复杂的样式。</div>
    <Tooltip placement="top">
      <Button>Multiple lines</Button>
      <div slot="content">
        <p>Display multiple lines of information</p>
        <p>
          <i>Can customize the style</i>
        </p>
      </div>
    </Tooltip>

    <div class="page-sub-title">通过设置属性disabled可以禁用文字提示。</div>
    <Tooltip placement="top" content="Can disable text prompts" :disabled="disabled">
      <Button @click="disabled = true">Click to close</Button>
    </Tooltip>

    <div class="page-sub-title">通过设置属性delay可以延时显示文字提示，单位毫秒。</div>
    <Tooltip placement="top" content="Tooltip text" :delay="1000">
      <Button @click="disabled = true">Delay 1 second to show</Button>
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