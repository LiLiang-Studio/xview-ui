<template>
  <li class="ui-option-group">
    <span class="ui-option-group-title">{{label}}</span>
    <ul>
      <slot></slot>
    </ul>
  </li>
</template>
<script>
export default {
  props: {
    label: String
  }
}
</script>