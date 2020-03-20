<template>
  <ul :class="[prefix, size, {simple}]">
    <span v-if="showTotal && !simple" :class="`${prefix}_total`">
      <slot>共 {{total}} 条</slot>
    </span>
    <li :class="{isText: prevText, disabled: disabledPrev}" @click="toPrev">
      {{prevText}}<x-icon type="ios-arrow-left"/>
    </li>
    <span v-if="simple" :class="`${prefix}_elevator`">
      <x-input size="small" v-model="inputValue" @on-enter="toInputPage" @on-keydown="onKeydown" @on-keyup="onKeyup"/>
      <span :class="`${prefix}_slash`">/</span> {{pageCount}}
    </span>
    <template v-else>
      <template v-if="currentPage >= 5">
        <li :class="{active: currentPage === 1}" @click="toPage(1)">1</li>
        <li :class="`${prefix}_more`" title="向前5页" @click="toPrev5">
          <span class="arrows"><x-icon type="ios-arrow-left" v-for="i in 2" :key="i"/></span>
          <x-icon class="icon-more" type="ios-more"/>
        </li>
      </template>
      <li v-for="_ in showPages" :key="_" :class="{active: currentPage === _}" @click="toPage(_)">{{_}}</li>
      <template v-if="pageCount - currentPage >= 4">
        <li :class="`${prefix}_more`" title="向后5页" @click="toNext5">
          <span class="arrows"><x-icon type="ios-arrow-right" v-for="i in 2" :key="i"/></span>
          <x-icon class="icon-more" type="ios-more"/>
        </li>
        <li :class="{active: currentPage === pageCount}" @click="toPage(pageCount)">{{pageCount}}</li>
      </template>
    </template>
    <li :class="{isText: nextText, disabled: disabledNext}" @click="toNext">
      {{nextText}}<x-icon type="ios-arrow-right"/>
    </li>
    <template v-if="!simple">
      <x-select v-if="showSizer" :class="`${prefix}_sizer`" :placement="placement" :transfer="transfer" :size="size" v-model="limit">
        <x-option v-for="_ in pageSizeOpts" :key="_" :value="_" :label="`${_} 条/页`"/>
      </x-select>
      <span :class="`${prefix}_elevator`" v-if="showElevator">
        跳至<x-input :size="size" v-model="inputValue" @on-enter="toInputPage"/>页
      </span>
    </template>
  </ul>
</template>
<script>
import XIcon from '../icon'
import XInput from '../input'
import XSelect from '../select'
import XOption from '../option'
const N = Number, B = Boolean
export default {
  name: 'XPage',
  components: { XIcon, XSelect, XOption, XInput },
  props: {
    current: { type: N, default: 1 },
    total: { type: N, default: 0 },
    pageSize: { type: N, default: 10 },
    pageSizeOpts: { type: Array, default: () => [10, 20, 30, 40] },
    placement: {
      default: 'bottom',
      validator(v) {
        return ['bottom', 'top'].indexOf(v) > -1
      }
    },
    size: {
      validator(v) {
        return v === 'small'
      }
    },
    simple: B,
    showTotal: B,
    showElevator: B,
    showSizer: B,
    transfer: B,
    prevText: String,
    nextText: String
  },
  data() {
    return { prefix: 'x-page', limit: this.pageSize, currentPage: 1, inputValue: 1 }
  },
  computed: {
    pageCount() {
      return Math.ceil(this.total / this.limit)
    },
    disabledPrev() {
      return this.currentPage === 1
    },
    disabledNext() {
      return this.currentPage === this.pageCount
    },
    showPages() {
      let { currentPage, pageCount } = this
      let nums = []
      if (currentPage < 5) {
        for (let i = 1; i <= currentPage; i++) nums.push(i)
      } else {
        nums = [currentPage - 2, currentPage - 1, currentPage]
      }
      if (pageCount - currentPage <= 3) {
        for (let i = currentPage + 1; i <= pageCount; i++) nums.push(i)
      } else {
        nums.push(...[currentPage + 1, currentPage + 2])
      }
      return nums
    }
  },
  watch: {
    limit(val) { // 页大小改变 跳转到首页 并发射页大小改变事件 但不发射当前页改变事件
      this.goPage(1)
      this.$emit('on-page-size-change', val)
    },
    current: {
      immediate: true,
      handler(val) {
        this.currentPage = this.inputValue = val
      }
    },
    pageSize(val) {
      this.limit = val
    }
  },
  methods: {
    goPage(page) { // 到第几页 不发射改变事件
      this.inputValue = page
      this.currentPage = page
      this.$emit('update:current', page)
    },
    toPage(page) { // 到第几页 手动触发导致 发射改变事件
      this.goPage(page)
      this.$emit('on-change', page)
    },
    toPrev() { // 到上1页
      !this.disabledPrev && this.toPage(this.currentPage - 1)
    },
    toNext() { // 到下1页
      !this.disabledNext && this.toPage(this.currentPage + 1)
    },
    toPrev5() { // 到上5页
      this.toPage(Math.max(this.currentPage - 5, 1))
    },
    toNext5() { // 到下5页
      this.toPage(Math.min(this.currentPage + 5, this.pageCount))
    },
    toInputPage() { // 电梯直达目标页
      let inputValue = +this.inputValue
      if (isNaN(inputValue) || inputValue < 1) {
        this.toPage(1)
      } else if (inputValue > this.pageCount) {
        this.toPage(this.pageCount)
      } else {
        this.toPage(inputValue)
      }
    },
    onKeydown(e) { // 简洁版输入框键盘按下
      if ([38, 40].indexOf(e.keyCode) > -1) e.preventDefault()
    },
    onKeyup(e) { // 简洁版输入框键盘松开
      if (e.keyCode === 38) {
        this.inputValue = this.currentPage = Math.min(this.pageCount, this.currentPage + 1)
      } else if (e.keyCode === 40) {
        this.inputValue = this.currentPage = Math.max(1, this.currentPage - 1)
      }
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
@page: .x-page;
@{page} {
  font-size: 14px;
  display: flex;
  align-items: center;
  li {
    color: #666;
    cursor: pointer;
    list-style: none;
    user-select: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 0 4px;
    border-radius: 4px;
    height: @size-normal;
    min-width: @size-normal;
    border: 1px solid @border-color;
    transition: border-color .2s ease-in-out;
    &:first-child {
      margin-left: 0;
    }
    &:hover:not(.disabled), &.active:not(.disabled) {
      color: @primary-color;
      border-color: currentColor;
    }
    &.disabled {
      color: #ccc;
      cursor: not-allowed;
    }
    &.isText {
      border: none;
      .x-icon {
        display: none;
      }
    }
  }
  li&_more {
    border: none;
    color: #ccc;
    .icon-more {
      font-size: 20px;
    }
    .arrows {
      letter-spacing: -5px;
    }
    &:not(:hover) .arrows {
      display: none;
    }
    &:hover .icon-more {
      display: none;
    }
  }
  &_elevator {
    display: inline-flex;
    align-items: center;
    margin-left: 15px;
    .x-input {
      width: 50px;
      margin: 0 10px;
    }
  }
  &_total {
    margin-right: 10px;
  }
  &_sizer {
    width: auto;
    margin-left: 15px;
  }
  &.small, &.simple {
    li {
      border: none;
      height: @size-small;
      min-width: @size-small;
    }
  }
  &.small li {
    margin: 0 2px;
  }
  &.simple {
    @{page}_elevator {
      margin: 0;
    }
    .x-input {
      width: 40px;
      margin: 0;
    }
  }
  &_slash {
    margin: 0 10px;
  }
}
</style>