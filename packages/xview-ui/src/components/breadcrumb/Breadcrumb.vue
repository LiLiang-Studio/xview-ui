<template>
  <div><slot></slot></div>
</template>
<script>
export default {
  name: 'XBreadcrumb',
  props: {
    separator: { type: String, default: '/' }
  }
}
</script>