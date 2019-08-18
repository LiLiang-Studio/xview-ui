<template>
  <div class="ui-input" :class="{hasSlot: hasPrependSlot || hasAppendSlot}">
    <div v-if="hasSlot && hasPrependSlot" class="ui-input-prepend">
      <slot name="prepend"></slot>
    </div>
    <div class="ui-input-box">
      <textarea v-if="isTextarea"
        v-bind="mergedProps"
        :value="inputValue"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        @keyup="handleKeyup"
        @keydown="handleKeydown"
        @keypress="handleKeypress"
        class="ui-input-input textarea"></textarea>
      <template v-else>
        <UiIcon v-if="icon" class="ui-input-icon" :class="size" :type="icon" @click="handleIconClick"/>
        <UiIcon v-if="showClearIcon" class="ui-input-icon clear" :class="size" type="ios-close" @click="clear"/>
        <input v-bind="mergedProps"
          class="ui-input-input"
          :value="inputValue"
          :class="size"
          :type="type"
          @input="handleInput"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
          @keyup="handleKeyup"
          @keydown="handleKeydown"
          @keypress="handleKeypress">
      </template>
    </div>
    <div v-if="hasSlot && hasAppendSlot" class="ui-input-append">
      <slot name="append"></slot>
    </div>
  </div>
</template>
<script>
import UiIcon from './Icon.vue'
import { setAutoHeight } from '../utils'
export default {
  components: { UiIcon },
  data() {
    return {
      hasPrependSlot: false,
      hasAppendSlot: false,
      inputValue: this.value
    }
  },
  props: {
    type: {
      default: 'text',
      validator(value) {
        return ['text', 'password', 'textarea', 'url', 'email', 'date'].indexOf(value) !== -1
      }
    },
    value: [String, Number],
    size: {
      default: 'default',
      validator(value) {
        return ['small', 'default', 'large'].indexOf(value) !== -1
      }
    },
    placeholder: String,
    clearable: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    maxlength: [Number, String],
    icon: String,
    rows: {
      type: [Number, String],
      default: 2
    },
    autosize: [Boolean, Object],
    autofocus: Boolean,
    autocomplete: String,
    elementId: String,
    spellcheck: Boolean,
    wrap: String
  },
  computed: {
    hasSlot() {
      return this.type === 'text'
    },
    isTextarea() {
      return this.type === 'textarea'
    },
    mergedProps() {
      let { icon, size, type, value, autosize, clearable, elementId: id, rows, ...props } = this.$props
      if (typeof autosize === 'object') {
        if (autosize.minRows && autosize.minRows > rows) {
          rows = autosize.minRows
        } else if (autosize.maxRows && autosize.maxRows < rows) {
          rows = autosize.maxRows
        }
      }
      return { ...props, id, rows, ref: 'input' }
    },
    showClearIcon() {
      return this.clearable && !this.icon && this.inputValue
    }
  },
  watch: {
    value(newVal) {
      this.inputValue = newVal
    }
  },
  methods: {
    focus() {
      this.$refs.input.focus()
    },
    clear() {
      this.inputValue = ''
      this.$emit('input', this.inputValue)
    },
    handleInput(event) {
      if (this.isTextarea && this.autosize) {
        if (typeof this.autosize === 'boolean') {
          setAutoHeight(event.target)
        } else {
          setAutoHeight(event.target, this.autosize.minRows, this.autosize.maxRows)
        }
      }
      this.inputValue = event.target.value
      this.$emit('input', this.inputValue)
    },
    handleIconClick(event) {
      this.$emit('on-click', event)
    },
    handleChange(event) {
      this.$emit('on-change', event)
    },
    handleFocus(event) {
      this.$emit('on-focus', event)
    },
    handleBlur(event) {
      this.$emit('on-blur', event)
    },
    handleKeyup(event) {
      this.$emit('on-keyup', event)
      if (event.keyCode === 13) {
        this.$emit('on-enter', event)
      }
    },
    handleKeydown(event) {
      this.$emit('on-keydown', event)
    },
    handleKeypress(event) {
      this.$emit('on-keypress', event)
    }
  },
  mounted() {
    this.hasPrependSlot = this.$slots.prepend !== undefined
    this.hasAppendSlot = this.$slots.append !== undefined
  }
}
</script>
<style lang="less">
@import url("../styles/vars.less");
.ui-input, .ui-input-input {
  display: inline-block;
  width: 100%;
}

.ui-input.hasSlot {
  display: table;
  border-collapse: separate;
  .ui-input-prepend, .ui-input-append, .ui-input-input {
    display: table-cell;
    color: @content-color;
  }
  .ui-input-prepend, .ui-input-append {
    background-color: #eee;
    padding: 0 7px;
    line-height: 1;
    vertical-align: middle;
    border: 1px solid @border-color;
    width: 1px;
    white-space: nowrap;
  }
  .ui-input-prepend {
    border-radius: 6px 0 0 6px;
    border-right: none;
  }
  .ui-input-append {
    border-radius: 0 6px 6px 0;
    border-left: none;
  }
  .ui-input-input {
    border-radius: 0;
  }
}

.ui-input-box {
  position: relative;
  &:hover .ui-input-icon.clear {
    display: flex;
  }
}

.ui-input-input {
  height: @form-control-normal;
  line-height: 1.5;
  padding: 0 7px;
  font-size: 12px;
  border: 1px solid @border-color;
  border-radius: 4px;
  outline: none;
  color: @content-color;
  background-color: #fff;
  transition: border .2s ease-in-out, box-shadow .2s ease-in-out;
  font-family: inherit;
  &.textarea {
    padding: 4px 7px;
    height: auto;
  }
  &:disabled {
    cursor: not-allowed;
    color: @disabled-color;
    background-color: @disabled-bg-color;
  }
  &.small {
    height: @form-control-small;
  }
  &.large {
    height: @form-control-large;
  }
  &::placeholder {
    color: @disabled-color;
  }
  &:hover:not(:disabled), &:focus {
    border-color: @primary-light-color;
  }
  &:focus {
    .form-control-shadow(@primary-color);
  }
}

.ui-input-icon {
  width: @form-control-normal;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: @sub-color;
  z-index: 1;
  cursor: pointer;
  &.clear {
    display: none;
  }
  &.small {
    width: @form-control-small;
  }
  &.large {
    width: @form-control-large;
  }
  + .ui-input-input {
    padding-right: @form-control-normal;
    &.small {
      padding-right: @form-control-small;
    }
    &.large {
      padding-right: @form-control-large;
    }
  }
}
</style>