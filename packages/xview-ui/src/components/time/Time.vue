<template>
  <span class="ui-time" :is="tag" :href="hash">{{convertedValue}}</span>
</template>
<script>
import { dateFormat } from '../../tools'
export default {
  name: 'UiTime',
  data() {
    return { convertedValue: '' }
  },
  props: {
    time: [Number, Date, String],
    type: {
      default: 'relative',
      validator(value) {
        return ['relative', 'date', 'datetime'].indexOf(value) !== -1
      }
    },
    interval: {
      type: Number,
      default: 60
    },
    hash: String
  },
  computed: {
    tag() {
      return this.hash ? 'a' : 'span'
    }
  },
  mounted() {
    this.update()
  },
  beforeDestroy() {
    clearInterval(this.tid)
  },
  methods: {
    update() {
      this.convert()
      if (this.type !== 'relative') return
      this.tid = setInterval(() => this.convert(), this.interval * 1000)
    },
    convert() {
      this.convertedValue = ({
        relative: this.convertRelTime(),
        date: dateFormat(this.time, 'yyyy-MM-dd'),
        datetime: dateFormat(this.time, 'yyyy-MM-dd hh:mm:ss')
      })[this.type]
    },
    convertRelTime() {
      let ms = (Date.now() - new Date(this.time)) / 1000
      if (ms < 60) {
        return `${~~ms}秒前`
      } else if (ms < 3600) {
        return `${~~(ms / 60)}分钟前`
      } else if (ms < 86400) {
        return `${~~(ms / 3600)}小时前`
      } else if (ms < 2592000) {
        return `${~~(ms / 86400)}天前`
      } else if (ms < 31104000) {
        return `${~~(ms / 2592000)}个月前`
      }
      return `${~~(ms / 31104000)}年前`
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.ui-time {
  color: @content-color;
}
a.ui-time:hover {
  color: @content-color;
  text-decoration: underline;
}
</style>