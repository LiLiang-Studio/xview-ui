<template>
  <div :class="prefix">
    <UiSpin v-if="loading" fix>
      <UiIcon type="load-c" size="18" :class="[`${prefix}-icon`, iconClass]"/>
      <span :class="`${prefix}-text`">{{loadingText}}</span>
    </UiSpin>
  </div>
</template>
<script>
import UiIcon from '../icon'
import UiSpin from '../spin'
export default {
  name: 'UiLoading',
  components: { UiIcon, UiSpin },
  data() {
    return { prefix: 'ui-loading' }
  },
  props: {
    loading: Boolean,
    loadingText: String,
    iconClass: String
  }
}
</script>
<style lang="less">
@prefix: ui-loading;
.@{prefix} {
  height: 32px;
  position: relative;
  &-icon, &-text {
    vertical-align: middle;
  }
  &-icon {
    margin-right: 6px;
    animation: @prefix .8s linear infinite;
  }
}
@keyframes @prefix {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>