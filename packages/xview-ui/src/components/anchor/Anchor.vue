<template>
  <div :is="tag" :class="prefix" :offsetTop="offsetTop" :offsetBottom="offsetBottom">
    <div :class="`${prefix}-ink`" v-winscroll="onScroll()">
      <span v-if="showInk" ref="Ball" :class="`${prefix}-ball`" :style="ballStyle"></span>
    </div>
    <slot></slot>
  </div>
</template>
<script>
import UiAffix from '../affix'
import { throttle } from '../../tools'
import { winscroll } from '../../directives'
export default {
  name: 'UiAnchor',
  components: { UiAffix },
  data() {
    return {
      prefix: 'ui-anchor',
      items: [],
      activeItem: null,
      ballStyle: {}
    }
  },
  props: {
    affix: {
      type: Boolean,
      default: true
    },
    offsetTop: {
      type: Number,
      default: 0
    },
    offsetBottom: Number,
    scrollOffset: {
      type: Number,
      default: 0
    },
    showInk: Boolean
  },
  computed: {
    tag() {
      return this.affix ? UiAffix : 'div'
    }
  },
  directives: { winscroll },
  watch: {
    activeItem(newval) {
      if (!this.showInk || !newval) return
      this.$nextTick(() => {
        let bh = this.$refs.Ball.offsetHeight
        let { offsetHeight: oh, offsetTop: ot } = newval.$el
        this.ballStyle = { top: `${ot + (oh - bh) / 2}px` }
      })
    }
  },
  methods: {
    addItem(vm) {
      this.items.push(vm)
    },
    removeItem(vm) {
      this.items.splice(this.items.indexOf(vm), 1)
    },
    onScroll() {
      return throttle(() => {
        this.activeItem = null
        this.items.forEach(_ => {
          const el = document.querySelector(_.href)
          if (!el) return
          let rect = el.getBoundingClientRect()
          let scrollOffset = _.scrollOffset || this.scrollOffset
          if (rect.top <= scrollOffset && rect.bottom > 0) {
            this.activeItem = _
          }
        })
      }, 50)
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.ui-anchor {
  position: relative;
  &-ink {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 2px;
    background-color: @divider-color;
  }
  &-ball {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: 2px solid @primary-color;
    transition: top .2s ease-in-out;
  }
}
</style>