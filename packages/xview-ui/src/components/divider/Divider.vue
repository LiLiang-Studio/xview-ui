<template>
  <div :class="[`${prefix}_${type}`, `${prefix}_${orientation}`, size, {dashed}]">
    <span v-show="hasText" :class="`${prefix}_text`">
      <slot></slot>
    </span>
  </div>
</template>
<script>
export default {
  name: 'XDivider',
  props: {
    type: {
      default: 'horizontal',
      validator(v) {
        return ['horizontal', 'vertical'].indexOf(v) !== -1
      }
    },
    orientation: {
      default: 'center',
      validator(v) {
        return ['left', 'right', 'center'].indexOf(v) !== -1
      }
    },
    dashed: Boolean,
    size: {
      validator(v) {
        return ['small', 'default'].indexOf(v) !== -1
      }
    }
  },
  data() {
    return { prefix: 'x-divider', hasText: false }
  },
  mounted() {
    this.hasText = this.type === 'horizontal' && this.$slots.default
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.x-divider {
  &_horizontal {
    display: flex;
    align-items: center;
    color: @title-color;
    margin: 16px 0;
    font-size: 16px;
    &.small {
      margin: 8px 0;
      font-size: 14px;
    }
    &:before, &:after {
      content: '';
      border-bottom: 1px solid @border-color;
    }
    &.dashed:before, &.dashed:after {
      border-bottom-style: dashed;
    }
  }
  &_center:before, &_center:after, &_left:after, &_right:before {
    flex: 1;
  }
  &_left:before {
    width: 5%;
  }
  &_right:after {
    width: 5%;
  }
  &_vertical {
    display: inline-block;
    margin: 0 8px;
    height: 1em;
    vertical-align: middle;
    border-left: 1px solid @border-color;
    &.dashed {
      border-left-style: dashed;
    }
  }
  &_text {
    padding: 0 24px;
    white-space: nowrap;
  }
}
</style>