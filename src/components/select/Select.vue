<template>
  <div class="ui-select" :class="{disabled}" :style="{zIndex}">
    <div class="ui-select-selection" tabindex="-1"
      :class="[size, {isCollapsed, clearable: clearable && selectedValue, multiple, filterable, disabled}]" 
      @click="toggleCollapse" @focus="handleFocus">
      <template v-if="multiple">
        <ui-tag closable v-for="item in selectedItems" :key="item.value" :fade="false" @on-close="delSelectedItem(item)">
          {{item.label || item.value}}
        </ui-tag>
        <input ref="Input" class="ui-select-search" 
          v-if="filterable" v-model="searchValue" 
          :style="multipleInputStyles" :placeholder="multiplePlaceholder" 
          @blur="handleSearchBlur">
        <span class="ui-select-search-text" ref="SearchText">{{searchText}}</span>
      </template>
      <div class="ui-select-single" v-else>
        <input ref="Input" class="ui-select-search" 
          v-if="filterable" v-model="searchValue" :placeholder="placeholder" @blur="handleSearchBlur">
        <template v-else>
          <span class="ui-select-label" v-if="selectedLabelOfSingle">{{selectedLabelOfSingle}}</span>
          <span class="ui-select-placeholder" v-else>{{placeholder}}</span>
        </template>
      </div>
      <div class="ui-select-arrow">
        <UiIcon class="ui-select-clear-icon" type="ios-close" @click.native.stop="clearValue"/>
        <UiIcon class="ui-select-down-icon" type="arrow-down-b"/>
      </div>
    </div>
    <transition name="ui-dropdown">
      <div v-show="isCollapsed" ref="Dropdown" class="ui-select-dropdown" :class="{multiple}">
        <div class="ui-select-empty" v-if="isEmpty">
          {{loading ? loadingText : notFoundText}}
        </div>
        <ul><slot></slot></ul>
      </div>
    </transition>
  </div>
</template>
<script>
import UiTag from './../Tag'
import UiIcon from './../Icon'
import { hasClassNameOfParent, findParentByClassName, isSelfOrParent } from './../../utils'

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
  components: { UiTag, UiIcon },
  data() {
    return {
      isCollapsed: false,
      selectedValue: this.value,
      children: [],
      searchValue: this.value instanceof Array ? '' : this.value
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
    }
  },
  computed: {
    zIndex() {
      return this.isCollapsed ? 2 : 1
    },
    selectedItems() {
      return this.children.filter(_ => _.selected)
    },
    selectedLabelOfSingle() {
      let item = this.selectedItems[0]
      return item ? item.label || item.value : ''
    },
    isEmpty() {
      return this.children.every(_ => _.isDelete)
    },
    multipleInputStyles() {
      return this.selectedItems.length ? { width: '20px' } : {}
    },
    multiplePlaceholder() {
      return this.selectedItems.length === 0 && this.placeholder
    },
    searchText() {
      return this.searchValue.replace(/\s/gm, val => {
        return '&nbsp;'
      })
    }
  },
  watch: {
    value(newVal) {
      this.selectedValue = newVal
    },
    selectedValue(newVal) {
      this.$emit('input', newVal)
      this.$emit('on-change', newVal)
    },
    searchValue(newVal) {
      if (!this.filterable) return
      if (this.remote) {
        this.remoteMethod(newVal)
      } else {
        let _newVal = ('' + newVal).toLowerCase()
        this.children.forEach(_ => {
          let _val = ('' + _.value).toLowerCase()
          let _label = _.label === undefined ? '' : ('' + _.label).toLowerCase()
          _.$data.isDelete = _val.indexOf(_newVal) === -1 && _label.indexOf(_newVal) === -1
        })
      }
      if (!this.multiple) return
      this.$nextTick(() => {
        this.$refs.Input.style.width = newVal || this.selectedValue.length ? 
          Math.min(this.$refs.SearchText.offsetWidth, this.$el.offsetWidth - 25) + 'px' : ''
      })
    }
  },
  methods: {
    showAll() {
      this.children.forEach(_ => _.$data.isDelete = false)
    },
    toggleCollapse() {
      if (this.disabled) return
      this.isCollapsed = !this.isCollapsed
      if (this.isCollapsed) {
        if (currentSelect && currentSelect !== this) {
          currentSelect.$data.isCollapsed = false
        }
        currentSelect = this
        this.showAll()
      }
      this.$emit('on-open-change', this.isCollapsed)
    },
    isSelectedChild(value) {
      return this.multiple ? this.selectedValue.indexOf(value) !== -1 : this.selectedValue === value
    },
    updateSelectedValue(value) {
      if (this.multiple) {
        let index = this.selectedValue.indexOf(value)
        if (index === -1) {
          this.selectedValue.push(value)
        } else {
          this.selectedValue.splice(index, 1)
        }
        this.$refs.Input.focus()
      } else {
        this.selectedValue = this.searchValue = value
        this.isCollapsed = false
      }
    },
    addChild(vm) {
      this.children.push(vm)
    },
    removeChild(vm) {
      this.children.splice(this.children.indexOf(vm), 1)
    },
    clearValue() {
      this.selectedValue = ''
      this.isCollapsed = false
    },
    delSelectedItem(item) {
      this.selectedValue.splice(this.selectedValue.indexOf(item.value), 1)
    },
    handleFocus() {
      if (this.filterable) this.$refs.Input.focus()
    },
    handleSearchBlur(event) {
      if (!this.filterable || this.multiple) return
      let { relatedTarget } = event
      if (
        relatedTarget && 
        (isSelfOrParent(this.$el, relatedTarget) || 
        isSelfOrParent(this.$refs.Dropdown, relatedTarget))
      ) return
      this.searchValue = this.selectedValue
    }
  }
}
</script>
<style lang="less">
.ui-select {
  display: inline-block;
  width: 100%;
  position: relative;
  vertical-align: middle;
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
  padding: 0 24px 0 8px;
  &.large {
    height: 36px;
  }
  &.small {
    height: 24px;
  }
  &.multiple {
    height: auto;
    padding-left: 4px;
    min-height: 32px;
    &.large {
      min-height: 36px;
    }
    &.small {
      min-height: 24px;
    }
    .ui-select-search {
      height: 30px;
    }
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
  .ui-tag {
    margin: 3px 4px 3px 0;
  }
}

.ui-select-search-text {
  position: absolute;
  top: 0;
  left: 0;
  min-width: 20px;
  visibility: hidden;
  pointer-events: none;
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

.ui-select-single {
  height: 100%;
  color: @content-color;
  font-size: 12px;
  display: flex;
  align-items: center;
}

.ui-select-placeholder {
  color: @disabled-color;
}

.ui-select-search {
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  color: @content-color;
  font-size: 12px;
  &::placeholder {
    color: @disabled-color;
  }
}

.ui-select-empty {
  text-align: center;
  font-size: 14px;
  color: @disabled-color;
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
  position: relative;
  &:focus:not(.disabled), &:hover:not(.disabled) {
    background-color: @disabled-bg-color;
  }
  &.selected:not(.isMultiple):not(.disabled) {
    color: #fff;
    background-color: @primary-color;
  }
  &.disabled {
    color: @disabled-color;
    cursor: not-allowed;
  }
  &.selected.isMultiple {
    color: @primary-color;
  }
}

.ui-select-option-icon {
  position: absolute;
  top: 8px;
  right: 16px;
  font-size: 14px;
}

.ui-option-group-title {
  padding-left: 8px;
  color: #999;
  font-size: 12px;
  height: 30px;
  line-height: 30px;
}
</style>