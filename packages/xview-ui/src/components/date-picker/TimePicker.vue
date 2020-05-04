<template>
  <x-popper v-bind="popperProps" v-on="popperListeners">
    <template v-slot:reference>
      <slot>
        <x-input v-bind="inputProps" @click="onClick"/>
      </slot>
    </template>
    <div v-if="isRange" class="x-time-picker_boxs">
      <x-panel title="开始时间" v-bind="{...boxProps, confirm: false}"/>
      <x-panel title="结束时间" v-bind="boxProps"/>
    </div>
    <x-panel v-else v-bind="boxProps"/>
  </x-popper>
</template>
<script>
import XInput from '../input'
import XPopper from '../popper'
import XPanel from './time/Panel.vue'
import { mixins } from './utils'
export default {
  mixins: [mixins],
  name: 'XTimePicker',
  components: { XInput, XPopper, XPanel },
  props: {
    type: {
      validator: v => ['time', 'timerange'].indexOf(v) > -1
    },
    format: {
      type: String,
      default: 'HH:mm:ss'
    }
  },
  computed: {
    isRange() {
      return this.type === 'timerange'
    },
    boxProps() {
      return {
        ...this.$attrs,
        format: this.format,
        confirm: this.confirm,
        bottomBorder: this.confirm
      }
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.x-time-picker {
  &_boxs {
    display: flex;
  }
}
</style>