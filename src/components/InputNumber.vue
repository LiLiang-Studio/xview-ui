<template>
  <div class="ui-input-number">
    <UiInput ref="UiInput" v-model="inputValue" :elementId="elementId" :size="size" :disabled="disabled" :readonly="readonly||!editable"
      @on-keydown="handleKeydown" @on-keypress="handleKeypress" @on-blur="handleBlur"/>
    <div class="ui-input-number-actions" v-if="!disabled">
      <a class="ui-input-number-action" :class="{disabled: disabledAdd}" @click="add">
        <UiIcon type="ios-arrow-up"/>
      </a>
      <a class="ui-input-number-action" :class="{disabled: disabledMinus}" @click="minus">
        <UiIcon type="ios-arrow-down"/>
      </a>
    </div>
  </div>
</template>
<script>
import UiIcon from './Icon'
import UiInput from './Input'
export default {
  components: { UiIcon, UiInput },
  data() {
    return {
      inputValue: this.setValue(this.value)
    }
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
    placeholder: String,
    formatter: Function,
    parser: Function,
    readonly: Boolean,
    editable: {
      type: Boolean,
      default: true
    },
    precision: Number,
    elementId: String
  },
  computed: {
    disabledAdd() {
      return +this.inputValue + this.step > this.max
    },
    disabledMinus() {
      return +this.inputValue - this.step < this.min
    },
    prec() {
      let s = this.step.toString().split('.')[1]
      let digits = s ? s.length : 0
      return this.precision || digits
    }
  },
  watch: {
    inputValue(newVal, oldVal) {
      if (!newVal) return
      if (newVal.toString().split('').reverse()[0] === '.') return
      this.$nextTick(() => this.$refs.UiInput.$el.querySelector('input').value = newVal)
      this.$emit('input', +newVal)
    },
    value(newVal) {
      this.inputValue = this.setValue(newVal)
    }
  },
  methods: {
    setValue(val) {
      return Math.min(Math.max(+val, this.min), this.max)
    },
    add() {
      if (this.readonly) return
      if (+this.inputValue + this.step <= this.max) {
        this.inputValue = (+this.inputValue + this.step).toFixed(this.prec)
      }
    },
    minus() {
      if (this.readonly) return
      if (+this.inputValue - this.step >= this.min) {
        this.inputValue = (+this.inputValue - this.step).toFixed(this.prec)
      }
    },
    handleKeydown(event) {
      if (event.keyCode === 40) {
        event.preventDefault()
        this.minus()
      } else if (event.keyCode === 38) {
        event.preventDefault()
        this.add()
      }
    },
    handleKeypress(event) {
      let { value } = event.target
      if (event.keyCode === 46) {
        if (value.length === 0 || value.indexOf('.') !== -1) {
          return event.preventDefault()
        }
      }
      if (event.keyCode && (event.keyCode < 48 || event.keyCode > 57) && event.keyCode != 8 && event.keyCode != 46) {
        return event.preventDefault()
      }
    },
    handleBlur() {
      this.inputValue = this.setValue(this.inputValue)
    }
  }
}
</script>
<style lang="less">
.ui-input-number {
  display: inline-block;
  width: 80px;
  background-color: #fff;
  position: relative;
  &:hover {
    .ui-input input {
      border-color: @primary-color;
    }
    .ui-input-number-actions {
      opacity: 1;
    }
  }
}

.ui-input-number-actions {
  position: absolute;
  top: 1px;
  right: 1px;
  bottom: 1px;
  width: 22px;
  border-radius: 0 4px 4px 0;
  border-left: 1px solid @border-color;
  opacity: 0;
  background-color: #fff;
  transition: opacity .2s ease-in-out;
}

.ui-input-number-action {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50%;
  color: #999;
  font-size: 14px;
  + .ui-input-number-action {
    border-top: 1px solid @border-color;
  }
  &.disabled {
    opacity: .72;
    color: #ccc;
    cursor: not-allowed;
  }
}
</style>