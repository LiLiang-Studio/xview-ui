<template>
  <ul class="ui-timeline" :class="{pending}">
    <slot></slot>
  </ul>
</template>
<script>
export default {
  props: {
    pending: Boolean
  }
}
</script>
<style lang="less">
.ui-timeline {
  list-style: none;
  &.pending .ui-timeline-item:nth-last-of-type(2) .ui-timeline-item-tail {
    border-left-style: dotted;
  }
}
</style>