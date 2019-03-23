<template>
  <div class="ui-swiper" :class="arrow" @mouseenter="stopTimer" @mouseleave="startTimer">
    <button class="ui-swiper-arrow prev" :disabled="disabledPrev" @click="toPrev">
      <UiIcon type="chevron-left"/>
    </button>
    <div class="ui-swiper-list">
      <div :style="trackStyle" v-resize="handleWinResize">
        <slot></slot>
      </div>
    </div>
    <button class="ui-swiper-arrow next" :disabled="disabledNext" @click="toNext">
      <UiIcon type="chevron-right"/>
    </button>
    <ul class="ui-swiper-dots" :class="[dots, {circle: radiusDot}]">
      <li v-for="i in children.length" 
        :key="i" :class="{active: curIndex === i - 1}"
        @click="handleDotEvent(i - 1, $event)"
        @mouseover="handleDotEvent(i - 1, $event)"></li>
    </ul>
  </div>
</template>
<script>
import UiIcon from './../Icon'
export default {
  name: 'ui-swiper',
  components: { UiIcon },
  data() {
    return {
      children: [],
      trackStyle: {
        transition: `transform .5s ${this.easing}`,
        height: this.height === 'auto' ? 'auto' : `${parseInt(this.height)}px`
      },
      curIndex: this.value
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
        return ['inside', 'outside','none'].indexOf(value) !== -1
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
    disabledPrev() {
      return !this.loop && this.curIndex === 0
    },
    disabledNext() {
      return !this.loop && this.curIndex === this.children.length - 1
    }
  },
  watch: {
    value(newVal) {
      this.curIndex = newVal
    },
    curIndex(newVal, oldVal) {
      this.handleIndexChange(newVal, oldVal)
    },
    autoplay(newVal) {
      if (newVal) {
        this.startTimer()
      } else {
        this.stopTimer()
      }
    }
  },
  methods: {
    addChild(vm) {
      this.children.push(vm)
    },
    getWidth() {
      return this.$el ? this.$el.offsetWidth : 0
    },
    toPrev() {
      if (this.curIndex === 0) {
        if (this.loop) {
          this.curIndex = this.children.length - 1
        }
      } else {
        this.curIndex--
      }
      this.$emit('input', this.curIndex)
    },
    toNext() {
      if (this.curIndex === this.children.length - 1) {
        if (this.loop) {
          this.curIndex = 0
        }
      } else {
        this.curIndex++
      }
      this.$emit('input', this.curIndex)
    },
    handleIndexChange(newVal, oldVal) {
      this.$emit('on-change', oldVal, newVal)
      this.trackStyle = {
        ...this.trackStyle,
        transform: `translateX(${-newVal * this.$el.offsetWidth}px)`
      }
    },
    handleDotEvent(index, event) {
      if (
        (this.trigger === 'click' && event.type === 'click') ||
        (this.trigger === 'hover' && event.type === 'mouseover')
      ) {
        this.curIndex = index
        this.$emit('input', index)
      }
    },
    startTimer() {
      if (this.autoplay) {
        this.tid = setInterval(this.toNext, this.autoplaySpeed)
      }
    },
    stopTimer() {
      clearInterval(this.tid)
    },
    setTrackStyle() {
      this.trackStyle = { ...this.trackStyle, width: `${this.getWidth() * this.children.length}px` }
    },
    handleWinResize() {
      this.setTrackStyle()
      this.handleIndexChange(this.curIndex)
      this.$nextTick(() => {
        this.children.forEach(item =>
          item.styles = { width: `${this.getWidth()}px`
        })
      })
    }
  },
  mounted() {
    this.$nextTick(this.setTrackStyle)
    this.startTimer()
  },
  beforeDestroy() {
    this.stopTimer()
  }
}
</script>
<style lang="less">
.ui-swiper {
  position: relative;
  user-select: none;
  &.hover:not(:hover), &.never {
    .ui-swiper-arrow {
      opacity: 0;
    }
  }
}

.ui-swiper-arrow {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  outline: none;
  border: none;
  color: #fff;
  background-color: rgba(31,45,61,.11);
  transition: all .2s ease;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  &:hover:not(:disabled) {
    background-color: rgba(31,45,61,.5);
  }
  &.prev {
    left: 16px;
  }
  &.next {
    right: 16px;
  }
}

.ui-swiper-list {
  overflow: hidden;
}

.ui-swiper-dots {
  width: 100%;
  text-align: center;
  &.inside {
    position: absolute;
    bottom: 3px;
    z-index: 10;
  }
  &.outside {
    margin-top: 3px;
  }
  &.none {
    display: none;
  }
  li {
    list-style: none;
    cursor: pointer;
    width: 16px;
    display: inline-block;
    vertical-align: middle;
    height: 3px;
    margin: 0 2px;
    background-color: #8391a5;
    opacity: .3;
    transition: all .5s ease;
    &:hover {
      opacity: .7;
    }
    &.active {
      opacity: 1;
      width: 24px;
    }
  }
  &.circle li {
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }
}

.ui-swiper-item {
  float: left;
  height: 100%;
}
</style>