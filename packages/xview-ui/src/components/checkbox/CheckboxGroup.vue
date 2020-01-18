<template>
  <div class="ui-checkbox-group" :class="size">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'UiCheckboxGroup',
  data() {
    return { checkedArray: this.value }
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    size: {
      validator(value) {
        return ['small', 'default', 'large'].indexOf(value) !== -1
      }
    }
  },
  watch: {
    value(newVal) {
      this.checkedArray = newVal
    }
  },
  methods: {
    updateValue(value) {
      let index = this.checkedArray.indexOf(value)
      if (index === -1) {
        this.checkedArray.push(value)
      } else {
        this.checkedArray.splice(index, 1)
      }
      this.$emit('input', this.checkedArray)
      this.$emit('on-change', this.checkedArray)
    },
    includes(label) {
      return this.checkedArray.indexOf(label) !== -1
    }
  }
}
</script>