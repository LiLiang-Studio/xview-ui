<template>
  <div class="ui-slider" :class="{disabled}">
    <div class="ui-slider-wrap">
      <span class="ui-slider-breakpoint" v-for="item in stopValues" :key="item" :style="{left: `${item}%`}"></span>
      <div class="ui-slider-bar" :style="barStyle">
        <template v-if="range">
          <ui-tooltip placement="top" v-if="hasTip" :always="isTipAlways">
            <div slot="content">{{changingValue[0]}}</div>
            <span class="ui-slider-btn left"
              @mousedown="handleLeftMousedown" @mousemove="handleLeftMousemove" @mouseup="handleLeftMouseup"></span>
          </ui-tooltip>
          <span v-else class="ui-slider-btn left"
            @mousedown="handleLeftMousedown" @mousemove="handleLeftMousemove" @mouseup="handleLeftMouseup"></span>
        </template>
        <ui-tooltip placement="top" v-if="hasTip && rightValue !== null" :always="isTipAlways">
          <div slot="content">{{rightValue}}</div>
          <span class="ui-slider-btn right" 
            @mousedown="handleRightMousedown" @mousemove="handleRightMousemove" @mouseup="handleRightMouseup"></span>
        </ui-tooltip>
        <span v-else class="ui-slider-btn right" 
          @mousedown="handleRightMousedown" @mousemove="handleRightMousemove" @mouseup="handleRightMouseup"></span>
      </div>
    </div>
    <UiInputNumber class="ui-slider-input-number" v-if="hasInputNumber" v-model="inputValue" :min="min" :max="max" :step="step"/>
  </div>
</template>
<script>
import UiTooltip from './Tooltip'
import UiInputNumber from './InputNumber'
export default {
  components: { UiTooltip, UiInputNumber },
  data() {
    return {
      inputValue: this.value,
      changingValue: this.value
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
    rightValue() {
      let value = this.range ? this.changingValue[1] : this.changingValue
      return this.tipFormat ? this.tipFormat(value) : value
    },
    barStyle() {
      let { min, max, changingValue, range } = this, val = max - min
      if (range) {
        let [a, b] = changingValue
        return { left: `${a / val * 100}%`, width: `${(b - a) / val * 100}%` }
      } else {
        return { width: `${changingValue / val * 100}%` }
      }
    },
    stopValues() {
      if (!this.showStops) return []
      let { step, min, max } = this, val = max - min, points = []
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
      this.changingValue = newVal
      this.$emit('input', newVal)
      this.$emit('on-change', newVal)
    }
  },
  methods: {
    /**
     * 右边按钮鼠标按下
     * @param {MouseEvent} event
     */
    handleRightMousedown(event) {

    },
    /**
     * 右边按钮鼠标移动
     * @param {MouseEvent} event
     */
    handleRightMousemove(event) {

    },
    /**
     * 右边按钮鼠标松开
     * @param {MouseEvent} event
     */
    handleRightMouseup(event) {

    },
    /**
     * 左边按钮鼠标按下
     * @param {MouseEvent} event
     */
    handleLeftMousedown(event) {

    },
    /**
     * 左边按钮鼠标移动
     * @param {MouseEvent} event
     */
    handleLeftMousemove(event) {

    },
    /**
     * 左边按钮鼠标松开
     * @param {MouseEvent} event
     */
    handleLeftMouseup(event) {

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
  &:hover {
    cursor: grab;
    transform: scale(1.5);
  }
}

.ui-slider-input-number {
  margin-left: 20px;
}
</style>