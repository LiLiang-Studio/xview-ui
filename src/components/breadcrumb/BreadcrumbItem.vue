<template>
  <span :class="prefix">
    <router-link v-if="to" :class="`${prefix}--link`" :to="to" :replace="replace" :append="append">
      <slot></slot>
    </router-link>
    <a v-else-if="href" :class="`${prefix}--link`" :href="href" :target="target">
      <slot></slot>
    </a>
    <span v-else :class="[`${prefix}--link`, 'notlink']"><slot></slot></span>
    <span :class="`${prefix}--separator`" v-html="separator"></span>
  </span>
</template>
<script>
import { findParent } from '../../tools'
export default {
  name: 'UiBreadcrumbItem',
  data() {
    return { prefix: 'ui-breadcrumb-item', separator: '' }
  },
  props: {
    replace: Boolean,
    to: [String, Object],
    target: {
      type: String,
      default: '_self'
    },
    href: String,
    append: Boolean
  },
  mounted() {
    let parent = findParent(this, 'UiBreadcrumb')
    if (parent) this.separator = parent.separator
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
@prefix: .ui-breadcrumb-item;
@{prefix} {
  font-size: 14px;
  color: @content-color;
  &--link {
    color: @content-color;
    &.notlink {
      font-weight: bold;
    }
  }
  &--separator {
    margin: 0 8px;
    color: @border-color;
  }
  &:last-child @{prefix}--separator {
    display: none;
  }
}
</style>