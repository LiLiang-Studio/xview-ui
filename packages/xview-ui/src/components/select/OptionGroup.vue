<template>
  <li class="ui-option-group">
    <span class="ui-option-group-title">{{label}}</span>
    <ul>
      <slot></slot>
    </ul>
  </li>
</template>
<script>
export default {
  props: { label: String }
}
</script>
<style lang="less">
.ui-option-group-title {
  padding-left: 8px;
  color: #999;
  font-size: 12px;
  height: 30px;
  line-height: 30px;
}
</style>