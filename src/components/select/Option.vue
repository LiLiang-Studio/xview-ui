<template>
  <li class="ui-select-option" :class="{selected, disabled}" :tabindex="tabindex" @click="handleClick">
    <slot>{{label || value}}</slot>
  </li>
</template>
<script>
import { findParentByName } from './../../utils'
export default {
  data() {
    return {
      parent: null
    }
  },
  props: {
    value: [String, Number],
    label: String,
    disabled: Boolean,
    tabindex: {
      type: [Number, String],
      default: -1
    }
  },
  computed: {
    selected() {
      return this.parent && this.parent.isSelectedChild(this.value)
    }
  },
  methods: {
    handleClick() {
      if (this.disabled) return
      if (this.parent) this.parent.updateSelectedValue(this.value)
    }
  },
  mounted() {
    this.parent = findParentByName(this, 'ui-select')
  }
}
</script>