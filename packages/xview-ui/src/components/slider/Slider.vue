<template>
  <div :class="[prefix, {disabled}]">
    <!-- 滑块 -->
    <div ref="Wrap" :class="`${prefix}_wrap`" @click="update">
      <!-- 离散点 -->
      <span v-for="_ in stops" :key="_" :class="getStopClass(_)" :style="{left: `${_}%`}"></span>
      <!-- 已选择部分 -->
      <div :class="`${prefix}_bar`" :style="barStyle">
        <!-- 👈按钮 -->
        <template v-if="range">
          <x-tooltip v-if="showTip !== 'never' && tipContent.left !== null" ref="LeftTooltip" v-bind="tipProps.left">
            <div slot="content">{{tipContent.left}}</div>
            <span :class="btnClass.left" @mousedown.prevent="onLeftMousedown"></span>
          </x-tooltip>
          <span v-else :class="btnClass.left" @mousedown.prevent="onLeftMousedown"></span>
        </template>
        <!-- 👉按钮 -->
        <x-tooltip v-if="showTip !== 'never' && tipContent.right !== null" ref="RightTooltip" v-bind="tipProps.right">
          <div slot="content">{{tipContent.right}}</div>
          <span :class="btnClass.right" @mousedown.prevent="onRightMousedown"></span>
        </x-tooltip>
        <span v-else :class="btnClass.right" @mousedown.prevent="onRightMousedown"></span>
      </div>
      <div>
        <span :class="`${prefix}_mark`" v-for="_ in markArray" :key="_.key" :style="{left: `${_.key}%`, ..._.style}" v-html="_.label"></span>
      </div>
    </div>
    <x-input-number v-if="showInput && !range" :class="`${prefix}_input`" v-model="inputValue" v-bind="inputProps"/>
  </div>
