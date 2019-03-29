<template>
  <div class="ui-tabs" :class="[size, type]">
    <div class="ui-tabs-bar">
      <ul class="ui-tabs-nav">
        <li class="ui-tabs-nav-item"
          v-for="item in tabPanes"
          :key="item.key"
          :class="{active: item.key === activeTab, disabled: item.disabled}"
          @click="handleNavItemClick(item)">
          <UiIcon v-if="item.icon" class="ui-tabs-icon" :type="item.icon"/>
          <template v-if="isRenderFunc(item.label)" functional :render="item.label"></template>
          <RenderCell v-if="isRenderFunc(item.label)" :render="item.label"/>
          <template v-else>{{item.label}}</template>
          <UiCloseIconButton class="ui-tabs-close" v-if="canClose(item)" @click.native.stop="deleteItem(item)"/>
        </li>
      </ul>
      <div class="ui-tabs-extra"><slot name="extra"></slot></div>
    </div>
    <div class="ui-tabs-content" :class="{animated}" :style="contentStyle">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import UiIcon from './../Icon'
import UiCloseIconButton from './../CloseIconButton'
import { RenderCell } from './../../utils'
export default {
  name: 'ui-tabs',
  components: { UiIcon, UiCloseIconButton, RenderCell },
  data() {
    return {
      tabPanes: [],
      activeTab: this.value
    }
  },
  props: {
    value: String,
    type: {
      default: 'line',
      validator(value) {
        return ['line', 'card'].indexOf(value) !== -1
      }
    },
    size: {
      validator(value) {
        return ['default', 'small'].indexOf(value) !== -1
      }
    },
    closable: Boolean,
    animated: {
      type: Boolean,
      default: true
    },
    captureFocus: Boolean
  },
  computed: {
    contentStyle() {
      let len = this.tabPanes.length, styles = { width: `${len * 100}%` }
      let index = this.tabPanes.findIndex(_ => _.key === this.activeTab)
      return index === -1 ? styles : { ...styles, transform: `translateX(${-index / len * 100}%)` }
    }
  },
  watch: {
    value(newVal) {
      this.activeTab = newVal
    },
    tabPanes(newVal) {
      if ((this.activeTab === undefined || newVal.every(_ => _.key !== this.activeTab)) && newVal.length) {
        this.activeTab = newVal[0].key
      }
    }
  },
  methods: {
    addPane(vm) {
      this.tabPanes.push(vm)
      if (vm.key === undefined) vm.key = this.tabPanes.length - 1
    },
    removePane(vm) {
      this.tabPanes.splice(this.tabPanes.indexOf(vm), 1)
    },
    handleNavItemClick(item) {
      this.activeTab = item.key
      this.$emit('input', this.activeTab)
    },
    deleteItem(item) {
      this.$emit('on-tab-remove', item.key)
    },
    isRenderFunc(label) {
      return typeof label === 'function'
    },
    canClose(item) {
      return item.closable === false ? false : this.closable && this.type === 'card'
    }
  }
}
</script>
<style lang="less">
.ui-tabs {
  position: relative;
  overflow: hidden;
  &.line.small {
    .ui-tabs-nav {
      font-size: 12px;
    }
  }
  &.card {
    .ui-tabs-nav-item {
      background-color: @bg-color;
      border: 1px solid @border-color;
      border-radius: 4px 4px 0 0;
      + .ui-tabs-nav-item {
        margin-left: 4px;
      }
      &.active {
        background-color: #fff;
        border-bottom-color: transparent;
      }
    }
  }
}

.ui-tabs-bar {
  position: relative;
  margin-bottom: 16px;
  border-bottom: 1px solid @border-color;
}

.ui-tabs-nav {
  display: inline-block;
  font-size: 14px;
  list-style: none;
  position: relative;
  bottom: -1px;
}

.ui-tabs-nav-item {
  display: inline-block;
  padding: 7px 16px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: color .3s ease-in-out;
  + .ui-tabs-nav-item {
    margin-left: 16px;
  }
  &:hover, &.active {
    color: @primary-color;
  }
  &.active {
    border-bottom-color: @primary-color;
  }
  &.disabled {
    pointer-events: none;
    color: #ccc;
  }
  &.active, &:hover {
    .ui-tabs-close {
      width: 14px;
    }
  }
}

.ui-tabs-icon {
  margin-right: 8px;
}

.ui-tabs-close {
  width: 0;
  height: 22px;
  overflow: hidden;
  text-align: right;
  vertical-align: middle;
  position: relative;
  top: -1px;
  transition: width .3s;
}

.ui-tabs-content {
  overflow: hidden;
  &.animated {
    transition: transform .3s ease-in-out;
  }
}

.ui-tabs-extra {
  float: right;
  margin-left: 5px;
}

.ui-tab-pane {
  float: left;
}
</style>