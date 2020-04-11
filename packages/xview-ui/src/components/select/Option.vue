<template>
  <li :class="classes" v-if="!removed" @click="onClick">
    <div :class="`${prefix}_content`">
      <slot>{{label || value}}</slot>
    </div>
    <x-icon v-if="selected" :class="`${prefix}_doneIcon`" type="android-done"/>
  </li>
</template>
<script>
import XIcon from '../icon'
import { findParent } from '../../tools'
export default {
  name: 'XOption',
  components: { XIcon },
  props: {
    label: String,
    disabled: Boolean,
    tag: [String, Number],
    value: [String, Number]
  },
  data() {
    return {
      focus: false,
      removed: false,
      selected: false,
      prefix: 'x-select-option'
    }
  },
  computed: {
    classes() {
      return [
        this.prefix,
        {
          focus: this.focus,
          selected: this.selected,
          disabled: this.disabled
        }
      ]
    }
  },
  mounted() {
    this.parent = findParent(this, 'XSelect')
    this.parent.addItem(this)
  },
  beforeDestroy() {
    this.parent.removeItem(this)
    this.parent = null
  },
  methods: {
    onClick() {
      if (!this.disabled) this.parent.updateSelected(this.value)
    }
  }
}
</script>