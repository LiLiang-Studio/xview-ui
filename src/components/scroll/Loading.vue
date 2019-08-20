<template>
  <div class="ui-scroll-loading">
    <ui-spin v-if="loading" fix>
      <Icon type="load-c" size="18" class="ui-scroll-loading-icon" :class="iconClass" :style="iconStyle"></Icon>
      <span class="ui-scroll-loading-text">{{loadingText}}</span>
    </ui-spin>
  </div>
</template>
<script>
import UiIcon from '../icon'
import UiSpin from './../spin/Spin.vue'
export default {
  components: { UiIcon, UiSpin },
  props: {
    loading: Boolean,
    loadingText: String,
    iconStyle: Object,
    iconClass: String
  }
}
</script>
<style lang="less">
.ui-scroll-loading {
  position: relative;
  height: 32px;
}

.ui-scroll-loading-icon,
.ui-scroll-loading-text {
  vertical-align: middle;
}

.ui-scroll-loading-icon {
  margin-right: 6px;
  animation: ui-scroll-loading 1s linear infinite;
}

@keyframes ui-scroll-loading {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>