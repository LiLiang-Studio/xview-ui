<template>
  <div class="x-scroll" :style="styles" @scroll="onScroll" @mousewheel="onMouseWheel">
    <x-loading v-if="topHandlers.length" :loadingText="loadingText" :loading="topLoading"/>
    <slot></slot>
    <x-loading v-if="bottomHandlers.length" :loadingText="loadingText" :loading="bottomLoading"/>
  </div>
</template>
<script>
import { parseSize, isArr } from '../../tools'
import XLoading from './Loading.vue'
export default {
  name: 'XScroll',
  components: { XLoading },
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
  data() {
    return { topLoading: false, bottomLoading: false }
  },
  computed: {
    styles() {
      return { height: parseSize(this.height) }
    },
    edge() {
      let edge = this.distanceToEdge
      let [e1, e2] = isArr(edge) ? edge : [edge, edge]
      return [e1, e2 || e1]
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
    onMouseWheel(e) {
      if (
        (this.topHandlers.length && this.$el.scrollTop <= 0 && e.deltaY < 0) ||
        (this.bottomHandlers.length && this.$el.scrollTop + this.$el.clientHeight >= this.$el.scrollHeight && e.deltaY > 0)
      ) {
        e.preventDefault()
      }
    }
  }
}
</script>
<style lang="less">
.x-scroll {
  overflow-y: auto;
}
</style>