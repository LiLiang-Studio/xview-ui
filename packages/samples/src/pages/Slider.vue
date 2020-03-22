<template>
  <div style="padding-bottom:100px;">
    <div class="page-title">Slider 滑块</div>
    <p>滑动输入器，用于在数值区间/自定义区间内进行选择，支持连续或离散值。</p>

    <div class="page-sub-title">基础用法</div>
    <p>滑块的基本用法，可以使用 v-model 双向绑定数据。
      <br>通过设置属性 range 开启双滑块，通过设置属性 disabled 禁用滑块。
      <br>注意，单滑块时，value 格式为数字，当开启双滑块时，value 为长度是2的数组，且每项为数字。</p><br>
    <Slider v-model="value1"></Slider>
    <Slider v-model="value2" range></Slider>
    <Slider v-model="value3" range disabled></Slider>

    <div class="page-sub-title">离散值</div>
    <p>通过设置属性 step 可以控制每次滑动的间隔。</p><br>
    <Slider v-model="value4" :step="10"></Slider>
    <Slider v-model="value5" :step="10" range></Slider>

    <div class="page-sub-title">显示间断点</div>
    <p>通过设置属性 show-stops 可以显示间断点，建议在 step 间隔不密集时使用。</p><br>
    <Slider v-model="value6" :step="12" show-stops></Slider>
    <Slider v-model="value7" :step="9" show-stops range></Slider>

    <div class="page-sub-title">带有输入框</div>
    <p>通过设置属性 show-input 可以显示数字输入框，配合使用，仅在单滑块模式下有效。</p><br>
    <Slider v-model="value8" show-input></Slider>

    <div class="page-sub-title">自定义提示</div>
    <p>Slider 会把当前值传给 tip-format，并在 Tooltip 中显示 tip-format 的返回值，若为 null，则隐藏 Tooltip。</p><br>
    <Slider v-model="value9" :tip-format="format"></Slider>
    <Slider v-model="value10" :tip-format="hideFormat"></Slider>

    <div class="page-sub-title">展示标记</div>
    <p>设置属性 marks 可以显示标记。标记的 key 取值应该在闭合区间 [min, max] 内。标记点也可以通过 style 和 label 自定义样式。</p><br>
    <Slider v-model="value11" range :marks="marks"></Slider>
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
      value10: 25,
      value11: [25, 65],
      marks: {
        0: '0°C',
        12: '12°C',
        32: '32°C',
        55: {
          style: {
            color: '#ff0000'
          },
          label: '<strong>55°C</strong>'
        }
      }
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