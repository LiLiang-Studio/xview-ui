<template>
  <div>
    <div class="page-title">Switch 开关</div>
    <p>在两种状态间切换时用到的开关选择器。</p>
    <div class="page-sub-title">基本用法，状态切换时会触发事件。</div>
    <ISwitch v-model="switch1" @on-change="change"></ISwitch>

    <div class="page-sub-title">设置size为 large 或 small 使用大号和小号的开关。</div>
    <div class="switchbox">
      <ISwitch size="large"></ISwitch>
      <ISwitch></ISwitch>
      <ISwitch size="small"></ISwitch>
    </div>
    <br><br>

    <div class="page-sub-title">自定义内容，建议如果使用2个汉字，将开关尺寸设置为 large。</div>
    <ISwitch>
        <span slot="open">开</span>
        <span slot="close">关</span>
    </ISwitch>
    <ISwitch style="margin-left:10px;">
        <Icon type="android-done" slot="open"></Icon>
        <Icon type="android-close" slot="close"></Icon>
    </ISwitch>
    <br><br>
    <ISwitch size="large">
        <span slot="open">开启</span>
        <span slot="close">关闭</span>
    </ISwitch>
    <ISwitch size="large" style="margin-left:10px;">
        <span slot="open">ON</span>
        <span slot="close">OFF</span>
    </ISwitch>

    <div class="page-sub-title">禁用开关。</div>
    <ISwitch :disabled="disabled" style="margin-right:10px;"></ISwitch>
    <Button type="primary" @click="disabled = !disabled">Toggle Disabled</Button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      switch1: false,
      disabled: true
    };
  },
  methods: {
    change(status) {
      this.$Message.info("开关状态：" + status);
    }
  }
};
</script>
<style lang="less" scoped>
.switchbox {
  .ui-switch {
    + .ui-switch {
      margin-left: 10px;
    }
  }
}
</style>