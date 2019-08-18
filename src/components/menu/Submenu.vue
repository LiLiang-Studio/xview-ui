<template>
  <li class="ui-menu-submenu" :class="{vertical: isVertical, active}" @mouseenter="handleMouseenter" @mouseleave="handleMouseleave">
    <div class="ui-menu-submenu-title" @click="handleTitleClick">
      <slot name="title"></slot>
      <UiIcon class="title-icon" type="ios-arrow-down"/>
    </div>
    <div v-show="isVertical && isOpened" class="vertical">
      <ul><slot></slot></ul>
    </div>
    <ui-option-list v-if="!isVertical" class="ui-menu-submenu-list" :visible="visible" :parentName="$options.name"
      @mouseenter.native="handleDropMouseenter" @mouseleave.native="handleDropMouseleave">
      <ul><slot></slot></ul>
    </ui-option-list>
  </li>
</template>
<script>
import UiIcon from './../Icon.vue'
import UiOptionList from './../select/OptionList.vue'
import { findParentByName } from './../../utils'
export default {
  name: 'ui-menu-submenu',
  components: { UiIcon, UiOptionList },
  data() {
    return {
      visible: false,
      timeout: null,
      parent: null
    }
  },
  props: {
    name: [String, Number]
  },
  computed: {
    active() {
      return this.visible || this.parent && this.parent.getActiveName() === this.name
    },
    isVertical() {
      return this.parent && this.parent.getMode() === 'vertical'
    },
    isOpened() {
      return this.parent && this.parent.getOpenedNames().indexOf(this.name) !== -1
    }
  },
  watch: {
    visible(newVal) {
      this.parent && this.parent.onOpenChange(this.name, newVal)
    }
  },
  methods: {
    close() {
      this.visible = false
    },
    handleMouseenter() {
      if (this.isVertical) return
      clearTimeout(this.timeout)
      this.visible = true
    },
    handleMouseleave() {
      if (this.isVertical) return
      this.timeout = setTimeout(this.close, 150)
    },
    handleDropMouseenter() {
      clearTimeout(this.timeout)
    },
    handleDropMouseleave() {
      this.timeout = setTimeout(this.close, 150)
    },
    getName() {
      return this.name
    },
    handleTitleClick() {
      this.parent && this.parent.toggleSubmenu(this.name)
    }
  },
  mounted() {
    this.parent = findParentByName(this, 'ui-menu')
  }
}
</script>