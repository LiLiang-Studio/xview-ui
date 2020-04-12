<template>
  <div :class="prefix">
    <x-popper v-bind="popperProps" @clickoutside="toggle(false)">
      <x-input slot="reference" v-bind="$attrs" v-model="inputValue" v-on="inputListeners"/>
      <ul :class="`${prefix}_list`" :style="listStyle">
        <slot>
          <li v-for="(_, i) in filtered" :key="i" :class="[`${prefix}_item`, {focus: _ === focusValue}]" @click="onItemClick(_)">{{_}}</li>
        </slot>
      </ul>
    </x-popper>
  </div>
</template>
<script>
import XInput from '../input'
import XPopper from '../popper'
import { isFunc } from '../../tools'
export default {
  name: 'XAutocomplete',
  components: { XInput, XPopper },
  props: {
    value: [String, Number],
    data: {
      type: Array,
      default: () => []
    },
    filterMethod: {
      type: [Function, Boolean],
      default: false
    },
    placement: String,
    transfer: Boolean
  },
  data() {
    return {
      children: [],
      visible: false,
      listStyle: null,
      focusValue: this.value,
      inputValue: this.value,
      prefix: 'x-autocomplete'
    }
  },
  computed: {
    popperProps() {
      return {
        ref: 'Popper',
        adaptive: false,
        transfer: this.transfer,
        transitionName: 'x-animate-dropdown',
        placement: this.placement || 'bottom-start',
        visible: this.visible && (this.children.length > 0 || this.filtered.length > 0)
      }
    },
    filtered() {
      let val = this.inputValue, filter = this.filterMethod
      return val && filter ? this.data.filter(_ => isFunc(filter) ? filter(val, _) : (_ + '').indexOf(val) > -1) : this.data
    },
    inputListeners() {
      return {
        ...this.$listeners,
        click: () => this.toggle(),
        input: () => this.toggle(true),
        'on-keydown': this.onKeydown
      }
    }
  },
  watch: {
    value(val) {
      this.inputValue = val
    },
    inputValue(val) {
      this.$emit('input', val)
      this.$emit('on-change', val)
      val && this.$emit('on-search', val)
      this.updateFocus()
      this.focusValue = val
    },
    visible(val) {
      if (val) {
        this.updateFocus()
        this.$nextTick(() => this.listStyle = { minWidth: `${this.$el.offsetWidth}px` })
      }
    }
  },
  methods: {
    updateFocus() {
      if (this.children.length) this.children.forEach(_ => _.focus = [_.value, _.label].indexOf(this.inputValue) > -1)
    },
    addItem(vm) {
      this.children.push(vm)
    },
    removeItem(vm) {
      this.children.splice(this.children.indexOf(vm), 1)
    },
    updateSelected(vm) {
      this.toggle(false)
      this.inputValue = vm.label || vm.value
      this.children.forEach(_ => _.focus = false)
      vm.focus = true
    },
    toggle(visible) {
      this.visible = visible === undefined ? !this.visible : visible
    },
    onItemClick(val) {
      this.toggle(false)
      this.inputValue = val
    },
    onKeydown(e) {
      if (this.visible) { // 38: 向上, 40: 向下, 27: ESC, 13: 回车, 9: TAB
        if ([9, 27, 38, 40].indexOf(e.keyCode) > -1) e.preventDefault()
        let action = {
          13: this.onEnter,
          27: this.toggle,
          38: this.setFocus.bind(this, true),
          40: this.setFocus
        }[e.keyCode]
        action && action()
      }
    },
    onEnter() {
      if (this.children.length) {
        let vm = this.children.find(_ => _.focus)
        return vm ? this.updateSelected(vm) : this.toggle()
      }
      this.toggle()
      this.inputValue = this.focusValue
    },
    getNextIndex(index, len, isUp) {
      return isUp ? (index <= 0 ? len - 1 : index - 1) : (index < len - 1 ? index + 1 : 0)
    },
    setFocus(isUp) {
      if (this.children.length) {
        let children = this.children.filter(_ => !_.disabled)
        if (children.length) {
          let index = children.findIndex(_ => _.focus)
          this.children.forEach(_ => _.focus = false)
          children[this.getNextIndex(index, children.length, isUp)].focus = true
        }
      } else {
        let index = this.filtered.indexOf(this.focusValue)
        this.focusValue = this.filtered[this.getNextIndex(index, this.filtered.length, isUp)]
      }
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.x-autocomplete {
  width: 100%;
  display: inline-block;
  vertical-align: middle;
  &_list {
    padding: 5px 0;
    list-style: none;
  }
  &_item {
    cursor: pointer;
    padding: 7px 16px;
    &.focus, &:hover {
      background: darken(@bg-color, 2%);
    }
  }
  .x-popper, .x-popper_reference {
    width: 100%;
  }
}
</style>