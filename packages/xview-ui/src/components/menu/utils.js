import { findParent } from '../../tools'
export const watchMode = {
  data() {
    return { titleStyle: null, isHor: false }
  },
  mounted() {
    const menu = findParent(this, 'XMenu')
    this.unwatchMode = this.$watch(
      () => menu.mode,
      val => {
        this.isHor = val === 'horizontal'
        this.titleStyle = this.isHor ? null : { paddingLeft: `${24 + this.getParCount() * 20}px` }
      },
      { immediate: true }
    )
  },
  beforeDestroy() {
    this.unwatchMode()
  },
  methods: {
    getParCount() {
      let count = 0, submenu = findParent(this, 'XSubmenu')
      while (submenu) {
        count++
        submenu = findParent(submenu, 'XSubmenu')
      }
      return count
    }
  }
}