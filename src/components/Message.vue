<template>
  <transition name="message" translate>
    <div class="ui-message">
      <div class="ui-message-outer">
        <div class="ui-message-inner">
          <UiIcon class="ui-message-icon" :class="type" :type="iconType"/>
          <p class="ui-message-content" v-html="content" :class="{closable}"></p>
          <UiCloseIconButton v-if="closable" @click="close"/>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import UiIcon from './Icon.vue'
import UiCloseIconButton from './CloseIconButton.vue'
import { iconTypes, isFunc } from '../utils'
export default {
  components: { UiIcon, UiCloseIconButton },
  props: {
    content: String,
    duration: Number,
    onClose: Function,
    closable: Boolean,
    type: {
      default: 'info',
      validator(value) {
        return ['info', 'success', 'warning', 'error', 'loading'].indexOf(value) !== -1
      }
    }
  },
  computed: {
    iconType() {
      return iconTypes[this.type]
    }
  },
  methods: {
    close(event) {
      this.$emit('destroy')
      clearTimeout(this.tid)
      isFunc(this.onClose) && this.onClose()
    },
    timer() {
      if (this.duration === 0) return
      this.tid = setTimeout(() => this.close(), this.duration * 1000)
    }
  },
  mounted() {
    this.timer()
  }
}
</script>
<style lang="less">
@import url("../styles/vars.less");
.ui-message-wrapper {
  pointer-events: none;
  position: fixed;
  right: 0;
  left: 0;
}

.ui-message {
  text-align: center;
  pointer-events: none;
  transition: all .3s ease-in-out;
  will-change: transform, opacity;
  padding: 8px 0;
}

.ui-message-outer {
  display: inline-block;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 6px rgba(0,0,0,.2);
  pointer-events: all;
}

.ui-message-inner {
  display: flex;
  align-items: center;
  padding: 8px 16px;
}

.ui-message-icon {
  margin-right: 12px;
  font-size: 14px;
  &.info {
    color: @info-color;
  }
  &.success {
    color: @success-color;
  }
  &.warning {
    color: @warning-color;
  }
  &.error {
    color: @error-color;
  }
  &.loading {
    color: @primary-color;
    animation: ani-load-loop 1s linear infinite;
  }
}

.ui-message-content {
  font-size: 12px;
  &.closable {
    padding-right: 32px;
  }
}
</style>