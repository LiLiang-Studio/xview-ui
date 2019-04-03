<template>
  <div class="ui-select" :class="{disabled}" :style="{zIndex}">
    <div class="ui-select-selection" 
      :class="[size, {isCollapsed, clearable: clearable && selectedValue, disabled}]" @click="toggleCollapse">
      <input class="ui-select-input" readonly v-if="!multiple" :placeholder="placeholder" :value="selectedValue">
      <div class="ui-select-arrow">
        <UiIcon class="ui-select-clear-icon" type="ios-close" @click.native.stop="clearValue"/>
        <UiIcon class="ui-select-down-icon" type="arrow-down-b"/>
      </div>
    </div>
    <transition name="ui-dropdown">
      <div v-show="isCollapsed" class="ui-select-dropdown">
        <ul><slot></slot></ul>
      </div>
    </transition>
  </div>
</template>
<script>
import UiIcon from './../Icon'
import { hasClassNameOfParent, findParentByClassName } from './../../utils'

let currentSelect = null

function closeSelect(event) {
  let domSelect = findParentByClassName(event.target, 'ui-select')
  let isDropdown = hasClassNameOfParent(event.target, 'ui-select-dropdown')
  let isDisabled = domSelect && domSelect.classList.contains('disabled')
  if (isDropdown || (domSelect && !isDisabled)) return
  currentSelect && (currentSelect.$data.isCollapsed = false)
}

function addDocClickListener() {
  // console.log('监听器被添加')
  document.body.addEventListener('click', closeSelect)
}

function removeDocClickListener() {
  // console.log('监听器被移除')
  document.body.removeEventListener('click', closeSelect)
}

addDocClickListener()

export default {
  name: 'ui-select',
  components: { UiIcon },
  data() {
    return {
      isCollapsed: false,
      selectedValue: this.value
    }
  },
  props: {
    value: [String, Number, Array],
    multiple: Boolean,
    disabled: Boolean,
    clearable: Boolean,
    filterable: Boolean,
    remote: Boolean,
    remoteMethod: Function,
    loading: Boolean,
    loadingText: {
      type: String,
      default: '加载中'
    },
    label: [String, Number, Array],
    size: {
      validator(value) {
        return ['large', 'small', 'default'].indexOf(value) !== -1
      }
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    notFoundText: {
      type: String,
      default: '无匹配数据'
    },
    labelInValue: Boolean,
    placement: {
      default: 'bottom',
      validator(value) {
        return ['bottom', 'top'].indexOf(value) !== -1
      }
    },
    transfer: Boolean,
    elementId: String
  },
  computed: {
    zIndex() {
      return this.isCollapsed ? 2 : 1
    }
  },
  watch: {
    value(newVal) {
      this.selectedValue = newVal
    },
    selectedValue(newVal) {
      this.$emit('input', newVal)
      this.$emit('on-change', newVal)
    }
  },
  methods: {
    toggleCollapse() {
      if (this.disabled) return
      this.isCollapsed = !this.isCollapsed
      if (this.isCollapsed) {
        if (currentSelect && currentSelect !== this) {
          currentSelect.$data.isCollapsed = false
        }
        currentSelect = this
      }
      this.$emit('on-open-change', this.isCollapsed)
    },
    isSelectedChild(value) {
      return this.selectedValue instanceof Array ? this.selectedValue.indexOf(value) !== -1 : this.selectedValue === value
    },
    updateSelectedValue(value) {
      if (this.selectedValue instanceof Array) {
        let index = this.selectedValue.indexOf(value)
        if (index === -1) {
          this.selectedValue.push(value)
        } else {
          this.selectedValue.splice(index, 1)
        }
      } else {
        this.selectedValue = value
      }
      this.isCollapsed = false
    },
    clearValue() {
      this.selectedValue = ''
      this.isCollapsed = false
    }
  }
}
</script>
<style lang="less">
.ui-select {
  display: inline-block;
  width: 100%;
  position: relative;
}

.ui-select-selection {
  height: 32px;
  border: 1px solid @border-color;
  border-radius: 4px;
  cursor: pointer;
  transition: border .2s ease-in-out;
  position: relative;
  outline: none;
  background-color: #fff;
  transition: all .2s ease-in-out;
  &.large {
    height: 36px;
  }
  &.small {
    height: 24px;
  }
  &:hover:not(.disabled), &.isCollapsed {
    border-color: @primary-color;
  }
  &.clearable:hover:not(.disabled) {
    .ui-select-clear-icon {
      display: inline-block;
    }
    .ui-select-down-icon {
      display: none;
    }
  }
  &.isCollapsed {
    .form-control-shadow(@primary-color);
    .ui-select-arrow {
      transform: rotate(180deg);
    }
  }
  &.disabled {
    &, .ui-select-input {
      cursor: not-allowed;
    }
    background-color: @disabled-bg-color;
  }
}

.ui-select-clear-icon {
  display: none;
}

.ui-select-dropdown {
  max-height: 200px;
  overflow: auto;
  margin: 5px 0;
  padding: 5px 0;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 6px rgba(0,0,0,.2);
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
}

.ui-select-input {
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  background-color: transparent;
  border-radius: 4px;
  padding: 0 24px 0 8px;
  cursor: pointer;
  color: @content-color;
  font-size: 12px;
  &::placeholder {
    color: @disabled-color;
  }
}

.ui-select-arrow {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: @sub-color;
  font-size: 14px;
  transition: transform .2s ease-in-out;
}

.ui-select-option {
  padding: 7px 16px;
  list-style: none;
  outline: none;
  cursor: pointer;
  line-height: 1.2;
  &:focus:not(.disabled), &:hover:not(.disabled) {
    background-color: @disabled-bg-color;
  }
  &.selected:not(.disabled) {
    color: #fff;
    background-color: @primary-color;
  }
  &.disabled {
    color: @disabled-color;
    cursor: not-allowed;
  }
}

.ui-option-group-title {
  padding-left: 8px;
  color: #999;
  font-size: 12px;
  height: 30px;
  line-height: 30px;
}
</style>