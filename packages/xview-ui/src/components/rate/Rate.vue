<template>
  <div :class="prefix">
    <ul :class="`${prefix}--list`">
      <li :class="`${prefix}--item`" v-for="i in count" :key="i">
        <UiIcon :type="icon" :class="fullClasses(i)"
          @mouseenter="onMouseenter(i)" @mouseleave="onMouseleave" @click="onClick(i)"/>
        <div :class="`${prefix}--half`" v-if="allowHalf">
          <UiIcon :type="icon" :class="halfClasses(i)"
            @mouseenter="onMouseenter(i, false)" @mouseleave="onMouseleave" @click="onClick(i, false)"/>
        </div>
      </li>
    </ul>
    <span :class="`${prefix}--text`" v-if="showText">
      <slot>{{inputValue}} 星</slot>
    </span>
  </div>
</template>
<script>
import UiIcon from '../icon'
export default {
  name: 'UiRate',
  components: { UiIcon },
  data() {
    return {
      prefix: 'ui-rate',
      inputValue: this.value,
      tempValue: this.value
    }
  },
  props: {
    count: {
      type: Number,
      default: 5
    },
    value: {
      type: Number,
      default: 0
    },
    allowHalf: Boolean,
    disabled: Boolean,
    showText: Boolean,
    clearable: Boolean,
    icon: {
      type: String,
      default: 'star'
    }
  },
  watch: {
    value(newval) {
      this.inputValue = this.tempValue = newval
    },
    inputValue(newval) {
      this.$emit('input', newval)
      this.$emit('on-change', newval)
    }
  },
  methods: {
    onMouseenter(i, isFull = true) {
      if (this.disabled) return
      this.tempValue = isFull ? i : i - .5
    },
    onMouseleave() {
      this.tempValue = this.inputValue
    },
    onClick(i, isFull = true) {
      if (this.disabled) return
      let value = isFull ? i : i - .5
      if (this.clearable && value === this.inputValue) return this.inputValue = 0
      this.inputValue = value
    },
    isActive(i, isFull = true) {
      return i <= this.tempValue && i <= this.inputValue + (isFull ? 0 : .5)
    },
    fullClasses(i) {
      let { prefix, tempValue, disabled } = this
      return [`${prefix}--icon`, { active: this.isActive(i), hover: i <= tempValue, disabled }]
    },
    halfClasses(i) {
      let { prefix, tempValue, disabled } = this
      return [`${prefix}--icon`, { active: this.isActive(i, false), hover: i <= tempValue + .5, disabled }]
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.ui-rate {
  display: inline-block;
  &--list {
    list-style: none;
    display: inline-block;
    vertical-align: middle;
  }
  &--item {
    display: inline-block;
    position: relative;
    color: #e9e9e9;
    margin-right: 8px;
    font-size: 20px;
  }
  &--half {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    overflow: hidden;
  }
  &--icon {
    transition: color .2s ease-in-out;
    &:not(.disabled) {
      cursor: pointer;
    }
    &.active:not(.hover), &.hover {
      color: @warning-light-color;
    }
  }
  &--text {
    display: inline-block;
    vertical-align: middle;
    margin-left: 8px;
  }
}
</style>