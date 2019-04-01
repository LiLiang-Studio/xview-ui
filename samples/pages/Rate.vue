<template>
  <div>
    <div class="page-title">Rate 评分</div>
    <p>对事物进行快速的评级操作，或对评价进行展示。</p>

    <div class="page-sub-title">基本用法。</div>
    <Rate v-model="value"></Rate>

    <div class="page-sub-title">设置属性 allow-half 可以选中半星。</div>
    <Rate allow-half v-model="valueHalf"></Rate>

    <div class="page-sub-title">设置属性 show-text 可以显示提示文字。提示内容也可以通过 slot 自定义。</div>
    <Row>
      <Col span="12">
        <Rate show-text v-model="valueText"></Rate>
      </Col>
      <Col span="12">
        <Rate show-text allow-half v-model="valueCustomText">
          <span style="color: #f5a623">{{ valueCustomText }}</span>
        </Rate>
      </Col>
    </Row>

    <div class="page-sub-title">设置属性 disabled 开启只读模式，无法交互。</div>
    <Rate disabled v-model="valueDisabled"></Rate>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: 0,
      valueHalf: 2.5,
      valueText: 3,
      valueCustomText: 3.8,
      valueDisabled: 2
    };
  }
};
</script>