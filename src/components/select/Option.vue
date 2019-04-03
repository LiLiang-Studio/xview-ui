<template>
  <li class="ui-select-option" tabindex="-1">
    <slot></slot>
  </li>
</template>
<script>
export default {
  props: {
    value: [String, Number],
    label: String,
    disabled: Boolean
  }
}
</script>