<template>
  <div>

  </div>
</template>
<script>
import { propsMixin } from './mixins'
export default {
  mixins: [propsMixin],
  props: {
    type: {
      default: 'time',
      validator(value) {
        return ['', ''].indexOf(value) !== -1
      }
    },
    format: {
      type: String,
      default: 'HH:mm:ss'
    },
    steps: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style lang="less">

</style>