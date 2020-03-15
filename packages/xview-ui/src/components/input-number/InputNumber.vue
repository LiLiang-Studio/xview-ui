<template>
  <div :class="[prefix, {disabled}]">
    <x-input :value="showVal" v-bind="inputProps" @input="onInput" @on-keydown="onKeydown" @on-blur="onBlur" @on-focus="onFocus"/>
    <div :class="`${prefix}_btns`" v-if="!disabled">
      <a :class="[`${prefix}_btn`, {disabled: disAdd}]" @click="add">
        <x-icon type="ios-arrow-up"/>
      </a>
      <a :class="[`${prefix}_btn`, {disabled: disMinus}]" @click="minus">
        <x-icon type="ios-arrow-down"/>
      </a>
    </div>
  </div>
</template>
<script>
import XIcon from '../icon'
import XInput from '../input'
import { isNum } from '../../tools'
const N = Number, S = String, B = Boolean, I = Infinity
export default {
  name: 'XInputNumber',
  components: { XIcon, XInput },
  props: {
    max: {
      type: N,
      default: I
    },
    min: {
      type: N,
      default: -I
    },
    value: {
      type: [N, S],
      default: 1
    },
    step: {
      type: N,
      default: 1
    },
    size: {
      validator(v) {
        return ['large', 'small', 'default'].indexOf(v) !== -1
      }
    },
    disabled: B,
    placeholder: S,
    formatter: Function,
    readonly: B,
    editable: {
      type: B,
      default: true
    },
    precision: N,
    activeChange: B
  },
  data() {
    return { prefix: 'x-inputNumber', inputVal: '' }
  },
  computed: {
    prec() {
      let s = (this.step + '').split('.')[1], digits = s ? s.length : 0
      return this.precision || digits
    },
    showVal() {
      let val = this.inputVal
      return this.formatter ? this.formatter(val) : isNum(val) ? val.toFixed(this.prec) : val
    },
    inputProps() {
      let { size, disabled, placeholder } = this
      return { size, disabled, placeholder, readonly: this.readonly || !this.editable }
    },
    disAdd() {
      return +this.inputVal + this.step > this.max
    },
    disMinus() {
      return +this.inputVal - this.step < this.min
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.inputVal = val
      }
    },
    inputVal(val) {
      val = val + '' ? +val : ''
      this.$emit('input', val)
      this.$emit('on-change', val)
    }
  },
  methods: {
    add() {
      if (!this.readonly && !this.disAdd) this.inputVal = (+this.value + this.step).toFixed(this.prec)
    },
    minus() {
      if (!this.readonly && !this.disMinus) this.inputVal = (+this.value - this.step).toFixed(this.prec)
    },
    onInput(val) {
      this.inputVal = val
    },
    onKeydown(e) {
      let k = e.keyCode, obj = { 38: this.add, 40: this.minus }
      if (k in obj) e.preventDefault(), obj[k]()
    },
    onBlur() {
      this.$emit('on-blur')
    },
    onFocus(e) {
      this.$emit('on-focus', e)
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.x-inputNumber {
  width: 80px;
  overflow: hidden;
  position: relative;
  display: inline-block;
  background-color: #fff;
  &_btns {
    position: absolute;
    top: 1px;
    right: 1px;
    bottom: 1px;
    width: 22px;
    opacity: 0;
    transition: all .2s ease-in-out;
    border-left: 1px solid @border-color;
  }
  &_btn {
    height: 50%;
    color: #999;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:last-child {
      border-top: 1px solid @border-color;
    }
  }
  &:hover &_btns {
    opacity: 1;
  }
  &:not(.disabled):hover input {
    border-color: @primary-color;
  }
}
</style>