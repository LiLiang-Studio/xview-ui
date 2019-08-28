<template>
  <transition v-if="fade" name="ui-fade">
    <div :class="classes" :style="styles" @click="handleClick">
      <slot></slot>
      <UiIcon v-if="closable" :class="`${prefix}-close`" type="ios-close-empty" @click.stop="handleClose"/>
    </div>
  </transition>
  <div v-else :class="classes" :style="styles" @click="handleClick">
    <slot></slot>
    <UiIcon v-if="closable" :class="`${prefix}-close`" type="ios-close-empty" @click.stop="handleClose"/>
  </div>
</template>
<script>
import UiIcon from '../icon'
export default {
  name: 'UiTag',
  components: { UiIcon },
  data() {
    return { prefix: 'ui-tag', isChecked: this.checked }
  },
  props: {
    closable: Boolean,
    checkable: Boolean,
    checked: {
      type: Boolean,
      default: true
    },
    type: {
      validator(value) {
        return ['border', 'dot'].indexOf(value) !== -1
      }
    },
    color: String,
    fade: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    colorClass() {
      return ['primary', 'success', 'warning', 'error'].find(_ => _ === this.color)
    },
    classes() {
      return [
        this.prefix, 
        this.colorClass && `${this.prefix}-${this.colorClass}`,
        this.type && `${this.prefix}-${this.type}`,
        { checked: this.isChecked }
      ]
    },
    styles() {
      return !this.colorClass && { color: this.color, borderColor: this.color }
    }
  },
  watch: {
    checked(newVal) {
      this.isChecked = newVal
    }
  },
  methods: {
    handleClose(event) {
      this.$emit('on-close')
    },
    handleClick() {
      if (!this.checkable) return
      this.isChecked = !this.isChecked
      this.$emit('update:checked', this.isChecked)
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.ui-tag {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  height: 22px;
  margin: 2px 4px 2px 0;
  padding: 0 8px;
  font-size: 12px;
  border-radius: 3px;
  color: @content-color;
  background-color: @bg-color;
  border: 1px solid @border-color;
  &-primary, &-success, &-error, &-warning {
    color: #fff;
  }
  &-primary {
    border-color: @primary-color;
    background-color: @primary-color;
  }
  &-success {
    border-color: @success-color;
    background-color: @success-color;
  }
  &-error {
    border-color: @error-color;
    background-color: @error-color;
  }
  &-warning {
    border-color: @warning-color;
    background-color: @warning-color;
  }
  &-dot {
    height: 32px;
    background-color: #fff;
    border: 1px solid @divider-color;
  }
  &-dot:before {
    content: '';
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 8px;
    background-color: @divider-color;
  }
  &-dot&-primary, &-dot&-success, &-dot&-error, &-dot&-warning {
    color: @content-color;
  }
  &-dot&-primary:before {
    background-color: @primary-color;
  }
  &-dot&-success:before {
    background-color: @success-color;
  }
  &-dot&-error:before {
    background-color: @error-color;
  }
  &-dot&-warning:before {
    background-color: @warning-color;
  }
  &:hover {
    opacity: .85;
  }
  &-close {
    width: 20px;
    height: 20px;
    line-height: 20px;
    font-size: 18px;
    margin-left: 2px;
    opacity: .66;
    text-align: center;
    &:hover {
      opacity: 1;
    }
  }
}
</style>