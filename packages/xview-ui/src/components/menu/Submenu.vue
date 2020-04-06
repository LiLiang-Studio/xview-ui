<template>
  <x-popper v-if="isHor" :class="prefix" v-bind="popperProps" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <div slot="reference" :class="titleClass">
      <slot name="title"></slot>
      <x-icon :class="[`${prefix}_arrow`, {isOpened: visible}]" type="ios-arrow-down"/>
    </div>
    <ul :class="`${prefix}_list`">
      <slot></slot>
    </ul>
  </x-popper>
  <li v-else :class="prefix">
    <div :class="titleClass" @click="onTitleClick">
      <slot name="title"></slot>
      <span :class="`${prefix}_spring`"></span>
      <x-icon :class="[`${prefix}_arrow`, {isOpened}]" type="ios-arrow-down"/>
    </div>
    <ul v-show="isOpened">
      <slot></slot>
    </ul>
  </li>
</template>
<script>
import XIcon from '../icon'
import XPopper from '../popper'
import { findParent, findChildrens } from '../../tools'
export default {
  name: 'XSubmenu',
  components: { XIcon, XPopper },
  props: {
    name: [String, Number]
  },
  data() {
    return {
      prefix: 'x-submenu',
      visible: false,
      menu: null,
      active: false,
      isOpened: false
    }
  },
  computed: {
    popperProps() {
      return { adaptive: false, visible: this.visible, transitionName: 'x-animate-dropdown' }
    },
    isHor() {
      return this.menu && this.menu.mode === 'horizontal'
    },
    titleClass() {
      return [`${this.prefix}_title`, { active: this.visible || this.active }]
    }
  },
  watch: {
    visible(val) {
      this.menu && this.menu.onOpenChange()
    }
  },
  mounted() {
    this.menu = findParent(this, 'XMenu')
    // 观察激活菜单名字变化
    this.unwatchActivedName = this.$watch(() => {
      return this.menu && this.menu.activedItemName
    }, val => {
      this.active = findChildrens(this, 'XMenuItem').some(_ => _.name === val)
    }, { immediate: true })
    // 观察展开的子菜单名字列表变化
    this.unwatchOpenedNames = this.$watch(() => {
      return this.menu && this.menu.openedNames
    }, val => {
      let children = findChildrens(this, 'XSubmenu')
      this.isOpened = val.indexOf(this.name) > -1 || children.some(_ => val.indexOf(_.name) > -1)
    }, { immediate: true })
  },
  beforeDestroy() {
    this.unwatchActivedName()
    this.unwatchOpenedNames()
  },
  methods: {
    show(visible) {
      this.visible = visible
    },
    onMouseenter() {
      clearTimeout(this.tid)
      if (this.isHor) this.show(true)
    },
    onMouseleave() {
      if (this.isHor) this.tid = setTimeout(() => this.show(false), 150)
    },
    onTitleClick() {
      this.menu && this.menu.toggleSubmenu(this.name)
    }
  }
}
</script>