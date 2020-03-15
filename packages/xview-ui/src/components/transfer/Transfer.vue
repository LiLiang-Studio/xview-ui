<template>
  <div>
    <x-box v-model="selectedData.left" v-bind="boxProps" :title="titles[0]" :data="convertData.left" @change="onSelectChange">
      <slot></slot>
    </x-box>
    <div :class="`${prefix}_btns`">
      <x-btn v-bind="btnProps.toLeft" @click="moveToLeft"><x-icon type="ios-arrow-left"/>{{operations[0]}}</x-btn>
      <x-btn v-bind="btnProps.toRight" @click="moveToRight">{{operations[1]}}<x-icon type="ios-arrow-right"/></x-btn>
    </div>
    <x-box v-model="selectedData.right" v-bind="boxProps" :title="titles[1]" :data="convertData.right" @change="onSelectChange">
      <slot></slot>
    </x-box>
  </div>
</template>
<script>
import XBox from './Box.vue'
import XIcon from '../icon'
import XBtn from '../button'
const A = Array, S = String, F = Function, arrProp = { type: A, default: () => [] }
export default {
  name: 'XTransfer',
  components: { XBox, XIcon, XBtn },
  props: {
    data: arrProp,
    targetKeys: arrProp,
    renderFormat: F,
    selectedKeys: arrProp,
    listStyle: { type: Object, default: () => ({}) },
    titles: { type: A, default: () => ['源列表', '目标列表'] },
    operations: arrProp,
    filterable: Boolean,
    filterPlaceholder: { type: S, default: '请输入搜索内容' },
    filterMethod: F,
    notFoundText: { type: S, default: '列表为空' }
  },
  data() {
    return { prefix: 'x-transfer', selectedData: { left: [], right: [] } }
  },
  computed: {
    convertData() {
      return this.data.reduce((acc, _) => {
        return acc[this.targetKeys.indexOf(_.key) < 0 ? 'left' : 'right'].push(_), acc
      }, { left: [], right: [] })
    },
    boxProps() {
      return { ...this.$props, style: this.listStyle }
    },
    btnProps() {
      let data = this.selectedData, props = { type: 'primary', size: 'small' }
      let disLeft = data.left.length === 0 || data.left.every(key => {
        return this.convertData.left.find(_ => _.key === key).disabled
      })
      let disRight = data.right.length === 0 || data.right.every(key => {
        return this.convertData.right.find(_ => _.key === key).disabled
      })
      return { toLeft: { ...props, disabled: disRight }, toRight: { ...props, disabled: disLeft } }
    }
  },
  watch: {
    selectedKeys: {
      immediate: true,
      handler(val) {
        const inData = (key, arr) => arr.some(_ => _.key === key),
          inLeft = key => inData(key, this.convertData.left), inRight = key => inData(key, this.convertData.right)
        this.selectedData = val.reduce((acc, _) => {
          return inLeft(_) ? acc.left.push(_) : inRight(_) ? acc.right.push(_) : 1, acc
        }, { left: [], right: [] })
      }
    }
  },
  methods: {
    getCanMoved(keys, data) {
      return keys.reduce((acc, key) => {
        let isDis = data.find(_ => _.key === key).disabled
        return acc[isDis ? 'noMoved' : 'moved'].push(key), acc
      }, { moved: [], noMoved: [] })
    },
    moveToLeft() {
      let data = this.getCanMoved(this.selectedData.right, this.convertData.right)
      let moveKeys = data.moved
      this.selectedData.right = data.noMoved
      let targetKeys = this.convertData.right.filter(_ => moveKeys.indexOf(_.key) < 0).map(_ => _.key)
      this.$emit('on-change', targetKeys, 'left', moveKeys)
    },
    moveToRight() {
      let data = this.getCanMoved(this.selectedData.left, this.convertData.left)
      let moveKeys = data.moved
      this.selectedData.left = data.noMoved
      let targetKeys = this.convertData.right.map(_ => _.key).concat(moveKeys)
      this.$emit('on-change', targetKeys, 'right', moveKeys)
    },
    onSelectChange() {
      this.$emit('on-selected-change', this.selectedData.left, this.selectedData.right)
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.x-transfer {
  &-box {
    width: 180px;
    height: 210px;
    border-radius: 4px;
    overflow: hidden;
    display: inline-flex;
    flex-direction: column;
    vertical-align: middle;
    border: 1px solid @border-color;
    &_header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 16px;
      background-color: @bg-color;
      border-bottom: 1px solid @border-color;
    }
    &_search {
      padding: 8px 8px 3px;
    }
    &_list {
      flex: 1;
      padding: 4px 0;
      overflow: auto;
      > * {
        display: block;
        padding: 7px 16px;
        margin-right: 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        transition: background-color .2s ease-in-out;
        &:not(.disabled):hover {
          background-color: @disabled-bg-color;
        }
      }
    }
    &_empty {
      text-align: center;
      color: @disabled-color;
    }
    &_footer {
      border-top: 1px solid @border-color;
    }
  }
  &_btns {
    margin: 0 16px;
    display: inline-block;
    vertical-align: middle;
    button {
      display: block;
      margin-right: 0;
      + button {
        margin-top: 12px;
      }
    }
  }
}
</style>