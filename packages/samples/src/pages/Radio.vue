<template>
  <div style="padding-bottom:100px;">
    <div class="page-title">Radio 单选框</div>
    <div class="page-sub-title">基本组件-单选框。主要用于一组可选项单项选择。</div>

    <div class="page-sub-title">使用</div>
    <p>
      使用RadioGroup实现一组互斥的选项组。Radio 使用 label 来自动判断。
      每个 Radio 的内容可以自定义，如不填写则默认使用 label 的值
    </p><br>
    <RadioGroup v-model="phone">
      <Radio label="apple">
        <Icon type="social-apple"></Icon>
        <span>Apple</span>
      </Radio>
      <Radio label="android">
        <Icon type="social-android"></Icon>
        <span>Android</span>
      </Radio>
      <Radio label="windows">
        <Icon type="social-windows"></Icon>
        <span>Windows</span>
      </Radio>
    </RadioGroup>
    <RadioGroup v-model="animal">
      <Radio label="金斑蝶"></Radio>
      <Radio label="爪哇犀牛"></Radio>
      <Radio label="印度黑羚"></Radio>
    </RadioGroup>

    <div class="page-sub-title">不可用</div>
    <p>通过设置disabled属性来禁用单选框。</p><br>
    <RadioGroup v-model="disabledGroup">
      <Radio label="金斑蝶" disabled></Radio>
      <Radio label="爪哇犀牛" disabled></Radio>
      <Radio label="印度黑羚"></Radio>
    </RadioGroup>

    <div class="page-sub-title">垂直</div>
    <p>设置属性 vertical 可以垂直显示，按钮样式下无效。</p><br>
    <RadioGroup v-model="vertical" vertical>
      <Radio label="apple">
        <Icon type="social-apple"></Icon>
        <span>Apple</span>
      </Radio>
      <Radio label="android">
        <Icon type="social-android"></Icon>
        <span>Android</span>
      </Radio>
      <Radio label="windows">
        <Icon type="social-windows"></Icon>
        <span>Windows</span>
      </Radio>
    </RadioGroup>

    <div class="page-sub-title">按钮样式</div>
    <p>组合使用时可以设置属性type为 button 来应用按钮的样式。</p><br>
    <RadioGroup v-model="button1" type="button">
      <Radio label="北京"></Radio>
      <Radio label="上海"></Radio>
      <Radio label="深圳"></Radio>
      <Radio label="杭州"></Radio>
    </RadioGroup><br><br>
    <p>{{button1}}</p><br>
    <RadioGroup v-model="button2" type="button">
      <Radio label="北京"></Radio>
      <Radio label="上海" disabled></Radio>
      <Radio label="深圳"></Radio>
      <Radio label="杭州"></Radio>
    </RadioGroup><br><br>
    <p>{{button2}}</p><br>
    <RadioGroup v-model="button3" type="button">
      <Radio label="北京" disabled></Radio>
      <Radio label="上海" disabled></Radio>
      <Radio label="深圳" disabled></Radio>
      <Radio label="杭州" disabled></Radio>
    </RadioGroup><br><br>
    <p>{{button3}}</p>

    <div class="page-sub-title">显示边框</div>
    <p>设置属性 border 可以显示边框。</p><br>
    <RadioGroup v-model="border">
        <Radio label="金斑蝶" border></Radio>
        <Radio label="爪哇犀牛" border></Radio>
        <Radio label="印度黑羚" border></Radio>
    </RadioGroup>

    <div class="page-sub-title">尺寸</div>
    <p>通过设置属性size为large或small将按钮样式设置为大和小尺寸，不设置为默认(中)尺寸。</p><br>
    <RadioGroup v-model="button4" type="button" size="large">
      <Radio label="北京"></Radio>
      <Radio label="上海"></Radio>
      <Radio label="深圳"></Radio>
      <Radio label="杭州"></Radio>
    </RadioGroup>
    <RadioGroup v-model="button5" type="button">
      <Radio label="北京"></Radio>
      <Radio label="上海"></Radio>
      <Radio label="深圳"></Radio>
      <Radio label="杭州"></Radio>
    </RadioGroup>
    <RadioGroup v-model="button6" type="button" size="small">
      <Radio label="北京"></Radio>
      <Radio label="上海"></Radio>
      <Radio label="深圳"></Radio>
      <Radio label="杭州"></Radio>
    </RadioGroup><br><br>
    <RadioGroup v-model="border" size="large">
        <Radio label="金斑蝶" border></Radio>
        <Radio label="爪哇犀牛" border></Radio>
        <Radio label="印度黑羚" border></Radio>
    </RadioGroup><br>
    <RadioGroup v-model="border">
      <Radio label="金斑蝶" border></Radio>
      <Radio label="爪哇犀牛" border></Radio>
      <Radio label="印度黑羚" border></Radio>
    </RadioGroup><br>
    <RadioGroup v-model="border" size="small">
      <Radio label="金斑蝶" border></Radio>
      <Radio label="爪哇犀牛" border></Radio>
      <Radio label="印度黑羚" border></Radio>
    </RadioGroup><br>
    <RadioGroup v-model="border" size="large">
        <Radio label="金斑蝶"></Radio>
        <Radio label="爪哇犀牛"></Radio>
        <Radio label="印度黑羚"></Radio>
    </RadioGroup><br>
    <RadioGroup v-model="border">
      <Radio label="金斑蝶"></Radio>
      <Radio label="爪哇犀牛"></Radio>
      <Radio label="印度黑羚"></Radio>
    </RadioGroup><br>
    <RadioGroup v-model="border" size="small">
      <Radio label="金斑蝶"></Radio>
      <Radio label="爪哇犀牛"></Radio>
      <Radio label="印度黑羚"></Radio>
    </RadioGroup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      phone: "apple",
      animal: "爪哇犀牛",
      disabledGroup: "爪哇犀牛",
      vertical: "apple",
      button1: "北京",
      button2: "北京",
      button3: "北京",
      button4: "北京",
      button5: "北京",
      button6: "北京",
      border: '金斑蝶'
    };
  }
};
</script>