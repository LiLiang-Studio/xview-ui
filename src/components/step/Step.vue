<template>
  <div class="ui-steps-item">

  </div>
</template>
<script>
export default {
  props: {
    status: {
      default: 'process',
      validator(value) {
        return ['wait', 'process', 'finish', 'error'].indexOf(value) !== -1
      }
    },
    title: String,
    content: String,
    icon: String
  }
}
</script>
<style lang="less">

</style>