<template>
  <ul class="ui-timeline" :class="{pending}">
    <slot></slot>
  </ul>
</template>
<script>
export default {
  name: 'UiTimeline',
  props: { pending: Boolean }
}
</script>
<style lang="less">
.ui-timeline {
  list-style: none;
  &.pending &-item:nth-last-of-type(2) &-item--tail {
    border-left-style: dotted;
  }
}
</style>