<template>
  <div class="ui-rate">
    <ul class="ui-rate-stars">
      <li class="ui-rate-star-item" v-for="i in count" :key="i">
        <UiIcon class="ui-rate-icon" type="star" 
          :class="{active: isActive(i), hover: i <= tempValue, disabled}"
          @mouseenter.native="handleMouseenter(i)" @mouseleave.native="handleMouseleave" @click="handleClick(i)"/>
        <div class="ui-rate-star-half" ref="starHalf" v-if="allowHalf">
          <UiIcon class="ui-rate-icon" type="star" 
            :class="{active: isActive(i, false), hover: i <= tempValue + .5, disabled}"
            @mouseenter.native="handleMouseenter(i, false)" @mouseleave.native="handleMouseleave" @click="handleClick(i, false)"/>
        </div>
      </li>
    </ul>
    <span class="ui-rate-text" v-if="showText">
      <slot>{{inputValue}} 星</slot>
    </span>
  </div>
</template>
<script>
import UiIcon from './Icon'
export default {
  components: { UiIcon },
  data() {
    return {
      inputValue: this.value,
      tempValue: this.value
    }
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 5
    },
    allowHalf: Boolean,
    disabled: Boolean,
    showText: Boolean
  },
  watch: {
    value(newVal) {
      this.inputValue = newVal
    }
  },
  methods: {
    handleMouseenter(i, isFull = true) {
      if (this.disabled) return
      this.tempValue = isFull ? i : i - .5
    },
    handleMouseleave() {
      this.tempValue = this.inputValue
    },
    handleClick(i, isFull = true) {
      if (this.disabled) return
      this.inputValue = isFull ? i : i - .5
      this.$emit('input', this.inputValue)
      this.$emit('on-change', this.inputValue)
    },
    isActive(i, isFull = true) {
      return i <= this.tempValue && i <= this.inputValue + (isFull ? 0 : .5)
    }
  }
}
</script>
<style lang="less">
.ui-rate {
  display: inline-block;
}

.ui-rate-stars {
  list-style: none;
  display: inline-block;
  vertical-align: middle;
}

.ui-rate-star-item {
  display: inline-block;
  position: relative;
  color: #e9e9e9;
  margin-right: 8px;
  font-size: 20px;
}

.ui-rate-star-half {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  overflow: hidden;
}

.ui-rate-icon {
  transition: color .2s ease-in-out;
  &:not(.disabled) {
    cursor: pointer;
  }
  &.active:not(.hover), &.hover {
    color: @warning-light-color;
  }
}

.ui-rate-text {
  display: inline-block;
  vertical-align: middle;
  margin-left: 8px;
}
</style>