<template>
  <div :class="prefix">
    <x-spin v-if="loading" fix>
      <x-icon type="load-c" size="18" :class="[`${prefix}_icon`, iconClass]"/>
      <span :class="`${prefix}_text`">{{loadingText}}</span>
    </x-spin>
  </div>
</template>
<script>
import XIcon from '../icon'
import XSpin from '../spin'
export default {
  name: 'XLoading',
  components: { XIcon, XSpin },
  props: {
    loading: Boolean,
    loadingText: String,
    iconClass: String
  },
  data() {
    return { prefix: 'x-loading' }
  }
}
</script>
<style lang="less">
@prefix: x-loading;
@aniName: ~"@{prefix}-animate";
.@{prefix} {
  height: 32px;
  position: relative;
  &_icon, &_text {
    vertical-align: middle;
  }
  &_icon {
    margin-right: 6px;
    animation: @aniName .8s linear infinite;
  }
}
@keyframes @aniName {
  0% {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>