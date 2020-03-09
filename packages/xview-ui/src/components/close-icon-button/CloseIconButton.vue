<template>
  <x-icon class="x-close-icon-button" type="ios-close-empty" :style="styles" v-on="$listeners"/>
</template>
<script>
import XIcon from '../icon'
import { parseSize } from '../../tools'
export default {
  name: 'XCloseIconButton',
  components: { XIcon },
  props: {
    size: {
      type: [Number, String],
      default: 22
    }
  },
  computed: {
    styles() {
      return { fontSize: parseSize(this.size) }
    }
  }
}
</script>
<style lang="less">
.x-close-icon-button {
  cursor: pointer;
  color: #999;
  transition: color .2s ease;
  &:hover {
    color: #444;
  }
}
</style>