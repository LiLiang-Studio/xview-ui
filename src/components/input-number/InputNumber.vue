<template>
  <div :class="[prefix, {disabled}]">
    <ui-input v-model="inputValue" v-bind="inputProps" @on-keydown="onKeydown" @on-blur="onBlur" @on-focus="onFocus"/>
    <div :class="`${prefix}-btns`" v-if="!disabled">
      <a :class="[`${prefix}-btn`, {disabled: disAdd}]" @click="add">
        <ui-icon type="ios-arrow-up"/>
      </a>
      <a :class="[`${prefix}-btn`, {disabled: disMinus}]" @click="minus">
        <ui-icon type="ios-arrow-down"/>
      </a>
    </div>
  </div>
</template>
<script>
import UiIcon from '../icon'
import UiInput from '../input'
export default {
  name: 'UiInputNumber',
  components: { UiIcon, UiInput },
  data() {
    return { prefix: 'ui-inputNumber', inputValue: this.parseValue(this.value) }
  },
  props: {
    max: {
      type: Number,
      default: Infinity
    },
    min: {
      type: Number,
      default: -Infinity
    },
    value: {
      type: [Number, String],
      default: 1
    },
    step: {
      type: Number,
      default: 1
    },
    size: {
      validator(value) {
        return ['large', 'small', 'default'].indexOf(value) !== -1
      }
    },
    disabled: Boolean,
    formatter: Function,
    parser: Function,
    readonly: Boolean,
    editable: {
      type: Boolean,
      default: true
    },
    precision: Number
  },
  computed: {
    inputProps() {
      return { size: this.size, disabled: this.disabled, readonly: this.readonly || !this.editable }
    },
    disAdd() {
      return +this.value + this.step > this.max
    },
    disMinus() {
      return +this.value - this.step < this.min
    },
    prec() {
      let s = this.step.toString().split('.')[1]
      let digits = s ? s.length : 0
      return this.precision || digits
    }
  },
  watch: {
    value(newval) {
      this.$emit('on-change', newval)
      this.inputValue = this.parseValue(newval)
    },
    inputValue() {
      let val = this.parseInputValue()
      if (!isNaN(val)) this.$emit('input', val)
    }
  },
  methods: {
    parseValue(val) {
      val = Math.min(Math.max(+val, this.min), this.max)
      return this.formatter ? this.formatter(val) : val
    },
    parseInputValue() {
      return this.parser ? this.parser(this.inputValue) : this.inputValue
    },
    add() {
      if (this.readonly || this.disAdd) return
      this.$emit('input', (+this.value + this.step).toFixed(this.prec))
    },
    minus() {
      if (this.readonly || this.disMinus) return
      this.$emit('input', (+this.value - this.step).toFixed(this.prec))
    },
    onKeydown(e) {
      if (e.keyCode === 40) {
        e.preventDefault()
        this.minus()
      } else if (e.keyCode === 38) {
        e.preventDefault()
        this.add()
      }
    },
    onBlur() {
      this.$emit('on-blur')
      if (isNaN(this.parseInputValue())) this.inputValue = this.parseValue(this.value)
    },
    onFocus(e) {
      this.$emit('on-focus', e)
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.ui-inputNumber {
  width: 80px;
  position: relative;
  display: inline-block;
  background-color: #fff;
  &:hover &-btns {
    opacity: 1;
  }
  &:not(.disabled):hover input {
    border-color: @primary-color;
  }
  &-btns {
    position: absolute;
    top: 1px;
    right: 1px;
    bottom: 1px;
    width: 22px;
    opacity: 0;
    border-radius: 0 4px 4px 0;
    border-left: 1px solid @border-color;
    transition: opacity .2s ease-in-out;
  }
  &-btn {
    height: 50%;
    color: #999;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:last-child {
      border-top: 1px solid @border-color;
    }
    &.disabled {
      opacity: .72;
      color: #ccc;
      cursor: not-allowed;
    }
  }
}
</style>