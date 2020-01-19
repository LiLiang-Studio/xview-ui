<template>
  <div :class="[prefixCls, !isArea && `${prefixCls}-${size}`]">
    <div v-if="$slots.prepend" :class="`${prefixCls}-prepend`">
      <slot name="prepend"></slot>
    </div>
    <div :class="[`${prefixCls}-box`, {hasAppend: hasAppend || hasSearchAppend}]">
      <textarea v-if="isArea" v-bind="bindProps" :class="`${prefixCls}-input textarea`" v-on="listeners"></textarea>
      <template v-else>
        <span v-if="hasPrefix" :class="`${prefixCls}-prefix`">
          <slot name="prefix">
            <ui-icon :type="prefix"/>
          </slot>
        </span>
        <span v-if="clearable && value" :class="`${prefixCls}-suffix clear`" @click="clear">
          <ui-icon type="ios-close"/>
        </span>
        <span v-else-if="hasSuffix" :class="`${prefixCls}-suffix`">
          <slot name="suffix">
            <ui-icon :type="suffix"/>
          </slot>
        </span>
        <span v-else-if="icon" :class="`${prefixCls}-suffix`" @click="onIconClick">
          <ui-icon :type="icon"/>
        </span>
        <span v-else-if="search && !enterButton" :class="`${prefixCls}-suffix search`" @click="onSearch">
          <ui-icon type="ios-search"/>
        </span>
        <input v-bind="bindProps" :class="`${prefixCls}-input`" v-on="listeners">
      </template>
    </div>
    <div v-if="hasAppend" :class="`${prefixCls}-append`">
      <slot name="append">
      </slot>
    </div>
    <div v-else-if="hasSearchAppend" :class="`${prefixCls}-search`" @click="onSearch">
      <ui-icon v-if="enterButton === true" type="ios-search"/>
      <template v-else>{{enterButton}}</template>
    </div>
  </div>
</template>
<script>
import UiIcon from '../icon'
import { setAutoHeight } from '../../tools'
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
    hasPrefix() {
      return this.prefix || this.$slots.prefix
    },
    hasSuffix() {
      return this.suffix || this.$slots.suffix
    },
    hasAppend() {
      return this.$slots.append
    },
    hasSearchAppend() {
      return this.search && this.enterButton
    },
    isArea() {
      return this.$attrs.type === 'textarea'
    },
    bindProps() {
      let { autosize = false, rows } = this
      if (autosize.minRows && autosize.minRows > rows) {
        rows = autosize.minRows
      } else if (autosize.maxRows && autosize.maxRows < rows) {
        rows = autosize.maxRows
      }
      return { ...this.$attrs, rows, ref: 'Input', value: this.value }
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
        focus(event) {
          that.$emit('on-focus', event)
        },
        blur() {
          that.$emit('on-blur')
        },
        change(event) {
          that.$emit('on-change', event)
        },
        keyup(event) {
          that.$emit('on-keyup', event)
          if (event.keyCode === 13) {
            that.$emit('on-enter')
            if (that.search) that.onSearch()
          }
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
      this.$refs.Input.focus()
    },
    clear() {
      this.$emit('input', '')
    },
    onIconClick() {
      this.$emit('on-click')
    },
    onSearch() {
      this.focus()
      this.$emit('on-search', this.$refs.Input.value)
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
    font-family: inherit;
    transition: border .2s ease-in-out, box-shadow .2s ease-in-out;
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
  &-prefix, &-suffix {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 1;
    font-size: 16px;
    color: @sub-color;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  &-prefix {
    left: 0;
  }
  &-suffix {
    right: 0;
    &.search {
      cursor: pointer;
    }
    &.clear {
      display: none;
    }
  }
  &-box:hover &-suffix.clear {
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
  &-default &-prefix, &-default &-suffix {
    width: @size-normal;
  }
  &-small &-prefix, &-small &-suffix {
    width: @size-small;
  }
  &-large &-prefix, &-large &-suffix {
    width: @size-large;
  }
  &-default &-prefix + &-input {
    padding-left: @size-normal;
  }
  &-small &-prefix + &-input {
    padding-left: @size-small;
  }
  &-large &-prefix + &-input {
    padding-left: @size-large;
  }
  &-default &-suffix + &-input {
    padding-right: @size-normal;
  }
  &-small &-suffix + &-input {
    padding-right: @size-small;
  }
  &-large &-suffix + &-input {
    padding-right: @size-large;
  }
  &-search {
    padding: 0 16px;
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    border-radius: 0 4px 4px 0;
    transition: all .2s ease-in-out;
    &:hover {
      background-color: lighten(@primary-color, 8%);
    }
    &, &:active {
      background-color: @primary-color;
    }
  }
}
</style>