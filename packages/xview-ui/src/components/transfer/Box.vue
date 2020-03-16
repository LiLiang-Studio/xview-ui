<template>
  <div :class="prefix">
    <header :class="`${prefix}_header`">
      <x-checkbox v-model="checkAll" :disabled="disSelectAll" @on-change="onCheckAllChange">{{title}}</x-checkbox>
      <span>{{countText}}</span>
    </header>
    <div v-if="filterable" :class="`${prefix}_search`">
      <x-input v-model.trim="searchValue" size="small" search clearable :placeholder="filterPlaceholder"/>
    </div>
    <x-checkbox-group v-if="showedData.length" :class="`${prefix}_list`" v-model="selectedValue">
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
    selectedKeys: arrProp,
    filterable: Boolean,
    filterPlaceholder: S,
    filterMethod: F,
    notFoundText: S
  },
  data() {
    return { prefix: 'x-transfer-box', checkAll: false, selectedValue: this.value, searchValue: '' }
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
      let total = this.data.length, checkedCount = this.selectedValue.length
      return checkedCount ? `${checkedCount}/${total}` : total
    }
  },
  watch: {
    value(val) {
      this.selectedValue = val
    },
    selectedValue(val) {
      this.$emit('input', val)
      this.$emit('change', val)
      this.updateCheckAll()
    },
    data: 'updateCheckAll',
    selectedKeys: {
      immediate: true,
      handler(val) {
        this.selectedValue = val.filter(key => this.data.some(_ => _.key === key))
      }
    }
  },
  methods: {
    updateCheckAll() {
      let noDis = this.showedData.filter(_ => !_.disabled)
      this.checkAll = noDis.length && noDis.every(_ => this.selectedValue.indexOf(_.key) > -1)
    },
    renderItem(item) {
      return this.renderFormat ? this.renderFormat(item) : item.label || item.key
    },
    onCheckAllChange(checked) {
      let disAndSelected = this.data.filter(_ => _.disabled && this.selectedValue.indexOf(_.key) > -1)
      this.selectedValue = disAndSelected.concat(checked ? this.showedData.filter(_ => !_.disabled) : []).map(_ => _.key)
    }
  }
}
</script>