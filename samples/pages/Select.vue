<template>
  <div>
    <div class="page-title">Select 选择器</div>
    <p>使用模拟的增强下拉选择器来代替浏览器原生的选择器。选择器支持单选、多选、搜索，以及键盘快捷操作。</p>

    <div class="page-sub-title">
      基本用法。可以使用 v-model 双向绑定数据。
      <br>单选时，value 只接受字符串和数字类型，多选时，只接受数组类型，组件会自动根据Option的value来返回选中的数据。
      <br>可以给Select添加 style 样式，比如宽度。
      <br>在展开选择器后，可以使用键盘的up和down快速上下选择，按下Enter选择，按下Esc收起选择器。
    </div>
    <Select v-model="model1" style="width:200px">
      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cityList: [
        {
          value: "New York",
          label: "New York"
        },
        {
          value: "London",
          label: "London"
        },
        {
          value: "Sydney",
          label: "Sydney"
        },
        {
          value: "Ottawa",
          label: "Ottawa"
        },
        {
          value: "Paris",
          label: "Paris"
        },
        {
          value: "Canberra",
          label: "Canberra"
        }
      ],
      model1: ""
    };
  }
};
</script>
<style lang="less">
</style>