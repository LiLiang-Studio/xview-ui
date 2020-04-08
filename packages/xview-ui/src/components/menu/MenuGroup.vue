<template>
  <li>
    <div class="x-menu-group_title" :style="titleStyle">{{title}}</div>
    <ul><slot></slot></ul>
  </li>
</template>
<script>
import { watchMode } from './utils'
export default {
  mixins: [watchMode],
  props: { title: String }
}
</script>