<template>
  <div>
    <div class="page-title">InputNumber 数字输入框</div>
    <p>使用鼠标或键盘输入一定范围的标准数值。</p>

    <div class="page-sub-title">可以通过输入、鼠标点击或键盘的上下键来改变数值大小。</div>
    <InputNumber :max="10" :min="1" v-model="value1"></InputNumber>

    <div class="page-sub-title">可以通过输入、鼠标点击或键盘的上下键来改变数值大小。</div>
    <InputNumber :max="10" :min="1" :step="1.2" v-model="value2"></InputNumber>

    <!-- <div class="page-sub-title">通过 formatter 格式化数字，以展示具有具体含义的数据，往往需要配合 parser 一起使用。</div>
    <InputNumber
      :max="10000"
      v-model="value9"
      :formatter="value => `$ ${value}`.replace(/B(?=(d{3})+(?!d))/g, ',')"
      :parser="value => value.replace(/$s?|(,*)/g, '')"
    ></InputNumber>
    <InputNumber
      style="margin-left:12px;"
      :max="100"
      v-model="value10"
      :formatter="value => `${value}%`"
      :parser="value => value.replace('%', '')"
    ></InputNumber> -->

    <div class="page-sub-title">通过设置size属性为large和small将输入框设置为大和小尺寸，不设置为默认（中）尺寸。</div>
    <InputNumber v-model="value3" size="small"></InputNumber>
    <InputNumber v-model="value4" style="margin-left:12px;"></InputNumber>
    <InputNumber v-model="value5" size="large" style="margin-left:12px;"></InputNumber>

    <div class="page-sub-title">通过设置disabled属性禁用输入框，点击按钮切换状态。</div>
    <InputNumber v-model="value6" :disabled="disabled"></InputNumber>
    <Button style="margin-left:12px;" type="primary" @click="disabled = !disabled">Toggle Disabled</Button>

    <div class="page-sub-title">通过设置readonly属性开启只读。</div>
    <InputNumber v-model="value7" readonly></InputNumber>

    <div class="page-sub-title">通过设置editable属性控制是否能编辑。</div>
    <InputNumber v-model="value8" :editable="false"></InputNumber>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value1: 1,
      value2: 1,
      value9: 1000,
      value10: 100,
      value3: 2,
      value4: 2,
      value5: 2,
      disabled: true,
      value6: 1,
      value7: 1,
      value8: 1
    };
  }
};
</script>
<style lang="less">
</style>