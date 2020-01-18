<template>
  <div :class="[prefix, state.status]" :style="{width: state.width}">
    <div :class="`${prefix}--tail`"></div>
    <span :class="[`${prefix}--head`, {icon}]">
      <UiIcon v-if="iconType" :type="iconType"/>
      <b v-else>{{state.index + 1}}</b>
    </span>
    <div :class="`${prefix}--main`">
      <div :class="`${prefix}--title`">{{title}}</div>
      <div v-if="content" :class="`${prefix}--content`">{{content}}</div>
    </div>
  </div>
</template>
<script>
import UiIcon from '../icon'
export default {
  name: 'UiStep',
  components: { UiIcon },
  data() {
    return { prefix: 'ui-step', state: {} }
  },
  props: {
    title: String,
    content: String,
    icon: String
  },
  computed: {
    iconType() {
      let { status } = this.state
      return this.icon || (status === 'finish' && 'ios-checkmark-empty') || (status === 'error' && 'ios-close-empty')
    }
  },
  methods: {
    setState(state) {
      this.state = Object.assign({}, this.state, state)
    }
  }
}
</script>