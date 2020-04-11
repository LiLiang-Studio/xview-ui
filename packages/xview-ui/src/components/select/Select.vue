<template>
  <div :class="prefixCls">
    <x-popper v-bind="popperProps" @clickoutside="toggle(false)">
      <div tabindex="0" slot="reference" :class="boxClass" @click="toggle()" @focus="onFocus" @keydown="onKeydown">
        <template v-if="multiple">
          <x-tag closable :fade="false"
            v-for="_ in selectedValue" :key="_" @on-close.stop="removeSelected(_)">{{getLabel(_)}}</x-tag>
          <input v-if="!filterable && !selectedValue.length"
            :class="`${prefixCls}_input placeholder`" readonly :placeholder="placeholder">
          <input v-if="filterable" ref="Input" :class="`${prefixCls}_input`" v-model="searchValue"
            :style="inputStyle" :placeholder="inputPlaceholder">
          <span :class="`${prefixCls}_inputText`" ref="SearchText">{{searchText}}</span>
        </template>
        <template v-else>
          <input v-if="filterable"
            ref="Input" :class="`${prefixCls}_input`" :placeholder="placeholder" v-model="searchValue">
          <template v-else>
            <span v-if="selectedValue.length" :class="`${prefixCls}_label`">{{singleLabel}}</span>
            <span v-else :class="`${prefixCls}_placeholder`">{{placeholder}}</span>
          </template>
        </template>
        <div :class="`${prefixCls}_arrow`">
          <x-icon :class="`${prefixCls}_clearIcon`" type="ios-close" @click.stop="onClear"/>
          <x-icon :class="`${prefixCls}_downIcon`" type="ios-arrow-down"/>
        </div>
      </div>
      <ul :class="[`${prefixCls}_options`, {multiple}]" :style="listStyle">
        <slot>
          <li :class="`${prefixCls}_empty`">{{loading ? loadingText : notFoundText}}</li>
        </slot>
      </ul>
    </x-popper>
  </div>
