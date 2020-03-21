<template>
  <div :class="classes" v-winresize="onWinResize()">
    <!-- 导航面板 -->
    <div :class="`${prefix}_bar`">
      <!-- tab项 -->
      <div :class="[`${prefix}_navWrap`, {showNavBtns}]">
        <!-- tabs -->
        <div :class="`${prefix}_scrollWrap`">
          <ul ref="scrollView" :class="`${prefix}_nav`" :style="{transform: `translateX(${translateX}px)`}">
            <li v-for="_ in items" :key="_.key" :class="tabClass(_)" @click="onTabClick(_)">
              <!-- 图标 -->
              <x-icon v-if="_.icon" :class="`${prefix}_icon`" :type="_.icon"/>
              <!-- 调用渲染函数 -->
              <x-render v-if="isFunc(_.label)" :render="_.label"/>
              <!-- label文本 -->
              <template v-else>{{_.label}}</template>
              <!-- ❎关闭按钮 -->
              <x-close-icon-button :class="`${prefix}_close`" v-if="canClose(_)" @click.stop="deleteItem(_)"/>
            </li>
          </ul>
        </div>
        <!-- 方向导航按钮 -->
        <template v-if="showNavBtns">
          <!-- 👈向前 -->
          <x-icon type="ios-arrow-back" :class="`${prefix}_navPrev`" @click="onNavPrev()"/>
          <!-- 👉向后 -->
          <x-icon type="ios-arrow-forward" :class="`${prefix}_navNext`" @click="onNavNext()"/>
        </template>
      </div>
      <!-- 附加内容 -->
      <slot name="extra"></slot>
    </div>
    <!-- 内容区 -->
    <div :class="[`${prefix}_content`, {animated}]" :style="contentStyle"><slot></slot></div>
  </div>
