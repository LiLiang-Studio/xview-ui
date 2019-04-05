<template>
  <div class="ui-select" :class="{disabled}">
    <!-- 选择框 -->
    <div class="ui-select-selection" tabindex="0"
      :class="[size, {isCollapsed, clearable: showClear, multiple, filterable, disabled}]"
      @click="toggleCollapse" @focus="handleFocus" @keydown="handleKeydown">
      <!-- 多选 -->
      <template v-if="multiple">
        <ui-tag closable v-for="item in selectedItems" 
          :key="item.value" :fade="false" @on-close="removeSelectedItem(item)">
          {{item.label || item.value}}
        </ui-tag>
        <!-- 占位 -->
        <input class="ui-select-search placeholder" readonly 
          v-if="!(filterable || selectedItems.length)" :placeholder="placeholder">
        <!-- 搜索框 -->
        <input ref="Input" class="ui-select-search"
          v-if="filterable" v-model="searchValue"
          :style="multipleInputStyles" :placeholder="multiplePlaceholder"
          @blur="handleSearchBlur">
        <!-- 测输入框内容宽度文本 -->
        <span class="ui-select-search-text" ref="SearchText">{{searchText}}</span>
      </template>
      <!-- 单选 -->
      <div class="ui-select-single" v-else>
        <!-- 搜索框 -->
        <input ref="Input" class="ui-select-search" 
          v-if="filterable" v-model="searchValue" :placeholder="placeholder" @blur="handleSearchBlur">
        <!-- 标签 -->
        <template v-else>
          <span class="ui-select-label" v-if="selectedLabelOfSingle">{{selectedLabelOfSingle}}</span>
          <span class="ui-select-placeholder" v-else>{{placeholder}}</span>
        </template>
      </div>
      <!-- 箭头图标 -->
      <div class="ui-select-arrow">
        <UiIcon class="ui-select-clear-icon" type="ios-close" @click.native.stop="clearValue"/>
        <UiIcon class="ui-select-down-icon" type="arrow-down-b"/>
      </div>
    </div>
    <!-- 选项列表 -->
    <ui-option-list ref="UiOptionList" :visible="isCollapsed">
      <span v-if="isEmpty" slot="empty">{{loading ? loadingText : notFoundText}}</span>
      <slot></slot>
    </ui-option-list>
  </div>
</template>
<script>
import UiTag from './../Tag'
import UiIcon from './../Icon'
import UiOptionList from './OptionList'
import { hasClassNameOfParent, findParentByClassName, isSelfOrParent } from './../../utils'

// 目标选项列表组件
let currentSelect = null

/**
 * 关闭目标选项列表下拉框
 * @param {MouseEvent} event
 */
function closeSelect(event) {
  let domSelect = findParentByClassName(event.target, 'ui-select')
  let isDropdown = hasClassNameOfParent(event.target, 'ui-select-dropdown')
  let isDisabled = domSelect && domSelect.classList.contains('disabled')
  if (isDropdown || (domSelect && !isDisabled)) return
  currentSelect && (currentSelect.$data.isCollapsed = false)
}

/**
 * 添加窗口单击事件监听器
 */
function addDocClickListener() {
  // console.log('监听器被添加')
  window.addEventListener('click', closeSelect)
}

/**
 * 移除窗口单击事件监听器
 */
function removeDocClickListener() {
  // console.log('监听器被移除')
  window.removeEventListener('click', closeSelect)
}

addDocClickListener()

