<template>
  <div class="x-carousel-item" @click="onClick">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'XCarouselItem',
  mounted() {
    this.$parent.addItem(this)
  },
  beforeDestroy() {
    this.$parent.removeItem(this)
  },
  methods: {
    onClick() {
      this.$parent.itemClick(this)
    }
  }
}
</script>