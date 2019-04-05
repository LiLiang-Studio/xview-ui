<template>
  <div class="ui-icircle">
  </div>
</template>
<script>
export default {
  props: {
    percent: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 120
    },
    strokeLinecap: {
      type: String,
      default: 'round'
    },
    strokeWidth: {
      type: Number,
      default: 6
    },
    strokeColor: {
      type: String,
      default: '#2db7f5'
    },
    trailWidth: {
      type: Number,
      default: 5
    },
    trailColor: {
      type: String,
      default: '#eaeef2'
    }
  }
}
</script>
<style lang="less">

</style>