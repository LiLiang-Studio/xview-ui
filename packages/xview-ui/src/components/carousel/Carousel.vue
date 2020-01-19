<template>
  <div :class="[prefix, arrow]" @mouseenter="stopTimer" @mouseleave="startTimer">
    <div :class="`${prefix}-box`">
      <div :class="`${prefix}-list`" :style="listStyle" @transitionend="onTransitionend">
        <slot></slot>
        <slot></slot>
      </div>
    </div>
    <button :class="`${prefix}-arrow prev`" :disabled="disPrev" @click="toPrev">
      <ui-icon type="chevron-left"/>
    </button>
    <button :class="`${prefix}-arrow next`" :disabled="disNext" @click="toNext">
      <ui-icon type="chevron-right"/>
    </button>
    <ul :class="[`${prefix}-dots`, dots, {radiusDot}]">
      <li v-for="i in count" :key="i" :class="{active: i === curIndex + 1}" 
        @click="toIndex(i, $event)" @mouseover="toIndex(i, $event)"></li>
    </ul>
  </div>
</template>
<script>
import UiIcon from '../icon'
import { parseSize } from '../../tools'
export default {
  name: 'UiCarousel',
  components: { UiIcon },
  data() {
    return {
      prefix: 'ui-carousel',
      curIndex: this.value,
      items: [],
      listStyle: this.getListStyle()
    }
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    height: {
      type: [String, Number],
      default: 'auto'
    },
    loop: Boolean,
    autoplay: Boolean,
    autoplaySpeed: {
      type: Number,
      default: 2000
    },
    dots: {
      default: 'inside',
      validator(value) {
        return ['inside', 'outside', 'none'].indexOf(value) !== -1
      }
    },
    radiusDot: Boolean,
    trigger: {
      default: 'click',
      validator(value) {
        return ['click', 'hover'].indexOf(value) !== -1
      }
    },
    arrow: {
      default: 'hover',
      validator(value) {
        return ['hover', 'always', 'never'].indexOf(value) !== -1
      }
    },
    easing: {
      type: String,
      default: 'ease'
    }
  },
  computed: {
    count() {
      return this.items.length / 2
    },
    disPrev() {
      return !this.loop && this.curIndex === 0
    },
    disNext() {
      return !this.loop && this.curIndex === this.count - 1
    }
  },
  watch: {
    value(newval) {
      this.curIndex = newval
    },
    curIndex(newval) {
      this.$emit('input', newval)
    },
    autoplay() {
      this.startTimer()
    },
    autoplaySpeed() {
      this.startTimer()
    }
  },
  mounted() {
    this.startTimer()
  },
  methods: {
    addItem(vm) {
      this.items.push(vm)
    },
    removeItem(vm) {
      this.items.splice(this.items.indexOf(vm), 1)
    },
    getListStyle(animated) {
      const style = {
        height: parseSize(this.height),
        transform: `translateX(-${this.curIndex * 100}%)`
      }
      return animated ? { ...style, transition: `transform .5s ${this.easing}` } : style
    },
    toPrev() {
      if (--this.curIndex < 0) {
        this.curIndex = this.count
        this.listStyle = this.getListStyle()
        this.curIndex--
      }
      this.$nextTick(() => this.listStyle = this.getListStyle(true))
    },
    toNext() {
      if (this.isTail) return
      this.curIndex++
      this.listStyle = this.getListStyle(true)
      if (this.curIndex > this.count - 1) {
        this.curIndex = 0
        this.isTail = true
      }
    },
    toIndex(i, e) {
      if ((this.trigger === 'click' && e.type === 'click') || (this.trigger === 'hover' && e.type === 'mouseover')) {
        this.curIndex = i - 1
        this.listStyle = this.getListStyle(true)
      }
    },
    onTransitionend() {
      this.isTail = false
      this.listStyle = this.getListStyle()
    },
    startTimer() {
      this.stopTimer()
      if (this.autoplay) this.timerId = setInterval(() => this.toNext(), this.autoplaySpeed)
    },
    stopTimer() {
      clearInterval(this.timerId)
    }
  }
}
</script>
<style lang="less">
.ui-carousel {
  user-select: none;
  position: relative;
  &-arrow {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    font-size: 12px;
    border: none;
    outline: none;
    color: #fff;
    background-color: rgba(31,45,61,.11);
    transition: all .2s ease-in-out;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    &.prev {
      left: 16px;
    }
    &.next {
      right: 16px;
    }
    &:not(:disabled):hover {
      cursor: pointer;
      background-color: rgba(31,45,61,.5);
    }
  }
  &.hover:not(:hover) &-arrow {
    opacity: 0;
  }
  &.never &-arrow {
    display: none;
  }
  &-dots {
    width: 100%;
    list-style: none;
    text-align: center;
    &.none {
      display: none;
    }
    &.inside {
      position: absolute;
      bottom: 3px;
      z-index: 2;
    }
    &.outside {
      margin-top: 3px;
    }
    li {
      width: 16px;
      cursor: pointer;
      display: inline-block;
      vertical-align: middle;
      height: 3px;
      margin: 0 2px;
      background-color: #8391a5;
      opacity: .3;
      transition: all .5s ease-in-out;
      &:hover {
        opacity: .7;
      }
      &.active {
        opacity: 1;
        width: 24px;
      }
    }
    &.radiusDot li {
      width: 6px;
      height: 6px;
      border-radius: 50%;
    }
  }
  &-box {
    overflow: hidden;
  }
  &-list {
    display: flex;
    align-items: flex-start;
  }
  &-item {
    width: 100%;
    min-width: 100%;
  }
}
</style>