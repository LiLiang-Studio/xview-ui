<template>
  <div class="ui-slider" :class="{disabled}">
    <div class="ui-slider-wrap" ref="Bar" @click="update">
      <span class="ui-slider-breakpoint" v-for="item in stopValues" :key="item" :style="{left: `${item}%`}"></span>
      <div class="ui-slider-bar" :style="barStyle">
        <template v-if="range">
          <ui-tooltip ref="LeftTooltip" placement="top" v-if="hasTip" :always="leftBtnDown || isTipAlways">
            <div slot="content">{{inputValue[0]}}</div>
            <span class="ui-slider-btn left" :class="{down: leftBtnDown}" @mousedown.prevent="handleLeftMousedown"></span>
          </ui-tooltip>
          <span v-else class="ui-slider-btn left" :class="{down: leftBtnDown}" @mousedown.prevent="handleLeftMousedown"></span>
        </template>
        <ui-tooltip ref="RightTooltip" placement="top" v-if="hasTip && rightValue !== null" :always="rightBtnDown || isTipAlways">
          <div slot="content">{{rightValue}}</div>
          <span class="ui-slider-btn right" :class="{down: rightBtnDown}" @mousedown.prevent="handleRightMousedown"></span>
        </ui-tooltip>
        <span v-else class="ui-slider-btn right" :class="{down: rightBtnDown}" @mousedown.prevent="handleRightMousedown"></span>
      </div>
    </div>
    <UiInputNumber class="ui-slider-input-number" v-if="hasInputNumber" 
      v-model="inputValue" :min="min" :max="max" :step="step" :size="inputSize"/>
  </div>
</template>
<script>
import { getOffset } from './../utils'
import UiTooltip from './Tooltip'
import UiInputNumber from './InputNumber'
export default {
  components: { UiTooltip, UiInputNumber },
  data() {
    return {
      inputValue: this.value,
      rightBtnDown: false,
      leftBtnDown: false
    }
  },
  props: {
    value: {
      type: [Number, Array],
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    disabled: Boolean,
    range: Boolean,
    showInput: Boolean,
    showStops: Boolean,
    showTip: {
      default: 'hover',
      validator(value) {
        return ['hover', 'always', 'never'].indexOf(value) !== -1
      }
    },
    tipFormat: Function,
    inputSize: {
      validator(value) {
        return ['large', 'small', 'default'].indexOf(value) !== -1
      }
    }
  },
  computed: {
    isTipAlways() {
      return this.showTip === 'always'
    },
    hasTip() {
      return this.showTip !== 'never'
    },
    val() {
      return this.max - this.min
    },
    rightValue() {
      let value = this.range ? this.inputValue[1] : this.inputValue
      return this.tipFormat ? this.tipFormat(value) : value
    },
    barStyle() {
      let { min, max, inputValue, range, val } = this
      if (range) {
        let [a, b] = inputValue
        return { left: `${a / val * 100}%`, width: `${(b - a) / val * 100}%` }
      } else {
        return { width: `${inputValue / val * 100}%` }
      }
    },
    stopValues() {
      if (!this.showStops) return []
      let { step, min, max, val } = this, points = []
      let start = Math.floor(step / val * 100), p = start
      while (p < 100) {
        points.push(p)
        p += start
      }
      return points
    },
    hasInputNumber() {
      return this.showInput && !this.range
    }
  },
  watch: {
    value(newVal) {
      this.inputValue = newVal
    },
    inputValue(newVal) {
      this.$emit('input', newVal)
      this.$emit('on-change', newVal)
      this.$nextTick(() => {
        if (this.leftBtnDown) {
          this.$refs.LeftTooltip && this.$refs.LeftTooltip.setPosition()
        } else if (this.rightBtnDown) {
          this.$refs.RightTooltip && this.$refs.RightTooltip.setPosition()
        }
      })
    }
  },
  methods: {
    getMovingValue(event) {
      let { left } = getOffset(this.$refs.Bar)
      let tarVal = (event.clientX - left ) / this.$refs.Bar.offsetWidth * this.val
      let val = Math.floor(tarVal / this.step) * this.step
      return Math.max(Math.min(val, this.max), this.min)
    },
    update(event) {
      if (this.disabled) return
      let { left } = getOffset(this.$refs.Bar)
      let tarVal = (event.clientX - left ) / this.$refs.Bar.offsetWidth * this.val
      let moveToValue = this.getMovingValue(event)
      if (this.range) {
        let [a, b] = this.inputValue
        if (this.leftBtnDown) {
          this.inputValue = moveToValue > b ? [moveToValue, moveToValue] : [moveToValue, b]
        } else if (this.rightBtnDown) {
          this.inputValue = moveToValue > a ? [a, moveToValue] : [a, a]
        } else {
          this.inputValue = moveToValue > a ? [a, moveToValue] : [moveToValue, b]
        }
      } else {
        this.inputValue = moveToValue
      }
    },
    handleRightMousedown() {
      if (this.disabled) return
      this.rightBtnDown = true
      this.addWinEvents()
    },
    handleLeftMousedown(event) {
      if (this.disabled) return
      this.leftBtnDown = true
      this.addWinEvents()
    },
    addWinEvents() {
      window.addEventListener('mousemove', this.handleMousemove)
      window.addEventListener('mouseup', this.handleMouseup)
    },
    removeWinEvents() {
      window.removeEventListener('mousemove', this.handleMousemove)
      window.removeEventListener('mouseup', this.handleMouseup)
    },
    handleMousemove(event) {
      if (this.rightBtnDown || this.leftBtnDown) this.update(event)
    },
    handleMouseup() {
      this.removeWinEvents()
      this.rightBtnDown = this.leftBtnDown = false
    }
  }
}
</script>
<style lang="less">
.ui-slider {
  display: flex;
  align-items: center;
  &.disabled {
    .ui-slider-wrap, .ui-slider-bar {
      cursor: not-allowed;
      background-color: #ccc;
    }
    .ui-slider-btn {
      cursor: not-allowed;
      border-color: #ccc;
    }
  }
}

.ui-slider-wrap {
  flex: 1;
  margin: 16px 0;
  height: 4px;
  background-color: @divider-color;
  position: relative;
  border-radius: 3px;
  cursor: pointer;
}

.ui-slider-breakpoint {
  position: absolute;
  top: 0;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #ccc;
}

.ui-slider-bar {
  position: absolute;
  left: 0;
  width: 27%;
  height: 100%;
  border-radius: 3px;
  background-color: @primary-color;
}

.ui-slider-btn {
  position: absolute;
  top: 50%;
  width: 12px;
  height: 12px;
  margin-top: -6px;
  border: 2px solid @primary-color;
  border-radius: 50%;
  background-color: #fff;
  transition: all .2s;
  &.left {
    left: -6px;
  }
  &.right {
    right: -6px;
  }
  &:hover, &.down {
    cursor: grab;
    transform: scale(1.5);
  }
}

.ui-slider-input-number {
  margin-left: 20px;
}
</style>