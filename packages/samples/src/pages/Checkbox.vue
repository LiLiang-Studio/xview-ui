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

    <div class="page-sub-title">与其它组件进行数据联动。</div>
    <Checkbox v-model="checked" :disabled="disabled">
      <span v-if="checked">Checked</span>
      <span v-else>Unchecked</span>
      -
      <span v-if="!disabled">Usable</span>
      <span v-else>Disabled</span>
    </Checkbox>
    <br />
    <Button type="primary" @click="checked = !checked">
      <span v-if="!checked">Checked</span>
      <span v-else>Unchecked</span>
    </Button>
    <Button type="primary" @click="disabled = !disabled">
      <span v-if="disabled">Usable</span>
      <span v-else>Disabled</span>
    </Button>

    <div class="page-sub-title">全选</div>
    <p>在实现全选效果时，你可能会用到 indeterminate 属性。示例代码只是一种写法，业务中可以用更多的方法，比如计算属性。</p>
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
      checkAllGroup: ["香蕉", "西瓜"]
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