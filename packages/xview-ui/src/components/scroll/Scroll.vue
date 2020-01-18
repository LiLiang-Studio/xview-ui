<template>
  <div class="ui-scroll" :style="styles" @scroll="onScroll" @mousewheel="onMouseWheel">
    <UiLoading v-if="topHandlers.length" :loadingText="loadingText" :loading="topLoading"/>
    <slot></slot>
    <UiLoading v-if="bottomHandlers.length" :loadingText="loadingText" :loading="bottomLoading"/>
  </div>
</template>
<script>
import UiLoading from './Loading.vue'
export default {
  name: 'UiScroll',
  components: { UiLoading },
  data() {
    return { topLoading: false, bottomLoading: false }
  },
  props: {
    height: {
      type: [String, Number],
      default: 300
    },
    loadingText: {
      type: String,
      default: '加载中'
    },
    onReachTop: Function,
    onReachBottom: Function,
    onReachEdge: Function,
    distanceToEdge: {
      type: [Number, Array],
      default: () => [20, 20]
    }
  },
  computed: {
    styles() {
      return { height: isNaN(this.height) ? this.height : `${this.height}px` }
    },
    edge() {
      return this.distanceToEdge instanceof Array ? this.distanceToEdge : [this.distanceToEdge, this.distanceToEdge]
    },
    topHandlers() {
      return [this.onReachTop, this.onReachEdge].filter(_ => _)
    },
    bottomHandlers() {
      return [this.onReachBottom, this.onReachEdge].filter(_ => _)
    }
  },
  methods: {
    onScroll() {
      let { scrollTop, scrollHeight, clientHeight } = this.$el
      if (scrollTop + clientHeight >= scrollHeight - this.edge[1]) { // 到达底部
        if (this.bottomLoading) return
        if (this.bottomHandlers.length) this.bottomLoading = true
        Promise.all(this.bottomHandlers.map(_ => _())).finally(() => this.bottomLoading = false)
      } else if (scrollTop <= this.edge[0]) { // 到达顶部
        if (this.topLoading) return
        if (this.topHandlers.length) this.topLoading = true
        Promise.all(this.topHandlers.map(_ => _())).then(() => {
          this.$nextTick(() => {
            this.$el.scrollTop = this.$el.scrollHeight - scrollHeight + this.$el.scrollTop
          })
        }).finally(() => this.topLoading = false)
      }
    },
    onMouseWheel(event) {
      if (this.topHandlers.length && this.$el.scrollTop <= 0 && event.deltaY < 0) {
        event.preventDefault()
        this.onScroll()
      }
    }
  }
}
</script>
<style lang="less">
.ui-scroll {
  overflow-y: auto;
}
</style>