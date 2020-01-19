<template>
  <div :is="root.name" v-bind="root.attrs" :class="[prefix, {disabled, selected}]" v-on="listeners">
    <div>
      <p :class="`${prefix}-title`">
        <slot>{{title}}</slot>
        <slot name="icon"></slot>
      </p>
      <p :class="`${prefix}-label`"><slot name="label">{{label}}</slot></p>
    </div>
    <div>
      <slot name="extra">{{extra}}</slot>
      <template v-if="to">
        <slot name="arrow">
          <UiIcon type="ios-arrow-forward"/>
        </slot>
      </template>
    </div>
  </div>
</template>
<script>
import UiIcon from '../icon'
import { findParent } from '../../tools'
export default {
  name: 'UiCell',
  components: { UiIcon },
  data() {
    return { prefix: 'ui-cell' }
  },
  props: {
    name: [String, Number],
    title: String,
    label: String,
    extra: String,
    disabled: Boolean,
    selected: Boolean,
    to: [String, Object],
    replace: Boolean,
    target: String,
    append: Boolean
  },
  computed: {
    root() {
      if (this.to) {
        if (!this.target && this.$router) {
          return { name: 'RouterLink', attrs: { to: this.to, replace: this.replace, append: this.append } }
        }
        return { name: 'a', attrs: { target: this.target, href: this.to } }
      }
      return { name: 'div', attrs: {} }
    },
    listeners() {
      const that = this
      return Object.assign({}, this.$listeners, {
        click(event) {
          that.$emit('click', event)
          let parent = findParent(that, 'UiCellGroup')
          parent && parent.$emit('on-click', that.name)
        }
      })
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.ui-cell {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  min-height: 38px;
  padding: 7px 16px;
  transition: all .2s ease-in-out;
  &, &:hover {
    color: @content-color;
  }
  &:not(.disabled):not(.selected):hover {
    background-color: @disabled-bg-color;
  }
  &.selected {
    color: @primary-color;
    background-color: lighten(@primary-color, 40%);
  }
  &.disabled {
    cursor: not-allowed;
    color: @disabled-color;
  }
  &-title {
    font-size: 14px;
  }
  &-label {
    color: @sub-color;
  }
}
</style>