<template>
  <i :class="['ui-icon', `ion-${type}`]" :style="{fontSize, color}" @click="$emit('click', $event)"></i>
</template>
<script>
export default {
  props: {
    type: String,
    size: [Number, String],
    color: String
  },
  computed: {
    fontSize() {
      return this.size && parseInt(this.size) + 'px'
    }
  }
}
</script>
<style lang="less">
.ui-icon {
  display: inline-block;
  font-family: Ionicons;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  text-rendering: auto;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
}
</style>