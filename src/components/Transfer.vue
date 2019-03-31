<template>
  <div class="ui-transfer">
    <div class="ui-transfer-list" :style="boxStyle">
      <div class="ui-transfer-list-header">
        <ui-checkbox v-model="selectAllOfLeft" :disabled="diaabledSelectAllOfLeft" @on-change="toggleSelectAllOfLeft">
          {{titles[0]}}
        </ui-checkbox>
        <span>{{leftCountText}}</span>
      </div>
      <div class="ui-transfer-list-body">
        <div class="ui-transfer-search" v-if="filterable">
          <UiInput size="small" clearable v-model.trim="leftSearchValue" :placeholder="filterPlaceholder"/>
        </div>
        <ul class="ui-transfer-list-content" :style="listStyle">
          <template v-if="leftTargetData.length">
            <li class="ui-transfer-list-content-item" v-for="item in leftTargetData" :title="renderItem(item)" :key="item.key">
              <ui-checkbox v-model="item.checked" :disabled="item.disabled" @on-change="handleSelectedChange">
                {{renderItem(item)}}
              </ui-checkbox>
            </li>
          </template>
          <li v-else class="ui-transfer-list-content-empty">{{notFoundText}}</li>
        </ul>
      </div>
      <div v-if="hasSlot" class="ui-transfer-list-footer"><slot></slot></div>
    </div>
    <div class="ui-transfer-operation">
      <ui-button type="primary" size="small" v-if="operations[0]" :disabled="disabledLeft" @click="moveToLeft">
        <UiIcon type="ios-arrow-left"/>
        {{operations[0]}}
      </ui-button>
      <ui-button v-else type="primary" size="small" icon="ios-arrow-left" :disabled="disabledLeft" @click="moveToLeft"></ui-button>
      <ui-button type="primary" size="small" v-if="operations[1]" :disabled="disabledRight" @click="moveToRight">
        {{operations[1]}}
        <UiIcon type="ios-arrow-right"/>
      </ui-button>
      <ui-button v-else type="primary" size="small" icon="ios-arrow-right" :disabled="disabledRight" @click="moveToRight"></ui-button>
    </div>
    <div class="ui-transfer-list" :style="boxStyle">
      <div class="ui-transfer-list-header">
        <ui-checkbox v-model="selectAllOfRight" :disabled="disabledSelectAllOfRight" @on-change="toggleSelectAllOfRight">
          {{titles[1]}}
        </ui-checkbox>
        <span>{{rightCountText}}</span>
      </div>
      <div class="ui-transfer-list-body">
        <div class="ui-transfer-search" v-if="filterable">
          <UiInput size="small" clearable v-model.trim="rightSearchValue" :placeholder="filterPlaceholder"/>
        </div>
        <ul class="ui-transfer-list-content" :style="listStyle">
          <template v-if="rightTargetData.length">
            <li class="ui-transfer-list-content-item" v-for="item in rightTargetData" :title="renderItem(item)" :key="item.key">
              <ui-checkbox v-model="item.checked" :disabled="item.disabled" @on-change="handleSelectedChange">
                {{renderItem(item)}}
              </ui-checkbox>
            </li>
          </template>
          <li v-else class="ui-transfer-list-content-empty">{{notFoundText}}</li>
        </ul>
      </div>
      <div v-if="hasSlot" class="ui-transfer-list-footer"><slot></slot></div>
    </div>
  </div>
</template>
<script>
import UiButton from './button/Button'
import UiCheckbox from './checkbox/Checkbox'
import UiInput from './Input'
import UiIcon from './Icon'
export default {
  components: { UiButton, UiCheckbox, UiInput, UiIcon },
  data() {
    return {
      selectAllOfLeft: false,
      selectAllOfRight: false,
      leftSearchValue: '',
      rightSearchValue: '',
      selectedData: { left: [], right: [] },
      hasSlot: false
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
    boxStyle: {
      type: Object,
      default: () => ({})
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
    searchData() {
      return {
        left: this.filterMethod ? 
          this.filterMethod(this.leftData, this.leftSearchValue) : 
          this.leftData.filter(_ => _.label && _.label.indexOf(this.leftSearchValue) !== -1),
        right: this.filterMethod ? 
          this.filterMethod(this.rightData, this.rightSearchValue) : 
          this.rightData.filter(_ => _.label && _.label.indexOf(this.rightSearchValue) !== -1)
      }
    },
    leftTargetData() {
      return this.leftSearchValue ? this.searchData.left : this.leftData
    },
    rightTargetData() {
      return this.rightSearchValue ? this.searchData.right : this.rightData
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
    },
    diaabledSelectAllOfLeft() {
      return this.leftData.every(_ => _.disabled)
    },
    disabledSelectAllOfRight() {
      return this.rightData.every(_ => _.disabled)
    }
  },
  watch: {
    targetKeys(newVal) {
      this.setSelectedData()
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
      if (this.leftData.every(_ => _.disabled)) {
        this.selectAllOfLeft = false
      }
      if (this.rightData.every(_ => _.disabled)) {
        this.selectAllOfRight = false
      }
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
    this.hasSlot = this.$slots.default !== undefined
  }
}
</script>
<style lang="less">
.ui-transfer .ui-checkbox-button {
  margin-right: 12px;
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
  background-color: @bg-color;
  border-bottom: 1px solid @border-color;
}

.ui-transfer-search {
  padding: 8px 8px 0 8px;
}

.ui-transfer-list-content {
  height: 180px;
  overflow: auto;
  padding: 4px 0;
}

.ui-transfer-list-content-item {
  .ui-checkbox {
    width: 100%;
    padding: 7px 16px;
    margin-right: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: background-color .2s ease-in-out;
    &:hover:not(.disabled) {
      background-color: #f3f3f3;
    }
  }
}

.ui-transfer-list-content-empty {
  text-align: center;
  color: @disabled-color;
}

.ui-transfer-list-footer {
  border-top: 1px solid @border-color;
}

.ui-transfer-operation {
  display: inline-block;
  margin: 0 16px;
  vertical-align: middle;
  .ui-button {
    display: block;
    border-radius: 3px;
    padding: 0 7px;
    + .ui-button {
      margin-top: 12px;
    }
  }
}
</style>