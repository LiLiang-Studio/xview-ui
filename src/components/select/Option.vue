<template>
  <li class="ui-select-option" v-if="!isDelete" :class="{selected, isMultiple, disabled}" :tabindex="tabindex" @click="handleClick">
    <slot>{{label || value}}</slot>
    <UiIcon v-if="selected && isMultiple" class="ui-select-option-icon" type="android-done"/>
  </li>
</template>
<script>
import UiIcon from './../Icon'
import { findParentByName } from './../../utils'
export default {
  components: { UiIcon },
  data() {
    return {
      parent: null,
      isDelete: false
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
    },
    isMultiple() {
      return this.parent && this.parent.multiple
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
    this.parent && this.parent.addChild(this)
  },
  beforeDestroy() {
    this.parent && this.parent.removeChild(this)
  }
}
</script>