</template>
<script>
import XIcon from '../icon'
import XCloseIconButton from '../close-icon-button'
import { XRender, isFunc, throttle } from '../../tools'
import { winresize } from '../../directives'
export default {
  name: 'XTabs',
  components: { XIcon, XCloseIconButton, XRender },
  props: {
    value: [String, Number],
    type: {
      default: 'line',
      validator(v) {
        return ['line', 'card'].indexOf(v) > -1
      }
    },
    size: {
      validator(v) {
        return ['default', 'small'].indexOf(v) > -1
      }
    },
    closable: Boolean,
    animated: { type: Boolean, default: true },
    beforeClose: Function
  },
  data() {
    return {
      prefix: 'x-tabs',
      items: [],
      activeTab: this.value,
      showNavBtns: false,
      translateX: 0
    }
  },
  computed: {
    classes() {
      let { prefix } = this
      return [prefix, this.size && `${prefix}_${this.size}`, `${prefix}_${this.type}`]
    },
    contentStyle() {
      let index = this.items.findIndex(_ => _.key === this.activeTab)
      return index > -1 && { transform: `translateX(${-index * 100}%)` }
    }
  },
  watch: {
    value(val) {
      this.activeTab = val
    },
    activeTab(val) {
      this.$emit('input', val)
      this.$nextTick(() => this.scrollToCurrent())
    },
    items(val) {
      if (val.length) {
        if (this.activeTab === undefined) this.activeTab = this.items[0].key
      } else {
        this.activeTab = undefined
      }
    }
  },
  directives: { winresize },
  methods: {
    isFunc,
    tabClass(item) { // 项class
      return [`${this.prefix}_navItem`, { active: item.key === this.activeTab, disabled: item.disabled }]
    },
    addItem(vm) { // 添加项组件 仅供子组件调用
      let len = this.items.push(vm)
      this.$nextTick(() => this.winResizeHandler())
      return len
    },
    removeItem(vm) { // 移除项组件 仅供子组件调用
      let index = this.items.indexOf(vm)
      this.items.splice(index, 1)
      if (vm.key === this.activeTab && this.items.length) {
        this.activeTab = this.items[index > 0 ? index - 1 : 0].key
      }
      this.$nextTick(() => this.winResizeHandler())
    },
    deleteItem(item) { // 删除项 单击关闭按钮调用
      const fn = () => this.$emit('on-tab-remove', item.key)
      this.beforeClose ? this.beforeClose().then(fn) : fn()
    },
    scrollToCurrent() { // 滚动到目标tab
      if (this.activeTab !== undefined) {
        let index = this.items.findIndex(_ => _.key === this.activeTab)
        let { scrollView } = this.$refs
        let el = scrollView.querySelectorAll('li')[index]
        let rect = el.getBoundingClientRect()
        let scrollViewLeft = scrollView.getBoundingClientRect().left + Math.abs(this.translateX)
        let rightMoveDis = scrollViewLeft + scrollView.clientWidth - rect.right
        let leftMoveDis = scrollViewLeft - rect.left
        if (rightMoveDis < 0) {
          this.onNavNext(Math.max(-rightMoveDis, el.clientWidth))
        } else if (leftMoveDis > 0) {
          this.onNavPrev(Math.max(leftMoveDis, el.clientWidth))
        }
      }
    },
    onTabClick(item) { // tab单击
      this.activeTab = item.key
      this.$emit('on-click', item.key)
    },
    canClose(item) { // 是否可关闭
      return item.closable === false ? false : (item.closable || this.closable) && this.type === 'card'
    },
    onNavPrev(dis) { // 向前导航
      let { clientWidth } = this.$refs.scrollView
      let maxDis = Math.abs(this.translateX)
      this.translateX += dis ? Math.min(maxDis, dis) : Math.min(clientWidth, maxDis > 0 ? maxDis : 0)
    },
    onNavNext(dis) { // 向后导航
      let { clientWidth, scrollWidth } = this.$refs.scrollView
      let maxDis = scrollWidth - clientWidth - Math.abs(this.translateX)
      this.translateX -= dis ? Math.min(maxDis, dis) : Math.min(clientWidth, maxDis > 0 ? maxDis : 0)
    },
    winResizeHandler() { // 窗口大小改变处理
      let { scrollView } = this.$refs
      if (scrollView) {
        let { clientWidth, scrollWidth } = scrollView
        if (clientWidth + Math.abs(this.translateX) > scrollWidth) {
          this.translateX = -scrollWidth + clientWidth
        }
        this.showNavBtns = clientWidth < scrollWidth
      }
    },
    onWinResize() { // 窗口大小改变节流处理 指令专用
      return throttle(this.winResizeHandler, 50)
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
@tabs: .x-tabs;
@navBtnWidth: 32px;
@{tabs} {
  overflow: hidden;
  position: relative;
  font-size: 14px;
  &_bar, &_navPrev, &_navNext {
    display: flex;
    align-items: center;
    border-bottom: 1px solid @border-color;
  }
  &_bar {
    justify-content: space-between;
    margin-bottom: 16px;
  }
  &_navWrap {
    overflow: hidden;
    white-space: nowrap;
    position: relative;
    bottom: -1px;
    &.showNavBtns {
      padding: 0 @navBtnWidth;
    }
  }
  &_scrollWrap {
    overflow: hidden;
  }
  &_nav {
    list-style: none;
    transition: all .3s ease-in-out;
  }
  &_navPrev, &_navNext {
    position: absolute;
    top: 0;
    bottom: 0;
    width: @navBtnWidth;
    cursor: pointer;
    justify-content: center;
  }
  &_navPrev {
    left: 0;
  }
  &_navNext {
    right: 0;
  }
  &_navItem {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    height: 36px;
    padding: 0 16px;
    border-bottom: 2px solid transparent;
    transition: color .2s ease-in-out;
    + li {
      margin-left: 16px;
    }
    &:hover, &.active {
      color: @primary-color;
      @{tabs}_close {
        width: 22px;
        margin-right: -10px;
      }
    }
    &.active {
      border-bottom-color: currentColor;
    }
    &.disabled {
      color: #ccc;
      pointer-events: none;
    }
  }
  &_icon {
    margin-right: 8px;
  }
  &_close {
    width: 0;
    padding: 0;
    overflow: hidden;
    text-align: center;
    transition: all .3s ease-in-out;
  }
  &_content {
    display: flex;
    &.animated {
      transition: all .3s ease-in-out;
    }
  }
  &-pane {
    min-width: 100%;
  }
  &_line&_small {
    font-size: 12px;
    @{tabs}_navItem {
      height: 32px;
    }
  }
  &_card &_navItem {
    height: 32px;
    border-radius: 4px 4px 0 0;
    background-color: @bg-color;
    border: 1px solid @border-color;
    + li {
      margin-left: 4px;
    }
    &.active {
      background-color: #fff;
      border-color: @primary-color;
      border-bottom-color: transparent;
    }
  }
}
</style>