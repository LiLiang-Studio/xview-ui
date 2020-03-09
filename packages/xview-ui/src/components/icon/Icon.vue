<template>
  <i :class="classes" :style="styles" v-on="$listeners"></i>
</template>
<script>
export default {
  name: 'XIcon',
  props: {
    type: String,
    color: String,
    custom: String,
    size: [Number, String]
  },
  computed: {
    styles() {
      return { color: this.color, fontSize: this.size && `${parseInt(this.size)}px` }
    },
    classes() {
      return ['x-icon', this.custom || `ion-${this.type}`]
    }
  }
}
</script>
<style lang="less">
.x-icon {
  font-family: Ionicons;
  font-style: normal;
  line-height: 1;
  padding: 0 3px;
}
</style>