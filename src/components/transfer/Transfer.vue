<template>
  <div :class="prefix">
    <ui-box v-bind="boxProps" :title="titles[0]" :data="convertData.left" @on-selected-change="onSourceSelectedChange">
      <slot></slot>
    </ui-box>
    <div :class="`${prefix}-btns`">
      <ui-button v-if="operations[0]" type="primary" size="small" :disabled="disLeft" @click="moveToLeft">
        <ui-icon type="ios-arrow-left"/>{{operations[0]}}
      </ui-button>
      <ui-button v-else type="primary" size="small" icon="ios-arrow-left" :disabled="disLeft" @click="moveToLeft"/>
      <ui-button v-if="operations[1]" type="primary" size="small" :disabled="disRight" @click="moveToRight">
        {{operations[1]}}<ui-icon type="ios-arrow-right"/>
      </ui-button>
      <ui-button v-else type="primary" size="small" icon="ios-arrow-right" :disabled="disRight" @click="moveToRight"/>
    </div>
    <ui-box v-bind="boxProps" :title="titles[1]" :data="convertData.right" @on-selected-change="onTargetSelectedChange">
      <slot></slot>
    </ui-box>
  </div>
</template>
<script>
import UiBox from './Box.vue'
import UiIcon from '../icon'
import { Button as UiButton } from '../button'
export default {
  components: { UiBox, UiButton, UiIcon },
  data() {
    return { prefix: 'ui-transfer', selectedData: { left: [], right: [] } }
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    targetKeys: {
      type: Array,
      default: () => []
    },
    renderFormat: Function,
    selectedKeys: {
      type: Array,
      default: () => []
    },
    listStyle: {
      type: Object,
      default: () => ({})
    },
    titles: {
      type: Array,
      default: () => ['源列表', '目标列表']
    },
    operations: {
      type: Array,
      default: () => []
    },
    filterable: Boolean,
    filterPlaceholder: {
      type: String,
      default: '请输入搜索内容'
    },
    filterMethod: Function,
    notFoundText: {
      type: String,
      default: '列表为空'
    }
  },
  computed: {
    boxProps() {
      return {
        listStyle: this.listStyle,
        filterable: this.filterable,
        filterMethod: this.filterMethod,
        renderFormat: this.renderFormat,
        filterPlaceholder: this.filterPlaceholder
      }
    },
    convertData() {
      let rtnData = { left: [], right: [] }
      this.data.forEach(_ => {
        let item = { ..._, checked: this.selectedKeys.indexOf(_.key) !== -1 }
        rtnData[this.targetKeys.indexOf(_.key) === -1 ? 'left' : 'right'].push(item)
      })
      return rtnData
    },
    disLeft() {
      return !this.selectedData.right.length
    },
    disRight() {
      return !this.selectedData.left.length
    }
  },
  methods: {
    moveToLeft() {
      let moveKeys = this.selectedData.right
      this.selectedData.right = []
      let targetKeys = this.convertData.right.filter(_ => moveKeys.indexOf(_.key) === -1).map(_ => _.key)
      this.$emit('on-change', targetKeys, 'left', moveKeys)
    },
    moveToRight() {
      let moveKeys = this.selectedData.left
      this.selectedData.left = []
      let targetKeys = this.convertData.right.map(_ => _.key).concat(moveKeys)
      this.$emit('on-change', targetKeys, 'right', moveKeys)
    },
    onSourceSelectedChange(keys) {
      this.selectedData.left = keys
    },
    onTargetSelectedChange(keys) {
      this.selectedData.right = keys
    }
  }
}
</script>
<style lang="less">
.ui-transfer-btns {
  margin: 0 16px;
  display: inline-block;
  vertical-align: middle;
  button {
    display: block;
    border-radius: 3px;
    padding: 0 7px;
    + button {
      margin-top: 12px;
    }
  }
}
</style>