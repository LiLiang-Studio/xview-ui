<template>
  <div class="ui-layout" :class="{hasSider}">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'UiLayout',
  data() {
    return { hasSider: false }
  },
  mounted() {
    this.hasSider = this.$children.some(_ => _.$options.name === 'UiSider')
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.ui-layout {
  display: flex;
  flex-direction: column;
  flex: auto;
  background-color: #f5f7f9;
  &.hasSider {
    flex-direction: row;
  }
  &-header, &-footer {
    flex: 0 0 auto;
  }
  &-header, &-sider {
    background-color: @content-color;
  }
  &-header {
    height: 64px;
    padding: 0 50px;
  }
  &-footer {
    padding: 24px 50px;
    color: @content-color;
    font-size: 14px;
  }
  &-content {
    flex: auto;
  }
  &-sider {
    position: relative;
    transition: all .2s ease-in-out;
  }
  &-sider-trigger {
    position: fixed;
    bottom: 0;
    z-index: 11;
    text-align: center;
    cursor: pointer;
    height: 48px;
    line-height: 48px;
    font-size: 14px;
    color: #fff;
    background-color: #515a6e;
    transition: all .2s ease-in-out;
  }
  &-sider-trigger-icon {
    transition: all .2s ease-in-out;
    &.isCollapsed {
      transform: rotateZ(180deg);
    }
  }
}
</style>