<template>
  <div :class="classes">
    <div v-if="hasHeader" :class="`${prefix}--header`">
      <div :class="`${prefix}--title`">
        <slot name="title">
          <UiIcon v-if="icon" :type="icon"/>
          {{title}}
        </slot>
      </div>
      <slot name="extra"></slot>
    </div>
    <div :class="`${prefix}--body`" :style="{padding: `${padding}px`}">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import UiIcon from '../icon'
export default {
  name: 'UiCard',
  components: { UiIcon },
  data() {
    return { prefix: 'ui-card', hasHeader: false }
  },
  props: {
    bordered: {
      type: Boolean,
      default: true
    },
    disHover: Boolean,
    shadow: Boolean,
    padding: {
      type: [Number, String],
      default: 16
    },
    title: String,
    icon: String
  },
  computed: {
    classes() {
      let { prefix, bordered, disHover, shadow } = this
      return [prefix, { bordered, disHover, shadow }]
    }
  },
  mounted() {
    let { title, extra } = this.$slots
    this.hasHeader = title !== undefined || extra !== undefined || this.icon || this.title
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.ui-card {
  background-color: #fff;
  border-radius: 4px;
  font-size: 14px;
  transition: all .2s ease-in-out;
  &.bordered:not(.shadow) {
    border: 1px solid @divider-color;
  }
  &:hover:not(.disHover):not(.shadow) {
    box-shadow: 0 1px 6px rgba(0,0,0,.2);
    border-color: #eee;
  }
  &.shadow {
    box-shadow: 0 1px 1px 0 rgba(0,0,0,.1);
  }
  &--header {
    padding: 14px 16px;
    line-height: 1;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid @divider-color;
  }
  &--title {
    color: @title-color;
    font-weight: bold;
    .ui-icon {
      margin-right: 6px;
    }
  }
}
</style>