</template>
<script>
import { getOffset, isStr } from '../../tools'
import XTooltip from '../tooltip'
import XInputNumber from '../input-number'
const N = Number, B = Boolean
export default {
  name: 'XSlider',
  components: { XTooltip, XInputNumber },
  props: {
    value: { type: [N, Array], default: 0 },
    min: { type: N, default: 0 },
    max: { type: N, default: 100 },
    step: { type: N, default: 1 },
    disabled: B,
    range: B,
    showInput: B,
    showStops: B,
    showTip: {
      default: 'hover',
      validator(v) {
        return ['hover', 'always', 'never'].indexOf(v) > -1
      }
    },
    tipFormat: Function,
    inputSize: {
      validator(v) {
        return ['large', 'small', 'default'].indexOf(v) > -1
      }
    },
    marks: Object
  },
  data() {
    return { prefix: 'x-slider', inputValue: this.value, oldValue: this.value, rightDown: false, leftDown: false }
  },
  computed: {
    inputProps() { // 输入框属性
      return { min: this.min, max: this.max, step: this.step, size: this.inputSize }
    },
    total() { // 总数值
      return this.max - this.min
    },
    stops() { // 离散点数据
      return this.showStops ?
        Array.apply(null, { length: Math.floor(this.total / this.step) }).map((_, i) => (i + 1) * this.step) : Object.keys(this.marks || {})
    },
    markArray() { // 标记
      return Object.keys(this.marks || {}).map(key => {
        return isStr(this.marks[key]) ? { key, style: {}, label: this.marks[key] } : { key, ...this.marks[key] }
      })
    },
    btnClass() { // 按钮类
      let btnClass = `${this.prefix}_btn`
      return { left: [btnClass, 'left', { down: this.leftDown }], right: [btnClass, 'right', { down: this.rightDown }] }
    },
    tipProps() { // 文字提示属性
      let prop = { placement: 'top', transfer: true }, always = this.showTip === 'always'
      return { left: { ...prop, always: this.leftDown || always }, right: { ...prop, always: this.rightDown || always } }
    },
    tipContent() { // 文字提示内容
      let { inputValue } = this, getText = v => this.tipFormat ? this.tipFormat(v) : v
      return this.range ? { left: getText(inputValue[0]), right: getText(inputValue[1]) } : { right: getText(inputValue) }
    },
    barStyle() { // bar样式
      let { inputValue, range, total } = this
      if (range) {
        let [a, b] = inputValue
        return { left: `${a / total * 100}%`, width: `${(b - a) / total * 100}%` }
      } else {
        return { width: `${inputValue / total * 100}%` }
      }
    }
  },
  watch: {
    value(val) {
      this.inputValue = val
    },
    inputValue(val) {
      this.$emit('input', val)
      this.$emit('on-input', val)
      let { LeftTooltip: LTip, RightTooltip: RTip } = this.$refs
      this.$nextTick(() => this.leftDown ? LTip && LTip.updatePosition() : this.rightDown ? RTip && RTip.updatePosition() : 1)
    }
  },
  methods: {
    getStopClass(stop) {
      let [a, b] = this.range ? this.inputValue : [this.inputValue]
      return [`${this.prefix}_stop`, { inside: this.range ? stop > a && stop < b : stop < a }]
    },
    update(e) {
      if (!this.disabled) {
        let { Wrap } = this.$refs, 
          { left } = getOffset(Wrap),
          tarVal = (e.clientX - left ) / Wrap.offsetWidth * this.total,
          val = Math.floor(tarVal / this.step) * this.step,
          toValue = Math.max(Math.min(val, this.max), this.min)
        if (this.range) {
          let [a, b] = this.inputValue
          if (this.leftDown) {
            this.inputValue = toValue > b ? [toValue, toValue] : [toValue, b]
          } else if (this.rightDown) {
            this.inputValue = toValue > a ? [a, toValue] : [toValue, toValue]
          } else {
            this.inputValue = Math.abs(a - toValue) < Math.abs(b - toValue) ? [toValue, b] : [a, toValue]
          }
        } else {
          this.inputValue = toValue
        }
      }
    },
    onRightMousedown() {
      if (!this.disabled) {
        this.rightDown = true
        this.addWinEvents()
      }
    },
    onLeftMousedown() {
      if (!this.disabled) {
        this.leftDown = true
        this.addWinEvents()
      }
    },
    addWinEvents() {
      this.oldValue = this.range ? [...this.inputValue] : this.inputValue
      document.body.classList.add(`${this.prefix}_move`)
      window.addEventListener('mouseup', this.onMouseup)
      window.addEventListener('mousemove', this.onMousemove)
    },
    onMousemove(e) {
      if (this.rightDown || this.leftDown) this.update(e)
    },
    onMouseup() {
      let { oldValue, inputValue } = this
      let [a, b] = this.range ? oldValue : [oldValue]
      let [m, n] = this.range ? inputValue : [inputValue]
      if (a !== m || b !== n) this.$emit('on-change', inputValue)
      document.body.classList.remove(`${this.prefix}_move`)
      this.rightDown = this.leftDown = false
      window.removeEventListener('mouseup', this.onMouseup)
      window.removeEventListener('mousemove', this.onMousemove)
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
@prefix: .x-slider;
@btnRadius: 6px;
@{prefix} {
  display: flex;
  align-items: center;
  &.disabled {
    @{prefix}_wrap, @{prefix}_btn {
      cursor: not-allowed;
    }
    @{prefix}_wrap, @{prefix}_bar {
      background: #ccc;
    }
    @{prefix}_btn {
      border-color: #ccc;
    }
  }
  &_wrap {
    flex: 1;
    height: 4px;
    margin: 8px 0;
    cursor: pointer;
    position: relative;
    border-radius: 3px;
    background: @divider-color;
  }
  &_stop {
    position: absolute;
    top: 0;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #ccc;
    &.inside {
      z-index: 1;
      background: #fff;
    }
  }
  &_mark {
    color: @sub-color;
    position: absolute;
    margin-top: 10px;
    transform: translateX(-50%);
  }
  &_bar {
    position: absolute;
    left: 0;
    height: 100%;
    border-radius: 3px;
    background: @primary-color;
  }
  &_btn {
    position: absolute;
    top: 50%;
    width: @btnRadius * 2;
    height: @btnRadius * 2;
    margin-top: -@btnRadius;
    border-radius: 50%;
    background: #fff;
    transition: all .2s;
    border: 2px solid @primary-color;
    &.left {
      left: -@btnRadius;
    }
    &.right {
      right: -@btnRadius;
    }
    &:hover, &.down {
      transform: scale(1.5);
    }
  }
  &_input {
    margin-left: 20px;
  }
  &_move, &_btn:hover, &_btn.down {
    cursor: grab;
  }
}
</style>