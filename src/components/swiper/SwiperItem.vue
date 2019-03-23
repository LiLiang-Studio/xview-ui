<template>
  <div class="ui-swiper-item" :style="styles">
    <slot></slot>
  </div>
</template>
<script>
import { findParentByName } from './../../utils'
export default {
  data() {
    return {
      styles: {}
    }
  },
  mounted() {
    let parent = findParentByName(this, 'ui-swiper')
    if (parent) {
      parent.addChild(this)
      this.$nextTick(() => {
        this.styles = {
          width: `${parent.getWidth()}px`
        }
      })
    }
  }
}
</script>