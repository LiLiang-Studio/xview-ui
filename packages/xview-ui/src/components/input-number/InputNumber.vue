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
const N = Number, S = String, B = Boolean, F = Function, I = Infinity
export default {
  name: 'XInputNumber',
  components: { XIcon, XInput },
  props: {
    max: { type: N, default: I },
    min: { type: N, default: -I
    },
    value: { type: [N, S], default: 1 },
    step: { type: N, default: 1 },
    size: {
      validator(v) {
        return ['large', 'small', 'default'].indexOf(v) !== -1
      }
    },
    disabled: B,
    placeholder: S,
    formatter: F,
    parser: F,
    readonly: B,
    editable: { type: B, default: true },
    precision: N
  },
  data() {
    return { prefix: 'x-inputNumber', inputVal: '' }
  },
  computed: {
    showVal() {
      return this.formatVal()
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
    },
    prec() {
      return this.precision || (('' + this.step).split('.')[1] || '').length
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.inputVal = '' + val
      }
    },
    inputVal(val) {
      if (val) val = +val
      this.$emit('input', val)
      this.$emit('on-change', val)
    }
  },
  methods: {
    add() {
      if (!this.readonly && !this.disAdd) this.inputVal = '' + (+this.value + this.step).toFixed(this.prec)
    },
    minus() {
      if (!this.readonly && !this.disMinus) this.inputVal = '' + (+this.value - this.step).toFixed(this.prec)
    },
    getVal(val) {
      val = (val + '').trim()
      if (val) {
        if (isNaN(val)) {
          val = this.value
        } else if (+val > this.max) {
          val = this.max
        } else if (+val < this.min) {
          val = this.min
        }
        if (val && !this.prec) val = parseInt(val)
      }
      return val
    },
    formatVal() {
      return this.formatter ? this.formatter(this.inputVal) : this.inputVal
    },
    onInput(val) {
      if (this.parser) val = this.parser(val)
      this.inputVal = this.getVal(val)
      this.$el.querySelector('input').value = this.formatVal(this.inputVal)
    },
    onKeydown(e) {
      let k = e.keyCode, obj = { 38: this.add, 40: this.minus }
      if (k in obj) e.preventDefault(), obj[k]()
    },
    onBlur() {
      this.$emit('on-blur')
      if (this.inputVal) this.inputVal = (+this.inputVal).toFixed(this.prec)
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
  position: relative;
  display: inline-block;
  &_btns {
    position: absolute;
    top: 1px;
    right: 1px;
    bottom: 1px;
    width: 22px;
    opacity: 0;
    background: #fff;
    border-radius: 0 4px 4px 0;
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
    &.disabled {
      opacity: .72;
      color: #ccc;
      cursor: not-allowed;
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