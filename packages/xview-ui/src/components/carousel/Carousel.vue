<template>
  <div :class="[prefix, arrow]" @mouseenter="stopTimer" @mouseleave="startTimer">
    <div :class="`${prefix}_box`">
      <div :class="`${prefix}_list`" :style="listStyle" @transitionend="onTransitionend">
        <slot></slot>
        <slot></slot>
      </div>
    </div>
    <button :class="`${prefix}_arrow prev`" :disabled="disPrev" @click="toPrev">
      <x-icon type="chevron-left"/>
    </button>
    <button :class="`${prefix}_arrow next`" :disabled="disNext" @click="toNext">
      <x-icon type="chevron-right"/>
    </button>
    <ul :class="[`${prefix}_dots`, dots, {radiusDot}]">
      <li v-for="i in count" :key="i" :class="{active: i === curIndex + 1}" 
        @click="toIndex(i, $event)" @mouseover="toIndex(i, $event)"></li>
    </ul>
  </div>
</template>
<script>
import XIcon from '../icon'
import { parseSize } from '../../tools'
const S = String, B = Boolean, N = Number
export default {
  name: 'XCarousel',
  components: { XIcon },
  props: {
    value: { type: N, default: 0 },
    height: { type: [S, N], default: 'auto' },
    loop: B,
    autoplay: B,
    autoplaySpeed: { type: N, default: 2000 },
    dots: {
      default: 'inside',
      validator(v) {
        return ['inside', 'outside', 'none'].indexOf(v) !== -1
      }
    },
    radiusDot: B,
    trigger: {
      default: 'click',
      validator(v) {
        return ['click', 'hover'].indexOf(v) !== -1
      }
    },
    arrow: {
      default: 'hover',
      validator(v) {
        return ['hover', 'always', 'never'].indexOf(v) !== -1
      }
    },
    easing: { type: S, default: 'ease' }
  },
  data() {
    return { prefix: 'x-carousel', curIndex: this.value, items: [], listStyle: this.getListStyle() }
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
    value(val) {
      this.curIndex = val
    },
    curIndex(newval, oldval) {
      this.$emit('input', newval)
      this.$emit('on-change', oldval, newval)
    }
  },
  mounted() {
    this.unwatch = this.$watch(
      () => `${this.autoplay} ${this.autoplaySpeed}`, 
      this.startTimer, 
      { immediate: true }
    )
  },
  beforeDestroy() {
    this.unwatch()
  },
  methods: {
    addItem(vm) { // 添加项 项被挂载时
      this.items.push(vm)
    },
    removeItem(vm) { // 移除项 项被注销时
      this.items.splice(this.items.indexOf(vm), 1)
    },
    itemClick(vm) { // 项单击 发射索引值
      this.$emit('on-click', this.items.indexOf(vm))
    },
    getListStyle(hasAnimate) { // 获取列表样式
      let style = {
        height: parseSize(this.height),
        transform: `translateX(-${this.curIndex * 100}%)`
      }
      return hasAnimate ? { ...style, transition: `transform .5s ${this.easing}` } : style
    },
    setListStyle(hasAnimate) { // 设置列表样式
      this.listStyle = this.getListStyle(hasAnimate)
    },
    toPrev() { // 切换到前一个
      if (--this.curIndex < 0) {
        this.curIndex = this.count
        this.setListStyle()
        return setTimeout(() => {
          this.curIndex--
          this.setListStyle(true)
        }, 0)
      }
      this.setListStyle(true)
    },
    toNext() { // 切换到下一个
      if (this.returning) return
      this.curIndex++
      this.setListStyle(true)
      if (this.curIndex > this.count - 1) {
        this.curIndex = 0
        this.returning = true
      }
    },
    toIndex(i, e) { // 切换到指定索引
      if (
        (this.trigger === 'click' && e.type === 'click') ||
        (this.trigger === 'hover' && e.type === 'mouseover')
      ) {
        this.curIndex = i - 1
        this.setListStyle(true)
      }
    },
    onTransitionend() { // 过渡结束
      this.returning = false
      this.setListStyle()
    },
    startTimer() { // 开始定时器
      this.stopTimer()
      if (this.autoplay) this.tid = setInterval(() => this.toNext(), this.autoplaySpeed)
    },
    stopTimer() { // 停止定时器
      clearInterval(this.tid)
    }
  }
}
</script>
<style lang="less">
.x-carousel {
  user-select: none;
  position: relative;
  &_arrow {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: none;
    outline: none;
    color: #fff;
    position: absolute;
    top: 50%;
    z-index: 1;
    transform: translateY(-50%);
    transition: all .2s ease-in-out;
    background: rgba(31, 45, 61, .11);
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
  &.hover:not(:hover) &_arrow {
    opacity: 0;
  }
  &.never &_arrow {
    display: none;
  }
  &_dots {
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
      background: #8391a5;
      opacity: .3;
      transition: all .3s ease-in-out;
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
  &_box {
    overflow: hidden;
  }
  &_list {
    display: flex;
  }
  &-item {
    width: 100%;
    min-width: 100%;
  }
}
</style>