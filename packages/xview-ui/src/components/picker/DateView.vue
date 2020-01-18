<template>
  <div class="ui-datepicker-dateview">
    <span class="ui-datepicker-dateview-cell disabled" v-for="cell in weeks" :key="cell">
      <span>{{cell}}</span>
    </span>
    <span class="ui-datepicker-dateview-cell" v-for="cell in dayCount" :key="cell">
      <span>{{cell}}</span>
    </span>
  </div>
</template>
<script>
const nowDate = new Date()
export default {
  data() {
    return {
      weeks: ['日', '一', '二', '三', '四', '五', '六']
    }
  },
  props: {
    date: {
      type: Date,
      default: () => new Date()
    }
  },
  computed: {
    dayCount() {
      return new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate()
    },
    firstDayOfWeek() {
      let date = new Date(this.date)
      date.setDate(1)
      return date.getDay()
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.ui-datepicker-dateview {
  padding: 10px;
}

.ui-datepicker-dateview-cell {
  display: inline-block;
  width: 28px;
  height: 28px;
  line-height: 24px;
  text-align: center;
  padding: 2px;
  cursor: pointer;
  span {
    display: inline-block;
    width: 100%;
    height: 100%;
    border-radius: 3px;
    transition: all .2s ease-in-out;
  }
  &.disabled {
    color: @disabled-color;
  }
  &:not(.disabled):hover span {
    background-color: lighten(@primary-color, 39%);
  }
}
</style>