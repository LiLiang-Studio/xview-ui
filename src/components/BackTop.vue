<template>
  <transition name="fade">
    <div v-if="visible" class="ui-back-top" :style="styles" @click="handleClick">
      <slot>
        <UiIcon class="ui-back-top-icon" type="ios-arrow-up"/>
      </slot>
    </div>
  </transition>
</template>
<script>
import UiIcon from './Icon'
import { throttle } from '../utils'
export default {
  components: { UiIcon },
  data() {
    return {
      visible: false
    }
  },
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
  computed: {
    styles() {
      return {
        right: `${parseInt(this.right)}px`,
        bottom: `${parseInt(this.bottom)}px`
      }
    }
  },
  methods: {
    handleClick(event) {
      if (this.timer) return
      let x = window.scrollX
      let y = window.scrollY
      let ms = 16
      let moveCount = this.duration / ms
      let step = y / moveCount
      let dis = y
      this.timer = setInterval(() => {
        if (dis > 0) {
          dis -= step
        } else {
          dis = 0
          clearInterval(this.timer)
          this.timer = null
        }
        window.scrollTo(x, dis)
      }, ms)
    }
  },
  mounted() {
    this.handleWinScroll = throttle(() => this.visible = window.scrollY > this.height, 50)
    window.addEventListener('scroll', this.handleWinScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleWinScroll)
  }
}
</script>
<style lang="less">
.ui-back-top {
  position: fixed;
  user-select: none;
  .ui-back-top-icon {
    cursor: pointer;
    width: 48px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 2px;
    color: #fff;
    font-size: 24px;
    background-color: rgba(0, 0, 0, .6);
    box-shadow: 0 1px 3px rgba(0,0,0,.2);
    transition: all .2s ease-in-out;
    &:hover {
      background-color: rgba(0, 0, 0, .7);
    }
  }
}
</style>