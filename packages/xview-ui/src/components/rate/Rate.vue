<template>
  <div :class="prefix">
    <ul :class="`${prefix}_list`">
      <li :class="`${prefix}_item`" v-for="i in count" :key="i">
        <x-icon :type="icon" :custom="customIcon" :class="fullClasses(i)"
          @mouseenter="onMouseenter(i)" @mouseleave="onMouseleave" @click="onClick(i)"/>
        <div :class="`${prefix}_half`" v-if="allowHalf">
          <x-icon :type="icon" :custom="customIcon" :class="halfClasses(i)"
            @mouseenter="onMouseenter(i, false)" @mouseleave="onMouseleave" @click="onClick(i, false)"/>
        </div>
      </li>
    </ul>
    <span :class="`${prefix}_text`" v-if="showText">
      <slot>{{inputValue}} 星</slot>
    </span>
  </div>
</template>
<script>
import XIcon from '../icon'
export default {
  name: 'XRate',
  components: { XIcon },
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
    },
    customIcon: String
  },
  data() {
    return { prefix: 'x-rate', inputValue: this.value, tempValue: this.value }
  },
  watch: {
    value(val) {
      this.inputValue = this.tempValue = val
    },
    inputValue(val) {
      this.$emit('input', val)
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
      let value = isFull ? i : i - .5, thisValue = this.inputValue
      this.inputValue = this.clearable && value === thisValue ? 0 : value
      if (this.inputValue !== thisValue) this.$emit('on-change', this.inputValue)
    },
    isActive(i, isFull = true) {
      return i <= this.tempValue && i <= this.inputValue + (isFull ? 0 : .5)
    },
    fullClasses(i) {
      let { prefix, tempValue, disabled } = this
      return { active: this.isActive(i), hover: i <= tempValue, disabled }
    },
    halfClasses(i) {
      let { prefix, tempValue, disabled } = this
      return { active: this.isActive(i, false), hover: i <= tempValue + .5, disabled }
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.x-rate {
  display: inline-block;
  font-size: 14px;
  &_list {
    list-style: none;
    display: inline-block;
    vertical-align: middle;
  }
  &_item {
    display: inline-block;
    position: relative;
    color: #e9e9e9;
    margin-right: 2px;
    font-size: 20px;
  }
  &_half {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    overflow: hidden;
  }
  .x-icon {
    transition: color .2s ease-in-out;
    &:not(.disabled) {
      cursor: pointer;
    }
    &.active, &.hover {
      color: lighten(@warning-color, 8%);
    }
  }
  &_text {
    display: inline-block;
    vertical-align: middle;
    margin-left: 8px;
  }
}
</style>