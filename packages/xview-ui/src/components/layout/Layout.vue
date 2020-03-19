<template>
  <div :class="['x-layout', {hasSider}]">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'XLayout',
  data() {
    return { hasSider: false }
  },
  mounted() {
    this.hasSider = this.$children.some(_ => _.$options.name === 'XSider')
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.x-layout {
  display: flex;
  flex: 1;
  font-size: 14px;
  background: #f5f7f9;
  &:not(.hasSider) {
    flex-direction: column;
  }
  &-header, &-sider {
    color: #fff;
    background: @content-color;
  }
  &-header {
    height: 64px;
    padding: 0 50px;
    line-height: 64px;
  }
  &-footer {
    padding: 24px 50px;
    color: @content-color;
    background: @bg-color;
  }
  &-content {
    flex: 1;
  }
  &-sider {
    position: relative;
    transition: all .2s ease-in-out;
    &_trigger {
      position: fixed;
      bottom: 0;
      z-index: 11;
      text-align: center;
      cursor: pointer;
      height: 48px;
      line-height: 48px;
      font-size: 14px;
      color: #fff;
      background: #515a6e;
      transition: all .2s ease-in-out;
    }
    &_triggerIcon {
      transition: all .2s ease-in-out;
      &.isCollapsed {
        transform: rotateZ(180deg);
      }
    }
    &_zeroWidthTrigger {
      position: absolute;
      top: 64px;
      right: -36px;
      width: 36px;
      height: 42px;
      line-height: 42px;
      cursor: pointer;
      text-align: center;
      background-color: @content-color;
      color: #fff;
      font-size: 18px;
      border-radius: 0 6px 6px 0;
      transition: background-color .3s ease;
      &:hover {
        background-color: lighten(@content-color, 3%);
      }
    }
    .x-menu {
      overflow: hidden;
    }
  }
}
</style>