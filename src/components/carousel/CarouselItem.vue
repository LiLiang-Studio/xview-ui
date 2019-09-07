<template>
  <div class="ui-carousel-item">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'UiCarouselItem',
  mounted() {
    this.$parent.addItem(this)
  },
  beforeDestroy() {
    this.$parent.removeItem(this)
  }
}
</script>