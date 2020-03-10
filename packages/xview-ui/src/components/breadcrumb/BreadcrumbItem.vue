<template>
  <span :class="prefix">
    <span :class="`${prefix}_link`" v-bind="bindProps">
      <slot></slot>
    </span>
    <span :class="`${prefix}_sep`" v-html="separator"></span>
  </span>
</template>
<script>
import { link } from '../../mixins'
import { findParent } from '../../tools'
export default {
  mixins: [link],
  name: 'XBreadcrumbItem',
  data() {
    return { prefix: 'x-breadcrumb-item', separator: '' }
  },
  computed: {
    bindProps() {
      return this.getLinkProps()
    }
  },
  mounted() {
    let parent = findParent(this, 'XBreadcrumb')
    if (parent) this.separator = parent.separator
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
@prefix: .x-breadcrumb-item;
@{prefix} {
  font-size: 14px;
  &_link {
    color: @content-color;
  }
  span&_link {
    font-weight: bold;
  }
  &_sep {
    margin: 0 4px;
    color: @border-color;
  }
  &:last-child @{prefix}_sep {
    display: none;
  }
}
</style>