<template>
  <div :class="classes">
    <div v-if="$slots.prepend" :class="`${cls}_prepend`">
      <slot name="prepend"></slot>
    </div>
    <div :class="`${cls}_box`">
      <template v-if="isText">
        <span v-if="hasPrefix" :class="`${cls}_prefix`">
          <slot name="prefix">
            <x-icon :type="prefix"/>
          </slot>
        </span>
        <span v-if="clearable && inputVal" :class="`${cls}_suffix clear`" @click="onClear">
          <x-icon type="ios-close"/>
        </span>
        <span v-if="hasSuffix" :class="[`${cls}_suffix`, {search: hasSearchIcon}]">
          <x-icon v-if="icon" :type="icon" @click="onIconClick"/>
          <template v-else-if="suffix || $slots.suffix">
            <slot name="suffix">
              <x-icon :type="suffix"/>
            </slot>
          </template>
          <x-icon v-else type="ios-search" @click="onSearch"/>
        </span>
      </template>
      <input ref="Input" :class="`${cls}_input`" v-bind="attrs" v-on="listeners">
    </div>
    <div v-if="$slots.append" :class="`${cls}_append`">
      <slot name="append"></slot>
    </div>
    <x-btn v-else-if=" search && enterButton" type="primary" :size="size" @click="onSearch">
      <x-icon v-if="enterButton === true" type="ios-search"/>
      <template v-else>{{enterButton}}</template>
    </x-btn>
  </div>
</template>
<script>
import XIcon from '../icon'
import XBtn from '../button'
import { setAutoHeight } from '../../tools'
const S = String, B = Boolean
export default {
  name: 'XInput',
  components: { XIcon, XBtn },
  props: {
    value: {},
    size: {
      default: 'default',
      validator(v) {
        return ['small', 'default', 'large'].indexOf(v) !== -1
      }
    },
    clearable: B,
    icon: S,
    prefix: S,
    suffix: S,
    search: B,
    enterButton: [B, S],
    autosize: [B, Object],
    number: B
  },
  data() {
    let _self = this
    return {
      cls: 'x-input',
      inputVal: this.value,
      listeners: {
        ...this.$listeners,
        input(e) {
          if (!_self.isText && _self.autosize) {
            let { minRows, maxRows } = _self.autosize
            _self.autosize === true ? setAutoHeight(e.target) : setAutoHeight(e.target, minRows, maxRows)
          }
          let val = e.target.value
          _self.$emit('input', _self.number && val && !isNaN(val) ? +val : val)
        },
        change(e) {
          _self.$emit('on-change', e)
        },
        focus() {
          _self.$emit('on-focus')
        },
        blur() {
          _self.$emit('on-blur')
        },
        keyup(e) {
          _self.$emit('on-keyup', e)
          if (e.keyCode === 13) {
            _self.$emit('on-enter')
            _self.search && _self.onSearch()
          }
        },
        keydown(e) {
          _self.$emit('on-keydown', e)
        },
        keypress(e) {
          _self.$emit('on-keypress', e)
        }
      }
    }
  },
  computed: {
    isText() {
      return this.$attrs.type !== 'textarea'
    },
    attrs() {
      let { autosize = false } = this, { rows = 2 } = this.$attrs
      if (autosize.minRows && autosize.minRows > rows) {
        rows = autosize.minRows
      } else if (autosize.maxRows && autosize.maxRows < rows) {
        rows = autosize.maxRows
      }
      let attrs = { ...this.$attrs, value: this.inputVal, rows }
      return this.isText ? attrs : { ...attrs, is: 'textarea' }
    },
    hasPrefix() {
      return this.prefix || this.$slots.prefix
    },
    hasSuffix() {
      if (this.icon || this.suffix || this.$slots.suffix || (this.search && !this.enterButton)) {
        return this.clearable ? !this.inputVal : true
      }
    },
    hasSearchIcon() {
      return this.hasSuffix && !this.icon && !this.suffix && !this.$slots.suffix
    },
    classes() {
      let { prepend } = this.$slots
      let search = this.search && this.enterButton
      let append = search || this.$slots.append
      return [this.cls, this.size && this.isText && `${this.cls}_${this.size}`, { prepend, append, search }]
    }
  },
  watch: {
    value(val) {
      this.inputVal = val
    }
  },
  methods: {
    onClear() {
      this.$emit('input', '')
      this.$emit('on-clear')
    },
    onIconClick() {
      this.$emit('on-click')
    },
    onSearch() {
      this.focus()
      this.$emit('on-search', this.$refs.Input.value)
    },
    focus() {
      this.$refs.Input.focus()
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
@prefix: .x-input;
@{prefix} {
  display: flex;
  align-items: stretch;
  &_box {
    flex: 1;
    position: relative;
    &:not(:hover) {
      .clear {
        display: none;
      }
    }
  }
  &_input {
    display: block;
    width: 100%;
    height: 100%;
    padding: 0 7px;
    font-size: 14px;
    outline: none;
    background: #fff;
    color: @content-color;
    border: 1px solid @border-color;
    border-radius: 4px;
    font-family: inherit;
    transition: all .2s ease-in-out;
    &::placeholder {
      color: @disabled-color;
    }
    &:not(:disabled):hover, &:focus {
      border-color: @primary-color;
    }
    &:focus {
      .control-shadow(@primary-color);
    }
    &:disabled {
      cursor: not-allowed;
      color: @disabled-color;
      background: lighten(@disabled-color, 18%);
    }
  }
  textarea&_input {
    height: auto;
    line-height: 1.5;
    padding: 4px 7px;
  }
  &_prefix, &_suffix {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 1;
    font-size: 16px;
    color: @sub-color;
    display: inline-flex;
    width: @size-normal;
    align-items: center;
    justify-content: center;
  }
  &_prefix {
    left: 0;
    ~ @{prefix}_input {
      padding-left: @size-normal;
    }
  }
  &_suffix {
    right: 0;
    &.search {
      cursor: pointer;
    }
    ~ @{prefix}_input {
      padding-right: @size-normal;
    }
  }
  &_default {
    height: @size-normal;
  }
  &_small {
    height: @size-small;
    @{prefix}_prefix, @{prefix}_suffix {
      font-size: 14px;
    }
  }
  &_large {
    height: @size-large;
    @{prefix}_prefix, @{prefix}_suffix {
      font-size: 18px;
    }
  }
  &.prepend {
    @{prefix}_input {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
  &.append {
    @{prefix}_input {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    .x-btn {
      margin-right: 0;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
  &_prepend, &_append {
    padding: 0 7px;
    display: inline-flex;
    align-items: center;
    background: @bg-color;
    border: 1px solid @border-color;
    * {
      border: none !important;
      box-shadow: none !important;
      background-color: transparent !important;
    }
  }
  &_prepend {
    border-right: none;
    border-radius: 4px 0 0 4px;
  }
  &_append {
    border-left: none;
    border-radius: 0 4px 4px 0;
  }
}
</style>