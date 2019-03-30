<template>
  <transition name="ui-fade" @afterLeave="handleLeave">
    <div class="ui-spin" :class="[size, {fix: !fullscreen && fix, fullscreen}]" :style="{zIndex}">
      <div>
        <RenderCell v-if="render" :render="render"/>
        <slot v-else><div class="ui-spin-dot"></div></slot>
      </div>
    </div>
  </transition>
</template>
<script>
import { RenderCell, findParentByName } from './../../utils'
export default {
  components: { RenderCell },
  props: {
    size: {
      validator(value) {
        return ['large', 'small'].indexOf(value) !== -1
      }
    },
    fix: Boolean,
    render: Function,
    fullscreen: Boolean,
    zIndex: Number
  },
  methods: {
    handleLeave() {
      let parent = findParentByName(this, 'ui-spin-wrapper')
      parent && parent.$destroy()
    }
  }
}
</script>
<style lang="less">
.ui-spin {
  color: @primary-color;
  text-align: center;
  &.small {
    .ui-spin-dot {
      width: 12px;
      height: 12px;
    }
  }
  &.large {
    .ui-spin-dot {
      width: 32px;
      height: 32px;
    }
  }
  &.fix, &.fullscreen {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, .9);
  }
  &.fullscreen {
    position: fixed;
  }
  &.fix {
    position: absolute;
    z-index: 8;
  }
}

.ui-spin-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: @primary-color;
  animation: ui-spin-animate 1s ease-in-out infinite;
}

@keyframes ui-spin-animate {
  0% {
    transform: scale(0);
  }
  to {
    transform: scale(1);
    opacity: 0;
  }
}
</style>