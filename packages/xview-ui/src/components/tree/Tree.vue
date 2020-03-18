<template>
  <div class="x-tree" :class="{showCheckbox}">
    <x-node v-for="(_, i) in data" :key="i" :data="_" :render="render"/>
  </div>
</template>
<script>
import XNode from './Node.vue'
let key = 0, B = Boolean, F = Function
export default {
  name: 'XTree',
  components: { XNode },
  props: {
    data: { type: Array, default: () => [] },
    multiple: B,
    showCheckbox: B,
    emptyText: { type: String, default: '暂无数据' },
    loadData: F,
    render: F,
    checkStrictly: B,
    checkDirectly: B
  },
  data() {
    return { flatData: [] }
  },
  watch: {
    data: {
      deep: true,
      immediate: true,
      handler() {
        this.createFlatData()
        this.updateCheckedNodes()
      }
    }
  },
  methods: {
    createFlatData() { // 转化为一维数组
      let flatData = [], { data } = this
      while (data.length) {
        let arr = []
        data.forEach(_ => {
          if (_.nodeKey === undefined) _.nodeKey = ++key
          flatData.push(_)
          _.children && arr.push(..._.children)
        })
        data = arr
      }
      this.flatData = flatData
    },
    updateSelectedNodes(item) { // 更新选中的节点
      if (this.checkDirectly) {
        this.$set(item, 'checked', !item.checked)
        this.checkChange(item)
      } else {
        let { selected } = item
        if (!this.multiple) this.flatData.forEach(_ => this.$set(_, 'selected', false))
        this.$set(item, 'selected', !selected)
        this.$emit('on-select-change', this.getSelectedNodes(), item)
      }
    },
    updateCheckedNodes(item = {}) { // 更新勾选的节点 先子后父遍历
      if (!this.checkStrictly) {
        let eachData = item.children || []
        while (eachData.length) {
          let arr = []
          eachData.forEach(_ => {
            this.$set(_, 'checked', item.checked)
            _.children && arr.push(..._.children)
          })
          eachData = arr
        }
        let data = [...this.flatData]
        data.reverse()
        data.forEach(_ => {
          if (_.children && _.children.length) {
            let checkeds = _.children.filter(__ => __.checked)
            let hasIndeterminate = _.children.some(__ => __.indeterminate)
            this.$set(_, 'checked', checkeds.length === _.children.length)
            this.$set(_, 'indeterminate', hasIndeterminate || (checkeds.length > 0 && checkeds.length < _.children.length))
          }
        })
      }
    },
    checkChange(item) { // 勾选改变处理
      this.updateCheckedNodes(item)
      this.$emit('on-check-change', this.getCheckedNodes(), item)
    },
    toggleExpand(item) { // 节点的展开和收起
      this.$set(item, 'expand', !item.expand)
      if (!item.children.length && this.loadData) {
        this.$set(item, 'loading', true)
        this.loadData(item, data => {
          data.forEach(_ => _.checked = item.checked)
          item.children = data
          this.$set(item, 'loading', false)
        })
      }
      this.$emit('on-toggle-expand', item)
    },
    getCheckedNodes() { // API方法 **不可改名** 获取被勾选的节点
      return this.flatData.filter(_ => _.checked)
    },
    getSelectedNodes() { // API方法 **不可改名** 获取被选中的节点
      return this.flatData.filter(_ => _.selected)
    },
    getCheckedAndIndeterminateNodes() { // API方法 **不可改名** 获取选中及半选节点
      return this.flatData.filter(_ => _.checked || _.indeterminate)
    }
  }
}
</script>