<template>
  <div :class="prefix">
    <x-popper v-bind="popperProps" @clickoutside="toggle(false)">
      <x-input slot="reference" v-bind="$attrs" v-model="inputValue" @click="onClick" @on-focus="onFocus" @on-blur="onBlur"/>
      <ul :class="`${prefix}_list`" :style="listStyle">
        <slot></slot>
        <template v-if="!$slots.default">
          <li v-for="(item, index) in filteredData" :key="index" 
            :class="[`${prefix}_listItem`, {active: item === inputValue}]" @click="onOptionClick(item)">{{item}}</li>
        </template>
      </ul>
    </x-popper>
  </div>
</template>
<script>
import XInput from '../input'
import XPopper from '../popper'
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
    placement: String
  },
  data() {
    return {
      visible: false,
      inputValue: this.value,
      children: [],
      listStyle: null,
      prefix: 'x-autocomplete'
    }
  },
  computed: {
    popperProps() {
      return {
        ref: 'Popper',
        adaptive: false,
        visible: this.visible,
        transitionName: 'x-animate-dropdown',
        placement: this.placement || 'bottom-start'
      }
    },
    filteredData() {
      return this.inputValue ? this.data.filter(_ =>
        typeof this.filterMethod === 'function' ?
          this.filterMethod(this.inputValue, _) :
          _.toString().indexOf(this.inputValue) !== -1
      ) : this.data
    },
    dropShow() {
      return !!this.filteredData.length && this.visible
    }
  },
  watch: {
    value(newVal) {
      this.inputValue = newVal
    },
    inputValue(newVal) {
      this.$emit('input', newVal)
      this.$emit('on-search', newVal)
      this.$emit('on-change', newVal)
    },
    visible(val) {
      val && this.$nextTick(() => this.listStyle = { minWidth: `${this.$el.offsetWidth}px` })
    }
  },
  methods: {
    addItem(vm) {
      this.children.push(vm)
    },
    removeItem(vm) {
      this.children.splice(this.children.indexOf(vm), 1)
    },
    toggle(visible) {
      this.visible = visible === undefined ? !this.visible : visible
    },
    onClick(event) {
      this.visible = !this.visible
    },
    onOptionClick(item) {
      this.inputValue = item
      this.$emit('on-select', item)
      this.$nextTick(() => this.visible = false)
    },
    onFocus(event) {
      this.$emit('on-focus', event)
    },
    onBlur(event) {
      this.$emit('on-blur', event)
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
  &_listItem {
    cursor: pointer;
    padding: 7px 16px;
    transition: background-color .2s ease-in-out;
    &.active, &:hover {
      background: darken(@bg-color, 2%);
    }
  }
  .x-popper, .x-popper_reference {
    width: 100%;
  }
}
</style>