<template>
  <transition name="ui-loadingbar" @afterLeave="handleLeave">
    <div class="ui-loadingbar" v-show="visible" :style="styles">
      <div class="ui-loadingbar-inner" :class="status" :style="innerStyles"></div>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    color: String,
    failedColor: String,
    height: {
      type: Number,
      default: 2
    },
    percent: Number,
    status: String,
    zIndex: Number,
    visible: Boolean
  },
  computed: {
    styles() {
      return { height: `${this.height}px`, zIndex: this.zIndex }
    },
    innerStyles() {
      return { transform: `scaleX(${this.percent / 100})`, backgroundColor: this.status === 'error' ? this.failedColor : this.color }
    }
  },
  methods: {
    handleLeave() {
      this.$emit('leave')
    }
  },
  mounted() {
    document.body.insertBefore(this.$el, document.body.firstChild)
  }
}
</script>
<style lang="less">
.ui-loadingbar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
}

.ui-loadingbar-inner {
  height: 100%;
  transform-origin: 0 0;
  transition: transform .2s;
  background-color: @primary-color;
  &.error {
    background-color: @error-color;
  }
}

.ui-loadingbar-enter-active {
  transition: opacity ease-in-out .5s;
}

.ui-loadingbar-leave-active {
  transition: opacity .2s ease-in-out .5s;
}

.ui-loadingbar-enter, .ui-loadingbar-leave-to {
  opacity: 0;
}
</style>