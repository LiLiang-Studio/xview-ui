<template>
  <x-popper v-bind="popperProps" @clickoutside="toggle(false)" @on-popper-show="onPopperShow" @on-popper-hide="onOpenChange(false)">
    <div slot="reference" tabindex="0" :class="classes" @click="onClick">
      <div :class="`${prefix}_color`">
        <div v-if="!visible && !selectedValue" :class="`${prefix}_color_empty`">
          <x-icon type="ios-close-empty"/>
        </div>
        <div v-else :style="blockStyle"></div>
      </div>
      <x-icon :class="`${prefix}_arrow`" type="ios-arrow-down"/>
    </div>
    <div :class="`${prefix}_dropdown`">
      <div :class="`${prefix}_picker`">
        <div ref="Satur" tabindex="0" :class="`${prefix}_satur`" :style="saturStyle" @mousedown.prevent="onSaturMousedown">
          <div :class="`${prefix}_satur_white`"></div>
          <div :class="`${prefix}_satur_black`"></div>
          <div :class="`${prefix}_pointer`" :style="pointerStyle"></div>
        </div>
        <div v-if="hue" tabindex="0" ref="Hue" :class="`${prefix}_hue`" @mousedown.prevent="onHueMousedown">
          <span :style="hueCursorStyle"></span>
        </div>
        <div v-if="alpha" tabindex="0" ref="Alpha" :class="`${prefix}_alpha`" @mousedown.prevent="onAlphaMousedown">
          <div :class="`${prefix}_alpha_bar`" :style="alphaStyle"></div>
          <span :style="alphaCursorStyle"></span>
        </div>
        <ul v-if="defaultColors.length" :class="`${prefix}_colors`">
          <li v-for="color in defaultColors" :key="color">
            <div tabindex="-1" :class="`${prefix}_colors_block`" :style="{background: color}" @click="onBlockClick(color)">
              <div :class="`${prefix}_pointer`"></div>
            </div>
          </li>
        </ul>
      </div>
      <div :class="`${prefix}_confirm`">
        <x-input size="small" :readonly="!editable" v-model="tempValue" @on-blur="updateHsv"/>
        <x-btn size="small" @click="onClear">清空</x-btn>
        <x-btn size="small" type="primary" @click="onOK">确定</x-btn>
      </div>
    </div>
  </x-popper>
