<template>
  <div :class="[prefix, `${prefix}-${size}`, `${prefix}-${type}`]">
    <div :class="`${prefix}-bar`">
      <div :class="[`${prefix}-nav-wrap`, {showNavBtns}]">
        <ul ref="scrollView" :class="`${prefix}-nav`" :style="{transform: `translateX(${translateX}px)`}">
          <li v-for="item in childs" :key="item.key" :ref="item.key" :class="navItemClasses(item)" @click="onNavItemClick(item)">
            <ui-icon v-if="item.icon" :class="`${prefix}-icon`" :type="item.icon"/>
            <UiRender v-if="isFunc(item.label)" :render="item.label"/>
            <template v-else>{{item.label}}</template>
            <ui-close-icon-button :class="`${prefix}-close`" v-if="canClose(item)" @click.stop="deleteItem(item)"/>
          </li>
        </ul>
        <template v-if="showNavBtns">
          <span :class="`${prefix}-nav-prev`" @click="onNavPrev()">
            <ui-icon type="ios-arrow-back"/>
          </span>
          <span :class="`${prefix}-nav-next`" @click="onNavNext()">
            <ui-icon type="ios-arrow-forward"/>
          </span>
        </template>
      </div>
      <slot name="extra"></slot>
    </div>
    <div :class="[`${prefix}-content`, {animated}]" :style="contentStyle"><slot></slot></div>
  </div>
</template>
<script>
import UiIcon from '../icon'
import UiCloseIconButton from '../close-icon-button'
import { UiRender, isFunc } from '../../tools'
export default {
  name: 'UiTabs',
  components: { UiIcon, UiCloseIconButton, UiRender },
  data() {
    return {
      prefix: 'ui-tabs',
      childs: [],
      activeTab: this.value,
      showNavBtns: false,
      translateX: 0
    }
  },
  props: {
    value: [String, Number],
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
    }
  },
  computed: {
    contentStyle() {
      let i = this.childs.map(_ => _.key).indexOf(this.activeTab)
      return i > 0 && { transform: `translateX(${-i * 100}%)` }
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
    navItemClasses(item) {
      return [`${this.prefix}-nav-item`, { active: item.key === this.activeTab, disabled: item.disabled }]
    },
    addItem(vm) {
      this.$nextTick(() => this.onWinResize())
      return this.childs.push(vm)
    },
    removeItem(vm) {
      let i = this.childs.indexOf(vm)
      this.childs.splice(i, 1)
      if (vm.key === this.activeTab && this.childs.length) this.activeTab = this.childs[i > 0 ? i - 1 : 0].key
      this.$nextTick(() => this.onWinResize())
    },
    deleteItem(item) {
      this.$emit('on-tab-remove', item.key)
    },
    onNavItemClick(item) {
      this.activeTab = item.key
      const { scrollView } = this.$refs
      const target = this.$refs[item.key][0]
      let targetRect = target.getBoundingClientRect()
      let scrollViewLeft = scrollView.getBoundingClientRect().left + Math.abs(this.translateX)
      if (scrollViewLeft + scrollView.clientWidth < targetRect.right) {
        this.onNavNext(target.clientWidth)
      } else if (scrollViewLeft > targetRect.left) {
        this.onNavPrev(target.clientWidth)
      }
    },
    isFunc(label) {
      return isFunc(label)
    },
    canClose(item) {
      return item.closable === false ? false : this.closable && this.type === 'card'
    },
    onNavPrev(dis) {
      let { clientWidth, scrollWidth } = this.$refs.scrollView
      let maxDis = Math.min(Math.abs(this.translateX), dis || Infinity)
      this.translateX += Math.min(clientWidth, maxDis > 0 ? maxDis : 0)
    },
    onNavNext(dis) {
      let { clientWidth, scrollWidth } = this.$refs.scrollView
      let maxDis = Math.min(scrollWidth - clientWidth - Math.abs(this.translateX), dis || Infinity)
      this.translateX -= Math.min(clientWidth, maxDis > 0 ? maxDis : 0)
    },
    onWinResize() {
      let { scrollView } = this.$refs
      if (!scrollView) return
      let { clientWidth, scrollWidth } = scrollView
      if (clientWidth + Math.abs(this.translateX) > scrollWidth) {
        this.translateX = -scrollWidth + clientWidth
      }
      this.showNavBtns = clientWidth < scrollWidth
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
    overflow: hidden;
    white-space: nowrap;
    &.showNavBtns {
      padding: 0 16px;
    }
  }
  &-nav {
    list-style: none;
    transition: all .3s ease-in-out;
  }
  &-nav-prev, &-nav-next {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 15px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-bottom: 1px solid @border-color;
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
    transition: all .3s ease-in-out;
  }
  &-content {
    display: flex;
    &.animated {
      transition: all .3s ease-in-out;
    }
  }
  &-pane {
    min-width: 100%;
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