</template>
<script>
import XTag from '../tag'
import XIcon from '../icon'
import XPopper from '../popper'
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
    labelInValue: B,
    prefix: S,
    maxTagCount: N,
    maxTagPlaceholder: Function,
    allowCreate: B
  },
  data() {
    return {
      visible: false,
      prefixCls: 'x-select',
      listStyle: null,
      selectedValue: this.getModel(),
      children: [],
      searchValue: ''
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
      let vm = this.children.find(_ => this.selectedValue.indexOf(_.value) > -1)
      return vm && (vm.label || vm.value)
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
      if (!this.filterable) return
      if (this.remote) {
        this.remoteMethod && this.remoteMethod(val)
      } else {
        let _newVal = val.toLowerCase()
        this.children.forEach(_ => {
          let _val = ('' + _.value).toLowerCase()
          let _label = _.label === undefined ? '' : ('' + _.label).toLowerCase()
          _.$data.isDelete = _val.indexOf(_newVal) === -1 && _label.indexOf(_newVal) === -1
        })
      }
      if (!this.multiple) return
      this.$nextTick(() => {
        this.$refs.Input.style.width = 
          val || this.selectedValue.length ? 
          Math.min(this.$refs.SearchText.offsetWidth, this.$el.offsetWidth - 25) + 'px' : ''
      })
    }
  },
  methods: {
    getModel() {
      return this.multiple ? this.value : ['', null, undefined].indexOf(this.value) < 0 ? [this.value] : []
    },
    updateModel(val) {
      this.selectedValue = this.getModel(val)
    },
    updateSelected(val) {
      if (this.multiple) {
        this.filterable && this.$refs.Input.focus()
        let index = this.selectedValue.indexOf(val)
        index < 0 ? this.selectedValue.push(val) : this.selectedValue.splice(index, 1)
      } else {
        this.toggle(false)
        this.selectedValue = [val]
      }
      this.children.forEach(_ => _.focus = _.value === val)
    },
    removeSelected(val) {
      this.selectedValue.splice(this.selectedValue.indexOf(val), 1)
    },
    addItem(vm) {
      this.children.push(vm)
    },
    removeItem(vm) {
      this.children.splice(this.children.indexOf(vm), 1)
    },
    getLabel(value) {
      let vm = this.children.find(_ => _.value === value)
      return vm ? vm.label || vm.value : value
    },
    setOptionFocus(isUp) {
      let children = this.children.filter(_ => !_.removed), len = children.length
      if (len) {
        let index = children.findIndex(_ => _.focus)
        this.children.forEach(_ => _.focus = false)
        index = isUp ? (index <= 0 ? len - 1 : index - 1) : (index < len - 1 ? index + 1 : 0)
        let vm = children[index]
        vm.focus = true
        vm.$el.scrollIntoViewIfNeeded()
      }
    },
    toggle(visible) {
      this.visible = visible === undefined ? !this.visible : visible
    },
    onClear() {
      this.selectedValue = []
    },
    onFocus() {
      if (this.filterable) this.$refs.Input.focus()
    },
    onKeydown(e) {
      const { keyCode } = e, UP = 38, DOWN = 40, ESC = 27, ENTER = 13, DEL = 46, BACKSPACE = 8, TAB = 9
      if ([UP, DOWN, ESC, TAB].indexOf(keyCode) > -1) {
        e.preventDefault()
      }
      if (keyCode === ENTER) {
        if (this.visible) {
          let vm =  this.children.find(_ => _.focus && !_.removed)
          vm ? this.updateSelected(vm.value) : this.toggle()
        }
      } else if (keyCode === UP) {
        this.visible && this.setOptionFocus(true)
      } else if (keyCode === DOWN) {
        this.visible ? this.setOptionFocus() : this.toggle()
      } else if (keyCode === ESC) {
        this.toggle(false)
      } else if ([DEL, BACKSPACE].indexOf(keyCode) > -1) {
        this.multiple && this.filterable && !this.searchValue && this.selectedValue.pop()
      }
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
@prefix: .x-select;
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
    border-radius: 4px;
    height: @size-normal;
    padding: 0 24px 0 8px;
    color: @content-color;
    border: 1px solid @border-color;
    transition: all .2s ease-in-out;
    &.listVisible {
      .control-shadow(@primary-color);
      @{prefix}_arrow {
        transform: rotate(180deg);
      }
    }
    &.multiple {
      height: auto;
      padding-left: 4px;
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
      @{prefix}_downIcon {
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
  }
  &_downIcon {
    font-weight: bold;
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
    font-size: 12px;
    &::placeholder {
      color: @disabled-color;
    }
    &.placeholder {
      cursor: pointer;
    }
  }
  &_arrow {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: @sub-color;
    font-size: 14px;
    transition: transform .2s ease-in-out;
  }
  &-option {
    display: flex;
    align-items: center;
    cursor: pointer;
    list-style: none;
    padding: 7px 16px;
    line-height: 1.2;
    &.focus:not(.disabled), &:hover:not(.disabled) {
      background: darken(@bg-color, 2%);
    }
    &.selected:not(.disabled) {
      color: @primary-color;
    }
    &.disabled {
      cursor: not-allowed;
      color: @disabled-color;
    }
    &_content {
      flex: 1;
    }
    &_doneIcon {
      margin-left: 16px;
    }
    &-group_title {
      padding-left: 8px;
      color: #999;
      font-size: 12px;
      height: 30px;
      line-height: 30px;
    }
  }
  &_options {
    padding: 5px 0;
    max-height: 200px;
    overflow-y: auto;
  }
  &_options:not(.multiple) &-option_doneIcon {
    display: none;
  }
  &_empty {
    text-align: center;
    color: @disabled-color;
  }
}
</style>