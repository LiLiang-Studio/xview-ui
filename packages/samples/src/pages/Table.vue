<template>
  <div>
    <div class="page-title">Table 表格</div>
    <p>
      主要用于展示大量结构化数据。
      支持排序、筛选、分页、自定义操作、导出 csv 等复杂功能。
    </p>

    <div class="page-sub-title">表格的最简单用法。</div>
    <Table :columns="columns1" :data="data1"></Table>

    <div class="page-sub-title">设置属性 stripe ，表格会间隔显示不同颜色，用于区分不同行数据。</div>
    <Table stripe :columns="columns1" :data="data1"></Table>

    <div class="page-sub-title">添加表格的边框线</div>
    <Table border :columns="columns1" :data="data1"></Table>

    <div class="page-sub-title">特定样式</div>
    <p>
      <b>行：</b>通过属性 row-class-name 可以给某一行指定一个样式名称。
    </p>
    <p>
      <b>列：</b>通过给列 columns 设置字段 className 可以给某一列指定一个样式
    </p>
    <p>
      <b>单元格：</b>通过给数据 data 设置字段 cellClassName 可以给任意一个单元格指定样式。
    </p>
    <p>Custom row styles:</p>
    <Table :row-class-name="rowClassName" :columns="columns1" :data="data1"></Table>
    <p>Custom column styles:</p>
    <Table :columns="columns9" :data="data1"></Table>
    <p>Custom arbitrary cell styles:</p>
    <Table :columns="columns1" :data="data8"></Table>

    <div class="page-sub-title">通过设置属性 height 给表格指定高度后，会自动固定表头。当纵向内容过多时可以使用。</div>
    <Table height="200" :columns="columns1" :data="data2"></Table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns1: [
        {
          title: "Name",
          key: "name"
        },
        {
          title: "Age",
          key: "age"
        },
        {
          title: "Address",
          key: "address"
        }
      ],
      data1: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        }
      ],
      columns9: [
        {
          title: "Name",
          key: "name"
        },
        {
          title: "Age",
          key: "age",
          className: "demo-table-info-column"
        },
        {
          title: "Address",
          key: "address"
        }
      ],
      data8: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park"
        },
        {
          name: "Jim Green",
          age: 25,
          address: "London No. 1 Lake Park",
          cellClassName: {
            age: "demo-table-info-cell-age",
            address: "demo-table-info-cell-address"
          }
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          cellClassName: {
            name: "demo-table-info-cell-name"
          }
        }
      ],
      data2: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        },
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        }
      ]
    };
  },
  methods: {
    rowClassName(row, index) {
      if (index === 1) {
        return "demo-table-info-row";
      } else if (index === 3) {
        return "demo-table-error-row";
      }
      return "";
    }
  }
};
</script>
<style lang="less">
.ui-table .demo-table-info-row td {
  background-color: #2db7f5;
  color: #fff;
}
.ui-table .demo-table-error-row td {
  background-color: #ff6600;
  color: #fff;
}
.ui-table td.demo-table-info-column {
  background-color: #2db7f5;
  color: #fff;
}
.ui-table .demo-table-info-cell-name {
  background-color: #2db7f5;
  color: #fff;
}
.ui-table .demo-table-info-cell-age {
  background-color: #ff6600;
  color: #fff;
}
.ui-table .demo-table-info-cell-address {
  background-color: #187;
  color: #fff;
}
</style>