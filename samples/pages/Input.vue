<template>
  <div style="width:420px;padding-bottom:200px">
    <div class="page-title">Input 输入框</div>
    <p>基本表单组件，支持 input 和 textarea，并在原生控件基础上进行了功能扩展，可以组合使用。</p>

    <div class="page-sub-title">基础用法</div>
    <p>基本用法，可以使用 v-model 实现数据的双向绑定。可以直接设置 style 来改变输入框的宽度，默认 100%。</p>
    <Input v-model="value" placeholder="Enter something..." style="width: 300px" />

    <div class="page-sub-title">尺寸</div>
    <p>输入框有三种尺寸：大、默认（中）、小;通过设置size为large和small设置为大和小尺寸，不设置为默认（中）尺寸。</p>
    <Input v-model="value1" size="large" placeholder="large size" />
    <br />
    <br />
    <Input v-model="value2" placeholder="default size" />
    <br />
    <br />
    <Input v-model="value3" size="small" placeholder="small size" />

    <div class="page-sub-title">可清空</div>
    <p>开启属性 clearable 可显示清空按钮。</p>
    <Input v-model="value14" placeholder="Enter something..." clearable style="width: 200px" />

    <div class="page-sub-title">带Icon的输入框</div>
    <p>通过 icon 属性可以在输入框右边加一个图标。点击图标，会触发 on-click 事件。</p>
    <Input
      v-model="value4"
      icon="ios-clock-outline"
      placeholder="Enter something..."
      style="width: 200px"
    />

    <div class="page-sub-title">前缀和后缀图标</div>
    <p>除了设置 icon，也可以通过设置 prefix 和 suffix 及同名 slot 设置前缀及后缀图标。</p>
    <div>
      Props：
      <Input prefix="ios-contact" placeholder="Enter name" style="width: auto" />
      <br />
      <Input suffix="ios-search" placeholder="Enter text" style="width: auto" />
    </div>
    <div style="margin-top: 6px">
      Slots：
      <Input placeholder="Enter name" style="width: auto">
        <Icon type="ios-contact" slot="prefix" />
      </Input>
      <br />
      <Input placeholder="Enter text" style="width: auto">
        <Icon type="ios-search" slot="suffix" />
      </Input>
    </div>

    <div class="page-sub-title">搜索框</div>
    <p>开启 search 属性，可以设置为搜索型输入框。</p>
    <Input search placeholder="Enter something..." />
    <br />
    <br />
    <Input search enter-button placeholder="Enter something..." />
    <br />
    <br />
    <Input search enter-button="Search" placeholder="Enter something..." />

    <div class="page-sub-title">文本域</div>
    <p>通过设置属性 type 为 textarea 来使用文本域，用于多行输入。通过设置属性 rows 控制文本域默认显示的行数。</p>
    <Input v-model="value5" type="textarea" placeholder="Enter something..." />
    <br />
    <br />
    <Input v-model="value6" type="textarea" :rows="4" placeholder="Enter something..." />

    <div class="page-sub-title">适应文本高度的文本域</div>
    <p>设置属性 autosize，文本域会自动适应高度的变化。autosize也可以设定为一个对象，指定最小行数和最大行数。</p>
    <Input v-model="value7" type="textarea" :autosize="true" placeholder="Enter something..." />
    <br />
    <br />
    <Input
      v-model="value8"
      type="textarea"
      :autosize="{minRows: 2,maxRows: 5}"
      placeholder="Enter something..."
    />

    <div class="page-sub-title">禁用状态</div>
    <p>通过添加disabled属性可设置为不可用状态。</p>
    <Input v-model="value9" disabled placeholder="Enter something..." />
    <br />
    <br />
    <Input v-model="value10" disabled type="textarea" placeholder="Enter something..." />

    <div class="page-sub-title">复合型输入框</div>
    <p>通过前置和后置的 slot 可以实现复合型的输入框。</p>
    <Input v-model="value11">
      <span slot="prepend">http://</span>
      <span slot="append">.com</span>
    </Input>
    <br />
    <Input v-model="value12">
      <Select v-model="select1" slot="prepend" style="width: 80px">
        <Option value="http">http://</Option>
        <Option value="https">https://</Option>
      </Select>
      <Select v-model="select2" slot="append" style="width: 70px">
        <Option value="com">.com</Option>
        <Option value="org">.org</Option>
        <Option value="io">.io</Option>
      </Select>
    </Input>
    <br />
    <Input v-model="value13">
      <Select v-model="select3" slot="prepend" style="width: 80px">
        <Option value="day">Day</Option>
        <Option value="month">Month</Option>
      </Select>
      <Button slot="append">
        <Icon type="ios-search"/>
      </Button>
    </Input>

    <div class="page-sub-title">输入时格式化展示</div>
    <p>结合 Poptip 组件，实现一个数值输入框，方便内容超长时的全量展现。</p>
    <Poptip trigger="focus">
      <Input v-model="value15" prefix="logo-usd" placeholder="Enter number" style="width: 120px" />
      <div slot="content">{{ formatNumber }}</div>
    </Poptip>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      value5: "",
      value6: "",
      value7: "",
      value8: "",
      value9: "",
      value10: "",
      value11: "",
      value12: "",
      value13: "",
      select1: "http",
      select2: "com",
      select3: "day",
      value14: "Hello World",
      value15: ""
    };
  },
  computed: {
    formatNumber() {
      if (this.value15 === "") return "Enter number";
      function parseNumber(str) {
        const re = /(?=(?!)(d{3})+$)/g;
        return str.replace(re, ",");
      }
      return parseNumber(this.value15);
    }
  }
};
</script>
