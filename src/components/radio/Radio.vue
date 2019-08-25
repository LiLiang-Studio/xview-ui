<template>
  <div class="ui-radio" :class="{isButtonType}">
    <UiButton class="ui-radio-button" :class="{checked}" v-if="isButtonType" :disabled="disabled" @click="handleClick">
      <slot>{{label}}</slot>
    </UiButton>
    <div v-else class="ui-radio-inner" tabindex="-1" :class="[{disabled}, size]" @click="handleClick">
      <span class="ui-radio-box" :class="{checked}"></span>
      <span class="ui-radio-label">
        <slot>{{label}}</slot>
      </span>
    </div>
  </div>
</template>
<script>
import UiButton from './../button/Button.vue'
import { findParent } from '@/tools'
export default {
  components: { UiButton },
  data() {
    return { checked: false, parent: null }
  },
  props: {
    value: Boolean,
    label: [String, Number],
    disabled: Boolean,
    size: {
      validator(value) {
        return ['large', 'small', 'default'].indexOf(value) !== -1
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
    checked(newVal) {
      this.$emit('on-change', newVal)
    }
  },
  computed: {
    isButtonType() {
      return this.parent && this.parent.isButtonType
    }
  },
  methods: {
    handleClick() {
      if (this.disabled) return
      if (this.parent) {
        this.parent.updateValue(this)
      } else {
        this.checked = true
        this.$emit('input', this.trueValue)
      }
    }
  },
  mounted() {
    this.parent = findParent(this, 'ui-radio-group')
    if (this.parent) {
      this.parent.addChild(this)
      this.checked = this.parent.value === this.label
    } else {
      this.checked = this.value === this.trueValue
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.ui-radio {
  display: inline-block;
  &:not(.isButtonType) + .ui-radio {
    margin-left: 10px;
  }
}

.ui-radio-group {
  .isVertical {
    .ui-radio {
      width: 100%;
      margin-left: 0;
    }
    .ui-radio-inner {
      float: left;
    }
  }
  &.isButtonType {
    + .ui-radio-group {
      margin-left: 10px;
    }
  }
}

.ui-radio-group.large .ui-radio-inner, .ui-radio-inner.large {
  font-size: 14px;
  .ui-radio-box {
    width: 18px;
    height: 18px;
    margin-right: 6px;
    &:before {
      width: 10px;
      height: 10px;
    }
  }
}

.ui-radio-button.ui-button:not(:disabled) {
  background-color: #fff;
  &:hover {
    border-color: @border-color;
  }
  &.checked {
    border-color: @primary-color;
  }
}

.ui-radio-inner {
  display: flex;
  align-items: center;
  cursor: pointer;
  outline: none;
  font-size: 12px;
  &.disabled {
    cursor: not-allowed;
    .ui-radio-box {
      border-color: @border-color;
      background-color: #f3f3f3;
      &:before {
        background-color: #ccc;
      }
    }
  }
  &:focus:not(.disabled) .ui-radio-box {
    .form-control-shadow(@primary-color);
  }
}

.ui-radio-box {
  width: 14px;
  height: 14px;
  min-width: 14px;
  border-radius: 50%;
  margin-right: 4px;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid @border-color;
  transition: all .3s ease;
  &:before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    transform: scale(0);
    transition: all .3s ease;
    background-color: @primary-color;
  }
  &.checked {
    border-color: @primary-color;
    &:before {
      transform: scale(1);
    }
  }
}
</style>