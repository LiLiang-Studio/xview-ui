<template>
  <div class="ui-table-header">
    <table>
      <colgroup>
        <col v-for="item in columns" :key="item.key">
      </colgroup>
      <thead>
        <tr>
          <th v-for="item in columns" :key="item.key">
            <div class="ui-table-cell">{{item.title}}</div>
          </th>
        </tr>
      </thead>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    columns: Array
  }
}
</script>