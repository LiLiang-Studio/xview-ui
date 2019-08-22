<template>
  <div class="ui-breadcrumb">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'UiBreadcrumb',
  props: {
    separator: {
      type: String,
      default: '/'
    }
  }
}
</script>