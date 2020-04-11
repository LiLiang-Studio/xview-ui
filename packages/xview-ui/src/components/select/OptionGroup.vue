<template>
  <li>
    <span class="x-select-option-group_title">{{label}}</span>
    <ul><slot></slot></ul>
  </li>
</template>
<script>
export default {
  props: { label: String }
}
</script>