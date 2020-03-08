<template>
  <span :class="prefix">
    <slot></slot>
    <span v-if="status" :class="`${prefix}_status`">
      <span :class="`${prefix}_status_${status}`"></span>
      {{text}}
    </span>
    <sup v-else-if="showSup" :class="classes" :style="styles">{{showedText}}</sup>
  </span>
</template>
<script>
export default {
  name: 'XBadge',
  props: {
    count: [Number, String],
    overflowCount: {
      type: [Number, String],
      default: 99
    },
    dot: Boolean,
    type: {
      default: 'error',
      validator(v) {
        return ['success', 'primary', 'normal', 'error', 'warning', 'info'].indexOf(v) !== -1
      }
    },
    showZero: Boolean,
    status: {
      validator(v) {
        return ['success', 'processing', 'default', 'error', 'warning'].indexOf(v) !== -1
      }
    },
    text: String,
    offset: Array
  },
  data() {
    return { prefix: 'x-badge', hasContent: false }
  },
  computed: {
    classes() {
      let { dot, type, prefix, hasContent } = this
      return [`${prefix}_sup`, `${prefix}_sup_${type}`, { dot, hasContent }]
    },
    showedText() {
      return this.text || (+this.count > +this.overflowCount ? `${this.overflowCount}+` : +this.count)
    },
    showSup() {
      return !this.status && (this.dot ? +this.count !== 0 : this.showZero || this.showedText)
    },
    styles() {
      let [x, y] = this.offset || []
      return { right: x && `${-x}px`, top: y && `${y}px` }
    }
  },
  mounted() {
    this.hasContent = this.$slots.default !== undefined
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
@prefix: .x-badge;
@normal-color: #e6ebf1;
@{prefix} {
  position: relative;
  display: inline-block;
  + @{prefix} {
    margin-left: 10px;
  }
  &_sup {
    display: inline-block;
    vertical-align: middle;
    height: 20px;
    min-width: 20px;
    border-radius: 10px;
    line-height: 18px;
    padding: 0 6px;
    font-size: 12px;
    color: #fff;
    white-space: nowrap;
    border: 1px solid transparent;
    &.hasContent {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1;
      transform: translate(50%, -50%);
    }
    &_success {
      background-color: @success-color;
    }
    &_primary {
      background-color: @primary-color;
    }
    &_normal {
      color: @sub-color;
      background-color: @normal-color;
    }
    &_error {
      background-color: @error-color;
    }
    &_warning {
      background-color: @warning-color;
    }
    &_info {
      background-color: @info-color;
    }
    &.dot {
      width: 8px;
      height: 8px;
      padding: 0;
      min-width: 8px;
      overflow: hidden;
      color: transparent;
    }
  }
  &_status {
    font-size: 14px;
    span {
      position: relative;
      display: inline-block;
      vertical-align: middle;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      margin-right: 6px;
    }
    &_success {
      background-color: @success-color;
    }
    &_processing {
      background-color: @primary-color;
      &:after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        border-radius: 50%;
        border: 1px solid @primary-color;
        animation: x-badge-processing 1.2s infinite ease-in-out;
      }
    }
    &_default {
      background-color: @normal-color;
    }
    &_error {
      background-color: @error-color;
    }
    &_warning {
      background-color: @warning-color;
    }
  }
}
@keyframes x-badge-processing {
  from {
    transform: scale(.8);
    opacity: .5;
  }
  to {
    transform: scale(2.4);
    opacity: 0;
  }
}
</style>