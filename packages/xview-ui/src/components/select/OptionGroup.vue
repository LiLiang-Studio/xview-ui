<template>
  <li>
    <span class="x-option-group_title">{{label}}</span>
    <ul><slot></slot></ul>
  </li>
</template>
<script>
export default {
  props: { label: String }
}
</script>
<style lang="less">
.x-option-group_title {
  height: 30px;
  line-height: 30px;
  color: #999;
  font-size: 12px;
  padding-left: 8px;
}
</style>