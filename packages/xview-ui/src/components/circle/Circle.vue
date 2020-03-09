<template>
  <div :class="prefix" :style="styles">
    <svg viewBox="0 0 100 100">
      <path :d="pathString" :stroke="trailColor" :stroke-width="trailWidth" :fill-opacity="0" :style="trailStyle"/>
      <path :d="pathString" :stroke-linecap="strokeLinecap" :stroke="strokeColor" :stroke-width="skWidth" fill-opacity="0" :style="pathStyle"/>
    </svg>
    <div :class="`${prefix}_inner`">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'XCircle',
  props: {
    percent: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 120
    },
    strokeLinecap: {
      type: String,
      default: 'round'
    },
    strokeWidth: {
      type: Number,
      default: 6
    },
    strokeColor: {
      type: String,
      default: '#2db7f5'
    },
    trailWidth: {
      type: Number,
      default: 5
    },
    trailColor: {
      type: String,
      default: '#eaeef2'
    },
    dashboard: Boolean
  },
  data() {
    return { prefix: 'x-circle' }
  },
  computed: {
    styles() {
      return { width: `${this.size}px`, height: `${this.size}px` }
    },
    skWidth () {
      return this.percent === 0 && this.dashboard ? 0 : this.strokeWidth
    },
    radius() {
      return 50 - this.strokeWidth / 2
    },
    pathString() {
      let r = this.radius
      return this.dashboard ? `M 50,50 m 0,${r} a ${r},${r} 0 1 1 0,-${2 * r} a ${r},${r} 0 1 1 0,${2 * r}` :
        `M 50,50 m 0,-${r} a ${r},${r} 0 1 1 0,${2 * r} a ${r},${r} 0 1 1 0,-${2 * r}`
    },
    len() {
      return Math.PI * 2 * this.radius
    },
    trailStyle() {
      return this.dashboard && {
        'stroke-dashoffset': `-${75 / 2}px`,
        'stroke-dasharray': `${this.len - 75}px ${this.len}px`,
        'transition': 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s'
      }
    },
    pathStyle() {
      return this.dashboard ? {
        'stroke-dashoffset': `-${75 / 2}px`,
        'stroke-dasharray': `${(this.percent / 100) * (this.len - 75)}px ${this.len}px`,
        'transition': 'stroke-dashoffset .3s ease 0s, stroke-dasharray .6s ease 0s, stroke .6s, stroke-width .06s ease .6s'
      } : {
        'stroke-dashoffset': `${((100 - this.percent) / 100 * this.len)}px`,
        'stroke-dasharray': `${this.len}px ${this.len}px`,
        'transition': 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
      }
    }
  }
}
</script>
<style lang="less">
.x-circle {
  position: relative;
  display: inline-block;
  &_inner {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 0;
    line-height: 1;
    text-align: center;
    transform: translateY(-50%);
  }
}
</style>