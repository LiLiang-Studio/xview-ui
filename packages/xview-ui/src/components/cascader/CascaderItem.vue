<template>
  <li :class="[prefix, {selected}]">
    <span :class="`${prefix}_label`">{{option.label}}</span>
    <template v-if="option.children">
      <x-loading v-if="option.loading" :iconClass="`${prefix}_loadingIcon`" loading/>
      <x-icon v-else type="ios-arrow-right"/>
    </template>
  </li>
</template>
<script>
import XIcon from '../icon'
import XLoading from './../scroll/Loading.vue'
export default {
  name: 'XCascaderItem',
  components: { XIcon, XLoading },
  props: { option: Object },
  data() {
    return { prefix: 'x-cascader-item', selected: false }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.x-cascader-item {
  cursor: pointer;
  list-style: none;
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 16px;
  transition: all .2s;
  &:hover, &.selected {
    background: darken(@bg-color, 2%);
  }
  &.selected {
    color: @primary-color;
  }
  &_label {
    flex: 1;
    margin-right: 20px;
  }
  &_loadingIcon {
    color: @content-color;
    font-size: 14px !important;
  }
}
</style>