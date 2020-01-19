<template>
  <div class="ui-anchor-link">
    <a :href="href" :class="{active}">{{title}}</a>
    <slot></slot>
  </div>
</template>
<script>
import { findParent } from '../../tools'
export default {
  name: 'UiAnchorLink',
  data() {
    return { parent: null }
  },
  props: {
    href: String,
    title: String,
    scrollOffset: {
      type: Number,
      default: 0
    }
  },
  computed: {
    active() {
      return this.parent && this.parent.activeItem === this
    }
  },
  mounted() {
    this.parent = findParent(this, 'UiAnchor')
    this.parent.addItem(this)
  },
  beforeDestroy() {
    this.parent.removeItem(this)
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.ui-anchor-link {
  line-height: 1;
  padding: 8px 0 8px 16px;
  & & {
    padding-top: 6px;
    padding-bottom: 6px;
  }
  a {
    display: block;
    color: @content-color;
    &.active, &:hover {
      color: @primary-color;
    }
  }
}
</style>