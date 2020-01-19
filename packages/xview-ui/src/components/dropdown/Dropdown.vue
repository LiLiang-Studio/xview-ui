<template>
  <div class="ui-dropdown" v-winclick="handleWinClick">
    <div class="ui-dropdown-rel" 
      @mouseenter="handleMouseenter" @mouseleave="handleMouseleave" @click="handleClick">
      <slot></slot>
    </div>
    <ui-option-list ref="Drop" :parentName="$options.name" :visible="isVisible" 
      @mouseenter.native="handleDropMouseenter"  @mouseleave.native="handleDropMouseleave">
      <slot name="list"></slot>
    </ui-option-list>
  </div>
</template>
<script>
import { isSelfOrParent } from '../../utils/index'
import UiOptionList from './../select/OptionList.vue'
export default {
  name: 'ui-dropdown',
  components: { UiOptionList },
  data() {
    return { isVisible: false, timeout: null }
  },
  props: {
    trigger: {
      default: 'hover',
      validator(value) {
        return ['hover', 'click', 'custom'].indexOf(value) !== -1
      }
    },
    visible: Boolean,
    placement: {
      default: 'bottom',
      validator(value) {
        return [
          'top', 'top-start', 'top-end', 
          'right', 'right-start', 'right-end', 
          'bottom', 'bottom-start', 'bottom-end', 
          'left', 'left-start', 'left-end'
        ].indexOf(value) !== -1
      }
    }
  },
  watch: {
    visible(newVal) {
      if (this.trigger === 'custom') this.isVisible = newVal
    },
    isVisible(newVal) {
      this.$emit('on-visible-change', newVal)
    }
  },
  methods: {
    handleMouseenter() {
      if (this.trigger === 'hover') this.isVisible = true
    },
    handleMouseleave(event) {
      if (this.trigger === 'hover') this.timeout = setTimeout(this.close, 150)
    },
    handleClick() {
      if (this.trigger === 'click') this.isVisible = true
    },
    close() {
      this.isVisible = false
    },
    itemClick(name) {
      this.close()
      this.$emit('on-click', name)
    },
    handleDropMouseenter(event) {
      clearTimeout(this.timeout)
    },
    handleDropMouseleave(event) {
      if (this.trigger === 'hover') this.isVisible = false
    },
    /**
     * 窗口单击事件处理
     * @param {MouseEvent} event
     * 模拟方式不是单击 或者下拉菜单不可见 --> 退出
     * 如果不是挂载元素 也不是该下拉菜单 --> 退出
     */
    handleWinClick(event) {
      if (this.trigger !== 'click' || !this.isVisible) return
      if (isSelfOrParent(this.$el, event.target) || 
        isSelfOrParent(this.$refs.Drop, event.target)) return
      this.isVisible = false
      this.$emit('on-clickoutside', event)
    }
  }
}
</script>
<style lang="less">
.ui-dropdown {
  display: inline-block;
}

.ui-dropdown-menu {
  min-width: 100px;
  .ui-dropdown {
    width: 100%;
  }
}
</style>