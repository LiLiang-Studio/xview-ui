<template>
  <form class="ui-form" :class="[labelPosition, {inline}]" :autocomplete="autocomplete"><slot></slot></form>
</template>
<script>
export default {
  name: 'ui-form',
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
.ui-form {
  &.inline {
    .ui-form-item {
      display: inline-block;
      margin-right: 10px;
    }
  }
  &.left {
    .ui-form-item-label {
      text-align: left;
    }
  }
  &.top {
    .ui-form-item-label {
      float: none;
      display: inline-block;
      padding: 0 0 10px;
    }
  }
}

.ui-form-item {
  margin-bottom: 24px;
  vertical-align: top;
}

.ui-form-item-label {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 12px;
  color: @content-color;
  line-height: 1;
  padding: 10px 12px 10px 0;
}

.ui-form-item-content {
  position: relative;
  line-height: 32px;
  font-size: 12px;
}
</style>