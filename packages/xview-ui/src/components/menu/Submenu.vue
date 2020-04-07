<template>
  <x-popper v-if="isHor" :class="prefix" v-bind="popperProps" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <div slot="reference" :class="titleClass">
      <slot name="title"></slot>
      <x-icon :class="[`${prefix}_arrow`, {isOpened: visible}]" type="ios-arrow-down"/>
    </div>
    <ul :class="`${prefix}_list`" :style="listStyle">
      <slot></slot>
    </ul>
  </x-popper>
  <li v-else :class="prefix">
    <div :class="titleClass" @click="onTitleClick">
      <slot name="title"></slot>
      <span :class="`${prefix}_spring`"></span>
      <x-icon :class="[`${prefix}_arrow`, {isOpened}]" type="ios-arrow-down"/>
    </div>
    <x-collapse-transition>
      <ul v-show="isOpened" :class="`${prefix}_list`">
        <slot></slot>
      </ul>
    </x-collapse-transition>
  </li>
</template>
<script>
import XIcon from '../icon'
import XPopper from '../popper'
import XCollapseTransition from '../collapse-transition'
import { findParent, findChildrens } from '../../tools'
export default {
  name: 'XSubmenu',
  components: { XIcon, XPopper, XCollapseTransition },
  props: {
    name: [String, Number]
  },
  data() {
    return { prefix: 'x-submenu', visible: false, active: false, isOpened: false, isHor: false, listStyle: null }
  },
  computed: {
    popperProps() {
      return { adaptive: false, visible: this.visible, transitionName: 'x-animate-dropdown' }
    },
    titleClass() {
      return [`${this.prefix}_title`, { active: this.visible || this.active }]
    }
  },
  mounted() {
    const menu = findParent(this, 'XMenu')
    this.unwatchMode = this.$watch(
      () => menu.mode,
      val => this.isHor = val === 'horizontal',
      { immediate: true }
    )
    this.unwatchActivedName = this.$watch(
      () => menu.activedItemName,
      val => this.active = findChildrens(this, 'XMenuItem').some(_ => _.name === val),
      { immediate: true }
    )
    this.unwatchOpenedNames = this.$watch(
      () => menu.openedNames,
      val => this.isOpened = val.indexOf(this.name) > -1
        // || findChildrens(this, 'XSubmenu').some(_ => val.indexOf(_.name) > -1)
        ,
      { immediate: true }
    )
  },
  beforeDestroy() {
    this.unwatchMode()
    this.unwatchActivedName()
    this.unwatchOpenedNames()
  },
  methods: {
    show(visible) {
      this.visible = visible
      if (visible && this.isHor) {
        this.listStyle = { minWidth: `${this.$el.offsetWidth}px` }
      }
    },
    onMouseenter() {
      clearTimeout(this.tid)
      if (this.isHor) this.show(true)
    },
    onMouseleave() {
      if (this.isHor) this.tid = setTimeout(() => this.show(false), 150)
    },
    onTitleClick() {
      findParent(this, 'XMenu').toggleSubmenu(this)
    }
  }
}
</script>