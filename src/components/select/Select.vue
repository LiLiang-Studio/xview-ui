<template>
  <div class="ui-select">
    <div class="ui-select-selection" tabindex="-1">
      <input class="ui-select-input">
      <div class="ui-select-arrow">
        <UiIcon type="arrow-down-b"/>
      </div>
    </div>
    <div class="ui-select-dropdown">
      <ul><slot></slot></ul>
    </div>
  </div>
</template>
<script>
import UiIcon from './../Icon'
export default {
  components: { UiIcon },
  props: {
    value: [String, Number, Array],
    multiple: Boolean,
    disabled: Boolean,
    clearable: Boolean,
    filterable: Boolean,
    remote: Boolean,
    remoteMethod: Function,
    loading: Boolean,
    loadingText: {
      type: String,
      default: '加载中'
    },
    label: [String, Number, Array],
    size: {
      validator(value) {
        return ['large', 'small', 'default'].indexOf(value) !== -1
      }
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    notFoundText: {
      type: String,
      default: '无匹配数据'
    },
    labelInValue: Boolean,
    placement: {
      default: 'bottom',
      validator(value) {
        return ['bottom', 'top'].indexOf(value) !== -1
      }
    },
    transfer: Boolean,
    elementId: String
  }
}
</script>
<style lang="less">
.ui-select-selection {
  height: 32px;
  border: 1px solid @border-color;
  border-radius: 4px;
  cursor: pointer;
  transition: border .2s ease-in-out;
  position: relative;
  outline: none;
  &:hover, &:focus {
    border-color: @primary-color;
  }
  &:focus {
    .form-control-shadow(@primary-color);
  }
}

.ui-select-input {
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  border-radius: 4px;
  padding: 0 24px 0 8px;
  cursor: pointer;
}

.ui-select-arrow {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ui-select-option {
  padding: 7px 16px;
  list-style: none;
  cursor: pointer;
  line-height: 1.2;
  &:focus, &:hover {
    background-color: @disabled-bg-color;
    &.selected {
      background-color: @primary-color;
    }
  }
  &.selected {
    background-color: fadeout(@primary-color, 90%);
  }
}
</style>