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
  color: #444;
  opacity: .7;
  transition: opacity .2s ease;
  &:hover {
    opacity: 1;
  }
}
</style>