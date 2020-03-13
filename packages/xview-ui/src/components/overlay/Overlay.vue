<template>
  <transition name="x-overlay">
    <div class="x-overlay" v-on="$listeners"></div>
  </transition>
</template>
<script>
export default {
  name: 'XOverlay'
}
</script>
<style lang="less">
.x-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: opacity .3s ease-in-out;
  background-color: rgba(55, 55, 55, .6);
  &-enter, &-leave-to {
    opacity: 0;
  }
}
</style>