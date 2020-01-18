<template>
  <div>
    <div class="page-title">Slider 滑块</div>
    <p>滑动输入器，用于在数值区间/自定义区间内进行选择，支持连续或离散值。</p>

    <div class="page-sub-title">
      滑块的基本用法，可以使用 v-model 双向绑定数据。
      <br>通过设置属性 range 开启双滑块，通过设置属性 disabled 禁用滑块。
      <br>注意，单滑块时，value 格式为数字，当开启双滑块时，value 为长度是2的数组，且每项为数字。
    </div>
    <Slider v-model="value1"></Slider>
    <Slider v-model="value2" range></Slider>
    <Slider v-model="value3" range disabled></Slider>

    <div class="page-sub-title">通过设置属性 step 可以控制每次滑动的间隔。</div>
    <Slider v-model="value4" :step="10"></Slider>
    <Slider v-model="value5" :step="10" range></Slider>

    <div class="page-sub-title">通过设置属性 show-stops 可以显示间断点，建议在 step 间隔不密集时使用。</div>
    <Slider v-model="value6" :step="10" show-stops></Slider>
    <Slider v-model="value7" :step="10" show-stops range></Slider>

    <div class="page-sub-title">通过设置属性 show-input 可以显示数字输入框，配合使用，仅在单滑块模式下有效。</div>
    <Slider v-model="value8" show-input></Slider>

    <div
      class="page-sub-title"
    >Slider 会把当前值传给 tip-format，并在 Tooltip 中显示 tip-format 的返回值，若为 null，则隐藏 Tooltip。</div>
    <Slider v-model="value9" :tip-format="format"></Slider>
    <Slider v-model="value10" :tip-format="hideFormat"></Slider>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value1: 25,
      value2: [20, 50],
      value3: [20, 50],
      value4: 30,
      value5: [20, 50],
      value6: 30,
      value7: [20, 50],
      value8: 25,
      value9: 25,
      value10: 25
    };
  },
  methods: {
    format(val) {
      return "Progress: " + val + "%";
    },
    hideFormat() {
      return null;
    }
  }
};
</script>