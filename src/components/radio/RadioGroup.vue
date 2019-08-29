<template>
  <ButtonGroup v-if="type === 'button'" class="ui-radio-group isButtonType" :size="size">
    <slot></slot>
  </ButtonGroup>
  <div v-else class="ui-radio-group" :class="{vertical}">
    <slot></slot>
  </div>
</template>
<script>
import { ButtonGroup } from '../button'
export default {
  name: 'UiRadioGroup',
  components: { ButtonGroup },
  data() {
    return { checkedValue: this.value, childs: [] }
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
  watch: {
    value(newVal) {
      this.checkedValue = newVal
    }
  },
  methods: {
    addChild(vm) {
      this.childs.push(vm)
    },
    updateValue(vm) {
      this.childs.forEach(_ => _.checked = false)
      vm.checked = true
      this.checkedValue = vm.label
      this.$emit('input', this.checkedValue)
      this.$emit('on-change', this.checkedValue)
    }
  }
}
</script>