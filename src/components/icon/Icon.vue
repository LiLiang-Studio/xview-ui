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
      let fontSize = this.size && `${parseInt(this.size)}px`
      return { fontSize, color: this.color }
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