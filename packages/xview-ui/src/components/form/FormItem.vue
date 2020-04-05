<template>
  <div :class="prefix">
    <label v-if="hasLabel" :class="`${prefix}-label`" :style="labelStyle">
      <slot name="label">{{label}}</slot>
    </label>
    <div :class="`${prefix}-content`">
      <slot></slot>
      <transition name="x-animate-fade">
        <div v-if="showMsg" :class="`${prefix}-error-tip`"></div>
      </transition>
    </div>
  </div>
</template>
<script>
import { findParent, parseSize } from '../../tools'
export default {
  name: 'UiFormItem',
  data() {
    return { prefix: 'ui-form-item', parent: null }
  },
  props: {
    prop: String,
    label: String,
    labelWidth: [Number, String],
    rules: [Object, Array],
    showMessage: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    lw() {
      return this.labelWidth || (this.parent && this.parent.labelWidth)
    },
    hasLabel() {
      return this.label || this.$slots.label !== undefined || this.lw
    },
    labelStyle() {
      return this.lw && { width: parseSize(this.lw) }
    },
    showMsg() {
      return this.showMessage && this.parent && this.parent.showMessage
    }
  },
  mounted() {
    this.parent = findParent(this, 'UiForm')
    this.parent.addItem(this)
  },
  beforeDestroy() {
    this.parent.removeItem(this)
  }
}
</script>