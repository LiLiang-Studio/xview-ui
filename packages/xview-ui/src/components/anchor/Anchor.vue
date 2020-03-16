<template>
  <div v-bind="bindProps">
    <div :class="`${prefix}_ink`" v-winscroll="onScroll()">
      <span v-if="showInk" ref="Ball" :class="`${prefix}_ball`" :style="ballStyle"></span>
    </div>
    <slot></slot>
  </div>
</template>
<script>
import XAffix from '../affix'
import { throttle } from '../../tools'
import { winscroll } from '../../directives'
const N = Number, B = Boolean, numProp = { type: N, default: 0 }
export default {
  name: 'XAnchor',
  props: {
    affix: { type: B, default: true },
    offsetTop: numProp,
    offsetBottom: N,
    scrollOffset: numProp,
    showInk: B
  },
  data() {
    return { prefix: 'x-anchor', ballStyle: {}, items: [], href: '' }
  },
  computed: {
    bindProps() {
      return {
        class: this.prefix,
        offsetTop: this.offsetTop,
        offsetBottom: this.offsetBottom,
        ...(this.affix ? { is: XAffix } : {})
      }
    }
  },
  directives: { winscroll },
  watch: {
    href(newval, oldval) {
      this.$emit('on-change', [newval, oldval])
    }
  },
  mounted() {
    this.update()
  },
  methods: {
    update() {
      this.items.forEach(_ => {
        _.active = false
        const el = document.querySelector(_.href)
        if (el) {
          let rect = el.getBoundingClientRect()
          let scrollOffset = _.scrollOffset || this.scrollOffset
          if (rect.top <= scrollOffset && rect.bottom > 0) {
            _.active = true
            this.href = _.href
            if (this.showInk) {
              this.$nextTick(() => {
                let ballHeight = this.$refs.Ball.offsetHeight
                this.ballStyle = { top: `${_.$el.offsetTop + (_.$el.offsetHeight - ballHeight) / 2}px` }
              })
            }
          }
        }
      })
    },
    onScroll() {
      return throttle(this.update, 50)
    },
    addItem(vm) {
      this.items.push(vm)
    },
    removeItem(vm) {
      this.items.splice(this.items.indexOf(vm), 1)
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.x-anchor {
  position: relative;
  &_ink {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 2px;
    background-color: @divider-color;
  }
  &_ball {
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