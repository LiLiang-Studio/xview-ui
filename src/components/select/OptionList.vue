<template>
  <transition name="ui-dropdown">
    <div class="ui-select-dropdown" v-resize="updatePosition" v-show="visible" :class="{multiple}" :style="styles">
      <div class="ui-select-empty">
        <slot name="empty"></slot>
      </div>
      <slot></slot>
    </div>
  </transition>
</template>
<script>
import { setMaxZIndex, findParentByName, getOffset } from './../../utils'
export default {
  data() {
    return { styles: {}, parent: null }
  },
  props: { visible: Boolean, parentName: String },
  computed: {
    multiple() {
      return this.parent && this.parent.multiple
    }
  },
  watch: {
    /**
     * 可见时，更新层索引和位置信息
     */
    visible(newVal) {
      if (!newVal) return
      this.styles = { zIndex: setMaxZIndex(), ...this.getPosition() }
    }
  },
  methods: {
    /**
     * 获取位置信息
     */
    getPosition() {
      if (!this.parent) return {}
      let offset = getOffset(this.parent.$el)
      return { minWidth: `${offset.width}px`, top: `${offset.top + offset.height}px`, left: `${offset.left}px` }
    },
    /**
     * 更新位置，仅可见时更新
     */
    updatePosition() {
      if (this.visible) {
        this.styles = { ...this.styles, ...this.getPosition() }
      }
    }
  },
  /**
   * 挂载完成后，将挂载元素插入文档主体尾部
   */
  mounted() {
    document.body.appendChild(this.$el)
    this.parent = findParentByName(this, this.parentName || 'ui-select')
  },
  /**
   * 注销之前，移除挂载元素
   */
  beforeDestroy() {
    this.$el.parentNode && this.$el.parentNode.removeChild(this.$el)
  }
}
</script>
<style lang="less">
.ui-select-dropdown {
  max-height: 200px;
  overflow: auto;
  margin: 5px 0;
  padding: 5px 0;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 6px rgba(0,0,0,.2);
  position: absolute;
}

.ui-select-empty {
  text-align: center;
  font-size: 14px;
  color: @disabled-color;
}
</style>