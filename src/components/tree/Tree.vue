<template>
  <div class="ui-tree" :class="{showCheckbox}">
    <ui-node :data="data" :render="render"/>
  </div>
</template>
<script>
import UiNode from './Node.vue'
let key = 0
export default {
  name: 'UiTree',
  components: { UiNode },
  data() {
    return { flatState: this.getFlatState(), selectedNodes: [] }
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    multiple: Boolean,
    showCheckbox: Boolean,
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    loadData: Function,
    render: Function,
    checkStrictly: Boolean
  },
  watch: {
    data() {
      this.flatState = this.getFlatState()
    }
  },
  methods: {
    // 将树形数据转化为一维数组
    getFlatState() {
      let flatState = [], { data } = this
      while (data.length) {
        let arr = []
        data.forEach(_ => {
          if (_.nodeKey === undefined) _.nodeKey = ++key
          flatState.push(_)
          _.children && arr.push(..._.children)
        })
        data = arr
      }
      return flatState
    },
    // 更新选中的节点
    updateSeleckedNodes(item) {
      let { selected } = item
      if (!this.multiple) this.flatState.forEach(_ => this.$set(_, 'selected', false))
      this.$set(item, 'selected', !selected)
      this.$emit('on-select-change', this.getSelectedNodes())
    },
    // 获取被选中的节点
    getSelectedNodes() {
      return this.flatState.filter(_ => _.selected).map(_ => {
        let { children, ...data } = _
        return data
      })
    },
    // 更新勾选的节点
    updateCheckedNodes(item) {
      let eachData = item.children || []
      while (eachData.length) {
        let arr = []
        eachData.forEach(_ => {
          this.$set(_, 'checked', item.checked)
          _.children && arr.push(..._.children)
        })
        eachData = arr
      }
      let data = [...this.flatState]
      data.reverse()
      data.forEach(_ => {
        _.children && this.$set(_, 'checked', _.children.every(__ => __.checked))
      })
      this.$emit('on-check-change', this.getCheckedNodes())
    },
    // 获取被勾选的节点
    getCheckedNodes() {
      return this.flatState.filter(_ => _.checked).map(_ => {
        let { children: __, ...data } = _
        return data
      })
    },
    // 获取选中及半选节点
    getCheckedAndIndeterminateNodes() {
      return this.flatState.filter(_ => _.checked || _.indeterminate).map(_ => {
        let { children: __, ...data } = _
        return data
      })
    },
    toggleExpand(item) {
      this.$set(item, 'expand', !item.expand)
      if (!item.children.length && this.loadData) {
        this.$set(item, 'loading', true)
        this.loadData(item, data => {
          item.children = data
          this.$set(item, 'loading', false)
        })
      }
      this.$emit('on-toggle-expand', item)
    }
  }
}
</script>