<template>
  <div>
    <div class="page-title">DatePicker 日期选择器</div>
    <p>选择或输入日期，支持年、月、日期等类型，支持选择范围</p>

    <div class="page-sub-title">设置属性 type 为 date 或 daterange 分别显示选择单日和选择范围类型。</div>
    <Row>
      <Col span="12">
        <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker>
      </Col>
      <Col span="12">
        <DatePicker
          type="daterange"
          placement="bottom-end"
          placeholder="Select date"
          style="width: 200px"
        ></DatePicker>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less">
</style>