<template>
  <div>
    <div class="page-title">Select 选择器</div>
    <p>使用模拟的增强下拉选择器来代替浏览器原生的选择器。选择器支持单选、多选、搜索，以及键盘快捷操作。</p>

    <div class="page-sub-title">
      基本用法。可以使用 v-model 双向绑定数据。
      <br>单选时，value 只接受字符串和数字类型，多选时，只接受数组类型，组件会自动根据Option的value来返回选中的数据。
      <br>可以给Select添加 style 样式，比如宽度。
      <!-- <br>在展开选择器后，可以使用键盘的up和down快速上下选择，按下Enter选择，按下Esc收起选择器。 -->
    </div>
    <Select v-model="model1" style="width:200px">
      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>

    <div class="page-sub-title">通过设置size属性为large和small将输入框设置为大和小尺寸，不设置为默认（中）尺寸。</div>
    <Select v-model="model2" size="small" style="width:100px">
      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
    <Select v-model="model3" style="width:100px;margin-left:10px;">
      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
    <Select v-model="model4" size="large" style="width:100px;margin-left:10px;">
      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>

    <div class="page-sub-title">通过给Select设置属性disabled禁用整个选择器。通过给Option设置属性disabled可以禁用当前项。</div>
    <Select v-model="model5" disabled style="width:200px">
      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
    <Select v-model="model6" style="width:200px;margin-left:10px;">
      <Option value="beijing">New York</Option>
      <Option value="shanghai" disabled>London</Option>
      <Option value="shenzhen">Sydney</Option>
    </Select>

    <div class="page-sub-title">通过设置属性clearable可以清空已选项，仅适用于单选模式。</div>
    <Select v-model="model8" clearable style="width:200px">
      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>

    <div class="page-sub-title">使用OptionGroup可将选项进行分组。</div>
    <Select v-model="model7" style="width:200px">
      <OptionGroup label="Hot Cities">
        <Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </OptionGroup>
      <OptionGroup label="Other Cities">
        <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </OptionGroup>
    </Select>

    <div class="page-sub-title">自定义模板</div>
    <p>
      对选项内容可以进行自定义。注意在Option中使用label属性，可以让选择器优先读取该属性的值以显示，
      否则选中时显示的内容会和自定义的一样，这往往不是我们想要的。
    </p>
    <p>对于选项显示内容的逻辑：优先显示 slot 内容，如果没有定义 slot，则显示label的值，如果没有设置 label，则显示value的值。</p>
    <br>
    <Select v-model="model9" style="width:200px">
      <Option value="New York" label="New York">
        <span>New York</span>
        <span style="float:right;color:#ccc">America</span>
      </Option>
      <Option value="London" label="London">
        <span>London</span>
        <span style="float:right;color:#ccc">U.K.</span>
      </Option>
      <Option value="Sydney" label="Sydney">
        <span>Sydney</span>
        <span style="float:right;color:#ccc">Australian</span>
      </Option>
    </Select>
    <div style="padding:100px;"></div>

    <!-- <div class="page-sub-title">通过设置属性multiple可以开启多选模式。多选模式下，model 接受数组类型的数据，所返回的也是数组。</div> -->
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
      model1: "London",
      model2: "",
      model3: "",
      model4: "",
      model5: "",
      model6: "",
      model8: "",
      cityList1: [
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
        }
      ],
      cityList2: [
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
      model7: "",
      model9: ""
    };
  }
};
</script>
<style lang="less">
</style>