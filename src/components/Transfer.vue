<template>
  <div class="ui-transfer">
    <div class="ui-transfer-list" :style="listStyle">
      <div class="ui-transfer-list-header">
        <ui-checkbox v-model="selectAllOfLeft" @on-change="toggleSelectAllOfLeft">{{titles[0]}}</ui-checkbox>
        <span>{{leftCountText}}</span>
      </div>
      <div class="ui-transfer-list-body">
        <ul class="ui-transfer-list-content">
          <li class="ui-transfer-list-content-item" v-for="item in leftData" :key="item.key">
            <ui-checkbox v-model="item.checked" :disabled="item.disabled" @on-change="handleSelectedChange">
              {{renderItem(item)}}
            </ui-checkbox>
          </li>
        </ul>
      </div>
    </div>
    <div class="ui-transfer-operation">
      <ui-button type="primary" size="small" icon="ios-arrow-left" :disabled="disabledLeft" @click="moveToLeft"></ui-button>
      <ui-button type="primary" size="small" icon="ios-arrow-right" :disabled="disabledRight" @click="moveToRight"></ui-button>
    </div>
    <div class="ui-transfer-list" :style="listStyle">
      <div class="ui-transfer-list-header">
        <ui-checkbox v-model="selectAllOfRight" @on-change="toggleSelectAllOfRight">{{titles[1]}}</ui-checkbox>
        <span>{{rightCountText}}</span>
      </div>
      <div class="ui-transfer-list-body">
        <ul class="ui-transfer-list-content">
          <li class="ui-transfer-list-content-item" v-for="item in rightData" :key="item.key">
            <ui-checkbox v-model="item.checked" :disabled="item.disabled" @on-change="handleSelectedChange">
              {{renderItem(item)}}
            </ui-checkbox>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import UiButton from './button/Button'
import UiCheckbox from './checkbox/Checkbox'
export default {
  components: { UiButton, UiCheckbox },
  data() {
    return {
      selectAllOfLeft: false,
      selectAllOfRight: false,
      selectedData: { left: [], right: [] }
    }
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
      default: '列别为空'
    }
  },
  computed: {
    convertData() {
      let rtnData = { left: [], right: [] }
      this.data.forEach(_ => {
        let item = { ..._, checked: this.selectedKeys.indexOf(_.key) !== -1 }
        rtnData[this.targetKeys.indexOf(_.key) === -1 ? 'left' : 'right'].push(item)
      })
      return rtnData
    },
    leftData() {
      return this.convertData.left
    },
    rightData() {
      return this.convertData.right
    },
    leftCountText() {
      let selectedCount = this.selectedData.left.length
      return selectedCount ? `${selectedCount}/${this.leftData.length}` : this.leftData.length
    },
    rightCountText() {
      let selectedCount = this.selectedData.right.length
      return selectedCount ? `${selectedCount}/${this.rightData.length}` : this.rightData.length
    },
    disabledLeft() {
      return !this.selectedData.right.length
    },
    disabledRight() {
      return !this.selectedData.left.length
    }
  },
  methods: {
    renderItem(item) {
      return this.renderFormat ? this.renderFormat(item) : item.label || item.key
    },
    setSelectedData() {
      let left = this.leftData.filter(_ => _.checked)
      let right = this.rightData.filter(_ => _.checked)
      this.selectedData = { left, right }
      this.selectAllOfLeft = this.leftData.every(_ => _.disabled || _.checked)
      this.selectAllOfRight = this.rightData.every(_ => _.disabled || _.checked)
    },
    handleSelectedChange() {
      this.setSelectedData()
      let { left, right } = this.selectedData
      this.$emit('on-selected-change', left.map(_ => _.key), right.map(_ => _.key))
    },
    toggleSelectAllOfLeft(checked) {
      this.leftData.forEach(_ => !_.disabled && (_.checked = checked))
      this.handleSelectedChange()
    },
    toggleSelectAllOfRight(checked) {
      this.rightData.forEach(_ => !_.disabled && (_.checked = checked))
      this.handleSelectedChange()
    },
    moveToLeft() {
      let moveKeys = this.selectedData.right.map(_ => _.key)
      let targetKeys = this.rightData.filter(_ => moveKeys.indexOf(_.key) === -1).map(_ => _.key)
      this.$emit('on-change', targetKeys, 'left', moveKeys)
    },
    moveToRight() {
      let moveKeys = this.selectedData.left.map(_ => _.key)
      let targetKeys = this.rightData.map(_ => _.key).concat(moveKeys)
      this.$emit('on-change', targetKeys, 'right', moveKeys)
    }
  },
  mounted() {
    this.setSelectedData()
  }
}
</script>
<style lang="less">
.ui-transfer {
  .ui-checkbox-button {
    margin-right: 12px;
  }
}

.ui-transfer-list {
  display: inline-block;
  width: 180px;
  font-size: 12px;
  vertical-align: middle;
  border: 1px solid @border-color;
  border-radius: 3px;
}

.ui-transfer-list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border-bottom: 1px solid @border-color;
}

.ui-transfer-list-body {
  height: 180px;
  overflow: auto;
  padding: 4px 0;
}

.ui-transfer-list-content-item {
  .ui-checkbox {
    width: 100%;
    padding: 7px 16px;
    margin-right: 0;
    transition: background-color .2s ease-in-out;
    &:hover:not(.disabled) {
      background-color: #f3f3f3;
    }
  }
}

.ui-transfer-operation {
  display: inline-block;
  margin: 0 16px;
  vertical-align: middle;
  .ui-button {
    display: block;
    border-radius: 3px;
    + .ui-button {
      margin-top: 12px;
    }
  }
}
</style>