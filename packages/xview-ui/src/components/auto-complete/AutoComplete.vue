<template>
  <div class="ui-autocomplete" v-winclick="handleWinClick">
    <UiInput v-model="inputValue" 
      :placeholder="placeholder" :clearable="clearable" :size="size" :disabled="disabled" :elementId="elementId" :icon="icon"
      @click.native="handleClick" @on-focus="handleFocus" @on-blur="handleBlur"/>
    <ui-drop ref="UiDrop" :visible="dropShow" :parentName="$options.name">
      <ul class="ui-autocomplete-select">
        <slot></slot>
        <template v-if="!hasSlot">
          <li class="ui-autocomplete-select-item" 
            v-for="(item, index) in filteredData" :key="index" :class="{active: item === inputValue}" 
            @click="handleOptionClick(item)">
            {{item}}
          </li>
        </template>
      </ul>
    </ui-drop>
  </div>
</template>
<script>
import UiInput from '../input'
import UiDrop from '../select/OptionList.vue'
import { isSelfOrParent } from '../../utils/index'
export default {
  name: 'ui-autocomplete',
  components: { UiInput, UiDrop },
  data() {
    return {
      visible: false,
      inputValue: this.value,
      children: []
    }
  },
  props: {
    value: [String, Number],
    data: {
      type: Array,
      default: () => []
    },
    clearable: Boolean,
    disabled: Boolean,
    placeholder: String,
    size: {
      validator(value) {
        return ['large', 'small', 'default'].indexOf(value) !== -1
      }
    },
    icon: String,
    filterMethod: {
      type: [Function, Boolean],
      default: false
    },
    placement: {
      default: 'bottom',
      validator(value) {
        return ['bottom', 'top'].indexOf(value) !== -1
      }
    },
    elementId: String
  },
  computed: {
    filteredData() {
      return this.inputValue ? this.data.filter(_ =>
        typeof this.filterMethod === 'function' ?
          this.filterMethod(this.inputValue, _) :
          _.toString().indexOf(this.inputValue) !== -1
      ) : this.data
    },
    dropShow() {
      return !!this.filteredData.length && this.visible
    },
    hasSlot() {
      return this.$slots.default !== undefined
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
    }
  },
  methods: {
    handleClick(event) {
      this.visible = !this.visible
    },
    handleOptionClick(item) {
      this.inputValue = item
      this.$emit('on-select', item)
      this.$nextTick(() => this.visible = false)
    },
    handleWinClick(event) {
      let { target } = event
      if (
        target && 
        (isSelfOrParent(this.$el, target) || 
        isSelfOrParent(this.$refs.UiDrop.$el, target))
      ) return
      this.visible = false
    },
    handleFocus(event) {
      this.$emit('on-focus', event)
    },
    handleBlur(event) {
      this.$emit('on-blur', event)
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.ui-autocomplete-select {
  list-style: none;
}

.ui-autocomplete-select-item {
  padding: 7px 16px;
  cursor: pointer;
  transition: background-color .2s ease-in-out;
  &.active, &:hover {
    background-color: @disabled-bg-color;
  }
}
</style>