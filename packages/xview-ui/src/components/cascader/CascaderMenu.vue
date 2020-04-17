<template>
  <ul :class="prefix">
    <li v-for="_ in data" :key="_.value">
      <span :class="`${prefix}_label`">{{_.label}}</span>
      <x-icon type="ios-arrow-right"/>
    </li>
  </ul>
</template>
<script>
import XIcon from '../icon'
export default {
  name: 'XCascaderMenu',
  components: { XIcon },
  props: {
    data: Array
  },
  data() {
    return { prefix: 'x-cascader-menu' }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.x-cascader-menu {
  padding: 5px 0;
  li {
    cursor: pointer;
    list-style: none;
    height: 32px;
    line-height: 32px;
    padding: 0 16px;
    transition: all .2s;
    &:hover, &.selected {
      background: darken(@bg-color, 2%);
    }
    &.selected {
      color: @primary-color;
    }
  }
  &_label {
    margin-right: 20px;
  }
}
</style>