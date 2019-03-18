<template>
  <div class="ui-checkbox-group" :class="size">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'ui-checkbox-group',
  data() {
    return {
      checkedArray: this.value
    }
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    size: {
      validator(value) {
        return !value || ['small', 'default', 'large'].indexOf(value) !== -1
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
      if (index !== -1) {
        this.checkedArray.splice(index, 1)
      } else {
        this.checkedArray.push(value)
      }
      this.$emit('input', this.checkedArray)
      this.$emit('on-change', this.checkedArray)
    },
    getValues() {
      return this.checkedArray
    }
  }
}
</script>