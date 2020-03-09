<template>
  <span class="x-time" :is="hash ? 'a' : 'span'" :href="hash">{{convertedValue}}</span>
</template>
<script>
import { dateFormat } from '../../tools'
export default {
  name: 'XTime',
  props: {
    time: [Number, Date, String],
    type: {
      default: 'relative',
      validator(v) {
        return ['relative', 'date', 'datetime'].indexOf(v) !== -1
      }
    },
    interval: {
      type: Number,
      default: 60
    },
    hash: String
  },
  data() {
    return { convertedValue: '' }
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
      if (this.type === 'relative') this.tid = setInterval(this.convert, this.interval * 1000)
    },
    convert() {
      this.convertedValue = ({
        relative: this.convertRelTime(),
        date: dateFormat(this.time, 'yyyy-MM-dd'),
        datetime: dateFormat(this.time)
      })[this.type]
    },
    convertRelTime() {
      let ms = (Date.now() - new Date(this.time)) / 1000
      return ms < 60 ? 
        `${~~ms}秒前` : ms < 3600 ?
          `${~~(ms / 60)}分钟前` : ms < 86400 ?
            `${~~(ms / 3600)}小时前` : ms < 2592000 ?
              `${~~(ms / 86400)}天前` : ms < 31104000 ?
                `${~~(ms / 2592000)}个月前` : `${~~(ms / 31104000)}年前`
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.x-time {
  color: @content-color;
}
a.x-time:hover {
  color: @content-color;
  text-decoration: underline;
}
</style>