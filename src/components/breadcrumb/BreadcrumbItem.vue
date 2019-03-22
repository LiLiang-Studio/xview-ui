<template>
  <span class="ui-breadcrumb-item">
    <template v-if="to">
      <router-link v-if="$router" class="ui-breadcrumb-link" :to="to" :replace="replace">
        <slot></slot>
      </router-link>
      <a v-else class="ui-breadcrumb-link" :href="to" :target="target">
        <slot></slot>
      </a>
    </template>
    <span v-else class="ui-breadcrumb-link notlink"><slot></slot></span>
    <span class="ui-breadcrumb-separator" v-html="separator"></span>
  </span>
</template>
<script>
import { findParentByName } from './../../utils'
export default {
  data() {
    return { separator: '' }
  },
  props: {
    replace: Boolean,
    to: [String, Object]
  },
  computed: {
    target() {
      return !this.replace && '_blank'
    }
  },
  mounted() {
    let parent = findParentByName(this, 'ui-breadcrumb')
    if (parent) this.separator = parent.separator
  }
}
</script>
<style lang="less">
.ui-breadcrumb-item {
  font-size: 14px;
  color: @content-color;
}

.ui-breadcrumb-link {
  color: @content-color;
  &.notlink {
    font-weight: bold;
  }
}

.ui-breadcrumb-separator {
  margin: 0 8px;
  color: @border-color;
}

.ui-breadcrumb .ui-breadcrumb-item:last-child .ui-breadcrumb-separator {
  display: none;
}
</style>