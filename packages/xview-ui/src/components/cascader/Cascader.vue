<template>
  <div class="x-cascader">
    <x-popper v-bind="popperProps" @clickoutside="toggle(false)">
      <x-input slot="reference" v-bind="inputProps" @click.native="onClick"/>
      <x-cascader-menu :data="data"/>
    </x-popper>
  </div>
</template>
<script>
import XInput from '../input'
import XPopper from '../popper'
import XCascaderMenu from './CascaderMenu.vue'
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
    return { visible: false }
  },
  computed: {
    inputProps() {
      return {
        clearable: true,
        placeholder: '请选择',
        ...this.$attrs,
        icon: 'ios-arrow-down',
        disabled: this.disabled,
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
    }
  },
  methods: {
    toggle(visible) {
      this.visible = visible === undefined ? !this.visible : visible
    },
    onClick() {
      if (!this.disabled) this.toggle()
    }
  }
}
</script>
<style lang="less">
.x-cascader {
  width: 100%;
  display: inline-block;
  vertical-align: middle;
  .x-popper, .x-popper_reference {
    width: 100%;
  }
  input {
    cursor: pointer;
  }
}
</style>