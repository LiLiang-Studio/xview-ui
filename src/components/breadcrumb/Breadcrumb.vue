<template>
  <div class="ui-breadcrumb">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'ui-breadcrumb',
  props: {
    separator: {
      type: String,
      default: '/'
    }
  }
}
</script>