<template>
  <div :class="[prefix, `${prefix}-${size}`, `${prefix}-${type}`]">
    <div :class="`${prefix}-bar`">
      <div :class="[`${prefix}-nav-wrap`, {showNavBtns}]">
        <ul ref="scrollView" :class="`${prefix}-nav`">
          <li v-for="item in childs" :key="item.key"
            :class="[`${prefix}-nav-item`, {active: item.key === activeTab, disabled: item.disabled}]"
            @click="onNavItemClick(item)">
            <ui-icon v-if="item.icon" :class="`${prefix}-icon`" :type="item.icon"/>
            <UiRender v-if="isFunc(item.label)" :render="item.label"/>
            <template v-else>{{item.label}}</template>
            <ui-close-icon-button :class="`${prefix}-close`" v-if="canClose(item)" @click.stop="deleteItem(item)"/>
          </li>
        </ul>
        <template v-if="showNavBtns">
          <span :class="`${prefix}-nav-prev`" @click="onNavPrev">
            <ui-icon type="ios-arrow-back"/>
          </span>
          <span :class="`${prefix}-nav-next`" @click="onNavNext">
            <ui-icon type="ios-arrow-forward"/>
          </span>
        </template>
      </div>
      <div :class="`${prefix}-extra`"><slot name="extra"></slot></div>
    </div>
    <div :class="[`${prefix}-content`, {animated}]" :style="contentStyle">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import UiIcon from '../icon'
import UiCloseIconButton from '../close-icon-button'
import { UiRender, isFunc } from '@/tools'
export default {
  name: 'UiTabs',
  components: { UiIcon, UiCloseIconButton, UiRender },
  data() {
    return { prefix: 'ui-tabs', childs: [], activeTab: this.value, showNavBtns: false }
  },
  props: {
    value: String,
    type: {
      default: 'line',
      validator(value) {
        return ['line', 'card'].indexOf(value) !== -1
      }
    },
    size: {
      validator(value) {
        return ['default', 'small'].indexOf(value) !== -1
      }
    },
    closable: Boolean,
    animated: {
      type: Boolean,
      default: true
    },
    beforeRemove: Function
  },
  computed: {
    contentStyle() {
      let len = this.childs.length, styles = { width: `${len * 100}%` }
      let index = this.childs.findIndex(_ => _.key === this.activeTab)
      return index < 1 ? styles : { ...styles, transform: `translateX(${-index / len * 100}%)` }
    }
  },
  watch: {
    value(newval) {
      this.activeTab = newval
    },
    activeTab(newval) {
      this.$emit('input', newval)
    },
    childs(newval) {
      if (newval.length) {
        if (this.activeTab === undefined) this.activeTab = this.childs[0].key
      } else {
        this.activeTab = undefined
      }
    }
  },
  mounted() {
    this.onWinResize()
    window.addEventListener('resize', this.onWinResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onWinResize)
  },
  methods: {
    addItem(vm) {
      this.$nextTick(() => this.onWinResize())
      return this.childs.push(vm)
    },
    removeItem(vm) {
      let i = this.childs.indexOf(vm)
      this.childs.splice(i, 1)
      if (vm.key === this.activeTab && this.childs.length) this.activeTab = this.childs[i > 0 ? i - 1 : 0].key
    },
    deleteItem(item) {
      this.$emit('on-tab-remove', item.key)
    },
    onNavItemClick(item) {
      this.activeTab = item.key
    },
    isFunc(label) {
      return isFunc(label)
    },
    canClose(item) {
      return item.closable === false ? false : this.closable && this.type === 'card'
    },
    stopAnimate() {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    },
    onNavPrev() {
      const { scrollView } = this.$refs
      if (this.rafId) this.stopAnimate()
      let start = scrollView.scrollLeft
      let width = scrollView.clientWidth
      let step = width / 30
      const animateFunc = () => {
        scrollView.scrollLeft -= step
        if (scrollView.scrollLeft <= start - width) {
          this.stopAnimate()
        } else {
          this.rafId = requestAnimationFrame(animateFunc)
        }
      }
      requestAnimationFrame(animateFunc)
    },
    onNavNext() {
      const { scrollView } = this.$refs
      if (this.rafId) this.stopAnimate()
      let start = scrollView.scrollLeft
      let width = scrollView.clientWidth
      let step = width / 30
      const animateFunc = () => {
        if (scrollView.scrollLeft >= start + width) {
          this.stopAnimate()
        } else {
          scrollView.scrollLeft += step
          this.rafId = requestAnimationFrame(animateFunc)
        }
      }
      requestAnimationFrame(animateFunc)
    },
    onWinResize() {
      this.showNavBtns = this.$refs.scrollView.clientWidth < this.$refs.scrollView.scrollWidth
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.ui-tabs {
  overflow: hidden;
  position: relative;
  font-size: 14px;
  &-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    border-bottom: 1px solid @border-color;
  }
  &-nav-wrap {
    position: relative;
    bottom: -1px;
    flex: 1;
    width: 0;
    &.showNavBtns {
      padding: 0 14px;
    }
  }
  &-nav {
    list-style: none;
    overflow: hidden;
    max-width: 100%;
    white-space: nowrap;
    transition: all .3s ease-in-out;
  }
  &-nav-prev, &-nav-next {
    position: absolute;
    top: 0;
    bottom: 1px;
    width: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }
  &-nav-prev {
    left: 0;
  }
  &-nav-next {
    right: 0;
  }
  &-nav-item {
    cursor: pointer;
    display: inline-block;
    padding: 7px 16px;
    border-bottom: 2px solid transparent;
    transition: color .3s ease-in-out;
    + li {
      margin-left: 16px;
    }
    &:hover, &.active {
      color: @primary-color;
    }
    &.active {
      border-bottom-color: @primary-color;
    }
    &.disabled {
      color: #ccc;
      pointer-events: none;
    }
  }
  &-nav-item:hover &-close, &-nav-item.active &-close {
    width: 14px;
  }
  &-icon {
    margin-right: 8px;
  }
  &-close {
    width: 0;
    height: 22px;
    overflow: hidden;
    text-align: right;
    vertical-align: middle;
    transition: width .3s ease-in-out;
  }
  &-content {
    overflow: hidden;
    &.animated {
      transition: transform .3s ease-in-out;
    }
  }
  &-extra {
    margin-left: 5px;
  }
  &-pane {
    float: left;
  }
  &-line&-small {
    font-size: 12px;
  }
  &-card &-nav-item {
    border-radius: 4px 4px 0 0;
    background-color: @bg-color;
    border: 1px solid @border-color;
    + li {
      margin-left: 4px;
    }
    &.active {
      background-color: #fff;
      border-bottom-color: transparent;
    }
  }
}
</style>