<template>
  <x-popper v-bind="popperProps" v-on="popperListeners">
    <template v-slot:reference>
      <slot>
        <x-input v-bind="inputProps" @click="onClick"/>
      </slot>
    </template>
    <div>
      占位
    </div>
  </x-popper>
</template>
<script>
import XBtn from '../button'
import XInput from '../input'
import XPopper from '../popper'
import { mixins } from './utils'
const A = Array
export default {
  mixins: [mixins],
  name: 'XTimePicker',
  components: { XBtn, XInput, XPopper },
  props: {
    type: {
      validator: v => ['time', 'timerange'].indexOf(v) > -1
    },
    steps: { type: A, default: () => [] },
    disabledHours: A,
    disabledMinutes: A,
    disabledSeconds: A,
    hideDisabledOptions: Boolean
  }
}
</script>
<style lang="less">

</style>