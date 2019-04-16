<template>
  <div class="ui-table-wrapper" :class="[{stripe, border}]">
    <div class="ui-table">
      <UiTableHeader :columns="columns"/>
      <UiTableBody :data="data" :columns="columns" :rowClassName="rowClassName" :style="bodyStyle"/>
    </div>
  </div>
</template>
<script>
import UiTableHeader from './TableHeader'
import UiTableBody from './TableBody'
export default {
  components: { UiTableHeader, UiTableBody },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    stripe: Boolean,
    border: Boolean,
    showHeader: {
      type: Boolean,
      default: true
    },
    width: {
      type: [Number, String],
      default: 'auto'
    },
    height: [Number, String],
    loading: Boolean,
    disabledHover: Boolean,
    highlightRow: Boolean,
    rowClassName: Function,
    size: {
      validator(value) {
        return ['large', 'small', 'default'].indexOf(value) !== -1
      }
    },
    noDataText: {
      type: String,
      default: '暂无数据'
    },
    noFilteredDataText: {
      type: String,
      default: '暂无筛选结果'
    }
  },
  computed: {
    bodyStyle() {
      let height = this.height && (isNaN(this.height) ? this.height : `${this.height}px`)
      return height ? { overflowY: 'scroll', height } : {}
    }
  }
}
</script>
<style lang="less">
.ui-table-wrapper {
  max-width: 100%;
  border: 1px solid @divider-color;
  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
  }
  th, td {
    min-width: 0;
    text-align: left;
    text-overflow: ellipsis;
    vertical-align: middle;
    border-bottom: 1px solid @divider-color;
  }
  th {
    height: 40px;
    white-space: nowrap;
    overflow: hidden;
    background-color: @bg-color;
  }
  td {
    height: 48px;
    transition: background-color .2s ease-in-out;
  }
  &.stripe {
    tbody tr:nth-child(even) {
      background-color: @bg-color;
    }
  }
  &.border {
    th + th, td + td {
      border-left: 1px solid @divider-color;
    }
  }
  tbody tr {
    &:last-child td {
      border-bottom: none;
    }
    &:hover:not(.hasCustomClsName) td:not(.hasCustomClsName) {
      background-color: lighten(@primary-color, 40%);
    }
  }
}

.ui-table {
  margin-right: -1px;
}

.ui-table-body {
  overflow: hidden;
}

.ui-table-cell {
  padding: 0 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ui-table-header {
  overflow: hidden;
}
</style>