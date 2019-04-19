<template>
  <div class="ui-form-item">
    <label class="ui-form-item-label" :style="labelStyle" :for="labelFor">
      <slot name="label">{{label}}</slot>
    </label>
    <div class="ui-form-item-content" :style="contentStyle">
      <slot></slot>
      <transition name="ui-fade">
        <div class="ui-form-item-error-tip"></div>
      </transition>
    </div>
  </div>
</template>
<script>
import { findParentByName } from './../../utils'
export default {
  data() {
    return {
      parent: null
    }
  },
  props: {
    prop: String,
    label: String,
    labelWidth: [Number, String],
    labelFor: String,
    required: Boolean,
    rules: [Object, Array],
    error: String,
    showMessage: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    lw() {
      let labelWidth = this.labelWidth || (this.parent && this.parent.labelWidth)
      if (labelWidth !== undefined) {
        return isNaN(labelWidth) ? labelWidth : `${labelWidth}px`
      }
    },
    labelStyle() {
      return this.lw && { width: this.lw }
    },
    contentStyle() {
      return this.lw && { marginLeft: this.lw }
    }
  },
  mounted() {
    this.parent = findParentByName(this, 'ui-form')
  }
}
</script>