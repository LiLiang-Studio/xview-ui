<template>
  <div class="ui-icircle" :style="styles">
    <svg viewBox="0 0 100 100">
      <path :d="pathString" :stroke="trailColor" :stroke-width="trailWidth" :fill-opacity="0" :style="trailStyle" />
      <path :d="pathString" :stroke-linecap="strokeLinecap" :stroke="strokeColor" :stroke-width="computedStrokeWidth" fill-opacity="0" :style="pathStyle" />
    </svg>
    <div class="ui-icircle-inner">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
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
    }
  },
  computed: {
    styles() {
      return { width: `${this.size}px`, height: `${this.size}px` }
    },
    computedStrokeWidth () {
      return this.percent === 0 && this.dashboard ? 0 : this.strokeWidth
    },
    radius() {
      return 50 - this.strokeWidth / 2
    },
    pathString() {
      let { radius: r, dashboard } = this
      return dashboard ? 
        `M 50,50 m 0,${r} a ${r},${r} 0 1 1 0,-${2 * r} a ${r},${r} 0 1 1 0,${2 * r}` :
        `M 50,50 m 0,-${r} a ${r},${r} 0 1 1 0,${2 * r} a ${r},${r} 0 1 1 0,-${2 * r}`
    },
    len() {
      return Math.PI * 2 * this.radius
    },
    trailStyle() {
      return this.dashboard ? {
        'stroke-dasharray': `${this.len - 75}px ${this.len}px`,
        'stroke-dashoffset': `-${75 / 2}px`,
        'transition': 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s'
      } : {}
    },
    pathStyle() {
      return this.dashboard ? {
        'stroke-dasharray': `${(this.percent / 100) * (this.len - 75)}px ${this.len}px`,
        'stroke-dashoffset': `-${75 / 2}px`,
        'transition': 'stroke-dashoffset .3s ease 0s, stroke-dasharray .6s ease 0s, stroke .6s, stroke-width .06s ease .6s'
      } : {
        'stroke-dasharray': `${this.len}px ${this.len}px`,
        'stroke-dashoffset': `${((100 - this.percent) / 100 * this.len)}px`,
        'transition': 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
      }
    }
  }
}
</script>
<style lang="less">
.ui-icircle {
  display: inline-block;
  position: relative;
}

.ui-icircle-inner {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  line-height: 1;
  text-align: center;
}
</style>