<template>
  <div class="ui-steps" :class="[size, direction]">
    <slot></slot>
  </div>
</template>
<script>
import { findChildrens } from '../../tools'
export default {
  name: 'UiSteps',
  props: {
    current: {
      type: Number,
      default: 0
    },
    status: {
      default: 'process',
      validator(value) {
        return ['wait', 'process', 'finish', 'error'].indexOf(value) !== -1
      }
    },
    size: {
      validator(value) {
        return value === 'small'
      }
    },
    direction: {
      default: 'horizontal',
      validator(value) {
        return ['horizontal', 'vertical'].indexOf(value) !== -1
      }
    }
  },
  watch: {
    current() {
      this.setItemsState()
    }
  },
  mounted() {
    this.setItemsState()
  },
  methods: {
    setItemsState() {
      let childs = findChildrens(this, 'UiStep'), count = childs.length
      childs.forEach((item, index) => {
        let isCurrent = index === this.current
        let width = this.direction === 'horizontal' ? `${1 / count * 100}%` : undefined
        let status = isCurrent ? this.status : index < this.current ? 'finish' : 'wait'
        item.setState({ index, isCurrent, width, status })
      })
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
@prefix: .ui-steps;
@item-prefix: .ui-step;
@{prefix} {
  overflow: hidden;
  &.small {
    @{item-prefix}--main {
      padding-left: 28px;
    }
    @{item-prefix}--tail {
      top: 9px;
      left: 28px;
    }
    @{item-prefix}--head {
      width: 18px;
      height: 18px;
      line-height: 18px;
      font-size: 12px;
      .ui-icon {
        font-size: 14px;
      }
    }
    @{item-prefix}--title {
      font-size: 12px;
    }
  }
  &.vertical {
    @{item-prefix}--tail {
      top: 30px;
      right: 0;
      bottom: 4px;
      left: 13px;
      width: 1px;
      height: auto;
    }
    @{item-prefix}--main {
      padding-top: 3px;
      padding-bottom: 12px;
    }
    &.small @{item-prefix}--tail {
      top: 22px;
      left: 9px;
    }
  }
}
@{item-prefix} {
  float: left;
  width: 100%;
  position: relative;
  &:last-child &--tail {
    display: none;
  }
  &.process {
    @{item-prefix}--head:not(.icon) {
      background-color: @primary-color;
      color: #fff;
    }
    @{item-prefix}--title, @{item-prefix}--content {
      color: #666;
    }
  }
  &.finish, &.wait {
    @{item-prefix}--title, @{item-prefix}--content {
      color: #999;
    }
  }
  &.finish, &.process {
    @{item-prefix}--head {
      color: @primary-color;
    }
  }
  &.wait {
    @{item-prefix}--head {
      color: #ccc;
    }
    @{item-prefix}--head:not(.icon) {
      border-color: #ccc;
    }
  }
  &.error {
    @{item-prefix}--head:not(.icon) {
      border-color: currentColor;
    }
    @{item-prefix}--title, @{item-prefix}--content, @{item-prefix}--head {
      color: @error-color;
    }
  }
  &.finish {
    @{item-prefix}--tail:before {
      transform: scale(1);
    }
  }
  &--head {
    width: 26px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    border-radius: 50%;
    margin-right: 8px;
    float: left;
    position: relative;
    font-size: 14px;
    transition: all .3s ease-in-out;
    &, .ui-icon {
      font-weight: bold;
    }
    .ui-icon {
      font-size: 24px;
    }
    &:not(.icon) {
      background-color: #fff;
      border: 1px solid @primary-color;
    }
  }
  &--tail {
    position: absolute;
    top: 13px;
    left: 36px;
    right: 10px;
    height: 1px;
    background-color: @divider-color;
    &:before {
      display: block;
      transform: scale(0);
      height: 100%;
      content: '';
      background-color: @primary-color;
      transform-origin: 0 0;
      transition: transform .3s;
    }
  }
  &--main {
    position: relative;
    padding-left: 36px;
  }
  &--title {
    padding-right: 10px;
    font-weight: bold;
    font-size: 14px;
    background-color: #fff;
    display: inline-block;
  }
  &--title + &--content {
    margin-top: 6px;
  }
  &--content {
    font-size: 12px;
  }
}
</style>