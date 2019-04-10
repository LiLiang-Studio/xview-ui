<template>
  <li class="ui-menu-item-group">
    <div class="ui-menu-item-group-title">{{title}}</div>
    <ul><slot></slot></ul>
  </li>
</template>
<script>
export default {
  props: {
    title: String
  }
}
</script>