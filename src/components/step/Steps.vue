<template>
  <div class="ui-steps" :class="[size, direction]">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'ui-steps',
  data() {
    return { children: [] }
  },
  props: {
    current: {
      type: Number,
      default: 0
    },
    status: {
      default: 'process',
      validator(value) {
        return ['wait', 'process', 'finish', 'error'].indexOf(value) !== -1
      }
    },
    size: {
      validator(value) {
        return value === 'small'
      }
    },
    direction: {
      default: 'horizontal',
      validator(value) {
        return ['horizontal', 'vertical'].indexOf(value) !== -1
      }
    }
  },
  methods: {
    getCount() {
      return this.children.length
    },
    getIndex(vm) {
      return this.children.indexOf(vm)
    },
    addChild(vm) {
      this.children.push(vm)
    },
    removeChild(vm) {
      this.children.splice(this.getIndex(vm), 1)
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.ui-steps {
  &.small {
    .ui-steps-main {
      padding-left: 28px;
    }
    .ui-steps-tail {
      top: 9px;
      left: 28px;
    }
    .ui-steps-head {
      width: 18px;
      height: 18px;
      line-height: 18px;
      font-size: 12px;
      .ui-icon {
        font-size: 14px;
      }
    }
    .ui-steps-title {
      font-size: 12px;
    }
  }
  &.vertical {
    .ui-steps-tail {
      top: 30px;
      right: 0;
      bottom: 4px;
      left: 13px;
      width: 1px;
      height: auto;
    }
    .ui-steps-main {
      padding-top: 3px;
      padding-bottom: 12px;
    }
    &.small .ui-steps-tail {
      top: 22px;
      left: 9px;
    }
  }
}

.ui-steps-item {
  display: inline-block;
  width: 100%;
  position: relative;
  &:last-child .ui-steps-tail {
    display: none;
  }
  &.process {
    .ui-steps-head:not(.icon) {
      background-color: @primary-color;
      color: #fff;
    }
    .ui-steps-title, .ui-steps-content {
      color: #666;
    }
  }
  &.finish, &.wait {
    .ui-steps-title, .ui-steps-content {
      color: #999;
    }
  }
  &.finish, &.process {
    .ui-steps-head {
      color: @primary-color;
    }
  }
  &.wait {
    .ui-steps-head {
      color: #ccc;
    }
    .ui-steps-head:not(.icon) {
      border-color: #ccc;
    }
  }
  &.error {
    .ui-steps-head:not(.icon) {
      color: @error-color;
      border-color: @error-color;
    }
    .ui-steps-title, .ui-steps-content {
      color: @error-color;
    }
  }
  &.finish {
    .ui-steps-tail:before {
      transform: scale(1);
    }
  }
}

.ui-steps-head {
  width: 26px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  border-radius: 50%;
  margin-right: 8px;
  float: left;
  position: relative;
  font-size: 14px;
  transition: all .3s ease-in-out;
  &, .ui-icon {
    font-weight: bold;
  }
  .ui-icon {
    font-size: 24px;
  }
  &:not(.icon) {
    background-color: #fff;
    border: 1px solid @primary-color;
  }
}

.ui-steps-tail {
  position: absolute;
  top: 13px;
  left: 36px;
  right: 10px;
  height: 1px;
  background-color: @divider-color;
  &:before {
    display: block;
    transform: scale(0);
    height: 100%;
    content: '';
    background-color: @primary-color;
    transform-origin: 0 0;
    transition: transform .3s;
  }
}

.ui-steps-main {
  position: relative;
  padding-left: 36px;
}

.ui-steps-title {
  padding-right: 10px;
  font-weight: bold;
  font-size: 14px;
  background-color: #fff;
  display: inline-block;
  + .ui-steps-content {
    margin-top: 6px;
  }
}

.ui-steps-content {
  font-size: 12px;
}
</style>