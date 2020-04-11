<template>
  <div :class="prefixCls">
    <x-popper v-bind="popperProps" @clickoutside="toggle(false)" @on-popper-show="show(true)" @on-popper-hide="show(false)">
      <div slot="reference" ref="Box" tabindex="0" :class="boxClass" @click="onClick" @focus="onFocus" @keydown="onKeydown">
        <!-- 前缀 -->
        <template v-if="prefix || $slots.prefix">
          <slot name="prefix"><x-icon :type="prefix"/></slot>
        </template>
        <!-- 中间盒子 占用剩余可用空间 -->
        <div :class="`${prefixCls}_middle`">
          <template v-if="multiple">
            <x-tag closable :fade="false" v-for="_ in showedValues" :key="_" @on-close.stop="removeSelected(_)">{{getLabel(_)}}</x-tag>
            <x-tag v-if="moreValue" :fade="false">{{moreValue}}</x-tag>
            <input v-if="!filterable && !selectedValue.length"
              :class="`${prefixCls}_input placeholder`" :placeholder="placeholder">
            <input v-if="filterable" ref="Input" :class="`${prefixCls}_input`" v-model="searchValue"
              :style="inputStyle" :placeholder="inputPlaceholder" @input="toggle(true)">
            <span :class="`${prefixCls}_inputText`" ref="SearchText">{{searchText}}</span>
          </template>
          <template v-else>
            <input v-if="filterable" ref="Input" :class="`${prefixCls}_input`" 
              :placeholder="placeholder" v-model="searchValue" @blur="onInputBlur" @input="toggle(true)">
            <template v-else>
              <span v-if="selectedValue.length" :class="`${prefixCls}_label`">{{singleLabel}}</span>
              <span v-else :class="`${prefixCls}_placeholder`">{{placeholder}}</span>
            </template>
          </template>
        </div>
        <!-- 箭头和清除图标 -->
        <x-icon :class="`${prefixCls}_clearIcon`" type="ios-close" @click.stop="onClear"/>
        <x-icon :class="`${prefixCls}_arrowIcon`" type="ios-arrow-down"/>
      </div>
      <!-- 选项列表 -->
      <ul :class="[`${prefixCls}_options`, {multiple}]" :style="listStyle">
        <li v-if="isEmpty" :class="`${prefixCls}_empty`">{{loading ? loadingText : notFoundText}}</li>
        <slot></slot>
      </ul>
    </x-popper>
  </div>
