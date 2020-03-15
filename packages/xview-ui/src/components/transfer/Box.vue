<template>
  <div :class="prefix">
    <header :class="`${prefix}_header`">
      <x-checkbox v-model="checkAll" :disabled="disSelectAll" @on-change="onCheckAllChange">{{title}}</x-checkbox>
      <span>{{countText}}</span>
    </header>
    <div v-if="filterable" :class="`${prefix}_search`">
      <x-input v-model.trim="searchValue" size="small" search clearable :placeholder="filterPlaceholder"/>
    </div>
    <x-checkbox-group v-if="showedData.length" :class="`${prefix}_list`" v-model="selectedKeys">
      <x-checkbox v-for="_ in showedData" :key="_.key" :label="_.key" :disabled="_.disabled">{{renderItem(_)}}</x-checkbox>
    </x-checkbox-group>
    <p v-else :class="`${prefix}_empty`">{{notFoundText}}</p>
    <footer v-if="$slots.default" :class="`${prefix}_footer`">
      <slot></slot>
    </footer>
  </div>
</template>
<script>
import XInput from '../input'
import XCheckbox from '../checkbox'
import XCheckboxGroup from '../checkbox-group'
const S = String, F = Function, arrProp = { type: Array, default: () => [] }
export default {
  name: 'XTransferBox',
  components: { XInput, XCheckbox, XCheckboxGroup },
  props: {
    value: arrProp,
    data: arrProp,
    renderFormat: F,
    title: S,
    filterable: Boolean,
    filterPlaceholder: S,
    filterMethod: F,
    notFoundText: S
  },
  data() {
    return { prefix: 'x-transfer-box', checkAll: false, selectedKeys: this.value, searchValue: '' }
  },
  computed: {
    showedData() {
      let val = this.searchValue
      return val ? this.filterMethod ? this.filterMethod(this.data, val) :
        this.data.filter(_ => _.label && _.label.indexOf(val) > -1) : [...this.data]
    },
    disSelectAll() {
      return this.showedData.every(_ => _.disabled)
    },
    countText() {
      let total = this.data.length, checkedCount = this.selectedKeys.length
      return checkedCount ? `${checkedCount}/${total}` : total
    }
  },
  watch: {
    selectedKeys(val) {
      this.$emit('input', val)
      this.$emit('change', val)
      this.checkAll = this.showedData.filter(_ => !_.disabled).every(_ => {
        return val.indexOf(_.key) > -1
      })
    },
    value(val) {
      this.selectedKeys = val
    }
  },
  methods: {
    renderItem(item) {
      return this.renderFormat ? this.renderFormat(item) : item.label || item.key
    },
    onCheckAllChange() {
      if (this.disSelectAll) return
      let selectedAndDisabled = this.showedData.filter(_ => {
          return _.disabled && this.selectedKeys.indexOf(_.key) > -1
        }).map(_ => _.key)
      this.selectedKeys = this.checkAll ? 
        this.showedData.filter(_ => !_.disabled).map(_ => _.key).concat(selectedAndDisabled) : selectedAndDisabled
    }
  }
}
</script>