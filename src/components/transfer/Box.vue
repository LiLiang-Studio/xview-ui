<template>
  <div :class="prefix">
    <header :class="`${prefix}-header`">
      <ui-checkbox v-model="checkAll" :disabled="disSelectAll" @click.native="onCheckAllClick">{{title}}</ui-checkbox>
      <span>{{countText}}</span>
    </header>
    <div v-if="filterable" :class="`${prefix}-search`">
      <ui-input v-model.trim="searchValue" size="small" search clearable :placeholder="filterPlaceholder"/>
    </div>
    <ui-checkbox-group v-model="checkedKeys">
      <ul :class="`${prefix}-list`" :style="listStyle">
        <li v-for="item in showedData" :key="item.key">
          <ui-checkbox :class="`${prefix}-checkbox`" :label="item.key" :disabled="item.disabled">
            {{renderItem(item)}}
          </ui-checkbox>
        </li>
        <li v-if="!showedData.length" :class="`${prefix}-empty`">{{notFoundText}}</li>
      </ul>
    </ui-checkbox-group>
    <footer v-if="hasFooter" :class="`${prefix}-footer`">
      <slot></slot>
    </footer>
  </div>
</template>
<script>
import UiInput from '../input'
import { Checkbox as UiCheckbox, CheckboxGroup as UiCheckboxGroup } from '../checkbox'
export default {
  name: 'UiTransferBox',
  components: { UiInput, UiCheckbox, UiCheckboxGroup },
  data() {
    return {
      prefix: 'ui-transferBox',
      checkAll: false,
      checkedKeys: [],
      searchValue: ''
    }
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    renderFormat: Function,
    selectedKeys: {
      type: Array,
      default: () => []
    },
    listStyle: Object,
    title: String,
    filterable: Boolean,
    filterPlaceholder: String,
    filterMethod: Function,
    notFoundText: String
  },
  computed: {
    showedData() {
      let { searchValue: val } = this
      if (this.filterMethod) return this.filterMethod(this.data, val)
      return val ? this.data.filter(_ => _.label && _.label.indexOf(val) !== -1) : [...this.data]
    },
    disSelectAll() {
      return this.showedData.every(_ => _.disabled)
    },
    hasFooter() {
      return this.$slots.default !== undefined
    },
    countText() {
      let total = this.data.length, checkedCount = this.checkedKeys.length
      return checkedCount ? `${checkedCount}/${total}` : total
    }
  },
  watch: {
    checkedKeys(newval) {
      this.$emit('on-selected-change', newval)
      this.checkAll = newval.length === this.data.filter(_ => !_.disabled).length
    }
  },
  methods: {
    renderItem(item) {
      return this.renderFormat ? this.renderFormat(item) : item.label || item.key
    },
    onCheckAllClick() {
      this.checkedKeys = this.checkAll ? this.data.filter(_ => !_.disabled).map(_ => _.key) : []
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.ui-transferBox {
  width: 180px;
  font-size: 12px;
  border-radius: 3px;
  overflow: hidden;
  display: inline-block;
  vertical-align: middle;
  border: 1px solid @border-color;
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
    background-color: @bg-color;
    border-bottom: 1px solid @border-color;
  }
  &-search {
    padding: 8px 8px 3px;
  }
  &-list {
    height: 180px;
    padding: 4px 0;
    overflow: auto;
    list-style: none;
  }
  &-checkbox {
    width: 100%;
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
  &-empty {
    text-align: center;
    color: @disabled-color;
  }
  &-footer {
    border-top: 1px solid @border-color;
  }
}
</style>