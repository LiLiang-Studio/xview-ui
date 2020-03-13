<template>
  <div class="x-notice-wrapper">
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
.x-notice-wrapper {
  position: fixed;
  top: 24px;
  right: 0;
  left: 0;
  font-size: 14px;
  pointer-events: none;
}
</style>