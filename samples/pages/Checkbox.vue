<template>
  <div class="page-checkbox">
    <div class="page-title">Checkbox 组件</div>
    <div class="page-sub-title">单独使用 使用 v-model 可以双向绑定数据。</div>
    <Checkbox v-model="single" size="large">Checkbox</Checkbox>
    <p>{{single}}</p>

    <div class="page-sub-title">true-value 和 false-value的使用</div>
    <Checkbox v-model="checkedValue" true-value="真的" false-value="假的">{{checkedValue}}</Checkbox>

    <div class="page-sub-title">
      使用CheckboxGroup配合数组来生成组合。
      在组合使用时，Checkbox 使用 label 来自动判断选中状态。
      每个 Checkbox 的内容可以自定义，如不填写则默认使用 label 的值。。
    </div>
    <CheckboxGroup v-model="fruit">
      <Checkbox label="香蕉"></Checkbox>
      <Checkbox disabled label="苹果"></Checkbox>
      <Checkbox label="西瓜"></Checkbox>
      <Checkbox label="西红柿"></Checkbox>
    </CheckboxGroup>
    <p>{{fruit}}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      single: false,
      fruit: ['苹果'],
      checkedValue: '真的'
    }
  }
}
</script>