<template>
  <div :class="['x-cascader', {noSlot: !$slots.default}]">
    <x-popper v-bind="popperProps" 
      @clickoutside="toggle(false)" @on-popper-show="onVisibleChange(true)" @on-popper-hide="onVisibleChange(false)">
      <span slot="reference" @click="onClick">
        <slot>
          <x-input v-bind="inputProps" @on-clear.stop="onClear"/>
        </slot>
      </span>
      <x-cascader-menu :data="data"/>
    </x-popper>
  </div>
</template>
<script>
import XInput from '../input'
import XPopper from '../popper'
import XCascaderMenu from './CascaderMenu.vue'
import { findChildrens } from '../../tools'
export default {
  name: 'XCascader',
  components: { XInput, XPopper, XCascaderMenu },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    value: {
      type: Array,
      default: () => []
    },
    disabled: Boolean,
    renderFormat: {
      type: Function,
      default: label => label.join(' / ')
    },
    trigger: {
      validator: v => ['click', 'hover'].indexOf(v) > -1
    },
    changeOnSelect: Boolean,
    loadData: Function,
    filterable: Boolean,
    notFoundText: {
      type: String,
      default: '无匹配数据'
    },
    transfer: Boolean
  },
  data() {
    return { visible: false, selectedValue: this.value }
  },
  computed: {
    inputProps() {
      return {
        clearable: true,
        placeholder: '请选择',
        ...this.$attrs,
        icon: 'ios-arrow-down',
        disabled: this.disabled,
        value: this.inputValue,
        readonly: !this.filterable
      }
    },
    popperProps() {
      return {
        ref: 'Popper',
        adaptive: false,
        visible: this.visible,
        transfer: this.transfer,
        placement: 'bottom-start',
        transitionName: 'x-animate-dropdown'
      }
    },
    inputValue() {
      let selected = this.getSelected()
      return this.renderFormat(selected.map(_ => _.label), selected)
    }
  },
  watch: {
    value(val) {
      this.selectedValue = val
    },
    selectedValue(val) {
      this.$emit('input', val)
    }
  },
  methods: {
    toggle(visible) {
      this.visible = visible === undefined ? !this.visible : visible
    },
    onClick() {
      if (!this.disabled) this.toggle()
    },
    onClear() {
      this.toggle(false)
      this.selectedValue = []
      this.emitChange()
    },
    onVisibleChange(visible) {
      this.$emit('on-visible-change', visible)
      if (visible) {
        let menus = findChildrens(this, 'XCascaderMenu')
        menus.forEach(_ => _.nextData = null)
        const eachItems = menu => {
          let items = menu.$children.filter(_ => _.$options.name === 'XCascaderItem')
          items.forEach(_ => _.selected = this.selectedValue.indexOf(_.option.value) > -1)
          let item = items.find(_ => _.selected)
          if (item) {
            menu.nextData = item.option.children
            if (menu.nextData) {
              this.$nextTick(() => eachItems(menu.$children.find(_ => _.$options.name === 'XCascaderMenu')))
            }
          }
        }
        eachItems(menus[0])
      }
    },
    emitChange() {
      this.$emit('on-change', this.selectedValue, this.getSelected())
    },
    updateValue() {
      this.toggle(false)
      this.selectedValue = findChildrens(this, 'XCascaderItem').filter(_ => _.selected).map(_ => _.option.value)
      this.emitChange()
    },
    getFlatData() {
      const reduce = data => data.reduce((acc, _) => [...acc, _, ...(_.children ? reduce(_.children) : [])], [])
      return reduce(this.data)
    },
    getSelected() {
      return this.getFlatData().filter(_ => this.selectedValue.indexOf(_.value) > -1)
    }
  }
}
</script>
<style lang="less">
.x-cascader {
  width: 100%;
  display: inline-block;
  vertical-align: middle;
  &.noSlot {
    .x-popper, .x-popper_reference {
      width: 100%;
    }
  }
  input {
    cursor: pointer;
  }
}
</style>