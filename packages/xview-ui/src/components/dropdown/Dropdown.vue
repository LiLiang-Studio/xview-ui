<template>
  <x-popper v-bind="popperProps" 
    @mouseenter="onMouseenter" @mouseleave="onMouseleave" @click="onClick" @contextmenu="onContextmenu"
    @on-popper-show="show(true)" @on-popper-hide="show(false)">
    <template v-slot:reference>
      <slot></slot>
    </template>
    <div class="x-dropdown" v-clickoutside="onClickoutside" @mouseenter="onMouseenter" @mouseleave="onPopperMouseleave">
      <slot name="list"></slot>
    </div>
  </x-popper>
</template>
<script>
import XPopper from '../popper'
import { isInside } from '../../tools'
import { clickoutside } from '../../directives'
export default {
  name: 'XDropdown',
  components: { XPopper },
  props: {
    trigger: {
      default: 'hover',
      validator(v) {
        return ['hover', 'click', 'contextMenu', 'custom'].indexOf(v) > -1
      }
    },
    visible: Boolean
  },
  data() {
    return { isVisible: false }
  },
  computed: {
    popperProps() {
      return {
        ...this.$attrs,
        ref: 'popper',
        adaptive: false,
        transitionName: 'x-animate-dropdown',
        visible: this.trigger === 'custom' ? this.visible : this.isVisible
      }
    }
  },
  directives: { clickoutside },
  methods: {
    onMouseenter() {
      if (this.trigger === 'hover') {
        clearTimeout(this.tid)
        this.isVisible = true
      }
    },
    onMouseleave() {
      if (this.trigger === 'hover') this.tid = setTimeout(() => this.isVisible = false, 150)
    },
    onPopperMouseleave(e) {
      if (!isInside(e, this.$el)) this.onMouseleave()
    },
    onClick(e) {
      if (this.trigger === 'click' && isInside(e, this.$refs.popper.getRef())) this.isVisible = true
    },
    onContextmenu(e) {
      if (this.trigger === 'contextMenu') {
        e.preventDefault()
        this.isVisible = true
      }
    },
    show(visible) {
      this.$emit('on-visible-change', visible)
    },
    onClickoutside(e) {
      this.isVisible = false
      this.$emit('on-clickoutside', e)
    },
    itemClick(name) {
      this.isVisible = false
      this.$emit('on-click', name)
    }
  }
}
</script>
<style lang="less">
.x-dropdown {
  padding: 8px 0;
  min-width: 100px;
}
</style>