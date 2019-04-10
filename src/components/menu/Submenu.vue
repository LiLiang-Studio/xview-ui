<template>
  <li class="ui-menu-item submenu" :class="{active}" @mouseenter="handleMouseenter" @mouseleave="handleMouseleave">
    <div class="ui-menu-submenu-title">
      <slot name="title"></slot>
      <UiIcon class="title-icon" type="ios-arrow-down"/>
    </div>
    <ui-option-list class="ui-menu-submenu-list" :visible="visible" :parentName="$options.name"
      @mouseenter.native="handleDropMouseenter" @mouseleave.native="handleDropMouseleave">
      <ul><slot></slot></ul>
    </ui-option-list>
  </li>
</template>
<script>
import UiIcon from './../Icon'
import UiOptionList from './../select/OptionList'
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
      clearTimeout(this.timeout)
      this.visible = true
    },
    handleMouseleave() {
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
    }
  },
  mounted() {
    this.parent = findParentByName(this, 'ui-menu')
  }
}
</script>