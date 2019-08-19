<template>
  <UiIcon class="ui-close-icon-button" type="ios-close-empty" v-on="$listeners"/>
</template>
<script>
import UiIcon from '../icon'
export default {
  name: 'UiCloseIconButton',
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