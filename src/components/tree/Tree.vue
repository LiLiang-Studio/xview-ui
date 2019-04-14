<template>
  <div class="ui-tree">
    <UiTreeNode :data="data"/>
  </div>
</template>
<script>
import UiTreeNode from './Node'
let key = 0
export default {
  name: 'ui-tree',
  components: { UiTreeNode },
  data() {
    return {
      flatState: [],
      selectedNodes: []
    }
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
    childrenKey: {
      type: String,
      default: 'children'
    }
  },
  watch: {
    data: {
      deep: true,
      handler(newVal) {
        this.convertData()
      }
    }
  },
  methods: {
    /**
     * 转换数据，增加唯一标识的key
     */
    convertData() {
      let flatState = [], { data } = this
      while (data.length) {
        let arr = []
        data.forEach(_ => {
          _.nodeKey = key++
          flatState.push(_)
          _.children && arr.push(..._.children)
        })
        data = arr
      }
      this.flatState = flatState
    },
    /**
     * 更新选择的节点
     */
    updateSeleckedNodes(item) {
      if (this.multiple) {
        this.$set(item, 'selected', !item.selected)
      } else {
        this.flatState.forEach(_ => this.$set(_, 'selected', false))
        this.$set(item, 'selected', true)
      }
      this.$emit('on-select-change', this.getSelectedNodes())
    },
    /**
     * 更新选中的节点
     */
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
    /**
     * 获取选中的节点
     */
    getCheckedNodes() {
      return this.flatState.filter(_ => _.checked).map(_ => {
        let { children: __, ...data } = _
        return data
      })
    },
    /**
     * 获取选择的节点
     */
    getSelectedNodes() {
      return this.flatState.filter(_ => _.selected).map(_ => {
        let { children: __, ...data } = _
        return data
      })
    },
    /**
     * 切换折叠和展开子节点
     */
    toggleExpand(item) {
      if (!item.children.length && this.loadData) {
        this.$set(item, 'loading', true)
        this.loadData(item, data => {
          item.children = data
          this.$set(item, 'loading', false)
        })
      }
      this.$emit('on-toggle-expand', item)
    }
  },
  mounted() {
    this.convertData()
  }
}
</script>