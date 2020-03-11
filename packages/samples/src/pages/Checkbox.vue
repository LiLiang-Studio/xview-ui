<template>
  <div class="page-checkbox">
    <div class="page-title">Checkbox 组件</div>
    <p>基本组件-多选框。主要用于一组可选项多项选择，或者单独用于标记切换某种状态。</p><br>

    <div class="page-sub-title">单独使用</div>
    <p>使用 v-model 可以双向绑定数据。</p><br>
    <Checkbox v-model="single">Checkbox</Checkbox><br><br>
    <Checkbox v-model="single"></Checkbox><br><br>

    <p>true-value 和 false-value的使用</p><br>
    <Checkbox v-model="checkedValue" true-value="真的" false-value="假的">{{checkedValue}}</Checkbox>

    <div class="page-sub-title">组合使用</div>
    <p>使用CheckboxGroup配合数组来生成组合。在组合使用时，Checkbox 使用 label 来自动判断选中状态。
      每个 Checkbox 的内容可以自定义，如不填写则默认使用 label 的值。</p><br>
    <CheckboxGroup v-model="fruit">
      <Checkbox label="香蕉"></Checkbox>
      <Checkbox disabled label="苹果"></Checkbox>
      <Checkbox label="西瓜"></Checkbox>
      <Checkbox label="西红柿"></Checkbox>
    </CheckboxGroup><br>
    <p>{{fruit}}</p><br>

    <div class="page-sub-title">不可用</div>
    <p>通过设置disabled属性来禁用多选框。</p><br>
    <Checkbox v-model="disabledSingle" disabled>Checkbox</Checkbox>
    <CheckboxGroup v-model="disabledGroup">
        <Checkbox label="香蕉" disabled></Checkbox>
        <Checkbox label="苹果" disabled></Checkbox>
        <Checkbox label="西瓜"></Checkbox>
    </CheckboxGroup>

    <div class="page-sub-title">显示边框</div>
    <p>设置属性 border 可以显示边框。</p><br>
    <CheckboxGroup v-model="border">
        <Checkbox label="香蕉" border></Checkbox>
        <Checkbox label="苹果" border></Checkbox>
        <Checkbox label="西瓜" border></Checkbox>
    </CheckboxGroup>
    
    <div class="page-sub-title">尺寸</div>
    <p>属性 size 可以设置尺寸。</p><br>
    <CheckboxGroup v-model="border">
        <Checkbox size="small" label="香蕉" border></Checkbox>
        <Checkbox label="苹果" border></Checkbox>
        <Checkbox size="large" label="西瓜" border></Checkbox>
    </CheckboxGroup><br>
    <CheckboxGroup size="large" v-model="border">
        <Checkbox label="香蕉" border></Checkbox>
        <Checkbox label="苹果" border></Checkbox>
        <Checkbox label="西瓜" border></Checkbox>
    </CheckboxGroup><br>
    <CheckboxGroup size="small" v-model="border">
        <Checkbox label="香蕉"></Checkbox>
        <Checkbox label="苹果"></Checkbox>
        <Checkbox label="西瓜"></Checkbox>
    </CheckboxGroup>
    <br>
    <div>
      <Checkbox v-model="single" size="small">small</Checkbox>
      <Checkbox v-model="single">default</Checkbox>
      <Checkbox v-model="single" size="large">large</Checkbox>
    </div><br><br>

    <div class="page-sub-title">与其它组件通信</div>
    <p>与其它组件进行数据联动。</p><br>
    <Checkbox v-model="checked" :disabled="disabled">
      <span v-if="checked">Checked</span>
      <span v-else>Unchecked</span>
      -
      <span v-if="!disabled">Usable</span>
      <span v-else>Disabled</span>
    </Checkbox>
    <br><br>
    <Button type="primary" @click="checked = !checked">
      <span v-if="!checked">Checked</span>
      <span v-else>Unchecked</span>
    </Button>
    <Button type="primary" @click="disabled = !disabled">
      <span v-if="disabled">Usable</span>
      <span v-else>Disabled</span>
    </Button>

    <div class="page-sub-title">全选</div>
    <p>在实现全选效果时，你可能会用到 indeterminate 属性。示例代码只是一种写法，业务中可以用更多的方法，比如计算属性。</p><br>
    <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
      <Checkbox
        :indeterminate="indeterminate"
        :value="checkAll"
        @click.prevent.native="handleCheckAll"
      >全选</Checkbox>
    </div>
    <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
      <Checkbox label="香蕉"></Checkbox>
      <Checkbox label="苹果"></Checkbox>
      <Checkbox label="西瓜"></Checkbox>
    </CheckboxGroup>
    <p style="margin-top:200px;"></p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      single: false,
      fruit: ["苹果"],
      checkedValue: "真的",
      checked: true,
      disabled: false,
      indeterminate: true,
      checkAll: false,
      checkAllGroup: ["香蕉", "西瓜"],
      disabledSingle: true,
      disabledGroup: ['苹果'],
      border: ['香蕉']
    };
  },
  methods: {
    handleCheckAll() {
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;

      if (this.checkAll) {
        this.checkAllGroup = ["香蕉", "苹果", "西瓜"];
      } else {
        this.checkAllGroup = [];
      }
    },
    checkAllGroupChange(data) {
      if (data.length === 3) {
        this.indeterminate = false;
        this.checkAll = true;
      } else if (data.length > 0) {
        this.indeterminate = true;
        this.checkAll = false;
      } else {
        this.indeterminate = false;
        this.checkAll = false;
      }
    }
  }
};
</script>