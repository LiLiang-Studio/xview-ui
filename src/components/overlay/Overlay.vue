<template>
  <transition name="ui-overlay">
    <div class="ui-overlay" v-on="$listeners"></div>
  </transition>
</template>
<script>
export default {
  name: 'UiOverlay'
}
</script>
<style lang="less">
.ui-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(55, 55, 55, .6);
  transition: opacity .3s ease-in-out;
  &-enter, &-leave-to {
    opacity: 0;
  }
}
</style>