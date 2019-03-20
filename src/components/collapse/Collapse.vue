<template>
  <div class="ui-collapse">
    <slot></slot>
  </div>
</template>
<script>
import { getType } from '../../utils'
export default {
  name: 'ui-collapse',
  data() {
    return {
      childrens: [],
      names: this.initModel()
    }
  },
  props: {
    accordion: Boolean,
    value: [Array, String]
  },
  watch: {
    value(newVal) {
      this.names = this.initModel()
    }
  },
  methods: {
    includes(name) {
      return this.names.indexOf(name) !== -1
    },
    initModel() {
      return getType(this.value) === 'array' ? this.value : [this.value]
    },
    updateModel(name) {
        let index = this.names.indexOf(name)
        if (this.accordion) {
          this.names = index === -1 ? [name] : []
          this.childrens.forEach(_ => {
            if (_.name !== name) _.fold()
          })
        } else {
          if (index === -1) {
            this.names.push(name)
          } else {
            this.names.splice(index, 1)
          }
        }
      
      this.$emit('input', this.names)
      this.$emit('on-change', this.names)
    },
    addChild(vm) {
      this.childrens.push(vm)
    }
  }
}
</script>
<style lang="less">
.ui-collapse {
  border-radius: 3px;
  background-color: @bg-color;
  border: 1px solid @border-color;
}
</style>