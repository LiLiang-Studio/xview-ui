<template>
  <div :class="['x-steps', size, direction]">
    <slot></slot>
  </div>
</template>
<script>
import { findChildrens } from '../../tools'
export default {
  name: 'XSteps',
  props: {
    status: {
      default: 'process',
      validator(v) {
        return ['wait', 'process', 'finish', 'error'].indexOf(v) !== -1
      }
    },
    current: {
      type: Number,
      default: 0
    },
    size: {
      validator(v) {
        return v === 'small'
      }
    },
    direction: {
      validator(v) {
        return ['horizontal', 'vertical'].indexOf(v) !== -1
      }
    }
  },
  watch: {
    current: {
      immediate: true,
      handler: 'setItemsState'
    }
  },
  methods: {
    setItemsState() {
      this.$nextTick(() => {
        let steps = findChildrens(this, 'XStep'), count = steps.length
        steps.forEach((_, i) => _.state = {
          index: i,
          status: i === this.current ? this.status : i < this.current ? 'finish' : 'wait'
        })
      })
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
@prefix: .x-steps;
@item-prefix: .x-step;
@step: .x-step;
.x-steps {
  display: flex;
  align-items: flex-start;
  &.small {
    @{step} {
      padding-left: 18px;
      &_icon {
        width: 18px;
        height: 18px;
        font-size: 12px;
        .x-icon {
          font-size: 16px;
        }
      }
      &_title {
        font-size: 12px;
      }
    }
  }
  &.vertical {
    flex-direction: column;
    @{step} {
      padding-bottom: 24px;
      &_head {
        height: 100%;
        right: auto;
        flex-direction: column;
      }
      &_tail {
        margin: 4px;
        &, &:before {
          border-width: 0 0 0 2px;
        }
        &:before {
          left: -2px;
        }
      }
    }
  }
}
@{step} {
  flex: 1;
  position: relative;
  padding-left: 26px;
  &:last-child &_tail {
    display: none;
  }
  &_head {
    position: absolute;
    top: 0;
    right: 10px;
    left: 0;
    z-index: -1;
    display: flex;
    align-items: center;
  }
  &_icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: @primary-color;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: 1px solid @primary-color;
    font-size: 14px;
    transition: all .2s ease-in-out;
    &.custom {
      border: none;
      background: none;
      color: @primary-color;
    }
    .x-icon {
      font-size: 24px;
    }
  }
  &_tail {
    flex: 1;
    position: relative;
    border-color: @divider-color;
    &, &:before {
      border-style: solid;
      border-width: 0 0 1px;
    }
    &:before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border-color: @primary-color;
      transform: scale(0);
      transform-origin: 0 0;
      transition: transform .3s;
    }
  }
  &_main {
    color: #999;
  }
  &_title, &_content {
    padding-left: 10px;
  }
  &_title {
    background: #fff;
    font-size: 14px;
    padding-right: 10px;
  }
  &_content {
    font-size: 12px;
    margin-top: 3px;
  }
  &_finish {
    @{step} {
      &_tail:before {
        transform: scale(1);
      }
    }
  }
  &_process {
    @{step} {
      &_icon {
        color: #fff;
        background: @primary-color;
      }
      &_main {
        color: #666;
      }
      &_icon.custom {
        background: none;
        color: @primary-color;
      }
    }
  }
  &_wait {
    @{step}_icon {
      color: @disabled-color;
      border-color: currentColor;
    }
  }
  &_error {
    @{step} {
      &_icon, &_title, &_content {
        color: @error-color;
      }
      &_icon {
        border-color: currentColor;
      }
    }
  }
}
</style>