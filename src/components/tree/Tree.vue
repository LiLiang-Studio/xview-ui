<template>
  <div class="ui-tree">
    <UiTreeNode :data="data"/>
  </div>
</template>
<script>
import UiTreeNode from './Node'
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
      let key = 0, flatState = []
      const func = data => {
        let arr = []
        data.forEach(_ => {
          _.nodeKey = key++
          flatState.push(_)
          _.children && arr.push(..._.children)
        })
        if (arr.length) func(arr)
      }
      func(this.data)
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
    updateCheckedNodes() {
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
    }
  },
  mounted() {
    this.convertData()
  }
}
</script>