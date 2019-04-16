<template>
  <div class="ui-table-body">
    <table>
      <tbody>
        <tr v-for="(row, index) in data" :key="index" :class="setRowClassName(row, index)">
          <td v-for="col in columns" :key="col.key" :class="setColClassName(row, col)">
            <div class="ui-table-cell">{{row[col.key]}}</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    data: Array,
    columns: Array,
    rowClassName: Function
  },
  methods: {
    setRowClassName(row, index) {
      let customClsName = this.rowClassName && this.rowClassName(row, index)
      return [customClsName, { hasCustomClsName: customClsName }]
    },
    setColClassName(row, col) {
      let cellClsName = (row.cellClassName || {})[col.key]
      return [col.className, cellClsName, { hasCustomClsName: cellClsName || col.className }]
    }
  }
}
</script>