<template>
  <div :class="[prefixCls, `${prefixCls}-${size}`]">
    <div v-if="$slots.prepend" :class="`${prefixCls}-prepend`">
      <slot name="prepend"></slot>
    </div>
    <div :class="[`${prefixCls}-box`, {hasAppend: $slots.append}]">
      <textarea v-if="isArea" v-bind="bindProps" :value="value" :class="`${prefixCls}-input textarea`" v-on="listeners"></textarea>
      <template v-else>
        <UiIcon v-if="icon" :class="`${prefixCls}-icon`" :type="icon" @click="handleIconClick"/>
        <UiIcon v-if="showClearIcon" :class="`${prefixCls}-icon clear`" type="ios-close" @click="clear"/>
        <input v-bind="bindProps" :class="`${prefixCls}-input`" :value="value" v-on="listeners">
      </template>
    </div>
    <div v-if="$slots.append" :class="`${prefixCls}-append`">
      <slot name="append"></slot>
    </div>
  </div>
</template>
<script>
import UiIcon from '../icon'
import { setAutoHeight } from '@/tools'
export default {
  name: 'UiInput',
  components: { UiIcon },
  data() {
    return { prefixCls: 'ui-input' }
  },
  props: {
    value: [String, Number],
    size: {
      default: 'default',
      validator(value) {
        return ['small', 'default', 'large'].indexOf(value) !== -1
      }
    },
    clearable: Boolean,
    icon: String,
    prefix: String,
    suffix: String,
    search: Boolean,
    enterButton: [Boolean, String],
    rows: {
      type: [Number, String],
      default: 2
    },
    autosize: [Boolean, Object]
  },
  computed: {
    hasSlot() {
      return this.$attrs.type === 'text'
    },
    isArea() {
      return this.$attrs.type === 'textarea'
    },
    bindProps() {
      let { autosize, rows } = this
      if (typeof autosize === 'object') {
        if (autosize.minRows && autosize.minRows > rows) {
          rows = autosize.minRows
        } else if (autosize.maxRows && autosize.maxRows < rows) {
          rows = autosize.maxRows
        }
      }
      return { ...this.$attrs, rows, ref: 'input' }
    },
    showClearIcon() {
      return this.clearable && !this.icon && this.value
    },
    listeners() {
      const that = this
      return Object.assign({}, this.$listeners, {
        input(event) {
          if (that.isArea && that.autosize) {
            if (typeof that.autosize === 'boolean') {
              setAutoHeight(event.target)
            } else {
              setAutoHeight(event.target, that.autosize.minRows, that.autosize.maxRows)
            }
          }
          that.$emit('input', event.target.value)
        },
        focus() {
          that.$emit('on-focus')
        },
        blur() {
          that.$emit('on-blur')
        },
        change(event) {
          that.$emit('on-change', event)
        },
        keyup(event) {
          that.$emit('on-keyup', event)
          if (event.keyCode === 13) that.$emit('on-enter')
        },
        keydown(event) {
          that.$emit('on-keydown', event)
        },
        keypress(event) {
          that.$emit('on-keypress', event)
        }
      })
    }
  },
  methods: {
    focus() {
      this.$refs.input.focus()
    },
    clear() {
      this.$emit('input', '')
    },
    handleIconClick(event) {
      this.$emit('on-click', event)
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.ui-input {
  display: flex;
  align-items: stretch;
  color: @content-color;
  &-prepend, &-append {
    padding: 0 7px;
    white-space: nowrap;
    background-color: #eee;
    border: 1px solid @border-color;
    display: inline-flex;
    align-items: center;
    .ui-select-selection, .ui-btn {
      background-color: inherit;
      border-color: transparent !important;
    }
    .ui-select-selection {
      box-shadow: none !important;
    }
    .ui-select, .ui-btn {
      margin: 0 -7px;
    }
  }
  &-prepend {
    border-right: none;
    border-radius: 4px 0 0 4px;
  }
  &-append {
    border-left: none;
    border-radius: 0 4px 4px 0;
  }
  &-box {
    flex: 1;
    width: 0;
    position: relative;
  }
  &-input {
    width: 100%;
    min-height: 100%;
    padding: 0 7px;
    font-size: 12px;
    outline: none;
    background-color: #fff;
    color: @content-color;
    border: 1px solid @border-color;
    border-radius: 4px;
    transition: all .2s ease-in-out;
    font-family: inherit;
    &.textarea {
      height: auto;
      padding: 4px 7px;
    }
    &::placeholder {
      color: @disabled-color;
    }
    &:not(:disabled):hover, &:focus {
      border-color: @primary-color;
    }
    &:focus {
      .form-control-shadow(@primary-color);
    }
    &:disabled {
      cursor: not-allowed;
      color: @disabled-color;
      background-color: @disabled-bg-color;
    }
  }
  &-icon {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    font-size: 16px;
    cursor: pointer;
    color: @sub-color;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    &.clear {
      display: none;
    }
  }
  &-box:hover &-icon.clear {
    display: inline-flex;
  }
  &-prepend + &-box &-input {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  &-box.hasAppend &-input {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  &-default &-input {
    height: @size-normal;
  }
  &-small &-input {
    height: @size-small;
  }
  &-large &-input {
    height: @size-large;
  }
  &-default &-icon {
    width: @size-normal;
  }
  &-small &-icon {
    width: @size-small;
  }
  &-large &-icon {
    width: @size-large;
  }
  &-default &-icon + &-input {
    padding-right: @size-normal;
  }
  &-small &-icon + &-input {
    padding-right: @size-small;
  }
  &-large &-icon + &-input {
    padding-right: @size-large;
  }
}
</style>