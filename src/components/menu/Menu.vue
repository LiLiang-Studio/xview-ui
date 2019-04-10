<template>
  <ul class="ui-menu" :class="[mode, theme]" :style="styles">
    <slot></slot>
  </ul>
</template>
<script>
export default {
  name: 'ui-menu',
  data() {
    return {
      openedNames: this.openNames,
      currentActiveName: this.activeName
    }
  },
  props: {
    mode: {
      default: 'vertical',
      validator(value) {
        return ['horizontal', 'vertical'].indexOf(value) !== -1
      }
    },
    theme: {
      default: 'light',
      validator(value) {
        return ['light', 'dark', 'primary'].indexOf(value) !== -1
      }
    },
    activeName: [String, Number],
    openNames: {
      type: Array,
      default: () => []
    },
    accordion: Boolean,
    width: {
      type: String,
      default: '240px'
    }
  },
  computed: {
    styles() {
      return this.mode === 'vertical' ? { width: this.width } : {}
    }
  },
  methods: {
    /**
     * 更新打开的菜单
     */
    updateOpened(names = []) {
      this.openedNames = names
      this.$emit('update:openNames', names)
    },
    /**
     * 更新活动菜单
     */
    updateActiveName(name) {
      this.currentActiveName = name
      this.$emit('update:activeName', name)
    },
    /**
     * 获取活动菜单
     */
    getActiveName() {
      return this.currentActiveName
    },
    /**
     * 子菜单可见状态改变
     */
    onOpenChange(name, isOpen) {
      this.$emit('on-open-change', name, isOpen)
    },
    /**
     * 菜单选择改变
     */
    onSelect(name) {
      this.$emit('on-select', name)
    }
  }
}
</script>
<style lang="less">
// 主菜单容器
.ui-menu {
  list-style: none;
  font-size: 14px;
  position: relative;
  color: @content-color;
  // 水平
  &.horizontal {
    height: 60px;
    line-height: 60px;
    .ui-menu-item {
      float: left;
      padding: 0 20px;
      height: inherit;
      line-height: inherit;
    }
  }
  &.vertical {
    .ui-menu-submenu-title {
      padding: 14px 24px;
      &:hover, &.active {
        background-color: @disabled-bg-color;
      }
    }
  }
  // 高亮主题
  &.light {
    background-color: #fff;
    &.horizontal {
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: @border-color;
      }
      .ui-menu-item {
        border-bottom: 2px solid transparent;
        &:hover, &.active {
          color: @primary-color;
          border-bottom-color: @primary-color;
        }
      }
    }
  }
  // 暗黑主题
  &.dark {
    background-color: @content-color;
    &.horizontal {
      .ui-menu-item {
        color: rgba(255, 255, 255, .7);
        &:hover, &.active {
          color: #fff;
        }
      }
    }
  }
  // 主色主题
  &.primary {
    background-color: @primary-color;
    &.horizontal {
      .ui-menu-item {
        color: #fff;
        &:hover, &.active {
          background-color: darken(@primary-color, 5%);
        }
      }
    }
  }
}
// 菜单项
.ui-menu-item {
  cursor: pointer;
  position: relative;
  z-index: 1;
  transition: all .2s ease-in-out;
  .ui-icon {
    margin-right: 8px;
    &.title-icon {
      margin-right: 0;
      transition: transform .2s ease-in-out;
    }
  }
}
// 菜单项组
.ui-menu-item-group {
  line-height: normal;
}
.ui-menu-item-group-title {
  height: 30px;
  line-height: 30px;
  padding-left: 8px;
  font-size: 12px;
  color: #999;
}
.ui-menu-submenu-list {
  max-height: none;
  .ui-menu-item {
    padding: 7px 16px 8px;
    font-size: 14px;
    &:hover {
      background-color: @disabled-bg-color;
    }
  }
}
</style>