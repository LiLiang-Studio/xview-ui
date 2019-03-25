<template>
  <div class="ui-layout" :class="[{hasSider}]">
    <slot></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hasSider: false
    }
  },
  mounted() {
    this.hasSider = this.$children.some(_ => _.$options.name === 'ui-sider')
  }
}
</script>
<style lang="less">
.ui-layout {
  display: flex;
  flex-direction: column;
  flex: auto;
  background-color: #f5f7f9;
  &.hasSider {
    flex-direction: row;
  }
}

.ui-layout-header, .ui-layout-footer {
  flex: 0 0 auto;
}

.ui-layout-header {
  height: 64px;
  line-height: 64px;
  padding: 0 50px;
  background-color: @content-color;
}

.ui-layout-footer {
  background-color: #f5f7f9;
  padding: 24px 50px;
  color: @content-color;
  font-size: 14px;
}

.ui-layout-content {
  flex: auto;
}

.ui-layout-sider {
  transition: all .2s ease-in-out;
  position: relative;
  background-color: @content-color;
  min-width: 0;
}

.ui-layout-sider-trigger {
  position: fixed;
  bottom: 0;
  text-align: center;
  cursor: pointer;
  height: 48px;
  line-height: 48px;
  color: #fff;
  background-color: #515a6e;
  z-index: 11;
  transition: all .2s ease-in-out;
}

.ui-layout-sider-trigger-icon {
  transition: all .2s;
  &.isCollapsed {
    transform: rotateZ(180deg);
  }
}
</style>