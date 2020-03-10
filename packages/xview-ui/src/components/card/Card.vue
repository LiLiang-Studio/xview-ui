<template>
  <div :class="classes" v-bind="bindProps">
    <div v-if="hasHeader" :class="`${prefix}_header`">
      <div :class="`${prefix}_title`">
        <slot name="title">
          <x-icon v-if="icon" :type="icon"/>{{title}}
        </slot>
      </div>
      <slot name="extra"></slot>
    </div>
    <div :style="bodyStyle">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import XIcon from '../icon'
import { link } from '../../mixins'
import { parseSize } from '../../tools'
export default {
  mixins: [link],
  name: 'XCard',
  components: { XIcon },
  props: {
    bordered: { type: Boolean, default: true },
    disHover: Boolean,
    shadow: Boolean,
    padding: { type: [Number, String], default: 16 },
    title: String,
    icon: String
  },
  data() {
    return { prefix: 'x-card', hasHeader: false }
  },
  computed: {
    classes() {
      return [this.prefix, { bordered: this.bordered, disHover: this.disHover, shadow: this.shadow }]
    },
    bindProps() {
      return this.getLinkProps()
    },
    bodyStyle() {
      return { padding: parseSize(this.padding) }
    }
  },
  mounted() {
    this.hasHeader = this.$slots.title || this.$slots.extra || this.icon || this.title
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.x-card {
  display: block;
  font-size: 14px;
  border-radius: 4px;
  background-color: #fff;
  transition: all .2s ease-in-out;
  &, &:hover {
    color: @content-color;
  }
  &.shadow {
    box-shadow: 0 1px 1px 0 rgba(0,0,0,.1);
  }
  &.bordered {
    border: 1px solid @divider-color;
  }
  &:hover:not(.disHover) {
    border-color: #eee;
    box-shadow: 0 1px 6px rgba(0,0,0,.2);
  }
  &_header {
    padding: 14px 16px;
    line-height: 1;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid @divider-color;
  }
  &_title {
    font-weight: bold;
    color: @title-color;
    .x-icon {
      margin-right: 3px;
    }
  }
}
</style>