<template>
  <li>
    <div class="x-menu-group_title">{{title}}</div>
    <ul><slot></slot></ul>
  </li>
</template>
<script>
export default {
  props: { title: String }
}
</script>