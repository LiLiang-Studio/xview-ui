<template>
  <div :class="classes">
    <div v-if="hasHeader" :class="[`${prefix}_box`, `${prefix}_header`]">
      <slot name="header">{{header}}</slot>
    </div>
    <ul><slot></slot></ul>
    <div v-if="hasFooter" :class="[`${prefix}_box`, `${prefix}_footer`]">
      <slot name="footer">{{footer}}</slot>
    </div>
  </div>
</template>
<script>
const S = String, B = Boolean
export default {
  name: 'XList',
  props: {
    border: B,
    itemLayout: {
      validator(v) {
        return ['horizontal', 'vertical'].indexOf(v) !== -1
      }
    },
    header: S,
    footer: S,
    loading: B,
    size: {
      validator(v) {
        return ['small', 'large', 'default'].indexOf(v) !== -1
      }
    },
    split: {
      type: B,
      default: true
    }
  },
  data() {
    return { prefix: 'x-list', hasHeader: false, hasFooter: false }
  },
  computed: {
    classes() {
      let { prefix, border, split } = this
      return [prefix, `${prefix}_${this.itemLayout}`, `${prefix}_${this.size}`, { border, split }]
    }
  },
  mounted() {
    this.hasHeader = this.header || this.$slots.header
    this.hasFooter = this.footer || this.$slots.footer
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
@list: .x-list;
@{list} {
  li {
    list-style: none;
  }
  &_box {
    padding: 12px 0;
  }
  &.border {
    border-radius: 6px;
    border: 1px solid @border-color;
    @{list}_box {
      padding: 12px 24px;
    }
  }
  &_small {
    @{list}_box {
      padding: 8px 0;
    }
    &.border @{list}_box {
      padding: 8px 12px;
    }
  }
  &_large {
    @{list}_box {
      padding: 16px 0;
    }
    &.border @{list}_box {
      padding: 16px 24px;
    }
  }
  &.split {
    @{list}-item {
      border-bottom: 1px solid @border-color;
      &:last-child {
        border-bottom: none;
      }
    }
    @{list}_header {
      border-bottom: 1px solid @border-color;
    }
    @{list}_footer {
      border-top: 1px solid @border-color;
    }
  }
  &_vertical {
    align-items: flex-start;
    @{list}-item {
      &-meta {
        margin-bottom: 16px;
      }
      &_action {
        margin-top: 16px;
        > li {
          padding: 0 16px;
        }
      }
    }
  }
  &-item {
    display: flex;
    align-items: center;
    padding: 12px 0;
    &_box {
      flex: 1;
      + @{list}-item {
        &_action, &_extra {
          margin-left: 40px;
        }
      }
    }
    &_action {
      > li {
        cursor: pointer;
        position: relative;
        display: inline-block;
        padding: 0 8px;
        line-height: 1;
        color: rgba(0,0,0,.45);
        + li {
          border-left: 1px solid @border-color;
        }
      }
    }
    &-meta {
      display: flex;
      &_avatar {
        margin-right: 16px;
      }
      &_title {
        line-height: 1.5;
        margin-bottom: 6px;
        color: rgba(0, 0, 0, .85);
      }
      &_desc {
        color: rgba(0, 0, 0, .45);
      }
    }
  }
}
</style>