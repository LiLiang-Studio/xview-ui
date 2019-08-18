<template>
  <span class="ui-checkbox" :class="[{isChecked, disabled}, size]" @click="handleClick">
    <span class="ui-checkbox-button" tabindex="-1">
      <UiIcon class="ui-checkbox-icon" type="checkmark"/>
    </span>
    <slot>{{label}}</slot>
  </span>
</template>
<script>
import UiIcon from './../Icon.vue'
import { findParentByName } from '../../utils'
export default {
  components: { UiIcon },
  data() {
    return {
      parent: null,
      isChecked: false
    }
  },
  props: {
    value: [String, Number, Boolean],
    label: {
      type: [String, Number, Boolean],
      default: ''
    },
    disabled: Boolean,
    indeterminate: Boolean,
    size: {
      validator(value) {
        return !value || ['small', 'default', 'large'].indexOf(value) !== -1
      }
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false
    }
  },
  watch: {
    value(newVal) {
      if (this.parent) return
      this.isChecked = newVal === this.trueValue
    }
  },
  methods: {
    handleClick(event) {
      if (this.disabled) return
      this.isChecked = !this.isChecked
      if (this.parent) {
        this.parent.updateValue(this.label)
      } else {
        this.$emit('input', this.isChecked ? this.trueValue : this.falseValue)
      }
      this.$emit('on-change', this.isChecked)
    }
  },
  mounted() {
    this.parent = findParentByName(this, 'ui-checkbox-group')
    if (this.parent) {
      let checkedArray = this.parent.getValues()
      this.isChecked = checkedArray.indexOf(this.label) !== -1
    } else {
      this.isChecked = this.value === this.trueValue
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.ui-checkbox-group.large .ui-checkbox, .ui-checkbox.large {
  font-size: 14px;
  .ui-checkbox-icon {
    width: 18px;
    height: 18px;
    line-height: 18px;
  }
}

.ui-checkbox {
  cursor: pointer;
  display: inline-block;
  position: relative;
  margin-right: 8px;
  font-size: 12px;
  &.isChecked:not(.disabled) .ui-checkbox-button {
    border-color: @primary-color;
    background-color: @primary-color;
  }
  &.isChecked .ui-checkbox-icon {
    transform: scale(1);
  }
  &.disabled {
    cursor: not-allowed;
    color: @disabled-color;
    .ui-checkbox-button {
      background-color: @disabled-bg-color;
    }
    .ui-checkbox-icon {
      color: @disabled-color;
    }
  }
  &:not(.disabled) {
    .ui-checkbox-button:focus {
      .form-control-shadow(@primary-color);
    }
    &:hover {
      border-color: darken(@border-color, 10%);
    }
  }
}

.ui-checkbox-button {
  background-color: #fff;
  display: inline-block;
  border: 1px solid @border-color;
  text-align: center;
  margin-right: 6px;
  line-height: 1;
  border-radius: 2px;
  outline: none;
  will-change: border-color, background-color, box-shadow;
  transition: border-color .2s, background-color .2s, box-shadow .2s;
}

.ui-checkbox-icon {
  color: #fff;
  width: 14px;
  height: 14px;
  line-height: 14px;
  transform: scale(0);
  will-change: transform;
  transition: transform .2s;
}
</style>