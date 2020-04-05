<template>
  <div :class="prefix" v-on="$listeners">
    <span ref="reference" :class="`${prefix}_reference`">
      <slot name="reference"></slot>
    </span>
    <transition :name="transitionName || prefix">
      <div v-show="visible" ref="popper" :class="`${prefix}_popper`" :style="{zIndex}">
        <slot></slot>
        <div v-show="hasArrow || arrowClass" ref="arrow" :class="[`${prefix}_arrow`, arrowClass]"></div>
      </div>
    </transition>
  </div>
</template>
<script>
import { createPopper } from '@popperjs/core'
import { getMaxZIndex } from '../../tools'
const S = String, B = Boolean
export default {
  name: 'XPopper',
  props: {
    offset: { type: Number, default: 0 },
    options: Object,
    hasArrow: B,
    arrowClass: S,
    transitionName: S,
    visible: B,
    transfer: B,
    placement: {
      default: 'bottom',
      validator(v) {
        return [
          'top', 'top-start', 'top-end',
          'right', 'right-start', 'right-end',
          'bottom', 'bottom-start', 'bottom-end',
          'left', 'left-start', 'left-end'
        ].indexOf(v) > -1
      }
    }
  },
  data() {
    return { prefix: 'x-popper', zIndex: 0 }
  },
  watch: {
    visible(val) {
      this.onVisible()
      this.$emit(`on-popper-${val ? 'show' : 'hide'}`)
    }
  },
  mounted() {
    if (this.transfer) {
      document.body.appendChild(this.$refs.popper)
    }
    this.onVisible()
  },
  beforeDestroy() {
    if (this.popper) {
      this.popper.destroy()
      this.popper = null
    }
    if (this.transfer) {
      const { popper } = this.$refs
      popper.parentNode && popper.parentNode.removeChild(popper)
    }
  },
  methods: {
    createPopper() {
      const { popper, arrow } = this.$refs, { modifiers, ...others } = this.options || {}
      const options = {
        placement: this.placement,
        strategy: 'fixed',
        modifiers: [
          {
            name: 'arrow',
            options: {
              element: arrow
            }
          },
          {
            name: 'offset',
            options: {
              offset: [this.offset, 0]
            }
          }
        ].concat(modifiers || []),
        ...others
      }
      if (this.popper) {
        this.popper.setOptions(options)
      } else {
        this.popper = createPopper(this.getReference(), popper, options)
      }
    },
    getReference() {
      let { reference } = this.$refs
      return [
        reference, 
        ...Array.from(reference.querySelectorAll('*'))
      ].find(el => el.offsetWidth && el.offsetHeight) || reference
    },
    update() {
      this.popper && this.popper.update()
    },
    onVisible() {
      if (this.visible) {
        this.zIndex = getMaxZIndex()
        this.$nextTick(() => this.createPopper())
      }
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
@prefix: .x-popper;
@offset: 5px;
@{prefix} {
  &, &_reference {
    display: inline-block;
  }
  &_arrow {
    &, &:before {
      width: 7px;
      height: 7px;
      position: absolute;
    }
    &:before {
      content: '';
      transform: rotate(45deg);
      background: #fff;
      top: 0;
      left: 0;
      background: #fff;
      border-style: solid;
      border-color: lighten(@border-color, 5%);
    }
  }
  &_popper {
    transition: opacity .2s;
  }
  &-enter, &-leave-to {
    opacity: 0;
  }
}
[data-popper-placement^='top'] {
  padding: 5px 0 8px;
  > @{prefix}_arrow {
    bottom: @offset;
    &:before {
      border-width: 0 1px 1px 0;
    }
  }
}
[data-popper-placement^='right'] {
  padding: 0 5px 0 8px;
  > @{prefix}_arrow {
    left: @offset;
    &:before {
      border-width: 0 0 1px 1px;
    }
  }
}
[data-popper-placement^='bottom'] {
  padding: 8px 0 5px;
  > @{prefix}_arrow {
    top: @offset;
    &:before {
      border-width: 1px 0 0 1px;
    }
  }
}
[data-popper-placement^='left'] {
  padding: 0 8px 0 5px;
  > @{prefix}_arrow {
    right: @offset;
    &:before {
      border-width: 1px 1px 0 0;
    }
  }
}
</style>