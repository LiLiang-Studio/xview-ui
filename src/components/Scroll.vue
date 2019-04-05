<template>
  <div class="ui-scroll">

  </div>
</template>
<script>
export default {
  props: {
    height: {
      type: [String, Number],
      default: 300
    },
    loadingText: {
      type: String,
      default: '加载中'
    },
    onReachTop: Function,
    onReachBottom: Function,
    onReachEdge: Function,
    distanceToEdge: {
      type: [Number, Array],
      default: [20, 20]
    }
  }
}
</script>
<style lang="less">

</style>