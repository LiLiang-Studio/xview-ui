<template>
  <div :class="prefix" :style="styles" v-winresize="onWinResize()">
    <slot></slot>
    <span v-if="zeroTrigger.visible" :class="`${prefix}_zeroWidthTrigger`" @click="toggleCollapseByZeroTrigger">
      <x-icon type="navicon"/>
    </span>
    <div v-else-if="showTrigger" :class="`${prefix}_trigger`" :style="{width: styles.width}" @click="toggleCollapse">
      <x-icon :class="[`${prefix}_triggerIcon`, {isCollapsed}]" :type="triggerIcon"/>
    </div>
  </div>
</template>
<script>
import XIcon from '../icon'
import { parseSize, throttle } from '../../tools'
import { winresize } from '../../directives'
const B = Boolean, NS = [Number, String]
export default {
  name: 'XSider',
  components: { XIcon },
  props: {
    value: B,
    width: { type: NS, default: 200 },
    collapsible: B,
    collapsedWidth: { type: NS, default: 64 },
    hideTrigger: B,
    defaultCollapsed: B,
    reverseArrow: B,
    breakpoint: {
      validator(v) {
        return ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(v) > -1
      }
    }
  },
  data() {
    return {
      prefix: 'x-layout-sider',
      isCollapsed: this.value || this.defaultCollapsed,
      zeroTrigger: { visible: false, clicked: false }
    }
  },
  computed: {
    styles() {
      let size = parseSize(this.isCollapsed ? this.zeroTrigger.visible ? 0 : this.collapsedWidth : this.width)
      return { width: size, minWidth: size, maxWidth: size, flex: `0 0 ${size}` }
    },
    showTrigger() {
      return !this.hideTrigger && this.collapsible
    },
    triggerIcon() {
      return `ios-arrow-${this.reverseArrow ? 'forward' : 'back'}`
    }
  },
  directives: { winresize },
  watch: {
    value(val) {
      this.isCollapsed = val
    },
    isCollapsed(val) {
      this.$emit('input', val)
      this.$emit('on-collapse', val)
    }
  },
  mounted() {
    this.onWinResize()()
  },
  methods: {
    toggleCollapse() {
      if (this.collapsible) this.isCollapsed = !this.isCollapsed
    },
    toggleCollapseByZeroTrigger() {
      this.toggleCollapse()
      this.zeroTrigger.clicked = true
    },
    setResponsive(num) {
      let winWidth = window.innerWidth
      if (this.zeroTrigger.clicked) {
        if (winWidth > num) this.zeroTrigger = { visible: false, click: false }
      } else {
        this.isCollapsed = window.innerWidth < num
        this.zeroTrigger.visible = this.isCollapsed
      }
    },
    onWinResize() {
      return throttle(() => {
        this.breakpoint && this.collapsible && this.setResponsive(
          { xs: 480, sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1600 }[this.breakpoint]
        )
      }, 50)
    }
  }
}
</script>