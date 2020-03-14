<template>
  <div :class="prefix">
    <div :class="`${prefix}_avatar`">
      <slot name="avatar">
        <x-avatar :src="avatar"/>
      </slot>
    </div>
    <div>
      <div :class="`${prefix}_title`">
        <slot name="title">{{title}}</slot>
      </div>
      <div :class="`${prefix}_desc`">
        <slot name="description">{{description}}</slot>
      </div>
    </div>
  </div>
</template>
<script>
import XAvatar from '../avatar'
const S = String
export default {
  name: 'XListItemMeta',
  components: { XAvatar },
  props: {
    avatar: S,
    title: S,
    description: S
  },
  data() {
    return { prefix: 'x-list-item-meta' }
  }
}
</script>