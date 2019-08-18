<template>
  <UiButtonGroup class="ui-radio-group" :class="[{isButtonType}, size]" v-if="isButtonType">
    <slot></slot>
  </UiButtonGroup>
  <div v-else class="ui-radio-group" :class="[{isVertical}, size]">
    <slot></slot>
  </div>
</template>
<script>
import UiButtonGroup from './../button/ButtonGroup.vue'
export default {
  name: 'ui-radio-group',
  components: { UiButtonGroup },
  data() {
    return { checkedValue: this.value, children: [] }
  },
  props: {
    value: [String, Number],
    type: {
      validator(value) {
        return value === 'button'
      }
    },
    size: {
      validator(value) {
        return ['large', 'small', 'default'].indexOf(value) !== -1
      }
    },
    vertical: Boolean
  },
  computed: {
    isButtonType() {
      return this.type === 'button'
    },
    isVertical() {
      return this.vertical && !this.isButtonType
    }
  },
  watch: {
    value(newVal) {
      this.checkedValue = newVal
    }
  },
  methods: {
    addChild(vm) {
      this.children.push(vm)
    },
    updateValue(vm) {
      this.children.forEach(_ => _.checked = false)
      vm.checked = true
      this.checkedValue = vm.label
      this.$emit('input', vm.label)
      this.$emit('on-change', vm.label)
    }
  }
}
</script>