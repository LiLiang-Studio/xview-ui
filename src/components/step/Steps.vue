<template>
  <div class="ui-steps">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    current: {
      type: Number,
      default: 0
    },
    status: {
      default: 'process',
      validator(value) {
        return ['wait', 'process', 'finish', 'error'].indexOf(value) !== -1
      }
    },
    size: {
      validator(value) {
        return value === 'small'
      }
    },
    direction: {
      default: 'horizontal',
      validator(value) {
        return ['horizontal', 'vertical'].indexOf(value) !== -1
      }
    }
  }
}
</script>
<style lang="less">

</style>