<template>
  <transition v-on="listeners"><slot></slot></transition>
</template>
<script>
export default {
  data() {
    return {
      listeners: {
        enter(el) {
          el.style.height = 'auto'
          let endWidth = window.getComputedStyle(el).height
          el.style.height = '0px'
          el.offsetHeight // 强制重绘
          el.style.height = endWidth
        },
        afterEnter(el) {
          el.style.height = null
        },
        leave(el) {
          el.style.height = window.getComputedStyle(el).height
          el.offsetHeight // 强制重绘
          el.style.height = '0px'
        },
        afterLeave(el) {
          el.style.height = null
        }
      }
    }
  }
}
</script>