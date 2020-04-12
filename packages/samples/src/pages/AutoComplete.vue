<template>
  <div>
    <div class="page-title">AutoComplete 自动完成</div>
    <p>输入框自动完成功能。</p>

    <div class="page-sub-title">基础用法</div>
    <p>基本用法，通过 data 设置自动完成的数据源。</p><br>
    <AutoComplete
      v-model="value1"
      :data="data1"
      @on-search="handleSearch1"
      placeholder="input here"
      style="width:200px"
    ></AutoComplete>

    <div class="page-sub-title">自定义选项</div>
    <p>除了使用 data，还可以直接传入 Option 组件作为 slot 使用，这样可以自定义显示效果。</p><br>
    <AutoComplete
      v-model="value2"
      @on-search="handleSearch2"
      placeholder="input here"
      style="width:200px"
    >
      <Option v-for="item in data2" :value="item" :key="item">{{ item }}</Option>
    </AutoComplete>

    <div class="page-sub-title">不区分大小写</div>
    <p>不区分大小写的 AutoComplete，及过滤的用法。</p><br>
    <AutoComplete
      v-model="value3"
      :data="data3"
      :filter-method="filterMethod"
      placeholder="input here"
      style="width:200px"
    ></AutoComplete>

    <div class="page-sub-title">查询模式</div>
    <p>完全自定义 Option，显示复杂的布局。</p><br>
    <AutoComplete v-model="value4" icon="ios-search" placeholder="input here" style="width:300px">
      <div class="demo-auto-complete-item" v-for="item in data4" :key="item.title">
        <div class="demo-auto-complete-group">
          <span>{{ item.title }}</span>
          <a href="https://www.google.com/search?q=iView" target="_blank">更多</a>
        </div>
        <Option v-for="option in item.children" :value="option.title" :key="option.title">
          <span class="demo-auto-complete-title">{{ option.title }}</span>
          <span class="demo-auto-complete-count">{{ option.count }} 人关注</span>
        </Option>
      </div>
      <a
        href="https://www.google.com/search?q=iView"
        target="_blank"
        class="demo-auto-complete-more"
      >查看所有结果</a>
    </AutoComplete>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value1: "",
      data1: [],
      value2: "",
      data2: [],
      value3: "",
      data3: ["Steve Jobs", "Stephen Gary Wozniak", "Jonathan Paul Ive"],
      value4: "",
      data4: [
        {
          title: "话题",
          children: [
            {
              title: "iView",
              count: 10000
            },
            {
              title: "iView UI",
              count: 10600
            }
          ]
        },
        {
          title: "问题",
          children: [
            {
              title: "iView UI 有多好",
              count: 60100
            },
            {
              title: "iView 是啥",
              count: 30010
            }
          ]
        },
        {
          title: "文章",
          children: [
            {
              title: "iView 是一个设计语言",
              count: 100000
            }
          ]
        }
      ]
    };
  },
  methods: {
    handleSearch1(value) {
      this.data1 = !value ? [] : [value, value + value, value + value + value];
    },
    handleSearch2(value) {
      this.data2 =
        !value || value.indexOf("@") >= 0
          ? []
          : [value + "@qq.com", value + "@sina.com", value + "@163.com"];
    },
    filterMethod(value, option) {
      return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
    }
  }
};
</script>
<style>
.demo-auto-complete-item {
  padding: 4px 0;
  border-bottom: 1px solid #f6f6f6;
}
.demo-auto-complete-group {
  font-size: 12px;
  padding: 4px 6px;
}
.demo-auto-complete-group span {
  color: #666;
  font-weight: bold;
}
.demo-auto-complete-group a {
  float: right;
}
.demo-auto-complete-count {
  float: right;
  color: #999;
}
.demo-auto-complete-more {
  display: block;
  margin: 0 auto;
  padding: 4px;
  text-align: center;
  font-size: 12px;
}
</style>