<template>
  <div class="ui-poptip" v-winclick="handleWinClick">
    <div class="ui-poptip-rel" 
      @mouseenter="handleMouseenter" @mouseleave="handleMouseleave" 
      @mousedown="handleMousedown" @mouseup="handleMouseup"
      @click="handleClick">
      <slot></slot>
    </div>
    <ui-popper ref="Popper" arrowClass="ui-poptip-arrow" hasArrow 
      :class="[{confirm}, popperClass]" :style="popperStyles" :placement="placement" :visible="popperVisible">
      <div class="ui-poptip-body">
        <div class="ui-poptip-title">
          <UiIcon v-if="confirm" class="ui-poptip-confirm-icon" type="help-circled"/>
          <slot name="title">{{title}}</slot>
        </div>
        <div v-if="hasContent" class="ui-poptip-content">
          <slot name="content">{{content}}</slot>
        </div>
        <div v-if="confirm" class="ui-poptip-actions">
          <ui-button type="text" size="small" @click="onCancel">{{cancelText}}</ui-button>
          <ui-button type="primary" size="small" @click="onOK">{{okText}}</ui-button>
        </div>
      </div>
    </ui-popper>
  </div>
</template>
<script>
import UiIcon from './Icon'
import UiPopper from './popper/Popper'
import UiButton from './button/Button'
import { isSelfOrParent } from './../utils'
export default {
  components: { UiIcon, UiPopper, UiButton },
  data() {
    return { popperVisible: this.value }
  },
  props: {
    trigger: {
      default: 'click',
      validator(value) {
        return ['hover', 'click', 'focus'].indexOf(value) !== -1
      }
    },
    title: [String, Number],
    content: [String, Number],
    placement: {
      type: String,
      default: 'top'
    },
    width: [String, Number],
    confirm: Boolean,
    okText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    popperClass: String,
    value: Boolean
  },
  computed: {
    hasContent() {
      return this.content || this.$slots.content !== undefined
    },
    popperStyles() {
      return this.width ? { width: `${parseInt(this.width)}px` } : {}
    }
  },
  watch: {
    popperVisible(newVal) {
      this.$emit('input', newVal)
      this.$emit(`on-popper-${newVal ? 'show' : 'hide'}`)
    },
    value(newVal) {
      this.popperVisible = newVal
    }
  },
  methods: {
    handleMouseenter() {
      if (this.confirm) return
      if (this.trigger === 'hover') this.popperVisible = true
    },
    handleMouseleave() {
      if (this.confirm) return
      if (this.trigger === 'hover') this.popperVisible = false
    },
    handleMousedown() {
      if (this.confirm) return
      if (this.trigger === 'focus') this.popperVisible = true
    },
    handleMouseup() {
      if (this.confirm) return
      if (this.trigger === 'focus') this.popperVisible = false
    },
    handleClick() {
      if (this.trigger === 'click') {
        this.popperVisible = !this.popperVisible
      }
    },
    /**
     * 窗口单击处理
     * @param {MouseEvent} event
     */
    handleWinClick(event) {
      if (this.trigger !== 'click') return
      let { target } = event
      if (
        isSelfOrParent(this.$el, target) || 
        isSelfOrParent(this.$refs.Popper.$el, target)
      ) return
      this.popperVisible = false
    },
    onCancel() {
      this.popperVisible = false
      this.$emit('on-cancel')
    },
    onOK() {
      this.popperVisible = false
      this.$emit('on-ok')
    }
  }
}
</script>
<style lang="less">
.ui-poptip, .ui-poptip-rel {
  display: inline-block;
}

.ui-poptip-body {
  min-width: 150px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 6px rgba(0,0,0,.2);
}

.ui-poptip-title, .ui-poptip-content {
  padding: 8px 16px;
}

.ui-poptip-title {
  position: relative;
  font-size: 14px;
  &:after {
    content: '';
    display: block;
    height: 1px;
    position: absolute;
    left: 8px;
    right: 8px;
    bottom: 0;
    background-color: @divider-color;
  }
}

.ui-poptip-actions {
  text-align: right;
  padding: 8px 16px 16px;
  button + button {
    margin-left: 4px;
  }
}

.ui-poptip-confirm-icon {
  color: @warning-color;
  margin-right: 4px;
  position: absolute;
  left: 20px;
  line-height: inherit;
}

.ui-popper {
  &.confirm {
    max-width: 300px;
    .ui-poptip-title {
      padding: 16px 16px 8px 36px;
    }
  }
  .ui-poptip-arrow:after {
    content: '';
    border: 5px;
    width: 0;
    height: 0;
    position: absolute;
    border-color: transparent;
    border-style: solid;
  }
  &[x-placement^=top] {
    .ui-poptip-arrow:after {
      bottom: 1px;
      margin-left: -5px;
      border-bottom-width: 0;
      border-top-width: 5px;
      border-top-color: #fff;
    }
    .ui-popper-arrow.ui-poptip-arrow {
      border-top-color: rgba(217, 217, 217, .5);
    }
  }
  &[x-placement^=right] {
    .ui-poptip-arrow:after {
      left: 1px;
      bottom: -5px;
      border-left-width: 0;
      border-right-width: 5px;
      border-right-color: #fff;
    }
    .ui-popper-arrow.ui-poptip-arrow {
      border-right-color: rgba(217, 217, 217, .5);
    }
  }
  &[x-placement^=bottom] {
    .ui-poptip-arrow:after {
      top: 1px;
      margin-left: -5px;
      border-top-width: 0;
      border-bottom-width: 5px;
      border-bottom-color: #fff;
    }
    .ui-popper-arrow.ui-poptip-arrow {
      border-bottom-color: rgba(217, 217, 217, .5);
    }
  }
  &[x-placement^=left] {
    .ui-poptip-arrow:after {
      right: 1px;
      border-right-width: 0;
      border-left-width: 5px;
      border-left-color: #fff;
      bottom: -5px;
    }
    .ui-popper-arrow.ui-poptip-arrow {
      border-left-color: rgba(217, 217, 217, .5);
    }
  }
}
</style>