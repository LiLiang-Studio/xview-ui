<template>
  <div><slot></slot></div>
</template>
<script>
export default {
  name: 'XCheckboxGroup',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    size: {
      validator(v) {
        return ['small', 'default', 'large'].indexOf(v) !== -1
      }
    }
  },
  data() {
    return { data: this.value }
  },
  watch: {
    value(val) {
      this.data = val
    }
  },
  methods: {
    updateValue(value) {
      let index = this.data.indexOf(value)
      index === -1 ? this.data.push(value) : this.data.splice(index, 1)
      this.$emit('input', this.data)
      this.$emit('on-change', this.data)
    },
    includes(label) {
      return this.data.indexOf(label) !== -1
    }
  }
}
</script>