</template>
<script>
import tinycolor from 'tinycolor2'
import XIcon from '../icon'
import XInput from '../input'
import XBtn from '../button'
import XPopper from '../popper'
import { recommendColors } from './utils'
import { getOffset } from '../../tools'
const B = Boolean, BTrue = { type: B, default: true }
export default {
  name: 'XColorPicker',
  components: { XIcon, XInput, XBtn, XPopper },
  props: {
    value: String,
    disabled: B,
    editable: BTrue,
    alpha: B,
    hue: BTrue,
    recommend: B,
    colors: { type: Array, default: () => [] },
    format: {
      validator: v => ['hsl', 'hsv', 'hex', 'rgb'].indexOf(v) > -1
    },
    size: {
      validator: v => ['large', 'small', 'default'].indexOf(v) > -1
    }
  },
  data() {
    return {
      visible: false,
      tempValue: this.value,
      selectedValue: this.value,
      prefix: 'x-color-picker',
      hueCursor: {},
      pointer: {},
      hsv: {}
    }
  },
  computed: {
    classes() {
      return [
        this.prefix,
        this.size && `${this.prefix}_${this.size}`,
        { visible: this.visible, disabled: this.disabled }
      ]
    },
    popperProps() {
      return {
        adaptive: false,
        visible: this.visible,
        ...this.$attrs,
        transitionName: 'x-animate-dropdown'
      }
    },
    blockStyle() {
      return { background: this.visible ? this.tempValue : this.selectedValue }
    },
    defaultColors() {
      return this.colors.length ? this.colors : this.recommend ? recommendColors : []
    },
    saturStyle() {
      return { background: tinycolor({ h: this.hsv.h, s: 1, v: 1 }).toHexString() }
    },
    hueCursorStyle() {
      return { h: this.hsv.h, left: `${this.hsv.h / 360 * 100}%` }
    },
    pointerStyle() {
      return { left: `${this.hsv.s * 100}%`, top: `${(1 - this.hsv.v) * 100}%` }
    },
    alphaStyle() {
      let { r, g, b } = tinycolor(this.tempValue).toRgb(), rgb = `${r},${g},${b}`
      return { background: `linear-gradient(to right,rgba(${rgb},0) 0%,rgb(${rgb}) 100%)` }
    },
    alphaCursorStyle() {
      return { left: `${this.hsv.a / 1 * 100}%` }
    }
  },
  watch: {
    hsv(val) {
      this.tempValue = this.formatter(val)
    },
    selectedValue(val) {
      this.$emit('input', val)
    },
    value(val) {
      this.selectedValue = val
    }
  },
  methods: {
    formatter(hsv) {
      let format = this.format || (this.alpha ? 'rgb' : 'hex'), color = tinycolor(hsv)
      return {
        hsl: () => color.toHslString(),
        hsv: () => color.toHsvString(),
        hex: () => this.alpha ? color.toHex8String() : color.toHexString(),
        rgb: () => color.toRgbString()
      }[format]()
    },
    toggle(visible) {
      this.visible = visible === undefined ? !this.visible : visible
    },
    onClick() {
      !this.disabled && this.toggle()
    },
    onPopperShow() {
      this.tempValue = this.selectedValue || '#2d8cf0'
      this.updateHsv()
      this.onOpenChange(true)
    },
    onOpenChange(visible) {
      this.$emit('on-open-change', visible)
    },
    updateHsv() {
      this.hsv = tinycolor(this.tempValue).toHsv()
    },
    onClear() {
      this.toggle(false)
      this.selectedValue = ''
      this.$emit('on-change', this.selectedValue)
    },
    onOK() {
      this.toggle(false)
      this.selectedValue = this.tempValue
      this.$emit('on-change', this.selectedValue)
    },
    updatePointer(e) {
      let offset = getOffset(this.$refs.Satur)
      let { offsetWidth, offsetHeight } = this.$refs.Satur
      let s = (e.clientX - offset.left) / offsetWidth
      let v = (offsetHeight - (e.clientY - offset.top)) / offsetHeight
      s = s < 0 ? 0 : s > 1 ? 1 : s
      v = v < 0 ? 0 : v > 1 ? 1 : v
      this.hsv = { ...this.hsv, s, v }
    },
    onSaturMousedown(e) {
      this.updatePointer(e)
      window.addEventListener('mousemove', this.updatePointer, false)
      window.addEventListener('mouseup', this.onSaturMouseup, false)
    },
    onSaturMouseup(e) {
      this.$refs.Satur.focus()
      window.removeEventListener('mousemove', this.updatePointer, false)
      window.removeEventListener('mouseup', this.onSaturMouseup, false)
    },
    updateHue(e) {
      let offset = getOffset(this.$refs.Hue)
      let { offsetWidth, offsetHeight } = this.$refs.Hue
      let h = (e.clientX - offset.left) / offsetWidth * 360
      this.hsv = { ...this.hsv, h: h > 360 || h < 0 ? 0 : h }
    },
    onHueMousedown(e) {
      this.updateHue(e)
      window.addEventListener('mousemove', this.updateHue, false)
      window.addEventListener('mouseup', this.onHueMouseup, false)
    },
    onHueMouseup() {
      this.$refs.Hue.focus()
      window.removeEventListener('mousemove', this.updateHue, false)
      window.removeEventListener('mouseup', this.onHueMouseup, false)
    },
    onBlockClick(color) {
      this.hsv = tinycolor(color).toHsv()
    },
    updateAlpha(e) {
      let offset = getOffset(this.$refs.Alpha)
      let { offsetWidth, offsetHeight } = this.$refs.Alpha
      let a = (e.clientX - offset.left) / offsetWidth
      this.hsv = { ...this.hsv, a: a > 1 ? 1 : a < 0 ? 0 : a }
    },
    onAlphaMousedown(e) {
      this.updateAlpha(e)
      window.addEventListener('mousemove', this.updateAlpha, false)
      window.addEventListener('mouseup', this.onAlphaMouseup, false)
    },
    onAlphaMouseup() {
      this.$refs.Alpha.focus()
      window.removeEventListener('mousemove', this.updateAlpha, false)
      window.removeEventListener('mouseup', this.onAlphaMouseup, false)
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
@prefix: .x-color-picker;
@{prefix} {
  outline: none;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  padding: 0 7px;
  height: @size-normal;
  border-radius: 4px;
  border: 1px solid @border-color;
  transition: all .2s;
  &:hover:not(.disabled), &:focus:not(.disabled), &.visible {
    border-color: @primary-color;
  }
  &.visible {
    .control-shadow(@primary-color);
  }
  &.disabled {
    cursor: not-allowed;
    background: lighten(@disabled-color, 18%);
  }
  &_color {
    width: 18px;
    height: 18px;
    margin-right: 10px;
    background: url("../../icons/alpha.png");
    div {
      width: 100%;
      height: 100%;
      border-radius: 2px;
    }
    &_empty {
      pointer-events: none;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      border-radius: 2px;
      overflow: hidden;
      background: #fff;
      box-shadow: inset 0 0 0 1px rgba(0,0,0,.15);
    }
  }
  &_arrow {
    font-weight: bold;
  }
  &_large {
    height: @size-large;
    @{prefix}_color {
      width: 20px;
      height: 20px;
    }
    @{prefix}_arrow {
      font-size: 16px;
    }
  }
  &_small {
    height: @size-small;
    @{prefix}_color {
      width: 14px;
      height: 14px;
    }
  }
  &_picker {
    padding: 8px 8px 0;
  }
  &_pointer {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0,0,0,.3), 0 0 1px 2px rgba(0,0,0,.4);
  }
  &_hue, &_alpha, &_satur {
    outline: none;
    transition: box-shadow .2s;
    &:focus {
      .control-shadow(@primary-color);
    }
  }
  &_satur {
    width: 240px;
    height: 180px;
    cursor: pointer;
    position: relative;
    > div {
      position: absolute;
    }
    &_white, &_black {
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
    &_white {
      background: linear-gradient(90deg,#fff,hsla(0,0%,100%,0));
    }
    &_black {
      background: linear-gradient(0deg,#000,transparent);
    }
    @{prefix}_pointer {
      transform: translate(-2px, -2px);
    }
  }
  &_hue, &_alpha {
    height: 10px;
    margin-top: 10px;
    border-radius: 2px;
    cursor: pointer;
    position: relative;
    span {
      position: absolute;
      width: 4px;
      height: 8px;
      top: 1px;
      border-radius: 1px;
      box-shadow: 0 0 2px rgba(0,0,0,.6);
      background: #fff;
      transform: translateX(-2px);
    }
  }
  &_hue {
    background: linear-gradient(90deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red);
  }
  &_alpha {
    background: url("../../icons/alpha.png");
    background-size: 10px;
    &_bar {
      border-radius: 2px;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  }
  &_colors {
    list-style: none;
    margin: 10px 0 -2px;
    width: 240px;
    overflow: hidden;
    li {
      float: left;
      width: 8.33%;
      text-align: center;
    }
    &_block {
      outline: none;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      vertical-align: top;
      width: 16px;
      height: 16px;
      border-radius: 2px;
      box-shadow: inset 0 0 0 1px rgba(0,0,0,.15);
      &:not(:focus) @{prefix}_pointer {
        display: none;
      }
    }
  }
  &_confirm {
    display: flex;
    padding: 8px;
    margin-top: 8px;
    border-top: 1px solid @border-color;
    .x-input {
      width: 0;
      flex: 1;
      margin-right: 10px;
    }
    .x-btn:not(:last-child) {
      margin-right: 5px;
    }
    input {
      font-size: 12px;
    }
  }
}
</style>