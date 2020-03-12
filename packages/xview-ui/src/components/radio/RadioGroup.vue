<template>
  <div v-bind="bindProps"><slot></slot></div>
</template>
<script>
import XBtnGroup from '../button-group'
export default {
  name: 'XRadioGroup',
  props: {
    value: [String, Number],
    type: {
      validator(v) {
        return v === 'button'
      }
    },
    size: {
      validator(v) {
        return ['large', 'small', 'default'].indexOf(v) !== -1
      }
    },
    vertical: Boolean
  },
  data() {
    return { checkedValue: this.value }
  },
  computed: {
    bindProps() {
      let prefix = 'x-radio-group', { vertical } = this
      return this.type === 'button' ? { is: XBtnGroup, class: prefix } : { class: [prefix, { vertical }] }
    }
  },
  watch: {
    value(val) {
      this.checkedValue = val
    },
    checkedValue(val) {
      this.$emit('input', val)
    }
  },
  methods: {
    update(label) {
      this.checkedValue = label
      this.$emit('on-change', label)
    }
  }
}
</script>