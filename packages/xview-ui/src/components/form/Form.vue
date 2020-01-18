<template>
  <form class="ui-form" :class="[labelPosition, {inline}]" :autocomplete="autocomplete">
    <slot></slot>
  </form>
</template>
<script>
export default {
  name: 'UiForm',
  data() {
    return { fields: [] }
  },
  props: {
    model: Object,
    rules: Object,
    inline: Boolean,
    labelPosition: {
      default: 'right',
      validator(value) {
        return ['left', 'right', 'top'].indexOf(value) !== -1
      }
    },
    labelWidth: [Number, String],
    showMessage: {
      type: Boolean,
      default: true
    },
    autocomplete: {
      default: 'off',
      validator(value) {
        return ['off', 'on'].indexOf(value) !== -1
      }
    }
  },
  methods: {
    addItem(vm) {
      this.fields.push(vm)
    },
    removeItem(vm) {
      this.fields.splice(this.fields.indexOf(vm), 1)
    },
    validate(callback) {

    },
    validateField(prop, callback) {

    },
    resetFields() {

    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.ui-form {
  &.inline {
    display: flex;
    flex-wrap: wrap;
  }
  &.inline &-item {
    margin-right: 10px;
  }
  &.left &-item-label {
    text-align: left;
  }
  &.top &-item {
    display: block;
  }
  &.top &-item-label {
    margin-bottom: 6px;
  }
  &.right &-item-label {
    text-align: right;
  }
  &-item {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    font-size: 12px;
    color: @content-color;
    &-label {
      margin-right: 12px;
      display: inline-block;
    }
    &-content {
      flex: 1;
      min-width: 192px;
      position: relative;
    }
    &-error-tip {
      padding-top: 2px;
      color: @error-color;
      position: absolute;
      bottom: 0;
      left: 0;
      transform: translateY(100%);
    }
  }
}
</style>