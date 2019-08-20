<template>
  <transition v-if="fade" name="ui-fade">
    <div class="ui-tag" @click="handleClick">
      <div class="ui-tag-wrapper" :class="[colorClass, type, {isChecked}]" :style="{backgroundColor}">
        <span v-if="type === 'dot'" class="ui-tag-dot"></span>
        <slot></slot>
        <UiIcon v-if="closable" type="ios-close-empty" @click.native.stop="handleClose"/>
      </div>
    </div>
  </transition>
  <div v-else class="ui-tag" @click="handleClick">
    <div class="ui-tag-wrapper" :class="[colorClass, type, {isChecked}]" :style="{backgroundColor}">
      <span v-if="type === 'dot'" class="ui-tag-dot"></span>
      <slot></slot>
      <UiIcon v-if="closable" type="ios-close-empty" @click.native.stop="handleClose"/>
    </div>
  </div>
</template>
<script>
import UiIcon from './icon'
export default {
  components: { UiIcon },
  data() {
    return {
      isChecked: this.checked
    }
  },
  props: {
    closable: Boolean,
    checkable: Boolean,
    checked: {
      type: Boolean,
      default: true
    },
    type: {
      default: 'default',
      validator(value) {
        return ['default', 'dot'].indexOf(value) !== -1
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
      const colors = ['blue', 'green', 'red', 'yellow']
      let index = colors.indexOf(this.color)
      return index !== -1 && colors[index]
    },
    backgroundColor() {
      return !this.colorClass && this.color
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
@import url("../styles/vars.less");
.ui-tag {
  display: inline-block;
  margin: 2px 4px 2px 0;
  cursor: pointer;
  font-size: 12px;
  color: @content-color;
}

.ui-tag-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
  background-color: @divider-color;
}

.ui-tag-wrapper {
  display: flex;
  height: 22px;
  align-items: center;
  padding: 0 8px;
  border: 1px solid @border-color;
  background-color: @bg-color;
  border-radius: 3px;
  &:hover {
    opacity: .85;
  }
  &.blue, &.green, &.red, &.yellow {
    border: none;
    background-color: #fff;
  }
  &.isChecked:not(.dot) {
    &.blue, &.green, &.red, &.yellow {
      color: #fff;
    }
    &.blue {
      background-color: @info-color;
    }
    &.green {
      background-color: @success-color;
    }
    &.red {
      background-color: @error-color;
    }
    &.yellow {
      background-color: @warning-color;
    }
  }
  &.dot {
    height: 32px;
    background-color: #fff;
    border: 1px solid @divider-color;
    &.blue .ui-tag-dot {
      background-color: @info-color;
    }
    &.green .ui-tag-dot {
      background-color: @success-color;
    }
    &.red .ui-tag-dot {
      background-color: @error-color;
    }
    &.yellow .ui-tag-dot {
      background-color: @warning-color;
    }
  }
  .ion-ios-close-empty {
    font-size: 18px;
    margin-left: 8px;
    opacity: .66;
    &:hover {
      opacity: 1;
    }
  }
}
</style>