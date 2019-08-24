<template>
  <transition :name="prefix">
    <div v-show="visible" :class="prefix" :style="styles" @click="handleClick">
      <slot>
        <UiIcon :class="`${prefix}--icon`" type="ios-arrow-up"/>
      </slot>
    </div>
  </transition>
</template>
<script>
import UiIcon from '../icon'
import { throttle } from '@/tools'
export default {
  name: 'UiBackTop',
  components: { UiIcon },
  data() {
    return { prefix: 'ui-backTop', visible: false }
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
      return { right: `${+this.right}px`, bottom: `${+this.bottom}px` }
    }
  },
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
      this.visible = window.scrollY > this.height
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  }
}
</script>
<style lang="less">
.ui-backTop {
  position: fixed;
  user-select: none;
  &-enter, &-leave-to {
    opacity: 0;
    transform: scale(0);
  }
  &, &--icon {
    transition: all .2s ease-in-out;
  }
  &--icon {
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
    &:hover {
      background-color: rgba(0, 0, 0, .7);
    }
  }
}
</style>