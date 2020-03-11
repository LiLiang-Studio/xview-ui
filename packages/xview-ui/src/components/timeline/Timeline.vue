<template>
  <ul class="x-timeline" :class="{pending}">
    <slot></slot>
  </ul>
</template>
<script>
export default {
  name: 'XTimeline',
  props: { pending: Boolean }
}
</script>