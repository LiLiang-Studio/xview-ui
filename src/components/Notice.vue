<template>
  <transition name="notice" translate>
    <div class="ui-notice" :class="[type, { showIcon, hasDesc: !!desc }]">
      <UiIcon class="ui-notice-icon" v-if="showIcon" :type="iconType"/>
      <div class="ui-notice-body">
        <p class="ui-notice-title" v-if="title">{{title}}</p>
        <p class="ui-notice-desc" v-html="desc"></p>
      </div>
      <UiCloseIconButton class="ui-notice-close" @click="close"/>
    </div>
  </transition>
</template>
<script>
import UiIcon from './icon'
import UiCloseIconButton from './close-icon-button'
import { iconTypes, isFunc } from '../utils'
export default {
  components: { UiIcon, UiCloseIconButton },
  props: {
    title: String,
    desc: String,
    duration: Number,
    onClose: Function,
    type: {
      default: 'open',
      validator(value) {
        return ['info', 'success', 'warning', 'error', 'open'].indexOf(value) !== -1
      }
    }
  },
  computed: {
    iconType() {
      return iconTypes[this.type]
    },
    showIcon() {
      return this.type !== 'open'
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
.ui-notice-wrapper {
  position: fixed;
  right: 24px;
  width: 335px;
}

.ui-notice {
  background-color: #fff;
  padding: 16px;
  border-radius: 4px;
  position: relative;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  overflow: hidden;
  box-shadow: 0 1px 6px rgba(0,0,0,.2);
  transition: all .3s ease-in-out;
  will-change: transform, opacity;
  &:before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 4px;
    content: '';
  }
  &.info {
    &:before {
      background-color: @primary-color;
    }
    .ui-notice-icon {
      color: @primary-color;
    }
  }
  &.success {
    &:before {
      background-color: @success-color;
    }
    .ui-notice-icon {
      color: @success-color;
    }
  }
  &.warning {
    &:before {
      background-color: @warning-color;
    }
    .ui-notice-icon {
      color: @warning-color;
    }
  }
  &.error {
    &:before {
      background-color: @error-color;
    }
    .ui-notice-icon {
      color: @error-color;
    }
  }
  &.hasDesc {
    padding: 16px;
    .ui-notice-icon {
      font-size: 28px;
      margin-right: 16px;
      align-self: flex-start;
    }
    .ui-notice-title {
      font-weight: bold;
      margin-bottom: 6px;
    }
  }
}

.ui-notice-icon {
  font-size: 14px;
  margin-right: 8px;
}

.ui-notice-title {
  color: @title-color;
  font-size: 14px;
  word-break: break-all;
  padding-right: 16px;
  line-height: 1.4;
}

.ui-notice-desc {
  font-size: 12px;
  line-height: 1.5;
  word-break: break-word;
  margin-top: 2px;
}

.ui-notice-close {
  position: absolute;
  top: 7px;
  right: 7px;
  width: 22px;
  text-align: center;
}
</style>