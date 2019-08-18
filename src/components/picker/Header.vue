<template>
  <div class="ui-datepicker-header">
    <span class="ui-datepicker-header-icon">
      <UiIcon type="ios-arrow-left"/>
      <UiIcon type="ios-arrow-left"/>
    </span>
    <span class="ui-datepicker-header-icon">
      <UiIcon type="ios-arrow-left"/>
    </span>
    <span class="ui-datepicker-header-labels">
      <span class="ui-datepicker-header-label">2019年</span>
      <span class="ui-datepicker-header-label">4月</span>
    </span>
    <span class="ui-datepicker-header-icon">
      <UiIcon type="ios-arrow-right"/>
    </span>
    <span class="ui-datepicker-header-icon">
      <UiIcon type="ios-arrow-right"/>
      <UiIcon type="ios-arrow-right"/>
    </span>
  </div>
</template>
<script>
import UiIcon from './../Icon.vue'
export default {
  components: { UiIcon }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.ui-datepicker-header {
  height: 32px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  text-align: center;
  border-bottom: 1px solid @divider-color;
}

.ui-datepicker-header-icon {
  width: 20px;
  height: 24px;
  line-height: 24px;
  font-size: 14px;
  cursor: pointer;
}

.ui-datepicker-header-labels {
  flex: 1;
}

.ui-datepicker-header-label {
  cursor: pointer;
  + .ui-datepicker-header-label {
    margin-left: 4px;
  }
}

.ui-datepicker-header-icon, .ui-datepicker-header-label {
  &:hover {
    color: @primary-color;
  }
}
</style>