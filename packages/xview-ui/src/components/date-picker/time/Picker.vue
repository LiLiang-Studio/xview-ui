<template>
  <div :class="prefix">
    <div :class="`${prefix}_title`" v-if="title">{{title}}</div>
    <div :class="[`${prefix}_lists`, {bottomBorder}]">
      <x-time-list v-if="boxVisible.hours" :data="hours"/>
      <x-time-list v-if="boxVisible.minutes" :data="minutes"/>
      <x-time-list v-if="boxVisible.seconds" :data="seconds"/>
    </div>
    <div v-if="confirm" :class="`${prefix}_btns`">
      <x-btn size="small">清空</x-btn>
      <x-btn size="small" type="primary">确定</x-btn>
    </div>
  </div>
</template>
<script>
import XBtn from '../../button'
import XTimeList from './TimeList.vue'
import { genNums } from '../utils'
import { formatDate } from '../../../tools'
const A = Array
export default {
  name: 'XTimePickerBox',
  components: { XBtn, XTimeList },
  props: {
    title: String,
    confirm: Boolean,
    bottomBorder: Boolean,
    disabledHours: A,
    disabledMinutes: A,
    disabledSeconds: A,
    hideDisabledOptions: Boolean,
    steps: { type: A, default: () => [] }
  },
  data() {
    return { prefix: 'x-time-picker-box' }
  },
  computed: {
    hours() {
      let nums = genNums(24, this.steps[0])
      if (this.disabledHours) {
        if (this.hideDisabledOptions) return nums.filter(_ => this.disabledHours.indexOf(+_.val) < 0)
        nums.forEach(_ => this.disabledHours.indexOf(+_.val) > -1 && (_.disabled = true)) 
      }
      return nums
    },
    minutes() {
      let nums = genNums(60, this.steps[1]) 
      if (this.disabledMinutes) {
        if (this.hideDisabledOptions) return nums.filter(_ => this.disabledMinutes.indexOf(+_.val) < 0)
        nums.forEach(_ => this.disabledMinutes.indexOf(+_.val) > -1 && (_.disabled = true)) 
      }
      return nums
    },
    seconds() {
      let nums = genNums(60, this.steps[2]) 
      if (this.disabledSeconds) {
        if (this.hideDisabledOptions) return nums.filter(_ => this.disabledSeconds.indexOf(+_.val) < 0)
        nums.forEach(_ => this.disabledSeconds.indexOf(+_.val) > -1 && (_.disabled = true)) 
      }
      return nums
    },
    boxVisible() {
      let { format } = this.$attrs
      return {
        hours: formatDate.hasHours(format),
        minutes: formatDate.hasMinutes(format),
        seconds: formatDate.hasSeconds(format)
      }
    }
  }
}
</script>
<style lang="less">
@import url("../../../styles/vars.less");
.x-time-picker-box {
  & + & &_lists {
    border-left: 3px solid @divider-color;
  }
  &_title, &_btns {
    padding: 8px;
  }
  &_lists.bottomBorder, &_title {
    border-bottom: 1px solid @divider-color;
  }
  &_title {
    text-align: center;
  }
  &_lists {
    overflow: hidden;
  }
  &_btns {
    text-align: right;
  }
}
</style>