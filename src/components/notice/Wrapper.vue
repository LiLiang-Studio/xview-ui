<template>
  <div class="ui-notice-wrapper">
    <transition-group :name="transition" tag="div">
      <slot></slot>
    </transition-group>
  </div>
</template>
<script>
export default {
  props: {
    transition: String
  }
}
</script>
<style lang="less">
.ui-notice-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  pointer-events: none;
}
</style>