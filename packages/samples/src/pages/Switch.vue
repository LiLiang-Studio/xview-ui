<template>
  <div style="padding-bottom:100px;">
    <div class="page-title">Switch 开关</div>
    <p>在两种状态间切换时用到的开关选择器。</p>

    <div class="page-sub-title">基本用法</div>
    <p>状态切换时会触发事件。</p><br>
    <ISwitch v-model="switch1" @on-change="change"></ISwitch>
    <ISwitch v-model="switch2" true-value="1" false-value="0" @on-change="change"></ISwitch>

    <div class="page-sub-title">尺寸</div>
    <p>设置size为 large 或 small 使用大号和小号的开关。</p><br>
    <div class="switchbox">
      <ISwitch size="large"></ISwitch>
      <ISwitch></ISwitch>
      <ISwitch size="small"></ISwitch>
    </div>
    <br><br>

    <div class="page-sub-title">文字和图标</div>
    <p>自定义内容，建议如果使用2个汉字，将开关尺寸设置为 large。</p><br>
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

    <div class="page-sub-title">不可用</div>
    <p>禁用开关。</p><br>
    <ISwitch :disabled="disabled" style="margin-right:10px;"></ISwitch>
    <Button type="primary" @click="disabled = !disabled">Toggle Disabled</Button>

    <div class="page-sub-title">加载中</div>
    <p>标识开关操作仍在执行中。</p><br>
    <ISwitch loading :value="true" />
    <ISwitch loading :value="false" size="small" />

    <div class="page-sub-title">自定义颜色</div>
    <p>设置属性 true-color 和 false-color 可以自定义背景色。</p><br>
    <ISwitch true-color="#13ce66" false-color="#ff4949" />

    <div class="page-sub-title">阻止切换</div>
    <p>设置属性 before-change 并返回 Promise，可以阻止切换。</p><br>
    <ISwitch :before-change="handleBeforeChange" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      switch1: true,
      disabled: true,
      switch2: '0'
    };
  },
  methods: {
    change(status) {
      this.$Message.info("开关状态：" + status);
    },
    handleBeforeChange () {
      return new Promise((resolve) => {
        this.$Modal.confirm({
          title: '切换确认',
          content: '您确认要切换开关状态吗？',
          onOk: () => {
            resolve()
          }
        })
      })
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