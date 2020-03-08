<template>
  <transition :name="prefix">
    <div v-show="visible" :class="prefix" :style="styles" v-winscroll="onScroll()" @click="handleClick">
      <slot>
        <x-Icon :class="`${prefix}_btn`" type="ios-arrow-up"/>
      </slot>
    </div>
  </transition>
</template>
<script>
import XIcon from '../icon'
import { throttle } from '../../tools'
import { winscroll } from '../../directives'
export default {
  name: 'XBackTop',
  components: { XIcon },
  props: {
    height: {
      type: Number,
      default: 400
    },
    bottom: {
      type: [Number, String],
      default: 30
    },
    right: {
      type: [Number, String],
      default: 30
    },
    duration: {
      type: Number,
      default: 300
    }
  },
  data() {
    return { prefix: 'x-backTop', visible: false }
  },
  computed: {
    styles() {
      return { right: `${+this.right}px`, bottom: `${+this.bottom}px` }
    }
  },
  directives: { winscroll },
  methods: {
    handleClick() {
      if (this.timer) return
      let x = window.scrollX, y = window.scrollY, ms = 16
      let step = y / (this.duration / ms)
      this.timer = setInterval(() => {
        if (y > 0) {
          y -= step
        } else {
          clearInterval(this.timer)
          this.timer = null
        }
        window.scrollTo(x, y)
      }, ms)
    },
    onScroll() {
      return throttle(() => this.visible = window.scrollY > this.height, 200)
    }
  }
}
</script>
<style lang="less">
.x-backTop {
  position: fixed;
  user-select: none;
  &-enter, &-leave-to {
    opacity: 0;
    transform: scale(0);
  }
  &, &_btn {
    transition: all .2s ease-in-out;
  }
  &_btn {
    cursor: pointer;
    display: inline-block;
    width: 48px;
    line-height: 40px;
    border-radius: 2px;
    text-align: center;
    color: #fff;
    font-size: 24px;
    background-color: rgba(0, 0, 0, .6);
    box-shadow: 0 1px 3px rgba(0,0,0,.2);
    &:hover {
      background-color: rgba(0, 0, 0, .7);
    }
  }
}
</style>