export default {
  name: 'ui-select',
  components: { UiTag, UiIcon, UiOptionList },
  data() {
    return {
      isCollapsed: false, // 是否展开下拉列表
      selectedItem: {}, // 选择的item，单选
      selectedItems: [], // 选择的items，多选
      children: [], // Option组件数组
      searchValue: '' // 搜索值
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
    placement: {
      default: 'bottom',
      validator(value) {
        return ['bottom', 'top'].indexOf(value) !== -1
      }
    }
  },
  computed: {
    /**
     * 单选选中的标签
     */
    selectedLabelOfSingle() {
      return this.selectedItem.label || this.selectedItem.value
    },
    /**
     * 是否显示清除按钮
     */
    showClear() {
      return this.clearable && (this.multiple ? this.selectedItems.length : this.selectedItem.value)
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
      return this.searchValue.replace(/\s/gm, val => '&nbsp;')
    }
  },
  watch: {
    /**
     * 值改变
     */
    value(newVal) {
      this.updateModel(newVal)
    },
    /**
     * 选择的值改变，单选
     */
    selectedItem(newVal) {
      this.syncModel()
    },
    /**
     * 选择的值改变，多选
     */
    selectedItems(newVal) {
      if (this.isCollapsed) {
        this.$nextTick(() => this.$refs.UiOptionList.updatePosition())
      }
    },
    /**
     * 搜索值改变
     */
    searchValue(newVal) {
      if (!this.filterable) return
      // 远程搜索
      if (this.remote) {
        this.remoteMethod && this.remoteMethod(newVal)
      // 本地搜索
      } else {
        let _newVal = newVal.toLowerCase()
        this.children.forEach(_ => {
          let _val = ('' + _.value).toLowerCase()
          let _label = _.label === undefined ? '' : ('' + _.label).toLowerCase()
          _.$data.isDelete = _val.indexOf(_newVal) === -1 && _label.indexOf(_newVal) === -1
        })
      }
      if (!this.multiple) return
      // 更新文本框框宽度
      this.$nextTick(() => {
        this.$refs.Input.style.width = 
          newVal || this.selectedItems.length ? 
          Math.min(this.$refs.SearchText.offsetWidth, this.$el.offsetWidth - 25) + 'px' : ''
      })
    }
  },
  methods: {
    /**
     * 显示所有Option组件
     */
    showAll() {
      this.children.forEach(_ => _.$data.isDelete = false)
    },
    /**
     * 切换显示和隐藏选项列表
     */
    toggleCollapse(flag) {
      if (this.disabled) return
      this.isCollapsed = typeof flag === 'boolean' ? flag : !this.isCollapsed
      if (this.isCollapsed) {
        if (currentSelect && currentSelect !== this) {
          currentSelect.$data.isCollapsed = false
        }
        currentSelect = this
        this.showAll()
      }
      this.$emit('on-open-change', this.isCollapsed)
    },
    /**
     * 是否被选中的Option组件
     * @param {Vue.default} vm
     */
    isSelectedChild(vm) {
      return this.multiple ? this.inSelectedItems(vm.value) : this.selectedItem.value === vm.value
    },
    /**
     * 是否在选择的items中
     * @param {String|Number} value
     */
    inSelectedItems(value) {
      return this.selectedItems.some(_ => _.value === value)
    },
    /**
     * 根据值，移除选择的item
     * @param {String|Number} value
     */
    removeSelectedItemByValue(value) {
      let index = this.selectedItems.findIndex(_ => _.value === value)
      this.selectedItems.splice(index, 1)
    },
    /**
     * 移除选择的item
     * @param {Object} item
     */
    removeSelectedItem(item) {
      this.selectedItems.splice(this.selectedItems.indexOf(item), 1)
      this.syncModel()
    },
    /**
     * 添加选择的item
     */
    addSelectedItem(value, label) {
      this.selectedItems.push({ value, label })
    },
    /**
     * 更新选择的值
     * @param {Vue.default} vm
     */
    updateSelectedValue(vm) {
      if (this.multiple) {
        this.filterable && this.$refs.Input.focus()
        this.inSelectedItems(vm.value) ? this.removeSelectedItemByValue(vm.value) : this.addSelectedItem(vm.value, vm.label)
        this.syncModel()
      } else {
        this.isCollapsed = false
        this.selectedItem = { value: vm.value, label: vm.label }
        if (this.filterable) {
          this.searchValue = this.getCheckedTextOfSingle()
        }
      }
    },
    getCheckedTextOfSingle() {
      return (this.selectedItem.label || this.selectedItem.value) + ''
    },
    /**
     * 添加Option组件实例
     * @param {Vue.default} vm
     */
    addChild(vm) {
      this.children.push(vm)
    },
    /**
     * 移除Option组件实例
     * @param {Vue.default} vm
     */
    removeChild(vm) {
      this.children.splice(this.children.indexOf(vm), 1)
    },
    /**
     * 清除选中的值
     */
    clearValue() {
      if (this.multiple) {
        this.selectedItems = []
      } else {
        this.selectedItem = {}
      }
      this.isCollapsed = false
    },
    /**
     * 选择框得到焦点处理
     */
    handleFocus() {
      if (this.filterable) this.$refs.Input.focus()
    },
    /**
     * 选择框键盘按下事件处理
     * @param {KeyboardEvent} event
     */
    handleKeydown(event) {
      const K_UP = 38, K_DOWN = 40, K_ESC = 27, K_ENTER = 13, K_DEL = 46, K_BACKSPACE = 8
      let { keyCode } = event
      if ([K_UP, K_DOWN, K_ESC].indexOf(keyCode) !== -1) {
        event.preventDefault()
      }
      if (keyCode === K_ENTER) {
        this.isCollapsed && this.updateValueByFocusOption()
      } else if (keyCode === K_UP) {
        if (this.isCollapsed) this.setOptionFocus('up')
      } else if (keyCode === K_DOWN) {
        this.isCollapsed ? this.setOptionFocus() : this.toggleCollapse(true)
      } else if (keyCode === K_ESC) {
        this.isCollapsed = false
      } else if (keyCode === K_DEL || keyCode === K_BACKSPACE) {
        if (!(this.multiple && this.filterable) || this.searchValue) return
        this.selectedItems.pop()
      }
    },
    /**
     * 获取得到焦点的Option
     */
    updateValueByFocusOption() {
      let vm =  this.children.find(_ => _.focus)
      if (vm) this.updateSelectedValue(vm)
    },
    /**
     * 设置焦点Option
     * @param {String} dir
     */
    setOptionFocus(dir = 'down') {
      let arr = this.children.filter(_ => !_.isDelete)
      let len = arr.length
      if (!len) return
      let focusIndex = arr.findIndex(_ => _.focus)
      this.children.forEach(_ => _.$data.focus = false)
      if (dir === 'down') {
        if (focusIndex < len - 1) {
          focusIndex++
        } else {
          focusIndex = 0
        }
      } else {
        if (focusIndex <= 0) {
          focusIndex = len - 1
        } else {
          focusIndex--
        }
      }
      let vm = arr[focusIndex]
      vm.$data.focus = true
      vm.$el.scrollIntoViewIfNeeded()
    },
    /**
     * 搜索框失去焦点处理
     * @param {MouseEvent} event
     */
    handleSearchBlur(event) {
      if (!this.filterable || this.multiple) return
      let { relatedTarget } = event
      if (
        relatedTarget && 
        (isSelfOrParent(this.$el, relatedTarget) || 
        isSelfOrParent(this.$refs.UiOptionList.$el, relatedTarget))
      ) return
      this.searchValue = this.getCheckedTextOfSingle()
    },
    /**
     * 更新模型数据
     * @param {String|Number|Array} value
     */
    updateModel(value) {
      if (this.multiple) {
        this.selectedItems = value.map(_ => ({ value: _, label: this.getLabelByValue(_) }))
      } else {
        this.selectedItem = { value, label: this.getLabelByValue(value) }
      }
    },
    /**
     * 向父组件同步模型数据
     */
    syncModel() {
      let value = this.multiple ? this.selectedItems.map(_ => _.value) : this.selectedItem.value
      this.$emit('input', value)
      this.$emit('on-change', value)
    },
    /**
     * 通过值获取标签
     * @param {String|Number} value
     */
    getLabelByValue(value) {
      let vm = this.children.find(_ => _.value === value)
      return vm && vm.label
    }
  },
  mounted() {
    this.updateModel(this.value)
  }
}
</script>
<style lang="less">
.ui-select {
  display: inline-block;
  width: 100%;
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
  &:focus:not(.disabled), &:hover:not(.disabled), &.isCollapsed {
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
  &.placeholder {
    cursor: pointer;
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
</style>