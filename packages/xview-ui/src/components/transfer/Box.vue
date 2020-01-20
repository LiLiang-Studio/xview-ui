<template>
  <div :class="prefix">
    <header :class="`${prefix}-header`">
      <ui-checkbox v-model="checkAll" :disabled="disSelectAll" @click.native="onCheckAllClick">{{title}}</ui-checkbox>
      <span>{{countText}}</span>
    </header>
    <div v-if="filterable" :class="`${prefix}-search`">
      <ui-input v-model.trim="searchValue" size="small" search clearable :placeholder="filterPlaceholder"/>
    </div>
    <div :class="`${prefix}-list`">
      <ui-checkbox-group v-model="selectedKeys">
        <ui-checkbox v-for="item in showedData" :key="item.key" :title="renderItem(item)"
          :class="`${prefix}-item`" :label="item.key" :disabled="item.disabled">
          {{renderItem(item)}}
        </ui-checkbox>
      </ui-checkbox-group>
      <p v-if="!showedData.length" :class="`${prefix}-empty`">{{notFoundText}}</p>
    </div>
    <footer v-if="hasFooter" :class="`${prefix}-footer`">
      <slot></slot>
    </footer>
  </div>
</template>
<script>
import UiInput from '../input'
import UiCheckbox from '../checkbox'
import UiCheckboxGroup from '../checkbox-group'
export default {
  name: 'UiTransferBox',
  components: { UiInput, UiCheckbox, UiCheckboxGroup },
  data() {
    return {
      prefix: 'ui-transferBox',
      checkAll: false,
      selectedKeys: this.value,
      searchValue: ''
    }
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    renderFormat: Function,
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
      let total = this.data.length, checkedCount = this.selectedKeys.length
      return checkedCount ? `${checkedCount}/${total}` : total
    }
  },
  watch: {
    selectedKeys(newval) {
      this.$emit('input', newval)
      this.$emit('on-selected-change', newval)
      this.checkAll = newval.length && newval.length === this.showedData.filter(_ => !_.disabled).length
    },
    value(newval) {
      this.selectedKeys = newval
    }
  },
  methods: {
    renderItem(item) {
      return this.renderFormat ? this.renderFormat(item) : item.label || item.key
    },
    onCheckAllClick() {
      if (this.disSelectAll) return
      this.selectedKeys = this.checkAll ? this.showedData.filter(_ => !_.disabled).map(_ => _.key) : []
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.ui-transferBox {
  width: 180px;
  height: 210px;
  font-size: 12px;
  border-radius: 3px;
  overflow: hidden;
  display: inline-flex;
  flex-direction: column;
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
    flex: 1;
    padding: 4px 0;
    overflow: auto;
  }
  &-item {
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
    font-size: 12px;
    text-align: center;
    color: @disabled-color;
  }
  &-footer {
    border-top: 1px solid @border-color;
  }
}
</style>