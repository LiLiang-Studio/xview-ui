<template>
  <x-popper v-bind="popperProps" v-on="popperListeners">
    <template v-slot:reference>
      <slot>
        <x-input v-bind="inputProps" @click="onClick"/>
      </slot>
    </template>
    <x-time-list :data="hours"/>
    <x-time-list :data="minutes"/>
    <x-time-list :data="seconds"/>
  </x-popper>
</template>
<script>
import XBtn from '../button'
import XInput from '../input'
import XPopper from '../popper'
import XTimeList from './TimeList.vue'
import { mixins, genNums } from './utils'
const A = Array
export default {
  mixins: [mixins],
  name: 'XTimePicker',
  components: { XBtn, XInput, XPopper, XTimeList },
  props: {
    type: {
      validator: v => ['time', 'timerange'].indexOf(v) > -1
    },
    steps: { type: A, default: () => [] },
    disabledHours: A,
    disabledMinutes: A,
    disabledSeconds: A,
    hideDisabledOptions: Boolean
  },
  computed: {
    hours() {
      let nums = genNums(24)
      if (this.disabledHours) {
        if (this.hideDisabledOptions) return nums.filter(_ => this.disabledHours.indexOf(+_.val) < 0)
        nums.forEach(_ => this.disabledHours.indexOf(+_.val) > -1 && (_.disabled = true)) 
      }
      return nums
    },
    minutes() {
      let nums = genNums(60) 
      if (this.disabledMinutes) {
        if (this.hideDisabledOptions) return nums.filter(_ => this.disabledMinutes.indexOf(+_.val) < 0)
        nums.forEach(_ => this.disabledMinutes.indexOf(+_.val) > -1 && (_.disabled = true)) 
      }
      return nums
    },
    seconds() {
      let nums = genNums(60) 
      if (this.disabledSeconds) {
        if (this.hideDisabledOptions) return nums.filter(_ => this.disabledSeconds.indexOf(+_.val) < 0)
        nums.forEach(_ => this.disabledSeconds.indexOf(+_.val) > -1 && (_.disabled = true)) 
      }
      return nums
    }
  }
}
</script>
<style lang="less">

</style>