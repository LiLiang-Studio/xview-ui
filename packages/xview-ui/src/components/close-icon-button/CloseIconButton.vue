<template>
  <UiIcon class="ui-close-icon-button" type="ios-close-empty" :style="styles" v-on="$listeners"/>
</template>
<script>
import UiIcon from '../icon'
import { parseSize } from '../../tools'
export default {
  name: 'UiCloseIconButton',
  components: { UiIcon },
  props: {
    size: {
      type: [Number, String],
      default: 22
    }
  },
  computed: {
    styles() {
      let size = parseSize(this.size)
      return { width: size, fontSize: size }
    }
  }
}
</script>
<style lang="less">
.ui-close-icon-button {
  cursor: pointer;
  color: #999;
  text-align: center;
  transition: color .2s ease;
  &:hover {
    color: #444;
  }
}
</style>