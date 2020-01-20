<template>
  <i :class="[`ion-${type}`, 'ui-icon']" :style="styles" v-on="$listeners"></i>
</template>
<script>
export default {
  name: 'UiIcon',
  props: {
    type: String,
    size: [Number, String],
    color: String
  },
  computed: {
    styles() {
      return {
        color: this.color,
        fontSize: this.size && `${parseInt(this.size)}px`
      }
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
  vertical-align: middle;
  -webkit-font-smoothing: antialiased;
}
</style>