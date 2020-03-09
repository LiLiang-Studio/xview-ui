<template>
  <transition :name="prefix">
    <div :class="classes" :style="styles" @click="onClick">
      <span v-if="type === 'dot'" :class="`${prefix}_circle`" :style="dotStyle"></span>
      <slot></slot>
      <x-close-icon-button v-if="closable" :class="`${prefix}_close`" @click="onClose"/>
    </div>
  </transition>
</template>
<script>
import XCloseIconButton from '../close-icon-button'
export default {
  name: 'XTag',
  components: { XCloseIconButton },
  props: {
    closable: Boolean,
    checkable: Boolean,
    checked: {
      type: Boolean,
      default: true
    },
    type: {
      validator(v) {
        return ['border', 'dot'].indexOf(v) !== -1
      }
    },
    color: {
      type: String,
      default: 'default'
    },
    name: [String, Number],
    fade: {
      type: Boolean,
      default: true
    },
    size: {
      default: 'default',
      validator(v) {
        return ['large', 'medium', 'default'].indexOf(v) !== -1
      }
    }
  },
  data() {
    return { prefix: 'x-tag', isChecked: this.checked }
  },
  computed: {
    colorClass() {
      return ['default', 'primary', 'success', 'warning', 'error', 'blue', 'green', 'red', 'orange'].find(_ => _ === this.color)
    },
    classes() {
      let { prefix, colorClass, type, isChecked, fade, size, color, closable } = this
      return [
        prefix,
        !type && `${prefix}_size_${size}`,
        colorClass && `${prefix}_${colorClass}`,
        type && `${prefix}_${type}`,
        { checked: isChecked && !type, color: color && !colorClass, closable, fade }
      ]
    },
    styles() {
      return this.colorClass ?
        {} : this.type === 'border' ?
          { color: this.color } : this.type === 'dot' ?
            { borderColor: this.color } : this.isChecked ? 
              {} : { backgroundColor: this.color, color: '#fff' }
    },
    dotStyle() {
      return this.colorClass ? {} : { backgroundColor: this.color }
    }
  },
  watch: {
    checked(val) {
      this.isChecked = val
    }
  },
  methods: {
    onClose(e) {
      this.$emit('on-close', e, this.name)
    },
    onClick() {
      if (!this.checkable || this.type) return
      this.isChecked = !this.isChecked
      this.$emit('on-change', this.isChecked, this.name)
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
@prefix: .x-tag;
@{prefix} {
  position: relative;
  height: 22px;
  padding: 0 8px;
  margin: 2px 4px 2px 0;
  font-size: 12px;
  border-radius: 3px;
  border: 1px solid;
  color: @content-color;
  &, &_close {
    display: inline-flex;
    align-items: center;
  }
  &:hover {
    opacity: .85;
  }
  &.fade {
    transition: opacity .2s ease-in-out;
  }
  &.color:not(&_border):not(&_dot) {
    border: none;
  }
  &-enter, &-leave-to {
    opacity: 0 !important;
  }
  &_size_medium {
    height: 28px;
  }
  &_size_large {
    height: 32px;
  }
  &_primary, &_success, &_error, &_warning {
    border: none;
    &.checked {
      color: #fff;
    }
  }
  &.checked {
    &@{prefix}_primary {
      background-color: @primary-color;
    }
    &@{prefix}_success {
      background-color: @success-color;
    }
    &@{prefix}_error {
      background-color: @error-color;
    }
    &@{prefix}_warning {
      background-color: @warning-color;
    }
  }
  .color(@c, @val1: 46%, @val2: 30%) {
    color: @c;
    border-color: transparent;
    background-color: transparent;
    &.checked {
      border-color: lighten(@c, @val2);
      background-color: lighten(@c, @val1);
    }
  }
  &_default {
    .color(@content-color, 60%, 52%);
  }
  &_blue {
    .color(@primary-color, 42%);
  }
  &_green {
    .color(@success-color, 55%);
  }
  &_red {
    .color(@error-color);
  }
  &_orange {
    .color(@warning-color);
  }
  &_dot, &_border {
    background-color: #fff;
  }
  &_dot {
    height: 32px;
    border: 1px solid @divider-color;
  }
  &_circle {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 8px;
    background-color: @divider-color;
  }
  &_primary &_circle {
    background-color: @primary-color;
  }
  &_success &_circle {
    background-color: @success-color;
  }
  &_warning &_circle {
    background-color: @warning-color;
  }
  &_error &_circle {
    background-color: @error-color;
  }
  &_border {
    height: 24px;
    border: 1px solid;
    &.closable {
      padding-right: 0;
    }
    &@{prefix}_default {
      &, @{prefix}_close {
        border-color: @border-color;
      }
    }
    &@{prefix}_primary {
      color: @primary-color;
    }
    &@{prefix}_success {
      color: @success-color;
    }
    &@{prefix}_warning {
      color: @warning-color;
    }
    &@{prefix}_error {
      color: @error-color;
    }
    @{prefix}_close {
      padding: 0 8px;
      border-left: 1px solid;
    }
  }
  &_close {
    height: 100%;
    margin-left: 8px;
    color: currentColor;
  }
}
</style>