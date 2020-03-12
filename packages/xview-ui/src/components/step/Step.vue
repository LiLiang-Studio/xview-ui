<template>
  <div :class="[prefix, `${prefix}_${state.status}`]">
    <div :class="`${prefix}_head`">
      <span :class="[`${prefix}_icon`, {custom: icon}]">
        <x-icon v-if="iconType" :type="iconType"/>
        <template v-else>{{state.index + 1}}</template>
      </span>
      <div :class="`${prefix}_tail`"></div>
    </div>
    <div :class="`${prefix}_main`">
      <b :class="`${prefix}_title`">
        <slot name="title">{{title}}</slot>
      </b>
      <div v-show="hasContent" :class="`${prefix}_content`">
        <slot name="content">{{content}}</slot>
      </div>
    </div>
  </div>
</template>
<script>
import XIcon from '../icon'
export default {
  name: 'XStep',
  components: { XIcon },
  props: {
    title: String,
    content: String,
    icon: String
  },
  data() {
    return { prefix: 'x-step', state: {}, hasContent: false }
  },
  computed: {
    iconType() {
      return this.icon || ({ finish: 'ios-checkmark-empty', error: 'ios-close-empty' })[this.state.status]
    }
  },
  mounted() {
    this.hasContent = this.content || this.$slots.content
  }
}
</script>