<template>
  <div>
    <div class="page-title">Transfer 穿梭框</div>
    <p>双栏穿梭选择框，常用于将多个项目从一边移动到另一边。</p>
    <div class="page-sub-title">Transfer 组件主要基于以下四个 API 来使用:</div>
    <ul class="list">
      <li>
        <p>:data：总体数据，数组，每项为一个对象，且必须含有 key 值，组件基于此做索引。</p>
      </li>
      <li>
        <p>:target-keys：目标列索引集合，数组，每项为数据的 key 值，Transfer 会将含有这些 key 值的数据筛选到右边。</p>
      </li>
      <li>
        <p>:render-format：每行数据显示的格式函数，默认优先显示 label 值，没有时显示 key 值，可以自己组合出需要的数据格式。</p>
      </li>
      <li>
        <p>@on-change：当点击转移按钮时，组件本身并不会转移数据，而是触发事件，由用户来操作数据。</p>
      </li>
    </ul>

    <div
      class="page-sub-title"
    >基本用法，展示了 data、target-keys、每行的渲染函数 render-format 以及回调函数 on-change 的用法。</div>
    <Transfer
      :data="data1"
      :target-keys="targetKeys1"
      :render-format="render1"
      @on-change="handleChange1"
      @on-selected-change="handleSelectedChange"
    ></Transfer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data1: this.getMockData(),
      targetKeys1: this.getTargetKeys()
    };
  },
  methods: {
    getMockData() {
      let mockData = [];
      for (let i = 1; i <= 20; i++) {
        mockData.push({
          key: i.toString(),
          label: "Content " + i,
          description: "The desc of content  " + i,
          disabled: Math.random() * 3 < 1
        });
      }
      return mockData;
    },
    getTargetKeys() {
      return this.getMockData()
        .filter(() => Math.random() * 2 > 1)
        .map(item => item.key);
    },
    render1(item) {
      return item.label;
    },
    handleChange1(newTargetKeys, direction, moveKeys) {
      console.log(newTargetKeys);
      console.log(direction);
      console.log(moveKeys);
      this.targetKeys1 = newTargetKeys;
    },
    handleSelectedChange(a, b) {
      console.log(a, b)
    }
  }
};
</script>
<style lang="less" scoped>
.list {
  padding-left: 30px;
  line-height: 2.2;
}
</style>