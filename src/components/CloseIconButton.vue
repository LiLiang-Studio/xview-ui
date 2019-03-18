<template>
  <UiIcon class="ui-close-icon-button" type="ios-close-empty" @click="$emit('click', $event)"/>
</template>
<script>
import UiIcon from './Icon'
export default {
  components: { UiIcon }
}
</script>
<style lang="less">
.ui-close-icon-button {
  cursor: pointer;
  color: #999;
  font-size: 22px;
  transition: color .2s ease;
  &:hover {
    color: #444;
  }
}
</style>