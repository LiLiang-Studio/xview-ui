<template>
  <div class="ui-steps-item" :style="{width}" :class="statusClass">
    <div class="ui-steps-tail"></div>
    <span class="ui-steps-head" :class="{icon}">
      <UiIcon v-if="icon" :type="icon"/>
      <b class="ui-steps-index" v-else-if="isCurrent">{{index + 1}}</b>
      <UiIcon v-else type="ios-checkmark-empty"/>
    </span>
    <div class="ui-steps-main">
      <div class="ui-steps-title">{{title}}</div>
      <div v-if="content" class="ui-steps-content">{{content}}</div>
    </div>
  </div>
</template>
<script>
import UiIcon from './../Icon.vue'
import { findParentByName } from './../../utils'
export default {
  components: { UiIcon },
  data() {
    return { parent: null }
  },
  props: {
    title: String,
    content: String,
    icon: String
  },
  computed: {
    width() {
      return this.parent && this.parent.direction === 'horizontal' && `${1 / this.parent.getCount() * 100}%`
    },
    index() {
      return this.parent ? this.parent.getIndex(this) : -1
    },
    isCurrent() {
      return this.parent && this.index === this.parent.current
    },
    statusClass() {
      return this.parent && (this.isCurrent ? this.parent.status || 'process' : this.index < this.parent.current ? 'finish' : 'wait')
    }
  },
  mounted() {
    this.parent = findParentByName(this, 'ui-steps')
    this.parent && this.parent.addChild(this)
  },
  beforeDestroy() {
    this.parent && this.parent.removeChild(this)
  }
}
</script>