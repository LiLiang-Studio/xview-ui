<template>
  <div>
    <div class="page-title">ColorPicker 颜色选择器</div>
    <p>用于颜色选择，支持多种颜色格式，支持颜色预设。</p>

    <div class="page-sub-title">基础用法</div>
    <p>基本用法，可以使用 v-model 实现数据的双向绑定。</p>
    <br />
    <Row>
      <Col span="12">
        有默认值
        <ColorPicker v-model="color1" />
      </Col>
      <Col span="12">
        无默认值
        <ColorPicker v-model="color2" />
      </Col>
    </Row>

    <div class="page-sub-title">透明度</div>
    <p>开启属性 alpha，可以选择带 Alpha 通道的颜色。</p>
    <br />
    <ColorPicker v-model="color3" alpha />

    <div class="page-sub-title">色彩</div>
    <p>设置属性 hue 为 false，可以禁用色彩选项。</p>
    <br />
    <ColorPicker v-model="color7" :hue="false" />

    <div class="page-sub-title">颜色预设</div>
    <p>开启属性 recommend 可以显示推荐的颜色预设，或设置属性 colors 来自定义预设颜色。</p>
    <br />
    <Row>
      <Col span="12">
        <ColorPicker v-model="color4" recommend />
      </Col>
      <Col span="12">
        <ColorPicker v-model="color5" :colors="colors" />
      </Col>
    </Row>

    <div class="page-sub-title">尺寸</div>
    <p>选择器有三种尺寸：大、默认（中）、小。</p>
    <br />
    <Row>
      <Col span="8">
        <ColorPicker v-model="color6" size="large" />
      </Col>
      <Col span="8">
        <ColorPicker v-model="color6" />
      </Col>
      <Col span="8">
        <ColorPicker v-model="color6" size="small" />
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      color1: "#19be6b",
      color2: "",
      color3: "rgba(25, 190,107, .5)",
      color7: "#19be6b",
      color4: "#19be6b",
      color5: "#19be6b",
      color6: "#19be6b",
      colors: ["#311B92", "#512DA8", "#673AB7", "#9575CD", "#D1C4E9"]
    };
  }
};
</script>