</template>
<script>
import XTag from '../tag'
import XIcon from '../icon'
import XPopper from '../popper'
import Cache from './cache'
import { throttle } from '../../tools'
const N = Number, S = String, B = Boolean, SNA = [S, N, Array]
export default {
  name: 'XSelect',
  components: { XTag, XIcon, XPopper },
  props: {
    value: SNA,
    multiple: B,
    disabled: B,
    clearable: B,
    filterable: B,
    remote: B,
    remoteMethod: Function,
    loading: B,
    loadingText: { type: S, default: '加载中' },
    label: SNA,
    size: {
      validator(v) {
        return ['large', 'small', 'default'].indexOf(v) > -1
      }
    },
    placeholder: { type: S, default: '请选择' },
    notFoundText: { type: S, default: '无匹配数据' },
    prefix: S,
    maxTagCount: N,
    maxTagPlaceholder: Function
  },
  data() {
    return {
      visible: false,
      prefixCls: 'x-select',
      listStyle: null,
      selectedValue: this.getModel(),
      children: [],
      searchValue: '',
      cache: new Cache(this.value, this.label)
    }
  },
  computed: {
    popperProps() {
      return {
        ...this.$attrs,
        ref: 'Popper',
        adaptive: false,
        visible: this.visible,
        placement: 'bottom-start',
        transitionName: 'x-animate-dropdown'
      }
    },
    boxClass() {
      return [
        `${this.prefixCls}_selection`,
        this.size && `${this.prefixCls}_${this.size}`,
        {
          listVisible: this.visible,
          disabled: this.disabled,
          multiple: this.multiple,
          filterable: this.filterable,
          clearable: this.clearable && this.selectedValue.length
        }
      ]
    },
    inputStyle() {
      return this.selectedValue.length && { width: '20px' }
    },
    inputPlaceholder() {
      return !this.selectedValue.length && this.placeholder
    },
    searchText() {
      return this.searchValue.replace(/\s/gm, val => '&nbsp;')
    },
    singleLabel() {
      let val = this.selectedValue[0]
      let vm = this.children.find(_ => _.value === val)
      return this.remote ? this.cache.getLabel(val) : vm && (vm.label || vm.value)
    },
    showedValues() {
      return this.maxTagCount ? this.selectedValue.slice(0, this.maxTagCount) : this.selectedValue
    },
    moreValue() {
      let moreCount = this.maxTagCount ? this.selectedValue.length - this.maxTagCount : 0
      return moreCount > 0 ? this.maxTagPlaceholder ? this.maxTagPlaceholder(moreCount) : `+ ${moreCount}...` : 0
    },
    isEmpty() {
      return this.children.every(_ => _.removed)
    }
  },
  watch: {
    visible(val) {
      val && this.$nextTick(() => this.listStyle = { minWidth: `${this.$el.offsetWidth}px` })
    },
    value: 'updateModel',
    selectedValue(val) {
      this.$emit('input', this.multiple ? val : val[0])
      this.children.forEach(_ => _.selected = val.indexOf(_.value) > -1)
      if (this.multiple && this.visible) {
        clearTimeout(this.tid)
        this.tid = setTimeout(() => this.$refs.Popper.update(), 50)
      }
    },
    children(val) {
      val.forEach(_ => _.selected = this.selectedValue.indexOf(_.value) > -1)
    },
    searchValue(val) {
      if (this.filterable && val) {
        this.throttleSearch && this.throttleSearch()
        if (this.multiple) {
          this.$nextTick(() => {
            this.$refs.Input.style.width = val || this.selectedValue.length ?
              Math.min(this.$refs.SearchText.offsetWidth, this.$el.offsetWidth - 25) + 'px' : ''
          })
        }
      }
    }
  },
  mounted() {
    this.throttleSearch = throttle(() => {
      if (this.remote) {
        this.remoteMethod && this.remoteMethod(this.searchValue)
      } else {
        let val = (this.searchValue + '').toLowerCase()
        this.children.forEach(_ => {
          let optionVal = (_.value + '').toLowerCase()
          let optionLabel = _.label === undefined ? '' : (_.label + '').toLowerCase()
          _.removed = optionVal.indexOf(val) < 0 && optionLabel.indexOf(val) < 0
        })
      }
    }, 1000)
  },
  methods: {
    getModel() {
      return this.multiple ? this.value : ['', null, undefined].indexOf(this.value) < 0 ? [this.value] : []
    },
    updateModel(val) {
      this.selectedValue = this.getModel(val)
    },
    updateSelected(vm) {
      if (this.multiple) {
        this.filterable && this.$refs.Input.focus()
        let index = this.selectedValue.indexOf(vm.value)
        if (index < 0) {
          this.cache.add(vm)
          this.selectedValue.push(vm.value)
        } else {
          this.cache.remove(vm.value)
          this.selectedValue.splice(index, 1)
        }
      } else {
        this.toggle(false)
        this.cache.add(vm)
        this.selectedValue = [vm.value]
        if (this.filterable) this.searchValue = vm.label || vm.value
      }
      this.$refs.Box.focus()
      this.children.forEach(_ => _.focus = _.value === vm.value)
      this.$emit('on-change', this.selectedValue)
    },
    removeSelected(val) {
      this.cache.remove(val)
      this.selectedValue.splice(this.selectedValue.indexOf(val), 1)
      this.$emit('on-change', this.selectedValue)
    },
    addItem(vm) {
      this.children.push(vm)
    },
    removeItem(vm) {
      this.children.splice(this.children.indexOf(vm), 1)
    },
    getLabel(value) {
      let vm = this.children.find(_ => _.value === value)
      return this.remote ? this.cache.getLabel(value) : vm ? vm.label || vm.value : value
    },
    setOptionFocus(isUp) {
      if (this.visible) {
        let children = this.children.filter(_ => !_.removed && !_.disabled), len = children.length
        if (len) {
          let index = children.findIndex(_ => _.focus)
          this.children.forEach(_ => _.focus = false)
          index = isUp ? (index <= 0 ? len - 1 : index - 1) : (index < len - 1 ? index + 1 : 0)
          let vm = children[index]
          vm.focus = true
          vm.$el.scrollIntoViewIfNeeded()
        }
      } else {
        this.toggle()
      }
    },
    toggle(visible) {
      this.visible = visible === undefined ? !this.visible : visible
    },
    onClick() {
      if (!this.disabled) this.toggle()
    },
    onClear() {
      this.selectedValue = []
    },
    show(visible) {
      this.$emit('on-open-change', visible)
    },
    onFocus() {
      if (!this.disabled && this.filterable) this.$refs.Input.focus()
    },
    onKeydown(e) {
      if (!this.disabled) {
        const { keyCode } = e,
          UP = 38, DOWN = 40, ESC = 27, ENTER = 13, DEL = 46, BACKSPACE = 8, TAB = 9
        if (
          [UP, DOWN].indexOf(keyCode) > -1 ||
          (this.visible && [ESC, TAB].indexOf(keyCode) > -1)
        ) e.preventDefault()
        if (keyCode === ENTER) {
          if (this.visible) {
            let vm =  this.children.find(_ => _.focus && !_.removed)
            vm ? this.updateSelected(vm) : this.toggle()
          }
        } else if (keyCode === UP) {
          this.setOptionFocus(true)
        } else if (keyCode === DOWN) {
          this.setOptionFocus()
        } else if (keyCode === ESC) {
          this.toggle(false)
        } else if ([DEL, BACKSPACE].indexOf(keyCode) > -1) {
          this.multiple && this.filterable && !this.searchValue && this.selectedValue.pop()
        }
      }
    },
    onInputBlur() {
      setTimeout(() => this.searchValue = this.singleLabel, 300)
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
@prefix: .x-select;
@option: .x-option;
@{prefix} {
  width: 100%;
  display: inline-block;
  vertical-align: middle;
  .x-popper, .x-popper_reference {
    width: 100%;
  }
  &_selection {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    outline: none;
    cursor: pointer;
    position: relative;
    background: #fff;
    padding: 0 8px 0 4px;
    border-radius: 4px;
    height: @size-normal;
    color: @content-color;
    border: 1px solid @border-color;
    transition: all .2s ease-in-out;
    &.listVisible {
      .control-shadow(@primary-color);
      @{prefix}_arrowIcon {
        transform: rotate(180deg);
      }
    }
    &.multiple {
      height: auto;
      &, @{prefix}_middle {
        padding-left: 2px;
      }
      min-height: @size-normal;
      @{prefix}_input {
        height: @size-normal;
      }
    }
    &:hover:not(.disabled), &:focus:not(.disabled), &.listVisible {
      border-color: @primary-color;
    }
    &.clearable:hover:not(.disabled) {
      @{prefix}_clearIcon {
        display: inline-block;
      }
      @{prefix}_arrowIcon {
        display: none;
      }
    }
    &.disabled {
      cursor: not-allowed;
      color: @disabled-color;
      background: lighten(@disabled-color, 18%);
    }
    .x-tag {
      margin: 3px 4px 3px 0;
    }
  }
  &_small {
    height: @size-small;
  }
  &_large {
    height: @size-large;
  }
  &_middle {
    flex: 1;
    padding-left: 4px;
  }
  &_inputText {
    position: absolute;
    top: 0;
    left: 0;
    min-width: 20px;
    visibility: hidden;
    pointer-events: none;
  }
  &_clearIcon {
    display: none;
    color: @sub-color;
  }
  &_arrowIcon {
    font-weight: bold;
    color: @sub-color;
    transition: transform .2s ease-in-out;
  }
  &_placeholder {
    color: @disabled-color;
  }
  &_input {
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    color: @content-color;
    &::placeholder {
      color: @disabled-color;
    }
    &.placeholder {
      cursor: pointer;
    }
  }
  &_options {
    padding: 5px 0;
    max-height: 200px;
    overflow-y: auto;
  }
  &_empty {
    text-align: center;
    color: @disabled-color;
  }
  &_options:not(.multiple) @{option}_doneIcon {
    display: none;
  }
}
</style>