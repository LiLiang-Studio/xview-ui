<template>
  <span :class="[prefix, {textInside}]" v-if="!hideInfo">
    <slot>
      <x-icon v-if="icon" :type="icon"/>
      <span :class="`${prefix}_text`" v-else>{{Math.min(percent, 100)}}%</span>
    </slot>
  </span>
</template>
<script>
import props from './props'
import XIcon from '../icon'
export default {
  components: { XIcon },
  props,
  data() {
    return { prefix: 'x-progress-info' }
  },
  computed: {
    icon() {
      return !this.textInside && ({ wrong: 'ios-close', success: 'ios-checkmark' })[this.status]
    }
  }
}
</script>