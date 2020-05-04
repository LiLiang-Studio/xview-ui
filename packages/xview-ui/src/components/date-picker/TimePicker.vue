<template>
  <x-popper v-bind="popperProps" v-on="popperListeners">
    <template v-slot:reference>
      <slot>
        <x-input v-bind="inputProps" @click="onClick"/>
      </slot>
    </template>
    <div v-if="isRange" class="x-time-picker_boxs">
      <x-time-picker-box title="开始时间" v-bind="{...boxProps, confirm: false}"/>
      <x-time-picker-box title="结束时间" v-bind="boxProps"/>
    </div>
    <x-time-picker-box v-else v-bind="boxProps"/>
  </x-popper>
</template>
<script>
import XInput from '../input'
import XPopper from '../popper'
import XTimePickerBox from './time/Picker.vue'
import { mixins } from './utils'
export default {
  mixins: [mixins],
  name: 'XTimePicker',
  components: { XInput, XPopper, XTimePickerBox },
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