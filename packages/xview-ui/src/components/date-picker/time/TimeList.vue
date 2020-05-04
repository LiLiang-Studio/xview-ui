<template>
  <div :class="prefix">
    <ul>
      <li v-for="_ in data" :key="_.val" :class="{disabled: _.disabled}">{{_.val}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'XTimeList',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return { prefix: 'x-time-list' }
  }
}
</script>
<style lang="less">
@import url("../../../styles/vars.less");
.x-time-list {
  width: 56px;
  max-height: 144px;
  float: left;
  overflow: hidden;
  border-right: 1px solid @divider-color;
  &:hover {
    overflow: auto;
  }
  li {
    cursor: pointer;
    list-style: none;
    padding-left: 16px;
    height: 24px;
    line-height: 24px;
    &:not(.disabled):hover, &:not(.disabled).active {
      background: darken(@bg-color, 2%);
    }
    &.active {
      color: @primary-color;
    }
    &.disabled {
      cursor: not-allowed;
      color: @disabled-color;
    }
  }
}
</style>